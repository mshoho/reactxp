import RN = require('react-native');
import { ReactNativeBaseComponent } from 'react-native';
import Types = require('../common/Types');
import RX = require('../common/Interfaces');
export interface AnimatedClasses {
    Image: typeof ReactNativeBaseComponent;
    Text: typeof ReactNativeBaseComponent;
    TextInput: typeof ReactNativeBaseComponent;
    View: typeof ReactNativeBaseComponent;
}
export declare const CommonAnimatedClasses: AnimatedClasses;
export declare function makeAnimated(nativeAnimatedClasses: AnimatedClasses, useFocusRestrictedView?: boolean): RX.Animated;
export declare let AnimatedCommon: {
    Easing: Types.Animated.Easing;
    timing: (value: Types.AnimatedValue, config: Types.Animated.TimingAnimationConfig) => Types.Animated.CompositeAnimation;
    delay: typeof RN.Animated.delay;
    parallel: typeof RN.Animated.parallel;
    sequence: typeof RN.Animated.sequence;
    Value: typeof RN.Animated.Value;
    createValue: (initialValue: number) => RN.Animated.Value;
    interpolate: (animatedValue: Types.AnimatedValue, inputRange: number[], outputRange: string[]) => Types.InterpolatedValue;
};
export default AnimatedCommon;
