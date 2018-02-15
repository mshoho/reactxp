/**
* AccessibilityFeatureBase.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Low level cross-platform accessibility API.
*/

import Types = require('./Types');

export type AccessibilityProps = AccessibilityPropsAndroid|AccessibilityPropsIOS|AccessibilityPropsWeb|
                                 AccessibilityPropsMacOS|AccessibilityPropsWindows;

export interface Constructor<Y, E, S> {
    new (props: E): Y;
    setFeatureProps: (props: S) => void;
}

export abstract class AccessibilityFeatureDef<E, S> {
    readonly props: E;

    constructor(props: E) {
        this.props = props;

        if (!true) {
            this._suppressUnusedError();
        }
    }

    private _suppressUnusedError(k?: S|any) {
        // We want to define the accessibility features like:
        //     class CheckboxDef extends AccessibilityFeatureDef<CheckboxProps, CheckboxFeatureProps> { ... }.
        // Where CheckboxFeatureProps is a type for the class static properties. But Typescript does not
        // allow static methodos with the references to a class generics like:
        //     static setFeatureProps(props: K).
        // So, this is a noop to suppress the compiler error.
        //
        // TODO: Think about a better way to do it.
    }

    abstract getAndroidProps(): AccessibilityPropsAndroid;
    abstract getIOSProps(): AccessibilityPropsIOS;
    abstract getWebProps(): AccessibilityPropsWeb;
    abstract getMacOSProps(): AccessibilityPropsMacOS;
    abstract getWindowsProps(): AccessibilityPropsWindows;

    static setFeatureProps(props: any) {
        // Nothing to setup by default.
    }
}

export abstract class AccessibilityFeature<E> {
    readonly platform: Types.PlatformType;
    readonly props: E;

    constructor(platform: Types.PlatformType, props: E) {
        this.platform = platform;
        this.props = props;
    }

    getProps: () => AccessibilityProps;
}

export type AccessibilityFeatures = AccessibilityFeature<any>|AccessibilityFeature<any>[];

export function createAccessibilityFeature<Y extends AccessibilityFeatureDef<E, S>, E, S>(
        platform: Types.PlatformType, FeatureDef: Constructor<Y, E, S>) {

    const Feature = class extends AccessibilityFeature<E> {
        constructor(props: E) {
            super(platform, props);

            const def = new FeatureDef(props);

            switch (platform) {
                case 'web':
                    this.getProps = def.getWebProps.bind(def);
                    break;
                case 'ios':
                    this.getProps = def.getIOSProps.bind(def);
                    break;
                case 'android':
                    this.getProps = def.getAndroidProps.bind(def);
                    break;
                case 'windows':
                    this.getProps = def.getWindowsProps.bind(def);
                    break;
                case 'macos':
                    this.getProps = def.getMacOSProps.bind(def);
                    break;
                default:
                    console.error('AccessibilityFeature: Unknown platform', platform);
                    this.getProps = () => { return {}; };
            }
        }
    };

    const featureConstructor = function (props: E) {
        return new Feature(props);
    };

    (featureConstructor as {
        (props: E): AccessibilityFeature<E>;
        setFeatureProps: (props: S) => void;
    }).setFeatureProps = (props: S) => {
        FeatureDef.setFeatureProps(props);
    };

    return featureConstructor as {
        (props: E): AccessibilityFeature<E>;
        setFeatureProps: (props: S) => void;
    };
}

export interface AccessibilityPropsAndroid {
    accessible?: boolean;
    accessibilityLabel?: string;
    accessibilityComponentType?: AndroidComponentType;
    accessibilityLiveRegion?: 'none' | 'polite' | 'assertive';
    importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants';
}

export interface AccessibilityPropsIOS {
    accessible?: boolean;
    accessibilityLabel?: string;
    accessibilityTraits?: IOSAccessibilityTraits | IOSAccessibilityTraits[];
    accessibilityViewIsModal?: boolean;
    onAccessibilityTap?: Function;
    onMagicTap?: Function;
}

