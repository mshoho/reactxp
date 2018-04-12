/// <reference types="react" />
import React = require('react');
import { AccessibilityUtil as CommonAccessibilityUtil, AccessibilityPlatformUtil } from '../common/AccessibilityUtil';
import Types = require('../common/Types');
export declare class AccessibilityUtil extends CommonAccessibilityUtil {
    private _instance;
    setAccessibilityPlatformUtil(instance: AccessibilityPlatformUtil): void;
    accessibilityTraitToString(overrideTraits: Types.AccessibilityTrait | Types.AccessibilityTrait[] | undefined, defaultTrait?: Types.AccessibilityTrait, ensureDefaultTrait?: boolean): string[];
    accessibilityComponentTypeToString(overrideTraits: Types.AccessibilityTrait | Types.AccessibilityTrait[] | undefined, defaultTrait?: Types.AccessibilityTrait): string | undefined;
    accessibilityLiveRegionToString(liveRegion: Types.AccessibilityLiveRegion | undefined): string | undefined;
    setAccessibilityFocus(component: React.Component<any, any>): void;
}
declare const _default: AccessibilityUtil;
export default _default;
