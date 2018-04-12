/// <reference types="react" />
/**
* Link.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN-specific implementation of the cross-platform Link abstraction.
*/
import React = require('react');
import RN = require('react-native');
import RX = require('../common/Interfaces');
import Types = require('../common/Types');
export declare class Link extends React.Component<Types.LinkProps, {}> {
    protected _mountedComponent: RN.ReactNativeBaseComponent<any, any> | null;
    setNativeProps(nativeProps: RN.TextProps): void;
    render(): JSX.Element;
    protected _render(internalProps: RN.TextProps): JSX.Element;
    protected _onMount: (component: RN.ReactNativeBaseComponent<any, any> | null) => void;
    protected _onPress: (e: RX.Types.SyntheticEvent) => void;
    protected _onLongPress: (e: RX.Types.SyntheticEvent) => void;
}
export default Link;