export interface AccessibilityPropsMacOS {
    // TODO.
}

export interface AccessibilityPropsWeb {
    role?: string;
    tabIndex?: number;
    id?: string;

    // https://www.w3.org/TR/wai-aria-1.1/#state_prop_def

    // Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.
    'aria-activedescendant'?: string;

    // Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change
    // notifications defined by the aria-relevant attribute.
    'aria-atomic'?: boolean | 'false' | 'true';

    // Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and
    // specifies how predictions would be presented if they are made.
    'aria-autocomplete'?: 'inline' | 'list' | 'both' | 'none';

    // Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete
    // before exposing them to the user.
    'aria-busy'?: boolean | 'false' | 'true';

    // Indicates the current "checked" state of checkboxes, radio buttons, and other widgets. See related aria-pressed and aria-selected.
    'aria-checked'?: boolean | 'false' | 'mixed' | 'true' | 'undefined';

    // Defines the total number of columns in a table, grid, or treegrid. See related aria-colindex.
    'aria-colcount'?: number;

    // Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
    // See related aria-colcount and aria-colspan.
    'aria-colindex'?: number;

    // Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid. See related aria-colindex
    // and aria-rowspan.
    'aria-colspan'?: number;

    // Identifies the element (or elements) whose contents or presence are controlled by the current element. See related aria-owns.
    'aria-controls'?: string;

    // Indicates the element that represents the current item within a container or set of related elements.
    'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';

    // Identifies the element (or elements) that describes the object. See related aria-labelledby.
    'aria-describedby'?: string;

    // Identifies the element that provides a detailed, extended description for the object. See related aria-describedby.
    'aria-details'?: string;

    // Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
    // See related aria-hidden and aria-readonly.
    'aria-disabled'?: boolean | 'false' | 'true';

    // [Deprecated in ARIA 1.1] Indicates what functions can be performed when a dragged object is released on the drop target.
    'aria-dropeffect'?: 'copy' | 'execute' | 'link' | 'move' | 'none' | 'popup';

    // Identifies the element that provides an error message for the object. See related aria-invalid and aria-describedby.
    'aria-errormessage'?: string;

    // Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.
    'aria-expanded'?: boolean | 'false' | 'true' | 'undefined';

    // Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
    // allows assistive technology to override the general default of reading in document source order.
    'aria-flowto'?: string;

    // [Deprecated in ARIA 1.1] Indicates an element's "grabbed" state in a drag-and-drop operation.
    'aria-grabbed'?: boolean | 'false' | 'true' | 'undefined';

    // Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.
    'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';

    // Indicates whether the element is exposed to an accessibility API. See related aria-disabled.
    'aria-hidden'?: boolean | 'false' | 'true' | 'undefined';

    // Indicates the entered value does not conform to the format expected by the application. See related aria-errormessage.
    'aria-invalid'?: boolean | 'grammar' | 'false' | 'spelling' | 'true';

    // Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.
    'aria-keyshortcuts'?: string;

    // Defines a string value that labels the current element. See related aria-labelledby.
    'aria-label'?: string;

    // Identifies the element (or elements) that labels the current element. See related aria-describedby.
    'aria-labelledby'?: string;

    // Defines the hierarchical level of an element within a structure.
    'aria-level'?: number;

    // Indicates that an element will be updated, and describes the types of updates the user agents,
    // assistive technologies, and user can expect from the live region.
    'aria-live'?: 'assertive' | 'off' | 'polite';

    // Indicates whether an element is modal when displayed.
    'aria-modal'?: boolean | 'false' | 'true';

    // Indicates whether a text box accepts multiple lines of input or only a single line.
    'aria-multiline'?: boolean | 'false' | 'true';

    // Indicates that the user may select more than one item from the current selectable descendants.
    'aria-multiselectable'?: boolean | 'false' | 'true';

    // Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.
    'aria-orientation'?: 'horizontal' | 'undefined' | 'vertical';

    // Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
    // between DOM elements where the DOM hierarchy cannot be used to represent the relationship. See related aria-controls.
    'aria-owns'?: string;

    // Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
    // A hint could be a sample value or a brief description of the expected format.
    'aria-placeholder'?: string;

    // Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements
    // in the set are present in the DOM. See related aria-setsize.
    'aria-posinset'?: number;

    // Indicates the current "pressed" state of toggle buttons. See related aria-checked and aria-selected.
    'aria-pressed'?: boolean | 'false' | 'mixed' | 'true' | 'undefined';

    // Indicates that the element is not editable, but is otherwise operable. See related aria-disabled.
    'aria-readonly'?: boolean | 'false' | 'true';

    // Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
    // See related aria-atomic.
    'aria-relevant'?: 'additions' | 'additions text' | 'all' | 'removals' | 'text';

    // Indicates that user input is required on the element before a form may be submitted.
    'aria-required'?: boolean | 'false' | 'true';

    // Defines a human-readable, author-localized description for the role of an element.
    'aria-roledescription'?: string;

    // Defines the total number of rows in a table, grid, or treegrid. See related aria-rowindex.
    'aria-rowcount'?: number;

    // Defines an element's row index or position with respect to the total number of rows within a table,
    // grid, or treegrid. See related aria-rowcount and aria-rowspan.
    'aria-rowindex'?: number;

    // Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
    // See related aria-rowindex and aria-colspan.
    'aria-rowspan'?: number;

    // Indicates the current "selected" state of various widgets. See related aria-checked and aria-pressed.
    'aria-selected'?: boolean | 'false' | 'true' | 'undefined';

    // Defines the number of items in the current set of listitems or treeitems. Not required if all elements
    // in the set are present in the DOM. See related aria-posinset.
    'aria-setsize'?: number;

    // Indicates if items in a table or grid are sorted in ascending or descending order.
    'aria-sort'?: 'ascending' | 'descending' | 'none' | 'other';

    // Defines the maximum allowed value for a range widget.
    'aria-valuemax'?: number;

    // Defines the minimum allowed value for a range widget.
    'aria-valuemin'?: number;

    // Defines the current value for a range widget. See related aria-valuetext.
    'aria-valuenow'?: number;

    // Defines the human readable text alternative of aria-valuenow for a range widget.
    'aria-valuetext'?: string;
}

export interface AccessibilityPropsWindows {
    // TODO.
}

export enum AndroidComponentType {
    none = 'none',
    button = 'button',
    radiobutton_checked = 'radiobutton_checked',
    radiobutton_unchecked = 'radiobutton_unchecked'
}

export enum IOSAccessibilityTraits {
    // Used when the element has no traits.
    none = 'none',
    // Used when the element should be treated as a button.
    button = 'button',
    // Used when the element should be treated as a link.
    link = 'link',
    // Used when an element acts as a header for a content section (e.g. the title of a navigation bar).
    header = 'header',
    // Used when the text field element should also be treated as a search field.
    search = 'search',
    // Used when the element should be treated as an image. Can be combined with button or link, for example.
    image = 'image',
    // Used when the element is selected. For example, a selected row in a table or a selected button within a segmented control.
    selected = 'selected',
    // Used when the element plays its own sound when activated.
    plays = 'plays',
    // Used when the element acts as a keyboard key.
    key = 'key',
    // Used when the element should be treated as static text that cannot change.
    text = 'text',
    // Used when an element can be used to provide a quick summary of current conditions in the app when the
    // app first launches. For example, when Weather first launches, the element with today's weather conditions is marked with this trait.
    summary = 'summary',
    // Used when the control is not enabled and does not respond to user input.
    disabled = 'disabled',
    // Used when the element frequently updates its label or value, but too often to send notifications.
    // Allows an accessibility client to poll for changes. A stopwatch would be an example.
    frequentUpdates = 'frequentUpdates',
    // Used when activating an element starts a media session (e.g. playing a movie, recording audio) that
    // should not be interrupted by output from an assistive technology, like VoiceOver.
    startsMedia = 'startsMedia',
    // Used when an element can be "adjusted" (e.g. a slider).
    adjustable = 'adjustable',
    // Used when an element allows direct touch interaction for VoiceOver users (for example, a view representing a piano keyboard).
    allowsDirectInteraction = 'allowsDirectInteraction',
    // Informs VoiceOver that it should scroll to the next page when it finishes reading the contents of the element.
    pageTurn = 'pageTurn'
}

