/// <reference types="react" />
import React = require('react');
import RN = require('react-native');
import PropTypes = require('prop-types');
import Types = require('../common/Types');
export interface ButtonContext {
    hasRxButtonAscendant?: boolean;
}
export declare class Button extends React.Component<Types.ButtonProps, {}> {
    static contextTypes: {
        hasRxButtonAscendant: PropTypes.Requireable<any> & PropTypes.Validator<any>;
    };
    static childContextTypes: {
        hasRxButtonAscendant: PropTypes.Requireable<any> & PropTypes.Validator<any>;
    };
    private _mixin_componentDidMount;
    private _mixin_componentWillUnmount;
    touchableGetInitialState: () => RN.Touchable.State;
    touchableHandleStartShouldSetResponder: () => boolean;
    touchableHandleResponderTerminationRequest: () => boolean;
    touchableHandleResponderGrant: (e: React.SyntheticEvent<any>) => void;
    touchableHandleResponderMove: (e: React.SyntheticEvent<any>) => void;
    touchableHandleResponderRelease: (e: React.SyntheticEvent<any>) => void;
    touchableHandleResponderTerminate: (e: React.SyntheticEvent<any>) => void;
    private _isMounted;
    protected _isMouseOver: boolean;
    protected _isHoverStarted: boolean;
    private _hideTimeout;
    private _buttonElement;
    private _defaultOpacityValue;
    private _opacityAnimatedValue;
    private _opacityAnimatedStyle;
    constructor(props: Types.ButtonProps, context: ButtonContext);
    protected _render(internalProps: RN.ViewProps): JSX.Element;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: Types.ButtonProps): void;
    getChildContext(): ButtonContext;
    setNativeProps(nativeProps: RN.ViewProps): void;
    touchableHandleActivePressIn: (e: Types.SyntheticEvent) => void;
    touchableHandleActivePressOut: (e: Types.SyntheticEvent) => void;
    touchableHandlePress: (e: Types.SyntheticEvent) => void;
    touchableHandleLongPress: (e: Types.SyntheticEvent) => void;
    touchableGetHighlightDelayMS: () => number;
    touchableGetPressRectOffset: () => {
        top: number;
        left: number;
        right: number;
        bottom: number;
    };
    focus(): void;
    blur(): void;
    private _setOpacityStyles(props, prevProps?);
    private _onButtonRef;
    private _isTouchFeedbackApplicable();
    private _opacityActive(duration);
    private _opacityInactive(duration);
    private _getDefaultOpacityValue(props);
    protected _onMouseEnter: (e: Types.SyntheticEvent) => void;
    protected _onMouseLeave: (e: Types.SyntheticEvent) => void;
    protected _onHoverStart: (e: Types.SyntheticEvent) => void;
    protected _onHoverEnd: (e: Types.SyntheticEvent) => void;
    /**
    * Animate the touchable to a new opacity.
    */
    setOpacityTo(value: number, duration: number): void;
    private _hasPressHandler();
    private _showUnderlay();
    private _hideUnderlay;
}
export default Button;
