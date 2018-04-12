/// <reference types="react" />
/**
* AccessibilityUtil.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Common accessibility interface for platform-specific accessibility utilities.
*/
import React = require('react');
import Types = require('../common/Types');
export declare const ImportantForAccessibilityMap: {
    [Types.ImportantForAccessibility.Auto]: string;
    [Types.ImportantForAccessibility.Yes]: string;
    [Types.ImportantForAccessibility.No]: string;
    [Types.ImportantForAccessibility.NoHideDescendants]: string;
};
export declare abstract class AccessibilityPlatformUtil {
    abstract setAccessibilityFocus(component: React.Component<any, any>): void;
}
export declare abstract class AccessibilityUtil {
    isHidden(importantForAccessibility: Types.ImportantForAccessibility | undefined): true | undefined;
    importantForAccessibilityToString(importantForAccessibility: Types.ImportantForAccessibility | undefined, defaultImportantForAccessibility?: Types.ImportantForAccessibility): string | undefined;
    protected abstract accessibilityLiveRegionToString(liveRegion: Types.AccessibilityLiveRegion): string | undefined;
    protected abstract accessibilityTraitToString(trait: Types.AccessibilityTrait | Types.AccessibilityTrait[], defaultTrait?: Types.AccessibilityTrait): string | string[] | undefined;
}
