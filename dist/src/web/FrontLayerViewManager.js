"use strict";
/**
* FrontLayerViewManager.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Manages the layering of the main view, modals and popups.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var RootView_1 = require("./RootView");
var FrontLayerViewManager = /** @class */ (function () {
    function FrontLayerViewManager() {
        var _this = this;
        this._modalStack = [];
        this._activePopupAutoDismiss = false;
        this._activePopupAutoDismissDelay = 0;
        this._activePopupShowDelay = 0;
        this._shouldPopupBeDismissed = function (options) {
            return !!_this._activePopupOptions &&
                _this._activePopupOptions.getAnchor() === options.getAnchor();
        };
    }
    FrontLayerViewManager.prototype.setMainView = function (element) {
        this._mainView = element;
        this._renderRootView();
    };
    FrontLayerViewManager.prototype.isModalDisplayed = function (modalId) {
        if (modalId) {
            return this._modalStack.some(function (d) { return d.id === modalId; });
        }
        else {
            return this._modalStack.length > 0;
        }
    };
    FrontLayerViewManager.prototype.showModal = function (modal, modalId, options) {
        // Dismiss any active popups.
        if (this._activePopupOptions) {
            this.dismissPopup(this._activePopupId);
        }
        this._modalStack.push({ modal: modal, id: modalId });
        this._renderRootView();
    };
    FrontLayerViewManager.prototype.dismissModal = function (modalId) {
        this._modalStack = this._modalStack.filter(function (d) { return d.id !== modalId; });
        this._renderRootView();
    };
    FrontLayerViewManager.prototype.dismissAllModals = function () {
        if (this._modalStack.length > 0) {
            this._modalStack = [];
            this._renderRootView();
        }
    };
    FrontLayerViewManager.prototype.showPopup = function (options, popupId, showDelay) {
        // If options.dismissIfShown is true, calling this method will behave like a toggle.
        // On one call, it will open the popup. If it is called when pop up is seen, it will
        // dismiss the popup. If options.dismissIfShown is false, we will simply show the
        // popup always.
        if (options.dismissIfShown) {
            if (this._shouldPopupBeDismissed(options)) {
                this.dismissPopup(popupId);
                return false;
            }
        }
        this._showPopup(options, popupId, showDelay);
        return true;
    };
    FrontLayerViewManager.prototype._showPopup = function (options, popupId, showDelay) {
        var _this = this;
        if (this._activePopupOptions) {
            if (this._activePopupOptions.onDismiss) {
                this._activePopupOptions.onDismiss();
            }
        }
        if (this._popupShowDelayTimer) {
            clearTimeout(this._popupShowDelayTimer);
            this._popupShowDelayTimer = undefined;
        }
        this._activePopupOptions = options;
        this._activePopupId = popupId;
        this._activePopupAutoDismiss = false;
        this._activePopupAutoDismissDelay = 0;
        this._activePopupShowDelay = showDelay || 0;
        this._renderRootView();
        if (this._activePopupShowDelay > 0) {
            this._popupShowDelayTimer = window.setTimeout(function () {
                _this._activePopupShowDelay = 0;
                _this._popupShowDelayTimer = undefined;
                _this._renderRootView();
            }, this._activePopupShowDelay);
        }
    };
    FrontLayerViewManager.prototype.autoDismissPopup = function (popupId, dismissDelay) {
        if (popupId === this._activePopupId && this._activePopupOptions) {
            if (this._popupShowDelayTimer) {
                clearTimeout(this._popupShowDelayTimer);
                this._popupShowDelayTimer = undefined;
            }
            this._activePopupAutoDismiss = true;
            this._activePopupAutoDismissDelay = dismissDelay || 0;
            this._renderRootView();
        }
    };
    FrontLayerViewManager.prototype.dismissPopup = function (popupId) {
        if (popupId === this._activePopupId && this._activePopupOptions) {
            if (this._activePopupOptions.onDismiss) {
                this._activePopupOptions.onDismiss();
            }
            if (this._popupShowDelayTimer) {
                clearTimeout(this._popupShowDelayTimer);
                this._popupShowDelayTimer = undefined;
            }
            this._activePopupOptions = undefined;
            this._activePopupId = undefined;
            this._renderRootView();
        }
    };
    FrontLayerViewManager.prototype.dismissAllPopups = function () {
        if (this._activePopupId) {
            this.dismissPopup(this._activePopupId);
        }
    };
    FrontLayerViewManager.prototype._renderRootView = function () {
        var _this = this;
        var topModal = this._modalStack.length > 0 ?
            this._modalStack[this._modalStack.length - 1].modal : undefined;
        var rootView = (React.createElement(RootView_1.RootView, { mainView: this._mainView, keyBoardFocusOutline: this._mainView.props.keyBoardFocusOutline, mouseFocusOutline: this._mainView.props.mouseFocusOutline, modal: topModal, activePopupOptions: this._activePopupShowDelay > 0 ? undefined : this._activePopupOptions, autoDismiss: this._activePopupAutoDismiss, autoDismissDelay: this._activePopupAutoDismissDelay, onDismissPopup: function () { return _this.dismissPopup(_this._activePopupId); } }));
        var container = document.getElementsByClassName('app-container')[0];
        ReactDOM.render(rootView, container);
    };
    FrontLayerViewManager.prototype.isPopupDisplayed = function (popupId) {
        if (popupId) {
            return popupId === this._activePopupId;
        }
        else {
            return !!this._activePopupId;
        }
    };
    return FrontLayerViewManager;
}());
exports.FrontLayerViewManager = FrontLayerViewManager;
exports.default = new FrontLayerViewManager();
