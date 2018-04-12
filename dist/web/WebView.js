"use strict";
/**
* WebView.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* A control that allows the display of an independent web page.
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
var React = require("react");
var RX = require("../common/Interfaces");
var Styles_1 = require("./Styles");
var Types = require("../common/Types");
var View_1 = require("./View");
var _styles = {
    webViewDefault: Styles_1.default.createWebViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        borderStyle: 'none'
    }),
    webViewContainer: Styles_1.default.createViewStyle({
        flexDirection: 'column',
        flex: 1,
        alignSelf: 'stretch'
    })
};
var WebView = /** @class */ (function (_super) {
    __extends(WebView, _super);
    function WebView(props) {
        var _this = _super.call(this, props) || this;
        _this._mountedComponent = null;
        _this._onMount = function (component) {
            _this._mountedComponent = component;
        };
        _this._onLoad = function (e) {
            if (_this.props.onLoad) {
                _this.props.onLoad(e);
            }
        };
        _this._sandboxToStringValue = function (sandbox) {
            var values = [];
            if (sandbox & Types.WebViewSandboxMode.AllowForms) {
                values.push('allow-forms');
            }
            if (sandbox & Types.WebViewSandboxMode.AllowModals) {
                values.push('allow-modals');
            }
            if (sandbox & Types.WebViewSandboxMode.AllowOrientationLock) {
                values.push('allow-orientation-lock');
            }
            if (sandbox & Types.WebViewSandboxMode.AllowPointerLock) {
                values.push('allow-pointer-lock');
            }
            if (sandbox & Types.WebViewSandboxMode.AllowPopups) {
                values.push('allow-popups');
            }
            if (sandbox & Types.WebViewSandboxMode.AllowPopupsToEscapeSandbox) {
                values.push('allow-popups-to-escape-sandbox');
            }
            if (sandbox & Types.WebViewSandboxMode.AllowPresentation) {
                values.push('allow-presentation');
            }
            if (sandbox & Types.WebViewSandboxMode.AllowSameOrigin) {
                values.push('allow-same-origin');
            }
            if (sandbox & Types.WebViewSandboxMode.AllowScripts) {
                values.push('allow-scripts');
            }
            if (sandbox & Types.WebViewSandboxMode.AllowTopNavigation) {
                values.push('allow-top-navigation');
            }
            return values.join(' ');
        };
        _this.state = {
            postComplete: false,
            webFormIdentifier: "form" + WebView._webFrameNumber,
            webFrameIdentifier: "frame" + WebView._webFrameNumber
        };
        WebView._webFrameNumber++;
        return _this;
    }
    WebView.prototype.componentDidMount = function () {
        this._postRender();
        var customContents = this._getCustomHtml(this.props);
        if (customContents) {
            this._setContents(customContents);
        }
    };
    WebView.prototype.componentDidUpdate = function (prevProps, prevState) {
        this._postRender();
        var oldCustomContents = this._getCustomHtml(prevProps);
        var newCustomContents = this._getCustomHtml(this.props);
        if (newCustomContents) {
            if (oldCustomContents !== newCustomContents) {
                this._setContents(newCustomContents);
            }
        }
    };
    WebView.prototype.componentWillUnmount = function () {
        if (this._onMessageReceivedToken) {
            this._onMessageReceivedToken.unsubscribe();
            this._onMessageReceivedToken = undefined;
        }
    };
    WebView.prototype._getCustomHtml = function (props) {
        if (props.url || !props.source) {
            return undefined;
        }
        return props.source.html;
    };
    WebView.prototype._setContents = function (html) {
        var iframeDOM = this._mountedComponent;
        if (iframeDOM && iframeDOM.contentWindow) {
            try {
                // Some older browsers don't support this, so
                // be prepared to catch an exception.
                iframeDOM.srcdoc = html;
            }
            catch (_a) {
                // Swallow exceptions
            }
        }
    };
    WebView.prototype._installMessageListener = function () {
        var _this = this;
        // Don't install global message listener twice.
        if (!WebView._messageListenerInstalled) {
            // Set up the global event.
            WebView._onMessageReceived = new RX.Types.SubscribableEvent(true);
            window.addEventListener('message', function (e) {
                var event = {
                    data: e.data,
                    origin: e.origin,
                    nativeEvent: e,
                    bubbles: e.bubbles,
                    cancelable: e.cancelable,
                    defaultPrevented: e.defaultPrevented,
                    __propagationStopped: false,
                    stopPropagation: function () {
                        e.stopPropagation();
                        event.__propagationStopped = true;
                    },
                    preventDefault: function () {
                        e.preventDefault();
                    },
                    timeStamp: e.timeStamp
                };
                WebView._onMessageReceived.fire(event);
            });
            WebView._messageListenerInstalled = true;
        }
        // Subscribe to the global event if we haven't already done so.
        if (!this._onMessageReceivedToken) {
            this._onMessageReceivedToken = WebView._onMessageReceived.subscribe(function (e) {
                if (_this.props.onMessage) {
                    _this.props.onMessage(e);
                    // Stop the event from propagating further.
                    return e.__propagationStopped;
                }
                return false;
            });
        }
    };
    WebView.prototype._postRender = function () {
        // If the caller wants to receive posted messages
        // from the web view, we need to install a global
        // message handler.
        if (this.props.onMessage) {
            this._installMessageListener();
        }
        if (!this.state.postComplete) {
            this.setState({
                postComplete: true
            });
        }
    };
    WebView.prototype.render = function () {
        var styles = Styles_1.default.combine([_styles.webViewDefault, this.props.style]);
        var sandbox = this.props.sandbox !== undefined
            ? this.props.sandbox
            : (this.props.javaScriptEnabled ? Types.WebViewSandboxMode.AllowScripts : Types.WebViewSandboxMode.None);
        // width 100% is needed for Edge - it doesn't grow iframe. Resize needs to be done with wrapper
        return (React.createElement(View_1.View, { style: _styles.webViewContainer },
            React.createElement("iframe", { ref: this._onMount, name: this.state.webFrameIdentifier, id: this.state.webFrameIdentifier, style: styles, src: this.props.url, onLoad: this._onLoad, sandbox: this._sandboxToStringValue(sandbox), width: '100%' })));
    };
    WebView.prototype.postMessage = function (message, targetOrigin) {
        if (targetOrigin === void 0) { targetOrigin = '*'; }
        var iframeDOM = this._mountedComponent;
        if (iframeDOM && iframeDOM.contentWindow) {
            iframeDOM.contentWindow.postMessage(message, targetOrigin);
        }
    };
    WebView.prototype.reload = function () {
        var iframeDOM = this._mountedComponent;
        if (iframeDOM && iframeDOM.contentWindow) {
            iframeDOM.contentWindow.location.reload(true);
        }
    };
    WebView.prototype.goBack = function () {
        var iframeDOM = this._mountedComponent;
        if (iframeDOM && iframeDOM.contentWindow) {
            iframeDOM.contentWindow.history.back();
        }
    };
    WebView.prototype.goForward = function () {
        var iframeDOM = this._mountedComponent;
        if (iframeDOM && iframeDOM.contentWindow) {
            iframeDOM.contentWindow.history.forward();
        }
    };
    WebView._webFrameNumber = 1;
    WebView._messageListenerInstalled = false;
    return WebView;
}(RX.ViewBase));
exports.WebView = WebView;
exports.default = WebView;
