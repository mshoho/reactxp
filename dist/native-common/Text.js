"use strict";
/**
* Text.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN-specific implementation of the cross-platform Text abstraction.
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
var PropTypes = require("prop-types");
var React = require("react");
var RN = require("react-native");
var AccessibilityUtil_1 = require("./AccessibilityUtil");
var AutoFocusHelper_1 = require("../common/utils/AutoFocusHelper");
var EventHelpers_1 = require("./utils/EventHelpers");
var Styles_1 = require("./Styles");
var _styles = {
    defaultText: Styles_1.default.createTextStyle({
        overflow: 'hidden'
    })
};
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._mountedComponent = null;
        _this._onMount = function (component) {
            _this._mountedComponent = component;
        };
        _this._onPress = function (e) {
            if (EventHelpers_1.default.isRightMouseButton(e)) {
                if (_this.props.onContextMenu) {
                    _this.props.onContextMenu(EventHelpers_1.default.toMouseEvent(e));
                }
            }
            else {
                if (_this.props.onPress) {
                    _this.props.onPress(EventHelpers_1.default.toMouseEvent(e));
                }
            }
        };
        return _this;
    }
    // To be able to use Text inside TouchableHighlight/TouchableOpacity
    Text.prototype.setNativeProps = function (nativeProps) {
        if (this._mountedComponent) {
            this._mountedComponent.setNativeProps(nativeProps);
        }
    };
    Text.prototype.render = function () {
        var importantForAccessibility = AccessibilityUtil_1.default.importantForAccessibilityToString(this.props.importantForAccessibility);
        // The presence of any of the onPress or onContextMenu makes the RN.Text a potential touch responder
        var onPress = (this.props.onPress || this.props.onContextMenu) ? this._onPress : undefined;
        return (React.createElement(RN.Text, { style: this._getStyles(), ref: this._onMount, importantForAccessibility: importantForAccessibility, numberOfLines: this.props.numberOfLines, allowFontScaling: this.props.allowFontScaling, maxContentSizeMultiplier: this.props.maxContentSizeMultiplier, onPress: onPress, selectable: this.props.selectable, textBreakStrategy: 'simple', ellipsizeMode: this.props.ellipsizeMode }, this.props.children));
    };
    Text.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.autoFocus) {
            AutoFocusHelper_1.autoFocusIfNeeded(this.props.autoFocus, function () { return _this.focus(); }, function () { return !!_this._mountedComponent; });
        }
    };
    Text.prototype.getChildContext = function () {
        // Let descendant RX components know that their nearest RX ancestor is an RX.Text.
        // Because they're in an RX.Text, they should style themselves specially for appearing
        // inline with text.
        return { isRxParentAText: true };
    };
    Text.prototype._getStyles = function () {
        return _.compact([_styles.defaultText, this.props.style]);
    };
    Text.prototype.focus = function () {
        AccessibilityUtil_1.default.setAccessibilityFocus(this);
    };
    Text.prototype.blur = function () {
        // No-op
    };
    Text.childContextTypes = {
        isRxParentAText: PropTypes.bool.isRequired,
    };
    return Text;
}(React.Component));
exports.Text = Text;
exports.default = Text;
