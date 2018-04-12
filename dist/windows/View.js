"use strict";
/**
* View.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Windows-specific implementation of View.
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
var RN = require("react-native");
var RNW = require("react-native-windows");
var Types = require("../common/Types");
var PropTypes = require("prop-types");
var AppConfig_1 = require("../common/AppConfig");
var View_1 = require("../native-common/View");
var EventHelpers_1 = require("../native-common/utils/EventHelpers");
var FocusManager_1 = require("../native-desktop/utils/FocusManager");
var KEY_CODE_ENTER = 13;
var KEY_CODE_SPACE = 32;
var DOWN_KEYCODES = [KEY_CODE_SPACE, KEY_CODE_ENTER];
var UP_KEYCODES = [KEY_CODE_SPACE];
var FocusableView = RNW.createFocusableComponent(RN.View);
var FocusableAnimatedView = RNW.createFocusableComponent(RN.Animated.View);
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(props, context) {
        var _this = _super.call(this, props) || this;
        _this._focusableElement = null;
        _this._limitFocusWithin = false;
        _this._isFocusLimited = false;
        _this._onFocusableRef = function (btn) {
            _this._focusableElement = btn;
        };
        _this._onFocusableKeyDown = function (e) {
            var keyEvent = EventHelpers_1.default.toKeyboardEvent(e);
            if (_this.props.onKeyPress) {
                _this.props.onKeyPress(keyEvent);
            }
            if (_this.props.onPress) {
                var key = keyEvent.keyCode;
                // ENTER triggers press on key down
                if (key === KEY_CODE_ENTER) {
                    _this.props.onPress(keyEvent);
                }
            }
        };
        _this._onFocusableKeyUp = function (e) {
            var keyEvent = EventHelpers_1.default.toKeyboardEvent(e);
            if (keyEvent.keyCode === KEY_CODE_SPACE) {
                if (_this.props.onPress) {
                    _this.props.onPress(keyEvent);
                }
            }
        };
        _this._onFocus = function (e) {
            if (e.currentTarget === e.target) {
                _this.onFocus();
            }
            if (_this.props.onFocus) {
                _this.props.onFocus(EventHelpers_1.default.toFocusEvent(e));
            }
        };
        _this._onBlur = function (e) {
            if (_this.props.onBlur) {
                _this.props.onBlur(EventHelpers_1.default.toFocusEvent(e));
            }
        };
        _this._limitFocusWithin =
            (props.limitFocusWithin === Types.LimitFocusType.Limited) ||
                (props.limitFocusWithin === Types.LimitFocusType.Accessible);
        if (props.restrictFocusWithin || _this._limitFocusWithin) {
            _this._focusManager = new FocusManager_1.FocusManager(context && context.focusManager);
            if (_this._limitFocusWithin) {
                _this.setFocusLimited(true);
            }
        }
        return _this;
    }
    View.prototype.componentWillReceiveProps = function (nextProps) {
        _super.prototype.componentWillReceiveProps.call(this, nextProps);
        if (AppConfig_1.default.isDevelopmentMode()) {
            if (this.props.restrictFocusWithin !== nextProps.restrictFocusWithin) {
                console.error('View: restrictFocusWithin is readonly and changing it during the component life cycle has no effect');
            }
            if (this.props.limitFocusWithin !== nextProps.limitFocusWithin) {
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
            if (this._limitFocusWithin && this._isFocusLimited) {
                this._focusManager.limitFocusWithin(this.props.limitFocusWithin);
            }
        }
    };
    View.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        if (this._focusManager) {
            this._focusManager.release();
        }
    };
    View.prototype._buildInternalProps = function (props) {
        var _this = this;
        // Base class does the bulk of _internalprops creation
        _super.prototype._buildInternalProps.call(this, props);
        if (props.onKeyPress) {
            // Define the handler for "onKeyDown" on first use, it's the safest way when functions
            // called from super constructors are involved.
            if (!this._onKeyDown) {
                this._onKeyDown = function (e) {
                    if (_this.props.onKeyPress) {
                        // A conversion to a KeyboardEvent looking event is needed
                        _this.props.onKeyPress(EventHelpers_1.default.toKeyboardEvent(e));
                    }
                };
            }
            // "onKeyDown" is fired by native buttons and bubbles up to views
            this._internalProps.onKeyDown = this._onKeyDown;
        }
        var _loop_1 = function (name_1) {
            var handler = this_1._internalProps[name_1];
            if (handler) {
                this_1._internalProps.allowDrop = true;
                this_1._internalProps[name_1] = function (e) {
                    handler({
                        dataTransfer: e.nativeEvent.dataTransfer,
                        stopPropagation: function () {
                            if (e.stopPropagation) {
                                e.stopPropagation();
                            }
                        },
                        preventDefault: function () {
                            if (e.preventDefault) {
                                e.preventDefault();
                            }
                        },
                    });
                };
            }
        };
        var this_1 = this;
        // Drag and drop related properties
        for (var _i = 0, _a = ['onDragEnter', 'onDragOver', 'onDrop', 'onDragLeave']; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            _loop_1(name_1);
        }
        // Mouse events (using same lazy initialization as for onKeyDown)
        if (props.onMouseEnter) {
            if (!this._onMouseEnter) {
                this._onMouseEnter = function (e) {
                    if (_this.props.onMouseEnter) {
                        _this.props.onMouseEnter(EventHelpers_1.default.toMouseEvent(e));
                    }
                };
            }
            this._internalProps.onMouseEnter = this._onMouseEnter;
        }
        if (props.onMouseLeave) {
            if (!this._onMouseLeave) {
                this._onMouseLeave = function (e) {
                    if (_this.props.onMouseLeave) {
                        _this.props.onMouseLeave(EventHelpers_1.default.toMouseEvent(e));
                    }
                };
            }
            this._internalProps.onMouseLeave = this._onMouseLeave;
        }
        if (props.onMouseOver) {
            if (!this._onMouseOver) {
                this._onMouseOver = function (e) {
                    if (_this.props.onMouseOver) {
                        _this.props.onMouseOver(EventHelpers_1.default.toMouseEvent(e));
                    }
                };
            }
            this._internalProps.onMouseOver = this._onMouseOver;
        }
        if (props.onMouseMove) {
            if (!this._onMouseMove) {
                this._onMouseMove = function (e) {
                    if (_this.props.onMouseMove) {
                        _this.props.onMouseMove(EventHelpers_1.default.toMouseEvent(e));
                    }
                };
            }
            this._internalProps.onMouseMove = this._onMouseMove;
        }
    };
    View.prototype.render = function () {
        if (this.props.tabIndex !== undefined) {
            var tabIndex = this.getTabIndex() || 0;
            var windowsTabFocusable = tabIndex >= 0;
            // We don't use 'string' ref type inside ReactXP
            var originalRef = this._internalProps.ref;
            if (typeof originalRef === 'string') {
                throw new Error('View: ReactXP must not use string refs internally');
            }
            var componentRef = originalRef;
            var focusableViewProps = __assign({}, this._internalProps, { ref: this._onFocusableRef, componentRef: componentRef, isTabStop: windowsTabFocusable, tabIndex: tabIndex, disableSystemFocusVisuals: false, handledKeyDownKeys: DOWN_KEYCODES, handledKeyUpKeys: UP_KEYCODES, onKeyDown: this._onFocusableKeyDown, onKeyUp: this._onFocusableKeyUp, onFocus: this._onFocus, onBlur: this._onBlur, onAccessibilityTap: this._internalProps.onPress });
            var PotentiallyAnimatedFocusableView = this._isButton(this.props) ? FocusableAnimatedView : FocusableView;
            return (React.createElement(PotentiallyAnimatedFocusableView, __assign({}, focusableViewProps)));
        }
        else {
            return _super.prototype.render.call(this);
        }
    };
    View.prototype.focus = function () {
        _super.prototype.focus.call(this);
        // Only forward to Button.
        // The other cases are RN.View based elements with no meaningful focus support
        if (this._focusableElement) {
            this._focusableElement.focus();
        }
    };
    View.prototype.blur = function () {
        _super.prototype.blur.call(this);
        // Only forward to Button.
        // The other cases are RN.View based elements with no meaningful focus support
        if (this._focusableElement) {
            this._focusableElement.blur();
        }
    };
    View.prototype.getChildContext = function () {
        // Let descendant RX components know that their nearest RX ancestor is not an RX.Text.
        // Because they're in an RX.View, they should use their normal styling rather than their
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
    View.prototype.setFocusRestricted = function (restricted) {
        if (!this._focusManager || !this.props.restrictFocusWithin) {
            console.error('View: setFocusRestricted method requires restrictFocusWithin property to be set to true');
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
        if (!this._focusManager || !this._limitFocusWithin) {
            console.error('View: setFocusLimited method requires limitFocusWithin property to be set');
            return;
        }
        if (limited && !this._isFocusLimited) {
            this._isFocusLimited = true;
            this._focusManager.limitFocusWithin(this.props.limitFocusWithin);
        }
        else if (!limited && this._isFocusLimited) {
            this._isFocusLimited = false;
            this._focusManager.removeFocusLimitation();
        }
    };
    View.prototype.setNativeProps = function (nativeProps) {
        // Redirect to focusable component if present.
        if (this._focusableElement) {
            this._focusableElement.setNativeProps(nativeProps);
        }
        else {
            _super.prototype.setNativeProps.call(this, nativeProps);
        }
    };
    View.prototype._isButton = function (viewProps) {
        return _super.prototype._isButton.call(this, viewProps) || !!viewProps.onContextMenu;
    };
    // From FocusManagerFocusableComponent interface
    //
    View.prototype.onFocus = function () {
        // Focus Manager hook
    };
    View.prototype.getTabIndex = function () {
        // Focus Manager may override this
        return this.props.tabIndex;
    };
    View.prototype.updateNativeTabIndex = function () {
        if (this._focusableElement) {
            var tabIndex = this.getTabIndex() || 0;
            var windowsTabFocusable = tabIndex >= 0;
            this._focusableElement.setNativeProps({
                tabIndex: tabIndex,
                isTabStop: windowsTabFocusable
            });
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
}(View_1.View));
exports.View = View;
// A value for tabIndex marks a View as being potentially keyboard focusable
FocusManager_1.applyFocusableComponentMixin(View, function (nextProps) {
    var tabIndex = nextProps && ('tabIndex' in nextProps) ? nextProps.tabIndex : this.props.tabIndex;
    return tabIndex !== undefined && tabIndex >= 0;
});
exports.default = View;
