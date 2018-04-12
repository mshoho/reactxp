"use strict";
/**
* Alert.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Native Alert dialog boxes for ReactXP.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var RN = require("react-native");
// Native implementation for alert dialog boxes
var Alert = /** @class */ (function () {
    function Alert() {
    }
    Alert.prototype.show = function (title, message, buttons, options) {
        RN.Alert.alert(title, message, buttons);
    };
    return Alert;
}());
exports.Alert = Alert;
exports.default = new Alert();
