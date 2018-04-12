"use strict";
/**
* PopupContainerView.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* The view containing the Popup to show. This view does its own position
* calculation on rendering as directed by position instructions received
* through properties.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("./lodashMini");
var assert = require("assert");
var React = require("react");
var RN = require("react-native");
var International_1 = require("./International");
// Width of the "alley" around popups so they don't get too close to the boundary of the screen boundary.
var ALLEY_WIDTH = 2;
// How close to the edge of the popup should we allow the anchor offset to get before
// attempting a different position?
var MIN_ANCHOR_OFFSET = 16;
var PopupContainerView = /** @class */ (function (_super) {
    __extends(PopupContainerView, _super);
    function PopupContainerView(props) {
        var _this = _super.call(this, props) || this;
        _this._mountedComponent = null;
        _this._viewHandle = null;
        _this._onMount = function (component) {
            _this._mountedComponent = component;
        };
        _this.state = _this._getInitialState();
        return _this;
    }
    PopupContainerView.prototype._getInitialState = function () {
        return {
            isMeasuringPopup: true,
            anchorPosition: 'left',
            anchorOffset: 0,
            popupY: 0,
            popupX: 0,
            popupWidth: 0,
            popupHeight: 0,
            constrainedPopupWidth: 0,
            constrainedPopupHeight: 0
        };
    };
    PopupContainerView.prototype.componentWillReceiveProps = function (prevProps) {
        if (this.props.popupOptions !== prevProps.popupOptions) {
            // If the popup changes, reset our state.
            this.setState(this._getInitialState());
        }
    };
    PopupContainerView.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.popupOptions && !this.props.hidden) {
            this._recalcPosition();
            if (!this._respositionPopupTimer) {
                this._startRepositionPopupTimer();
            }
        }
        else {
            this._stopRepositionPopupTimer();
        }
    };
    PopupContainerView.prototype.componentDidMount = function () {
        this._viewHandle = RN.findNodeHandle(this._mountedComponent);
        if (this.props.popupOptions && !this.props.hidden) {
            this._recalcPosition();
            this._startRepositionPopupTimer();
        }
    };
    PopupContainerView.prototype.componentWillUnmount = function () {
        this._stopRepositionPopupTimer();
    };
    PopupContainerView.prototype.render = function () {
        var popupView = (this.props.hidden ?
            this.props.popupOptions.renderPopup('top', 0, 0, 0) :
            this.props.popupOptions.renderPopup(this.state.anchorPosition, this.state.anchorOffset, this.state.constrainedPopupWidth, this.state.constrainedPopupHeight));
        var isRTL = International_1.default.isRTL();
        var style = {
            position: 'absolute',
            top: this.state.popupY,
            right: isRTL ? this.state.popupX : undefined,
            left: !isRTL ? this.state.popupX : undefined,
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
            opacity: this.state.isMeasuringPopup ? 0 : 1,
            overflow: 'visible'
        };
        return (React.createElement(RN.View, { style: style, ref: this.props.hidden ? undefined : this._onMount }, popupView));
    };
    PopupContainerView.prototype._recalcPosition = function () {
        var _this = this;
        if (!this._mountedComponent) {
            return;
        }
        assert.ok(!!this.props.anchorHandle);
        RN.NativeModules.UIManager.measureInWindow(this.props.anchorHandle, function (x, y, width, height) {
            if (!_this._mountedComponent) {
                return;
            }
            assert.ok(!!_this._viewHandle);
            var anchorRect = {
                left: x, top: y, right: x + width, bottom: y + height,
                width: width, height: height
            };
            RN.NativeModules.UIManager.measureInWindow(_this._viewHandle, function (x, y, width, height) {
                var popupRect = {
                    left: x, top: y, right: x + width, bottom: y + height,
                    width: width, height: height
                };
                _this._recalcPositionFromLayoutData(anchorRect, popupRect);
            });
        });
    };
    PopupContainerView.prototype._recalcPositionFromLayoutData = function (anchorRect, popupRect) {
        // If the popup hasn't been rendered yet, skip.
        if (popupRect.width > 0 && popupRect.height > 0) {
            // Make a copy of the old state.
            var newState_1 = _.extend({}, this.state);
            if (this.state.isMeasuringPopup) {
                newState_1.isMeasuringPopup = false;
                newState_1.popupWidth = popupRect.width;
                newState_1.popupHeight = popupRect.height;
            }
            // If the anchor has disappeared, dismiss the popup.
            if (!(anchorRect.width > 0 && anchorRect.height > 0)) {
                this._dismissPopup();
                return;
            }
            // Start by assuming that we'll be unconstrained.
            newState_1.constrainedPopupHeight = newState_1.popupHeight;
            newState_1.constrainedPopupWidth = newState_1.popupWidth;
            // Get the width/height of the full window.
            var window_1 = RN.Dimensions.get('window');
            var windowWidth_1 = window_1.width;
            var windowHeight_1 = window_1.height;
            // If the anchor is no longer in the window's bounds, cancel the popup.
            if (anchorRect.left >= windowWidth_1 || anchorRect.right <= 0 ||
                anchorRect.bottom <= 0 || anchorRect.top >= windowHeight_1) {
                this._dismissPopup();
                return;
            }
            var positionsToTry = this.props.popupOptions.positionPriorities;
            if (!positionsToTry || positionsToTry.length === 0) {
                positionsToTry = ['bottom', 'right', 'top', 'left'];
            }
            if (this.props.popupOptions.useInnerPositioning) {
                // If the popup is meant to be shown inside the anchor we need to recalculate
                // the position differently.
                this._recalcInnerPosition(anchorRect, newState_1);
                return;
            }
            var foundPerfectFit_1 = false;
            var foundPartialFit_1 = false;
            positionsToTry.forEach(function (pos) {
                if (!foundPerfectFit_1) {
                    var absX = 0;
                    var absY = 0;
                    var anchorOffset = 0;
                    var constrainedWidth = 0;
                    var constrainedHeight = 0;
                    switch (pos) {
                        case 'bottom':
                            absY = anchorRect.bottom;
                            absX = anchorRect.left + (anchorRect.width - newState_1.popupWidth) / 2;
                            anchorOffset = newState_1.popupWidth / 2;
                            if (newState_1.popupHeight <= windowHeight_1 - ALLEY_WIDTH - anchorRect.bottom) {
                                foundPerfectFit_1 = true;
                            }
                            else if (!foundPartialFit_1) {
                                constrainedHeight = windowHeight_1 - ALLEY_WIDTH - anchorRect.bottom;
                            }
                            break;
                        case 'top':
                            absY = anchorRect.top - newState_1.popupHeight;
                            absX = anchorRect.left + (anchorRect.width - newState_1.popupWidth) / 2;
                            anchorOffset = newState_1.popupWidth / 2;
                            if (newState_1.popupHeight <= anchorRect.top - ALLEY_WIDTH) {
                                foundPerfectFit_1 = true;
                            }
                            else if (!foundPartialFit_1) {
                                constrainedHeight = anchorRect.top - ALLEY_WIDTH;
                            }
                            break;
                        case 'right':
                            absX = anchorRect.right;
                            absY = anchorRect.top + (anchorRect.height - newState_1.popupHeight) / 2;
                            anchorOffset = newState_1.popupHeight / 2;
                            if (newState_1.popupWidth <= windowWidth_1 - ALLEY_WIDTH - anchorRect.right) {
                                foundPerfectFit_1 = true;
                            }
                            else if (!foundPartialFit_1) {
                                constrainedWidth = windowWidth_1 - ALLEY_WIDTH - anchorRect.right;
                            }
                            break;
                        case 'left':
                            absX = anchorRect.left - newState_1.popupWidth;
                            absY = anchorRect.top + (anchorRect.height - newState_1.popupHeight) / 2;
                            anchorOffset = newState_1.popupHeight / 2;
                            if (newState_1.popupWidth <= anchorRect.left - ALLEY_WIDTH) {
                                foundPerfectFit_1 = true;
                            }
                            else if (!foundPartialFit_1) {
                                constrainedWidth = anchorRect.left - ALLEY_WIDTH;
                            }
                            break;
                    }
                    var effectiveWidth = constrainedWidth || newState_1.popupWidth;
                    var effectiveHeight = constrainedHeight || newState_1.popupHeight;
                    // Make sure we're not hanging off the bounds of the window.
                    if (absX < ALLEY_WIDTH) {
                        if (pos === 'top' || pos === 'bottom') {
                            anchorOffset -= ALLEY_WIDTH - absX;
                            if (anchorOffset < MIN_ANCHOR_OFFSET || anchorOffset > effectiveWidth - MIN_ANCHOR_OFFSET) {
                                foundPerfectFit_1 = false;
                            }
                        }
                        absX = ALLEY_WIDTH;
                    }
                    else if (absX > windowWidth_1 - ALLEY_WIDTH - effectiveWidth) {
                        if (pos === 'top' || pos === 'bottom') {
                            anchorOffset -= (windowWidth_1 - ALLEY_WIDTH - effectiveWidth - absX);
                            if (anchorOffset < MIN_ANCHOR_OFFSET || anchorOffset > effectiveWidth - MIN_ANCHOR_OFFSET) {
                                foundPerfectFit_1 = false;
                            }
                        }
                        absX = windowWidth_1 - ALLEY_WIDTH - effectiveWidth;
                    }
                    if (absY < ALLEY_WIDTH) {
                        if (pos === 'right' || pos === 'left') {
                            anchorOffset += absY - ALLEY_WIDTH;
                            if (anchorOffset < MIN_ANCHOR_OFFSET || anchorOffset > effectiveHeight - MIN_ANCHOR_OFFSET) {
                                foundPerfectFit_1 = false;
                            }
                        }
                        absY = ALLEY_WIDTH;
                    }
                    else if (absY > windowHeight_1 - ALLEY_WIDTH - effectiveHeight) {
                        if (pos === 'right' || pos === 'left') {
                            anchorOffset -= (windowHeight_1 - ALLEY_WIDTH - effectiveHeight - absY);
                            if (anchorOffset < MIN_ANCHOR_OFFSET || anchorOffset > effectiveHeight - MIN_ANCHOR_OFFSET) {
                                foundPerfectFit_1 = false;
                            }
                        }
                        absY = windowHeight_1 - ALLEY_WIDTH - effectiveHeight;
                    }
                    if (foundPerfectFit_1 || effectiveHeight > 0 || effectiveWidth > 0) {
                        newState_1.popupY = absY;
                        newState_1.popupX = absX;
                        newState_1.anchorOffset = anchorOffset;
                        newState_1.anchorPosition = pos;
                        newState_1.constrainedPopupWidth = effectiveWidth;
                        newState_1.constrainedPopupHeight = effectiveHeight;
                        foundPartialFit_1 = true;
                    }
                }
            });
            if (!_.isEqual(newState_1, this.state)) {
                this.setState(newState_1);
            }
        }
    };
    PopupContainerView.prototype._recalcInnerPosition = function (anchorRect, newState) {
        // For inner popups we only accept the first position of the priorities since there should always be room for the bubble.
        var pos = this.props.popupOptions.positionPriorities[0];
        switch (pos) {
            case 'top':
                newState.popupY = anchorRect.top + anchorRect.height - newState.constrainedPopupHeight;
                newState.popupX = anchorRect.left + anchorRect.height / 2 - newState.constrainedPopupWidth / 2;
                newState.anchorOffset = newState.popupWidth / 2;
                break;
            case 'bottom':
                newState.popupY = anchorRect.top + newState.constrainedPopupHeight;
                newState.popupX = anchorRect.left + anchorRect.height / 2 - newState.constrainedPopupWidth / 2;
                newState.anchorOffset = newState.popupWidth / 2;
                break;
            case 'left':
                newState.popupY = anchorRect.top + anchorRect.height / 2 - newState.constrainedPopupHeight / 2;
                newState.popupX = anchorRect.left + anchorRect.width - newState.constrainedPopupWidth;
                newState.anchorOffset = newState.popupHeight / 2;
                break;
            case 'right':
                newState.popupY = anchorRect.top + anchorRect.height / 2 - newState.constrainedPopupHeight / 2;
                newState.popupX = anchorRect.left;
                newState.anchorOffset = newState.popupHeight / 2;
                break;
        }
        newState.anchorPosition = pos;
        if (!_.isEqual(newState, this.state)) {
            this.setState(newState);
        }
    };
    PopupContainerView.prototype._dismissPopup = function () {
        if (this.props.onDismissPopup) {
            this.props.onDismissPopup();
        }
    };
    PopupContainerView.prototype._startRepositionPopupTimer = function () {
        var _this = this;
        this._respositionPopupTimer = setInterval(function () {
            _this._recalcPosition();
        }, 1000);
    };
    PopupContainerView.prototype._stopRepositionPopupTimer = function () {
        if (this._respositionPopupTimer) {
            clearInterval(this._respositionPopupTimer);
            this._respositionPopupTimer = undefined;
        }
    };
    return PopupContainerView;
}(React.Component));
exports.PopupContainerView = PopupContainerView;
exports.default = PopupContainerView;
