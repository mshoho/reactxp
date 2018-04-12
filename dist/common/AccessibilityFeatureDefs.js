"use strict";
/**
* AccessibilityFeatureDefs.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Commonly used accessibility feature definitions.
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
// XXX:
var AccessibilityFeatureBase_1 = require("./AccessibilityFeatureBase");
var AccessibilityLabelDef = /** @class */ (function (_super) {
    __extends(AccessibilityLabelDef, _super);
    function AccessibilityLabelDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccessibilityLabelDef.prototype.getAndroidProps = function () {
        return {
            accessibilityLabel: this.props.label
        };
    };
    AccessibilityLabelDef.prototype.getIOSProps = function () {
        return {
            accessibilityLabel: this.props.label
        };
    };
    AccessibilityLabelDef.prototype.getWebProps = function () {
        return {
            'aria-label': this.props.label
        };
    };
    AccessibilityLabelDef.prototype.getMacOSProps = function () {
        return {};
    };
    AccessibilityLabelDef.prototype.getWindowsProps = function () {
        return {};
    };
    return AccessibilityLabelDef;
}(AccessibilityFeatureBase_1.AccessibilityFeatureDef));
exports.AccessibilityLabelDef = AccessibilityLabelDef;
var AccessibilityHiddenDef = /** @class */ (function (_super) {
    __extends(AccessibilityHiddenDef, _super);
    function AccessibilityHiddenDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccessibilityHiddenDef.prototype.getAndroidProps = function () {
        return {
            accessible: false,
            importantForAccessibility: this.props.hideDescendants ? 'no-hide-descendants' : 'no'
        };
    };
    AccessibilityHiddenDef.prototype.getIOSProps = function () {
        return {
            accessible: false,
            accessibilityTraits: AccessibilityFeatureBase_1.IOSAccessibilityTraits.none
        };
    };
    AccessibilityHiddenDef.prototype.getWebProps = function () {
        return {
            role: AccessibilityFeatureBase_1.WebRole.none,
            'aria-hidden': this.props.hideDescendants ? 'true' : undefined
        };
    };
    AccessibilityHiddenDef.prototype.getMacOSProps = function () {
        // Not implemented yet.
        return {};
    };
    AccessibilityHiddenDef.prototype.getWindowsProps = function () {
        // Not implemented yet.
        return {};
    };
    return AccessibilityHiddenDef;
}(AccessibilityFeatureBase_1.AccessibilityFeatureDef));
exports.AccessibilityHiddenDef = AccessibilityHiddenDef;
var CheckboxDef = /** @class */ (function (_super) {
    __extends(CheckboxDef, _super);
    function CheckboxDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxDef.setFeatureProps = function (props) {
        CheckboxDef._checkboxLabel = props.checkboxLabel;
        CheckboxDef._checkedLabel = props.checkedLabel;
        CheckboxDef._uncheckedLabel = props.uncheckedLabel;
    };
    CheckboxDef.prototype.getAndroidProps = function () {
        return {
            accessible: true,
            importantForAccessibility: 'yes',
            accessibilityLabel: CheckboxDef._checkboxLabel + ', ' +
                (this.props.checked ? CheckboxDef._checkedLabel : CheckboxDef._uncheckedLabel)
        };
    };
    CheckboxDef.prototype.getIOSProps = function () {
        return {
            accessible: true,
            accessibilityTraits: AccessibilityFeatureBase_1.IOSAccessibilityTraits.button,
            accessibilityLabel: CheckboxDef._checkboxLabel + ', ' +
                (this.props.checked ? CheckboxDef._checkedLabel : CheckboxDef._uncheckedLabel)
        };
    };
    CheckboxDef.prototype.getWebProps = function () {
        return {
            tabIndex: 0,
            role: AccessibilityFeatureBase_1.WebRole.checkbox,
            'aria-checked': this.props.checked ? 'true' : 'false'
        };
    };
    CheckboxDef.prototype.getMacOSProps = function () {
        // Not implemented yet.
        return {};
    };
    CheckboxDef.prototype.getWindowsProps = function () {
        // Not implemented yet.
        return {};
    };
    // Default labels.
    CheckboxDef._checkboxLabel = 'checkbox';
    CheckboxDef._checkedLabel = 'checked';
    CheckboxDef._uncheckedLabel = 'unchecked';
    return CheckboxDef;
}(AccessibilityFeatureBase_1.AccessibilityFeatureDef));
exports.CheckboxDef = CheckboxDef;
