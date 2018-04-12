/// <reference types="react" />
import RN = require('react-native');
import { ScrollView as ScrollViewBase } from '../native-common/ScrollView';
export declare class ScrollView extends ScrollViewBase {
    protected _render(props: RN.ScrollViewProps): JSX.Element;
    private _onKeyDown;
}
export default ScrollView;
