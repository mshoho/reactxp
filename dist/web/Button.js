"use strict";
/**
* Button.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform Button abstraction.
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var PropTypes = require("prop-types");
var AccessibilityUtil_1 = require("./AccessibilityUtil");
var AutoFocusHelper_1 = require("../common/utils/AutoFocusHelper");
var AppConfig_1 = require("../common/AppConfig");
var Styles_1 = require("./Styles");
var Types = require("../common/Types");
var FocusManager_1 = require("./utils/FocusManager");
var UserInterface_1 = require("./UserInterface");
var _styles = {
    defaultButton: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 0,
        flexShrink: 0,
        overflow: 'hidden',
        alignItems: 'stretch',
        justifyContent: 'center',
        appRegion: 'no-drag',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        textAlign: 'left',
        borderWidth: '0'
    },
    disabled: {
        opacity: 0.5
    }
};
var _longPressTime = 1000;
var _defaultAccessibilityTrait = Types.AccessibilityTrait.Button;
var _isNavigatingWithKeyboard = false;
UserInterface_1.default.keyboardNavigationEvent.subscribe(function (isNavigatingWithKeyboard) {
    _isNavigatingWithKeyboard = isNavigatingWithKeyboard;
});
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._isMounted = false;
        _this._ignoreClick = false;
        _this._isMouseOver = false;
        _this._isFocusedWithKeyboard = false;
        _this._isHoverStarted = false;
        _this.onClick = function (e) {
            if (_this._ignoreClick) {
                e.stopPropagation();
                _this._ignoreClick = false;
            }
            else if (!_this.props.disabled && _this.props.onPress) {
                _this.props.onPress(e);
            }
        };
        _this._onContextMenu = function (e) {
            if (_this.props.onContextMenu) {
                _this.props.onContextMenu(e);
            }
        };
        _this._onMouseDown = function (e) {
            if (_this.props.onPressIn) {
                _this.props.onPressIn(e);
            }
            if (_this.props.onLongPress) {
                _this._lastMouseDownEvent = e;
                e.persist();
                // In the unlikely event we get 2 mouse down events, clear existing timer
                if (_this._longPressTimer) {
                    clearTimeout(_this._longPressTimer);
                }
                _this._longPressTimer = setTimeout(function () {
                    _this._longPressTimer = undefined;
                    if (_this.props.onLongPress) {
                        // lastMouseDownEvent can never be undefined at this point
                        _this.props.onLongPress(_this._lastMouseDownEvent);
                        _this._ignoreClick = true;
                    }
                }, _longPressTime);
            }
        };
        _this._onMouseUp = function (e) {
            if (_this.props.onPressOut) {
                _this.props.onPressOut(e);
            }
            if (_this._longPressTimer) {
                clearTimeout(_this._longPressTimer);
            }
        };
        _this._onMouseEnter = function (e) {
            _this._isMouseOver = true;
            _this._onHoverStart(e);
        };
        _this._onMouseLeave = function (e) {
            _this._isMouseOver = false;
            _this._onHoverEnd(e);
        };
        // When we get focus on an element, show the hover effect on the element.
        // This ensures that users using keyboard also get the similar experience as mouse users for accessibility.
        _this._onFocus = function (e) {
            _this._isFocusedWithKeyboard = _isNavigatingWithKeyboard;
            _this._onHoverStart(e);
            if (_this.props.onFocus) {
                _this.props.onFocus(e);
            }
        };
        _this._onBlur = function (e) {
            _this._isFocusedWithKeyboard = false;
            _this._onHoverEnd(e);
            if (_this.props.onBlur) {
                _this.props.onBlur(e);
            }
        };
        _this._onHoverStart = function (e) {
            if (!_this._isHoverStarted && (_this._isMouseOver || _this._isFocusedWithKeyboard)) {
                _this._isHoverStarted = true;
                if (_this.props.onHoverStart) {
                    _this.props.onHoverStart(e);
                }
            }
        };
        _this._onHoverEnd = function (e) {
            if (_this._isHoverStarted && !_this._isMouseOver && !_this._isFocusedWithKeyboard) {
                _this._isHoverStarted = false;
                if (_this.props.onHoverEnd) {
                    _this.props.onHoverEnd(e);
                }
            }
        };
        if (context.hasRxButtonAscendant) {
            if (AppConfig_1.default.isDevelopmentMode()) {
                console.warn('Button components should not be embedded. Some APIs, e.g. Accessibility, will not work.');
            }
        }
        return _this;
    }
    Button.prototype.getChildContext = function () {
        return { hasRxButtonAscendant: true };
    };
    Button.prototype.render = function () {
        var ariaRole = AccessibilityUtil_1.default.accessibilityTraitToString(this.props.accessibilityTraits, _defaultAccessibilityTrait);
        var ariaSelected = AccessibilityUtil_1.default.accessibilityTraitToAriaSelected(this.props.accessibilityTraits);
        var ariaChecked = AccessibilityUtil_1.default.accessibilityTraitToAriaChecked(this.props.accessibilityTraits);
        var isAriaHidden = AccessibilityUtil_1.default.isHidden(this.props.importantForAccessibility);
        var ariaHasPopup = AccessibilityUtil_1.default.accessibilityTraitToAriaHasPopup(this.props.accessibilityTraits);
        // NOTE: We use tabIndex=0 to support focus.
        return (React.createElement("button", { style: this._getStyles(), role: ariaRole, title: this.props.title, tabIndex: this.props.tabIndex, "aria-label": this.props.accessibilityLabel || this.props.title, "aria-disabled": this.props.disabled, "aria-hidden": isAriaHidden, "aria-selected": ariaSelected, "aria-checked": ariaChecked, onClick: this.onClick, onContextMenu: this._onContextMenu, onMouseDown: this._onMouseDown, onMouseUp: this._onMouseUp, onMouseEnter: this._onMouseEnter, onMouseLeave: this._onMouseLeave, onFocus: this._onFocus, onBlur: this._onBlur, onKeyDown: this.props.onKeyPress, disabled: this.props.disabled, "aria-haspopup": ariaHasPopup, "aria-controls": this.props.ariaControls, id: this.props.id }, this.props.children));
    };
    Button.prototype.componentDidMount = function () {
        var _this = this;
        this._isMounted = true;
        if (this.props.autoFocus) {
            AutoFocusHelper_1.autoFocusIfNeeded(this.props.autoFocus, function () { return _this.focus(); }, function () { return _this._isMounted; });
        }
    };
    Button.prototype.componentWillUnmount = function () {
        this._isMounted = false;
    };
    Button.prototype.focus = function () {
        var el = ReactDOM.findDOMNode(this);
        if (el) {
            el.focus();
        }
    };
    Button.prototype.blur = function () {
        var el = ReactDOM.findDOMNode(this);
        if (el) {
            el.blur();
        }
    };
    Button.prototype._getStyles = function () {
        var buttonStyleMutations = {};
        var buttonStyles = Styles_1.default.combine(this.props.style);
        // Specify default style for padding only if padding is not already specified
        if (buttonStyles && buttonStyles.padding === undefined &&
            buttonStyles.paddingRight === undefined && buttonStyles.paddingLeft === undefined &&
            buttonStyles.paddingBottom === undefined && buttonStyles.paddingTop === undefined &&
            buttonStyles.paddingHorizontal === undefined && buttonStyles.paddingVertical === undefined) {
            buttonStyleMutations.padding = 0;
        }
        if (this.props.disabled) {
            buttonStyleMutations.opacity = 0.5;
        }
        // Default to 'pointer' cursor for enabled buttons unless otherwise specified.
        if (!buttonStyleMutations.cursor) {
            buttonStyleMutations.cursor = this.props.disabled ? 'default' : 'pointer';
        }
        return Styles_1.default.combine([_styles.defaultButton, buttonStyles, buttonStyleMutations]);
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
FocusManager_1.applyFocusableComponentMixin(Button);
exports.default = Button;
