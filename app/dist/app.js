/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([494,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 1000:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var util_1 = __webpack_require__(90);
__webpack_require__(1001);
/**
 * @file 状态栏
 */
var PubSub = __webpack_require__(469);
var Status = /** @class */ (function (_super) {
    __extends(Status, _super);
    function Status() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            codeStatus: 'normal',
            file: null
        };
        return _this;
    }
    Status.getDerivedStateFromProps = function (props, state) {
        return {
            file: state.file || props.file
        };
    };
    Status.prototype.componentDidMount = function () {
        var _this = this;
        // out of react transaction
        PubSub.subscribe('code-edit', function () {
            if (_this.state.codeStatus == 'normal') {
                _this.setState({ codeStatus: 'edit' });
                console.log(2);
            }
        });
        PubSub.subscribe('code-save', function () { return _this.setState({ codeStatus: 'normal' }); });
        PubSub.subscribe('code-load', function () { return _this.setState({ codeStatus: 'normal' }); });
    };
    Status.prototype.componentWillUnmount = function () {
        PubSub.clearAllSubscriptions();
    };
    Status.prototype.acceptFile = function (file) {
        this.setState({ file: file });
    };
    Status.prototype.render = function () {
        var project = this.props.project;
        var _a = this.state, codeStatus = _a.codeStatus, file = _a.file;
        var type = '--';
        var path = '--';
        if (file) {
            path = file.path;
            type = util_1.default.getFileType(path);
        }
        return (React.createElement("div", { className: 'mf-status' },
            React.createElement("div", { className: 'mf-status-file' },
                React.createElement("img", { src: util_1.default.getFilePath('/assets/img/status-logo.svg') }),
                React.createElement("em", null, project ? project.name : '--'),
                React.createElement("span", null, path),
                codeStatus == 'edit' ? React.createElement("span", { className: 'mf-status-todo' }) : null),
            React.createElement("div", { className: 'mf-status-type' },
                React.createElement("em", null, "UTF-8"),
                React.createElement("span", null, type))));
    };
    return Status;
}(React.PureComponent));
exports.default = Status;


/***/ }),

/***/ 1001:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(45);
            var content = __webpack_require__(1002);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ 1002:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(46);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".mf-status {\n  position: relative;\n  height: 40px;\n  line-height: 40px;\n  color: #909090;\n}\n.mf-status .mf-status-file {\n  position: absolute;\n  left: 15px;\n}\n.mf-status .mf-status-file img {\n  width: 20px;\n  height: 20px;\n  margin-right: 5px;\n}\n.mf-status .mf-status-file em {\n  margin-right: 20px;\n  font-weight: 700;\n}\n.mf-status .mf-status-type {\n  position: absolute;\n  right: 15px;\n}\n.mf-status .mf-status-type em {\n  margin-right: 20px;\n}\n.mf-status .mf-status-todo {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  border-radius: 5px;\n  margin-left: 10px;\n  vertical-align: -1px;\n  background: #9d9d9d;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1003:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_dom_1 = __webpack_require__(9);
var antd_1 = __webpack_require__(109);
var react_redux_1 = __webpack_require__(137);
var redux_1 = __webpack_require__(110);
var react_contextmenu_1 = __webpack_require__(1013);
var action_1 = __webpack_require__(142);
var file_1 = __webpack_require__(66);
__webpack_require__(1004);
/**
 * @file context menu
 */
var MfMenu = /** @class */ (function (_super) {
    __extends(MfMenu, _super);
    function MfMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            path: null,
            visible: false,
            pos: null,
            action: null
        };
        _this.clickHandle = function (elem, data) {
            console.log(data);
        };
        /**
         * 添加文件
         */
        _this.addHandle = function (elem, data) {
            _this.setState({ visible: true, action: data.type });
        };
        _this.showModal = function () {
            _this.setState({ visible: true });
        };
        _this.hideModal = function () {
            _this.setState({ visible: false, action: null });
        };
        /**
         * 处理 add 指令
         */
        _this.doAddHandle = function () {
            var _a = _this.state, path = _a.path, action = _a.action;
            var node = react_dom_1.findDOMNode(_this.refs.finput);
            var name = node.value.replace(/\s/g, '');
            if (!name) {
                return _this.hideModal();
            }
            var flag = action == 'add1' ? 1 : 2;
            // 如果点击的是文件，修复 path
            if (/[^.]+\.[a-zA-Z]+/.test(path)) {
                path = path.replace(/[^./]+\..+/, '');
            }
            path = path.replace('/$', '');
            var res = file_1.default.mknew(path + "/" + name, flag);
            if (res.code == -1) {
                antd_1.Modal.error({ title: res.msg });
            }
            else {
                _this.refreshExplore();
                _this.hideModal();
            }
        };
        /**
         * 删除文件 & 目录
         */
        _this.delHandle = function () {
            var path = _this.state.path;
            var res = file_1.default.rm(path);
            if (res.code == -1) {
                antd_1.Modal.error({ title: res.msg });
            }
            else {
                _this.refreshExplore();
            }
        };
        /**
         * 前插右键事件
         */
        _this.onContextMenu = function (e) {
            var state = _this.state;
            var elem = e.target;
            var path = elem.getAttribute('data-path');
            state.path = path;
            state.pos = { left: e.clientX, top: e.clientY };
            if (!path) {
                e.stopPropagation();
            }
        };
        return _this;
    }
    MfMenu.prototype.refreshExplore = function () {
        var _a = this.props, initFileAction = _a.initFileAction, project = _a.project;
        initFileAction(project.path);
    };
    MfMenu.prototype.render = function () {
        var children = this.props.children;
        var _a = this.state, pos = _a.pos, visible = _a.visible;
        var parent = React.cloneElement(children, {
            onContextMenu: this.onContextMenu
        });
        return (React.createElement("div", { className: 'mf-contextmenu' },
            React.createElement(react_contextmenu_1.ContextMenuTrigger, { id: 'mf-contextmenu-id' }, parent),
            React.createElement(react_contextmenu_1.ContextMenu, { id: 'mf-contextmenu-id' },
                React.createElement(react_contextmenu_1.MenuItem, { data: { type: 'finder' }, onClick: this.clickHandle, disabled: true }, "\u5728 Finder \u4E2D\u663E\u793A"),
                React.createElement(react_contextmenu_1.MenuItem, { data: { type: 'code' }, onClick: this.clickHandle }, "\u5728\u7F16\u8F91\u5668\u4E2D\u6253\u5F00"),
                React.createElement(react_contextmenu_1.MenuItem, { data: { type: 'iterm' }, onClick: this.clickHandle, disabled: true }, "\u5728\u7EC8\u7AEF\u4E2D\u6253\u5F00"),
                React.createElement(react_contextmenu_1.MenuItem, { divider: true }),
                React.createElement(react_contextmenu_1.MenuItem, { data: { type: 'add1' }, onClick: this.addHandle }, "\u65B0\u5EFA\u6587\u4EF6"),
                React.createElement(react_contextmenu_1.MenuItem, { data: { type: 'add2' }, onClick: this.addHandle }, "\u65B0\u5EFA\u76EE\u5F55"),
                React.createElement(react_contextmenu_1.MenuItem, { data: { type: 'rename' }, onClick: this.clickHandle, disabled: true }, "\u91CD\u547D\u540D"),
                React.createElement(react_contextmenu_1.MenuItem, { divider: true }),
                React.createElement(react_contextmenu_1.MenuItem, { data: { type: 'del' }, onClick: this.delHandle }, "\u5220\u9664")),
            React.createElement(antd_1.Modal, { className: 'mf-filemodal', style: pos, closable: false, visible: visible, onOk: this.doAddHandle, onCancel: this.hideModal, mask: false },
                React.createElement(antd_1.Input, { ref: 'finput', autoFocus: true }))));
    };
    return MfMenu;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        project: state.project
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        initFileAction: redux_1.bindActionCreators(action_1.default.initFile, dispatch)
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MfMenu);


