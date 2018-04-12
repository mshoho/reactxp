"use strict";
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
var React = require("react");
var Accessibility = /** @class */ (function () {
    function Accessibility() {
    }
    return Accessibility;
}());
var Checkbox = /** @class */ (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Checkbox;
}(Accessibility));
var ViewBase = /** @class */ (function (_super) {
    __extends(ViewBase, _super);
    function ViewBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ViewBase;
}(React.Component));
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(props) {
        return _super.call(this, props) || this;
    }
    return View;
}(ViewBase));
var v = new View({ accessibility: new Checkbox() });
if (v.props.accessibility) {
    v.props.accessibility.world;
}
