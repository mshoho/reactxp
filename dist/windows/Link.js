"use strict";
/**
* Link.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN Desktop-specific implementation of the cross-platform Link abstraction.
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
var RN = require("react-native");
var RNW = require("react-native-windows");
var FocusManager_1 = require("../native-desktop/utils/FocusManager");
var PropTypes = require("prop-types");
var EventHelpers_1 = require("../native-common/utils/EventHelpers");
var Link_1 = require("../native-common/Link");
var KEY_CODE_ENTER = 13;
var KEY_CODE_SPACE = 32;
var DOWN_KEYCODES = [KEY_CODE_SPACE, KEY_CODE_ENTER];
var UP_KEYCODES = [KEY_CODE_SPACE];
var FocusableText = RNW.createFocusableComponent(RN.Text);
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._focusableElement = null;
        _this._onFocusableRef = function (btn) {
            _this._focusableElement = btn;
        };
        _this._onKeyDown = function (e) {
            var keyEvent = EventHelpers_1.default.toKeyboardEvent(e);
            var key = keyEvent.keyCode;
            // ENTER triggers press on key down
            if (key === KEY_CODE_ENTER) {
                // Defer to base class
                _this._onPress(keyEvent);
            }
        };
        _this._onKeyUp = function (e) {
            var keyEvent = EventHelpers_1.default.toKeyboardEvent(e);
            if (keyEvent.keyCode === KEY_CODE_SPACE) {
                // Defer to base class
                _this._onPress(keyEvent);
            }
        };
        _this._onFocus = function (e) {
            if (e.currentTarget === e.target) {
                _this.onFocus();
            }
        };
        return _this;
    }
    Link.prototype._render = function (internalProps) {
        if (this.context && !this.context.isRxParentAText) {
            var tabIndex = this.getTabIndex();
            var windowsTabFocusable = tabIndex !== undefined && tabIndex >= 0;
            // We don't use 'string' ref type inside ReactXP
            var originalRef = internalProps.ref;
            if (typeof originalRef === 'string') {
                throw new Error('Link: ReactXP must not use string refs internally');
            }
            var componentRef = originalRef;
            var focusableTextProps = __assign({}, internalProps, { componentRef: componentRef, ref: this._onFocusableRef, isTabStop: windowsTabFocusable, tabIndex: tabIndex, disableSystemFocusVisuals: false, handledKeyDownKeys: DOWN_KEYCODES, handledKeyUpKeys: UP_KEYCODES, onKeyDown: this._onKeyDown, onKeyUp: this._onKeyUp, onFocus: this._onFocus, onAccessibilityTap: this._onPress });
            return (React.createElement(FocusableText, __assign({}, focusableTextProps)));
        }
        else {
            // TODO: The "in text parent" case requires a React Native view that maps to
            // XAML Hyperlink but this RN view isn't implemented yet.
            return _super.prototype._render.call(this, internalProps);
        }
    };
    Link.prototype.focus = function () {
        if (this._focusableElement && this._focusableElement.focus) {
            this._focusableElement.focus();
        }
    };
    Link.prototype.blur = function () {
        if (this._focusableElement && this._focusableElement.blur) {
            this._focusableElement.blur();
        }
    };
    Link.prototype.setNativeProps = function (nativeProps) {
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
    Link.prototype.onFocus = function () {
        // Focus Manager hook
    };
    Link.prototype.getTabIndex = function () {
        // Link defaults to a tabIndex of 0
        // Focus Manager may override this
        return this.props.tabIndex || 0;
    };
    Link.prototype.updateNativeTabIndex = function () {
        if (this._focusableElement) {
            var tabIndex = this.getTabIndex();
            var windowsTabFocusable = tabIndex !== undefined && tabIndex >= 0;
            this._focusableElement.setNativeProps({
                tabIndex: tabIndex,
                isTabStop: windowsTabFocusable
            });
        }
    };
    Link.contextTypes = {
        isRxParentAText: PropTypes.bool
    };
    return Link;
}(Link_1.Link));
exports.Link = Link;
FocusManager_1.applyFocusableComponentMixin(Link);
exports.default = Link;
