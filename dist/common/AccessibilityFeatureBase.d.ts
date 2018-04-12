/**
* AccessibilityFeatureBase.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Low level cross-platform accessibility API.
*/
import Types = require('./Types');
export declare type AccessibilityProps = AccessibilityPropsAndroid | AccessibilityPropsIOS | AccessibilityPropsWeb | AccessibilityPropsMacOS | AccessibilityPropsWindows;
export interface Constructor<Y, E, S> {
    new (props: E): Y;
    setFeatureProps: (props: S) => void;
}
export declare abstract class AccessibilityFeatureDef<E, S> {
    readonly props: E;
    constructor(props: E);
    private _suppressUnusedError(k?);
    abstract getAndroidProps(): AccessibilityPropsAndroid;
    abstract getIOSProps(): AccessibilityPropsIOS;
    abstract getWebProps(): AccessibilityPropsWeb;
    abstract getMacOSProps(): AccessibilityPropsMacOS;
    abstract getWindowsProps(): AccessibilityPropsWindows;
    static setFeatureProps(props: any): void;
}
export declare abstract class AccessibilityFeature<E> {
    readonly platform: Types.PlatformType;
    readonly props: E;
    constructor(platform: Types.PlatformType, props: E);
    getProps: () => AccessibilityProps;
}
export declare type AccessibilityFeatures = AccessibilityFeature<any> | AccessibilityFeature<any>[];
export declare function createAccessibilityFeature<Y extends AccessibilityFeatureDef<E, S>, E, S>(platform: Types.PlatformType, FeatureDef: Constructor<Y, E, S>): {
    (props: E): AccessibilityFeature<E>;
    setFeatureProps: (props: S) => void;
};
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
}
export interface AccessibilityPropsWeb {
    role?: string;
    tabIndex?: number;
    id?: string;
    'aria-activedescendant'?: string;
    'aria-atomic'?: boolean | 'false' | 'true';
    'aria-autocomplete'?: 'inline' | 'list' | 'both' | 'none';
    'aria-busy'?: boolean | 'false' | 'true';
    'aria-checked'?: boolean | 'false' | 'mixed' | 'true' | 'undefined';
    'aria-colcount'?: number;
    'aria-colindex'?: number;
    'aria-colspan'?: number;
    'aria-controls'?: string;
    'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-disabled'?: boolean | 'false' | 'true';
    'aria-dropeffect'?: 'copy' | 'execute' | 'link' | 'move' | 'none' | 'popup';
    'aria-errormessage'?: string;
    'aria-expanded'?: boolean | 'false' | 'true' | 'undefined';
    'aria-flowto'?: string;
    'aria-grabbed'?: boolean | 'false' | 'true' | 'undefined';
    'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
    'aria-hidden'?: boolean | 'false' | 'true' | 'undefined';
    'aria-invalid'?: boolean | 'grammar' | 'false' | 'spelling' | 'true';
    'aria-keyshortcuts'?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-level'?: number;
    'aria-live'?: 'assertive' | 'off' | 'polite';
    'aria-modal'?: boolean | 'false' | 'true';
    'aria-multiline'?: boolean | 'false' | 'true';
    'aria-multiselectable'?: boolean | 'false' | 'true';
    'aria-orientation'?: 'horizontal' | 'undefined' | 'vertical';
    'aria-owns'?: string;
    'aria-placeholder'?: string;
    'aria-posinset'?: number;
    'aria-pressed'?: boolean | 'false' | 'mixed' | 'true' | 'undefined';
    'aria-readonly'?: boolean | 'false' | 'true';
    'aria-relevant'?: 'additions' | 'additions text' | 'all' | 'removals' | 'text';
    'aria-required'?: boolean | 'false' | 'true';
    'aria-roledescription'?: string;
    'aria-rowcount'?: number;
    'aria-rowindex'?: number;
    'aria-rowspan'?: number;
    'aria-selected'?: boolean | 'false' | 'true' | 'undefined';
    'aria-setsize'?: number;
    'aria-sort'?: 'ascending' | 'descending' | 'none' | 'other';
    'aria-valuemax'?: number;
    'aria-valuemin'?: number;
    'aria-valuenow'?: number;
    'aria-valuetext'?: string;
}
export interface AccessibilityPropsWindows {
}
export declare enum AndroidComponentType {
    none = "none",
    button = "button",
    radiobutton_checked = "radiobutton_checked",
    radiobutton_unchecked = "radiobutton_unchecked",
}
export declare enum IOSAccessibilityTraits {
    none = "none",
    button = "button",
    link = "link",
    header = "header",
    search = "search",
    image = "image",
    selected = "selected",
    plays = "plays",
    key = "key",
    text = "text",
    summary = "summary",
    disabled = "disabled",
    frequentUpdates = "frequentUpdates",
    startsMedia = "startsMedia",
    adjustable = "adjustable",
    allowsDirectInteraction = "allowsDirectInteraction",
    pageTurn = "pageTurn",
}
export declare enum WebRole {
    alert = "alert",
    alertdialog = "alertdialog",
    application = "application",
    article = "article",
    banner = "banner",
    button = "button",
    cell = "cell",
    checkbox = "checkbox",
    columnheader = "columnheader",
    combobox = "combobox",
    complementary = "complementary",
    contentinfo = "contentinfo",
    definition = "definition",
    dialog = "dialog",
    directory = "directory",
    document = "document",
    feed = "feed",
    figure = "figure",
    form = "form",
    grid = "grid",
    gridcell = "gridcell",
    group = "group",
    heading = "heading",
    img = "img",
    link = "link",
    list = "list",
    listbox = "listbox",
    listitem = "listitem",
    log = "log",
    main = "main",
    marquee = "marquee",
    math = "math",
    menu = "menu",
    menubar = "menubar",
    menuitem = "menuitem",
    menuitemcheckbox = "menuitemcheckbox",
    menuitemradio = "menuitemradio",
    navigation = "navigation",
    none = "none",
    note = "note",
    option = "option",
    presentation = "presentation",
    progressbar = "progressbar",
    radio = "radio",
    radiogroup = "radiogroup",
    region = "region",
    row = "row",
    rowgroup = "rowgroup",
    rowheader = "rowheader",
    scrollbar = "scrollbar",
    search = "search",
    searchbox = "searchbox",
    separator = "separator",
    slider = "slider",
    spinbutton = "spinbutton",
    status = "status",
    switch = "switch",
    tab = "tab",
    table = "table",
    tablist = "tablist",
    tabpanel = "tabpanel",
    term = "term",
    textbox = "textbox",
    timer = "timer",
    toolbar = "toolbar",
    tooltip = "tooltip",
    tree = "tree",
    treegrid = "treegrid",
    treeitem = "treeitem",
}
export declare function mergeAccessibilityFeaturesToPropsWeb<T extends AccessibilityFeature<P>, P>(features: T | T[], target: AccessibilityPropsWeb): void;
export declare function mergeAccessibilityFeaturesToPropsNativeCommon<T extends AccessibilityFeature<P>, P>(features: T | T[], target: AccessibilityPropsAndroid | AccessibilityPropsIOS | AccessibilityPropsWindows | AccessibilityPropsMacOS): void;
export declare function mergeAccessibilityFeaturesToPropsAndroid<T extends AccessibilityFeature<P>, P>(features: T | T[], target: AccessibilityPropsAndroid): void;
export declare function mergeAccessibilityFeaturesToPropsIOS<T extends AccessibilityFeature<P>, P>(features: T | T[], target: AccessibilityPropsIOS): void;
export declare function mergeAccessibilityFeaturesToPropsWindows<T extends AccessibilityFeature<P>, P>(features: T | T[], target: AccessibilityPropsWindows): void;
export declare function mergeAccessibilityFeaturesToPropsMacOS<T extends AccessibilityFeature<P>, P>(features: T | T[], target: AccessibilityPropsMacOS): void;
