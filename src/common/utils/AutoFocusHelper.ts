/**
* AutoFocusHelper.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Provides the functions which allow to handle the selection of a proper component
* to focus from the multiple candidates with autoFocus=true.
*/

import React = require('react');
import SyncTasks = require('synctasks');

import AppConfig from '../../common/AppConfig';
import Types = require('../Types');
import Interfaces = require('../Interfaces');

const _arbitrateTimeout = 0;
let _arbitrateId = 0;
let _sortAndFilter: SortAndFilterFunc|undefined;
let _autoFocusTimer: number|undefined;
let _lastFocusArbitratorProviderId = 0;
let _rootFocusArbitratorProvider: FocusArbitratorProvider;
let _requestFocusQueue: SyncTasks.Promise<() => void>[] = [];
let _runAfterArbitrationTimer: number|undefined;
let _runAfterArbitrationCallbacks: ({ id: number, callback: () => void })[] = [];
let _runAfterArbitrationLastId = 0;

export type FocusCandidateComponent = React.Component<any, any> & Interfaces.FocusableComponent;

export enum FocusCandidateType {
    Focus = 1,
    FocusFirst = 2
}

export interface FocusCandidateInternal {
    component: FocusCandidateComponent;
    focus: () => void;
    isAvailable: () => boolean;
    type: FocusCandidateType;
    accessibilityId?: string;
}

export type SortAndFilterFunc = (candidates: FocusCandidateInternal[]) => SyncTasks.Promise<FocusCandidateInternal[]>;

export function setSortAndFilterFunc(sortAndFilter: SortAndFilterFunc): void {
    _sortAndFilter = sortAndFilter;
}

function _runAfterArbitration() {
    if (_runAfterArbitrationTimer) {
        clearTimeout(_runAfterArbitrationTimer);
        _runAfterArbitrationTimer = undefined;
    }

    if (!_autoFocusTimer) {
        _runAfterArbitrationTimer = setTimeout(() => {
            _runAfterArbitrationTimer = undefined;

            if (_runAfterArbitrationCallbacks.length) {
                _runAfterArbitrationCallbacks.forEach(item => item.callback());
                _runAfterArbitrationCallbacks = [];
            }
        }, _arbitrateTimeout);
    }
}

export function runAfterArbitration(callback: () => void): number {
    _runAfterArbitrationCallbacks.push({
        id: ++_runAfterArbitrationLastId,
        callback
    });

    _runAfterArbitration();

    return _runAfterArbitrationLastId;
}

export function cancelRunAfterArbitration(id: number) {
    _runAfterArbitrationCallbacks = _runAfterArbitrationCallbacks.filter(item => item.id !== id);
}

export class FocusArbitratorProvider {
    private _id: number;
    private _parentArbitratorProvider: FocusArbitratorProvider | undefined;

    private _arbitratorCallback: Types.FocusArbitrator | undefined;
    private _candidates: FocusCandidateInternal[] = [];
    private _pendingChildren: { [key: string]: FocusArbitratorProvider } = {};

    constructor(view?: Interfaces.View, arbitrator?: Types.FocusArbitrator) {
        this._id = ++_lastFocusArbitratorProviderId;
        this._parentArbitratorProvider = view
            ? ((view.context && view.context.focusArbitrator) || _rootFocusArbitratorProvider)
            : undefined;
        this._arbitratorCallback = arbitrator;
    }

    private _notifyParent() {
        if (this._parentArbitratorProvider) {
            this._parentArbitratorProvider._pendingChildren['fa-' + this._id] = this;
            this._parentArbitratorProvider._notifyParent();
        }
    }

    private _arbitrate(): SyncTasks.Promise<FocusCandidateInternal | undefined> {
        const promises: SyncTasks.Promise<FocusCandidateInternal | undefined>[] = [];

        Object.keys(this._pendingChildren).forEach(key => promises.push(this._pendingChildren[key]._arbitrate()));

        this._pendingChildren = {};

        return SyncTasks.all(promises).then(childCandidates => {
            const candidates = this._candidates;
            this._candidates = [];

            for (let i = 0; i < childCandidates.length; i++) {
                const candidate = childCandidates[i];

                if (candidate) {
                    candidates.push(candidate);
                }
            }

            return FocusArbitratorProvider._arbitrate(candidates, this._arbitratorCallback);
        });
    }

