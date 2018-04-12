/// <reference types="react" />
/**
* Link.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform Link abstraction.
*/
import React = require('react');
import Types = require('../common/Types');
export declare class Link extends React.Component<Types.LinkProps, {}> {
    private _longPressTimer;
    render(): JSX.Element;
    _getStyles(): Types.LinkStyleRuleSet;
    private _onClick;
    private _onMouseDown;
    private _onMouseUp;
}
export default Link;
