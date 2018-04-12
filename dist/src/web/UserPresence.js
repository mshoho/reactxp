"use strict";
/**
* UserPresence.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the ReactXP interfaces related to
* user presence.
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
if (typeof (document) !== 'undefined') {
    var ifvisible = require('ifvisible');
}
var UserPresence = /** @class */ (function (_super) {
    __extends(UserPresence, _super);
    function UserPresence() {
        var _this = _super.call(this) || this;
        // Handle test environment where document is not defined.
        if (typeof (document) !== 'undefined') {
            _this._isPresent = ifvisible.now();
            ifvisible.on('wakeup', _this._handleWakeup.bind(_this));
            ifvisible.on('idle', _this._handleIdle.bind(_this));
            ifvisible.on('focus', _this._handleFocus.bind(_this));
            ifvisible.on('blur', _this._handleBlur.bind(_this));
            window.addEventListener('blur', _this._handleWindowBlur.bind(_this));
        }
        else {
            _this._isPresent = false;
        }
        return _this;
    }
    UserPresence.prototype.isUserPresent = function () {
        // Handle test environment where document is not defined.
        if (typeof (document) !== 'undefined') {
            return ifvisible.now();
        }
        else {
            return true;
        }
    };
    UserPresence.prototype._setUserPresent = function (isPresent) {
        if (this._isPresent !== isPresent) {
            this._isPresent = isPresent;
            this.userPresenceChangedEvent.fire(isPresent);
        }
    };
    UserPresence.prototype._handleWakeup = function () {
        this._setUserPresent(true);
    };
    UserPresence.prototype._handleIdle = function () {
        this._setUserPresent(false);
    };
    UserPresence.prototype._handleFocus = function () {
        this._setUserPresent(true);
    };
    UserPresence.prototype._handleBlur = function () {
        this._setUserPresent(false);
    };
    UserPresence.prototype._handleWindowBlur = function () {
        ifvisible.idle();
    };
    return UserPresence;
}(RX.UserPresence));
exports.UserPresence = UserPresence;
var instance = new UserPresence();
exports.default = instance;
