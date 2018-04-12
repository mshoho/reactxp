/// <reference types="react" />
import React = require('react');
import Types = require('../common/Types');
import FocusManager from './utils/FocusManager';
import PopupContainer from './PopupContainer';
export declare class PopupDescriptor {
    popupId: string;
    popupOptions: Types.PopupOptions;
    constructor(popupId: string, popupOptions: Types.PopupOptions);
}
export interface RootViewProps {
    mainView?: React.ReactNode;
    modal?: React.ReactElement<Types.ViewProps>;
    activePopup?: PopupDescriptor;
    cachedPopup?: PopupDescriptor[];
    autoDismiss?: boolean;
    autoDismissDelay?: number;
    onDismissPopup?: () => void;
    keyBoardFocusOutline?: string;
    mouseFocusOutline?: string;
}
export interface RootViewState {
    isMeasuringPopup: boolean;
    popupWidth: number;
    popupHeight: number;
    anchorPosition: Types.PopupPosition;
    anchorOffset: number;
    popupTop: number;
    popupLeft: number;
    constrainedPopupWidth: number;
    constrainedPopupHeight: number;
    isMouseInPopup: boolean;
    focusClass: string | undefined;
    announcementText: string;
    announcementTextInNestedDiv: boolean;
}
export declare class RootView extends React.Component<RootViewProps, RootViewState> {
    static childContextTypes: React.ValidationMap<any>;
    private _mountedComponent;
    private _hidePopupTimer;
    private _respositionPopupTimer;
    private _clickHandlerInstalled;
    private _keyboardHandlerInstalled;
    private _newAnnouncementEventChangedSubscription;
    private _focusManager;
    private _isNavigatingWithKeyboard;
    private _isNavigatingWithKeyboardUpateTimer;
    private _shouldEnableKeyboardNavigationModeOnFocus;
    private _applicationIsNotActive;
    private _applicationIsNotActiveTimer;
    private _prevFocusedElement;
    constructor(props: RootViewProps);
    getChildContext(): {
        focusManager: FocusManager;
    };
    private _getInitialState();
    componentWillReceiveProps(prevProps: RootViewProps): void;
    componentDidUpdate(prevProps: RootViewProps, prevState: RootViewState): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private _renderPopup(popup, hidden);
    render(): JSX.Element;
    protected _onMount: (component: PopupContainer | null) => void;
    private _tryClosePopup;
    private _determineIfClickOnElement(elementReference, eventSource);
    private _onMouseDownCapture;
    private _onKeyDownCapture;
    private _onFocusIn;
    private _onFocusOut;
    private _requestApplicationIsNotActive();
    private _cancelApplicationIsNotActive();
    private _updateKeyboardNavigationState(isNavigatingWithKeyboard);
    private _onKeyDown;
    private _onKeyUp;
    private _onMouseEnter(e);
    private _onMouseLeave(e);
    private _startHidePopupTimer();
    private _stopHidePopupTimer();
    private _dismissPopup();
    private _startRepositionPopupTimer();
    private _stopRepositionPopupTimer();
    private _recalcPosition();
    private _recalcInnerPosition(anchorRect, newState);
}
export default RootView;
