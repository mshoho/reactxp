/// <reference types="react" />
/**
* Button.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN Windows-specific implementation of the cross-platform Button abstraction.
*/
import React = require('react');
import { Button as ButtonBase } from '../native-common/Button';
import RN = require('react-native');
import { FocusManagerFocusableComponent } from '../native-desktop/utils/FocusManager';
export declare class Button extends ButtonBase implements FocusManagerFocusableComponent {
    private _focusableElement;
    private _isFocusedWithKeyboard;
    private _onFocusableRef;
    protected _render(internalProps: RN.ViewProps): JSX.Element;
    focus(): void;
    blur(): void;
    setNativeProps(nativeProps: RN.ViewProps): void;
    private _onAccessibilityTap;
    private _onKeyDown;
    private _onKeyUp;
    private _onFocus;
    private _onBlur;
    protected _onHoverStart: (e: React.SyntheticEvent<any>) => void;
    protected _onHoverEnd: (e: React.SyntheticEvent<any>) => void;
    onFocus(): void;
    getTabIndex(): number | undefined;
    updateNativeTabIndex(): void;
}
export default Button;
