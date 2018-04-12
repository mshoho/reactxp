/// <reference types="react" />
/**
* UserInterface.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the ReactXP interfaces related to
* UI (layout measurements, etc.).
*/
import React = require('react');
import SyncTasks = require('synctasks');
import RX = require('../common/Interfaces');
import Types = require('../common/Types');
export declare class UserInterface extends RX.UserInterface {
    private _isNavigatingWithKeyboard;
    constructor();
    measureLayoutRelativeToWindow(component: React.Component<any, any>): SyncTasks.Promise<Types.LayoutInfo>;
    measureLayoutRelativeToAncestor(component: React.Component<any, any>, ancestor: React.Component<any, any>): SyncTasks.Promise<Types.LayoutInfo>;
    measureWindow(): Types.LayoutInfo;
    getContentSizeMultiplier(): SyncTasks.Promise<number>;
    getMaxContentSizeMultiplier(): SyncTasks.Promise<number>;
    setMaxContentSizeMultiplier(maxContentSizeMultiplier: number): void;
    isHighPixelDensityScreen(): boolean;
    getPixelRatio(): number;
    setMainView(element: React.ReactElement<any>): void;
    registerRootView(viewKey: string, getComponentFunc: Function): void;
    useCustomScrollbars(enable?: boolean): void;
    dismissKeyboard(): void;
    enableTouchLatencyEvents(latencyThresholdMs: number): void;
    evaluateTouchLatency(e: Types.MouseEvent): void;
    isNavigatingWithKeyboard(): boolean;
    private _keyboardNavigationStateChanged;
}
declare const _default: UserInterface;
export default _default;
