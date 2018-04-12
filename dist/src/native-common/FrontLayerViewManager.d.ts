/// <reference types="react" />
import React = require('react');
import SubscribableEvent from 'subscribableevent';
import Types = require('../common/Types');
export declare class FrontLayerViewManager {
    private _overlayStack;
    event_changed: SubscribableEvent<() => void>;
    showModal(modal: React.ReactElement<Types.ViewProps>, modalId: string, options?: Types.ModalOptions): void;
    isModalDisplayed(modalId?: string): boolean;
    dismissModal(modalId: string): void;
    dismissAllmodals(): void;
    showPopup(popupOptions: Types.PopupOptions, popupId: string, delay?: number): boolean;
    dismissPopup(popupId: string): void;
    dismissAllPopups(): void;
    getModalLayerView(rootViewId?: string | null): React.ReactElement<any> | null;
    getActivePopupId(): string | null;
    private modalOptionsMatchesRootViewId(options?, rootViewId?);
    getPopupLayerView(rootViewId?: string | null): React.ReactElement<any> | null;
    private _onBackgroundPressed;
    private _dismissActivePopup();
    private _findIndexOfModal(modalId);
    private _findIndexOfPopup(popupId);
    private _getActiveOverlay();
    isPopupDisplayed(popupId?: string): boolean;
}
declare const _default: FrontLayerViewManager;
export default _default;
