"use strict";
/**
* RootView.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* The top-most view that's used for proper layering or modals and popups.
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
var PropTypes = require("prop-types");
var RootView_1 = require("../native-common/RootView");
exports.BaseRootView = RootView_1.BaseRootView;
var Input_1 = require("./Input");
var UserInterface_1 = require("./UserInterface");
var EventHelpers_1 = require("../native-common/utils/EventHelpers");
var FocusManager_1 = require("./utils/FocusManager");
var FrontLayerViewManager_1 = require("../native-common/FrontLayerViewManager");
var KEY_CODE_TAB = 9;
var KEY_CODE_ESC = 27;
var styles = RN.StyleSheet.create({
    appWrapper: {
        flex: 1
    }
});
function applyDesktopBehaviorMixin(RootViewBase) {
    return _a = /** @class */ (function (_super) {
            __extends(RootView, _super);
            function RootView() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, args) || this;
                _this._keyboardHandlerInstalled = false;
                _this._isNavigatingWithKeyboard = false;
                _this._onTouchStartCapture = function (e) {
                    _this._updateKeyboardNavigationState(false);
                };
                _this._onKeyDownCapture = function (e) {
                    var kbdEvent = EventHelpers_1.default.toKeyboardEvent(e);
                    if (kbdEvent.keyCode === KEY_CODE_TAB) {
                        _this._updateKeyboardNavigationState(true);
                    }
                    if (kbdEvent.keyCode === KEY_CODE_ESC) {
                        // If Esc is pressed and the focused element stays the same after some time,
                        // switch the keyboard navigation off to dismiss the outline.
                        var activeComponent_1 = FocusManager_1.default.getCurrentFocusedComponent();
                        if (_this._isNavigatingWithKeyboardUpateTimer) {
                            clearTimeout(_this._isNavigatingWithKeyboardUpateTimer);
                        }
                        _this._isNavigatingWithKeyboardUpateTimer = setTimeout(function () {
                            _this._isNavigatingWithKeyboardUpateTimer = undefined;
                            if (activeComponent_1 === FocusManager_1.default.getCurrentFocusedComponent()) {
                                _this._updateKeyboardNavigationState(false);
                            }
                        }, 500);
                    }
                };
                _this._onKeyDown = function (e) {
                    var kbdEvent = EventHelpers_1.default.toKeyboardEvent(e);
                    Input_1.default.dispatchKeyDown(kbdEvent);
                };
                _this._onKeyUp = function (e) {
                    var kbdEvent = EventHelpers_1.default.toKeyboardEvent(e);
                    var activePopupId = FrontLayerViewManager_1.default.getActivePopupId();
                    if (activePopupId && (kbdEvent.keyCode === KEY_CODE_ESC)) {
                        if (e.stopPropagation) {
                            e.stopPropagation();
                        }
                        FrontLayerViewManager_1.default.dismissPopup(activePopupId);
                        return;
                    }
                    Input_1.default.dispatchKeyUp(kbdEvent);
                };
                // Initialize the root FocusManager which is aware of all
                // focusable elements.
                _this._focusManager = new FocusManager_1.default(undefined);
                return _this;
            }
            RootView.prototype._updateKeyboardNavigationState = function (isNavigatingWithKeyboard) {
                if (this._isNavigatingWithKeyboardUpateTimer) {
                    clearTimeout(this._isNavigatingWithKeyboardUpateTimer);
                    this._isNavigatingWithKeyboardUpateTimer = undefined;
                }
                if (this._isNavigatingWithKeyboard !== isNavigatingWithKeyboard) {
                    this._isNavigatingWithKeyboard = isNavigatingWithKeyboard;
                    UserInterface_1.default.keyboardNavigationEvent.fire(isNavigatingWithKeyboard);
                }
            };
            RootView.prototype.getChildContext = function () {
                // Provide the context with root FocusManager to all descendants.
                return {
                    focusManager: this._focusManager
                };
            };
            RootView.prototype.render = function () {
                var content = _super.prototype.render.call(this);
                // Using "any" since onKeyDown/onKeyUp/etc. are not defined at RN.View property level
                // Yet the handlers are called as part of capturing/bubbling events for/from children.
                var internalProps = {
                    onKeyDown: this._onKeyDown,
                    onKeyDownCapture: this._onKeyDownCapture,
                    onKeyUp: this._onKeyUp,
                    onTouchStartCapture: this._onTouchStartCapture
                };
                return (React.createElement(RN.View, __assign({}, internalProps, { style: styles.appWrapper }), content));
            };
            return RootView;
        }(RootViewBase)),
        _a.childContextTypes = {
            focusManager: PropTypes.object
        },
        _a;
    var _a;
}
var RootViewUsingStore = applyDesktopBehaviorMixin(RootView_1.RootView);
exports.RootView = RootViewUsingStore;
var RootViewUsingProps = applyDesktopBehaviorMixin(RootView_1.RootViewUsingProps);
exports.RootViewUsingProps = RootViewUsingProps;
exports.default = RootViewUsingStore;