    private _requestFocus(component: FocusCandidateComponent, focus: () => void,
        isAvailable: () => boolean, type: FocusCandidateType): void {

        const accessibilityId = component.props && component.props.accessibilityId;

        this._candidates.push({
            component,
            focus,
            isAvailable,
            type,
            accessibilityId
        });

        this._notifyParent();
    }

    private static _arbitrate(candidates: FocusCandidateInternal[],
            arbitrator?: Types.FocusArbitrator): SyncTasks.Promise<FocusCandidateInternal | undefined> {
        // Filtering out everything which is already unmounted.
        candidates = candidates.filter(item => item.isAvailable());

        if (!_sortAndFilter) {
            return SyncTasks.Rejected('Sort function is not defined');
        }

        return _sortAndFilter(candidates).then(sortedCandidates => {
            sortedCandidates = sortedCandidates.filter(item => item.isAvailable());

            for (let i = 0; i < sortedCandidates.length; i++) {
                if (sortedCandidates[i].type === FocusCandidateType.FocusFirst) {
                    return sortedCandidates[i];
                }
            }

            if (arbitrator) {
                // There is an application specified focus arbitrator.
                const toArbitrate: Types.FocusCandidate[] = [];

                sortedCandidates.forEach(candidate => {
                    const component = candidate.component as any;

                    // Make sure to pass FocusableComponents only.
                    if (component.focus && component.blur && component.requestFocus) {
                        component.__focusCandidateInternal = candidate;

                        toArbitrate.push({
                            component,
                            accessibilityId: candidate.accessibilityId
                        });
                    }
                });

                if (toArbitrate.length) {
                    const candidate = arbitrator(toArbitrate);
                    let ret: FocusCandidateInternal | undefined;

                    if (candidate && candidate.component && (candidate.component as any).__focusCandidateInternal) {
                        ret = (candidate.component as any).__focusCandidateInternal as FocusCandidateInternal;
                    }

                    toArbitrate.forEach(candidate => {
                        delete (candidate.component as any).__focusCandidateInternal;
                    });

                    return ret;
                }
            }

            return sortedCandidates[sortedCandidates.length - 1];
        });
    }

    setCallback(arbitrator?: Types.FocusArbitrator) {
        this._arbitratorCallback = arbitrator;
    }

    static requestFocus(component: FocusCandidateComponent | SyncTasks.Promise<FocusCandidateComponent | undefined>, focus: () => void,
            isAvailable: () => boolean, type?: FocusCandidateType): void {

        if (_autoFocusTimer) {
            clearTimeout(_autoFocusTimer);
        }

        if (_runAfterArbitrationTimer) {
            clearTimeout(_runAfterArbitrationTimer);
            _runAfterArbitrationTimer = undefined;
        }

        let promise: SyncTasks.Promise<FocusCandidateComponent | undefined>;

        if (typeof (component as any).then === 'function') {
            promise = component as SyncTasks.Promise<FocusCandidateComponent | undefined>;
        } else {
            promise = SyncTasks.Resolved<FocusCandidateComponent>(component as FocusCandidateComponent);
        }

        _requestFocusQueue.push(promise.then((c: FocusCandidateComponent | undefined) => () => {
            if (c) {
                const focusArbitratorProvider: FocusArbitratorProvider =
                    (((c as any)._focusArbitratorProvider instanceof FocusArbitratorProvider) &&
                    (c as any)._focusArbitratorProvider) ||
                    (c.context && c.context.focusArbitrator) ||
                    _rootFocusArbitratorProvider;

                focusArbitratorProvider._requestFocus(c, focus, isAvailable, type || FocusCandidateType.Focus);
            }
        }));

        _autoFocusTimer = setTimeout(() => {
            _autoFocusTimer = undefined;

            const curArbitrateId = ++_arbitrateId;

            SyncTasks.all(_requestFocusQueue).then(queue => {
                if (curArbitrateId !== _arbitrateId) {
                    return;
                }

                for (let i = 0; i < queue.length; i++) {
                    queue[i]();
                }

                _rootFocusArbitratorProvider._arbitrate().then(candidate => {
                    if (curArbitrateId !== _arbitrateId) {
                        return;
                    }

                    if (candidate) {
                        candidate.focus();
                    }

                    _runAfterArbitration();
                });
            }).catch(err => {
                if (AppConfig.isDevelopmentMode()) {
                    console.error('FocusArbitratorProvider: something went wrong', err);
                }
            });

            _requestFocusQueue = [];
        }, _arbitrateTimeout);
    }
}

_rootFocusArbitratorProvider = new FocusArbitratorProvider();
