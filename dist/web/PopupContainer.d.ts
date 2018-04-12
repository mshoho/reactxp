/// <reference types="react" />
import React = require('react');
import FocusManager from './utils/FocusManager';
import Types = require('../common/Types');
export interface PopupContainerProps extends Types.CommonProps {
    style: React.CSSProperties;
    onMouseEnter?: (e: any) => void;
    onMouseLeave?: (e: any) => void;
    hidden?: boolean;
}
export interface PopupContainerContext {
    focusManager?: FocusManager;
}
export interface PopupComponent {
    onShow: () => void;
    onHide: () => void;
}
export declare class PopupContainer extends React.Component<PopupContainerProps, {}> {
    static contextTypes: React.ValidationMap<any>;
    static childContextTypes: React.ValidationMap<any>;
    private _popupComponentStack;
    constructor(props: PopupContainerProps, context: PopupContainerContext);
    getChildContext(): {
        focusManager: any;
        popupContainer: PopupContainer;
    };
    render(): JSX.Element;
    registerPopupComponent(onShow: () => void, onHide: () => void): PopupComponent;
    unregisterPopupComponent(component: PopupComponent): void;
    isHidden(): boolean;
    componentDidUpdate(prevProps: PopupContainerProps): void;
}
export default PopupContainer;
