"use strict";
/**
* FocusManager.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Manages focusable elements for better keyboard navigation (web version)
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOM = require("react-dom");
var FocusManager_1 = require("../../common/utils/FocusManager");
var UserInterface_1 = require("../UserInterface");
var ATTR_NAME_TAB_INDEX = 'tabindex';
var ATTR_NAME_ARIA_HIDDEN = 'aria-hidden';
var _isNavigatingWithKeyboard;
var _isShiftPressed;
UserInterface_1.default.keyboardNavigationEvent.subscribe(function (isNavigatingWithKeyboard) {
    _isNavigatingWithKeyboard = isNavigatingWithKeyboard;
});
var FocusManager_2 = require("../../common/utils/FocusManager");
exports.applyFocusableComponentMixin = FocusManager_2.applyFocusableComponentMixin;
var FocusManager = /** @class */ (function (_super) {
    __extends(FocusManager, _super);
    function FocusManager(parent) {
        return _super.call(this, parent) || this;
    }
    // Not really public
    FocusManager.initListeners = function () {
        // The default behaviour on Electron is to release the focus after the
        // Tab key is pressed on a last focusable element in the page and focus
        // the first focusable element on a consecutive Tab key press.
        // We want to avoid losing this first Tab key press.
        var _checkFocusTimer;
        // Checking if Shift is pressed to move the focus into the right direction.
        window.addEventListener('keydown', function (event) {
            _isShiftPressed = event.shiftKey;
        });
        window.addEventListener('keyup', function (event) {
            _isShiftPressed = event.shiftKey;
        });
        document.body.addEventListener('focusout', function (event) {
            if (!_isNavigatingWithKeyboard || (event.target === document.body)) {
                return;
            }
            if (_checkFocusTimer) {
                clearTimeout(_checkFocusTimer);
            }
            if (FocusManager._skipFocusCheck) {
                // When in between the FocusManager restrictions,
                // don't check for the focus change here, FocusManager
                // will take care of it.
                FocusManager._skipFocusCheck = false;
                return;
            }
            _checkFocusTimer = setTimeout(function () {
                _checkFocusTimer = undefined;
                if (_isNavigatingWithKeyboard &&
                    (!document.activeElement || (document.activeElement === document.body))) {
                    // This should work for Electron and the browser should
                    // send the focus to the address bar anyway.
                    FocusManager.focusFirst(_isShiftPressed);
                }
            }, 0);
        });
    };
    FocusManager.prototype.addFocusListenerOnComponent = function (component, onFocus) {
        var el = ReactDOM.findDOMNode(component);
        if (el) {
            el.addEventListener('focus', onFocus);
        }
    };
    FocusManager.prototype.removeFocusListenerFromComponent = function (component, onFocus) {
        var el = ReactDOM.findDOMNode(component);
        if (el) {
            el.removeEventListener('focus', onFocus);
        }
    };
    FocusManager.prototype.focusComponent = function (component) {
        var el = ReactDOM.findDOMNode(component);
        if (el && el.focus) {
            el.focus();
            return true;
        }
        return false;
    };
    FocusManager.focusFirst = function (last) {
        var focusable = Object.keys(FocusManager._allFocusableComponents)
            .map(function (componentId) { return FocusManager._allFocusableComponents[componentId]; })
            .filter(function (storedComponent) { return !storedComponent.removed && !storedComponent.restricted && !storedComponent.limitedCount; })
            .map(function (storedComponent) { return ReactDOM.findDOMNode(storedComponent.component); })
            .filter(function (el) { return el && el.focus; });
        if (focusable.length) {
            focusable.sort(function (a, b) {
                // Some element which is mounted later could come earlier in the DOM,
                // so, we sort the elements by their appearance in the DOM.
                if (a === b) {
                    return 0;
                }
                return a.compareDocumentPosition(b) & document.DOCUMENT_POSITION_PRECEDING ? 1 : -1;
            });
            focusable[last ? focusable.length - 1 : 0].focus();
        }
    };
    FocusManager.prototype.resetFocus = function () {
        if (FocusManager._resetFocusTimer) {
            clearTimeout(FocusManager._resetFocusTimer);
            FocusManager._resetFocusTimer = undefined;
        }
        if (_isNavigatingWithKeyboard) {
            // When we're in the keyboard navigation mode, we want to have the
            // first focusable component to be focused straight away, without the
            // necessity to press Tab.
            // Defer the focusing to let the view finish its initialization.
            FocusManager._resetFocusTimer = setTimeout(function () {
                FocusManager._resetFocusTimer = undefined;
                FocusManager.focusFirst();
            }, 0);
        }
        else if ((typeof document !== 'undefined') && document.body && document.body.focus && document.body.blur) {
            // An example to explain this part:
            // We've shown a modal dialog which is higher in the DOM by clicking
            // on a button which is lower in the DOM, we've applied the restrictions
            // and only the elements from the modal dialog are focusable now.
            // But internally the browser keeps the last focus position in the DOM
            // (even if we do blur() for the button) and when Tab is pressed again,
            // the browser will start searching for the next focusable element from
            // this position.
            // This means that the first Tab press will get us to the browser's address
            // bar (or nowhere in case of Electron) and only the second Tab press will
            // lead us to focusing the first focusable element in the modal dialog.
            // In order to avoid losing this first Tab press, we're making <body>
            // focusable, focusing it, removing the focus and making it unfocusable
            // back again.
            // Defer the work to avoid triggering sync layout.
            FocusManager._resetFocusTimer = setTimeout(function () {
                FocusManager._resetFocusTimer = undefined;
                var prevTabIndex = FocusManager._setTabIndex(document.body, 0);
                var activeElement = document.activeElement;
                document.body.focus();
                document.body.blur();
                FocusManager._setTabIndex(document.body, prevTabIndex);
                if (activeElement instanceof HTMLElement) {
                    activeElement.focus();
                }
            }, 0);
        }
    };
    FocusManager.prototype._updateComponentFocusRestriction = function (storedComponent) {
        if ((storedComponent.restricted || (storedComponent.limitedCount > 0)) && !('origTabIndex' in storedComponent)) {
            var origValues = FocusManager._setComponentTabIndexAndAriaHidden(storedComponent.component, -1, 'true');
            storedComponent.origTabIndex = origValues ? origValues.tabIndex : undefined;
            storedComponent.origAriaHidden = origValues ? origValues.ariaHidden : undefined;
            FocusManager._callFocusableComponentStateChangeCallbacks(storedComponent, true);
        }
        else if (!storedComponent.restricted && !storedComponent.limitedCount && ('origTabIndex' in storedComponent)) {
            FocusManager._setComponentTabIndexAndAriaHidden(storedComponent.component, storedComponent.origTabIndex, storedComponent.origAriaHidden);
            delete storedComponent.origTabIndex;
            delete storedComponent.origAriaHidden;
            FocusManager._callFocusableComponentStateChangeCallbacks(storedComponent, false);
        }
    };
    FocusManager._setComponentTabIndexAndAriaHidden = function (component, tabIndex, ariaHidden) {
        var el = ReactDOM.findDOMNode(component);
        return el ?
            {
                tabIndex: FocusManager._setTabIndex(el, tabIndex),
                ariaHidden: FocusManager._setAriaHidden(el, ariaHidden)
            }
            :
                undefined;
    };
    FocusManager._setTabIndex = function (element, value) {
        // If a tabIndex assignment is pending for this element, cancel it now.
        if (FocusManager._setTabIndexTimer && element === FocusManager._setTabIndexElement) {
            clearTimeout(FocusManager._setTabIndexTimer);
            FocusManager._setTabIndexTimer = undefined;
        }
        var prev = element.hasAttribute(ATTR_NAME_TAB_INDEX) ? element.tabIndex : undefined;
        if (value === undefined) {
            if (prev !== undefined) {
                element.removeAttribute(ATTR_NAME_TAB_INDEX);
            }
        }
        else if (value !== prev) {
            // Setting tabIndex to -1 on the active element would trigger sync layout. Defer it.
            if (value === -1 && element === document.activeElement) {
                // If a tabIndex assignment is pending for another element, run it now as we know
                // that it's not active anymore.
                if (FocusManager._setTabIndexTimer) {
                    FocusManager._setTabIndexElement.tabIndex = -1;
                    clearTimeout(FocusManager._setTabIndexTimer);
                    FocusManager._setTabIndexTimer = undefined;
                }
                FocusManager._setTabIndexElement = element;
                FocusManager._setTabIndexTimer = setTimeout(function () {
                    element.tabIndex = value;
                }, 0);
            }
            else {
                element.tabIndex = value;
            }
        }
        return prev;
    };
    FocusManager._setAriaHidden = function (element, value) {
        var prev = element.hasAttribute(ATTR_NAME_ARIA_HIDDEN) ? element.getAttribute(ATTR_NAME_ARIA_HIDDEN) || undefined : undefined;
        if (value === undefined) {
            if (prev !== undefined) {
                element.removeAttribute(ATTR_NAME_ARIA_HIDDEN);
            }
        }
        else {
            element.setAttribute(ATTR_NAME_ARIA_HIDDEN, value);
        }
        return prev;
    };
    return FocusManager;
}(FocusManager_1.FocusManager));
exports.FocusManager = FocusManager;
if ((typeof document !== 'undefined') && (typeof window !== 'undefined')) {
    FocusManager.initListeners();
}
exports.default = FocusManager;
