/**
* FocusUtils.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Publicly accessible functions for managing the focus.
*/
import RXInterfaces = require('./Interfaces');
import RXTypes = require('./Types');
export declare class FocusUtils implements RXInterfaces.FocusUtils {
    autoFocus(value: RXTypes.AutoFocus | RXTypes.AutoFocus[], focus: () => void, isAvailable: () => boolean): boolean;
}
declare const _default: FocusUtils;
export default _default;
