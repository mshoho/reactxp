"use strict";
/**
* Styles.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN-specific implementation of style functions.
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
var RN = require("react-native");
var RX = require("../common/Interfaces");
var StyleLeakDetector_1 = require("./StyleLeakDetector");
var Platform_1 = require("./Platform");
var forbiddenProps = [
    'wordBreak',
    'appRegion',
    'cursor'
];
// RN would crash if it gets an undeclared property.
// The properties below are declared only in RN UWP.
if (Platform_1.default.getType() !== 'windows') {
    forbiddenProps.push('acrylicOpacityUWP', 'acrylicSourceUWP', 'acrylicTintColorUWP');
}
var Styles = /** @class */ (function (_super) {
    __extends(Styles, _super);
    function Styles() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Styles.prototype.combine = function (ruleSet1, ruleSet2) {
        if (!ruleSet1 && !ruleSet2) {
            return undefined;
        }
        var ruleSet = ruleSet1 ? (ruleSet2 ? [ruleSet1, ruleSet2] : ruleSet1) : ruleSet2;
        if (ruleSet instanceof Array) {
            var resultArray = [];
            for (var i = 0; i < ruleSet.length; i++) {
                var subRuleSet = this.combine(ruleSet[i]);
                if (subRuleSet) {
                    if (subRuleSet instanceof Array) {
                        resultArray = resultArray.concat(subRuleSet);
                    }
                    else {
                        resultArray.push(subRuleSet);
                    }
                }
            }
            if (resultArray.length === 0) {
                return undefined;
            }
            // Elimiante the array if there's a single style.
            if (resultArray.length === 1) {
                return resultArray[0];
            }
            return resultArray;
        }
        // Handle the case where the input was either undefined
        // or not an array (a single style).
        return ruleSet;
    };
    // Creates opaque styles that can be used for View
    Styles.prototype.createViewStyle = function (ruleSet, cacheStyle) {
        if (cacheStyle === void 0) { cacheStyle = true; }
        return this._adaptStyles(ruleSet, cacheStyle);
    };
    // Creates animated styles that can be used for View
    Styles.prototype.createAnimatedViewStyle = function (ruleSet) {
        return this._adaptAnimatedStyles(ruleSet);
    };
    // Creates opaque styles that can be used for ScrollView
    Styles.prototype.createScrollViewStyle = function (ruleSet, cacheStyle) {
        if (cacheStyle === void 0) { cacheStyle = true; }
        return this._adaptStyles(ruleSet, cacheStyle);
    };
    // Creates opaque styles that can be used for Button
    Styles.prototype.createButtonStyle = function (ruleSet, cacheStyle) {
        if (cacheStyle === void 0) { cacheStyle = true; }
        return this._adaptStyles(ruleSet, cacheStyle);
    };
    // Creates opaque styles that can be used for WebView
    Styles.prototype.createWebViewStyle = function (ruleSet, cacheStyle) {
        if (cacheStyle === void 0) { cacheStyle = true; }
        return this._adaptStyles(ruleSet, cacheStyle);
    };
    // Creates opaque styles that can be used for Text
    Styles.prototype.createTextStyle = function (ruleSet, cacheStyle) {
        if (cacheStyle === void 0) { cacheStyle = true; }
        return this._adaptStyles(ruleSet, cacheStyle);
    };
    // Creates opaque styles that can be used for Text
    Styles.prototype.createAnimatedTextStyle = function (ruleSet) {
        return this._adaptAnimatedStyles(ruleSet);
    };
    // Creates opaque styles that can be used for TextInput
    Styles.prototype.createTextInputStyle = function (ruleSet, cacheStyle) {
        if (cacheStyle === void 0) { cacheStyle = true; }
        return this._adaptStyles(ruleSet, cacheStyle);
    };
    // Creates opaque styles that can be used for TextInput
    Styles.prototype.createAnimatedTextInputStyle = function (ruleSet) {
        return this._adaptAnimatedStyles(ruleSet);
    };
    // Creates opaque styles that can be used for Image
    Styles.prototype.createImageStyle = function (ruleSet, cacheStyle) {
        if (cacheStyle === void 0) { cacheStyle = true; }
        return this._adaptStyles(ruleSet, cacheStyle);
    };
    // Creates animated opaque styles that can be used for Image
    Styles.prototype.createAnimatedImageStyle = function (ruleSet) {
        return this._adaptAnimatedStyles(ruleSet);
    };
    // Creates opaque styles that can be used for Link
    Styles.prototype.createLinkStyle = function (ruleSet, cacheStyle) {
        if (cacheStyle === void 0) { cacheStyle = true; }
        return this._adaptStyles(ruleSet, cacheStyle);
    };
    // Creates opaque styles that can be used for Picker
    Styles.prototype.createPickerStyle = function (ruleSet, cacheStyle) {
        if (cacheStyle === void 0) { cacheStyle = true; }
        return this._adaptStyles(ruleSet, cacheStyle);
    };
    Styles.prototype.getCssPropertyAliasesCssStyle = function () {
        // Nothing to do in native; this is for web only
        return {};
    };
    Styles.prototype._adaptStyles = function (def, cacheStyle) {
        var adaptedRuleSet = def;
        if (cacheStyle) {
            StyleLeakDetector_1.default.detectLeaks(def);
            // Forbidden props are not allowed in uncached styles. Perform the
            // omit only in the cached path.
            adaptedRuleSet = _.omit(adaptedRuleSet, forbiddenProps);
        }
        // Convert text styling
        var textStyle = adaptedRuleSet;
        if (textStyle.font) {
            if (textStyle.font.fontFamily !== undefined) {
                textStyle.fontFamily = textStyle.font.fontFamily;
            }
            if (textStyle.font.fontWeight !== undefined) {
                textStyle.fontWeight = textStyle.font.fontWeight;
            }
            if (textStyle.font.fontStyle !== undefined) {
                textStyle.fontStyle = textStyle.font.fontStyle;
            }
            delete textStyle.font;
        }
        if (def.flex !== undefined) {
            var flexValue = def.flex;
            delete adaptedRuleSet.flex;
            if (flexValue > 0) {
                // p 1 auto
                adaptedRuleSet.flexGrow = flexValue;
                adaptedRuleSet.flexShrink = 1;
            }
            else if (flexValue < 0) {
                // 0 -n auto
                adaptedRuleSet.flexGrow = 0;
                adaptedRuleSet.flexShrink = -flexValue;
            }
            else {
                // 0 0 auto
                adaptedRuleSet.flexGrow = 0;
                adaptedRuleSet.flexShrink = 0;
            }
        }
        if (cacheStyle) {
            return RN.StyleSheet.create({ _style: adaptedRuleSet })._style;
        }
        return adaptedRuleSet;
    };
    Styles.prototype._adaptAnimatedStyles = function (def) {
        return _.omit(def, forbiddenProps);
    };
    return Styles;
}(RX.Styles));
exports.Styles = Styles;
exports.default = new Styles();
