"use strict";
/**
* App.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Implements App interface for ReactXP.
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
var RX = require("../common/Interfaces");
var Types = require("../common/Types");
if (typeof (document) !== 'undefined') {
    var ifvisible = require('ifvisible');
}
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super.call(this) || this;
        // Handle test environment where document is not defined.
        if (typeof (document) !== 'undefined') {
            _this._activationState = ifvisible.now() ? Types.AppActivationState.Active : Types.AppActivationState.Background;
            ifvisible.on('focus', function () {
                if (_this._activationState !== Types.AppActivationState.Active) {
                    _this._activationState = Types.AppActivationState.Active;
                    _this.activationStateChangedEvent.fire(_this._activationState);
                }
            });
            ifvisible.on('blur', function () {
                if (_this._activationState !== Types.AppActivationState.Background) {
                    _this._activationState = Types.AppActivationState.Background;
                    _this.activationStateChangedEvent.fire(_this._activationState);
                }
            });
        }
        else {
            _this._activationState = Types.AppActivationState.Active;
        }
        return _this;
    }
    App.prototype.initialize = function (debug, development) {
        _super.prototype.initialize.call(this, debug, development);
    };
    App.prototype.getActivationState = function () {
        return this._activationState;
    };
    return App;
}(RX.App));
exports.App = App;
exports.default = new App();
