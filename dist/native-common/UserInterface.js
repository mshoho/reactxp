"use strict";
/**
* UserInterface.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN implementation of the ReactXP interfaces related to
* UI (layout measurements, etc.).
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
var assert = require("assert");
var React = require("react");
var RN = require("react-native");
var SyncTasks = require("synctasks");
var MainViewStore_1 = require("./MainViewStore");
var RootView_1 = require("./RootView");
var RX = require("../common/Interfaces");
var UserInterface = /** @class */ (function (_super) {
    __extends(UserInterface, _super);
    function UserInterface() {
        var _this = _super.call(this) || this;
        RN.Dimensions.addEventListener('change', function (event) {
            _this.contentSizeMultiplierChangedEvent.fire(event.window.fontScale);
        });
        return _this;
    }
    UserInterface.prototype.measureLayoutRelativeToWindow = function (component) {
        var deferred = SyncTasks.Defer();
        var nodeHandle = RN.findNodeHandle(component);
        assert.ok(!!nodeHandle);
        RN.NativeModules.UIManager.measureInWindow(nodeHandle, function (x, y, width, height) {
            deferred.resolve({
                x: x,
                y: y,
                width: width,
                height: height
            });
        });
        return deferred.promise();
    };
    UserInterface.prototype.measureLayoutRelativeToAncestor = function (component, ancestor) {
        var deferred = SyncTasks.Defer();
        var nodeHandle = RN.findNodeHandle(component);
        var ancestorNodeHander = RN.findNodeHandle(ancestor);
        RN.NativeModules.UIManager.measureLayout(nodeHandle, ancestorNodeHander, function () {
            deferred.reject('UIManager.measureLayout() failed');
        }, function (x, y, width, height, pageX, pageY) {
            deferred.resolve({
                x: x,
                y: y,
                width: width,
                height: height
            });
        });
        return deferred.promise();
    };
    UserInterface.prototype.measureWindow = function () {
        var dimensions = RN.Dimensions.get('window');
        return {
            x: 0,
            y: 0,
            width: dimensions.width,
            height: dimensions.height
        };
    };
    UserInterface.prototype.getContentSizeMultiplier = function () {
        var deferred = SyncTasks.Defer();
        // TODO: #727532 Remove conditional after implementing UIManager.getContentSizeMultiplier for UWP
        // TODO:(alregner) Remove conditional after implementing UIManager.getContentSizeMultiplier for macos
        if (RN.Platform.OS === 'windows' || RN.Platform.OS === 'macos') {
            deferred.resolve(1);
        }
        else {
            deferred.resolve(RN.PixelRatio.getFontScale());
        }
        return deferred.promise();
    };
    UserInterface.prototype.getMaxContentSizeMultiplier = function () {
        var deferred = SyncTasks.Defer();
        // TODO: #727532 Remove conditional after implementing UIManager.getContentSizeMultiplier for UWP
        // TODO:(alregner) Remove conditional after implementing UIManager.getContentSizeMultiplier for macos
        if (RN.Platform.OS === 'windows' || RN.Platform.OS === 'macos') {
            deferred.resolve(1);
        }
        else {
            RN.NativeModules.UIManager.getMaxContentSizeMultiplier(function (value) {
                deferred.resolve(value);
            });
        }
        return deferred.promise();
    };
    UserInterface.prototype.setMaxContentSizeMultiplier = function (maxContentSizeMultiplier) {
        // TODO: #727532 Remove conditional after implementing UIManager.getContentSizeMultiplier for UWP
        // TODO:(alregner) Remove conditional after implementing UIManager.getContentSizeMultiplier for macos
        if (RN.Platform.OS !== 'windows' && RN.Platform.OS !== 'macos') {
            RN.NativeModules.UIManager.setMaxContentSizeMultiplier(maxContentSizeMultiplier);
        }
    };
    UserInterface.prototype.useCustomScrollbars = function (enable) {
        if (enable === void 0) { enable = true; }
        // Nothing to do
    };
    UserInterface.prototype.dismissKeyboard = function () {
        RN.TextInput.State.blurTextInput(RN.TextInput.State.currentlyFocusedField());
    };
    UserInterface.prototype.isHighPixelDensityScreen = function () {
        var ratio = RN.PixelRatio.get();
        var isHighDef = ratio > 1;
        return isHighDef;
    };
    UserInterface.prototype.getPixelRatio = function () {
        return RN.PixelRatio.get();
    };
    UserInterface.prototype.setMainView = function (element) {
        MainViewStore_1.default.setMainView(element);
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
    UserInterface.prototype.renderMainView = function () {
        // Nothing to do
    };
    UserInterface.prototype.enableTouchLatencyEvents = function (latencyThresholdMs) {
        this._touchLatencyThresholhdMs = latencyThresholdMs;
    };
    UserInterface.prototype.evaluateTouchLatency = function (e) {
        if (this._touchLatencyThresholhdMs) {
            var latency = Date.now() - e.timeStamp.valueOf();
            if (latency > this._touchLatencyThresholhdMs) {
                this.touchLatencyEvent.fire(latency);
            }
        }
    };
    UserInterface.prototype.isNavigatingWithKeyboard = function () {
        return false;
    };
    return UserInterface;
}(RX.UserInterface));
exports.UserInterface = UserInterface;
exports.default = new UserInterface();
