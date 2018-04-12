/// <reference types="react" />
import React = require('react');
import RN = require('react-native');
import Types = require('../common/Types');
export interface PopupContainerViewProps extends Types.CommonProps {
    popupOptions: Types.PopupOptions;
    anchorHandle?: number;
    onDismissPopup?: () => void;
    hidden: boolean;
}
export interface PopupContainerViewState {
    isMeasuringPopup: boolean;
    popupWidth: number;
    popupHeight: number;
    anchorPosition: Types.PopupPosition;
    anchorOffset: number;
    popupY: number;
    popupX: number;
    constrainedPopupWidth: number;
    constrainedPopupHeight: number;
}
export declare class PopupContainerView extends React.Component<PopupContainerViewProps, PopupContainerViewState> {
    private _mountedComponent;
    private _viewHandle;
    private _respositionPopupTimer;
    constructor(props: PopupContainerViewProps);
    private _getInitialState();
    componentWillReceiveProps(prevProps: PopupContainerViewProps): void;
    componentDidUpdate(prevProps: PopupContainerViewProps, prevState: PopupContainerViewState): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    protected _onMount: (component: RN.ReactNativeBaseComponent<any, any> | null) => void;
    private _recalcPosition();
    private _recalcPositionFromLayoutData(anchorRect, popupRect);
    private _recalcInnerPosition(anchorRect, newState);
    private _dismissPopup();
    private _startRepositionPopupTimer();
    private _stopRepositionPopupTimer();
}
export default PopupContainerView;
