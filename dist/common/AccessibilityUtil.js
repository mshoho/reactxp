"use strict";
/**
* AccessibilityUtil.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Common accessibility interface for platform-specific accessibility utilities.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var Types = require("../common/Types");
exports.ImportantForAccessibilityMap = (_a = {},
    _a[Types.ImportantForAccessibility.Auto] = 'auto',
    _a[Types.ImportantForAccessibility.Yes] = 'yes',
    _a[Types.ImportantForAccessibility.No] = 'no',
    _a[Types.ImportantForAccessibility.NoHideDescendants] = 'no-hide-descendants',
    _a);
// Platform specific helpers exposed through Native-Common AccessibilityUtil.
var AccessibilityPlatformUtil = /** @class */ (function () {
    function AccessibilityPlatformUtil() {
    }
    return AccessibilityPlatformUtil;
}());
exports.AccessibilityPlatformUtil = AccessibilityPlatformUtil;
var AccessibilityUtil = /** @class */ (function () {
    function AccessibilityUtil() {
    }
    AccessibilityUtil.prototype.isHidden = function (importantForAccessibility) {
        // aria-hidden is false by default, returning true or undefined, so that it doesn't pollute the DOM.
        if (importantForAccessibility) {
            var importantForAccessibilityString = this.importantForAccessibilityToString(importantForAccessibility);
            if (importantForAccessibilityString === exports.ImportantForAccessibilityMap[Types.ImportantForAccessibility.NoHideDescendants]) {
                return true;
            }
        }
        return undefined;
    };
    AccessibilityUtil.prototype.importantForAccessibilityToString = function (importantForAccessibility, defaultImportantForAccessibility) {
        importantForAccessibility = importantForAccessibility || defaultImportantForAccessibility;
        if (importantForAccessibility && exports.ImportantForAccessibilityMap[importantForAccessibility]) {
            return exports.ImportantForAccessibilityMap[importantForAccessibility];
        }
        return undefined;
    };
    return AccessibilityUtil;
}());
exports.AccessibilityUtil = AccessibilityUtil;
var _a;
