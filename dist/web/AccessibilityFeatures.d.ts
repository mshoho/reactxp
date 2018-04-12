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
export declare const Label: {
    (props: AccessibilityFeatureDefs.AccessibilityLabelSettings): AccessibilityFeatureBase.AccessibilityFeature<AccessibilityFeatureDefs.AccessibilityLabelSettings>;
    setFeatureProps: (props: any) => void;
};
export declare const Hidden: {
    (props: AccessibilityFeatureDefs.AccessibilityHiddenSettings): AccessibilityFeatureBase.AccessibilityFeature<AccessibilityFeatureDefs.AccessibilityHiddenSettings>;
    setFeatureProps: (props: any) => void;
};
export declare const Checkbox: {
    (props: AccessibilityFeatureDefs.CheckboxProps): AccessibilityFeatureBase.AccessibilityFeature<AccessibilityFeatureDefs.CheckboxProps>;
    setFeatureProps: (props: AccessibilityFeatureDefs.CheckboxFeatureProps) => void;
};
