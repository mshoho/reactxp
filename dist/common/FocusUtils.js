"use strict";
/**
* FocusUtils.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Publicly accessible functions for managing the focus.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var AutoFocusHelper_1 = require("./utils/AutoFocusHelper");
var FocusUtils = /** @class */ (function () {
    function FocusUtils() {
    }
    FocusUtils.prototype.autoFocus = function (value, focus, isAvailable) {
        return AutoFocusHelper_1.autoFocusIfNeeded(value, focus, isAvailable);
    };
    return FocusUtils;
}());
exports.FocusUtils = FocusUtils;
exports.default = new FocusUtils();
