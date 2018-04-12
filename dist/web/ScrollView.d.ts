/// <reference types="react" />
import RX = require('../common/Interfaces');
import Types = require('../common/Types');
import ViewBase from './ViewBase';
export declare class ScrollView extends ViewBase<Types.ScrollViewProps, {}> implements RX.ScrollView {
    private _mountedComponent;
    constructor(props: Types.ScrollViewProps);
    private _mounted;
    private _customScrollbar;
    private _customScrollbarEnabled;
    private _dragging;
    componentDidUpdate(): void;
    render(): JSX.Element;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(newProps: Types.ScrollViewProps): void;
    componentWillUnmount(): void;
    protected _getContainer(): HTMLElement | null;
    private _onScroll;
    private _onPropsChange(props);
    private createCustomScrollbarsIfNeeded(props);
    private _getContainerStyle();
    private _renderNormal();
    private _renderWithCustomScrollbar();
    protected _onMount: (component: HTMLElement | null) => void;
    setScrollTop(scrollTop: number, animate?: boolean): void;
    setScrollLeft(scrollLeft: number, animate?: boolean): void;
    addToScrollTop(deltaTop: number, animate: boolean): void;
    addToScrollLeft(deltaLeft: number, animate: boolean): void;
    private _easeInOut(currentTime, start, change, duration);
    private _onTouchStart;
    private _onTouchEnd;
}
export default ScrollView;