/***/ }),

/***/ 1004:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(45);
            var content = __webpack_require__(1005);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ 1005:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(46);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/** context-menu style */\n.mf-contextmenu .react-contextmenu {\n  min-width: 160px;\n  padding: 5px 0;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  margin: 2px 0 0;\n  font-size: 12px;\n  text-align: left;\n  background-color: #d0d0d0;\n  background-clip: padding-box;\n  color: #373a3c;\n  outline: none;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 250ms ease !important;\n}\n.mf-contextmenu .react-contextmenu.react-contextmenu--visible {\n  opacity: 1;\n  pointer-events: auto;\n  z-index: 9999;\n}\n.mf-contextmenu .react-contextmenu-item {\n  padding: 3px 20px;\n  border: 0;\n  line-height: 1.5;\n  font-weight: 400;\n  text-align: inherit;\n  background: 0 0;\n  color: #373a3c;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.mf-contextmenu .react-contextmenu-item.react-contextmenu-item--active,\n.mf-contextmenu .react-contextmenu-item.react-contextmenu-item--selected {\n  color: #fff;\n  background-color: #0a8ff5;\n  border-color: #0a8ff5;\n  text-decoration: none;\n}\n.mf-contextmenu .react-contextmenu-item.react-contextmenu-item--disabled,\n.mf-contextmenu .react-contextmenu-item.react-contextmenu-item--disabled:hover {\n  background-color: transparent;\n  border-color: rgba(0, 0, 0, 0.15);\n  color: #878a8c;\n}\n.mf-contextmenu .react-contextmenu-item--divider {\n  padding: 2px 0;\n  margin-bottom: 3px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.15);\n  cursor: inherit;\n}\n.mf-contextmenu .react-contextmenu-item--divider:hover {\n  background-color: transparent;\n  border-color: rgba(0, 0, 0, 0.15);\n}\n.mf-contextmenu .react-contextmenu-item.react-contextmenu-submenu {\n  padding: 0;\n}\n.mf-contextmenu .react-contextmenu-item.react-contextmenu-submenu > .react-contextmenu-item:after {\n  content: '▶';\n  display: inline-block;\n  position: absolute;\n  right: 7px;\n}\n.mf-contextmenu .example-multiple-targets::after {\n  content: attr(data-count);\n  display: block;\n}\n.mf-filemodal {\n  width: 200px !important;\n  margin: 0 !important;\n}\n.mf-filemodal .ant-modal-body {\n  padding: 10px;\n}\n.mf-filemodal .ant-modal-footer {\n  padding: 10px;\n}\n.mf-filemodal .ant-btn {\n  font-size: 12px;\n  line-height: 28px;\n  height: 28px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1006:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(45);
            var content = __webpack_require__(1007);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ 1007:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(46);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/** home console */\n.mf-home {\n  height: 100vh;\n}\n.mf-home .ant-layout-footer {\n  height: 60px;\n}\n.mf-home .ant-layout-sider {\n  padding-top: 5px;\n  background: #272727;\n  -webkit-user-select: none;\n}\n.mf-home .ant-layout-sider .ant-tree li .ant-tree-node-content-wrapper {\n  padding: 0 8px 0 5px;\n  color: #fff;\n}\n.mf-home .ant-layout-sider .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {\n  background: #444;\n  color: #e2c08d;\n}\n.mf-home .ant-layout-sider .ant-tree li .ant-tree-node-content-wrapper:hover {\n  background: #444;\n}\n.mf-home .ant-layout-sider .ant-tree li span.ant-tree-iconEle {\n  margin-right: 5px;\n}\n.mf-home .ant-layout-content {\n  padding-top: 10px;\n  background: #263238;\n  color: #fff;\n}\n.mf-home .mf-info {\n  padding: 10px 0;\n  font-weight: 600;\n  font-size: 16px;\n  text-align: center;\n}\n.mf-home .mf-info button {\n  margin-left: 10px;\n  font-size: 12px;\n}\n.mf-home .mf-filelist {\n  position: relative;\n  min-height: 400px;\n  text-align: left;\n}\n.mf-home .mf-filelist .anticon-caret-down {\n  color: #fff;\n}\n.mf-home .mf-footer {\n  padding: 0;\n  height: 40px;\n  background: #202020;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1008:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
__webpack_require__(1009);
/**
 * @file 错误边界
 */
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { hasError: false, e: null };
        return _this;
    }
    ErrorBoundary.getDerivedStateFromError = function (e) {
        return { hasError: true, e: e };
    };
    ErrorBoundary.prototype.render = function () {
        var children = this.props.children;
        var _a = this.state, hasError = _a.hasError, e = _a.e;
        return hasError ? (React.createElement("div", { className: 'mf-error' },
            React.createElement("h1", null, "app exception"),
            React.createElement("p", null, e.message))) : (children);
    };
    return ErrorBoundary;
}(React.Component));
exports.default = ErrorBoundary;


