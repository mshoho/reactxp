"use strict";
/**
* FrontLayerViewManager.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Manages stackable modals and popup views that are posted and dismissed
* by the Types showModal/dismissModal/showPopup/dismissPopup methods.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("./lodashMini");
var React = require("react");
var RN = require("react-native");
var subscribableevent_1 = require("subscribableevent");
var ModalContainer_1 = require("../native-common/ModalContainer");
var PopupContainerView_1 = require("./PopupContainerView");
var ModalStackContext = /** @class */ (function () {
    function ModalStackContext(modalId, modal, modalOptions) {
        this.modalId = modalId;
        this.modal = modal;
        this.modalOptions = modalOptions;
    }
    return ModalStackContext;
}());
var PopupStackContext = /** @class */ (function () {
    function PopupStackContext(popupId, popupOptions, anchorHandle) {
        this.popupId = popupId;
        this.popupOptions = popupOptions;
        this.anchorHandle = anchorHandle;
    }
    return PopupStackContext;
}());
var _styles = {
    fullScreenView: {
        flex: 1,
        alignSelf: 'stretch',
        overflow: 'visible',
        backgroundColor: 'transparent' // otherwise in UWP it will be removed from the tree and won't receive mouse events
    }
};
var FrontLayerViewManager = /** @class */ (function () {
    function FrontLayerViewManager() {
        var _this = this;
        this._overlayStack = [];
        this.event_changed = new subscribableevent_1.default();
        this._onBackgroundPressed = function (e) {
            e.persist();
            var activePopupContext = _this._getActiveOverlay();
            if (!(activePopupContext instanceof PopupStackContext)) {
                return;
            }
            if (activePopupContext.popupOptions) {
                if (activePopupContext.popupOptions.onAnchorPressed) {
                    RN.NativeModules.UIManager.measureInWindow(activePopupContext.anchorHandle, function (x, y, width, height) {
                        var touchEvent = e.nativeEvent;
                        var anchorRect = { left: x, top: y, right: x + width,
                            bottom: y + height, width: width, height: height };
                        // Find out if the press event was on the anchor so we can notify the caller about it.
                        if (!_.isUndefined(touchEvent.pageX) && !_.isUndefined(touchEvent.pageY) &&
                            touchEvent.pageX >= anchorRect.left && touchEvent.pageX < anchorRect.right
                            && touchEvent.pageY >= anchorRect.top && touchEvent.pageY < anchorRect.bottom) {
                            // Showing another animation while dimissing the popup creates a conflict in the
                            // UI making it not doing one of the two animations (i.e.: Opening an actionsheet
                            // while dismissing a popup). We introduce this delay to make sure the popup
                            // dimissing animation has finished before we call the event handler.
                            setTimeout(function () { activePopupContext.popupOptions.onAnchorPressed(e); }, 500);
                        }
                    });
                }
                // Avoid dismissing if the caller has explicitly asked to prevent
                // dismissal on clicks.
                if (activePopupContext.popupOptions.preventDismissOnPress) {
                    return;
                }
            }
            _this._dismissActivePopup();
        };
    }
    FrontLayerViewManager.prototype.showModal = function (modal, modalId, options) {
        var index = this._findIndexOfModal(modalId);
        if (index === -1) {
            this._overlayStack.push(new ModalStackContext(modalId, modal, options));
            this.event_changed.fire();
        }
    };
    FrontLayerViewManager.prototype.isModalDisplayed = function (modalId) {
        if (modalId) {
            return this._findIndexOfModal(modalId) !== -1;
        }
        else {
            if (this._overlayStack.length > 0) {
                var modals = _.filter(this._overlayStack, function (iter) { return (iter instanceof ModalStackContext); });
                return modals.length > 0;
            }
            return false;
        }
    };
    FrontLayerViewManager.prototype.dismissModal = function (modalId) {
        var index = this._findIndexOfModal(modalId);
        if (index >= 0) {
            this._overlayStack.splice(index, 1);
            this.event_changed.fire();
        }
    };
    FrontLayerViewManager.prototype.dismissAllmodals = function () {
        if (this._overlayStack.length > 0) {
            this._overlayStack = _.filter(this._overlayStack, function (iter) { return !(iter instanceof ModalStackContext); });
            this.event_changed.fire();
        }
    };
    FrontLayerViewManager.prototype.showPopup = function (popupOptions, popupId, delay) {
        var index = this._findIndexOfPopup(popupId);
        var nodeHandle = index !== -1 && RN.findNodeHandle(popupOptions.getAnchor());
        if (index === -1 && nodeHandle) {
            this._overlayStack.push(new PopupStackContext(popupId, popupOptions, nodeHandle));
            this.event_changed.fire();
            return true;
        }
        return false;
    };
    FrontLayerViewManager.prototype.dismissPopup = function (popupId) {
        var index = this._findIndexOfPopup(popupId);
        if (index >= 0) {
            var popupContext = this._overlayStack[index];
            if (popupContext.popupOptions.onDismiss) {
                popupContext.popupOptions.onDismiss();
            }
            this._overlayStack.splice(index, 1);
            this.event_changed.fire();
        }
    };
    FrontLayerViewManager.prototype.dismissAllPopups = function () {
        if (this._overlayStack.length > 0) {
            this._overlayStack = _.filter(this._overlayStack, function (iter) { return !(iter instanceof PopupStackContext); });
            this.event_changed.fire();
        }
    };
    FrontLayerViewManager.prototype.getModalLayerView = function (rootViewId) {
        var _this = this;
        if (rootViewId === null) {
            // The Modal layer is only supported on root views that have set an id, or
            // the default root view (which has an undefined id)
            return null;
        }
        var overlayContext = _.findLast(this._overlayStack, function (context) { return context instanceof ModalStackContext && _this.modalOptionsMatchesRootViewId(context.modalOptions, rootViewId); });
        if (overlayContext) {
            return (React.createElement(ModalContainer_1.ModalContainer, null, overlayContext.modal));
        }
        return null;
    };
    FrontLayerViewManager.prototype.getActivePopupId = function () {
        var activeOverlay = this._getActiveOverlay();
        if (activeOverlay && (activeOverlay instanceof PopupStackContext)) {
            return activeOverlay.popupId;
        }
        return null;
    };
    // Returns true if both are undefined, or if there are options and the rootViewIds are equal.
    FrontLayerViewManager.prototype.modalOptionsMatchesRootViewId = function (options, rootViewId) {
        return !!(options === rootViewId || options && options.rootViewId === rootViewId);
    };
    FrontLayerViewManager.prototype.getPopupLayerView = function (rootViewId) {
        var _this = this;
        if (rootViewId === null) {
            // The Popup layer is only supported on root views that have set an id, or
            // the default root view (which has an undefined id)
            return null;
        }
        var overlayContext = _.findLast(this._overlayStack, function (context) { return context instanceof PopupStackContext && context.popupOptions.rootViewId === rootViewId; });
        if (overlayContext) {
            return (React.createElement(ModalContainer_1.ModalContainer, null,
                React.createElement(RN.TouchableWithoutFeedback, { onPressOut: this._onBackgroundPressed, importantForAccessibility: 'no' },
                    React.createElement(RN.View, { style: _styles.fullScreenView },
                        React.createElement(PopupContainerView_1.default, { activePopupOptions: overlayContext.popupOptions, anchorHandle: overlayContext.anchorHandle, onDismissPopup: function () { return _this.dismissPopup(overlayContext.popupId); } })))));
        }
        return null;
    };
    FrontLayerViewManager.prototype._dismissActivePopup = function () {
        // Dismiss any currently visible popup:
        var activePopupContext = this._getActiveOverlay();
        if (activePopupContext instanceof PopupStackContext) {
            this.dismissPopup(activePopupContext.popupId);
        }
    };
    FrontLayerViewManager.prototype._findIndexOfModal = function (modalId) {
        return _.findIndex(this._overlayStack, function (iter) { return iter instanceof ModalStackContext && iter.modalId === modalId; });
    };
    FrontLayerViewManager.prototype._findIndexOfPopup = function (popupId) {
        return _.findIndex(this._overlayStack, function (iter) { return iter instanceof PopupStackContext && iter.popupId === popupId; });
    };
    FrontLayerViewManager.prototype._getActiveOverlay = function () {
        // Check for any Popup in queue
        return this._overlayStack.length === 0 ? null : _.last(this._overlayStack);
    };
    FrontLayerViewManager.prototype.isPopupDisplayed = function (popupId) {
        if (popupId) {
            return this._findIndexOfPopup(popupId) !== -1;
        }
        else {
            if (this._overlayStack.length > 0) {
                var popups = _.filter(this._overlayStack, function (iter) { return (iter instanceof PopupStackContext); });
                return popups.length > 0;
            }
            return false;
        }
    };
    return FrontLayerViewManager;
}());
exports.FrontLayerViewManager = FrontLayerViewManager;
exports.default = new FrontLayerViewManager();
