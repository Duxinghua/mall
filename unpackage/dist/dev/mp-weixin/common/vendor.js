(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 100:
/*!******************************************************!*\
  !*** D:/work/greenMall/components/sx-rate/common.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.getClientRect = getClientRect;function getClientRect(selector, component) {
  return new Promise(function (resolve, reject) {
    var query = component ? uni.createSelectorQuery().in(component) : uni.createSelectorQuery();
    return query.select(selector).boundingClientRect(resolve).exec();
  });

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!***************************************************!*\
  !*** D:/work/greenMall/static/images/collect.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 16:
/*!*****************************************************!*\
  !*** D:/work/greenMall/static/images/collected.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA2CAYAAAB9TjFQAAAE9klEQVRoQ92aXWwUVRTH/2e6xRbFxLS73dnuTDWgNUbig4lGfJEYY0yMH8SPIOysiKJAjBo1UYkNJOqLHw+KiojQzmqjMYBBH3zkRYxBX4iRgAmknenOrEslPmCxbueYod3GltnOnXHv7tp9vf9zzv83d/aeO3eG0OCfY+h5Ir4PwL70kHWoEeWpEUWqNdy8/jIzvzFbk7FBLViDsj00FNIxNJ4PlEigN7nXKsoEbRikm1ueYposBcBMqKa1dFFAOrnsAIh2BMGopiX1YktNXgXi7VDcU1kHoNSihXTz2lpmDNe8JRVerQ7ah2XdstJnsrS+b5WneN+FAXAlcWVm+PRImC7OuHRIN68dZIbfF8N+b6mm9WKYKM64dMigtlHD6NnxiWXp67/8ZTIOyEIxUiH5NiRcXfs7guljqmndEEEvJJUK6RrZxxn0sZCTGZGMdiIV0jG0EwCuWbSQjqF9C+DOKIDTWt6umnbgpiF6rukIKTPp5vquYvJOxTTlqKaViRkbGCYF0slrO8HYGtcoEz+QGbL3x42fHycH0tAmAHTEN0nfq+boqvjxcyNlQV70SBXZMGFQHbI2RI4LCIgN+duDycumlnTqaPdSmFKSrHA/MaWY+Fpi3FEXc4SvwFRmeGPEdAIKlbkCh5S/RtKF0jnRGjUh7XW9WWpLJIm9lKJQP8ApeJxkon4QkmDurvVUIVo8to5QAuMMGGUQjgNcYiguiI9Thc5gyWRZ3eeWq/kvQDp5bTMYH8Qu2uKB05CG9ieAzhb3GtteFdKT1TNjO6tj4AVI2+jtaoPib8G66pi7ZVLNLjzuo9mV7NGxlnFWPyM/zFldi4Z2koCr65e/2Zn4m7Rp3zMH0u99laUdB+rV55qJyKA9GXP0Cd9DzT4Z4Ym+mSyBtRn0VMYc/WhOnwxSOnn9ITB/0XIEIYYYvCZj2gf/LVtwW+fmsjeDaD8Dvf8HWMVTbu35dOTIfK9Ce9eioX1GwCMtC8o4OkXeXVlzbDzIoxCkH1g0tNcJeKUFQQ+ppnXvQr6EIf0kbi67kYn2tBKoyMFXJEgfrpTXlnsM//xmRVNhCVvUIetDEQ+RIf2k4+tWXD7Zdv4AQLeLFKm3JurxSCzIqulm9VKRW1S4hYTNwKKHLOb1G4n5x7ALIWO8YTNZzGvPEeMdGRBhORsG6Riafy66JsyQjPEpeP1Zc+ykaO5YC0/Tnz0Jb6tD1gtSIR1D2wLgfdEiddcxDqsFa7Vo3lgz6Rja5wAeFi0iQTee7kiptPsnoXefkSGbfqvOXDECNqZNa6/IBYwM6eS0rSDsFEkuVUPYpQ5Zm0VqRIesz6o6CkAXMVhTwziqFqybRHLEgMyW/tPrAcIuvmTqeTrf9hKAbQAUEaMBmnOTFdL6hkfPhsXHgLz4I8CwIgz8qgCvpk0r8DjFMfQjAN8Slmf+ODNvyhTs0G8SpEMSsK2nI/Vm2Eo481/3Z1YVhWXmdzMF+5kwvVRIYt6dLthPhpmojpcf615WqXT+If7KQuxlbSTIYl7fRMyzR301zP+smtZKUbBaOtfQ72bw12F5RPaxkSBdQy8weH2NwuME3pE27ffCjImOF3P6s0Q8AOCKWjF1hXRzPZcyLTkNIBlUsNLOXdon9u+iAKK64tpMN7UnBgB+OiimrpB+gflHk1GPIUTBaumKRvZ+InoNjOuqGhHIfwCKpK30AvPSowAAAABJRU5ErkJggg=="

/***/ }),

