/**
* AccessibilityFeatureDefs.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Commonly used accessibility feature definitions.
*/

// XXX:

import {
    AccessibilityFeatureDef,
    AccessibilityPropsAndroid,
    AccessibilityPropsIOS,
    AccessibilityPropsWeb,
    AccessibilityPropsMacOS,
    AccessibilityPropsWindows,
    IOSAccessibilityTraits,
    WebRole
} from './AccessibilityFeatureBase';

export interface AccessibilityLabelSettings {
    label: string;
}

export class AccessibilityLabelDef extends AccessibilityFeatureDef<AccessibilityLabelSettings, void> {
    static setFeatureProps() {
        // Nothing to setup.
    }

    getAndroidProps(): AccessibilityPropsAndroid {
        return {
            accessibilityLabel: this.props.label
        };
    }

    getIOSProps(): AccessibilityPropsIOS {
        return {
            accessibilityLabel: this.props.label
        };
    }

    getWebProps(): AccessibilityPropsWeb {
        return {
            'aria-label': this.props.label
        };
    }

    getMacOSProps(): AccessibilityPropsMacOS {
        return {};
    }

    getWindowsProps(): AccessibilityPropsWindows {
        return {};
    }
}

export interface AccessibilityHiddenSettings {
    hideDescendants: boolean;
}

export class AccessibilityHiddenDef extends AccessibilityFeatureDef<AccessibilityHiddenSettings, void> {
    static setFeatureProps() {
        // Nothing to setup.
    }

    getAndroidProps(): AccessibilityPropsAndroid {
        return {
            accessible: false,
            importantForAccessibility: this.props.hideDescendants ? 'no-hide-descendants' : 'no'
        };
    }

    getIOSProps(): AccessibilityPropsIOS {
        return {
            accessible: false,
            accessibilityTraits: IOSAccessibilityTraits.none
        };
    }

    getWebProps(): AccessibilityPropsWeb {
        return {
            role: WebRole.none,
            'aria-hidden': this.props.hideDescendants ? 'true' : undefined
        };
    }

    getMacOSProps(): AccessibilityPropsMacOS {
        // Not implemented yet.
        return {};
    }

    getWindowsProps(): AccessibilityPropsWindows {
        // Not implemented yet.
        return {};
    }
}

export interface CheckboxFeatureProps {
    checkboxLabel: string; // Checkbox name for the platforms which don't have it.
    checkedLabel: string; // Checked state name for the platforms which don't have it.
    uncheckedLabel: string; // Unhecked state name for the platforms which don't have it.
}

export interface CheckboxProps {
    checked: boolean;
}

export class CheckboxDef extends AccessibilityFeatureDef<CheckboxProps, CheckboxFeatureProps> {
    // Default labels.
    private static _checkboxLabel = 'checkbox';
    private static _checkedLabel = 'checked';
    private static _uncheckedLabel = 'unchecked';

    static setFeatureProps(props: CheckboxFeatureProps): void {
        CheckboxDef._checkboxLabel = props.checkboxLabel;
        CheckboxDef._checkedLabel = props.checkedLabel;
        CheckboxDef._uncheckedLabel = props.uncheckedLabel;
    }

    getAndroidProps(): AccessibilityPropsAndroid {
        return {
            accessible: true,
            importantForAccessibility: 'yes',
            accessibilityLabel: CheckboxDef._checkboxLabel + ', ' +
                                (this.props.checked ? CheckboxDef._checkedLabel : CheckboxDef._uncheckedLabel)
        };
    }

    getIOSProps(): AccessibilityPropsIOS {
        return {
            accessible: true,
            accessibilityTraits: IOSAccessibilityTraits.button,
            accessibilityLabel: CheckboxDef._checkboxLabel + ', ' +
                                (this.props.checked ? CheckboxDef._checkedLabel : CheckboxDef._uncheckedLabel)
        };
    }

    getWebProps(): AccessibilityPropsWeb {
        return {
            tabIndex: 0,
            role: WebRole.checkbox,
            'aria-checked': this.props.checked ? 'true' : 'false'
        };
    }

    getMacOSProps(): AccessibilityPropsMacOS {
        // Not implemented yet.
        return {};
    }

    getWindowsProps(): AccessibilityPropsWindows {
        // Not implemented yet.
        return {};
    }
}
