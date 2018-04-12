"use strict";
/**
* TextInput.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN-specific implementation of the cross-platform TextInput abstraction.
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
var RN = require("react-native");
var AccessibilityUtil_1 = require("./AccessibilityUtil");
var EventHelpers_1 = require("../native-common/utils/EventHelpers");
var Styles_1 = require("../native-common/Styles");
var _styles = {
    defaultTextInput: Styles_1.default.createTextInputStyle({
        borderWidth: 0,
        padding: 0
    })
};
var TextInput = /** @class */ (function (_super) {
    __extends(TextInput, _super);
    function TextInput(props) {
        var _this = _super.call(this, props) || this;
        _this._selectionStart = 0;
        _this._selectionEnd = 0;
        _this._mountedComponent = null;
        _this._onMount = function (component) {
            _this._mountedComponent = component;
        };
        _this._onFocus = function (e) {
            _this.setState({ isFocused: true });
            if (_this.props.onFocus) {
                _this.props.onFocus(e);
            }
        };
        _this._onBlur = function () {
            _this.setState({ isFocused: false });
            if (_this.props.onBlur) {
                _this.props.onBlur();
            }
        };
        _this._onChangeText = function (newText) {
            _this.setState({ inputValue: newText });
            if (_this.props.onChangeText) {
                _this.props.onChangeText(newText);
            }
        };
        _this._onSelectionChange = function (selEvent) {
            var selection = selEvent.nativeEvent.selection;
            /**
             * On iOS/macOS this callback is called BEFORE the _onChangeText, which means the inputValue hasn't had time to get updated yet
             * and cursor would always be one character behind. Fix this problem on Android only.
             */
            _this._selectionStart = selection.start;
            _this._selectionEnd = selection.end;
            if (_this.props.onSelectionChange) {
                _this.props.onSelectionChange(_this._selectionStart, _this._selectionEnd);
            }
            _this.forceUpdate();
        };
        _this._onKeyPress = function (e) {
            if (_this.props.onKeyPress) {
                _this.props.onKeyPress(EventHelpers_1.default.toKeyboardEvent(e));
            }
        };
        _this._onScroll = function (e) {
            if (_this.props.onScroll) {
                var contentOffset = e.nativeEvent.contentOffset;
                _this.props.onScroll(contentOffset.x, contentOffset.y);
            }
        };
        _this.state = {
            inputValue: props.value || '',
            isFocused: false
        };
        return _this;
    }
    TextInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.value !== this.state.inputValue) {
            this.setState({
                inputValue: nextProps.value || ''
            });
        }
    };
    TextInput.prototype.render = function () {
        var editable = (this.props.editable !== undefined ? this.props.editable : true);
        var blurOnSubmit = this.props.blurOnSubmit || !this.props.multiline;
        return (React.createElement(RN.TextInput, { ref: this._onMount, multiline: this.props.multiline, style: Styles_1.default.combine([_styles.defaultTextInput, this.props.style]), value: this.state.inputValue, autoCorrect: this.props.autoCorrect, spellCheck: this.props.spellCheck, autoCapitalize: this.props.autoCapitalize, autoFocus: this.props.autoFocus, keyboardType: this.props.keyboardType, editable: editable, selectionColor: this.props.selectionColor, maxLength: this.props.maxLength, placeholder: this.props.placeholder, defaultValue: this.props.value, placeholderTextColor: this.props.placeholderTextColor, onSubmitEditing: this.props.onSubmitEditing, onKeyPress: this._onKeyPress, onChangeText: this._onChangeText, onSelectionChange: this._onSelectionChange, onFocus: this._onFocus, onBlur: this._onBlur, onScroll: this._onScroll, selection: { start: this._selectionStart, end: this._selectionEnd }, secureTextEntry: this.props.secureTextEntry, keyboardAppearance: this.props.keyboardAppearance, returnKeyType: this.props.returnKeyType, disableFullscreenUI: this.props.disableFullscreenUI, blurOnSubmit: blurOnSubmit, textBreakStrategy: 'simple', accessibilityLabel: this.props.accessibilityLabel, allowFontScaling: this.props.allowFontScaling, maxContentSizeMultiplier: this.props.maxContentSizeMultiplier, underlineColorAndroid: 'transparent' }));
    };
    TextInput.prototype.blur = function () {
        if (this._mountedComponent) {
            this._mountedComponent.blur();
        }
    };
    TextInput.prototype.focus = function () {
        if (this._mountedComponent) {
            this._mountedComponent.focus();
        }
    };
    TextInput.prototype.setAccessibilityFocus = function () {
        AccessibilityUtil_1.default.setAccessibilityFocus(this);
    };
    TextInput.prototype.isFocused = function () {
        return this.state.isFocused;
    };
    TextInput.prototype.selectAll = function () {
        // to make selection visible we have to implement it in native
        // http://stackoverflow.com/questions/1689911/programatically-select-all-text-in-uitextfield
    };
    TextInput.prototype.selectRange = function (start, end) {
        var constrainedStart = Math.min(start, this.state.inputValue.length);
        var constrainedEnd = Math.min(end, this.state.inputValue.length);
        this._selectionStart = constrainedStart;
        this._selectionEnd = constrainedEnd;
        this.forceUpdate();
    };
    TextInput.prototype.getSelectionRange = function () {
        var range = {
            start: this._selectionStart,
            end: this._selectionEnd
        };
        return range;
    };
    TextInput.prototype.setValue = function (value) {
        this._onChangeText(value);
    };
    return TextInput;
}(React.Component));
exports.TextInput = TextInput;
exports.default = TextInput;
