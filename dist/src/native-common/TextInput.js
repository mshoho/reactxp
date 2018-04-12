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
var AccessibilityUtil_1 = require("./AccessibilityUtil");
var EventHelpers_1 = require("./utils/EventHelpers");
var Styles_1 = require("./Styles");
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
        _this._selection = { start: 0, end: 0 };
        _this._mountedComponent = null;
        _this._textInputRef = null;
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
             * On Android, clamp the selection start and end indices to be within the bounds of the TextInput's value.
             * If we didn't do this, on Android some Java code would throw an index out of bounds exception when attempting
             * to set the selection. An important detail for this to work is that React Native Android fires `onChangeText`
             * before `onSelectionChange` which means we have the up-to-date TextInput value's length when this handler
             * runs. Whereas in React Native iOS and UWP, those events fire in the reverse order so this handler can't
             * clamp on those platforms.
             */
            var selectionStart = (RN.Platform.OS === 'android')
                ? Math.min(selection.start, _this.state.inputValue.length)
                : selection.start;
            var selectionEnd = (RN.Platform.OS === 'android')
                ? Math.min(selection.end, _this.state.inputValue.length)
                : selection.end;
            _this._selection = { start: selectionStart, end: selectionEnd };
            if (_this.props.onSelectionChange) {
                _this.props.onSelectionChange(selectionStart, selectionEnd);
            }
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
        if (nextProps.value !== undefined && nextProps.value !== this.state.inputValue) {
            this.setState({
                inputValue: nextProps.value || ''
            });
        }
    };
    TextInput.prototype._render = function (props) {
        return (React.createElement(RN.TextInput, __assign({}, props)));
    };
    TextInput.prototype.render = function () {
        var editable = (this.props.editable !== undefined ? this.props.editable : true);
        var blurOnSubmit = this.props.blurOnSubmit || !this.props.multiline;
        var internalProps = {
            ref: this._onMount,
            multiline: this.props.multiline,
            style: Styles_1.default.combine([_styles.defaultTextInput, this.props.style]),
            value: this.state.inputValue,
            autoCorrect: this.props.autoCorrect,
            spellCheck: this.props.spellCheck,
            autoCapitalize: this.props.autoCapitalize,
            autoFocus: this.props.autoFocus,
            keyboardType: this.props.keyboardType,
            editable: editable,
            selectionColor: this.props.selectionColor,
            maxLength: this.props.maxLength,
            placeholder: this.props.placeholder,
            defaultValue: this.props.value,
            placeholderTextColor: this.props.placeholderTextColor,
            onSubmitEditing: this.props.onSubmitEditing,
            onKeyPress: this._onKeyPress,
            onChangeText: this._onChangeText,
            onSelectionChange: this._onSelectionChange,
            onFocus: this._onFocus,
            onBlur: this._onBlur,
            onScroll: this._onScroll,
            selection: this._selectionToSet,
            secureTextEntry: this.props.secureTextEntry,
            keyboardAppearance: this.props.keyboardAppearance,
            returnKeyType: this.props.returnKeyType,
            disableFullscreenUI: this.props.disableFullscreenUI,
            blurOnSubmit: blurOnSubmit,
            textBreakStrategy: 'simple',
            accessibilityLabel: this.props.accessibilityLabel,
            allowFontScaling: this.props.allowFontScaling,
            maxContentSizeMultiplier: this.props.maxContentSizeMultiplier,
            underlineColorAndroid: 'transparent'
        };
        this._selectionToSet = undefined;
        return this._render(internalProps);
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
        this._selectionToSet = { start: 0, end: this.state.inputValue.length };
        this.forceUpdate();
    };
    TextInput.prototype.selectRange = function (start, end) {
        var constrainedStart = Math.min(start, this.state.inputValue.length);
        var constrainedEnd = Math.min(end, this.state.inputValue.length);
        this._selectionToSet = { start: constrainedStart, end: constrainedEnd };
        this.forceUpdate();
    };
    TextInput.prototype.getSelectionRange = function () {
        return this._selection;
    };
    TextInput.prototype.setValue = function (value) {
        this._onChangeText(value);
    };
    return TextInput;
}(React.Component));
exports.TextInput = TextInput;
exports.default = TextInput;
