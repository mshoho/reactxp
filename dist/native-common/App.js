"use strict";
/**
* App.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Native implementation of App API namespace.
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
var RN = require("react-native");
var RootView_1 = require("./RootView");
var RX = require("../common/Interfaces");
var Types = require("../common/Types");
var _rnStateToRxState = {
    'unknown': Types.AppActivationState.Active,
    'active': Types.AppActivationState.Active,
    'background': Types.AppActivationState.Background,
    'inactive': Types.AppActivationState.Inactive,
    'extension': Types.AppActivationState.Extension,
    // uninitialized means in Background on android since last change I did
    'uninitialized': Types.AppActivationState.Background
};
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super.call(this) || this;
        RN.AppState.addEventListener('change', function (newState) {
            // Fall back to active if a new state spits out that we don't know about
            _this.activationStateChangedEvent.fire(_rnStateToRxState[newState] || Types.AppActivationState.Active);
        });
        RN.AppState.addEventListener('memoryWarning', function () {
            _this.memoryWarningEvent.fire();
        });
        return _this;
    }
    App.prototype.initialize = function (debug, development) {
        _super.prototype.initialize.call(this, debug, development);
        window['rxdebug'] = debug;
        RN.AppRegistry.registerComponent('RXApp', this.getRootViewFactory());
    };
    App.prototype.getActivationState = function () {
        return _rnStateToRxState[RN.AppState.currentState] || Types.AppActivationState.Active;
    };
    App.prototype.getRootViewFactory = function () {
        return function () { return RootView_1.RootView; };
    };
    return App;
}(RX.App));
exports.App = App;
exports.default = new App();
