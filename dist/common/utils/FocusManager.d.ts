/// <reference types="react" />
/**
* FocusManager.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Manages focusable elements for better keyboard navigation.
*/
import React = require('react');
import Types = require('../../common/Types');
export interface FocusableInternal {
    focusableComponentId?: string;
}
export declare type FocusableComponentInternal = React.Component<any, any> & FocusableInternal;
export interface StoredFocusableComponent {
    id: string;
    numericId: number;
    component: FocusableComponentInternal;
    onFocus: () => void;
    restricted: boolean;
    limitedCount: number;
    limitedCountAccessible: number;
    origTabIndex?: number;
    origAriaHidden?: string;
    curTabIndex?: number;
    curAriaHidden?: boolean;
    removed?: boolean;
    callbacks?: FocusableComponentStateCallback[];
}
export declare type FocusableComponentStateCallback = (restrictedOrLimited: boolean) => void;
export declare abstract class FocusManager {
    private static _rootFocusManager;
    private static _restrictionStack;
    protected static _currentRestrictionOwner: FocusManager | undefined;
    private static _restoreRestrictionTimer;
    private static _pendingPrevFocusedComponent;
    protected static _currentFocusedComponent: StoredFocusableComponent | undefined;
    protected static _allFocusableComponents: {
        [id: string]: StoredFocusableComponent;
    };
    protected static _skipFocusCheck: boolean;
    protected static _resetFocusTimer: number | undefined;
    private _parent;
    private _isFocusLimited;
    private _prevFocusedComponent;
    protected _myFocusableComponentIds: {
        [id: string]: boolean;
    };
    constructor(parent: FocusManager | undefined);
    protected abstract addFocusListenerOnComponent(component: FocusableComponentInternal, onFocus: () => void): void;
    protected abstract removeFocusListenerFromComponent(component: FocusableComponentInternal, onFocus: () => void): void;
    protected abstract focusComponent(component: FocusableComponentInternal): boolean;
    protected abstract resetFocus(): void;
    protected abstract _updateComponentFocusRestriction(storedComponent: StoredFocusableComponent): void;
    addFocusableComponent(component: FocusableComponentInternal): void;
    removeFocusableComponent(component: FocusableComponentInternal): void;
    restrictFocusWithin(noFocusReset?: boolean): void;
    removeFocusRestriction(): void;
    limitFocusWithin(limitType: Types.LimitFocusType): void;
    removeFocusLimitation(): void;
    release(): void;
    subscribe(component: FocusableComponentInternal, callback: FocusableComponentStateCallback): void;
    unsubscribe(component: FocusableComponentInternal, callback: FocusableComponentStateCallback): void;
    isComponentFocusRestrictedOrLimited(component: FocusableComponentInternal): boolean;
    static getCurrentFocusedComponent(): string | undefined;
    private static _getStoredComponent(component);
    protected static _callFocusableComponentStateChangeCallbacks(storedComponent: StoredFocusableComponent, restrictedOrLimited: boolean): void;
    private _removeFocusRestriction();
    private static _clearRestoreRestrictionTimeout();
}
export declare function applyFocusableComponentMixin(Component: any, isConditionallyFocusable?: Function): void;
export default FocusManager;
