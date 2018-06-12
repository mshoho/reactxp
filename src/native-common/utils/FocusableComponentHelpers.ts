/**
* FocusableComponentHelpers.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*/

import SyncTasks = require('synctasks');
import UserInterface from '../UserInterface';
import { LayoutInfo } from '../../common/Types';

import { StoredFocusableComponent } from '../../common/utils/FocusManager';

export function sortFocusableComponentsByAppearance(components: StoredFocusableComponent[]): SyncTasks.Promise<void> {
    if (components.length <= 1) {
        return SyncTasks.Resolved<void>();
    }

    var deferred = SyncTasks.Defer<void>();

    SyncTasks.all(components.map(sfc => UserInterface.measureLayoutRelativeToWindow(sfc.component).then(layoutInfo => {
        (sfc as any).__rxSortSize = layoutInfo;
    }))).then(() => {
        deferred.resolve(void 0);
    }).catch((err => {
        deferred.reject(err);
    }));

    return deferred.promise().finally(() => {
        components.sort((a, b) => {
            const aSize: LayoutInfo = (a as any).__rxSortSize;
            const bSize: LayoutInfo = (b as any).__rxSortSize;

            if (!aSize) {
                return 1;
            } else if (!bSize) {
                return -1;
            } else if (aSize.y < bSize.y) {
                return -1;
            } else if (aSize.y > bSize.y) {
                return 1;
            } else if (aSize.x < bSize.x) {
                return -1;
            } else if (aSize.x > bSize.x) {
                return 1;
            } else if (aSize.width < bSize.width) {
                return -1;
            } else if (aSize.width > bSize.width) {
                return 1;
            } else if (aSize.height < bSize.height) {
                return -1;
            } else if (aSize.height > bSize.height) {
                return 1;
            } else {
                return 0;
            }
        });

        for (let i = 0; i < components.length; i++) {
            delete (components[i] as any).__rxSortSize;
        }
    });
}