/***/ }),

/***/ 1009:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(45);
            var content = __webpack_require__(1010);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ 1010:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(46);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".mf-error {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  height: 100vh;\n}\n.mf-error p {\n  font-size: 18px;\n  color: #f41e1e;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 112:
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ 113:
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ 136:
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = __webpack_require__(470);
var file_1 = __webpack_require__(66);
/**
 * @file home action
 */
var Project_Init = 'Project_Init';
var File_Int = 'File_Int';
exports.default = {
    types: {
        Project_Init: Project_Init,
        File_Int: File_Int
    },
    initProject: redux_actions_1.createAction(Project_Init),
    initFile: redux_actions_1.createAction(File_Int, function (path) {
        return file_1.default.findFiles(path);
    })
};


/***/ }),

/***/ 143:
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),

/***/ 217:
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ 460:
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ 494:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(9);
var router_1 = __webpack_require__(499);
/**
 * @file 控制台 app
 */
function render(App) {
    ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
}
render(router_1.default);
if (false) {}


/***/ }),

/***/ 499:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_redux_1 = __webpack_require__(137);
var react_router_1 = __webpack_require__(1015);
var store_1 = __webpack_require__(505);
var ide_1 = __webpack_require__(521);
var boundary_1 = __webpack_require__(1008);
__webpack_require__(1011);
/**
 * @file memory router from electron
 */
function default_1() {
    return (React.createElement(boundary_1.default, null,
        React.createElement(react_redux_1.Provider, { store: store_1.default },
            React.createElement(react_router_1.MemoryRouter, null,
                React.createElement(react_router_1.Route, { exact: true, path: '/', component: ide_1.default })))));
}
exports.default = default_1;


/***/ }),

/***/ 505:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(110);
var reducer_1 = __webpack_require__(506);
/**
 * @file home store
 */
var initState = {
    project: undefined,
    file: undefined
};
var reducers = redux_1.combineReducers({
    project: reducer_1.projectReducer,
    file: reducer_1.fileReducer
});
exports.default = redux_1.createStore(reducers, initState);


/***/ }),

/***/ 506:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = __webpack_require__(470);
var action_1 = __webpack_require__(142);
var file_1 = __webpack_require__(66);
/**
 * @file home reducer
 */
var types = action_1.default.types;
var pstate = file_1.default.readConfig();
var fstate = file_1.default.findFiles(pstate && pstate.path);
/**
 * 项目信息 reducer
 */
exports.projectReducer = redux_actions_1.handleActions((_a = {},
    _a[types.Project_Init] = function (state, action) {
        return action.payload || state;
    },
    _a), pstate);
/**
 * 文件处理 reducer
 */
exports.fileReducer = redux_actions_1.handleActions((_b = {},
    _b[types.File_Int] = function (state, action) {
        return action.payload || null;
    },
    _b), fstate);


/***/ }),

/***/ 521:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var antd_1 = __webpack_require__(109);
var react_redux_1 = __webpack_require__(137);
var operate_1 = __webpack_require__(844);
var fileIcon_1 = __webpack_require__(981);
var code_1 = __webpack_require__(990);
var status_1 = __webpack_require__(1000);
var menu_1 = __webpack_require__(1003);
var util_1 = __webpack_require__(90);
var file_1 = __webpack_require__(66);
__webpack_require__(1006);
/**
 * @file 控制台主窗口
 */
var Footer = antd_1.Layout.Footer, Sider = antd_1.Layout.Sider, Content = antd_1.Layout.Content;
var mapStateToProps = function (state) {
    return {
        project: state.project,
        file: state.file
    };
};
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            select: null,
            file: null,
            expandKeys: ['root']
        };
        /**
         * 选择文件更新 ide
         */
        _this.changeFileHandle = function (keys) {
            var _a = _this.props, project = _a.project, file = _a.file;
            var select = file.map[keys[0]];
            var code = _this.refs.code;
            var status = _this.refs.status;
            if (select && select.type == 'file') {
                // 将选中文件写入配置
                file_1.default.writeConfig(__assign(__assign({}, project), { entry: select.path }));
                code.acceptFile(select);
                status.acceptFile(select);
            }
        };
        /**
         * 记录展开的 keys
         */
        _this.setExpandHandle = function (keys) {
            _this.state.expandKeys = keys;
        };
        var win = util_1.default.getLocalWin();
        win && win.setSize(1600, 1000);
        return _this;
    }
    Home.getDerivedStateFromProps = function (props, state) {
        // props 引发更新，这里的 state 是 prevState
        var last = state.file;
        var next = props.file;
        return {
            file: props.file,
            select: last != next ? next.entry : state.select,
            expandKeys: state.expandKeys
        };
    };
    /**
     * 渲染资源管理树
     */
    Home.prototype.generateTree = function (list) {
        var _this = this;
        var TreeNode = antd_1.Tree.TreeNode;
        return list.map(function (item) {
            var customTitle = React.createElement("span", { "data-path": item.path }, item.title);
            if (item.children) {
                return (React.createElement(TreeNode, { icon: React.createElement(fileIcon_1.default, { file: item }), title: customTitle, key: item.key, selectable: false }, _this.generateTree(item.children)));
            }
            return React.createElement(TreeNode, { icon: React.createElement(fileIcon_1.default, { file: item }), key: item.key, title: customTitle });
        });
    };
    Home.prototype.render = function () {
        var _a = this.props, project = _a.project, file = _a.file;
        var _b = this.state, select = _b.select, expandKeys = _b.expandKeys;
        var fileList = file.list;
        var keys = expandKeys;
        return (React.createElement(antd_1.Layout, { className: 'mf-home' },
            React.createElement(antd_1.Layout, null,
                React.createElement(Sider, { width: '300' },
                    React.createElement("div", { className: 'mf-info' },
                        React.createElement(operate_1.default, { project: project, showLaunch: !fileList })),
                    React.createElement(menu_1.default, null,
                        React.createElement("div", { className: 'mf-filelist' }, fileList ? (React.createElement(antd_1.Tree, { key: Date.now(), defaultExpandedKeys: keys, defaultSelectedKeys: [select && select.key], showIcon: true, onSelect: this.changeFileHandle, onExpand: this.setExpandHandle }, this.generateTree(fileList))) : null))),
                React.createElement(Content, null,
                    React.createElement(code_1.default, { ref: 'code', file: select }))),
            React.createElement(Footer, { className: 'mf-footer' },
                React.createElement(status_1.default, { ref: "status", project: project, file: select }))));
    };
    return Home;
}(React.Component));
exports.default = react_redux_1.connect(mapStateToProps)(Home);


