/// <reference types="react" />
import React = require('react');
import RN = require('react-native');
import SyncTasks = require('synctasks');
import Types = require('../common/Types');
export interface ImageContext {
    isRxParentAText?: boolean;
}
export declare class Image extends React.Component<Types.ImageProps, {}> implements React.ChildContextProvider<ImageContext> {
    static childContextTypes: React.ValidationMap<any>;
    static prefetch(url: string): SyncTasks.Promise<boolean>;
    protected _mountedComponent: RN.ReactNativeBaseComponent<any, any> | null;
    private _nativeImageWidth;
    private _nativeImageHeight;
    protected _getAdditionalProps(): RN.ImageProperties | {};
    render(): JSX.Element;
    protected _onMount: (component: RN.ReactNativeBaseComponent<any, any> | null) => void;
    setNativeProps(nativeProps: RN.ImageProperties): void;
    getChildContext(): {
        isRxParentAText: boolean;
    };
    protected getStyles(): Types.StyleRuleSetRecursive<Types.StyleRuleSet<Types.ImageStyle>>[];
    private _onLoad;
    private _onError;
    getNativeWidth(): number | undefined;
    getNativeHeight(): number | undefined;
}
export default Image;
