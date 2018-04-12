/// <reference types="react" />
import React = require('react');
import SyncTasks = require('synctasks');
import RX = require('../common/Interfaces');
import Types = require('../common/Types');
export declare class UserInterface extends RX.UserInterface {
    private _touchLatencyThresholhdMs;
    constructor();
    measureLayoutRelativeToWindow(component: React.Component<any, any>): SyncTasks.Promise<Types.LayoutInfo>;
    measureLayoutRelativeToAncestor(component: React.Component<any, any>, ancestor: React.Component<any, any>): SyncTasks.Promise<Types.LayoutInfo>;
    measureWindow(): Types.LayoutInfo;
    getContentSizeMultiplier(): SyncTasks.Promise<number>;
    getMaxContentSizeMultiplier(): SyncTasks.Promise<number>;
    setMaxContentSizeMultiplier(maxContentSizeMultiplier: number): void;
    useCustomScrollbars(enable?: boolean): void;
    dismissKeyboard(): void;
    isHighPixelDensityScreen(): boolean;
    getPixelRatio(): number;
    setMainView(element: React.ReactElement<any>): void;
    registerRootView(viewKey: string, getComponentFunc: Function): void;
    renderMainView(): void;
    enableTouchLatencyEvents(latencyThresholdMs: number): void;
    evaluateTouchLatency(e: Types.SyntheticEvent): void;
    isNavigatingWithKeyboard(): boolean;
}
declare const _default: UserInterface;
export default _default;