export enum WebRole {
    // https://www.w3.org/TR/wai-aria-1.1/#role_definitions

    // A type of live region with important, and usually time-sensitive, information. See related alertdialog and status.
    alert = 'alert',

    // A type of dialog that contains an alert message, where initial focus goes to an element within the dialog.
    // See related alert and dialog.
    alertdialog = 'alertdialog',

    // A structure containing one or more focusable elements requiring user input, such as keyboard or gesture events,
    // that do not follow a standard interaction pattern supported by a widget role.
    application = 'application',

    // A section of a page that consists of a composition that forms an independent part of a document, page, or site.
    article = 'article',

    // A region that contains mostly site-oriented content, rather than page-specific content.
    banner = 'banner',

    // An input that allows for user-triggered actions when clicked or pressed. See related link.
    button = 'button',

    // A cell in a tabular container. See related gridcell.
    cell = 'cell',

    // A checkable input that has three possible values: true, false, or mixed.
    checkbox = 'checkbox',

    // A cell containing header information for a column.
    columnheader = 'columnheader',

    // A composite widget containing a single-line textbox and another element, such as a listbox or grid,
    // that can dynamically pop up to help the user set the value of the textbox.
    combobox = 'combobox',

    // A supporting section of the document, designed to be complementary to the main content at a
    // similar level in the DOM hierarchy, but remains meaningful when separated from the main content.
    complementary = 'complementary',

    // A large perceivable region that contains information about the parent document.
    contentinfo = 'contentinfo',

    // A definition of a term or concept. See related term.
    definition = 'definition',

    // A dialog is a descendant window of the primary window of a web application. For HTML pages,
    // the primary application window is the entire web document, i.e., the body element.
    dialog = 'dialog',

    // A list of references to members of a group, such as a static table of contents.
    directory = 'directory',

    // An element containing content that assistive technology users may want to browse in a reading mode.
    document = 'document',

    // A scrollable list of articles where scrolling may cause articles to be added to or removed from either end of the list.
    feed = 'feed',

    // A perceivable section of content that typically contains a graphical document,
    // images, code snippets, or example text. The parts of a figure MAY be user-navigable.
    figure = 'figure',

    // A landmark region that contains a collection of items and objects that, as a whole,
    // combine to create a form. See related search.
    form = 'form',

    // A composite widget containing a collection of one or more rows with one or
    // more cells where some or all cells in the grid are focusable by using methods
    // of two-dimensional navigation, such as directional arrow keys.
    grid = 'grid',

    // A cell in a grid or treegrid.
    gridcell = 'gridcell',

    // A set of user interface objects which are not intended to be included in a
    // page summary or table of contents by assistive technologies.
    group = 'group',

    // A heading for a section of the page.
    heading = 'heading',

    // A container for a collection of elements that form an image.
    img = 'img',

    // An interactive reference to an internal or external resource that, when activated,
    // causes the user agent to navigate to that resource. See related button.
    link = 'link',

    // A section containing listitem elements. See related listbox.
    list = 'list',

    // A widget that allows the user to select one or more items from a list of choices. See related combobox and list.
    listbox = 'listbox',

    // A single item in a list or directory.
    listitem = 'listitem',

    // A type of live region where new information is added in meaningful order and old information may disappear. See related marquee.
    log = 'log',

    // The main content of a document.
    main = 'main',

    // A type of live region where non-essential information changes frequently. See related log.
    marquee = 'marquee',

    // Content that represents a mathematical expression.
    math = 'math',

    // A type of widget that offers a list of choices to the user.
    menu = 'menu',

