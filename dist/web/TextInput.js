"use strict";
/**
* TextInput.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform TextInput abstraction.
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
var React = require("react");
var AutoFocusHelper_1 = require("../common/utils/AutoFocusHelper");
var Styles_1 = require("./Styles");
var FocusManager_1 = require("./utils/FocusManager");
var _isMac = (typeof navigator !== 'undefined') && (typeof navigator.platform === 'string') && (navigator.platform.indexOf('Mac') >= 0);
var _styles = {
    defaultStyle: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        overflowX: 'hidden',
        overflowY: 'auto',
        alignItems: 'stretch'
    },
    formStyle: {
        display: 'flex',
        flex: 1
    }
};
var TextInput = /** @class */ (function (_super) {
    __extends(TextInput, _super);
    function TextInput(props) {
        var _this = _super.call(this, props) || this;
        _this._mountedComponent = null;
        _this._selectionStart = 0;
        _this._selectionEnd = 0;
        _this._isFocused = false;
        _this._ariaLiveEnabled = false;
        _this._onMount = function (comp) {
            _this._mountedComponent = comp;
        };
        _this._onInput = function () {
            if (_isMac && _this._mountedComponent && _this._isFocused && !_this._ariaLiveEnabled) {
                // VoiceOver does not handle text inputs properly at the moment, aria-live is a temporary workaround.
                // And we're adding aria-live only for the focused input which is being edited, otherwise it might
                // interrupt some required announcements.
                _this._mountedComponent.setAttribute('aria-live', 'assertive');
                _this._ariaLiveEnabled = true;
            }
        };
        _this._onFocus = function (e) {
            if (_this._mountedComponent) {
                _this._isFocused = true;
                if (_this.props.onFocus) {
                    _this.props.onFocus(e);
                }
            }
        };
        _this._onBlur = function () {
            if (_this._mountedComponent) {
                _this._isFocused = false;
                if (_isMac && _this._ariaLiveEnabled) {
                    _this._mountedComponent.removeAttribute('aria-live');
                    _this._ariaLiveEnabled = false;
                }
                if (_this.props.onBlur) {
                    _this.props.onBlur();
                }
            }
        };
        _this._onPaste = function (e) {
            if (_this.props.onPaste) {
                _this.props.onPaste(e);
            }
            _this._checkSelectionChanged();
        };
        _this._onInputChanged = function (event) {
            if (!event.defaultPrevented) {
                if (_this._mountedComponent) {
                    // Has the input value changed?
                    var value = _this._mountedComponent.value || '';
                    if (_this.state.inputValue !== value) {
                        // If the parent component didn't specify a value, we'll keep
                        // track of the modified value.
                        if (_this.props.value === undefined) {
                            _this.setState({
                                inputValue: value
                            });
                        }
                        if (_this.props.onChangeText) {
                            _this.props.onChangeText(value);
                        }
                    }
                    _this._checkSelectionChanged();
                }
            }
        };
        _this._checkSelectionChanged = function () {
            if (_this._mountedComponent) {
                if (_this._selectionStart !== _this._mountedComponent.selectionStart ||
                    _this._selectionEnd !== _this._mountedComponent.selectionEnd) {
                    _this._selectionStart = _this._mountedComponent.selectionStart;
                    _this._selectionEnd = _this._mountedComponent.selectionEnd;
                    if (_this.props.onSelectionChange) {
                        _this.props.onSelectionChange(_this._selectionStart, _this._selectionEnd);
                    }
                }
            }
        };
        _this._onKeyDown = function (e) {
            // Generate a "submit editing" event if the user
            // pressed enter or return.
            if (e.keyCode === 13 && (!_this.props.multiline || _this.props.blurOnSubmit)) {
                if (_this.props.onSubmitEditing) {
                    _this.props.onSubmitEditing();
                }
                if (_this.props.blurOnSubmit) {
                    _this.blur();
                }
            }
            if (_this.props.onKeyPress) {
                _this.props.onKeyPress(e);
            }
            _this._checkSelectionChanged();
        };
        _this._onScroll = function (e) {
            if (_this.props.onScroll) {
                var _a = e.target, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop;
                _this.props.onScroll(scrollLeft, scrollTop);
            }
        };
        _this._focus = function () {
            if (_this._mountedComponent) {
                _this._mountedComponent.focus();
            }
        };
        _this.state = {
            inputValue: props.value !== undefined ? props.value : (props.defaultValue || '')
        };
        return _this;
    }
    TextInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.value !== undefined && nextProps.value !== this.state.inputValue) {
            this.setState({
                inputValue: nextProps.value
            });
        }
    };
    TextInput.prototype.componentDidMount = function () {
        this._autoFocusIfNeeded();
    };
    TextInput.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.editable !== prevProps.editable) {
            this._autoFocusIfNeeded();
        }
    };
    TextInput.prototype.render = function () {
        var _this = this;
        var combinedStyles = Styles_1.default.combine([_styles.defaultStyle, this.props.style]);
        // Always hide the outline.
        combinedStyles.outline = 'none';
        combinedStyles.resize = 'none';
        // Set the border to zero width if not otherwise specified.
        if (combinedStyles.borderWidth === undefined) {
            combinedStyles.borderWidth = 0;
        }
        // By default, the control is editable.
        var editable = (this.props.editable !== undefined ? this.props.editable : true);
        var spellCheck = (this.props.spellCheck !== undefined ? this.props.spellCheck : this.props.autoCorrect);
        // Use a textarea for multi-line and a regular input for single-line.
        if (this.props.multiline) {
            return (React.createElement("textarea", { ref: this._onMount, style: combinedStyles, value: this.state.inputValue, autoCorrect: this.props.autoCorrect === false ? 'off' : undefined, spellCheck: spellCheck, disabled: !editable, maxLength: this.props.maxLength, placeholder: this.props.placeholder, onChange: this._onInputChanged, onKeyDown: this._onKeyDown, onKeyUp: this._checkSelectionChanged, onInput: this._onInput, onFocus: this._onFocus, onBlur: this._onBlur, onMouseDown: this._checkSelectionChanged, onMouseUp: this._checkSelectionChanged, onPaste: this._onPaste, onScroll: this._onScroll, "aria-label": this.props.accessibilityLabel }));
        }
        else {
            var _a = this._getKeyboardType(), keyboardTypeValue = _a.keyboardTypeValue, wrapInForm = _a.wrapInForm, pattern = _a.pattern;
            var input = (React.createElement("input", { ref: this._onMount, style: combinedStyles, value: this.state.inputValue, autoCorrect: this.props.autoCorrect === false ? 'off' : undefined, spellCheck: spellCheck, disabled: !editable, maxLength: this.props.maxLength, placeholder: this.props.placeholder, onChange: this._onInputChanged, onKeyDown: this._onKeyDown, onKeyUp: this._checkSelectionChanged, onInput: this._onInput, onFocus: this._onFocus, onBlur: this._onBlur, onMouseDown: this._checkSelectionChanged, onMouseUp: this._checkSelectionChanged, onPaste: this._onPaste, "aria-label": this.props.accessibilityLabel, type: keyboardTypeValue, pattern: pattern }));
            if (wrapInForm) {
                // Wrap the input in a form tag if required
                input = (React.createElement("form", { action: '', onSubmit: function (ev) { /* prevent form submission/page reload */ ev.preventDefault(); _this.blur(); }, style: _styles.formStyle }, input));
            }
            return input;
        }
    };
    TextInput.prototype._autoFocusIfNeeded = function () {
        var _this = this;
        if (this.props.autoFocus && (this.props.editable !== false)) {
            AutoFocusHelper_1.autoFocusIfNeeded(this.props.autoFocus, function () { return _this.focus(); }, function () { return !!_this._mountedComponent; });
        }
    };
    TextInput.prototype._getKeyboardType = function () {
        // Determine the correct virtual keyboardType in HTML 5.
        // Some types require the <input> tag to be wrapped in a form.
        // Pattern is used on numeric keyboardType to display numbers only.
        var keyboardTypeValue = 'text';
        var wrapInForm = false;
        var pattern = undefined;
        if (this.props.keyboardType === 'numeric') {
            pattern = '\\d*';
        }
        else if (this.props.keyboardType === 'number-pad') {
            keyboardTypeValue = 'tel';
        }
        else if (this.props.keyboardType === 'email-address') {
            keyboardTypeValue = 'email';
        }
        if (this.props.returnKeyType === 'search') {
            keyboardTypeValue = 'search';
            wrapInForm = true;
        }
        if (this.props.secureTextEntry) {
            keyboardTypeValue = 'password';
        }
        return { keyboardTypeValue: keyboardTypeValue, wrapInForm: wrapInForm, pattern: pattern };
    };
    TextInput.prototype.blur = function () {
        if (this._mountedComponent) {
            this._mountedComponent.blur();
        }
    };
    TextInput.prototype.focus = function () {
        this._focus();
    };
    TextInput.prototype.setAccessibilityFocus = function () {
        this._focus();
    };
    TextInput.prototype.isFocused = function () {
        if (this._mountedComponent) {
            return document.activeElement === this._mountedComponent;
        }
        return false;
    };
    TextInput.prototype.selectAll = function () {
        if (this._mountedComponent) {
            this._mountedComponent.select();
        }
    };
    TextInput.prototype.selectRange = function (start, end) {
        if (this._mountedComponent) {
            var component = this._mountedComponent;
            component.setSelectionRange(start, end);
        }
    };
    TextInput.prototype.getSelectionRange = function () {
        var range = {
            start: 0,
            end: 0
        };
        if (this._mountedComponent) {
            range.start = this._mountedComponent.selectionStart;
            range.end = this._mountedComponent.selectionEnd;
        }
        return range;
    };
    TextInput.prototype.setValue = function (value) {
        var inputValue = value || '';
        if (this.state.inputValue !== inputValue) {
            // It's important to set the actual value in the DOM immediately. This allows us to call other related methods
            // like selectRange synchronously afterward.
            if (this._mountedComponent) {
                this._mountedComponent.value = inputValue;
            }
            this.setState({
                inputValue: inputValue
            });
            if (this.props.onChangeText) {
                this.props.onChangeText(value);
            }
        }
    };
    return TextInput;
}(React.Component));
exports.TextInput = TextInput;
FocusManager_1.applyFocusableComponentMixin(TextInput);
exports.default = TextInput;
