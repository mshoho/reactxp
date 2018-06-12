/**
* FocusableComponentHelpers.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*/

import ReactDOM = require('react-dom');
import SyncTasks = require('synctasks');

import { StoredFocusableComponent } from '../../common/utils/FocusManager';

export function sortFocusableComponentsByAppearance(components: StoredFocusableComponent[]): SyncTasks.Promise<void> {
    components.sort((a, b) => {
        // Some element which is mounted later could come earlier in the DOM,
        // so, we sort the elements by their appearance in the DOM.
        if (a === b) {
            return 0;
        }

        const aNode = ReactDOM.findDOMNode(a.component) as HTMLElement;
        const bNode = ReactDOM.findDOMNode(b.component) as HTMLElement;

        if (!aNode) {
            return 1;
        } else if (!bNode) {
            return -1;
        } else {
            return aNode.compareDocumentPosition(bNode) & document.DOCUMENT_POSITION_PRECEDING ? 1 : -1;
        }
    });

    return SyncTasks.Resolved<void>();
}
