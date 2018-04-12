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
var AutoFocusHelper_1 = require("../../common/utils/AutoFocusHelper");
var Types = require("../../common/Types");
var UserInterface_1 = require("../UserInterface");
var ATTR_NAME_TAB_INDEX = 'tabindex';
var ATTR_NAME_ARIA_HIDDEN = 'aria-hidden';
var _isNavigatingWithKeyboard;
var _isShiftPressed;
UserInterface_1.default.keyboardNavigationEvent.subscribe(function (isNavigatingWithKeyboard) {
    _isNavigatingWithKeyboard = isNavigatingWithKeyboard;
});
var FocusManager_2 = require("../../common/utils/FocusManager");
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
                    (!FocusManager._currentFocusedComponent || !FocusManager._currentFocusedComponent.removed) &&
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
            FocusManager.setLastFocusedProgrammatically(el);
            el.focus();
            return true;
        }
        return false;
    };
    FocusManager.setLastFocusedProgrammatically = function (element) {
        this._lastFocusedProgrammatically = element;
    };
    FocusManager.getLastFocusedProgrammatically = function (reset) {
        var ret = FocusManager._lastFocusedProgrammatically;
        if (ret && reset) {
            FocusManager._lastFocusedProgrammatically = undefined;
        }
        return ret;
    };
    FocusManager._getFirstFocusable = function (last, parent) {
        var focusable = Object.keys(FocusManager._allFocusableComponents)
            .filter(function (componentId) { return !parent || (componentId in parent._myFocusableComponentIds); })
            .map(function (componentId) { return FocusManager._allFocusableComponents[componentId]; })
            .filter(function (storedComponent) {
            return !storedComponent.removed &&
                !storedComponent.restricted &&
                storedComponent.limitedCount === 0 &&
                storedComponent.limitedCountAccessible === 0;
        })
            .map(function (storedComponent) { return { storedComponent: storedComponent, el: ReactDOM.findDOMNode(storedComponent.component) }; })
            .filter(function (f) { return f.el && f.el.focus && ((f.el.tabIndex || 0) >= 0); });
        if (focusable.length) {
            focusable.sort(function (a, b) {
                // Some element which is mounted later could come earlier in the DOM,
                // so, we sort the elements by their appearance in the DOM.
                if (a === b) {
                    return 0;
                }
                return a.el.compareDocumentPosition(b.el) & document.DOCUMENT_POSITION_PRECEDING ? 1 : -1;
            });
            return focusable[last ? focusable.length - 1 : 0];
        }
        return undefined;
    };
    FocusManager.focusFirst = function (last) {
        var elementToFocus = FocusManager._getFirstFocusable(last);
        if (elementToFocus) {
            FocusManager.setLastFocusedProgrammatically(elementToFocus.el);
            elementToFocus.el.focus();
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
            // Using autoFocusIfNeeded() with highest priority to avoid racing with
            // the elements which are scheduled for autofocus.
            var first_1 = FocusManager._getFirstFocusable(false, FocusManager._currentRestrictionOwner);
            if (first_1) {
                AutoFocusHelper_1.autoFocusIfNeeded(Types.AutoFocus.PriorityHighest, function () { return first_1.el.focus(); }, function () { return (!first_1.storedComponent.removed && !first_1.storedComponent.restricted); });
            }
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
            var currentFocused = FocusManager._currentFocusedComponent;
            if (currentFocused && !currentFocused.removed && !currentFocused.restricted) {
                // No need to reset the focus because it's moved inside the restricted area
                // already (manually or with autofocus).
                return;
            }
            FocusManager._resetFocusTimer = setTimeout(function () {
                FocusManager._resetFocusTimer = undefined;
                var prevTabIndex = FocusManager._setTabIndex(document.body, -1);
                FocusManager.setLastFocusedProgrammatically(document.body);
                document.body.focus();
                document.body.blur();
                FocusManager._setTabIndex(document.body, prevTabIndex);
            }, 0);
        }
    };
    FocusManager.prototype._updateComponentFocusRestriction = function (storedComponent) {
        var newAriaHidden = storedComponent.restricted || (storedComponent.limitedCount > 0) ? true : undefined;
        var newTabIndex = newAriaHidden || (storedComponent.limitedCountAccessible > 0) ? -1 : undefined;
        var restrictionRemoved = newTabIndex === undefined;
        if ((storedComponent.curTabIndex !== newTabIndex) || (storedComponent.curAriaHidden !== newAriaHidden)) {
            var el = ReactDOM.findDOMNode(storedComponent.component);
            if (el) {
                if (storedComponent.curTabIndex !== newTabIndex) {
                    storedComponent.curTabIndex = newTabIndex;
                    if (restrictionRemoved) {
                        FocusManager._setTabIndex(el, storedComponent.origTabIndex);
                    }
                    else {
                        var prevTabIndex = FocusManager._setTabIndex(el, newTabIndex);
                        if (!('origTabIndex' in storedComponent)) {
                            storedComponent.origTabIndex = prevTabIndex;
                        }
                    }
                }
                if (storedComponent.curAriaHidden !== newAriaHidden) {
                    storedComponent.curAriaHidden = newAriaHidden;
                    if (restrictionRemoved) {
                        FocusManager._setAriaHidden(el, storedComponent.origAriaHidden);
                    }
                    else {
                        var prevAriaHidden = FocusManager._setAriaHidden(el, newAriaHidden ? 'true' : undefined);
                        if (!('origAriaHidden' in storedComponent)) {
                            storedComponent.origAriaHidden = prevAriaHidden;
                        }
                    }
                }
                if (restrictionRemoved) {
                    delete storedComponent.origTabIndex;
                    delete storedComponent.origAriaHidden;
                }
            }
            FocusManager._callFocusableComponentStateChangeCallbacks(storedComponent, !restrictionRemoved);
        }
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
function applyFocusableComponentMixin(Component, isConditionallyFocusable) {
    FocusManager_2.applyFocusableComponentMixin(Component, isConditionallyFocusable);
    var origFocus = Component.prototype.focus;
    if (origFocus) {
        Component.prototype.focus = function () {
            var el = ReactDOM.findDOMNode(this);
            if (el) {
                FocusManager.setLastFocusedProgrammatically(el);
            }
            origFocus.apply(this, arguments);
        };
    }
}
exports.applyFocusableComponentMixin = applyFocusableComponentMixin;
if ((typeof document !== 'undefined') && (typeof window !== 'undefined')) {
    FocusManager.initListeners();
}
exports.default = FocusManager;