    // A presentation of menu that usually remains visible and is usually presented horizontally.
    menubar = 'menubar',

    // An option in a set of choices contained by a menu or menubar.
    menuitem = 'menuitem',

    // A menuitem with a checkable state whose possible values are true, false, or mixed.
    menuitemcheckbox = 'menuitemcheckbox',

    // A checkable menuitem in a set of elements with the same role, only one of which can be checked at a time.
    menuitemradio = 'menuitemradio',

    // A collection of navigational elements (usually links) for navigating the document or related documents.
    navigation = 'navigation',

    // An element whose implicit native role semantics will not be mapped to the accessibility API. See synonym presentation.
    none = 'none',

    // A section whose content is parenthetic or ancillary to the main content of the resource.
    note = 'note',

    // A selectable item in a select list.
    option = 'option',

    // An element whose implicit native role semantics will not be mapped to the accessibility API. See synonym none.
    presentation = 'presentation',

    // An element that displays the progress status for tasks that take a long time.
    progressbar = 'progressbar',

    // A checkable input in a group of elements with the same role, only one of which can be checked at a time.
    radio = 'radio',

    // A group of radio buttons.
    radiogroup = 'radiogroup',

    // A perceivable section containing content that is relevant to a specific, author-specified purpose and
    // sufficiently important that users will likely want to be able to navigate to the section easily and to
    // have it listed in a summary of the page. Such a page summary could be generated dynamically by a
    // user agent or assistive technology.
    region = 'region',

    // A row of cells in a tabular container.
    row = 'row',

    // A structure containing one or more row elements in a tabular container.
    rowgroup = 'rowgroup',

    // A cell containing header information for a row in a grid.
    rowheader = 'rowheader',

    // A graphical object that controls the scrolling of content within a viewing area, regardless of
    // whether the content is fully displayed within the viewing area.
    scrollbar = 'scrollbar',

    // A landmark region that contains a collection of items and objects that, as a whole, combine to
    // create a search facility. See related form and searchbox.
    search = 'search',

    // A type of textbox intended for specifying search criteria. See related textbox and search.
    searchbox = 'searchbox',

    // A divider that separates and distinguishes sections of content or groups of menuitems.
    separator = 'separator',

    // A user input where the user selects a value from within a given range.
    slider = 'slider',

    // A form of range that expects the user to select from among discrete choices.
    spinbutton = 'spinbutton',

    // A type of live region whose content is advisory information for the user but is not important enough to
    // justify an alert, often but not necessarily presented as a status bar.
    status = 'status',

    // A type of checkbox that represents on/off values, as opposed to checked/unchecked values. See related checkbox.
    switch = 'switch',

    // A grouping label providing a mechanism for selecting the tab content that is to be rendered to the user.
    tab = 'tab',

    // A section containing data arranged in rows and columns. See related grid.
    table = 'table',

    // A list of tab elements, which are references to tabpanel elements.
    tablist = 'tablist',

    // A container for the resources associated with a tab, where each tab is contained in a tablist.
    tabpanel = 'tabpanel',

    // A word or phrase with a corresponding definition. See related definition.
    term = 'term',

    // A type of input that allows free-form text as its value.
    textbox = 'textbox',

    // A type of live region containing a numerical counter which indicates an amount of elapsed time
    // from a start point, or the time remaining until an end point.
    timer = 'timer',

    // A collection of commonly used function buttons or controls represented in compact visual form.
    toolbar = 'toolbar',

    // A contextual popup that displays a description for an element.
    tooltip = 'tooltip',

    // A type of list that may contain sub-level nested groups that can be collapsed and expanded.
    tree = 'tree',

    // A grid whose rows can be expanded and collapsed in the same manner as for a tree.
    treegrid = 'treegrid',

    // An option item of a tree. This is an element within a tree that may be expanded or collapsed
    // if it contains a sub-level group of tree item elements.
    treeitem = 'treeitem'
}

