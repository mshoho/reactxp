"use strict";
/**
* TextInput.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN Windows-specific implementation of the cross-platform TextInput abstraction.
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
var FocusManager_1 = require("../native-desktop/utils/FocusManager");
var TextInput_1 = require("../native-common/TextInput");
var TextInput = /** @class */ (function (_super) {
    __extends(TextInput, _super);
    function TextInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextInput.prototype._render = function (props) {
        var _this = this;
        return (React.createElement(RN.TextInput, __assign({}, props, { tabIndex: this.getTabIndex(), onFocus: function (e) { return _this._onFocusEx(e, props.onFocus); } })));
    };
    TextInput.prototype._onFocusEx = function (e, origHandler) {
        if (e.currentTarget === e.target) {
            this.onFocus();
        }
        if (origHandler) {
            origHandler(e);
        }
    };
    // From FocusManagerFocusableComponent interface
    //
    TextInput.prototype.onFocus = function () {
        // Focus Manager hook
    };
    TextInput.prototype.getTabIndex = function () {
        // Focus Manager may override this
        return this.props.tabIndex;
    };
    TextInput.prototype.updateNativeTabIndex = function () {
        if (this._mountedComponent) {
            var tabIndex = this.getTabIndex();
            this._mountedComponent.setNativeProps({
                tabIndex: tabIndex,
                value: this.state.inputValue // mandatory for some reason
            });
        }
    };
    return TextInput;
}(TextInput_1.TextInput));
exports.TextInput = TextInput;
FocusManager_1.applyFocusableComponentMixin(TextInput);
exports.default = TextInput;
