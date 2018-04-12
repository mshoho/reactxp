/// <reference types="react" />
/**
* ReactXP.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Wrapper for all ReactXP functionality. Users of ReactXP should import just this
* file instead of internals.
*/
import React = require('react');
import AnimatedImpl = require('./Animated');
import RXInterfaces = require('../common/Interfaces');
import RXTypes = require('../common/Types');
declare module ReactXP {
    type Accessibility = RXInterfaces.Accessibility;
    var Accessibility: RXInterfaces.Accessibility;
    type ActivityIndicator = RXInterfaces.ActivityIndicator;
    var ActivityIndicator: typeof RXInterfaces.ActivityIndicator;
    type Alert = RXInterfaces.Alert;
    var Alert: RXInterfaces.Alert;
    type App = RXInterfaces.App;
    var App: RXInterfaces.App;
    type Button = RXInterfaces.Button;
    var Button: typeof RXInterfaces.Button;
    type Picker = RXInterfaces.Picker;
    var Picker: typeof RXInterfaces.Picker;
    type Clipboard = RXInterfaces.Clipboard;
    var Clipboard: RXInterfaces.Clipboard;
    type GestureView = RXInterfaces.GestureView;
    var GestureView: typeof RXInterfaces.GestureView;
    type Image = RXInterfaces.Image;
    var Image: RXInterfaces.ImageConstructor;
    type Input = RXInterfaces.Input;
    var Input: RXInterfaces.Input;
    type International = RXInterfaces.International;
    var International: RXInterfaces.International;
    type Link = RXInterfaces.Link;
    var Link: typeof RXInterfaces.Link;
    type Linking = RXInterfaces.Linking;
    var Linking: RXInterfaces.Linking;
    type Location = RXInterfaces.Location;
    var Location: RXInterfaces.Location;
    type Modal = RXInterfaces.Modal;
    var Modal: RXInterfaces.Modal;
    type Network = RXInterfaces.Network;
    var Network: RXInterfaces.Network;
    type Platform = RXInterfaces.Platform;
    var Platform: RXInterfaces.Platform;
    type Popup = RXInterfaces.Popup;
    var Popup: RXInterfaces.Popup;
    type ScrollView = RXInterfaces.ScrollView;
    var ScrollView: RXInterfaces.ScrollViewConstructor;
    type StatusBar = RXInterfaces.StatusBar;
    var StatusBar: RXInterfaces.StatusBar;
    type Storage = RXInterfaces.Storage;
    var Storage: RXInterfaces.Storage;
    type Styles = RXInterfaces.Styles;
    var Styles: RXInterfaces.Styles;
    type Text = RXInterfaces.Text;
    var Text: typeof RXInterfaces.Text;
    type TextInput = RXInterfaces.TextInput;
    var TextInput: typeof RXInterfaces.TextInput;
    type UserInterface = RXInterfaces.UserInterface;
    var UserInterface: RXInterfaces.UserInterface;
    type UserPresence = RXInterfaces.UserPresence;
    var UserPresence: RXInterfaces.UserPresence;
    type View = RXInterfaces.View;
    var View: typeof RXInterfaces.View;
    type WebView = RXInterfaces.WebView;
    var WebView: RXInterfaces.WebViewConstructor;
    export import Animated = AnimatedImpl;
    export import CommonProps = RXTypes.CommonProps;
    export import CommonStyledProps = RXTypes.CommonStyledProps;
    export import Stateless = RXTypes.Stateless;
    export import Types = RXTypes;
    export import Component = React.Component;
    export import ComponentBase = RXTypes.ComponentBase;
    var createElement: typeof React.createElement;
    var Children: React.ReactChildren;
    var __spread: any;
}
export = ReactXP;
