"use strict";
/**
* Network.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Native implementation of network information APIs.
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
var RX = require("../common/Interfaces");
var Types = require("../common/Types");
var Network = /** @class */ (function (_super) {
    __extends(Network, _super);
    function Network() {
        var _this = _super.call(this) || this;
        var onEventOccuredHandler = _this._onEventOccured.bind(_this);
        RN.NetInfo.isConnected.addEventListener('change', onEventOccuredHandler);
        return _this;
    }
    Network.prototype.isConnected = function () {
        var deferred = SyncTasks.Defer();
        RN.NetInfo.isConnected.fetch().then(function (isConnected) {
            deferred.resolve(isConnected);
        }).catch(function () {
            deferred.reject('RN.NetInfo.isConnected.fetch() failed');
        });
        return deferred.promise();
    };
    Network.prototype.getType = function () {
        // Is the newer call available? Use it instead of the soon-to-be-deprecated
        // NetInfo.fetch call if possible.
        if (RN.NetInfo.getConnectionInfo) {
            return SyncTasks.fromThenable(RN.NetInfo.getConnectionInfo()).then(function (info) {
                return Network._getNetworkTypeFromConnectionInfo(info);
            });
        }
        else {
            // Use the older RN.NetInfo.fetch call if the newer call isn't available.
            return SyncTasks.fromThenable(RN.NetInfo.fetch().then(function (networkType) {
                return Network._getNetworkTypeFromNetInfo(networkType);
            }));
        }
    };
    Network.prototype._onEventOccured = function (isConnected) {
        this.connectivityChangedEvent.fire(isConnected);
    };
    Network._getNetworkTypeFromNetInfo = function (networkType) {
        switch (networkType) {
            case 'UNKNOWN':
                return Types.DeviceNetworkType.Unknown;
            case 'NONE':
                return Types.DeviceNetworkType.None;
            case 'WIFI':
                return Types.DeviceNetworkType.Wifi;
            case 'MOBILE_2G':
                return Types.DeviceNetworkType.Mobile2G;
            case 'MOBILE_3G':
                return Types.DeviceNetworkType.Mobile3G;
            case 'MOBILE_4G':
                return Types.DeviceNetworkType.Mobile4G;
        }
        return Types.DeviceNetworkType.Unknown;
    };
    Network._getNetworkTypeFromConnectionInfo = function (info) {
        if (info.effectiveType === '2g') {
            return Types.DeviceNetworkType.Mobile2G;
        }
        else if (info.effectiveType === '3g') {
            return Types.DeviceNetworkType.Mobile3G;
        }
        else if (info.effectiveType === '4g') {
            return Types.DeviceNetworkType.Mobile4G;
        }
        else if (info.type === 'wifi' || info.type === 'ethernet') {
            return Types.DeviceNetworkType.Wifi;
        }
        else if (info.type === 'none') {
            return Types.DeviceNetworkType.None;
        }
        return Types.DeviceNetworkType.Unknown;
    };
    return Network;
}(RX.Network));
exports.Network = Network;
exports.default = new Network();
