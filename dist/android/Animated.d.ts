/// <reference types="react" />
import RN = require('react-native');
import RX = require('../common/Interfaces');
import CommonAnimated from '../native-common/Animated';
export declare class AnimatedText extends CommonAnimated.Text {
    render(): JSX.Element;
}
export declare type AnimatedValue = typeof CommonAnimated.Value;
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
