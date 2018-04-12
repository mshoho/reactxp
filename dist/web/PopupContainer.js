"use strict";
/**
* PopupContainer.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Common parent of all components rendered into a popup. Calls onShow and onHide
* callbacks when the popup is hidden (i.e. "closed" but still rendered as hidden)
* and re-shown.
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
var _ = require("./utils/lodashMini");
var React = require("react");
var PropTypes = require("prop-types");
var PopupContainer = /** @class */ (function (_super) {
    __extends(PopupContainer, _super);
    function PopupContainer(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._popupComponentStack = [];
        return _this;
    }
    PopupContainer.prototype.getChildContext = function () {
        return {
            focusManager: this.context.focusManager,
            popupContainer: this
        };
    };
    PopupContainer.prototype.render = function () {
        var style = _.clone(this.props.style);
        if (this.props.hidden) {
            style.visibility = 'hidden';
        }
        return (React.createElement("div", { style: style, onMouseEnter: this.props.onMouseEnter, onMouseLeave: this.props.onMouseLeave }, this.props.children));
    };
    PopupContainer.prototype.registerPopupComponent = function (onShow, onHide) {
        var component = {
            onShow: onShow,
            onHide: onHide
        };
        this._popupComponentStack.push(component);
        return component;
    };
    PopupContainer.prototype.unregisterPopupComponent = function (component) {
        this._popupComponentStack = this._popupComponentStack.filter(function (c) { return c !== component; });
    };
    PopupContainer.prototype.isHidden = function () {
        return this.props.hidden || false;
    };
    PopupContainer.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.hidden && !this.props.hidden) {
            // call onShow on all registered components (iterate front to back)
            for (var i = 0; i < this._popupComponentStack.length; i++) {
                this._popupComponentStack[i].onShow();
            }
        }
        if (!prevProps.hidden && this.props.hidden) {
            // call onHide on all registered components (iterate back to front)
            for (var i = this._popupComponentStack.length - 1; i >= 0; i--) {
                this._popupComponentStack[i].onHide();
            }
        }
    };
    PopupContainer.contextTypes = {
        focusManager: PropTypes.object
    };
    PopupContainer.childContextTypes = {
        focusManager: PropTypes.object,
        popupContainer: PropTypes.object
    };
    return PopupContainer;
}(React.Component));
exports.PopupContainer = PopupContainer;
exports.default = PopupContainer;
