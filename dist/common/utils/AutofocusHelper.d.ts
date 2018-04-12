/**
* AutoFocusHelper.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Provides the logic to decide if the component needs to be autofocused
* on mount, depending on a combination of AutoFocus enum values.
*/
import Types = require('../Types');
export declare function initAutoFocus(platform: Types.PlatformType, isNavigatingWithKeyboard: () => boolean): void;
export declare function autoFocusIfNeeded(value: Types.AutoFocus | Types.AutoFocus[], focus: () => void, isAvailable: () => boolean): boolean;