/***/ }),

/***/ 578:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 235,
	"./af.js": 235,
	"./ar": 236,
	"./ar-dz": 237,
	"./ar-dz.js": 237,
	"./ar-kw": 238,
	"./ar-kw.js": 238,
	"./ar-ly": 239,
	"./ar-ly.js": 239,
	"./ar-ma": 240,
	"./ar-ma.js": 240,
	"./ar-sa": 241,
	"./ar-sa.js": 241,
	"./ar-tn": 242,
	"./ar-tn.js": 242,
	"./ar.js": 236,
	"./az": 243,
	"./az.js": 243,
	"./be": 244,
	"./be.js": 244,
	"./bg": 245,
	"./bg.js": 245,
	"./bm": 246,
	"./bm.js": 246,
	"./bn": 247,
	"./bn.js": 247,
	"./bo": 248,
	"./bo.js": 248,
	"./br": 249,
	"./br.js": 249,
	"./bs": 250,
	"./bs.js": 250,
	"./ca": 251,
	"./ca.js": 251,
	"./cs": 252,
	"./cs.js": 252,
	"./cv": 253,
	"./cv.js": 253,
	"./cy": 254,
	"./cy.js": 254,
	"./da": 255,
	"./da.js": 255,
	"./de": 256,
	"./de-at": 257,
	"./de-at.js": 257,
	"./de-ch": 258,
	"./de-ch.js": 258,
	"./de.js": 256,
	"./dv": 259,
	"./dv.js": 259,
	"./el": 260,
	"./el.js": 260,
	"./en-SG": 261,
	"./en-SG.js": 261,
	"./en-au": 262,
	"./en-au.js": 262,
	"./en-ca": 263,
	"./en-ca.js": 263,
	"./en-gb": 264,
	"./en-gb.js": 264,
	"./en-ie": 265,
	"./en-ie.js": 265,
	"./en-il": 266,
	"./en-il.js": 266,
	"./en-nz": 267,
	"./en-nz.js": 267,
	"./eo": 268,
	"./eo.js": 268,
	"./es": 269,
	"./es-do": 270,
	"./es-do.js": 270,
	"./es-us": 271,
	"./es-us.js": 271,
	"./es.js": 269,
	"./et": 272,
	"./et.js": 272,
	"./eu": 273,
	"./eu.js": 273,
	"./fa": 274,
	"./fa.js": 274,
	"./fi": 275,
	"./fi.js": 275,
	"./fo": 276,
	"./fo.js": 276,
	"./fr": 277,
	"./fr-ca": 278,
	"./fr-ca.js": 278,
	"./fr-ch": 279,
	"./fr-ch.js": 279,
	"./fr.js": 277,
	"./fy": 280,
	"./fy.js": 280,
	"./ga": 281,
	"./ga.js": 281,
	"./gd": 282,
	"./gd.js": 282,
	"./gl": 283,
	"./gl.js": 283,
	"./gom-latn": 284,
	"./gom-latn.js": 284,
	"./gu": 285,
	"./gu.js": 285,
	"./he": 286,
	"./he.js": 286,
	"./hi": 287,
	"./hi.js": 287,
	"./hr": 288,
	"./hr.js": 288,
	"./hu": 289,
	"./hu.js": 289,
	"./hy-am": 290,
	"./hy-am.js": 290,
	"./id": 291,
	"./id.js": 291,
	"./is": 292,
	"./is.js": 292,
	"./it": 293,
	"./it-ch": 294,
	"./it-ch.js": 294,
	"./it.js": 293,
	"./ja": 295,
	"./ja.js": 295,
	"./jv": 296,
	"./jv.js": 296,
	"./ka": 297,
	"./ka.js": 297,
	"./kk": 298,
	"./kk.js": 298,
	"./km": 299,
	"./km.js": 299,
	"./kn": 300,
	"./kn.js": 300,
	"./ko": 301,
	"./ko.js": 301,
	"./ku": 302,
	"./ku.js": 302,
	"./ky": 303,
	"./ky.js": 303,
	"./lb": 304,
	"./lb.js": 304,
	"./lo": 305,
	"./lo.js": 305,
	"./lt": 306,
	"./lt.js": 306,
	"./lv": 307,
	"./lv.js": 307,
	"./me": 308,
	"./me.js": 308,
	"./mi": 309,
	"./mi.js": 309,
	"./mk": 310,
	"./mk.js": 310,
	"./ml": 311,
	"./ml.js": 311,
	"./mn": 312,
	"./mn.js": 312,
	"./mr": 313,
	"./mr.js": 313,
	"./ms": 314,
	"./ms-my": 315,
	"./ms-my.js": 315,
	"./ms.js": 314,
	"./mt": 316,
	"./mt.js": 316,
	"./my": 317,
	"./my.js": 317,
	"./nb": 318,
	"./nb.js": 318,
	"./ne": 319,
	"./ne.js": 319,
	"./nl": 320,
	"./nl-be": 321,
	"./nl-be.js": 321,
	"./nl.js": 320,
	"./nn": 322,
	"./nn.js": 322,
	"./pa-in": 323,
	"./pa-in.js": 323,
	"./pl": 324,
	"./pl.js": 324,
	"./pt": 325,
	"./pt-br": 326,
	"./pt-br.js": 326,
	"./pt.js": 325,
	"./ro": 327,
	"./ro.js": 327,
	"./ru": 328,
	"./ru.js": 328,
	"./sd": 329,
	"./sd.js": 329,
	"./se": 330,
	"./se.js": 330,
	"./si": 331,
	"./si.js": 331,
	"./sk": 332,
	"./sk.js": 332,
	"./sl": 333,
	"./sl.js": 333,
	"./sq": 334,
	"./sq.js": 334,
	"./sr": 335,
	"./sr-cyrl": 336,
	"./sr-cyrl.js": 336,
	"./sr.js": 335,
	"./ss": 337,
	"./ss.js": 337,
	"./sv": 338,
	"./sv.js": 338,
	"./sw": 339,
	"./sw.js": 339,
	"./ta": 340,
	"./ta.js": 340,
	"./te": 341,
	"./te.js": 341,
	"./tet": 342,
	"./tet.js": 342,
	"./tg": 343,
	"./tg.js": 343,
	"./th": 344,
	"./th.js": 344,
	"./tl-ph": 345,
	"./tl-ph.js": 345,
	"./tlh": 346,
	"./tlh.js": 346,
	"./tr": 347,
	"./tr.js": 347,
	"./tzl": 348,
	"./tzl.js": 348,
	"./tzm": 349,
	"./tzm-latn": 350,
	"./tzm-latn.js": 350,
	"./tzm.js": 349,
	"./ug-cn": 351,
	"./ug-cn.js": 351,
	"./uk": 352,
	"./uk.js": 352,
	"./ur": 353,
	"./ur.js": 353,
	"./uz": 354,
	"./uz-latn": 355,
	"./uz-latn.js": 355,
	"./uz.js": 354,
	"./vi": 356,
	"./vi.js": 356,
	"./x-pseudo": 357,
	"./x-pseudo.js": 357,
	"./yo": 358,
	"./yo.js": 358,
	"./zh-cn": 359,
	"./zh-cn.js": 359,
	"./zh-hk": 360,
	"./zh-hk.js": 360,
	"./zh-tw": 361,
	"./zh-tw.js": 361
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 578;

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// import fg = require('fast-glob');
var dirTree = __webpack_require__(509);
var fs = __webpack_require__(33);
var write = __webpack_require__(510);
var rimraf = __webpack_require__(513);
var remote = __webpack_require__(113).remote;
/**
 * @file 文件工具
 */
