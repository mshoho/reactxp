/**
* FocusManager.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Manages focusable elements for better keyboard navigation (web version)
*/

import ReactDOM = require('react-dom');

import { FocusManager as FocusManagerBase,
    FocusableComponentInternal,
    StoredFocusableComponent } from '../../common/utils/FocusManager';
import { runAfterArbitration, cancelRunAfterArbitration } from '../../common/utils/AutoFocusHelper';
import { sortFocusableComponentsByAppearance } from './FocusableComponentHelpers';

import UserInterface from '../UserInterface';

const ATTR_NAME_TAB_INDEX = 'tabindex';
const ATTR_NAME_ARIA_HIDDEN = 'aria-hidden';

let _isShiftPressed: boolean;

import {
    applyFocusableComponentMixin as applyFocusableComponentMixinCommon,
    FocusableComponentStateCallback
} from  '../../common/utils/FocusManager';

export { FocusableComponentStateCallback };

export class FocusManager extends FocusManagerBase {
    private static _setTabIndexTimer: number|undefined;
    private static _setTabIndexElement: HTMLElement|undefined;
    private static _lastFocusedProgrammatically: HTMLElement|undefined;
    private static _runAfterArbitrationId: number | undefined;

    // Not really public
    public static initListeners(): void {
        // The default behaviour on Electron is to release the focus after the
        // Tab key is pressed on a last focusable element in the page and focus
        // the first focusable element on a consecutive Tab key press.
        // We want to avoid losing this first Tab key press.
        let _checkFocusTimer: number|undefined;

        // Checking if Shift is pressed to move the focus into the right direction.
        window.addEventListener('keydown', event => {
            _isShiftPressed = event.shiftKey;
        });
        window.addEventListener('keyup', event => {
            _isShiftPressed = event.shiftKey;
        });

        document.body.addEventListener('focusout', event => {
            if (!UserInterface.isNavigatingWithKeyboard() || (event.target === document.body)) {
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

            _checkFocusTimer = setTimeout(() => {
                _checkFocusTimer = undefined;

                if (UserInterface.isNavigatingWithKeyboard() &&
                        (!FocusManager._currentFocusedComponent || !FocusManager._currentFocusedComponent.removed) &&
                        (!document.activeElement || (document.activeElement === document.body))) {
                    // This should work for Electron and the browser should
                    // send the focus to the address bar anyway.
                    FocusManager._requestFocusFirst(_isShiftPressed);
                }
            }, 100);
        });
    }

    protected /* static */ addFocusListenerOnComponent(component: FocusableComponentInternal, onFocus: () => void): void {
        const el = ReactDOM.findDOMNode(component) as HTMLElement;
        if (el) {
            el.addEventListener('focus', onFocus);
        }
    }

    protected /* static */ removeFocusListenerFromComponent(component: FocusableComponentInternal, onFocus: () => void): void {
        const el = ReactDOM.findDOMNode(component) as HTMLElement;
        if (el) {
            el.removeEventListener('focus', onFocus);
        }
    }

    protected /* static */ focusComponent(component: FocusableComponentInternal): boolean {
        const el = ReactDOM.findDOMNode(component) as HTMLElement;
        if (el && el.focus) {
            FocusManager.setLastFocusedProgrammatically(el);
            el.focus();
            return true;
        }
        return false;
    }

    static setLastFocusedProgrammatically(element: HTMLElement|undefined) {
        this._lastFocusedProgrammatically = element;
    }

    static getLastFocusedProgrammatically(reset?: boolean): HTMLElement|undefined {
        const ret = FocusManager._lastFocusedProgrammatically;
        if (ret && reset) {
            FocusManager._lastFocusedProgrammatically = undefined;
        }
        return ret;
    }

    protected /* static */ resetFocus(focusFirstWhenNavigatingWithKeyboard: boolean, callback?: () => void) {
        if (FocusManager._runAfterArbitrationId) {
            cancelRunAfterArbitration(FocusManager._runAfterArbitrationId);
            FocusManager._runAfterArbitrationId = undefined;
        }

        if (UserInterface.isNavigatingWithKeyboard() && focusFirstWhenNavigatingWithKeyboard) {
            // When we're in the keyboard navigation mode, we want to have the
            // first focusable component to be focused straight away, without the
            // necessity to press Tab.
            FocusManager._requestFocusFirst();

            if (callback) {
                FocusManager._runAfterArbitrationId = runAfterArbitration(() => {
                    // Making sure to run after all autoFocus logic is done.
                    FocusManager._runAfterArbitrationId = undefined;
                    callback();
                });
            }
        } else if ((typeof document !== 'undefined') && document.body && document.body.focus && document.body.blur) {
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
            FocusManager._runAfterArbitrationId = runAfterArbitration(() => {
                // Making sure to run after all autoFocus logic is done.
                FocusManager._runAfterArbitrationId = undefined;

                const currentFocused = FocusManager._currentFocusedComponent;

                if (currentFocused && !currentFocused.removed && !currentFocused.restricted) {
                    // No need to reset the focus because it's moved inside the restricted area
                    // already (manually or with autofocus).
                    if (callback) {
                        callback();
                    }

                    return;
                }

                const prevTabIndex = FocusManager._setTabIndex(document.body, -1);

                FocusManager.setLastFocusedProgrammatically(document.body);
                document.body.focus();
                document.body.blur();
                FocusManager._setTabIndex(document.body, prevTabIndex);

                if (callback) {
                    callback();
                }
            });
        }
    }

    protected /* static */  _updateComponentFocusRestriction(storedComponent: StoredFocusableComponent) {
        let newAriaHidden = storedComponent.restricted || (storedComponent.limitedCount > 0) ? true : undefined;
        let newTabIndex = newAriaHidden || (storedComponent.limitedCountAccessible > 0) ? -1 : undefined;
        const restrictionRemoved = newTabIndex === undefined;

        if (storedComponent.runAfterArbitrationId) {
            cancelRunAfterArbitration(storedComponent.runAfterArbitrationId);
            storedComponent.runAfterArbitrationId = undefined;
        }

        if ((storedComponent.curTabIndex !== newTabIndex) || (storedComponent.curAriaHidden !== newAriaHidden)) {
            const el = ReactDOM.findDOMNode(storedComponent.component) as HTMLElement;

            if (el) {
                if (storedComponent.curTabIndex !== newTabIndex) {
                    storedComponent.curTabIndex = newTabIndex;

                    if (restrictionRemoved) {
                        FocusManager._setTabIndex(el, storedComponent.origTabIndex);
                    } else {
                        const prevTabIndex = FocusManager._setTabIndex(el, newTabIndex);
                        if (!('origTabIndex' in storedComponent)) {
                            storedComponent.origTabIndex = prevTabIndex;
                        }
                    }
                }

                if (storedComponent.curAriaHidden !== newAriaHidden) {
                    storedComponent.curAriaHidden = newAriaHidden;

                    if (restrictionRemoved) {
                        FocusManager._setAriaHidden(el, storedComponent.origAriaHidden);
                    } else {
                        const prevAriaHidden = FocusManager._setAriaHidden(el, newAriaHidden ? 'true' : undefined);
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
    }

    private static _setTabIndex(element: HTMLElement, value: number|undefined): number|undefined {
        // If a tabIndex assignment is pending for this element, cancel it now.
        if (FocusManager._setTabIndexTimer && element === FocusManager._setTabIndexElement) {
            clearTimeout(FocusManager._setTabIndexTimer);
            FocusManager._setTabIndexTimer = undefined;
        }

        const prev = element.hasAttribute(ATTR_NAME_TAB_INDEX) ? element.tabIndex : undefined;
        if (value === undefined) {
            if (prev !== undefined) {
                element.removeAttribute(ATTR_NAME_TAB_INDEX);
            }
        } else if (value !== prev) {
            // Setting tabIndex to -1 on the active element would trigger sync layout. Defer it.
            if (value === -1 && element === document.activeElement) {
                // If a tabIndex assignment is pending for another element, run it now as we know
                // that it's not active anymore.
                if (FocusManager._setTabIndexTimer) {
                    FocusManager._setTabIndexElement!!!.tabIndex = -1;
                    clearTimeout(FocusManager._setTabIndexTimer);
                    FocusManager._setTabIndexTimer = undefined;
                }

                FocusManager._setTabIndexElement = element;
                FocusManager._setTabIndexTimer = setTimeout(() => {
                    element.tabIndex = value;
                }, 0);
            } else {
                element.tabIndex = value;
            }
        }

        return prev;
    }

    private static _setAriaHidden(element: HTMLElement, value: string|undefined): string|undefined {
        const prev = element.hasAttribute(ATTR_NAME_ARIA_HIDDEN) ? element.getAttribute(ATTR_NAME_ARIA_HIDDEN) || undefined : undefined;

        if (value === undefined) {
            if (prev !== undefined) {
                element.removeAttribute(ATTR_NAME_ARIA_HIDDEN);
            }
        } else {
            element.setAttribute(ATTR_NAME_ARIA_HIDDEN, value);
        }

        return prev;
    }
}

FocusManagerBase._sortFunc = sortFocusableComponentsByAppearance;

export function applyFocusableComponentMixin(Component: any, isConditionallyFocusable?: Function) {
    applyFocusableComponentMixinCommon(Component, isConditionallyFocusable);

    const origFocus = Component.prototype.focus;

    if (origFocus) {
        Component.prototype.focus = function () {
            const el = ReactDOM.findDOMNode(this) as HTMLElement;
            if (el) {
                FocusManager.setLastFocusedProgrammatically(el);
            }

            origFocus.apply(this, arguments);
        };
    }
}

if ((typeof document !== 'undefined') && (typeof window !== 'undefined')) {
    FocusManager.initListeners();
}

export default FocusManager;