function featuresToProps<T extends AccessibilityFeature<P>, P>(platform: Types.PlatformType, features: T|T[]) {
    if (!(features instanceof Array)) {
        features = [features];
    }

    return features.map(t => {
        if (platform === t.platform) {
            return t.getProps();
        } else {
            console.error('AccessibilityFeature: Cannot merge', t.platform, 'properties to', platform, 'properties');
            return {};
        }
    });
}

export function mergeAccessibilityFeaturesToPropsWeb<T extends AccessibilityFeature<P>, P>(
        features: T|T[], target: AccessibilityPropsWeb): void {

    const props: AccessibilityPropsWeb[] = featuresToProps('web', features);
    const label: string[] = [];

    props.forEach(p => {
        // TODO: Validate incompatible properties.
        let key: keyof AccessibilityPropsWeb;

        for (key in p) {
            if (key === 'aria-label') {
                const l = p[key];
                if (l) {
                    label.push(l);
                }
            } else {
                target[key] = p[key];
            }
        }
    });

    if (label.length) {
        target['aria-label'] = label.join(', ');
    }
}

// For the native implementations under native-common, we have a common wrapper.
export function mergeAccessibilityFeaturesToPropsNativeCommon<T extends AccessibilityFeature<P>, P>(
        features: T|T[], target: AccessibilityPropsAndroid|AccessibilityPropsIOS|AccessibilityPropsWindows|AccessibilityPropsMacOS): void {

    if (!(features instanceof Array)) {
        features = [features];
    }

    if (!features.length) {
        return;
    }

    const platform = features[0].platform;

    if (platform === 'ios') {
        mergeAccessibilityFeaturesToPropsIOS(features, target);
    } else if (platform === 'android') {
        mergeAccessibilityFeaturesToPropsAndroid(features, target);
    } else if (platform === 'windows') {
        mergeAccessibilityFeaturesToPropsWindows(features, target);
    } else if (platform === 'macos') {
        mergeAccessibilityFeaturesToPropsMacOS(features, target);
    }
}

export function mergeAccessibilityFeaturesToPropsAndroid<T extends AccessibilityFeature<P>, P>(
        features: T|T[], target: AccessibilityPropsAndroid): void {
    const props: AccessibilityPropsAndroid[] = featuresToProps('android', features);
    const label: string[] = [];

    props.forEach(p => {
        // TODO: Validate incompatible properties.
        let key: keyof AccessibilityPropsAndroid;

        for (key in p) {
            if (key === 'accessibilityLabel') {
                const l = p[key];
                if (l) {
                    label.push(l);
                }
            } else {
                target[key] = p[key];
            }
        }
    });

    if (label.length) {
        target.accessibilityLabel = label.join(', ');
    }
}

export function mergeAccessibilityFeaturesToPropsIOS<T extends AccessibilityFeature<P>, P>(
        features: T|T[], target: AccessibilityPropsIOS): void {
    const props: AccessibilityPropsIOS[] = featuresToProps('ios', features);
    const label: string[] = [];
    let accessibilityTraits: IOSAccessibilityTraits[] = [];

    props.forEach(p => {
        // TODO: Validate incompatible properties.
        let key: keyof AccessibilityPropsIOS;

        for (key in p) {
            if (key === 'accessibilityLabel') {
                const l = p[key];
                if (l) {
                    label.push(l);
                }
            } else if (key === 'accessibilityTraits') {
                const a = p[key];
                if (a instanceof Array) {
                    accessibilityTraits = accessibilityTraits.concat(a);
                } else if (a) {
                    accessibilityTraits.push(a);
                }
            } else {
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

export function mergeAccessibilityFeaturesToPropsWindows<T extends AccessibilityFeature<P>, P>(
        features: T|T[], target: AccessibilityPropsWindows): void {
    // TODO.
}

export function mergeAccessibilityFeaturesToPropsMacOS<T extends AccessibilityFeature<P>, P>(
    features: T|T[], target: AccessibilityPropsMacOS): void {
    // TODO.
}
