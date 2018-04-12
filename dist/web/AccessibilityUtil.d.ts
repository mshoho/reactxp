import { AccessibilityUtil as CommonAccessibiltiyUtil } from '../common/AccessibilityUtil';
import Types = require('../common/Types');
export declare class AccessibilityUtil extends CommonAccessibiltiyUtil {
    accessibilityLiveRegionToString(liveRegion: Types.AccessibilityLiveRegion): Types.AriaLive | undefined;
    accessibilityTraitToString(traits: Types.AccessibilityTrait | Types.AccessibilityTrait[] | undefined, defaultTrait?: Types.AccessibilityTrait): string | undefined;
    accessibilityTraitToAriaSelected(traits: Types.AccessibilityTrait | Types.AccessibilityTrait[] | undefined): boolean | undefined;
    accessibilityTraitToAriaChecked(traits: Types.AccessibilityTrait | Types.AccessibilityTrait[] | undefined): boolean | undefined;
    accessibilityTraitToAriaHasPopup(traits: Types.AccessibilityTrait | Types.AccessibilityTrait[] | undefined): boolean | undefined;
}
declare const _default: AccessibilityUtil;
export default _default;
