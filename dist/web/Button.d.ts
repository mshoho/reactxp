/// <reference types="react" />
/**
* Button.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform Button abstraction.
*/
import React = require('react');
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
    private _isMounted;
    private _lastMouseDownEvent;
    private _ignoreClick;
    private _longPressTimer;
    private _isMouseOver;
    private _isFocusedWithKeyboard;
    private _isHoverStarted;
    constructor(props: Types.ButtonProps, context: ButtonContext);
    getChildContext(): ButtonContext;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    focus(): void;
    blur(): void;
    protected onClick: (e: Types.MouseEvent) => void;
    private _getStyles();
    private _onContextMenu;
    private _onMouseDown;
    private _onMouseUp;
    private _onMouseEnter;
    private _onMouseLeave;
    private _onFocus;
    private _onBlur;
    private _onHoverStart;
    private _onHoverEnd;
}
export default Button;
