/**
* AccessibilityFeatureDefs.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Commonly used accessibility feature definitions.
*/
import { AccessibilityFeatureDef, AccessibilityPropsAndroid, AccessibilityPropsIOS, AccessibilityPropsWeb, AccessibilityPropsMacOS, AccessibilityPropsWindows } from './AccessibilityFeatureBase';
export interface AccessibilityLabelSettings {
    label: string;
}
export declare class AccessibilityLabelDef extends AccessibilityFeatureDef<AccessibilityLabelSettings, void> {
    getAndroidProps(): AccessibilityPropsAndroid;
    getIOSProps(): AccessibilityPropsIOS;
    getWebProps(): AccessibilityPropsWeb;
    getMacOSProps(): AccessibilityPropsMacOS;
    getWindowsProps(): AccessibilityPropsWindows;
}
export interface AccessibilityHiddenSettings {
    hideDescendants: boolean;
}
export declare class AccessibilityHiddenDef extends AccessibilityFeatureDef<AccessibilityHiddenSettings, void> {
    getAndroidProps(): AccessibilityPropsAndroid;
    getIOSProps(): AccessibilityPropsIOS;
    getWebProps(): AccessibilityPropsWeb;
    getMacOSProps(): AccessibilityPropsMacOS;
    getWindowsProps(): AccessibilityPropsWindows;
}
export interface CheckboxFeatureProps {
    checkboxLabel: string;
    checkedLabel: string;
    uncheckedLabel: string;
}
export interface CheckboxProps {
    checked: boolean;
}
export declare class CheckboxDef extends AccessibilityFeatureDef<CheckboxProps, CheckboxFeatureProps> {
    private static _checkboxLabel;
    private static _checkedLabel;
    private static _uncheckedLabel;
    static setFeatureProps(props: CheckboxFeatureProps): void;
    getAndroidProps(): AccessibilityPropsAndroid;
    getIOSProps(): AccessibilityPropsIOS;
    getWebProps(): AccessibilityPropsWeb;
    getMacOSProps(): AccessibilityPropsMacOS;
    getWindowsProps(): AccessibilityPropsWindows;
}
