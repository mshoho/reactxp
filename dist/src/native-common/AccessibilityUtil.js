"use strict";
/**
* AccessibilityUtil.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN-specific implementation of accessiblity functions for cross-platform
* ReactXP framework.
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
var AccessibilityUtil_1 = require("../common/AccessibilityUtil");
var Types = require("../common/Types");
var liveRegionMap = (_a = {},
    _a[Types.AccessibilityLiveRegion.None] = 'none',
    _a[Types.AccessibilityLiveRegion.Assertive] = 'assertive',
    _a[Types.AccessibilityLiveRegion.Polite] = 'polite',
    _a);
// iOS supported map.
var traitsMap = (_b = {},
    _b[Types.AccessibilityTrait.None] = 'none',
    _b[Types.AccessibilityTrait.Tab] = 'none',
    // label. This needs to be done for any custom role, which needs to be supported on iOS.
    _b[Types.AccessibilityTrait.Button] = 'button',
    _b[Types.AccessibilityTrait.Link] = 'link',
    _b[Types.AccessibilityTrait.Header] = 'header',
    _b[Types.AccessibilityTrait.Search] = 'search',
    _b[Types.AccessibilityTrait.Image] = 'image',
    _b[Types.AccessibilityTrait.Summary] = 'summary',
    _b[Types.AccessibilityTrait.Adjustable] = 'adjustable',
    _b[Types.AccessibilityTrait.Selected] = 'selected',
    _b[Types.AccessibilityTrait.Plays] = 'plays',
    _b[Types.AccessibilityTrait.Key] = 'key',
    _b[Types.AccessibilityTrait.Text] = 'text',
    _b[Types.AccessibilityTrait.Disabled] = 'disabled',
    _b[Types.AccessibilityTrait.FrequentUpdates] = 'frequentUpdates',
    _b[Types.AccessibilityTrait.StartsMedia] = 'startsMedia',
    _b[Types.AccessibilityTrait.AllowsDirectInteraction] = 'allowsDirectionInteraction',
    _b[Types.AccessibilityTrait.PageTurn] = 'pageTurn',
    _b);
// Android supported map.
var componentTypeMap = (_c = {},
    _c[Types.AccessibilityTrait.None] = 'none',
    _c[Types.AccessibilityTrait.Tab] = 'none',
    // it a custom label. This needs to be done for any custom role, which needs to be supported
    // on Android.
    _c[Types.AccessibilityTrait.Button] = 'button',
    _c[Types.AccessibilityTrait.Radio_button_checked] = 'radiobutton_checked',
    _c[Types.AccessibilityTrait.Radio_button_unchecked] = 'radiobutton_unchecked',
    _c);
var AccessibilityUtil = /** @class */ (function (_super) {
    __extends(AccessibilityUtil, _super);
    function AccessibilityUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccessibilityUtil.prototype.setAccessibilityPlatformUtil = function (instance) {
        this._instance = instance;
    };
    // Converts an AccessibilityTrait to a string, but the returned value is only needed for iOS and UWP. Other platforms ignore it.
    // Presence of an AccessibilityTrait.None can make an element non-accessible on Android.
    // We use the override traits if they are present, else use the default trait.
    // If ensureDefaultTrait is true, ensure the return result contains the defaultTrait.
    AccessibilityUtil.prototype.accessibilityTraitToString = function (overrideTraits, defaultTrait, ensureDefaultTrait) {
        // Check if there are valid override traits. Use them or else fallback to default traits.
        if (!overrideTraits && !defaultTrait) {
            return [];
        }
        var traits;
        if (defaultTrait && ensureDefaultTrait) {
            if (_.isArray(overrideTraits)) {
                traits = overrideTraits.indexOf(defaultTrait) === -1 ? overrideTraits.concat([defaultTrait]) : overrideTraits;
            }
            else {
                traits = overrideTraits === defaultTrait ? [overrideTraits] : [overrideTraits, defaultTrait];
            }
        }
        else {
            traits = _.isArray(overrideTraits) ? overrideTraits : [overrideTraits || defaultTrait];
        }
        return _.compact(_.map(traits, function (t) { return t ? traitsMap[t] : undefined; }));
    };
    // Converts an AccessibilityTrait to an accessibilityComponentType string, but the returned value is only needed for Android. Other
    // platforms ignore it.
    AccessibilityUtil.prototype.accessibilityComponentTypeToString = function (overrideTraits, defaultTrait) {
        // Check if there are valid override traits. Use them or else fallback to default traits.
        // Max enum value in this array is the componentType for android.
        if (!overrideTraits && !defaultTrait) {
            return undefined;
        }
        var combinedTraits = _.isArray(overrideTraits) ? overrideTraits : [overrideTraits || defaultTrait];
        var maxTrait = _.max(_.filter(combinedTraits, function (t) { return componentTypeMap.hasOwnProperty(t); }));
        return maxTrait ? componentTypeMap[maxTrait] : undefined;
    };
    // Converts an AccessibilityLiveRegion to a string, but the return value is only needed for Android. Other platforms ignore it.
    AccessibilityUtil.prototype.accessibilityLiveRegionToString = function (liveRegion) {
        if (liveRegion && liveRegionMap[liveRegion]) {
            return liveRegionMap[liveRegion];
        }
        return undefined;
    };
    // Platform specific accessibility APIs.
    AccessibilityUtil.prototype.setAccessibilityFocus = function (component) {
        this._instance.setAccessibilityFocus(component);
    };
    return AccessibilityUtil;
}(AccessibilityUtil_1.AccessibilityUtil));
exports.AccessibilityUtil = AccessibilityUtil;
exports.default = new AccessibilityUtil();
var _a, _b, _c;