exports.default = {
    /**
     * 读文件
     */
    readFile: function (path) {
        return fs.readFileSync(path).toString();
    },
    /**
     * 写文件
     */
    writeFile: function (path, code) {
        try {
            return write.sync(path, code, { newline: true, overwrite: true });
        }
        catch (e) {
            return { code: -1, msg: e.message };
        }
    },
    /**
     * 读取文件树
     * @param {string} path 项目路径
     */
    findFiles: function (path) {
        try {
            fs.accessSync(path);
        }
        catch (e) {
            return {};
        }
        var id = 1;
        var entry = null;
        var srcPath = path + "/src";
        // 直接读取本地文件，减少参数复杂度
        var project = this.readConfig();
        try {
            fs.accessSync(srcPath);
        }
        catch (e) {
            fs.mkdirSync(srcPath);
        }
        var map = {};
        var formatNode = function (item) {
            var name = item.name;
            var key = String(id++);
            if (name == 'src') {
                key = 'root';
            }
            else if (item.path == (project && project.entry)) {
                entry = item;
                key = 'default';
            }
            item.title = name;
            item.key = key;
            map[key] = item;
        };
        var tree = dirTree(path + '/src', null, formatNode, formatNode);
        return { list: tree && [tree], map: map, entry: entry };
    },
    /**
     * 读取 project config
     */
    readConfig: function () {
        try {
            var config = fs.readFileSync(remote.getGlobal('info').appPath + "/config/project.json");
            return JSON.parse(config.toString());
        }
        catch (e) {
            return null;
        }
    },
    /**
     * 重写 project config
     */
    writeConfig: function (data) {
        if (typeof data == 'object') {
            data = JSON.stringify(data);
        }
        try {
            var filePath = remote.getGlobal('info').appPath + "/config/project.json";
            return write.sync(filePath, data, { newline: true, overwrite: true });
        }
        catch (e) {
            return { code: -1, msg: e.message };
        }
    },
    exist: function (path) {
        try {
            fs.accessSync(path);
            return true;
        }
        catch (error) {
            return false;
        }
    },
    /**
     * 新建
     * @param path
     * @param type 类别 1 文件 2目录
     */
    mknew: function (path, type) {
        if (type === void 0) { type = 1; }
        try {
            type == 1 ? write.sync(path) : fs.mkdirSync(path);
            return { code: 0 };
        }
        catch (e) {
            return { code: -1, msg: e.message };
        }
    },
    /**
     * 删除
     */
    rm: function (path) {
        try {
            rimraf.sync(path);
            return { code: 0 };
        }
        catch (e) {
            return { code: -1, msg: e.message };
        }
    },
    /**
     * 选择系统路径
     */
    selectPath: function () {
        var dialog = __webpack_require__(113).remote.dialog;
        return dialog.showOpenDialog({ properties: ['openDirectory'], buttonLabel: '选择' });
    }
};


/***/ }),

/***/ 844:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var antd_1 = __webpack_require__(109);
var console_feed_1 = __webpack_require__(845);
var axios_1 = __webpack_require__(906);
var launch_1 = __webpack_require__(924);
var util_1 = __webpack_require__(90);
var file_1 = __webpack_require__(66);
__webpack_require__(929);
/**
 * @file 项目选择组件
 */
