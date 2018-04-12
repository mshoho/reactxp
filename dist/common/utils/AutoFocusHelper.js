"use strict";
/**
* AutoFocusHelper.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Provides the logic to decide if the component needs to be autofocused
* on mount, depending on a combination of AutoFocus enum values.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var Types = require("../Types");
var _isAndroid = false;
var _isIOS = false;
var _isWeb = false;
var _isWindows = false;
var _isMac = false;
var _isNavigatingWithKeyboard;
var _autoFocusTimer;
var _pendingAutoFocusItems = [];
function initAutoFocus(platform, isNavigatingWithKeyboard) {
    switch (platform) {
        case 'web':
            _isWeb = true;
            break;
        case 'ios':
            _isIOS = true;
            break;
        case 'android':
            _isAndroid = true;
            break;
        case 'windows':
            _isWindows = true;
            break;
        case 'macos':
            _isMac = true;
            break;
    }
    _isNavigatingWithKeyboard = isNavigatingWithKeyboard;
}
exports.initAutoFocus = initAutoFocus;
function autoFocusIfNeeded(value, focus, isAvailable) {
    if (!(value instanceof Array)) {
        value = [value];
    }
    var isPlatformSpecified = false;
    var shouldFocusAndroid = false;
    var shouldFocusIOS = false;
    var shouldFocusWeb = false;
    var shouldFocusWindows = false;
    var shouldFocusMac = false;
    var isKeyboardSpecified = false;
    var shouldFocusWhenNavigatingWithKeyboard = false;
    var shouldFocusWhenNavigatingWithoutKeyboard = false;
    var priority = Types.AutoFocus.PriorityLow;
    var delay = 0;
    for (var i = 0; i < value.length; i++) {
        switch (value[i]) {
            case Types.AutoFocus.No:
                return false;
            case Types.AutoFocus.Yes:
                isPlatformSpecified = shouldFocusAndroid = shouldFocusIOS = shouldFocusWeb = shouldFocusWindows = shouldFocusMac = true;
                isKeyboardSpecified = shouldFocusWhenNavigatingWithKeyboard = shouldFocusWhenNavigatingWithoutKeyboard = true;
                break;
            case Types.AutoFocus.WhenNavigatingWithKeyboard:
                shouldFocusWhenNavigatingWithKeyboard = isKeyboardSpecified = true;
                break;
            case Types.AutoFocus.WhenNavigatingWithoutKeyboard:
                shouldFocusWhenNavigatingWithoutKeyboard = isKeyboardSpecified = true;
                break;
            case Types.AutoFocus.Android:
                shouldFocusAndroid = isPlatformSpecified = true;
                break;
            case Types.AutoFocus.IOS:
                shouldFocusIOS = isPlatformSpecified = true;
                break;
            case Types.AutoFocus.Web:
                shouldFocusWeb = isPlatformSpecified = true;
                break;
            case Types.AutoFocus.Windows:
                shouldFocusWindows = isPlatformSpecified = true;
                break;
            case Types.AutoFocus.Mac:
                shouldFocusMac = isPlatformSpecified = true;
                break;
            case Types.AutoFocus.PriorityLow:
            case Types.AutoFocus.PriorityHigh:
            case Types.AutoFocus.PriorityHighest:
                priority = value[i];
                break;
            case Types.AutoFocus.Delay100:
                delay = 100;
                break;
            case Types.AutoFocus.Delay500:
                delay = 500;
                break;
            case Types.AutoFocus.Delay1000:
                delay = 1000;
                break;
        }
    }
    if (isKeyboardSpecified) {
        var isNavigatingWithKeyboard = _isNavigatingWithKeyboard();
        if ((isNavigatingWithKeyboard && !shouldFocusWhenNavigatingWithKeyboard) ||
            (!isNavigatingWithKeyboard && !shouldFocusWhenNavigatingWithoutKeyboard)) {
            return false;
        }
    }
    if (isPlatformSpecified &&
        ((_isAndroid && !shouldFocusAndroid) || (_isIOS && !shouldFocusIOS) || (_isWeb && !shouldFocusWeb) ||
            (_isWindows && !shouldFocusWindows) || (_isMac && !shouldFocusMac))) {
        return false;
    }
    _pendingAutoFocusItems.push({
        focus: focus,
        isAvailable: isAvailable,
        delay: delay,
        priority: priority,
        order: _pendingAutoFocusItems.length
    });
    if (_autoFocusTimer) {
        clearTimeout(_autoFocusTimer);
    }
    // Defer the action to wait for all components which are being mounted at
    // the same tick.
    _autoFocusTimer = setTimeout(function () {
        _autoFocusTimer = undefined;
        // Sorting by (Autofocus priority, Order of mount).
        _pendingAutoFocusItems.sort(function (a, b) {
            return a.priority === b.priority
                ? (a.order === b.order ? 0 : (a.order < b.order ? -1 : 1))
                : (a.priority === b.priority ? 0 : (a.priority > b.priority ? -1 : 1));
        });
        var autoFocusItem = _pendingAutoFocusItems[0];
        _pendingAutoFocusItems = [];
        if (autoFocusItem) {
            var autoFocusAction_1 = function () {
                if (autoFocusItem.isAvailable()) {
                    autoFocusItem.focus();
                }
            };
            if (autoFocusItem.delay > 0) {
                _autoFocusTimer = setTimeout(function () {
                    _autoFocusTimer = undefined;
                    autoFocusAction_1();
                }, autoFocusItem.delay);
            }
            else {
                autoFocusAction_1();
            }
        }
    }, 0);
    return true;
}
exports.autoFocusIfNeeded = autoFocusIfNeeded;
