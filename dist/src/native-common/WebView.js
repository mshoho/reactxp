"use strict";
/**
* WebView.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* A control that allows the display of an independent web page.
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
var _ = require("./lodashMini");
var React = require("react");
var RN = require("react-native");
var RX = require("../common/Interfaces");
var Styles_1 = require("./Styles");
var _styles = {
    webViewDefault: Styles_1.default.createWebViewStyle({
        flex: 1,
        alignSelf: 'stretch'
    })
};
var WebView = /** @class */ (function (_super) {
    __extends(WebView, _super);
    function WebView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._mountedComponent = null;
        _this._onMount = function (component) {
            _this._mountedComponent = component;
        };
        _this._onMessage = function (e) {
            if (_this.props.onMessage) {
                // Clone the original event because RN reuses events.
                var event_1 = _.clone(e);
                // Add the data element.
                event_1.data = e.nativeEvent.data;
                event_1.origin = '*';
                event_1.stopPropagation = function () {
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }
                };
                event_1.preventDefault = function () {
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                };
                _this.props.onMessage(event_1);
            }
        };
        return _this;
    }
    WebView.prototype.render = function () {
        var styles = [_styles.webViewDefault, this.props.style];
        var source = this.props.source;
        if (this.props.url) {
            source = {
                uri: this.props.url,
                headers: this.props.headers
            };
        }
        return (React.createElement(RN.WebView, { ref: this._onMount, style: styles, onNavigationStateChange: this.props.onNavigationStateChange, onShouldStartLoadWithRequest: this.props.onShouldStartLoadWithRequest, source: source, onLoad: this.props.onLoad, startInLoadingState: this.props.startInLoadingState, javaScriptEnabled: this.props.javaScriptEnabled, injectedJavaScript: this.props.injectedJavaScript, domStorageEnabled: this.props.domStorageEnabled, scalesPageToFit: this.props.scalesPageToFit, onError: this.props.onError, onLoadStart: this.props.onLoadStart, onMessage: this.props.onMessage ? this._onMessage : undefined }));
    };
    WebView.prototype.postMessage = function (message, targetOrigin) {
        if (targetOrigin === void 0) { targetOrigin = '*'; }
        if (this._mountedComponent) {
            this._mountedComponent.postMessage(message);
        }
    };
    WebView.prototype.reload = function () {
        if (this._mountedComponent) {
            this._mountedComponent.reload();
        }
    };
    WebView.prototype.goBack = function () {
        if (this._mountedComponent) {
            this._mountedComponent.goBack();
        }
    };
    WebView.prototype.goForward = function () {
        if (this._mountedComponent) {
            this._mountedComponent.goForward();
        }
    };
    return WebView;
}(RX.ViewBase));
exports.WebView = WebView;
exports.default = WebView;
