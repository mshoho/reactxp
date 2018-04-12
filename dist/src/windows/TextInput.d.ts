/// <reference types="react" />
import RN = require('react-native');
import { FocusManagerFocusableComponent } from '../native-desktop/utils/FocusManager';
import { TextInput as TextInputBase } from '../native-common/TextInput';
export declare class TextInput extends TextInputBase implements FocusManagerFocusableComponent {
    protected _render(props: RN.TextInputProps): JSX.Element;
    private _onFocusEx(e, origHandler);
    onFocus(): void;
    getTabIndex(): number | undefined;
    updateNativeTabIndex(): void;
}
export default TextInput;