var fg = __webpack_require__(931);
var fs = __webpack_require__(33);
var mfconsole;
var Operate = /** @class */ (function (_super) {
    __extends(Operate, _super);
    function Operate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            vlaunch: false,
            vdeploy: false,
            vbuild: false,
            logs: []
        };
        _this.showLaunch = function () {
            _this.setState({ vlaunch: true });
        };
        _this.hideLaunch = function () {
            _this.setState({ vlaunch: false });
        };
        /**
         * 打开部署窗口
         */
        _this.deployHandle = function () {
            _this.setState({ vdeploy: true }, function () { return _this.deploy(); });
        };
        _this.closeDeployHandle = function () {
            _this.setState({ vdeploy: false });
        };
        /**
         * 打开编译窗口
         */
        _this.buildHandle = function () {
            _this.setState({ vbuild: true }, function () { return _this.build(); });
        };
        _this.closeBuildHandle = function () {
            _this.setState({ vbuild: false });
        };
        /**
         * 部署到远程服务器
         */
        _this.deploy = function () {
            var project = _this.props.project;
            _this.state.logs = [];
            axios_1.default
                .post(project.deploy, { test: 1 })
                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                var list, hasPkg, i, file, data, ret, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mfconsole.warn('start to deploy ...');
                            return [4 /*yield*/, this.lazy(1000)];
                        case 1:
                            _a.sent();
                            mfconsole.log('deploy server connected ...');
                            list = fg.sync(project.path + "/src/**.(js|jsx|less|css|ts|tsx)");
                            hasPkg = false;
                            if (!list.length) {
                                return [2 /*return*/, mfconsole.error('empty project')];
                            }
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < list.length)) return [3 /*break*/, 7];
                            file = list[i];
                            if (/pkg\.js/.test(file)) {
                                hasPkg = true;
                            }
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            data = new FormData();
                            data.append('name', project.name);
                            data.append('filePath', file);
                            data.append('file', new Blob(fs.readFileSync(file)));
                            return [4 /*yield*/, axios_1.default.post(project.deploy, data, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                })];
                        case 4:
                            ret = _a.sent();
                            mfconsole.info('deploy:', file + " -> " + ret.data.to);
                            return [3 /*break*/, 6];
                        case 5:
                            e_1 = _a.sent();
                            mfconsole.error(e_1.message);
                            return [3 /*break*/, 7];
                        case 6:
                            i++;
                            return [3 /*break*/, 2];
                        case 7:
                            if (!hasPkg) {
                                mfconsole.warn('缺少 pkg 入口文件, 插件将无法启动');
                            }
                            else {
                                this.closeDeployHandle();
                            }
                            return [2 /*return*/];
                    }
                });
            }); })
                .catch(function (e) {
                mfconsole.error(e.message);
            });
        };
        return _this;
    }
    Operate.getDerivedStateFromProps = function (props, state) {
        return {
            vlaunch: props.showLaunch || state.vlaunch,
            vdeploy: state.vdeploy,
            vbuild: state.vbuild,
            logs: state.logs
        };
    };
    Operate.prototype.componentDidMount = function () {
        var _this = this;
        mfconsole = console_feed_1.Hook(Object.assign({}, window.console), function (log) { return _this.setState({ logs: __spread(_this.state.logs, [log]) }); }, false);
    };
    /**
     * 本地编译
     */
    Operate.prototype.build = function () {
        var appPath = util_1.default.getAppPath();
        var project = this.props.project;
        var data = {
            name: project.name,
            context: appPath + "/temp",
            output: appPath + "/assets/pkg"
        };
        var temp = appPath + "/config/temp.config.js";
        // clean mfconsole
        this.state.logs = [];
        mfconsole.warn('start to build ...');
        var code = file_1.default.readFile(appPath + "/config/build.tpl");
        file_1.default.writeFile(temp, code.replace(/<%([^%>]*)%>/g, function ($, $1) { return data[$1]; }));
        util_1.default.shell("\n      cd " + appPath + "\n      mkdir -p temp\n      cp -r " + project.path + "/src/* ./temp\n      " + appPath + "/node_modules/webpack/bin/webpack.js --config " + temp + "\n      rm -rf ./temp " + temp + "\n      ")
            .then(function (data) { return mfconsole.info(data); })
            .catch(function (e) { return mfconsole.error(e); });
        // TODO: git push 打包后文件，并推送到线上，同时更新配置服务器内容
    };
    /**
     * 模拟 sleep
     */
    Operate.prototype.lazy = function (time) {
        return new Promise(function (resolve, reject) {
            var tid = setTimeout(function () {
                reject();
            }, time + 1000);
            setTimeout(function () {
                clearTimeout(tid);
                resolve();
            }, time);
        });
    };
    Operate.prototype.render = function () {
        var _a = this.props, project = _a.project, showLabel = _a.showLabel;
        var _b = this.state, vlaunch = _b.vlaunch, vdeploy = _b.vdeploy, vbuild = _b.vbuild, logs = _b.logs;
        return (React.createElement("div", { className: 'mf-select' },
            showLabel ? (React.createElement("label", null,
                "\u9879\u76EE\u8DEF\u5F84: ",
                React.createElement("em", null, project.path))) : null,
            React.createElement(antd_1.Button, { type: 'primary', size: 'small', icon: 'file', onClick: this.showLaunch }, "\u5207\u6362"),
            React.createElement(antd_1.Button, { type: 'primary', size: 'small', icon: 'play-circle', onClick: this.deployHandle }, "\u90E8\u7F72"),
            React.createElement(antd_1.Button, { type: 'primary', size: 'small', icon: 'play-circle', onClick: this.buildHandle }, "\u6784\u5EFA"),
            React.createElement(antd_1.Modal, { className: 'mf-launch-modal', closable: false, visible: vlaunch, footer: null },
                React.createElement(launch_1.default, { onHide: this.hideLaunch })),
            React.createElement(antd_1.Modal, { className: 'mf-build-modal', visible: vdeploy, maskClosable: false, footer: null, title: project.deploy, onCancel: this.closeDeployHandle },
                React.createElement("div", null,
                    React.createElement(console_feed_1.Console, { logs: logs, variant: 'dark' }))),
            React.createElement(antd_1.Modal, { className: 'mf-build-modal', visible: vbuild, maskClosable: false, footer: null, title: util_1.default.getAppPath() + '/assets/pkg', onCancel: this.closeBuildHandle },
                React.createElement("div", null,
                    React.createElement(console_feed_1.Console, { logs: logs, variant: 'dark' })))));
    };
    return Operate;
}(React.Component));
exports.default = Operate;


/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @file util tools
 */
