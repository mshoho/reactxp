"use strict";
/**
* View.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform View abstraction.
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var PropTypes = require("prop-types");
var AccessibilityUtil_1 = require("./AccessibilityUtil");
var AnimateListEdits_1 = require("./listAnimations/AnimateListEdits");
var AppConfig_1 = require("../common/AppConfig");
var restyleForInlineText = require("./utils/restyleForInlineText");
var Styles_1 = require("./Styles");
var ViewBase_1 = require("./ViewBase");
var FocusManager_1 = require("./utils/FocusManager");
var _styles = {
    defaultStyle: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 0,
        flexShrink: 0,
        overflow: 'hidden',
        alignItems: 'stretch'
    },
    // See resize detector comments in renderResizeDetectorIfNeeded() method below.
    resizeDetectorContainerStyles: {
        position: 'absolute',
        left: '0',
        top: '0',
        right: '0',
        bottom: '0',
        overflow: 'scroll',
        zIndex: '-1',
        visibility: 'hidden'
    },
    resizeGrowDetectorStyles: {
        position: 'absolute',
        left: '100500px',
        top: '100500px',
        width: '1px',
        height: '1px'
    },
    resizeShrinkDetectorStyles: {
        position: 'absolute',
        width: '150%',
        height: '150%'
    }
};
if (typeof document !== 'undefined') {
    var ignorePointerEvents = '.reactxp-ignore-pointer-events  * { pointer-events: auto; }';
    var head = document.head;
    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(ignorePointerEvents));
    head.appendChild(style);
}
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._isFocusLimited = false;
        _this._resizeDetectorNodes = {};
        if (props.restrictFocusWithin || props.limitFocusWithin) {
            _this._focusManager = new FocusManager_1.FocusManager(context && context.focusManager);
            if (props.limitFocusWithin) {
                _this.setFocusLimited(true);
            }
        }
        return _this;
    }
    View.prototype._renderResizeDetectorIfNeeded = function (containerStyles) {
        // If needed, additional invisible DOM elements will be added inside the
        // view to track the size changes that are performed behind our back by
        // the browser's layout engine faster (ViewBase checks for the layout
        // updates once a second and sometimes it's not fast enough).
        var _this = this;
        // Unfortunately <div> doesn't have `resize` event, so we're trying to
        // detect the fact that the view has been resized with `scroll` events.
        // To do that, we create two scrollable <div>s and we put them into a
        // state in which `scroll` event is triggered by the browser when the
        // container gets resized (one element triggers `scroll` when the
        // container gets bigger, another triggers `scroll` when the container
        // gets smaller).
        if (!this.props.importantForLayout) {
            return null;
        }
        if (containerStyles.position !== 'relative') {
            if (AppConfig_1.default.isDevelopmentMode()) {
                console.error('View: importantForLayout property is applicable only for a view with relative position');
            }
            return null;
        }
        var initResizer = function (key, ref) {
            var cur = _this._resizeDetectorNodes[key];
            var element = ReactDOM.findDOMNode(ref);
            if (cur) {
                delete _this._resizeDetectorNodes[key];
            }
            if (element) {
                _this._resizeDetectorNodes[key] = element;
            }
            _this._resizeDetectorOnScroll();
        };
        return [
            (React.createElement("div", { key: 'grow', style: _styles.resizeDetectorContainerStyles, ref: function (ref) { return initResizer('grow', ref); }, onScroll: function () { return _this._resizeDetectorOnScroll(); } },
                React.createElement("div", { style: _styles.resizeGrowDetectorStyles }))),
            (React.createElement("div", { key: 'shrink', style: _styles.resizeDetectorContainerStyles, ref: function (ref) { return initResizer('shrink', ref); }, onScroll: function () { return _this._resizeDetectorOnScroll(); } },
                React.createElement("div", { style: _styles.resizeShrinkDetectorStyles })))
        ];
    };
    View.prototype._resizeDetectorReset = function () {
        // Scroll the detectors to the bottom-right corner so
        // that `scroll` events will be triggered when the container
        // is resized.
        var scrollMax = 100500;
        var node = this._resizeDetectorNodes.grow;
        if (node) {
            node.scrollLeft = scrollMax;
            node.scrollTop = scrollMax;
        }
        node = this._resizeDetectorNodes.shrink;
        if (node) {
            node.scrollLeft = scrollMax;
            node.scrollTop = scrollMax;
        }
    };
    View.prototype._resizeDetectorOnScroll = function () {
        var _this = this;
        if (this._resizeDetectorAnimationFrame) {
            // Do not execute action more often than once per animation frame.
            return;
        }
        this._resizeDetectorAnimationFrame = window.requestAnimationFrame(function () {
            _this._resizeDetectorReset();
            _this._resizeDetectorAnimationFrame = undefined;
            ViewBase_1.default._checkViews();
        });
    };
    View.prototype.getChildContext = function () {
        // Let descendant Types components know that their nearest Types ancestor is not an Types.Text.
        // Because they're in an Types.View, they should use their normal styling rather than their
        // special styling for appearing inline with text.
        var childContext = {
            isRxParentAText: false
        };
        // Provide the descendants with the focus manager (if any).
        if (this._focusManager) {
            childContext.focusManager = this._focusManager;
        }
        return childContext;
    };
    View.prototype._getContainer = function () {
        return ReactDOM.findDOMNode(this);
    };
    View.prototype.setFocusRestricted = function (restricted) {
        if (!this._focusManager || !this.props.restrictFocusWithin) {
            if (AppConfig_1.default.isDevelopmentMode()) {
                console.error('View: setFocusRestricted method requires restrictFocusWithin property to be set to true');
            }
            return;
        }
        if (restricted) {
            this._focusManager.restrictFocusWithin();
        }
        else {
            this._focusManager.removeFocusRestriction();
        }
    };
    View.prototype.setFocusLimited = function (limited) {
        if (!this._focusManager || !this.props.limitFocusWithin) {
            if (AppConfig_1.default.isDevelopmentMode()) {
                console.error('View: setFocusLimited method requires limitFocusWithin property to be set to true');
            }
            return;
        }
        if (limited && !this._isFocusLimited) {
            this._isFocusLimited = true;
            this._focusManager.limitFocusWithin();
        }
        else if (!limited && this._isFocusLimited) {
            this._isFocusLimited = false;
            this._focusManager.removeFocusLimitation();
        }
    };
    View.prototype.render = function () {
        var combinedStyles = Styles_1.default.combine([_styles.defaultStyle, this.props.style]);
        var ariaRole = AccessibilityUtil_1.default.accessibilityTraitToString(this.props.accessibilityTraits);
        var tabIndex = this.props.tabIndex;
        var ariaSelected = AccessibilityUtil_1.default.accessibilityTraitToAriaSelected(this.props.accessibilityTraits);
        var isAriaHidden = AccessibilityUtil_1.default.isHidden(this.props.importantForAccessibility);
        var accessibilityLabel = this.props.accessibilityLabel;
        var ariaLabelledBy = this.props.ariaLabelledBy;
        var ariaRoleDescription = this.props.ariaRoleDescription;
        var ariaLive = this.props.accessibilityLiveRegion ?
            AccessibilityUtil_1.default.accessibilityLiveRegionToString(this.props.accessibilityLiveRegion) :
            undefined;
        var ariaValueNow = this.props.ariaValueNow;
        if (!ariaRole && !accessibilityLabel && !ariaLabelledBy && !ariaRoleDescription && !ariaLive &&
            (ariaSelected === undefined) && (ariaValueNow === undefined) && (tabIndex === undefined)) {
            // When the accessibility properties are not specified, set role to none.
            // It tells the screen readers to skip the node, but unlike setting
            // aria-hidden to true, allows the sub DOM to be processed further.
            // This signigicantly improves the screen readers performance.
            ariaRole = 'none';
        }
        var props = {
            role: ariaRole,
            tabIndex: tabIndex,
            style: combinedStyles,
            title: this.props.title,
            'aria-label': accessibilityLabel,
            'aria-hidden': isAriaHidden,
            'aria-selected': ariaSelected,
            'aria-labelledby': ariaLabelledBy,
            'aria-roledescription': ariaRoleDescription,
            'aria-live': ariaLive,
            'aria-valuenow': ariaValueNow,
            onContextMenu: this.props.onContextMenu,
            onMouseEnter: this.props.onMouseEnter,
            onMouseLeave: this.props.onMouseLeave,
            onMouseOver: this.props.onMouseOver,
            onMouseMove: this.props.onMouseMove,
            onDragEnter: this.props.onDragEnter,
            onDragOver: this.props.onDragOver,
            onDragLeave: this.props.onDragLeave,
            onDrop: this.props.onDrop,
            onClick: this.props.onPress,
            onFocus: this.props.onFocus,
            onBlur: this.props.onBlur,
            onKeyDown: this.props.onKeyPress,
            id: this.props.id
        };
        if (this.props.ignorePointerEvents) {
            props.className = 'reactxp-ignore-pointer-events';
            combinedStyles['pointerEvents'] = 'none';
        }
        var reactElement;
        var childAnimationsEnabled = this.props.animateChildEnter || this.props.animateChildMove || this.props.animateChildLeave;
        if (childAnimationsEnabled) {
            reactElement = (React.createElement(AnimateListEdits_1.default, __assign({}, props, { animateChildEnter: this.props.animateChildEnter, animateChildMove: this.props.animateChildMove, animateChildLeave: this.props.animateChildLeave }), this.props.children));
        }
        else {
            reactElement = (React.createElement("div", __assign({}, props),
                this._renderResizeDetectorIfNeeded(combinedStyles),
                this.props.children));
        }
        return this.context.isRxParentAText ?
            restyleForInlineText(reactElement) :
            reactElement;
    };
    View.prototype.componentWillReceiveProps = function (nextProps) {
        _super.prototype.componentWillReceiveProps.call(this, nextProps);
        if (AppConfig_1.default.isDevelopmentMode()) {
            if (!!this.props.restrictFocusWithin !== !!nextProps.restrictFocusWithin) {
                console.error('View: restrictFocusWithin is readonly and changing it during the component life cycle has no effect');
            }
            if (!!this.props.limitFocusWithin !== !!nextProps.limitFocusWithin) {
                console.error('View: limitFocusWithin is readonly and changing it during the component life cycle has no effect');
            }
        }
    };
    View.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        if (this._focusManager) {
            if (this.props.restrictFocusWithin) {
                this._focusManager.restrictFocusWithin();
            }
            if (this.props.limitFocusWithin && this._isFocusLimited) {
                this._focusManager.limitFocusWithin();
            }
        }
    };
    View.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        if (this._focusManager) {
            this._focusManager.release();
        }
    };
    View.contextTypes = {
        isRxParentAText: PropTypes.bool,
        focusManager: PropTypes.object
    };
    View.childContextTypes = {
        isRxParentAText: PropTypes.bool.isRequired,
        focusManager: PropTypes.object
    };
    return View;
}(ViewBase_1.default));
exports.View = View;
FocusManager_1.applyFocusableComponentMixin(View, function (nextProps) {
    // VoiceOver with the VoiceOver key combinations (Ctrl+Option+Left/Right) focuses
    // <div>s when whatever tabIndex is set (even if tabIndex=-1). So, View is focusable
    // when tabIndex is not undefined.
    var tabIndex = nextProps && ('tabIndex' in nextProps) ? nextProps.tabIndex : this.props.tabIndex;
    return tabIndex !== undefined;
});
exports.default = View;
