import { FocusManager as FocusManagerBase, FocusableComponentInternal, StoredFocusableComponent } from '../../common/utils/FocusManager';
import { applyFocusableComponentMixin, FocusableComponentStateCallback } from '../../common/utils/FocusManager';
export { applyFocusableComponentMixin, FocusableComponentStateCallback };
export declare class FocusManager extends FocusManagerBase {
    private static _setTabIndexTimer;
    private static _setTabIndexElement;
    constructor(parent: FocusManager | undefined);
    static initListeners(): void;
    protected addFocusListenerOnComponent(component: FocusableComponentInternal, onFocus: () => void): void;
    protected removeFocusListenerFromComponent(component: FocusableComponentInternal, onFocus: () => void): void;
    protected focusComponent(component: FocusableComponentInternal): boolean;
    static focusFirst(last?: boolean): void;
    protected resetFocus(): void;
    protected _updateComponentFocusRestriction(storedComponent: StoredFocusableComponent): void;
    private static _setComponentTabIndexAndAriaHidden(component, tabIndex, ariaHidden);
    private static _setTabIndex(element, value);
    private static _setAriaHidden(element, value);
}
export default FocusManager;
