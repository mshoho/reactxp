"use strict";
/**
* AccessibilityFeatures.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Commonly used accessibility feature definitions.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var AccessibilityFeatureBase = require("../common/AccessibilityFeatureBase");
var AccessibilityFeatureDefs = require("../common/AccessibilityFeatureDefs");
exports.mergeAccessibilityFeaturesToProps = AccessibilityFeatureBase.mergeAccessibilityFeaturesToPropsWeb;
// Create platform specific features.
exports.Label = AccessibilityFeatureBase.createAccessibilityFeature('web', AccessibilityFeatureDefs.AccessibilityLabelDef);
exports.Hidden = AccessibilityFeatureBase.createAccessibilityFeature('web', AccessibilityFeatureDefs.AccessibilityHiddenDef);
exports.Checkbox = AccessibilityFeatureBase.createAccessibilityFeature('web', AccessibilityFeatureDefs.CheckboxDef);
exports.Label({ label: '' });
exports.Checkbox.setFeatureProps({ checkboxLabel: '12', checkedLabel: '', uncheckedLabel: '' });
// Usage:
// Once when the localization strings are loaded/changed, set the labels:
//     Checkbox.setFeatureProps({ checkboxLabel: '...', checkedLabel: '...', uncheckedLabel: '...' });
//
// <RX.View
//     accessibility=[
//         Label({ label: 'Hello world' }),
//         Checkbox({ checked: false })
//     ]
//     ...
//
// For the platforms which don't have the checkbox accessibility traits, the accessibility label
// will be extended like: 'Hello world, checkbox, unchecked' (depending on the values from setFeatureProps).