/***/ 19:
/*!*****************************************************!*\
  !*** D:/work/greenMall/static/images/goodcover.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/goodcover.png";

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 28:
/*!*********************************************!*\
  !*** D:/work/greenMall/static/images/1.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 29:
/*!*********************************************!*\
  !*** D:/work/greenMall/static/images/2.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!*********************************************!*\
  !*** D:/work/greenMall/static/images/3.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABaCAYAAADJoxqPAAAQTUlEQVR4Xu2dfZhU1X3Hf797523BJSKQRtC8gdYASTAUkahkMcqyO/eeJYY1xmh8wZdYYyl54Yk10aiExCdWja20mto2mvi2Bph77+wC5dFNtMHEGpUkpI0SE1NIWqDqzCo7u/eeX58v3uUZx52dO7OLDfSe/1jOOXPOZ845v9dzhqlK6ezsNPv7+5cz8/VENL5avQh/10R0d39//7WbN29+NUL9Q74KV5vBggULmqZMmfItIrqUiPYSUbHe2YpIhpnfISJbTdM8d8OGDb+pt49DsX4tqLcR0WUispKZvXonqLWeYxhGFxH9aGBg4FMbN26MoU6ZMmUI6iWu695dL1Sl1CIiegRQfd8/t7u7+7f19nEo1o+0UoloFVac7/vJqJMMgkAnk8l5RHR/DDWkhjN18uTJtzPzJSKym5lfEREjKlRmFiJqIqKpIvIEEZ3ruu4LUdsfyvWqrtS5c+cmp02bdg0RfUlEUszcT0SlOiabIKJxRAS460zTvGL9+vUQeId9qQoVM89msxNN08T2xdn4ba31w4ZhjNgG7bTWwsxziOgaZt4XBEFLPp//9WFPM5xgTUBKqftF5GNYsa7rQnBFKqGQ+i4R9b322msnbdmy5ZVIDQ+DSjWhdnR0PCAiS0Xkatd1b406Z9u2T2fm/VCDIJifz+dfitr2UK8XQz0I32AMNYZ6EAgchC7jlRpDPQgEDkKXNVeqbdsPMHMs/euAXwsqAyoRdRBRXSpVqKd+j4heLZVK8zdt2vQ/dYzrkK46ItTOzs6m/v7+h5kZFtXnHcf5u6izbW9vX5hIJAA1UyqVPrBp06bfR217qNcbEWp7e/s7EonEBiKaSUTLHceBbzRSyWazcw3DuJ+ZjxaRea7r/vswDbmzszOy56u8/e7du3Vvb68faTBvcaURodq2/ZHQKkoR0ZmO42yLOr62trZjksnkg0Q0l5kvy+Vy91S2tSzrE4ZhnBa1z6F6IoJxvxQEwT3d3d2/qrf9wa4/ElTDtu2/IKJvENEPfN9XPT099XipTKXUTSLyOSKCufoZ13VfK5+QbdtPhY6XRubpi8jNxWLxuj+2FVsV6hlnnPG2pqYmSP7FzPyJXC73cL0zt217HjNvJaIdRHSO4zhPl/ehlFpCRAtFBO7BSEVEAmaexMyXE9G2QqGwsLe3ty9S4wiVEPDs6+sbr7V+ezKZPJ6Z309ECcMw9gRB8AvDMJ7bvXt3YevWrfuqdVcVqlJqIRHlieiFdDo9v6urq2on1TrHAEulEvo4XWv9Bc/zbo8wr0hVlFJPishsIlriuu4PIjWqUSmbzb4XAcrwi56DL4+IDjjmRcRnZiyQH2utu/fu3esMB7cqVNu2H2Tms4norxzH+Xqjg1ZKnUlEG4loq+M4pzbaT2U727ZXM/M1InKn67qfGW2/2Wz2rEQisVpr/R5mzhDRiyICGfJnzDwREWFmRrj9ZGg0IvIKM3cHQXBtpa94WKhtbW3Tk8nkdhH5PTOregTUMJOH97+XmedprRd5ntc7WgBob1nWRw3DgFsy7fv+9J6ent2N9BvuJkSMv8nMKRH5GRHdNjAwkN+0adNLSqnHROT9zPznjuN8z7KsD0LwMvMyIno7Ef2r7/sXlwvM4aCyUgoJFFgF9/m+f2VPT0+hkQGHbQyl1BeIaDVW686dO8946qmnBkfR3/6mHR0dx4rId0UE2gOE4F2N9KmUOo+IbiaiPyGin/m+v2wIUEtLyxETJkzYApWSmT87pMGEoabzkSSCzwxjcBcNqY1vgmpZ1juZeR0RnSAiV3me90+NDLa8jWVZJxmGcZ+IvIuIPuy67pOj7ZOIoF3gWIJ20ZNOp8+u99zPZrPvM03zMSLC2Qk4r4rILX19fWt6e3v7q0ENV+tdzHxS2TweKRQKHRCaw0GF7vj30AO11qd5nrdztABOOeWU5qOOOupeZu4QkRtc18VOwPk0qpLNZltN01xPRDvRdy6X2x61w5kzZ6amT5+eg3YThtFfJKK/JKKkiKwqFouwHhOVK1UpNUNEvs3MLSICg+ZuZl4hIhORzeO67gNvgLp48eLxmUzmDhH5tIhc73keJj8mJdxm945luHrp0qVHaq2fEJFjEEp3HAd+ikhFKZUN9ed9ItKB3WPb9koi+gozv42Ibi2VSmtSqRQyc2bhTGXmp7XWgAhh9YzW+nLP836ilLpRRBB5zg0MDCx/A1TLso4zDOOHiNcnEonZ69at+89II4xQSSnVjG+WmSeIyIWu634/QrOaVaAFQENh5rU7d+5cGeW87uzsTJVKJRwdK4hofaFQ+CQMiLa2trRpmisNw7g2DK3/IxEhKjxbRLB7PwqBKyI/FZFLPc/7aSg0pxmG8Qs4j4IgaK2E+mXDMG4QkYdc1z2n5ozqrGDbNrbXLcx8n+M4EBCjLrZtzyKip6BP79u37+QoUVv4NEzT/A62vtb6PM/z4Pg5UCzLusEwDAjXJhHph1ZARIGIIJfhP0TkYs/zYNQcKIg6w8DBLj8Ata2tbUoikXiamZuRTeI4DpT2MS3IIzAMAypLk9Z63ljlAti2vSU845a5rgsH0IgFSr5hGA8x84dE5KvM/OvQn7C/HTMPiggsNvg+yhce/v4tZn6mPFsn1F/PIqKzIDMONLBt+yoiQoNerfX5YyGghpuZUgpqyMUistZ13StrAYjy/0opKP93aK17PM+zarUJpT4E3PHYsiKiK+DpcFWOq/w7UkrxBZT/PTSzkcUDo+D2/VAhnSdNmgSrBwr6mqamphu7urqCWoNr5P+z2awyTRMeq6TW+vix+PLCIyDPzMf4vj+zlueqvb39eNM0v8/MMHO3MTPAYmtDrQIxpDhBb/3TijnCifNvqMbM++uHpSQixzLzu0Tktv1Qw8QHuOm01tqGRGsEWJQ2UNq11jCBF2itP+t53tpQKERpPmyd1tbWo1KpFDxhcNCscl0XynzVsnjx4mMzmQzO0dNEpL1YLD6aSqVMNCgWi3ry5MmzmfkfiOgDYBKuTDh9RGt9VyqVunFwcPCVUqm0n9/evXsHpk2b9k0IPq31Cg71teuZeZWI5Hft2vXxKBK0YQJEcClex8yQsE6pVLpoDEItsAJhAaJfKPMdjuNUzfwOlXqojrCKbnJd9+qh+ViWtcAwDAB9X6iHYqdPI6J/wRkrIuOZ+c5CofDlIe8YGM6YMeNZrFbTNC0OJeFGbAVmXpLL5WCWHdSSzWZnm6YJteS/ReQcz/Mer/xATDydTkNKRzJpTdP8MDPjvN4LSzAIgje4GSv7TyQSFyE/jIh+JSKnu667x7btE6CZENGJIvJzETmPmZFO+kERuYKZEWnAZxwB07ZQKFwLyyt0YfYQEQR9B77hTxERTNGfPP/886dv37594KASfb1zfO6DIrKMmW92HGdV+WfCCEmn0zcy86eJKNJ4II2ZeUp4Lr7MzCM51LGV00QE7xPOzy/CKGFmWEofgpMkCIIV48aN214qlR4tt/1t2/4kM68hondDsAdBcKdhGGuZ+RQR+Xomk/kaoqXwGuEPyz3Pe1PI42ABDu1nTOTFQqEwq9x7D/UumUzeS0StRPSciOyJMg7DMCaJCCT6yyLyy1ptmDktIicS0X8xM768dxLRY77vXwJhN5zt39LSAtMVHqq/ERGon78jIggpJEV/BE4VrBjkjY73ff+0WlKz1iDr/X+l1DYRORoSu9x1Z9v25DA21qq17vQ8L1LUoaWl5cgJEybgssYfDMM4ecOGDS/XGlPoN/44HDQi8oJhGNaQD6GaQwV9Wpa1LLwkgn/C1L1q6F4EVupzUPh931/4VkO1bfvZ8ErQLJxpQwDKoRLR+Y7jQLJHKrZtr0fyh9YaVk9NDxsClIlEAtu3nYj2iMitQRA8gEsfMFsTiQS2P2z/KzGOUCidDFObmXEuY9yrHcfB9ajXz7YQ6oT/q5UKfVBExgyqUuoCIoLN/qTjOHB81CxQsdLp9NeYGdoAgpMImTyitX6cmeFgeS8c1yKCXdAOdRAOahFBzu0XM5nMfV1dXQfO/sMOaltb28xkMglraYbv+/O7u7uhrEcqlmVdahgG/LPw+0KQDXdxBNpIn4j8WES+5Hnes5WdH3ZQ4Q0jor+FDsrM2JbX1WFcsGVZxxqGgQgvtIATsJOY+T0iciQCfkQE79qTvu8/US1kf9hBxapRSl0BdQeTHxwcXNpI/KqlpSXT3Nx8RKlUakqn04hfQf27OJfLQSsZMaR+WEJtb2+fk0gkfigiBSjwow02hpmPy4IgWJ7P579T6yw5LKEiMDd16tTNUMiJ6DrHcW4aTfgmhhouI9u2caZiVW0uFApLYU7WWmHV/j+GGpI59dRTJ06cOPGXzGwODg6e2NPT03BoKIZattyUUv9MRBdorT/ved4t8Up9/WIbbP+6LKpycEophDjQz+8q/Qv1AI5X6htX6gwiQqLyHK11q+d5m+uBWWY2I/vx/7f0H4IRptfj6idyn9am0+kVjYSJ4pVasRRDfzF8Adu01ksbiYnFUCughjmnyAuA0/pCx3EQ4KyrxFArcIWpkki4y4rIN3bt2nV9vTG4GOowa7Cjo+NjIrJORB4fGBjoqDfQGEMdBipCIM3Nzc+HMamFw7nrRjoPYqhV6Cil/hq5rMggcV0XiWmRSwy1CqpsNrsIWSlEBCfzjJHyAiq7iKFWgbpkyZJ3p1Ip5K/Ox/Mlruvmoi7VGGoVUshJ7e/vv4mZrxKRe3fs2HF51ByHGOoIy8+27aVEhLxUPI93luM4EF41Swx1BERKqanIPiGiZq01MqERIKxZYqgjI0LyyB1EdDmSd33fvzrKfdsYao11F75DgAQJJMi1lSdxVGsaQ625mffn4/6cmY8Lc3FrugNjqNGg4jbL6qgXRmKo0aAiHWgDsv5KpdLMWk+RxFAjQLUsC/ee7hGRRYZhLM/lciMmssVQI0ANHSy46oOU/EeLxSLulFYNYcdQI0BFlfBeK8xWvGqRHen6fQw1IlTcaEmn03jWeZrW+rLKW3/l3cRQI0JFNdu2caH5K0R01549e1ZWexclhloH1PCWDN4e+G2pVFpUTQuIodYBFVWVUlD+zwyC4Ox8Pj/sY2Yx1DqhZrPZC0zTxN2oLY7j4Mbgm0oMtU6o4RsHm0VkCq7/eJ73XGUXMdQ6oYaPmiHfCi9VfG64F+JjqHVCxWUJ27avxl1Z3PorFovZyhfZYqj1Q8VFsxZmxlX1/iAIVD6fR0bLgRJDbQCqbdt4kOxH4W2UKyt/0SiG2gDU0BDY/74LET1ULBYvKT8CYqgNQm1tbT06nU7jLdaX8aZr+a+8xVAbhIpmlmWtMQxjFm6UV9yVjZN+R8HVbGlpSVa6AeOVOgqi1Zo2DDUIAqQbvqW/GZVIJGB3j3iLmpkvHRwcrPtHG8eSrWmat4VPe+Kx80g3/n6Dp4dE5A945GosBxOhL/xUXV8mkzmuq6vrwO8AhPf9cQd0CV6lYOYxex45wpjeVAUmLH4FLny9o+YbArhGeUf4VkkjnzfqNiLS67oufpzhwCuV4UMFUHHg6/yjKCKyIwiCC7u7u5+pNaD/BbsV/C8I50OFAAAAAElFTkSuQmCC"

/***/ }),

