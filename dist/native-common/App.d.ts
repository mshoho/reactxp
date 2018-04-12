/**
* App.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Native implementation of App API namespace.
*/
import RN = require('react-native');
import RX = require('../common/Interfaces');
import Types = require('../common/Types');
export declare class App extends RX.App {
    constructor();
    initialize(debug: boolean, development: boolean): void;
    getActivationState(): Types.AppActivationState;
    protected getRootViewFactory(): RN.ComponentProvider;
}
declare const _default: App;
export default _default;
