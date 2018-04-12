import { UserInterface as UserInterfaceCommon } from '../native-common/UserInterface';
export declare class UserInterface extends UserInterfaceCommon {
    private _isNavigatingWithKeyboard;
    constructor();
    isNavigatingWithKeyboard(): boolean;
    private _keyboardNavigationStateChanged;
    registerRootView(viewKey: string, getComponentFunc: Function): void;
}
declare const _default: UserInterface;
export default _default;
