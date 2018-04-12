import SyncTasks = require('synctasks');
import RX = require('../common/Interfaces');
export declare class Storage extends RX.Storage {
    getItem(key: string): SyncTasks.Promise<string | undefined>;
    setItem(key: string, value: string): SyncTasks.Promise<void>;
    removeItem(key: string): SyncTasks.Promise<void>;
    clear(): SyncTasks.Promise<void>;
}
declare const _default: Storage;
export default _default;
