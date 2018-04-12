import { FocusManager as FocusManagerBase, FocusableComponentInternal, StoredFocusableComponent } from '../../common/utils/FocusManager';
import { FocusableComponentStateCallback } from '../../common/utils/FocusManager';
export { FocusableComponentStateCallback };
export declare class FocusManager extends FocusManagerBase {
    private static _setTabIndexTimer;
    private static _setTabIndexElement;
    private static _lastFocusedProgrammatically;
    constructor(parent: FocusManager | undefined);
    static initListeners(): void;
    protected addFocusListenerOnComponent(component: FocusableComponentInternal, onFocus: () => void): void;
    protected removeFocusListenerFromComponent(component: FocusableComponentInternal, onFocus: () => void): void;
    protected focusComponent(component: FocusableComponentInternal): boolean;
    static setLastFocusedProgrammatically(element: HTMLElement | undefined): void;
    static getLastFocusedProgrammatically(reset?: boolean): HTMLElement | undefined;
    private static _getFirstFocusable(last?, parent?);
    static focusFirst(last?: boolean): void;
    protected resetFocus(): void;
    protected _updateComponentFocusRestriction(storedComponent: StoredFocusableComponent): void;
    private static _setTabIndex(element, value);
    private static _setAriaHidden(element, value);
}
export declare function applyFocusableComponentMixin(Component: any, isConditionallyFocusable?: Function): void;
export default FocusManager;
