"use strict";
/**
* EventHelpers.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("../lodashMini");
//
// These helpers promote a SyntheticEvent to their higher level counterparts
var EventHelpers = /** @class */ (function () {
    function EventHelpers() {
    }
    EventHelpers.prototype.toKeyboardEvent = function (e) {
        // Conversion to a KeyboardEvent-like event if needed
        var keyEvent = e;
        if (keyEvent.keyCode === undefined) {
            // Currently some key codes are dependent on platform. React Native proper (the iOS and Android platforms) have different
            // keycodes for arrow keys when comparing with React (JS).
            // We align the keycodes for native desktop platforms to the other native ones, as a workaround.
            // Ideally all key codes should be consistent OR a set of constants should be exposed by ReactXP.
            var keyName = e.nativeEvent.key;
            var keyCode = 0;
            if (keyName.length === 1) {
                keyCode = keyName.charCodeAt(0);
            }
            else {
                switch (keyName) {
                    case 'Backspace':
                    case 'Delete':
                        keyCode = 8;
                        break;
                    case 'Tab':
                        keyCode = 9;
                        break;
                    case 'Enter':
                        keyCode = 13;
                        break;
                    case 'Shift':
                        keyCode = 16;
                        break;
                    case 'Control':
                        keyCode = 17;
                        break;
                    case 'Alt':
                        keyCode = 18;
                        break;
                    case 'Escape':
                        keyCode = 27;
                        break;
                    case 'Space':
                        keyCode = 32;
                        break;
                    case 'PageUp':
                        keyCode = 92;
                        break;
                    case 'PageDown':
                        keyCode = 93;
                        break;
                    case 'Left':
                    case 'ArrowLeft':
                        keyCode = 21;
                        break;
                    case 'Up':
                    case 'ArrowUp':
                        keyCode = 19;
                        break;
                    case 'Right':
                    case 'ArrowRight':
                        keyCode = 22;
                        break;
                    case 'Down':
                    case 'ArrowDown':
                        keyCode = 20;
                        break;
                }
            }
            // We need to add keyCode to the original event, but React Native
            // reuses events, so we're not allowed to modify the original.
            // Instead, we'll clone it.
            keyEvent = _.clone(keyEvent);
            keyEvent.keyCode = keyCode;
            if (e.nativeEvent.shiftKey) {
                keyEvent.shiftKey = e.nativeEvent.shiftKey;
            }
            if (e.nativeEvent.ctrlKey) {
                keyEvent.ctrlKey = e.nativeEvent.ctrlKey;
            }
            if (e.nativeEvent.altKey) {
                keyEvent.altKey = e.nativeEvent.altKey;
            }
            if (e.nativeEvent.metaKey) {
                keyEvent.metaKey = e.nativeEvent.metaKey;
            }
            keyEvent.stopPropagation = function () {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
            };
            keyEvent.preventDefault = function () {
                if (e.preventDefault) {
                    e.preventDefault();
                }
            };
        }
        return keyEvent;
    };
    EventHelpers.prototype.toFocusEvent = function (e) {
        // Ideally we'd like to add a null set "relatedTarget", but the new typing doesn't allow that.
        // So keeping it a noop for now
        return e;
    };
    EventHelpers.prototype.toMouseEvent = function (e) {
        // Nothing for now, this will have to be enhanced based on platform support.
        return e;
    };
    EventHelpers.prototype.isRightMouseButton = function (e) {
        return !!e.nativeEvent.isRightButton;
    };
    return EventHelpers;
}());
exports.EventHelpers = EventHelpers;
exports.default = new EventHelpers();
