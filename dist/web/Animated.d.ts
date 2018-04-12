import Easing from '../common/Easing';
import RX = require('../common/Interfaces');
import Types = require('../common/Types');
export declare abstract class Animation {
    _id: number | undefined;
    abstract start(onEnd?: Types.Animated.EndCallback): void;
    abstract stop(): void;
}
export interface ValueListener {
    setValue(valueObject: Value, newValue: number | string): void;
    startTransition(valueObject: Value, from: number | string, toValue: number | string, duration: number, easing: string, delay: number, onEnd: Types.Animated.EndCallback): void;
    stopTransition(valueObject: Value): number | string | undefined;
}
export declare class Value extends Types.AnimatedValue {
    private _value;
    private _listeners;
    private _interpolationConfig;
    constructor(value: number);
    _getValue(): number | string;
    _isInterpolated(): boolean;
    _getInterpolatedValue(key: number): string | number;
    interpolate(config: Types.Animated.InterpolationConfigType): this;
    setValue(value: number | string): void;
    addListener(listenerToAdd: ValueListener): void;
    removeListener(listenerToRemove: ValueListener): void;
    removeAllListeners(): void;
    startTransition(toValue: number | string, duration: number, easing: string, delay: number, onEnd: Types.Animated.EndCallback): void;
    stopTransition(): void;
    updateFinalValue(value: number | string): void;
}
export declare let timing: Types.Animated.TimingFunction;
export declare let sequence: Types.Animated.SequenceFunction;
export declare var parallel: Types.Animated.ParallelFunction;
export declare var Image: typeof RX.AnimatedImage;
export declare var Text: typeof RX.AnimatedText;
export declare var TextInput: typeof RX.AnimatedTextInput;
export declare var View: typeof RX.AnimatedView;
export declare type Image = RX.AnimatedImage;
export declare type Text = RX.AnimatedText;
export declare type TextInput = RX.AnimatedTextInput;
export declare type View = RX.AnimatedView;
export declare var createValue: (initialValue: number) => Value;
export declare var interpolate: (value: Value, inputRange: number[], outputRange: string[]) => Value;
export { Easing };
