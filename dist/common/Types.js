"use strict";
/**
* Types.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Type definitions for ReactXP framework.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var subscribableevent_1 = require("subscribableevent");
exports.SubscribableEvent = subscribableevent_1.default;
exports.SubscriptionToken = subscribableevent_1.SubscriptionToken;
var AnimatedValue = /** @class */ (function () {
    function AnimatedValue(val) {
        // No-op
    }
    return AnimatedValue;
}());
exports.AnimatedValue = AnimatedValue;
var InterpolatedValue = /** @class */ (function () {
    function InterpolatedValue() {
    }
    return InterpolatedValue;
}());
exports.InterpolatedValue = InterpolatedValue;
// Auto, Yes, No - iOS & Android.
// NoHideDescendants - iOS, Android, & Desktop.
var ImportantForAccessibility;
(function (ImportantForAccessibility) {
    ImportantForAccessibility[ImportantForAccessibility["Auto"] = 1] = "Auto";
    ImportantForAccessibility[ImportantForAccessibility["Yes"] = 2] = "Yes";
    ImportantForAccessibility[ImportantForAccessibility["No"] = 3] = "No";
    ImportantForAccessibility[ImportantForAccessibility["NoHideDescendants"] = 4] = "NoHideDescendants";
})(ImportantForAccessibility = exports.ImportantForAccessibility || (exports.ImportantForAccessibility = {}));
// Android & Desktop supported prop, which allows screen-reader to inform its users when a
// component has dynamically changed. For example, the content of an inApp toast.
var AccessibilityLiveRegion;
(function (AccessibilityLiveRegion) {
    AccessibilityLiveRegion[AccessibilityLiveRegion["None"] = 0] = "None";
    AccessibilityLiveRegion[AccessibilityLiveRegion["Polite"] = 1] = "Polite";
    AccessibilityLiveRegion[AccessibilityLiveRegion["Assertive"] = 2] = "Assertive";
})(AccessibilityLiveRegion = exports.AccessibilityLiveRegion || (exports.AccessibilityLiveRegion = {}));
// NOTE: This enum is organized based on priority of these traits (0 is the lowest),
// which can be assigned to an accessible object. On native, all traits are combined as
// a list. On desktop, trait with the maximum value is picked. Whenever you are adding
// a new trait add it in the right priority order in the list.
var AccessibilityTrait;
(function (AccessibilityTrait) {
    // Desktop and iOS.
    AccessibilityTrait[AccessibilityTrait["Summary"] = 0] = "Summary";
    AccessibilityTrait[AccessibilityTrait["Adjustable"] = 1] = "Adjustable";
    // Desktop, iOS, and Android.
    AccessibilityTrait[AccessibilityTrait["Button"] = 2] = "Button";
    AccessibilityTrait[AccessibilityTrait["Tab"] = 3] = "Tab";
    AccessibilityTrait[AccessibilityTrait["Selected"] = 4] = "Selected";
    // Android only.
    AccessibilityTrait[AccessibilityTrait["Radio_button_checked"] = 5] = "Radio_button_checked";
    AccessibilityTrait[AccessibilityTrait["Radio_button_unchecked"] = 6] = "Radio_button_unchecked";
    // iOS only.
    AccessibilityTrait[AccessibilityTrait["Link"] = 7] = "Link";
    AccessibilityTrait[AccessibilityTrait["Header"] = 8] = "Header";
    AccessibilityTrait[AccessibilityTrait["Search"] = 9] = "Search";
    AccessibilityTrait[AccessibilityTrait["Image"] = 10] = "Image";
    AccessibilityTrait[AccessibilityTrait["Plays"] = 11] = "Plays";
    AccessibilityTrait[AccessibilityTrait["Key"] = 12] = "Key";
    AccessibilityTrait[AccessibilityTrait["Text"] = 13] = "Text";
    AccessibilityTrait[AccessibilityTrait["Disabled"] = 14] = "Disabled";
    AccessibilityTrait[AccessibilityTrait["FrequentUpdates"] = 15] = "FrequentUpdates";
    AccessibilityTrait[AccessibilityTrait["StartsMedia"] = 16] = "StartsMedia";
    AccessibilityTrait[AccessibilityTrait["AllowsDirectInteraction"] = 17] = "AllowsDirectInteraction";
    AccessibilityTrait[AccessibilityTrait["PageTurn"] = 18] = "PageTurn";
    // Desktop only.
    AccessibilityTrait[AccessibilityTrait["Menu"] = 19] = "Menu";
    AccessibilityTrait[AccessibilityTrait["MenuItem"] = 20] = "MenuItem";
    AccessibilityTrait[AccessibilityTrait["MenuBar"] = 21] = "MenuBar";
    AccessibilityTrait[AccessibilityTrait["TabList"] = 22] = "TabList";
    AccessibilityTrait[AccessibilityTrait["List"] = 23] = "List";
    AccessibilityTrait[AccessibilityTrait["ListItem"] = 24] = "ListItem";
    AccessibilityTrait[AccessibilityTrait["ListBox"] = 25] = "ListBox";
    AccessibilityTrait[AccessibilityTrait["Group"] = 26] = "Group";
    AccessibilityTrait[AccessibilityTrait["CheckBox"] = 27] = "CheckBox";
    AccessibilityTrait[AccessibilityTrait["Checked"] = 28] = "Checked";
    AccessibilityTrait[AccessibilityTrait["ComboBox"] = 29] = "ComboBox";
    AccessibilityTrait[AccessibilityTrait["Log"] = 30] = "Log";
    AccessibilityTrait[AccessibilityTrait["Status"] = 31] = "Status";
    AccessibilityTrait[AccessibilityTrait["Dialog"] = 32] = "Dialog";
    AccessibilityTrait[AccessibilityTrait["HasPopup"] = 33] = "HasPopup";
    AccessibilityTrait[AccessibilityTrait["Option"] = 34] = "Option";
    AccessibilityTrait[AccessibilityTrait["Switch"] = 35] = "Switch";
    // Desktop & mobile. This is at the end because this
    // is the highest priority trait.
    AccessibilityTrait[AccessibilityTrait["None"] = 36] = "None";
})(AccessibilityTrait = exports.AccessibilityTrait || (exports.AccessibilityTrait = {}));
// The autofocusing logic should behave differently on different platforms,
// to avoid having complex logic on the application level, we're letting to
// specify the autofocusing conditions in autoFocus property of the component.
var AutoFocus;
(function (AutoFocus) {
    AutoFocus[AutoFocus["No"] = 0] = "No";
    AutoFocus[AutoFocus["Yes"] = 1] = "Yes";
    // priority, no delay.
    // We can target the keyboard navigation mode (if none of
    // WhenNavigatingWithKeyboard and WhenNavigatingWithoutKeyboard are specified,
    // both are assumed to be enabled).
    AutoFocus[AutoFocus["WhenNavigatingWithKeyboard"] = 2] = "WhenNavigatingWithKeyboard";
    AutoFocus[AutoFocus["WhenNavigatingWithoutKeyboard"] = 3] = "WhenNavigatingWithoutKeyboard";
    // We can target the platform (if none of the platforms are specified, all
    // platforms are assumed to be enabled).
    AutoFocus[AutoFocus["Android"] = 4] = "Android";
    AutoFocus[AutoFocus["IOS"] = 5] = "IOS";
    AutoFocus[AutoFocus["Web"] = 6] = "Web";
    AutoFocus[AutoFocus["Windows"] = 7] = "Windows";
    AutoFocus[AutoFocus["Mac"] = 8] = "Mac";
    // Sometimes a common high level component has default autofocusable (for
    // example, close button in a dialog), but the subcomponents want to be
    // autofocused too (for example, some input inside a particular kind of dialog).
    // We can specify the priority (Low for the close button, High for the
    // input) without forking the logic on the application level (the input will
    // win if present, otherwise the close button will be focused).
    // Default priority is PriorityLow.
    AutoFocus[AutoFocus["PriorityLow"] = 9] = "PriorityLow";
    AutoFocus[AutoFocus["PriorityHigh"] = 10] = "PriorityHigh";
    AutoFocus[AutoFocus["PriorityHighest"] = 11] = "PriorityHighest";
    // it unless you are really sure what you're up to.
    // Sometimes it might be needed to delay the autofocusing a little (if no
    // delay is specified, the component will be focused without the delay).
    AutoFocus[AutoFocus["Delay100"] = 12] = "Delay100";
    AutoFocus[AutoFocus["Delay500"] = 13] = "Delay500";
    AutoFocus[AutoFocus["Delay1000"] = 14] = "Delay1000"; // 1000 ms
})(AutoFocus = exports.AutoFocus || (exports.AutoFocus = {}));
var LimitFocusType;
(function (LimitFocusType) {
    LimitFocusType[LimitFocusType["Unlimited"] = 0] = "Unlimited";
    // When limitFocusWithin=Limited, the View and the focusable components inside
    // the View get both tabIndex=-1 and aria-hidden=true.
    LimitFocusType[LimitFocusType["Limited"] = 1] = "Limited";
    // When limitFocusWithin=Accessible, the View and the focusable components inside
    // the View get only tabIndex=-1.
    LimitFocusType[LimitFocusType["Accessible"] = 2] = "Accessible";
})(LimitFocusType = exports.LimitFocusType || (exports.LimitFocusType = {}));
var GestureMouseCursor;
(function (GestureMouseCursor) {
    GestureMouseCursor[GestureMouseCursor["Default"] = 0] = "Default";
    GestureMouseCursor[GestureMouseCursor["Pointer"] = 1] = "Pointer";
    GestureMouseCursor[GestureMouseCursor["Grab"] = 2] = "Grab";
    GestureMouseCursor[GestureMouseCursor["Move"] = 3] = "Move";
})(GestureMouseCursor = exports.GestureMouseCursor || (exports.GestureMouseCursor = {}));
var PreferredPanGesture;
(function (PreferredPanGesture) {
    PreferredPanGesture[PreferredPanGesture["Horizontal"] = 0] = "Horizontal";
    PreferredPanGesture[PreferredPanGesture["Vertical"] = 1] = "Vertical";
})(PreferredPanGesture = exports.PreferredPanGesture || (exports.PreferredPanGesture = {}));
var WebViewSandboxMode;
(function (WebViewSandboxMode) {
    WebViewSandboxMode[WebViewSandboxMode["None"] = 0] = "None";
    WebViewSandboxMode[WebViewSandboxMode["AllowForms"] = 1] = "AllowForms";
    WebViewSandboxMode[WebViewSandboxMode["AllowModals"] = 2] = "AllowModals";
    WebViewSandboxMode[WebViewSandboxMode["AllowOrientationLock"] = 4] = "AllowOrientationLock";
    WebViewSandboxMode[WebViewSandboxMode["AllowPointerLock"] = 8] = "AllowPointerLock";
    WebViewSandboxMode[WebViewSandboxMode["AllowPopups"] = 16] = "AllowPopups";
    WebViewSandboxMode[WebViewSandboxMode["AllowPopupsToEscapeSandbox"] = 32] = "AllowPopupsToEscapeSandbox";
    WebViewSandboxMode[WebViewSandboxMode["AllowPresentation"] = 64] = "AllowPresentation";
    WebViewSandboxMode[WebViewSandboxMode["AllowSameOrigin"] = 128] = "AllowSameOrigin";
    WebViewSandboxMode[WebViewSandboxMode["AllowScripts"] = 256] = "AllowScripts";
    WebViewSandboxMode[WebViewSandboxMode["AllowTopNavigation"] = 512] = "AllowTopNavigation";
})(WebViewSandboxMode = exports.WebViewSandboxMode || (exports.WebViewSandboxMode = {}));
//
// Location
// ----------------------------------------------------------------------
var LocationErrorType;
(function (LocationErrorType) {
    LocationErrorType[LocationErrorType["PermissionDenied"] = 1] = "PermissionDenied";
    LocationErrorType[LocationErrorType["PositionUnavailable"] = 2] = "PositionUnavailable";
    LocationErrorType[LocationErrorType["Timeout"] = 3] = "Timeout";
})(LocationErrorType = exports.LocationErrorType || (exports.LocationErrorType = {}));
//
// Animated
// ----------------------------------------------------------------------
var Animated;
(function (Animated) {
})(Animated = exports.Animated || (exports.Animated = {}));
var LinkingErrorCode;
(function (LinkingErrorCode) {
    LinkingErrorCode[LinkingErrorCode["NoAppFound"] = 0] = "NoAppFound";
    LinkingErrorCode[LinkingErrorCode["UnexpectedFailure"] = 1] = "UnexpectedFailure";
    LinkingErrorCode[LinkingErrorCode["Blocked"] = 2] = "Blocked";
    LinkingErrorCode[LinkingErrorCode["InitialUrlNotFound"] = 3] = "InitialUrlNotFound";
})(LinkingErrorCode = exports.LinkingErrorCode || (exports.LinkingErrorCode = {}));
//
// App
// ----------------------------------------------------------------------
var AppActivationState;
(function (AppActivationState) {
    AppActivationState[AppActivationState["Active"] = 1] = "Active";
    AppActivationState[AppActivationState["Background"] = 2] = "Background";
    AppActivationState[AppActivationState["Inactive"] = 3] = "Inactive";
    AppActivationState[AppActivationState["Extension"] = 4] = "Extension";
})(AppActivationState = exports.AppActivationState || (exports.AppActivationState = {}));
//
// Network
// ----------------------------------------------------------------------
var DeviceNetworkType;
(function (DeviceNetworkType) {
    DeviceNetworkType[DeviceNetworkType["Unknown"] = 0] = "Unknown";
    DeviceNetworkType[DeviceNetworkType["None"] = 1] = "None";
    DeviceNetworkType[DeviceNetworkType["Wifi"] = 2] = "Wifi";
    DeviceNetworkType[DeviceNetworkType["Mobile2G"] = 3] = "Mobile2G";
    DeviceNetworkType[DeviceNetworkType["Mobile3G"] = 4] = "Mobile3G";
    DeviceNetworkType[DeviceNetworkType["Mobile4G"] = 5] = "Mobile4G";
})(DeviceNetworkType = exports.DeviceNetworkType || (exports.DeviceNetworkType = {}));