Object.defineProperty(exports, "__esModule", { value: true });
var CMD = __webpack_require__(925);
var remote = __webpack_require__(113).remote;
var FileType = {
    js: 'JavaScript',
    ts: 'TypeScript',
    jsx: 'JavaScript React',
    tsx: 'TypeScript React',
    css: 'Css',
    less: 'Less'
};
var CodeType = {
    '.js': 'javascript',
    '.ts': 'javascript',
    '.jsx': 'javascript',
    '.tsx': 'javascript',
    '.json': 'javascript',
    '.css': 'text/css',
    '.less': 'text/x-less',
    '.html': 'text/html'
};
exports.default = {
    getShare: function (key) {
        return remote.getGlobal(key);
    },
    parseFile: function (file) {
        var tokens = file.split('/');
        var name = tokens.pop();
        tokens = name.split('.');
        var type = tokens.pop();
        return { name: name, type: FileType[type] };
    },
    getFileType: function (path) {
        var tokens = path.split('/');
        var name = tokens.pop();
        tokens = name.split('.');
        var type = tokens.pop();
        return FileType[type];
    },
    getCodeType: function (ext) {
        return CodeType[ext];
    },
    getLocalWin: function () {
        return __webpack_require__(113).remote.getCurrentWindow();
    },
    /**
     * 执行 cli 命令
     */
    shell: function (cmd) {
        return new Promise(function (resolve, reject) {
            CMD.get(cmd, function (err, data, stderr) {
                err ? reject(err) : resolve(data);
            });
        });
    },
    /**
     * 所有外链图片都要用这个方法转化
     */
    getFilePath: function (url) {
        var info = remote.getGlobal('info');
        var protocol =  true ? "file://" + info.appPath : undefined;
        return "" + protocol + url;
    },
    /**
     * 获取 app 路径，代替 __dirname && process.cwd()
     */
    getAppPath: function () {
        return remote.getGlobal('info').appPath;
    }
};


/***/ }),

/***/ 924:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_redux_1 = __webpack_require__(137);
var redux_1 = __webpack_require__(110);
var antd_1 = __webpack_require__(109);
var action_1 = __webpack_require__(142);
var file_1 = __webpack_require__(66);
var util_1 = __webpack_require__(90);
__webpack_require__(927);
var itemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
    }
};
var Launch = /** @class */ (function (_super) {
    __extends(Launch, _super);
    function Launch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hideLaunch = function () {
            _this.props.onHide();
        };
        /**
         * 表单提交
         */
        _this.submitHandle = function (e) {
            e.preventDefault();
            var form = _this.props.form;
            form.validateFields(function (err, project) {
                if (err) {
                    return;
                }
                if (!file_1.default.exist(project.path)) {
                    return antd_1.Modal.error({ title: '不是有效的项目路径' });
                }
                _this.save(project);
            });
        };
        /**
         * 选择项目路径
         */
        _this.selectHandle = function (e) {
            e.preventDefault();
            var form = _this.props.form;
            file_1.default.selectPath().then(function (res) {
                if (res.filePaths.length) {
                    form.setFieldsValue({ path: res.filePaths[0] });
                }
            });
            e.target.blur();
        };
        return _this;
    }
    /**
     * 设置 document title
     */
    Launch.prototype.setTitle = function (path) {
        document.title = path;
    };
    /**
     * 根据 project 信息初始化文件系统
     */
    Launch.prototype.save = function (data) {
        var _a = this.props, initProjectAction = _a.initProjectAction, initFileAction = _a.initFileAction;
        var res = file_1.default.writeConfig(data);
        var path = data.path;
        if (res.code != -1) {
            initProjectAction(data);
            initFileAction(path);
            this.setTitle(path);
            this.hideLaunch();
        }
        else {
            antd_1.Modal.error({
                title: '写入 local 数据失败',
                content: res.msg
            });
        }
    };
    Launch.prototype.render = function () {
        var _a = this.props, getFieldDecorator = _a.form.getFieldDecorator, project = _a.project;
        project && this.setTitle(project.path);
        return (React.createElement(antd_1.Layout, { className: 'mf-launch' },
            React.createElement(antd_1.Layout, { className: 'mf-launch-layout' },
                React.createElement("h2", null,
                    React.createElement("img", { src: util_1.default.getFilePath('/assets/img/dock.png') }),
                    "Init Your Project"),
                React.createElement(antd_1.Form, __assign({}, itemLayout, { onSubmit: this.submitHandle, className: 'mf-form' }),
                    React.createElement(antd_1.Form.Item, { label: '\u9879\u76EE\u8DEF\u5F84' }, getFieldDecorator('path', {
                        rules: [{ required: true, message: 'Please input project path' }],
                        initialValue: project && project.path
                    })(React.createElement(antd_1.Input, { size: 'default', placeholder: 'project absolute path', onMouseDown: this.selectHandle }))),
                    React.createElement(antd_1.Form.Item, { label: '\u9879\u76EE\u540D\u79F0' }, getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input project name' }],
                        initialValue: project && project.name
                    })(React.createElement(antd_1.Input, { placeholder: 'project name' }))),
                    React.createElement(antd_1.Form.Item, { label: '\u5E73\u53F0\u670D\u52A1' }, getFieldDecorator('deploy', {
                        rules: [{ required: true, message: 'Please input deploy server' }],
                        initialValue: project && project.deploy
                    })(React.createElement(antd_1.Input, { placeholder: 'deploy server' }))),
                    React.createElement("div", null,
                        React.createElement(antd_1.Button, { type: 'primary', className: 'mf-form-cancel', onClick: this.hideLaunch }, "cancel"),
                        React.createElement(antd_1.Button, { type: 'primary', className: 'mf-form-save', htmlType: 'submit' }, "save"))))));
    };
    return Launch;
}(React.Component));
var FormLaunch = antd_1.Form.create()(Launch);
var mapStateToProps = function (state, ownProps) {
    return {
        project: state.project,
        onHide: ownProps.onHide
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        initProjectAction: redux_1.bindActionCreators(action_1.default.initProject, dispatch),
        initFileAction: redux_1.bindActionCreators(action_1.default.initFile, dispatch)
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FormLaunch);


/***/ }),

