/// <reference types="react" />
import RN = require('react-native');
import RX = require('../common/Interfaces');
import Types = require('../common/Types');
import { Animated as AnimatedBase } from '../native-common/Animated';
export declare class AnimatedView extends RX.AnimatedView {
    private _animatedComponent;
    constructor(props: Types.AnimatedViewProps);
    setNativeProps(props: Types.AnimatedViewProps): void;
    render(): JSX.Element;
    focus(): void;
    blur(): void;
    setFocusRestricted(restricted: boolean): void;
    setFocusLimited(limited: boolean): void;
    private _onAnimatedComponentRef;
}
export declare type AnimatedValue = typeof AnimatedBase.Value;
export declare var Animated: {
    Image: typeof RX.AnimatedImage;
    Text: typeof RX.AnimatedText;
    TextInput: typeof RX.AnimatedTextInput;
    View: typeof RX.AnimatedView;
    Easing: RX.Types.Animated.Easing;
    timing: RX.Types.Animated.TimingFunction;
    delay: typeof RN.Animated.delay;
    parallel: typeof RN.Animated.parallel;
    sequence: typeof RN.Animated.sequence;
    Value: typeof RN.Animated.Value;
    createValue: (initialValue: number) => RN.Animated.Value;
    interpolate: (animatedValue: RX.Types.AnimatedValue, inputRange: number[], outputRange: string[]) => RX.Types.InterpolatedValue;
};
export default Animated;
