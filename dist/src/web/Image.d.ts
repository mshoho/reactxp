/// <reference types="react" />
import React = require('react');
import SyncTasks = require('synctasks');
import Types = require('../common/Types');
export interface ImageState {
    showImgTag: boolean;
    xhrRequest: boolean;
    displayUrl: string;
}
export interface ImageContext {
    isRxParentAText?: boolean;
}
export declare class Image extends React.Component<Types.ImageProps, ImageState> {
    static contextTypes: React.ValidationMap<any>;
    context: ImageContext;
    static childContextTypes: React.ValidationMap<any>;
    private _mountedComponent;
    getChildContext(): {
        isRxParentAText: boolean;
    };
    static prefetch(url: string): SyncTasks.Promise<boolean>;
    private _isMounted;
    private _nativeImageWidth;
    private _nativeImageHeight;
    constructor(props: Types.ImageProps);
    componentWillReceiveProps(nextProps: Types.ImageProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private _initializeAndSetState(props, initial);
    private _handleXhrBlob(blob);
    private _startXhrImageFetch(props);
    private _actuallyStartXhrImageFetch(props);
    render(): React.ReactElement<any>;
    protected _onMount: (component: HTMLImageElement | null) => void;
    private _getStyles();
    private _onLoad;
    private _imgOnError;
    private _onError(err?);
    private _onMouseUp;
    getNativeWidth(): number | undefined;
    getNativeHeight(): number | undefined;
}
export default Image;
