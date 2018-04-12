import RXInterfaces = require('../common/Interfaces');
export declare class International implements RXInterfaces.International {
    allowRTL(allow: boolean): void;
    forceRTL(force: boolean): void;
    isRTL(): boolean;
}
declare const _default: International;
export default _default;
