/// <reference types="react" />
import React = require('react');
import RN = require('react-native');
import Types = require('../common/Types');
export interface TextContext {
    isRxParentAText?: boolean;
}
export declare class Text extends React.Component<Types.TextProps, {}> implements React.ChildContextProvider<TextContext> {
    static childContextTypes: React.ValidationMap<any>;
    protected _mountedComponent: RN.ReactNativeBaseComponent<any, any> | null;
    setNativeProps(nativeProps: RN.TextProps): void;
    render(): JSX.Element;
    componentDidMount(): void;
    protected _onMount: (component: RN.ReactNativeBaseComponent<any, any> | null) => void;
    private _onPress;
    getChildContext(): {
        isRxParentAText: boolean;
    };
    protected _getStyles(): Types.StyleRuleSetRecursiveArray<Types.TextStyleRuleSet>;
    focus(): void;
    blur(): void;
}
export default Text;
