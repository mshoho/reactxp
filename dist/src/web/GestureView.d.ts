/// <reference types="react" />
import RX = require('../common/Interfaces');
import Types = require('../common/Types');
export declare class GestureView extends RX.ViewBase<Types.GestureViewProps, {}> {
    private _id;
    private _container;
    private _doubleTapTimer;
    private _lastTapEvent;
    private _responder;
    private _pendingGestureType;
    private _gestureTypeLocked;
    private _skipNextTap;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _createMouseResponder(container);
    private _disposeMouseResponder();
    private _setContainerRef;
    private _getStyles();
    private _onClick;
    private _detectGestureType;
    private _getPanPixelThreshold;
    private _shouldRespondToPan(gestureState);
    private _shouldRespondToPanVertical(gestureState);
    private _shouldRespondToPanHorizontal(gestureState);
    private _onWheel;
    private _calcDistance(dx, dy);
    private _isDoubleTap(e);
    private _startDoubleTapTimer(e);
    private _cancelDoubleTapTimer();
    private _reportDelayedTap();
    private _sendTapEvent(e);
    private _sendDoubleTapEvent(e);
    private _sendPanEvent;
    private _getGestureViewClientRect();
}
export default GestureView;
