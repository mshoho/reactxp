/// <reference types="react" />
import RX = require('../common/Interfaces');
import Types = require('../common/Types');
export interface WebViewState {
    postComplete?: boolean;
    webFormIdentifier?: string;
    webFrameIdentifier?: string;
}
export declare class WebView extends RX.ViewBase<Types.WebViewProps, WebViewState> implements RX.WebView {
    private static _webFrameNumber;
    private static _onMessageReceived;
    private static _messageListenerInstalled;
    private _mountedComponent;
    private _onMessageReceivedToken;
    constructor(props: Types.WebViewProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Types.WebViewProps, prevState: WebViewState): void;
    componentWillUnmount(): void;
    private _getCustomHtml(props);
    private _setContents(html);
    private _installMessageListener();
    private _postRender();
    render(): JSX.Element;
    protected _onMount: (component: HTMLIFrameElement | null) => void;
    private _onLoad;
    private _sandboxToStringValue;
    postMessage(message: string, targetOrigin?: string): void;
    reload(): void;
    goBack(): void;
    goForward(): void;
}
export default WebView;
