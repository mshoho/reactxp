/**
* AccessibilityFeatures.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Commonly used accessibility feature definitions.
*/

import * as AccessibilityFeatureBase from '../common/AccessibilityFeatureBase';
import * as AccessibilityFeatureDefs from '../common/AccessibilityFeatureDefs';

export import mergeAccessibilityFeaturesToProps = AccessibilityFeatureBase.mergeAccessibilityFeaturesToPropsWeb;

// Create platform specific features.
export const Label = AccessibilityFeatureBase.createAccessibilityFeature('web', AccessibilityFeatureDefs.AccessibilityLabelDef);
export const Hidden = AccessibilityFeatureBase.createAccessibilityFeature('web', AccessibilityFeatureDefs.AccessibilityHiddenDef);
export const Checkbox = AccessibilityFeatureBase.createAccessibilityFeature('web', AccessibilityFeatureDefs.CheckboxDef);

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