/***/ 31:
/*!*********************************************!*\
  !*** D:/work/greenMall/static/images/4.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 32:
/*!*********************************************!*\
  !*** D:/work/greenMall/static/images/5.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 33:
/*!*********************************************!*\
  !*** D:/work/greenMall/static/images/6.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAQ/0lEQVR4Xt1de3icVZl/3/PNZBKgLdIWuS5ykZVyWbSAi4BG7DZO5jtnCBDaitBFuZWLLiCLrgX7PKuriyCXhV3AZbEgKga1OWcmoTeMi1AekRYEqixUbl1YnoDYCY1NMt959/mVLzyhpMlMJm1m8v45833n8jvvd857P0zjSLNnz07uu+++9Zs3b66rq6tTzBxEUcSpVMqLSOS9jwYGBvr7+/v7urq6iuPY9WBTPGfOnKkNDQ2HEdHfEtG+SqloB/QzbJPe+4CIeonoD1EUPfL666+/+vjjjw/gYa50EFrrGd77w5RSRzIzJnigiOxFRLsQ0a7MrEQEnW0moh4iep2ZnxOR9VEUPbFp06YNDz/8MH6viFpbW4Pe3t5PB0FwVQzybhU1WMHLIiJE9AoR/ZCZb7bWvj5moJubmw9IJBJnE1EzER1ARLsTUYqIFBGBi/4CUGOQdyWiPYmobuvqMnusvIi8pZT6AxHdu3Hjxh8Prv5Y5qi1PpaZ7yaiQ0VkIzPfFUXRC4lEAuN5l7z3wsx7iMi3iKhfRG5i5j8qpUbDAl/kl5n5YyLyIyJaue07IuK99w3M/ElmPkVEwGS3MPM1ozX+njk3NjYmGhoaPpBMJs8VkYuJaB8i6os59Ski+p2IPFosFp8Qke5CofCX7u5uf9BBByUSicSUIAj2Z2YA0cjMJ4nITGaeQkRJInrWe784kUisWrZs2Z/LBJu11j8kogVEtG5gYOC0Bx544MXttdHY2Ljb1KlTXxWRzSKSyeVya0vpT2v9E2ae571fmMvlsKjbI85kMpcEQXC9iOBrzZQMdDqdnplIJL5ARAvjLeItEfk1M7tisfhob2/v78vZd9FeMpk8lIg+LSJNzPwJEcFX8CgR3VgsFld2dnZiEUelMAz/SimFRcaX9Fnn3GMjvTR37tz96+vr18dfVTja84Ntaa1/AU4lokuttbeMMjAs/gPMPJeIri4J6Bjkpcz8qXjvXSki3+nt7X1y9erVfyIi7EljInwlqVRqZl1dHcC+kohm4WsgoqX9/f3fXr58OdofkbLZ7JEi8gQR/ZGITsSeWAVAUxiGtyil8OV/b0SgccBs3rz5mCAI7mPm/YnoLe/9tVEU3VQqt40G0tD/M5nMQUqpa5k5jQXFXlgsFhd1dnYWRmonk8kcoZRax8wvFYvFEzs6Ov6vGoA2xvw7ES1i5utGAlpprU9n5u/EksSDIvKNXC7363LAK/fZ448/vmH69OmtzPzVeItaxcyXt7e34wwYlmoa6Obm5iMTiUSeiPYXkd947xfk8/kXKtkmygCdjTGNRHRbLEU82NfX9/crVqyAyPQ+qlmgIboFQfArZt6PiH5prcWGPuZ9uAyA3/NoGIaNSqllRDSNiG5KpVJXtLW1vU8BqUmgW1pa9iwWi7cTURYSgPf+i/l8/vdjBavS98Iw/IxS6h4R2UMpdUV7e/ut27ZZi0ArY8wFIvJdaHTe+3m5XC43Edw8FMwwDC/ZeqAwQ8H4zLbiWM0B3dTUtHddXR2A/SgR3eGcu7BSjhyP95ubm/dKJBL3EdEnReTHRHSucw42ha1Uc0AbY66Iufnpvr6+xlJk2PEAspQ2tNanMfP9RLRRRBY65x6sSaChlk6ZMuV3sZRxaS6Xw4lfNdTa2lrX19f330R0rIjc3NPTc+WgJlpTHB2GoVZKWRHBwXeqcw7GnqqiTCaTCYLAEtEzAwMDJw4qMjUDNDTALVu23MrM58Xa2MWjaWMTsQJz587dtb6+HgagA7z3MAatrqk9uqmpaQ8cgrEJcLFz7rqJALKUPo0xsNKdCTOnc25xTQHd3Nx8dBAEP2XmmSLyOedcZymTnohnjDH/SET/QkQPWmubIHrWzNahtT6ZmaEUBLDQWWufnQgQS+nTGGPgKBCRN51zBwJomAuCIFhb1UaldDp9cCKRgCnvfGaGy+mfReRteAdKmfjOfIaZYQY4hJkvir055wdBkCsWi3sQ0VNVDbQx5lUi2ht+LmYuyT69M8Edrq/YJweXGIvIYmb+z9hH93LVmkmNMZBNTyKiDfCDiUhiooEcqf+Yq6eISEtsJviS935ZEASvVDVHh2F4nlLqDhiQuru7T54xY0bVc7WIHMfMkJLgEGjFfl31W0fszQZX7yciJzjn4LOrZoJD4ltwe8F9FUVRyMwzqt7DYoyBF/q/ROQ02Hydc5dVM8phGO7LzPfG/strrbVX1Yp4x2EYXhSbITeW4tycyIUwxpxARG04wL33J8G1VitAEwYP1ZuZp8WWsfaJBHOkvrXWX4cICnuHc+6omlJYsH2IyP3MfDIR3VIoFL7W1dW1pdrAXrJkiVq7dm0XpCQR+ZJz7t9qSgXHYLXW/8DMNyAoRin1ufb29mEdoRMJfjabneW9fzyOjPq4cw7O4toy/GutP8LMiPbpYebTrbW/nEhQh+tba/1NZsbWkS8UCqcPfnU1s0djUjCV9vX1rSAibB/ftNZeXU1Az5kzZ9ouu+yCMK7pRHSVtRbbBoIla4uj4+0D9o7/EJGnnXNHT7RTduhCD3FlvRJF0Zn5fP6hwf9riqMxaGMMokN/O1R0qhKuhnf+ZiK6WERW9/b2zlu9ejW0wa1Uc0DH4axQxxeIyD3OuYXVwNXZbBbRUj8nomO891/L5XIIU3uXag5oBJFrrWEyRaBhoVgsHtfR0fHSRHO1MQZhBhA/Zyqljlm2bBkkj5oGGmLesUT0EwSZM/PZ1lpoYRNK2Wz2qyLybQSZFwqF47aNw65Fjqb4dEewyt8R0Q9E5NKhwSoTgbgx5ldx8MzFzjmEwr6HahLo+FCEX+5fReSxYrG4oLOzE7bqCaGWlpbDkFSE2Ow333zzw8MlFtUs0M3NzYcmEomniWiL935+LpfrmBCU35GEIC9f4r1vy+VyZww3jpoFGpPRWueZGRlXt1prL5kIoFtaWqZHUfSkiExn5guttUsnI9CnMPMvkC1VKBSOKCcRaLwWRWsdEpFl5he99y25XO7JSQd0nCD0GHJXoihqyufzq8YLwFLaiaOnbmDmS+OcvjO2lxZX01vHrFmz6g455BCc8Eh5a7PWIodvq21hZ5DW+kBm/imUFHi6nXNIwByWahroWPpA6NXt8DYjnsJai9CEnUJhGDYjqAdZrkT0MWvtukkLdBiGf8PMyBb9iPf+zFwuh9TcHU7IPZwyZQpMohAzn0ilUscOl7syOJCa52hEb9bV1d2llIJLf+kbb7yxaM2aNchu3aEU21xgD4dtY7R04NozKg2HnjEGe/SdIoITf/7OiJuGbYOIYBt/I5VKHd7W1rZppJWteY7G5JDNGgQBDO5bROTzzjnkuOxQ0lp/j4jgWrvfWjuskjJ0AJMCaFR9MMb8jIhakNLgnPvyjkQ5TsZ/SkSmITDeWot46BFpsgCN5PFmpVReRJ7r6emZtSOVlzAM5ymlYD1EWQmk3w2rpExGjt46J2MMPM4fivP83s2IGo3byvw/MMYsRTA8Ef2cmc+x1o5anWbScDTA0lrfxswXwANtrYVqPO6UTqdnJRIJGPgPFpHLhjOJDtfppALaGDMfygsRBd77o/L5PGpjjCtprRfAOQxPj4gc75x7ppQOJhXQWuvD4Xlh5iNE5ELnHEAfN4KSMnXq1BsHHbD19fVNIykpk3aPjlPPEFk/H7aPQqHwha6urrfHC+k4oRS1QI5i5rOstfeW2na5HB2XBnqOiApxGt1vSulLa+2YORSRy51zN4z2TqmFUd7Xjtb6Ama+DUmfzDzfWotM23GhdDp9QjKZhDb4p+7u7gPL0UDLBbq1tXXali1b1sQDLzl5VWuNYgSXee9NKc6QMQN9yimnfMh7/2xcYu085xwS4MeFjDEIcziPiL5vrT2/nEbLBRptZzKZD/T39zesXLmyZEOZ1hq1/D7onENkwKiWzDEDHUsfW0uSEdHdqVTqvLa2tv5yQBnu2bh6ATwpqI93pnOurLDhsQBd6ZhLeb8ioDOZzJwgCFYS0QtRFM3O5/NvldLpSM9kMpn5SilYBpEriC3p+XLanJRAQ7wzxsA2fCQRnVFp3Afqme6zzz7wBeKQRYnJi0tRUiqROspZxEqerYij0bExBhUKkevS6ZzTpexX2xswwoVjLfBg7/2FuVzurnInN1k5etD28SMRQS3SWYMB4eUChOdh22DmO2IvzjFjSY+etEAbY/6aiCBxoCTQRdZaaHNlE2rczZgxAw5YqParrLWIjiqbhgD9YrFYPGm0AoNldzDGF7LZ7K0i8k4i1ljaSKfTqWQyiTDac4lo2cDAwDljqe+BMGERWcHM0DpPs9YiYrRsAtBBECCa6eW+vr4Tli9f/lrZjeyAF4bYh0YumTlS38YYuLfuZuaXUXyw1Iq1Q9uMza+oa/e/0AjLPQQH24rjBaE8Iad9gXMO9vOJJtjxEe2FWquXjYmjMYN0Or1fMplcJyINSqmL2tvb7yk3ltoYAxfZOcx8u7V2USXIGGOuJSIc0JuQEeC9X5NIJHZE1fURh9nX18d1dXXTlVKLRQRf/AYRaR4z0PC8aK2/z8xfFJEfbNiw4YL169eXrLzEpd+eZua62EVWlpKy7WzjYHW4wLIi0s/MjyAwspLFG8u7cc0TSFI4x7q999e89tprSysBGjZqFFSB8vJyb2/v0atWrRrRiTp04Fpr5MvAAgiZHPJ4WUrKcCCgDD4RfYWZP4/6/mMBapzeQbX3dUqpJf39/Q+hMnFFQGNQWmtw5eEiMs85h8iiUSnOAGvHJ4UYbESLjmcMdmNj4+677bbb7LjW9ajjGfqAUgo1slH/b62ILCnr5XfK6qOcyCtvv/32M0NdfhUDHYbhdagZiiQe5xzEs1GLxWYymdlKKbiqEIWEKNGSTaLlTrzc540xpxIRDtNx9SRVDLTWOs3MUF4aiGh2CV4R7O2wzl0f58k0dnR0/E+5gOyo57XWZ8WXMiy31n52vPqpGOi4ijmUF9wacaW19vqRBtfY2Fg/depUVIlcKCL3OecQPDnqVzBeEx6tnaoFOgYO3gZw6Wql1HbDazFJY8wHiQg5KR8WERjdK5I2RgOu3P+rFugYPESd3snMr8apGNt1DRlj8DnmROSlnp6ew6utikJVA42qMEoplLLcPQ4TgO1j2O1Aa/0zZsaB811rLaJFq4qqGuiYqwEu6k0jHWPhcOp0XKbnCWZGJbKstRa1nKqKqh7obDb7cRGBNvYqLq8Zrt5HLG3gIHyEmaGklOyv21mrUfVAx8rLb5kZisL7TKew+MVRSM24n6qnp+efqm1/judQneLdUE7TWl/DzN8goq5CodA0VDMyxsB2vQypbNhaqsTC9r4PpSY4GrEZiUQC90lNi6Lo6KG3XcS2DZQS+nMURZ+ohmT+4bajmgAal32lUil4s08YqrzEtfVwWJ4ZZ3iNGly+s/bkbfupCaDh0d57772R5HM5Mz+klDoVuYFxRd9OZj6EiJqstbD4VSXVBNDxYYISlojSLwyW5IkHfycRPVcoFGZX4yE4uOo1A/TcuXP3TKVSCFbEJZGXW2tv01rDFoLt4kbn3OVVycrxoGoG6JirEQz4FZQLUkp93XsPJUVFUWSGFp2qRsBrCuh0Ov3RZDKJqr2veO9XKKUW4YpUZoanu+qUlG1E1OqXo4cO2BgD2wdkZxBubLv++eefv7ocv+JEcHwYhmcrpXAb6Yr29nZc1jAuVLE9enujiC+ngSsIvjtUiLyiBKfAuEyqkkYGPSwi0uGcy1TS1tB3dxjQ8Y3LeyWTyV2LxeKmjo4O3ANbNQb+7QEYx4icBaextfbh8QL6/wFUgASw9YKr/wAAAABJRU5ErkJggg=="

/***/ }),

/***/ 34:
/*!*********************************************!*\
  !*** D:/work/greenMall/static/images/7.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 35:
/*!*********************************************!*\
  !*** D:/work/greenMall/static/images/8.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 4:
/*!************************************!*\
  !*** D:/work/greenMall/pages.json ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 79:
/*!***********************************************!*\
  !*** D:/work/greenMall/static/images/hot.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 80:
/*!***********************************************!*\
  !*** D:/work/greenMall/static/images/new.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 97:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 98);

/***/ }),

/***/ 98:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 99);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 99:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map