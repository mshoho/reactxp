/**
* ChildData.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Allows child components to send custom data to parent views with onChildData()
* handler installed.
*/

import React = require('react');
import PropTypes = require('prop-types');
import RX = require('../common/Interfaces');

export class ChildData extends RX.ChildData  {
    provideChildData(childComponent: React.Component<any, any>, data: any): any {
        const callback = childComponent.context && (childComponent.context as any).onChildData;

        if (typeof callback === 'function') {
            return callback(data);
        }
    }

    applyChildDataProviderMixin(Component: typeof React.Component): void {
        let contextTypes = (Component.contextTypes || {}) as any;
        contextTypes.onChildData = PropTypes.func;
        Component.contextTypes = contextTypes;

        let childContextTypes = (Component.childContextTypes || {}) as any;
        childContextTypes.onChildData = PropTypes.func;
        Component.childContextTypes = childContextTypes;
    }
}

export default new ChildData();
