"use strict";
/**
* Clipboard.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform Clipboard abstraction.
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
var RX = require("../common/Interfaces");
var SyncTasks = require("synctasks");
var Clipboard = /** @class */ (function (_super) {
    __extends(Clipboard, _super);
    function Clipboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Clipboard.prototype.setText = function (text) {
        var node = Clipboard._createInvisibleNode();
        node.textContent = text;
        document.body.appendChild(node);
        Clipboard._copyNode(node);
        document.body.removeChild(node);
    };
    Clipboard.prototype.getText = function () {
        // Not supported in web platforms. This should can be only handled in the paste event handlers
        return SyncTasks.Rejected('Not supported on web');
    };
    Clipboard._createInvisibleNode = function () {
        var node = document.createElement('span');
        node.style.position = 'absolute';
        node.style.left = '-10000px';
        var style = node.style;
        // Explicitly mark the node as selectable.
        if (style['userSelect'] !== undefined) {
            style['userSelect'] = 'text';
        }
        if (style['msUserSelect'] !== undefined) {
            style['msUserSelect'] = 'text';
        }
        if (style['webkitUserSelect'] !== undefined) {
            style['webkitUserSelect'] = 'text';
        }
        if (style['MozUserSelect'] !== undefined) {
            style['MozUserSelect'] = 'text';
        }
        return node;
    };
    Clipboard._copyNode = function (node) {
        var selection = getSelection();
        selection.removeAllRanges();
        var range = document.createRange();
        range.selectNodeContents(node);
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
    };
    return Clipboard;
}(RX.Clipboard));
exports.Clipboard = Clipboard;
exports.default = new Clipboard();
