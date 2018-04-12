/// <reference types="react" />
/**
* TextInput.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform TextInput abstraction.
*/
import React = require('react');
import Types = require('../common/Types');
export interface TextInputState {
    inputValue?: string;
}
export declare class TextInput extends React.Component<Types.TextInputProps, TextInputState> {
    private _mountedComponent;
    private _selectionStart;
    private _selectionEnd;
    private _isFocused;
    private _ariaLiveEnabled;
    constructor(props: Types.TextInputProps);
    componentWillReceiveProps(nextProps: Types.TextInputProps): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Types.TextInputProps, prevState: TextInputState): void;
    render(): JSX.Element;
    private _onMount;
    private _autoFocusIfNeeded();
    private _onInput;
    private _onFocus;
    private _onBlur;
    private _getKeyboardType();
    private _onPaste;
    private _onInputChanged;
    private _checkSelectionChanged;
    private _onKeyDown;
    private _onScroll;
    private _focus;
    blur(): void;
    focus(): void;
    setAccessibilityFocus(): void;
    isFocused(): boolean;
    selectAll(): void;
    selectRange(start: number, end: number): void;
    getSelectionRange(): {
        start: number;
        end: number;
    };
    setValue(value: string): void;
}
export default TextInput;
