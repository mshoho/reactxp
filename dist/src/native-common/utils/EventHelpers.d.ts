import Types = require('../../common/Types');
export declare class EventHelpers {
    toKeyboardEvent(e: Types.SyntheticEvent): Types.KeyboardEvent;
    toFocusEvent(e: Types.SyntheticEvent): Types.FocusEvent;
    toMouseEvent(e: Types.SyntheticEvent): Types.MouseEvent;
    isRightMouseButton(e: Types.SyntheticEvent): boolean;
}
declare const _default: EventHelpers;
export default _default;
