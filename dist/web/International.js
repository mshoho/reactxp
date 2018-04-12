"use strict";
/**
* International.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation for i18n.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var International = /** @class */ (function () {
    function International() {
    }
    International.prototype.allowRTL = function (allow) {
        // Need to implement
    };
    International.prototype.forceRTL = function (force) {
        // Need to implement
    };
    International.prototype.isRTL = function () {
        return false;
    };
    return International;
}());
exports.International = International;
exports.default = new International();
