"use strict";
/**
* Link.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN-specific implementation of the cross-platform Link abstraction.
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
var EventHelpers_1 = require("./utils/EventHelpers");
var Linking_1 = require("../native-common/Linking");
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._mountedComponent = null;
        _this._onMount = function (component) {
            _this._mountedComponent = component;
        };
        _this._onPress = function (e) {
            if (EventHelpers_1.default.isRightMouseButton(e)) {
                return;
            }
            if (_this.props.onPress) {
                _this.props.onPress(EventHelpers_1.default.toMouseEvent(e), _this.props.url);
                return;
            }
            // The default action is to launch a browser.
            if (_this.props.url) {
                Linking_1.default.openUrl(_this.props.url).catch(function (err) {
                    // Catch the exception so it doesn't propagate.
                });
            }
        };
        _this._onLongPress = function (e) {
            if (!EventHelpers_1.default.isRightMouseButton(e) && _this.props.onLongPress) {
                _this.props.onLongPress(EventHelpers_1.default.toMouseEvent(e), _this.props.url);
            }
        };
        return _this;
    }
    // To be able to use Link inside TouchableHighlight/TouchableOpacity
    Link.prototype.setNativeProps = function (nativeProps) {
        if (this._mountedComponent) {
            this._mountedComponent.setNativeProps(nativeProps);
        }
    };
    Link.prototype.render = function () {
        var internalProps = {
            ref: this._onMount,
            style: this.props.style,
            numberOfLines: this.props.numberOfLines === 0 ? undefined : this.props.numberOfLines,
            onPress: this._onPress,
            onLongPress: this._onLongPress,
            allowFontScaling: this.props.allowFontScaling,
            maxContentSizeMultiplier: this.props.maxContentSizeMultiplier,
            children: this.props.children
        };
        return this._render(internalProps);
    };
    Link.prototype._render = function (internalProps) {
        return (React.createElement(RN.Text, __assign({}, internalProps)));
    };
    return Link;
}(React.Component));
exports.Link = Link;
exports.default = Link;
