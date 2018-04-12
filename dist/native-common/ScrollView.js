"use strict";
/**
* ScrollView.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN-specific implementation of the cross-platform ScrollView abstraction.
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
var ViewBase_1 = require("./ViewBase");
var ScrollView = /** @class */ (function (_super) {
    __extends(ScrollView, _super);
    function ScrollView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._scrollTop = 0;
        _this._scrollLeft = 0;
        _this._onScroll = function (event) {
            var nativeEvent = event.nativeEvent;
            _this._scrollTop = nativeEvent.contentOffset.y;
            _this._scrollLeft = nativeEvent.contentOffset.x;
            if (_this.props.onScroll) {
                _this.props.onScroll(_this._scrollTop, _this._scrollLeft);
            }
        };
        return _this;
    }
    ScrollView.prototype._render = function (props) {
        return (React.createElement(RN.ScrollView, __assign({}, props), props.children));
    };
    ScrollView.prototype.render = function () {
        var scrollThrottle = this.props.scrollEventThrottle || 16;
        if (scrollThrottle === 0) {
            // Fire at 60fps
            scrollThrottle = 16;
        }
        var layoutCallback = this.props.onLayout ?
            // We have a callback function, call the wrapper
            this._onLayout :
            undefined;
        var scrollCallback = this.props.onScroll ?
            // We have a callback function, call the wrapper
            this._onScroll :
            undefined;
        var keyboardShouldPersistTaps = (this.props.keyboardShouldPersistTaps ? 'always' : 'never');
        // NOTE: We are setting `automaticallyAdjustContentInsets` to false
        // (http://facebook.github.io/react-native/docs/scrollview.html#automaticallyadjustcontentinsets). The
        // 'automaticallyAdjustContentInsets' property is designed to offset the ScrollView's content to account for the
        // navigation and tab bars in iOS.
        // (navigationBarHidden={true}). We believe that React Native may not be calculating the content insets for the
        // ScrollView correctly in this situation. Disabling this calculation seems to fix the ScrollView inset issues.
        // Currently RX does not expose any components that would require `automaticallyAdjustContentInsets` to be
        // set to true.
        // We also set removeClippedSubviews to false, overriding the default value. Most of the scroll views
        // we use are virtualized anyway.
        var internalProps = {
            ref: this._setNativeView,
            style: this.props.style,
            onScroll: scrollCallback,
            automaticallyAdjustContentInsets: false,
            showsHorizontalScrollIndicator: this.props.showsHorizontalScrollIndicator,
            showsVerticalScrollIndicator: this.props.showsVerticalScrollIndicator,
            keyboardDismissMode: this.props.keyboardDismissMode,
            keyboardShouldPersistTaps: keyboardShouldPersistTaps,
            scrollEnabled: this.props.scrollEnabled,
            onContentSizeChange: this.props.onContentSizeChange,
            onLayout: layoutCallback,
            scrollEventThrottle: scrollThrottle,
            horizontal: this.props.horizontal,
            bounces: this.props.bounces,
            pagingEnabled: this.props.pagingEnabled,
            snapToInterval: this.props.snapToInterval,
            onMoveShouldSetResponder: this.props.onMoveShouldSetResponder,
            scrollsToTop: this.props.scrollsToTop,
            removeClippedSubviews: false,
            overScrollMode: this.props.overScrollMode,
            scrollIndicatorInsets: this.props.scrollIndicatorInsets,
            onScrollBeginDrag: this.props.onScrollBeginDrag,
            onScrollEndDrag: this.props.onScrollEndDrag,
            children: this.props.children
        };
        return this._render(internalProps);
    };
    ScrollView.prototype.setScrollTop = function (scrollTop, animate) {
        if (this._nativeView) {
            this._nativeView.scrollTo({ x: this._scrollLeft, y: scrollTop, animated: animate });
        }
    };
    ScrollView.prototype.setScrollLeft = function (scrollLeft, animate) {
        if (this._nativeView) {
            this._nativeView.scrollTo({ x: scrollLeft, y: this._scrollTop, animated: animate });
        }
    };
    ScrollView.prototype.addToScrollTop = function (deltaTop, animate) {
        if (this._nativeView) {
            this._nativeView.scrollBy({ deltaX: 0, deltaY: deltaTop, animated: animate });
        }
    };
    ScrollView.prototype.addToScrollLeft = function (deltaLeft, animate) {
        if (this._nativeView) {
            this._nativeView.scrollBy({ deltaX: deltaLeft, deltaY: 0, animated: animate });
        }
    };
    ScrollView.useCustomScrollbars = function () {
        // not needed
    };
    return ScrollView;
}(ViewBase_1.default));
exports.ScrollView = ScrollView;
exports.default = ScrollView;
