"use strict";
/**
* Button.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN Windows-specific implementation of the cross-platform Button abstraction.
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
var React = require("react");
var Button_1 = require("../native-common/Button");
var EventHelpers_1 = require("../native-common/utils/EventHelpers");
var UserInterface_1 = require("../native-desktop/UserInterface");
var RN = require("react-native");
var RNW = require("react-native-windows");
var FocusManager_1 = require("../native-desktop/utils/FocusManager");
var KEY_CODE_ENTER = 13;
var KEY_CODE_SPACE = 32;
var DOWN_KEYCODES = [KEY_CODE_SPACE, KEY_CODE_ENTER];
var UP_KEYCODES = [KEY_CODE_SPACE];
var _isNavigatingWithKeyboard = false;
UserInterface_1.default.keyboardNavigationEvent.subscribe(function (isNavigatingWithKeyboard) {
    _isNavigatingWithKeyboard = isNavigatingWithKeyboard;
});
var FocusableAnimatedView = RNW.createFocusableComponent(RN.Animated.View);
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._focusableElement = null;
        _this._isFocusedWithKeyboard = false;
        _this._onFocusableRef = function (btn) {
            _this._focusableElement = btn;
        };
        _this._onAccessibilityTap = function (e) {
            if (!_this.props.disabled) {
                if (_this.props.onPress) {
                    _this.props.onPress(e);
                }
            }
        };
        _this._onKeyDown = function (e) {
            if (!_this.props.disabled) {
                var keyEvent = EventHelpers_1.default.toKeyboardEvent(e);
                if (_this.props.onKeyPress) {
                    _this.props.onKeyPress(keyEvent);
                }
                if (_this.props.onPress) {
                    var key = keyEvent.keyCode;
                    // ENTER triggers press on key down
                    if (key === KEY_CODE_ENTER) {
                        _this.props.onPress(keyEvent);
                    }
                }
            }
        };
        _this._onKeyUp = function (e) {
            var keyEvent = EventHelpers_1.default.toKeyboardEvent(e);
            if (keyEvent.keyCode === KEY_CODE_SPACE) {
                if (!_this.props.disabled && _this.props.onPress) {
                    _this.props.onPress(keyEvent);
                }
            }
        };
        // When we get focus on an element, show the hover effect on the element.
        // This ensures that users using keyboard also get the similar experience as mouse users for accessibility.
        _this._onFocus = function (e) {
            if (e.currentTarget === e.target) {
                _this.onFocus();
            }
            _this._isFocusedWithKeyboard = _isNavigatingWithKeyboard;
            _this._onHoverStart(e);
            if (_this.props.onFocus) {
                _this.props.onFocus(EventHelpers_1.default.toFocusEvent(e));
            }
        };
        _this._onBlur = function (e) {
            _this._isFocusedWithKeyboard = false;
            _this._onHoverEnd(e);
            if (_this.props.onBlur) {
                _this.props.onBlur(EventHelpers_1.default.toFocusEvent(e));
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
        return _this;
    }
    Button.prototype._render = function (internalProps) {
        // RNW.FocusableProps tabIndex: default is 0.
        // -1 has no special semantic similar to DOM.
        var tabIndex = this.getTabIndex();
        // RNW.FocusableProps windowsTabFocusable:
        // - true: keyboard focusable through any mean, receives keyboard input
        // - false: not focusable at all, doesn't receive keyboard input
        // The intermediate "focusable, but not in the tab order" case is not supported.
        var windowsTabFocusable = !this.props.disabled && tabIndex !== undefined && tabIndex >= 0;
        // We don't use 'string' ref type inside ReactXP
        var originalRef = internalProps.ref;
        if (typeof originalRef === 'string') {
            throw new Error('Button: ReactXP must not use string refs internally');
        }
        var componentRef = originalRef;
        var focusableViewProps = __assign({}, internalProps, { componentRef: componentRef, ref: this._onFocusableRef, onMouseEnter: this._onMouseEnter, onMouseLeave: this._onMouseLeave, isTabStop: windowsTabFocusable, tabIndex: tabIndex, disableSystemFocusVisuals: false, handledKeyDownKeys: DOWN_KEYCODES, handledKeyUpKeys: UP_KEYCODES, onKeyDown: this._onKeyDown, onKeyUp: this._onKeyUp, onFocus: this._onFocus, onBlur: this._onBlur, onAccessibilityTap: this._onAccessibilityTap });
        return (React.createElement(FocusableAnimatedView, __assign({}, focusableViewProps), this.props.children));
    };
    Button.prototype.focus = function () {
        _super.prototype.focus.call(this);
        if (this._focusableElement && this._focusableElement.focus) {
            this._focusableElement.focus();
        }
    };
    Button.prototype.blur = function () {
        _super.prototype.blur.call(this);
        if (this._focusableElement && this._focusableElement.blur) {
            this._focusableElement.blur();
        }
    };
    Button.prototype.setNativeProps = function (nativeProps) {
        // Redirect to focusable component if present.
        if (this._focusableElement) {
            this._focusableElement.setNativeProps(nativeProps);
        }
        else {
            _super.prototype.setNativeProps.call(this, nativeProps);
        }
    };
    // From FocusManagerFocusableComponent interface
    //
    Button.prototype.onFocus = function () {
        // Focus Manager hook
    };
    Button.prototype.getTabIndex = function () {
        // Button defaults to a tabIndex of 0
        // Focus Manager may override this
        return this.props.tabIndex || 0;
    };
    Button.prototype.updateNativeTabIndex = function () {
        if (this._focusableElement) {
            var tabIndex = this.getTabIndex();
            var windowsTabFocusable = !this.props.disabled && tabIndex !== undefined && tabIndex >= 0;
            this._focusableElement.setNativeProps({
                tabIndex: tabIndex,
                isTabStop: windowsTabFocusable
            });
        }
    };
    return Button;
}(Button_1.Button));
exports.Button = Button;
FocusManager_1.applyFocusableComponentMixin(Button);
exports.default = Button;
