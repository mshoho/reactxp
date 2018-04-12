/// <reference types="react" />
import RX = require('../common/Interfaces');
import Types = require('../common/Types');
import { ViewProps } from '../common/Types';
export interface AppModalContentProps extends ViewProps {
    buttons?: Types.AlertButtonSpec[];
    title: string;
    message?: string;
    modalId: string;
    theme?: Types.AlertModalTheme;
}
export interface AppModalContentState {
    hoverIndex: number;
}
export declare class AlertModalContent extends RX.Component<AppModalContentProps, AppModalContentState> {
    constructor(props: AppModalContentProps);
    render(): JSX.Element;
    private _onPressButton(btnSpec);
    private _onPressBody;
    private _onPressBackground;
}
export default AlertModalContent;
