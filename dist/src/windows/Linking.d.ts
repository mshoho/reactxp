/**
* Linking.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Windows-specific implementation for deep linking.
*/
import SyncTasks = require('synctasks');
import { Linking as CommonLinking } from '../common/Linking';
import Types = require('../common/Types');
export declare class Linking extends CommonLinking {
    protected _openUrl(url: string): SyncTasks.Promise<void>;
    getInitialUrl(): SyncTasks.Promise<string | undefined>;
    launchEmail(emailInfo: Types.EmailInfo): SyncTasks.Promise<void>;
}
declare const _default: Linking;
export default _default;
