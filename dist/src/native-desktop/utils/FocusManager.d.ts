/**
* FocusManager.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Manages focusable elements for better keyboard navigation (RN desktop version)
*/
import { FocusManager as FocusManagerBase, FocusableComponentInternal as FocusableComponentInternalBase, StoredFocusableComponent } from '../../common/utils/FocusManager';
import { FocusableComponentStateCallback } from '../../common/utils/FocusManager';
export { FocusableComponentStateCallback };
export interface FocusManagerFocusableComponent {
    getTabIndex(): number | undefined;
    onFocus(): void;
    focus(): void;
    updateNativeTabIndex(): void;
}
export interface FocusableComponentInternal extends FocusManagerFocusableComponent, FocusableComponentInternalBase {
    tabIndexOverride?: number;
    tabIndexLocalOverride?: number;
    tabIndexLocalOverrideTimer?: number;
    onFocusSink?: () => void;
}
export declare class FocusManager extends FocusManagerBase {
    constructor(parent: FocusManager | undefined);
    protected addFocusListenerOnComponent(component: FocusableComponentInternal, onFocus: () => void): void;
    protected removeFocusListenerFromComponent(component: FocusableComponentInternal, onFocus: () => void): void;
    protected focusComponent(component: FocusableComponentInternal): boolean;
    private static focusFirst();
    protected resetFocus(): void;
    protected _updateComponentFocusRestriction(storedComponent: StoredFocusableComponent): void;
    private static _setComponentTabIndexOverride(component, tabIndex);
    private static _removeComponentTabIndexOverride(component);
}
export declare function applyFocusableComponentMixin(Component: any, isConditionallyFocusable?: Function): void;
export default FocusManager;
