/// <reference types="react" />
/**
* ModuleInterface.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Defines a common base module type information set for all platforms to implement.
*/
import React = require('react');
import Interfaces = require('./Interfaces');
import RXTypes = require('../common/Types');
export declare module ReactXP {
    type Accessibility = Interfaces.Accessibility;
    var Accessibility: Interfaces.Accessibility;
    type ActivityIndicator = Interfaces.ActivityIndicator;
    var ActivityIndicator: typeof Interfaces.ActivityIndicator;
    type Alert = Interfaces.Alert;
    var Alert: Interfaces.Alert;
    type App = Interfaces.App;
    var App: Interfaces.App;
    type Button = Interfaces.Button;
    var Button: typeof Interfaces.Button;
    type Picker = Interfaces.Picker;
    var Picker: typeof Interfaces.Picker;
    type Clipboard = Interfaces.Clipboard;
    var Clipboard: Interfaces.Clipboard;
    type GestureView = Interfaces.GestureView;
    var GestureView: typeof Interfaces.GestureView;
    type Image = Interfaces.Image;
    var Image: Interfaces.ImageConstructor;
    type Input = Interfaces.Input;
    var Input: Interfaces.Input;
    type International = Interfaces.International;
    var International: Interfaces.International;
    type Link = Interfaces.Link;
    var Link: typeof Interfaces.Link;
    type Linking = Interfaces.Linking;
    var Linking: Interfaces.Linking;
    type Location = Interfaces.Location;
    var Location: Interfaces.Location;
    type Modal = Interfaces.Modal;
    var Modal: Interfaces.Modal;
    type Network = Interfaces.Network;
    var Network: Interfaces.Network;
    type Platform = Interfaces.Platform;
    var Platform: Interfaces.Platform;
    type Popup = Interfaces.Popup;
    var Popup: Interfaces.Popup;
    type ScrollView = Interfaces.ScrollView;
    var ScrollView: Interfaces.ScrollViewConstructor;
    type StatusBar = Interfaces.StatusBar;
    var StatusBar: Interfaces.StatusBar;
    type Storage = Interfaces.Storage;
    var Storage: Interfaces.Storage;
    type Styles = Interfaces.Styles;
    var Styles: Interfaces.Styles;
    type Text = Interfaces.Text;
    var Text: typeof Interfaces.Text;
    type TextInput = Interfaces.TextInput;
    var TextInput: typeof Interfaces.TextInput;
    type UserInterface = Interfaces.UserInterface;
    var UserInterface: Interfaces.UserInterface;
    type UserPresence = Interfaces.UserPresence;
    var UserPresence: Interfaces.UserPresence;
    type View = Interfaces.View;
    var View: typeof Interfaces.View;
    type WebView = Interfaces.WebView;
    var WebView: Interfaces.WebViewConstructor;
    type Animated = Interfaces.Animated;
    var Animated: Interfaces.Animated;
    export import CommonProps = RXTypes.CommonProps;
    export import CommonStyledProps = RXTypes.CommonStyledProps;
    export import Types = RXTypes;
    export import Component = React.Component;
    var createElement: typeof React.createElement;
    var Children: typeof React.Children;
    var __spread: any;
}
