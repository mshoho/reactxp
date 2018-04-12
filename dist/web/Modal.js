"use strict";
/**
* Modal.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform Modal abstraction.
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
var FrontLayerViewManager_1 = require("./FrontLayerViewManager");
var RX = require("../common/Interfaces");
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Modal.prototype.isDisplayed = function (modalId) {
        if (modalId === '') {
            throw new Error("modalId must be a non-empty string. Actual: " + modalId);
        }
        return FrontLayerViewManager_1.default.isModalDisplayed(modalId);
    };
    Modal.prototype.show = function (modal, modalId, options) {
        if (!modal) {
            throw new Error("modal must be valid. Actual " + modal);
        }
        if (!modalId || modalId === '') {
            throw new Error("modalId must be a non-empty string. Actual: " + modalId);
        }
        FrontLayerViewManager_1.default.showModal(modal, modalId, options);
    };
    Modal.prototype.dismiss = function (modalId) {
        if (!modalId || modalId === '') {
            throw new Error("modalId must be a non-empty string. Actual: " + modalId);
        }
        FrontLayerViewManager_1.default.dismissModal(modalId);
    };
    Modal.prototype.dismissAll = function () {
        FrontLayerViewManager_1.default.dismissAllModals();
    };
    return Modal;
}(RX.Modal));
exports.Modal = Modal;
exports.default = new Modal();
