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
            // We need to add keyCode and other properties to the original event, but React Native
            // reuses events, so we're not allowed to modify the original.
            // Instead, we'll clone it.
            keyEvent = _.clone(keyEvent);
            keyEvent.keyCode = keyCode;
            var nativeEvent = e.nativeEvent;
            if (nativeEvent.shiftKey) {
                keyEvent.shiftKey = nativeEvent.shiftKey;
            }
            if (nativeEvent.ctrlKey) {
                keyEvent.ctrlKey = nativeEvent.ctrlKey;
            }
            if (nativeEvent.altKey) {
                keyEvent.altKey = nativeEvent.altKey;
            }
            if (nativeEvent.metaKey) {
                keyEvent.metaKey = nativeEvent.metaKey;
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
        // We need to add various properties to the original event, but React Native
        // reuses events, so we're not allowed to modify the original.
        // Instead, we'll clone it.
        var mouseEvent = _.clone(e);
        var nativeEvent = e.nativeEvent;
        // We keep pageX/Y and clientX/Y coordinates in sync, similar to the React web behavior
        // RN (UWP flavor for this type of event) also pass coordinates in the target view (locationX/Y) that we don't use here.
        if (nativeEvent.pageX !== undefined) {
            mouseEvent.clientX = mouseEvent.pageX = nativeEvent.pageX;
        }
        if (nativeEvent.pageY !== undefined) {
            mouseEvent.clientY = mouseEvent.pageY = nativeEvent.pageY;
        }
        if (!!nativeEvent.IsRightButton) {
            mouseEvent.button = 2;
        }
        else if (!!nativeEvent.IsMiddleButton) {
            mouseEvent.button = 1;
        }
        else {
            mouseEvent.button = 0;
        }
        if (nativeEvent.shiftKey) {
            mouseEvent.shiftKey = nativeEvent.shiftKey;
        }
        if (nativeEvent.ctrlKey) {
            mouseEvent.ctrlKey = nativeEvent.ctrlKey;
        }
        if (nativeEvent.altKey) {
            mouseEvent.altKey = nativeEvent.altKey;
        }
        if (nativeEvent.metaKey) {
            mouseEvent.metaKey = nativeEvent.metaKey;
        }
        mouseEvent.stopPropagation = function () {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
        };
        mouseEvent.preventDefault = function () {
            if (e.preventDefault) {
                e.preventDefault();
            }
        };
        return mouseEvent;
    };
    EventHelpers.prototype.isRightMouseButton = function (e) {
        return !!e.nativeEvent.isRightButton;
    };
    return EventHelpers;
}());
exports.EventHelpers = EventHelpers;
exports.default = new EventHelpers();
