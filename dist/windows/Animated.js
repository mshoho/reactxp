"use strict";
/**
* Animated.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN Windows-specific implementation of Animated wrapper.
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
var RX = require("../common/Interfaces");
var Animated_1 = require("../native-common/Animated");
var View_1 = require("./View");
var ReactAnimatedView = RN.Animated.createAnimatedComponent(View_1.default, true);
var AnimatedView = /** @class */ (function (_super) {
    __extends(AnimatedView, _super);
    function AnimatedView(props) {
        var _this = _super.call(this, props) || this;
        _this._onAnimatedComponentRef = function (ref) {
            _this._animatedComponent = ref;
        };
        return _this;
    }
    AnimatedView.prototype.setNativeProps = function (props) {
        if (this._animatedComponent) {
            if (!this._animatedComponent.setNativeProps) {
                throw 'Component does not implement setNativeProps';
            }
            this._animatedComponent.setNativeProps(props);
        }
    };
    AnimatedView.prototype.render = function () {
        return (React.createElement(ReactAnimatedView, __assign({ ref: this._onAnimatedComponentRef }, this.props), this.props.children));
    };
    AnimatedView.prototype.focus = function () {
        if (this._animatedComponent && this._animatedComponent._component) {
            this._animatedComponent._component.focus();
        }
    };
    AnimatedView.prototype.blur = function () {
        if (this._animatedComponent && this._animatedComponent._component) {
            this._animatedComponent._component.blur();
        }
    };
    AnimatedView.prototype.setFocusRestricted = function (restricted) {
        if (this._animatedComponent && this._animatedComponent._component) {
            this._animatedComponent._component.setFocusRestricted(restricted);
        }
    };
    AnimatedView.prototype.setFocusLimited = function (limited) {
        if (this._animatedComponent && this._animatedComponent._component) {
            this._animatedComponent._component.setFocusLimited(limited);
        }
    };
    return AnimatedView;
}(RX.AnimatedView));
exports.AnimatedView = AnimatedView;
exports.Animated = {
    Image: Animated_1.Animated.Image,
    Text: Animated_1.Animated.Text,
    TextInput: Animated_1.Animated.TextInput,
    View: AnimatedView,
    Easing: Animated_1.Animated.Easing,
    timing: Animated_1.Animated.timing,
    delay: Animated_1.Animated.delay,
    parallel: Animated_1.Animated.parallel,
    sequence: Animated_1.Animated.sequence,
    Value: RN.Animated.Value,
    createValue: function (initialValue) { return new RN.Animated.Value(initialValue); },
    interpolate: function (animatedValue, inputRange, outputRange) {
        return animatedValue.interpolate({
            inputRange: inputRange,
            outputRange: outputRange
        });
    }
};
exports.default = exports.Animated;