/***/ 926:
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ 927:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(45);
            var content = __webpack_require__(928);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ 928:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(46);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".mf-launch {\n  height: 400px;\n  font-family: \"Comic Sans MS\", Monaco, Microsoft YaHei, PingFang SC, STHeiti, SimHei, sans-serif;\n}\n.mf-launch .ant-form-item label {\n  font-weight: 700;\n}\n.mf-launch .mf-launch-layout {\n  justify-content: center;\n}\n.mf-launch h2 {\n  text-align: center;\n  color: #464646;\n}\n.mf-launch h2 img {\n  width: 30px;\n  height: 30px;\n  margin-right: 10px;\n  vertical-align: bottom;\n}\n.mf-launch .mf-form {\n  margin-top: 50px;\n  text-align: center;\n}\n.mf-launch .mf-form .mf-form-cancel {\n  margin-right: 10px;\n}\n.mf-launch .mf-form .mf-form-save {\n  margin-top: 10px;\n}\n.mf-launch .mf-form .ant-form-explain {\n  text-align: left;\n}\n.ant-modal-body {\n  font-family: \"Comic Sans MS\", Monaco, Microsoft YaHei, PingFang SC, STHeiti, SimHei, sans-serif;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 929:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(45);
            var content = __webpack_require__(930);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ 930:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(46);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".mf-select {\n  display: inline-flex;\n  align-items: center;\n  font-size: 14px;\n}\n.mf-select label {\n  margin-right: 10px;\n}\n.mf-select em {\n  margin-left: 5px;\n  color: red;\n}\n.mf-launch-modal {\n  top: 0 !important;\n}\n.mf-launch-modal .ant-modal-body {\n  padding: 0;\n}\n.mf-build-modal .ant-modal-header {\n  padding: 10px;\n  background: #1890ff;\n  border-bottom: none;\n}\n.mf-build-modal .ant-modal-header .ant-modal-title {\n  color: #fff;\n}\n.mf-build-modal .ant-modal-body {\n  min-height: 200px;\n  padding: 0;\n  background: #242424;\n}\n.mf-build-modal .ant-modal-body * {\n  font-size: 14px !important;\n}\n.mf-build-modal .ant-modal-body .css-5l7c0w,\n.mf-build-modal .ant-modal-body .css-17pf22k,\n.mf-build-modal .ant-modal-body .css-lbd0fj {\n  height: 25px;\n}\n.mf-build-modal .ant-modal-close-x {\n  height: 43px;\n  line-height: 43px;\n}\n.mf-build-modal .ant-modal-close-x .ant-modal-close-icon {\n  color: #fff;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 981:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var vscode_icons_js_1 = __webpack_require__(982);
var util_1 = __webpack_require__(90);
__webpack_require__(988);
/**
 * @file file type icon
 */
var FileIcon = /** @class */ (function (_super) {
    __extends(FileIcon, _super);
    function FileIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileIcon.prototype.render = function () {
        var file = this.props.file;
        var icon = file.type == 'file' ? vscode_icons_js_1.getIconForFile(file.title) : vscode_icons_js_1.getIconForFolder(file.title);
        var uri = util_1.default.getFilePath("/assets/icons/" + icon);
        return (React.createElement("span", { className: 'mf-fileicon' },
            React.createElement("img", { src: uri })));
    };
    return FileIcon;
}(React.Component));
exports.default = FileIcon;


/***/ }),

/***/ 988:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(45);
            var content = __webpack_require__(989);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ 989:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(46);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".mf-fileicon img {\n  width: 22px;\n  height: 22px;\n  background-size: cover;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 990:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var fs = __webpack_require__(33);
var antd_1 = __webpack_require__(109);
var react_codemirror2_1 = __webpack_require__(991);
var util_1 = __webpack_require__(90);
var file_1 = __webpack_require__(66);
__webpack_require__(992);
__webpack_require__(994);
__webpack_require__(996);
__webpack_require__(997);
__webpack_require__(998);
/**
 * @file web ide
 */
var PubSub = __webpack_require__(469);
var Code = /** @class */ (function (_super) {
    __extends(Code, _super);
    function Code() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            file: null
        };
        _this.keyHandle = function (synthetic) {
            var e = synthetic.nativeEvent;
            if (e.metaKey && e.keyCode == 83) {
                _this.saveCode();
            }
        };
        /**
         * 代码更新
         */
        _this.updateHandle = function (editor, data, value) {
            // load code 不要触发事件
            if (data.origin == void 0) {
                _this.notify('code-load');
                // 长度一致不需要 save
            }
            else if (_this.len == value.length) {
                _this.notify('code-save');
            }
            else {
                _this.notify('code-edit');
            }
            _this.value = value;
        };
        return _this;
    }
    Code.getDerivedStateFromProps = function (props, state) {
        return {
            file: state.file || props.file
        };
    };
    /**
     * 通知 status bar 改变 ui 状态
     */
    Code.prototype.notify = function (msg) {
        return PubSub.publish(msg);
    };
    /**
     * 保存代码到本地
     */
    Code.prototype.saveCode = function () {
        var file = this.state.file;
        var code = this.value;
        if (!file) {
            return antd_1.message.warning('invalid project');
        }
        if (!code || this.len == code.length) {
            return this.notify('code-save');
        }
        var res = file_1.default.writeFile(file.path, code);
        if (res.code == -1) {
            return antd_1.message.error(res.msg);
        }
        else {
            // 保存成功，更新 len
            this.len = code.length;
            this.notify('code-save');
        }
    };
    /**
     * 外部传入 file
     */
    Code.prototype.acceptFile = function (file) {
        this.setState({ file: file });
    };
    Code.prototype.render = function () {
        var file = this.state.file;
        var code = '';
        var mode = '';
        if (file) {
            code = fs.readFileSync(file.path).toString();
            mode = util_1.default.getCodeType(file.extension);
        }
        this.len = code.length;
        return (React.createElement("div", { className: 'mf-code', onKeyDown: this.keyHandle }, code ? (React.createElement(react_codemirror2_1.UnControlled, { value: code, options: {
                mode: mode,
                theme: 'material',
                lineNumbers: true
            }, onChange: this.updateHandle })) : null));
    };
    return Code;
}(React.PureComponent));
exports.default = Code;


/***/ }),

/***/ 998:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(45);
            var content = __webpack_require__(999);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ 999:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(46);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".mf-code {\n  position: relative;\n  text-align: left;\n}\n.mf-code .CodeMirror {\n  height: auto;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ })

/******/ });