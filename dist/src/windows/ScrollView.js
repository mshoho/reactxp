"use strict";
/**
* ScrollView.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN Windows-specific implementation of the cross-platform ScrollView abstraction.
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
var ScrollView_1 = require("../native-common/ScrollView");
var EventHelpers_1 = require("../native-common/utils/EventHelpers");
var ScrollView = /** @class */ (function (_super) {
    __extends(ScrollView, _super);
    function ScrollView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onKeyDown = function (e) {
            if (_this.props.onKeyPress) {
                _this.props.onKeyPress(EventHelpers_1.default.toKeyboardEvent(e));
            }
        };
        return _this;
    }
    ScrollView.prototype._render = function (props) {
        var onKeyDownCallback = this.props.onKeyPress ? this._onKeyDown : undefined;
        // TODO: #737970 Remove special case for UWP when this bug is fixed. The bug
        //   causes you to have to click twice instead of once on some pieces of UI in
        //   order for the UI to acknowledge your interaction.
        var keyboardShouldPersistTaps = 'always';
        return (React.createElement(RN.ScrollView, __assign({}, props, { onKeyDown: onKeyDownCallback, keyboardShouldPersistTaps: keyboardShouldPersistTaps, tabNavigation: this.props.tabNavigation, disableKeyboardBasedScrolling: true }), props.children));
    };
    return ScrollView;
}(ScrollView_1.ScrollView));
exports.ScrollView = ScrollView;
exports.default = ScrollView;
