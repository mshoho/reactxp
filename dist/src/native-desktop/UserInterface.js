"use strict";
/**
* UserInterface.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN implementation of the ReactXP interfaces related to
* UI (layout measurements, etc.) - desktop version.
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
var RootView_1 = require("./RootView");
var UserInterface_1 = require("../native-common/UserInterface");
var UserInterface = /** @class */ (function (_super) {
    __extends(UserInterface, _super);
    function UserInterface() {
        var _this = _super.call(this) || this;
        _this._isNavigatingWithKeyboard = false;
        _this._keyboardNavigationStateChanged = function (isNavigatingWithKeyboard) {
            _this._isNavigatingWithKeyboard = isNavigatingWithKeyboard;
        };
        _this.keyboardNavigationEvent.subscribe(_this._keyboardNavigationStateChanged);
        return _this;
    }
    UserInterface.prototype.isNavigatingWithKeyboard = function () {
        return this._isNavigatingWithKeyboard;
    };
    UserInterface.prototype.registerRootView = function (viewKey, getComponentFunc) {
        RN.AppRegistry.registerComponent(viewKey, function () {
            var RootViewWrapper = /** @class */ (function (_super) {
                __extends(RootViewWrapper, _super);
                function RootViewWrapper() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                RootViewWrapper.prototype.render = function () {
                    return (React.createElement(RootView_1.RootViewUsingProps, __assign({ reactxp_mainViewType: getComponentFunc() }, this.props)));
                };
                return RootViewWrapper;
            }(React.Component));
            return RootViewWrapper;
        });
    };
    return UserInterface;
}(UserInterface_1.UserInterface));
exports.UserInterface = UserInterface;
exports.default = new UserInterface();
