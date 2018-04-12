/**
* Linking.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation for deep linking
*/
import SyncTasks = require('synctasks');
import Types = require('../common/Types');
import { Linking as CommonLinking } from '../common/Linking';
export declare class Linking extends CommonLinking {
    protected _openUrl(url: string): SyncTasks.Promise<void>;
    launchEmail(emailInfo: Types.EmailInfo): SyncTasks.Promise<void>;
    getInitialUrl(): SyncTasks.Promise<string | undefined>;
}
declare const _default: Linking;
export default _default;
