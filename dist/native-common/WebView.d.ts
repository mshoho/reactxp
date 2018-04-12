/// <reference types="react" />
import RN = require('react-native');
import RX = require('../common/Interfaces');
import Types = require('../common/Types');
export declare class WebView extends RX.ViewBase<Types.WebViewProps, {}> implements RX.WebView {
    private _mountedComponent;
    render(): JSX.Element;
    protected _onMount: (component: RN.ReactNativeBaseComponent<any, any> | null) => void;
    protected _onMessage: (e: RN.SyntheticEvent<any>) => void;
    postMessage(message: string, targetOrigin?: string): void;
    reload(): void;
    goBack(): void;
    goForward(): void;
}
export default WebView;
