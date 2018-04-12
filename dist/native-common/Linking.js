"use strict";
/**
* Linking.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN-specific implementation for deep linking.
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
var SyncTasks = require("synctasks");
var Linking_1 = require("../common/Linking");
var Types = require("../common/Types");
var Linking = /** @class */ (function (_super) {
    __extends(Linking, _super);
    function Linking() {
        var _this = _super.call(this) || this;
        RN.Linking.addEventListener('url', function (event) {
            _this.deepLinkRequestEvent.fire(event.url);
        });
        return _this;
    }
    Linking.prototype._openUrl = function (url) {
        var defer = SyncTasks.Defer();
        RN.Linking.canOpenURL(url).then(function (value) {
            if (!value) {
                defer.reject({
                    code: Types.LinkingErrorCode.NoAppFound,
                    url: url,
                    description: 'No app found to handle url: ' + url
                });
            }
            else {
                RN.Linking.openURL(url).then(function () {
                    defer.resolve(void 0);
                }, function (err) {
                    defer.reject(err);
                });
            }
        }).catch(function (error) {
            defer.reject({
                code: Types.LinkingErrorCode.UnexpectedFailure,
                url: url,
                description: error
            });
        });
        return defer.promise();
    };
    Linking.prototype.getInitialUrl = function () {
        var defer = SyncTasks.Defer();
        RN.Linking.getInitialURL().then(function (url) {
            defer.resolve(url);
        }).catch(function (error) {
            defer.reject({
                code: Types.LinkingErrorCode.InitialUrlNotFound,
                url: '',
                description: error
            });
        });
        return defer.promise();
    };
    // Launches Email app
    Linking.prototype.launchEmail = function (emailInfo) {
        // Format email info
        var emailUrl = this._createEmailUrl(emailInfo);
        return this._openUrl(emailUrl);
    };
    return Linking;
}(Linking_1.Linking));
exports.Linking = Linking;
exports.default = new Linking();
