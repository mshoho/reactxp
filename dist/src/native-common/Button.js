"use strict";
/**
* Button.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN-specific implementation of the cross-platform Button abstraction.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var React = require("react");
var RN = require("react-native");
var PropTypes = require("prop-types");
var AccessibilityUtil_1 = require("./AccessibilityUtil");
var Animated_1 = require("./Animated");
var AppConfig_1 = require("../common/AppConfig");
var EventHelpers_1 = require("./utils/EventHelpers");
var Styles_1 = require("./Styles");
var Types = require("../common/Types");
var lodashMini_1 = require("../common/lodashMini");
var UserInterface_1 = require("./UserInterface");
var _styles = {
    defaultButton: Styles_1.default.createButtonStyle({
        alignItems: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0)'
    }),
    disabled: Styles_1.default.createButtonStyle({
        opacity: 0.5
    })
};
var _defaultAccessibilityTrait = Types.AccessibilityTrait.Button;
var _defaultImportantForAccessibility = Types.ImportantForAccessibility.Yes;
var _defaultActiveOpacity = 0.2;
var _inactiveOpacityAnimationDuration = 250;
var _activeOpacityAnimationDuration = 0;
var _hideUnderlayTimeout = 100;
var _underlayInactive = 'transparent';
function noop() { }
function applyMixin(thisObj, mixin, propertiesToSkip) {
    Object.getOwnPropertyNames(mixin).forEach(function (name) {
        if (name !== 'constructor' && propertiesToSkip.indexOf(name) === -1) {
            assert(!(name in thisObj), "An object cannot have a method with the same name as one of its mixins: \"" + name + "\"");
            thisObj[name] = mixin[name].bind(thisObj);
        }
    });
}
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._mixin_componentDidMount = RN.Touchable.Mixin.componentDidMount || noop;
        _this._mixin_componentWillUnmount = RN.Touchable.Mixin.componentWillUnmount || noop;
        _this._isMounted = false;
        _this._isMouseOver = false;
        _this._isHoverStarted = false;
        _this._buttonElement = null;
        _this.touchableHandleActivePressIn = function (e) {
            if (_this._isTouchFeedbackApplicable()) {
                if (_this.props.underlayColor) {
                    if (_this._hideTimeout) {
                        clearTimeout(_this._hideTimeout);
                        _this._hideTimeout = undefined;
                    }
                    _this._showUnderlay();
                }
                // We do not want to animate opacity if underlayColour is provided. Unless an explicit activeOpacity is provided
                if (!_this.props.disableTouchOpacityAnimation && (_this.props.activeOpacity || !_this.props.underlayColor)) {
                    _this._opacityActive(_activeOpacityAnimationDuration);
                }
            }
            if (!_this.props.disabled && _this.props.onPressIn) {
                _this.props.onPressIn(e);
            }
        };
        _this.touchableHandleActivePressOut = function (e) {
            if (_this._isTouchFeedbackApplicable()) {
                if (_this.props.underlayColor) {
                    if (_this._hideTimeout) {
                        clearTimeout(_this._hideTimeout);
                    }
                    _this._hideTimeout = setTimeout(_this._hideUnderlay, _hideUnderlayTimeout);
                }
                if (!_this.props.disableTouchOpacityAnimation && (_this.props.activeOpacity || !_this.props.underlayColor)) {
                    _this._opacityInactive(_inactiveOpacityAnimationDuration);
                }
            }
            if (!_this.props.disabled && _this.props.onPressOut) {
                _this.props.onPressOut(e);
            }
        };
        _this.touchableHandlePress = function (e) {
            UserInterface_1.default.evaluateTouchLatency(e);
            if (!_this.props.disabled) {
                if (EventHelpers_1.default.isRightMouseButton(e)) {
                    if (_this.props.onContextMenu) {
                        _this.props.onContextMenu(e);
                    }
                }
                else {
                    if (_this.props.onPress) {
                        _this.props.onPress(e);
                    }
                }
            }
        };
        _this.touchableHandleLongPress = function (e) {
            if (!_this.props.disabled && !EventHelpers_1.default.isRightMouseButton(e) && _this.props.onLongPress) {
                _this.props.onLongPress(e);
            }
        };
        _this.touchableGetHighlightDelayMS = function () {
            return 20;
        };
        _this.touchableGetPressRectOffset = function () {
            return { top: 20, left: 20, right: 20, bottom: 100 };
        };
        _this._onButtonRef = function (btn) {
            _this._buttonElement = btn;
        };
        _this._onMouseEnter = function (e) {
            _this._isMouseOver = true;
            _this._onHoverStart(e);
        };
        _this._onMouseLeave = function (e) {
            _this._isMouseOver = false;
            _this._onHoverEnd(e);
        };
        _this._onHoverStart = function (e) {
            if (!_this._isHoverStarted && _this._isMouseOver) {
                _this._isHoverStarted = true;
                if (_this.props.onHoverStart) {
                    _this.props.onHoverStart(e);
                }
            }
        };
        _this._onHoverEnd = function (e) {
            if (_this._isHoverStarted && !_this._isMouseOver) {
                _this._isHoverStarted = false;
                if (_this.props.onHoverEnd) {
                    _this.props.onHoverEnd(e);
                }
            }
        };
        _this._hideUnderlay = function () {
            if (!_this._isMounted || !_this._buttonElement) {
                return;
            }
            _this._buttonElement.setNativeProps({
                style: [{
                        backgroundColor: _underlayInactive
                    }, _this.props.style]
            });
        };
        applyMixin(_this, RN.Touchable.Mixin, [
            // Properties that Button and RN.Touchable.Mixin have in common. Button needs
            // to dispatch these methods to RN.Touchable.Mixin manually.
            'componentDidMount',
            'componentWillUnmount'
        ]);
        _this.state = _this.touchableGetInitialState();
        _this._setOpacityStyles(props);
        if (context.hasRxButtonAscendant) {
            if (AppConfig_1.default.isDevelopmentMode()) {
                console.warn('Button components should not be embedded. Some APIs, e.g. Accessibility, will not work.');
            }
        }
        return _this;
    }
    Button.prototype._render = function (internalProps) {
        return (React.createElement(RN.Animated.View, __assign({}, internalProps), this.props.children));
    };
    Button.prototype.render = function () {
        // Accessibility props.
        var importantForAccessibility = AccessibilityUtil_1.default.importantForAccessibilityToString(this.props.importantForAccessibility, _defaultImportantForAccessibility);
        var accessibilityTrait = AccessibilityUtil_1.default.accessibilityTraitToString(this.props.accessibilityTraits, _defaultAccessibilityTrait, true);
        var accessibilityComponentType = AccessibilityUtil_1.default.accessibilityComponentTypeToString(this.props.accessibilityTraits, _defaultAccessibilityTrait);
        var opacityStyle = !this.props.disableTouchOpacityAnimation && this._opacityAnimatedStyle;
        var internalProps = {
            ref: this._onButtonRef,
            style: Styles_1.default.combine([_styles.defaultButton, this.props.style, opacityStyle,
                this.props.disabled && _styles.disabled]),
            accessibilityLabel: this.props.accessibilityLabel || this.props.title,
            accessibilityTraits: accessibilityTrait,
            accessibilityComponentType: accessibilityComponentType,
            importantForAccessibility: importantForAccessibility,
            onStartShouldSetResponder: this.touchableHandleStartShouldSetResponder,
            onResponderTerminationRequest: this.touchableHandleResponderTerminationRequest,
            onResponderGrant: this.touchableHandleResponderGrant,
            onResponderMove: this.touchableHandleResponderMove,
            onResponderRelease: this.touchableHandleResponderRelease,
            onResponderTerminate: this.touchableHandleResponderTerminate,
            shouldRasterizeIOS: this.props.shouldRasterizeIOS,
            onAccessibilityTapIOS: this.props.onAccessibilityTapIOS,
            onMouseEnter: this._onMouseEnter,
            onMouseLeave: this._onMouseLeave
        };
        return this._render(internalProps);
    };
    Button.prototype.componentDidMount = function () {
        this._mixin_componentDidMount();
        this._isMounted = true;
    };
    Button.prototype.componentWillUnmount = function () {
        this._mixin_componentWillUnmount();
        this._isMounted = false;
    };
    Button.prototype.componentWillReceiveProps = function (nextProps) {
        if (!lodashMini_1.isEqual(this.props, nextProps)) {
            // If opacity got updated as a part of props update, we need to reflect that in the opacity animation value
            this._setOpacityStyles(nextProps, this.props);
        }
    };
    Button.prototype.getChildContext = function () {
        return { hasRxButtonAscendant: true };
    };
    Button.prototype.setNativeProps = function (nativeProps) {
        if (this._buttonElement) {
            this._buttonElement.setNativeProps(nativeProps);
        }
    };
    Button.prototype.focus = function () {
        AccessibilityUtil_1.default.setAccessibilityFocus(this);
    };
    Button.prototype.blur = function () {
        // native mobile platforms doesn't have the notion of blur for buttons, so ignore.
    };
    Button.prototype._setOpacityStyles = function (props, prevProps) {
        var opacityValueFromProps = this._getDefaultOpacityValue(props);
        if (this._defaultOpacityValue !== opacityValueFromProps || (prevProps && props.disabled !== prevProps.disabled)) {
            this._defaultOpacityValue = opacityValueFromProps;
            this._opacityAnimatedValue = new Animated_1.default.Value(this._defaultOpacityValue);
            this._opacityAnimatedStyle = Styles_1.default.createAnimatedViewStyle({
                opacity: this._opacityAnimatedValue
            });
        }
    };
    Button.prototype._isTouchFeedbackApplicable = function () {
        return this._isMounted && this._hasPressHandler() && this._buttonElement;
    };
    Button.prototype._opacityActive = function (duration) {
        this.setOpacityTo(this.props.activeOpacity || _defaultActiveOpacity, duration);
    };
    Button.prototype._opacityInactive = function (duration) {
        this.setOpacityTo(this._defaultOpacityValue, duration);
    };
    Button.prototype._getDefaultOpacityValue = function (props) {
        var flattenedStyles;
        if (props && props.style) {
            flattenedStyles = RN.StyleSheet.flatten(props.style);
        }
        return flattenedStyles && flattenedStyles.opacity || 1;
    };
    /**
    * Animate the touchable to a new opacity.
    */
    Button.prototype.setOpacityTo = function (value, duration) {
        Animated_1.default.timing(this._opacityAnimatedValue, {
            toValue: value,
            duration: duration,
            easing: Animated_1.default.Easing.InOut()
        }).start();
    };
    Button.prototype._hasPressHandler = function () {
        return !!(this.props.onPress ||
            this.props.onPressIn ||
            this.props.onPressOut ||
            this.props.onLongPress);
    };
    Button.prototype._showUnderlay = function () {
        if (!this._buttonElement) {
            return;
        }
        this._buttonElement.setNativeProps({
            style: {
                backgroundColor: this.props.underlayColor
            }
        });
    };
    Button.contextTypes = {
        hasRxButtonAscendant: PropTypes.bool
    };
    Button.childContextTypes = {
        hasRxButtonAscendant: PropTypes.bool
    };
    return Button;
}(React.Component));
exports.Button = Button;
exports.default = Button;
