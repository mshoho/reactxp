"use strict";
/**
* AccessibilityFeatureBase.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Low level cross-platform accessibility API.
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
var AccessibilityFeatureDef = /** @class */ (function () {
    function AccessibilityFeatureDef(props) {
        this.props = props;
        if (!true) {
            this._suppressUnusedError();
        }
    }
    AccessibilityFeatureDef.prototype._suppressUnusedError = function (k) {
        // We want to define the accessibility features like:
        //     class CheckboxDef extends AccessibilityFeatureDef<CheckboxProps, CheckboxFeatureProps> { ... }.
        // Where CheckboxFeatureProps is a type for the class static properties. But Typescript does not
        // allow static methodos with the references to a class generics like:
        //     static setFeatureProps(props: K).
        // So, this is a noop to suppress the compiler error.
        //
        // TODO: Think about a better way to do it.
    };
    AccessibilityFeatureDef.setFeatureProps = function (props) {
        // Nothing to setup by default.
    };
    return AccessibilityFeatureDef;
}());
exports.AccessibilityFeatureDef = AccessibilityFeatureDef;
var AccessibilityFeature = /** @class */ (function () {
    function AccessibilityFeature(platform, props) {
        this.platform = platform;
        this.props = props;
    }
    return AccessibilityFeature;
}());
exports.AccessibilityFeature = AccessibilityFeature;
function createAccessibilityFeature(platform, FeatureDef) {
    var Feature = /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(props) {
            var _this = _super.call(this, platform, props) || this;
            var def = new FeatureDef(props);
            switch (platform) {
                case 'web':
                    _this.getProps = def.getWebProps.bind(def);
                    break;
                case 'ios':
                    _this.getProps = def.getIOSProps.bind(def);
                    break;
                case 'android':
                    _this.getProps = def.getAndroidProps.bind(def);
                    break;
                case 'windows':
                    _this.getProps = def.getWindowsProps.bind(def);
                    break;
                case 'macos':
                    _this.getProps = def.getMacOSProps.bind(def);
                    break;
                default:
                    console.error('AccessibilityFeature: Unknown platform', platform);
                    _this.getProps = function () { return {}; };
            }
            return _this;
        }
        return class_1;
    }(AccessibilityFeature));
    var featureConstructor = function (props) {
        return new Feature(props);
    };
    featureConstructor.setFeatureProps = function (props) {
        FeatureDef.setFeatureProps(props);
    };
    return featureConstructor;
}
exports.createAccessibilityFeature = createAccessibilityFeature;
var AndroidComponentType;
(function (AndroidComponentType) {
    AndroidComponentType["none"] = "none";
    AndroidComponentType["button"] = "button";
    AndroidComponentType["radiobutton_checked"] = "radiobutton_checked";
    AndroidComponentType["radiobutton_unchecked"] = "radiobutton_unchecked";
})(AndroidComponentType = exports.AndroidComponentType || (exports.AndroidComponentType = {}));
var IOSAccessibilityTraits;
(function (IOSAccessibilityTraits) {
    // Used when the element has no traits.
    IOSAccessibilityTraits["none"] = "none";
    // Used when the element should be treated as a button.
    IOSAccessibilityTraits["button"] = "button";
    // Used when the element should be treated as a link.
    IOSAccessibilityTraits["link"] = "link";
    // Used when an element acts as a header for a content section (e.g. the title of a navigation bar).
    IOSAccessibilityTraits["header"] = "header";
    // Used when the text field element should also be treated as a search field.
    IOSAccessibilityTraits["search"] = "search";
    // Used when the element should be treated as an image. Can be combined with button or link, for example.
    IOSAccessibilityTraits["image"] = "image";
    // Used when the element is selected. For example, a selected row in a table or a selected button within a segmented control.
    IOSAccessibilityTraits["selected"] = "selected";
    // Used when the element plays its own sound when activated.
    IOSAccessibilityTraits["plays"] = "plays";
    // Used when the element acts as a keyboard key.
    IOSAccessibilityTraits["key"] = "key";
    // Used when the element should be treated as static text that cannot change.
    IOSAccessibilityTraits["text"] = "text";
    // Used when an element can be used to provide a quick summary of current conditions in the app when the
    // app first launches. For example, when Weather first launches, the element with today's weather conditions is marked with this trait.
    IOSAccessibilityTraits["summary"] = "summary";
    // Used when the control is not enabled and does not respond to user input.
    IOSAccessibilityTraits["disabled"] = "disabled";
    // Used when the element frequently updates its label or value, but too often to send notifications.
    // Allows an accessibility client to poll for changes. A stopwatch would be an example.
    IOSAccessibilityTraits["frequentUpdates"] = "frequentUpdates";
    // Used when activating an element starts a media session (e.g. playing a movie, recording audio) that
    // should not be interrupted by output from an assistive technology, like VoiceOver.
    IOSAccessibilityTraits["startsMedia"] = "startsMedia";
    // Used when an element can be "adjusted" (e.g. a slider).
    IOSAccessibilityTraits["adjustable"] = "adjustable";
    // Used when an element allows direct touch interaction for VoiceOver users (for example, a view representing a piano keyboard).
    IOSAccessibilityTraits["allowsDirectInteraction"] = "allowsDirectInteraction";
    // Informs VoiceOver that it should scroll to the next page when it finishes reading the contents of the element.
    IOSAccessibilityTraits["pageTurn"] = "pageTurn";
})(IOSAccessibilityTraits = exports.IOSAccessibilityTraits || (exports.IOSAccessibilityTraits = {}));
var WebRole;
(function (WebRole) {
    // https://www.w3.org/TR/wai-aria-1.1/#role_definitions
    // A type of live region with important, and usually time-sensitive, information. See related alertdialog and status.
    WebRole["alert"] = "alert";
    // A type of dialog that contains an alert message, where initial focus goes to an element within the dialog.
    // See related alert and dialog.
    WebRole["alertdialog"] = "alertdialog";
    // A structure containing one or more focusable elements requiring user input, such as keyboard or gesture events,
    // that do not follow a standard interaction pattern supported by a widget role.
    WebRole["application"] = "application";
    // A section of a page that consists of a composition that forms an independent part of a document, page, or site.
    WebRole["article"] = "article";
    // A region that contains mostly site-oriented content, rather than page-specific content.
    WebRole["banner"] = "banner";
    // An input that allows for user-triggered actions when clicked or pressed. See related link.
    WebRole["button"] = "button";
    // A cell in a tabular container. See related gridcell.
    WebRole["cell"] = "cell";
    // A checkable input that has three possible values: true, false, or mixed.
    WebRole["checkbox"] = "checkbox";
    // A cell containing header information for a column.
    WebRole["columnheader"] = "columnheader";
    // A composite widget containing a single-line textbox and another element, such as a listbox or grid,
    // that can dynamically pop up to help the user set the value of the textbox.
    WebRole["combobox"] = "combobox";
    // A supporting section of the document, designed to be complementary to the main content at a
    // similar level in the DOM hierarchy, but remains meaningful when separated from the main content.
    WebRole["complementary"] = "complementary";
    // A large perceivable region that contains information about the parent document.
    WebRole["contentinfo"] = "contentinfo";
    // A definition of a term or concept. See related term.
    WebRole["definition"] = "definition";
    // A dialog is a descendant window of the primary window of a web application. For HTML pages,
    // the primary application window is the entire web document, i.e., the body element.
    WebRole["dialog"] = "dialog";
    // A list of references to members of a group, such as a static table of contents.
    WebRole["directory"] = "directory";
    // An element containing content that assistive technology users may want to browse in a reading mode.
    WebRole["document"] = "document";
    // A scrollable list of articles where scrolling may cause articles to be added to or removed from either end of the list.
    WebRole["feed"] = "feed";
    // A perceivable section of content that typically contains a graphical document,
    // images, code snippets, or example text. The parts of a figure MAY be user-navigable.
    WebRole["figure"] = "figure";
    // A landmark region that contains a collection of items and objects that, as a whole,
    // combine to create a form. See related search.
    WebRole["form"] = "form";
    // A composite widget containing a collection of one or more rows with one or
    // more cells where some or all cells in the grid are focusable by using methods
    // of two-dimensional navigation, such as directional arrow keys.
    WebRole["grid"] = "grid";
    // A cell in a grid or treegrid.
    WebRole["gridcell"] = "gridcell";
    // A set of user interface objects which are not intended to be included in a
    // page summary or table of contents by assistive technologies.
    WebRole["group"] = "group";
    // A heading for a section of the page.
    WebRole["heading"] = "heading";
    // A container for a collection of elements that form an image.
    WebRole["img"] = "img";
    // An interactive reference to an internal or external resource that, when activated,
    // causes the user agent to navigate to that resource. See related button.
    WebRole["link"] = "link";
    // A section containing listitem elements. See related listbox.
    WebRole["list"] = "list";
    // A widget that allows the user to select one or more items from a list of choices. See related combobox and list.
    WebRole["listbox"] = "listbox";
    // A single item in a list or directory.
    WebRole["listitem"] = "listitem";
    // A type of live region where new information is added in meaningful order and old information may disappear. See related marquee.
    WebRole["log"] = "log";
    // The main content of a document.
    WebRole["main"] = "main";
    // A type of live region where non-essential information changes frequently. See related log.
    WebRole["marquee"] = "marquee";
    // Content that represents a mathematical expression.
    WebRole["math"] = "math";
    // A type of widget that offers a list of choices to the user.
    WebRole["menu"] = "menu";
    // A presentation of menu that usually remains visible and is usually presented horizontally.
    WebRole["menubar"] = "menubar";
    // An option in a set of choices contained by a menu or menubar.
    WebRole["menuitem"] = "menuitem";
    // A menuitem with a checkable state whose possible values are true, false, or mixed.
    WebRole["menuitemcheckbox"] = "menuitemcheckbox";
    // A checkable menuitem in a set of elements with the same role, only one of which can be checked at a time.
    WebRole["menuitemradio"] = "menuitemradio";
    // A collection of navigational elements (usually links) for navigating the document or related documents.
    WebRole["navigation"] = "navigation";
    // An element whose implicit native role semantics will not be mapped to the accessibility API. See synonym presentation.
    WebRole["none"] = "none";
    // A section whose content is parenthetic or ancillary to the main content of the resource.
    WebRole["note"] = "note";
    // A selectable item in a select list.
    WebRole["option"] = "option";
    // An element whose implicit native role semantics will not be mapped to the accessibility API. See synonym none.
    WebRole["presentation"] = "presentation";
    // An element that displays the progress status for tasks that take a long time.
    WebRole["progressbar"] = "progressbar";
    // A checkable input in a group of elements with the same role, only one of which can be checked at a time.
    WebRole["radio"] = "radio";
    // A group of radio buttons.
    WebRole["radiogroup"] = "radiogroup";
    // A perceivable section containing content that is relevant to a specific, author-specified purpose and
    // sufficiently important that users will likely want to be able to navigate to the section easily and to
    // have it listed in a summary of the page. Such a page summary could be generated dynamically by a
    // user agent or assistive technology.
    WebRole["region"] = "region";
    // A row of cells in a tabular container.
    WebRole["row"] = "row";
    // A structure containing one or more row elements in a tabular container.
    WebRole["rowgroup"] = "rowgroup";
    // A cell containing header information for a row in a grid.
    WebRole["rowheader"] = "rowheader";
    // A graphical object that controls the scrolling of content within a viewing area, regardless of
    // whether the content is fully displayed within the viewing area.
    WebRole["scrollbar"] = "scrollbar";
    // A landmark region that contains a collection of items and objects that, as a whole, combine to
    // create a search facility. See related form and searchbox.
    WebRole["search"] = "search";
    // A type of textbox intended for specifying search criteria. See related textbox and search.
    WebRole["searchbox"] = "searchbox";
    // A divider that separates and distinguishes sections of content or groups of menuitems.
    WebRole["separator"] = "separator";
    // A user input where the user selects a value from within a given range.
    WebRole["slider"] = "slider";
    // A form of range that expects the user to select from among discrete choices.
    WebRole["spinbutton"] = "spinbutton";
    // A type of live region whose content is advisory information for the user but is not important enough to
    // justify an alert, often but not necessarily presented as a status bar.
    WebRole["status"] = "status";
    // A type of checkbox that represents on/off values, as opposed to checked/unchecked values. See related checkbox.
    WebRole["switch"] = "switch";
    // A grouping label providing a mechanism for selecting the tab content that is to be rendered to the user.
    WebRole["tab"] = "tab";
    // A section containing data arranged in rows and columns. See related grid.
    WebRole["table"] = "table";
    // A list of tab elements, which are references to tabpanel elements.
    WebRole["tablist"] = "tablist";
    // A container for the resources associated with a tab, where each tab is contained in a tablist.
    WebRole["tabpanel"] = "tabpanel";
    // A word or phrase with a corresponding definition. See related definition.
    WebRole["term"] = "term";
    // A type of input that allows free-form text as its value.
    WebRole["textbox"] = "textbox";
    // A type of live region containing a numerical counter which indicates an amount of elapsed time
    // from a start point, or the time remaining until an end point.
    WebRole["timer"] = "timer";
    // A collection of commonly used function buttons or controls represented in compact visual form.
    WebRole["toolbar"] = "toolbar";
    // A contextual popup that displays a description for an element.
    WebRole["tooltip"] = "tooltip";
    // A type of list that may contain sub-level nested groups that can be collapsed and expanded.
    WebRole["tree"] = "tree";
    // A grid whose rows can be expanded and collapsed in the same manner as for a tree.
    WebRole["treegrid"] = "treegrid";
    // An option item of a tree. This is an element within a tree that may be expanded or collapsed
    // if it contains a sub-level group of tree item elements.
    WebRole["treeitem"] = "treeitem";
})(WebRole = exports.WebRole || (exports.WebRole = {}));
function featuresToProps(platform, features) {
    if (!(features instanceof Array)) {
        features = [features];
    }
    return features.map(function (t) {
        if (platform === t.platform) {
            return t.getProps();
        }
        else {
            console.error('AccessibilityFeature: Cannot merge', t.platform, 'properties to', platform, 'properties');
            return {};
        }
    });
}
function mergeAccessibilityFeaturesToPropsWeb(features, target) {
    var props = featuresToProps('web', features);
    var label = [];
    props.forEach(function (p) {
        // TODO: Validate incompatible properties.
        var key;
        for (key in p) {
            if (key === 'aria-label') {
                var l = p[key];
                if (l) {
                    label.push(l);
                }
            }
            else {
                target[key] = p[key];
            }
        }
    });
    if (label.length) {
        target['aria-label'] = label.join(', ');
    }
}
exports.mergeAccessibilityFeaturesToPropsWeb = mergeAccessibilityFeaturesToPropsWeb;
// For the native implementations under native-common, we have a common wrapper.
function mergeAccessibilityFeaturesToPropsNativeCommon(features, target) {
    if (!(features instanceof Array)) {
        features = [features];
    }
    if (!features.length) {
        return;
    }
    var platform = features[0].platform;
    if (platform === 'ios') {
        mergeAccessibilityFeaturesToPropsIOS(features, target);
    }
    else if (platform === 'android') {
        mergeAccessibilityFeaturesToPropsAndroid(features, target);
    }
    else if (platform === 'windows') {
        mergeAccessibilityFeaturesToPropsWindows(features, target);
    }
    else if (platform === 'macos') {
        mergeAccessibilityFeaturesToPropsMacOS(features, target);
    }
}
exports.mergeAccessibilityFeaturesToPropsNativeCommon = mergeAccessibilityFeaturesToPropsNativeCommon;
function mergeAccessibilityFeaturesToPropsAndroid(features, target) {
    var props = featuresToProps('android', features);
    var label = [];
    props.forEach(function (p) {
        // TODO: Validate incompatible properties.
        var key;
        for (key in p) {
            if (key === 'accessibilityLabel') {
                var l = p[key];
                if (l) {
                    label.push(l);
                }
            }
            else {
                target[key] = p[key];
            }
        }
    });
    if (label.length) {
        target.accessibilityLabel = label.join(', ');
    }
}
exports.mergeAccessibilityFeaturesToPropsAndroid = mergeAccessibilityFeaturesToPropsAndroid;
function mergeAccessibilityFeaturesToPropsIOS(features, target) {
    var props = featuresToProps('ios', features);
    var label = [];
    var accessibilityTraits = [];
    props.forEach(function (p) {
        // TODO: Validate incompatible properties.
        var key;
        for (key in p) {
            if (key === 'accessibilityLabel') {
                var l = p[key];
                if (l) {
                    label.push(l);
                }
            }
            else if (key === 'accessibilityTraits') {
                var a = p[key];
                if (a instanceof Array) {
                    accessibilityTraits = accessibilityTraits.concat(a);
                }
                else if (a) {
                    accessibilityTraits.push(a);
                }
            }
            else {
                target[key] = p[key];
            }
        }
    });
    if (label.length) {
        target.accessibilityLabel = label.join(', ');
    }
    if (accessibilityTraits.length) {
        target.accessibilityTraits = accessibilityTraits;
    }
}
exports.mergeAccessibilityFeaturesToPropsIOS = mergeAccessibilityFeaturesToPropsIOS;
function mergeAccessibilityFeaturesToPropsWindows(features, target) {
    // TODO.
}
exports.mergeAccessibilityFeaturesToPropsWindows = mergeAccessibilityFeaturesToPropsWindows;
function mergeAccessibilityFeaturesToPropsMacOS(features, target) {
    // TODO.
}
exports.mergeAccessibilityFeaturesToPropsMacOS = mergeAccessibilityFeaturesToPropsMacOS;
