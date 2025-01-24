"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_cameraMonitorLog_List_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/cameraMonitorLog/List.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/cameraMonitorLog/List.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm-bundler.js");
/* harmony import */ var _services_CameraService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/services/CameraService */ "./resources/js/services/CameraService.js");
/* harmony import */ var _TagComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TagComponent */ "./resources/js/pages/cameraMonitorLog/TagComponent.vue");
/* harmony import */ var vue_toastification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-toastification */ "./node_modules/vue-toastification/dist/index.mjs");
/* harmony import */ var _constants_status__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/constants/status */ "./resources/js/constants/status.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var toast = (0,vue_toastification__WEBPACK_IMPORTED_MODULE_3__.useToast)();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ListCameraMonitor",
  components: {
    TagComponent: _TagComponent__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  setup: function setup() {
    var route = (0,vue_router__WEBPACK_IMPORTED_MODULE_5__.useRoute)();
    var isLoading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var columns = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      created_at: 'Thời gian',
      name: 'Tên camera',
      type: 'Loại lỗi',
      description: 'Mô tả lỗi'
    });
    var items = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var pagination = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var tableQuery = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var perPageOptions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([10, 25, 50, 100]);
    var statusError = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var checkedRTSP = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var checkedIntegration = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    // const checkedCoreAI = ref(false)
    var checkedNoEvent = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var checkedStream = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var checkedUnsendFile = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var description_rtsp = 'description_rtsp';
    var addOrRemoveStatusFilter = function addOrRemoveStatusFilter(type, value) {
      tableQuery.value.page = 1;
      if (value) {
        statusError.value.push(type);
      } else {
        var index = statusError.value.indexOf(type);
        if (index > -1) {
          statusError.value.splice(index, 1);
        }
      }
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeMount)(function () {
      checkRouteParams();
    });
    var checkRouteParams = function checkRouteParams() {
      if (!route.params.name_cam) {
        return;
      }
      var status = route.params.status;
      var nameCam = route.params.name_cam;
      tableQuery.value = {
        search: nameCam,
        page: 1,
        per_page: 10
      };
      switch (status) {
        case _constants_status__WEBPACK_IMPORTED_MODULE_4__.STATUS_RTSP:
          onChangeRTSP(true);
          break;
        case _constants_status__WEBPACK_IMPORTED_MODULE_4__.STATUS_INTEGRATION:
          onChangeIntegration(true);
          break;
        // case STATUS_CORE_AI:
        //     onChangeCoreAI(true)
        //     break
        case _constants_status__WEBPACK_IMPORTED_MODULE_4__.STATUS_STREAM:
          onChangeStream(true);
          break;
        case _constants_status__WEBPACK_IMPORTED_MODULE_4__.STATUS_NO_EVENT:
          onChangeNoEvent(true);
          break;
        case _constants_status__WEBPACK_IMPORTED_MODULE_4__.STATUS_UNSEND_FILE:
          onChangeUnsendFile(true);
          break;
        default:
      }
    };
    var onChangeRTSP = function onChangeRTSP(value) {
      checkedRTSP.value = value;
      addOrRemoveStatusFilter(_constants_status__WEBPACK_IMPORTED_MODULE_4__.STATUS_RTSP, value);
      initCamera(tableQuery.value);
    };
    var onChangeIntegration = function onChangeIntegration(value) {
      checkedIntegration.value = value;
      addOrRemoveStatusFilter(_constants_status__WEBPACK_IMPORTED_MODULE_4__.STATUS_INTEGRATION, value);
      initCamera(tableQuery.value);
    };

    // const onChangeCoreAI = (value) => {
    //     checkedCoreAI.value = value
    //     addOrRemoveStatusFilter(STATUS_CORE_AI, value)
    //     initCamera(tableQuery.value)
    // }

    var onChangeStream = function onChangeStream(value) {
      checkedStream.value = value;
      addOrRemoveStatusFilter(_constants_status__WEBPACK_IMPORTED_MODULE_4__.STATUS_STREAM, value);
      initCamera(tableQuery.value);
    };
    var onChangeNoEvent = function onChangeNoEvent(value) {
      checkedNoEvent.value = value;
      addOrRemoveStatusFilter(_constants_status__WEBPACK_IMPORTED_MODULE_4__.STATUS_NO_EVENT, value);
      initCamera(tableQuery.value);
    };
    var onChangeUnsendFile = function onChangeUnsendFile(value) {
      checkedUnsendFile.value = value;
      addOrRemoveStatusFilter(_constants_status__WEBPACK_IMPORTED_MODULE_4__.STATUS_UNSEND_FILE, value);
      initCamera(tableQuery.value);
    };
    var initCamera = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(query) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              isLoading.value = true;
              _services_CameraService__WEBPACK_IMPORTED_MODULE_1__["default"].getLogCamera({
                page: query.page,
                keyword: query.search,
                per_page: query.per_page,
                status: statusError.value
              }).then(function (response) {
                isLoading.value = false;
                items.value = response.data.data;
                pagination.value = _objectSpread(_objectSpread({}, pagination.value), {}, {
                  page: query.page,
                  total: response.data.total,
                  from: response.data.from,
                  to: response.data.to
                });
                tableQuery.value = {
                  search: query.search,
                  page: query.page,
                  per_page: query.per_page
                };
              });
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function initCamera(_x) {
        return _ref.apply(this, arguments);
      };
    }();
    var status_rtsp_txt = _constants_status__WEBPACK_IMPORTED_MODULE_4__.STATUS_RTSP_TXT;
    var status_integration_txt = _constants_status__WEBPACK_IMPORTED_MODULE_4__.STATUS_INTEGRATION_TXT;
    // const status_core_ai_txt = STATUS_CORE_AI_TXT
    var status_stream_txt = _constants_status__WEBPACK_IMPORTED_MODULE_4__.STATUS_STREAM_TXT;
    var status_no_event_txt = _constants_status__WEBPACK_IMPORTED_MODULE_4__.STATUS_NO_EVENT_TXT;
    var status_unsend_file_txt = _constants_status__WEBPACK_IMPORTED_MODULE_4__.STATUS_UNSEND_FILE_TXT;
    return {
      description_rtsp: description_rtsp,
      isLoading: isLoading,
      initCamera: initCamera,
      checkedRTSP: checkedRTSP,
      checkedIntegration: checkedIntegration,
      // checkedCoreAI,
      checkedNoEvent: checkedNoEvent,
      checkedStream: checkedStream,
      checkedUnsendFile: checkedUnsendFile,
      onChangeRTSP: onChangeRTSP,
      onChangeIntegration: onChangeIntegration,
      // onChangeCoreAI,
      onChangeNoEvent: onChangeNoEvent,
      onChangeStream: onChangeStream,
      onChangeUnsendFile: onChangeUnsendFile,
      statusError: statusError,
      items: items,
      columns: columns,
      tableQuery: tableQuery,
      pagination: pagination,
      perPageOptions: perPageOptions,
      status_rtsp_txt: status_rtsp_txt,
      status_integration_txt: status_integration_txt,
      // status_core_ai_txt,
      status_stream_txt: status_stream_txt,
      status_no_event_txt: status_no_event_txt,
      status_unsend_file_txt: status_unsend_file_txt
    };
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/cameraMonitorLog/TagComponent.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/cameraMonitorLog/TagComponent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_status__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/constants/status */ "./resources/js/constants/status.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    isTag: {
      type: Boolean,
      "default": 1
    },
    value: {
      type: String,
      "default": 0
    },
    color: {
      type: String
    },
    data: {
      type: Object,
      "default": {}
    }
  },
  setup: function setup() {
    var status_rtsp_txt = _constants_status__WEBPACK_IMPORTED_MODULE_0__.STATUS_RTSP_TXT;
    var status_integration_txt = _constants_status__WEBPACK_IMPORTED_MODULE_0__.STATUS_INTEGRATION_TXT;
    // const status_core_ai_txt = STATUS_CORE_AI_TXT
    var status_stream_txt = _constants_status__WEBPACK_IMPORTED_MODULE_0__.STATUS_STREAM_TXT;
    var status_no_event_txt = _constants_status__WEBPACK_IMPORTED_MODULE_0__.STATUS_NO_EVENT_TXT;
    var status_unsend_file_txt = _constants_status__WEBPACK_IMPORTED_MODULE_0__.STATUS_UNSEND_FILE_TXT;
    return {
      status_rtsp_txt: status_rtsp_txt,
      status_integration_txt: status_integration_txt,
      // status_core_ai_txt,
      status_stream_txt: status_stream_txt,
      status_no_event_txt: status_no_event_txt,
      status_unsend_file_txt: status_unsend_file_txt
    };
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/cameraMonitorLog/List.vue?vue&type=template&id=052ce5a5":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/cameraMonitorLog/List.vue?vue&type=template&id=052ce5a5 ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "white--text"
};
var _hoisted_2 = {
  "class": "white--text"
};
var _hoisted_3 = {
  "class": "white--text"
};
var _hoisted_4 = {
  "class": "white--text"
};
var _hoisted_5 = {
  "class": "white--text"
};
var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": ""
}, "Đang tải ...", -1 /* HOISTED */);
var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Không có dữ liệu ");
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_el_check_tag = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-check-tag");
  var _component_table_body = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("table-body");
  var _component_Tag_component = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Tag-component");
  var _component_table_body_cell = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("table-body-cell");
  var _component_data_table = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("data-table");
  var _component_portlet = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("portlet");
  var _component_preloader = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("preloader");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_portlet, {
    title: "Theo dõi log camera"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_check_tag, {
        checked: $setup.checkedRTSP,
        onChange: $setup.onChangeRTSP,
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["mr-3", $setup.checkedRTSP ? 'blue_darken--bg' : 'dark_lighten_2--bg'])
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_1, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.status_rtsp_txt), 1 /* TEXT */)];
        }),

        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["checked", "onChange", "class"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_check_tag, {
        checked: $setup.checkedIntegration,
        onChange: $setup.onChangeIntegration,
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["mr-3", $setup.checkedIntegration ? 'blue_lighten--bg' : 'dark_lighten_2--bg'])
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.status_integration_txt), 1 /* TEXT */)];
        }),

        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["checked", "onChange", "class"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <el-check-tag\n            :checked=\"checkedCoreAI\"\n            @change=\"onChangeCoreAI\"\n            class=\"mr-3\"\n            :class=\"checkedCoreAI ? 'red_lighten_3--bg' : 'dark_lighten_2--bg'\"\n        >\n            <template #>\n                <span class=\"white--text\">{{ status_core_ai_txt }}</span>\n            </template>\n        </el-check-tag> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_check_tag, {
        checked: $setup.checkedStream,
        onChange: $setup.onChangeStream,
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["mr-3", $setup.checkedStream ? 'orange_lighten--bg' : 'dark_lighten_2--bg'])
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.status_stream_txt), 1 /* TEXT */)];
        }),

        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["checked", "onChange", "class"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_check_tag, {
        checked: $setup.checkedNoEvent,
        onChange: $setup.onChangeNoEvent,
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["mr-3", $setup.checkedNoEvent ? 'green_darken_2--bg' : 'dark_lighten_2--bg'])
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.status_no_event_txt), 1 /* TEXT */)];
        }),

        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["checked", "onChange", "class"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_check_tag, {
        checked: $setup.checkedUnsendFile,
        onChange: $setup.onChangeUnsendFile,
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["mr-3", $setup.checkedUnsendFile ? 'gray_lighten_2--bg' : 'dark_lighten_2--bg'])
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.status_unsend_file_txt), 1 /* TEXT */)];
        }),

        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["checked", "onChange", "class"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_data_table, {
        rows: $setup.items,
        pagination: $setup.pagination,
        columns: $setup.columns,
        perPageOptions: $setup.perPageOptions,
        onLoadData: $setup.initCamera,
        filter: "",
        striped: "",
        hoverable: "",
        "class": "mt-3",
        query: $setup.tableQuery
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createSlots)({
        tbody: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (_ref) {
          var row = _ref.row;
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_table_body, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.created_at), 1 /* TEXT */)];
            }),

            _: 2 /* DYNAMIC */
          }, 1024 /* DYNAMIC_SLOTS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_table_body, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.camera ? row.camera.name : ''), 1 /* TEXT */)];
            }),

            _: 2 /* DYNAMIC */
          }, 1024 /* DYNAMIC_SLOTS */), row.status_rtsp && row.status_integration && row.status_stream && row.status_no_event && row.status_unsend_file ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            key: 0
          }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_table_body), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_table_body)], 64 /* STABLE_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            key: 1
          }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_table_body, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag_component, {
                data: row
              }, null, 8 /* PROPS */, ["data"])];
            }),
            _: 2 /* DYNAMIC */
          }, 1024 /* DYNAMIC_SLOTS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_table_body, {
            style: {
              "text-align": "left"
            }
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag_component, {
                data: row,
                isTag: false
              }, null, 8 /* PROPS */, ["data"])];
            }),
            _: 2 /* DYNAMIC */
          }, 1024 /* DYNAMIC_SLOTS */)], 64 /* STABLE_FRAGMENT */))];
        }),

        loading: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_6];
        }),
        "pagination-info": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Hiển thị " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.pagination.from + ' - ' + $setup.pagination.to) + " của " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.pagination.total) + " bản ghi ", 1 /* TEXT */)];
        }),

        _: 2 /* DYNAMIC */
      }, [!$setup.isLoading ? {
        name: "empty",
        fn: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_table_body_cell, {
            colspan: "7"
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [_hoisted_7];
            }),
            _: 1 /* STABLE */
          })];
        })
      } : undefined]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["rows", "pagination", "columns", "perPageOptions", "onLoadData", "query"])];
    }),
    _: 1 /* STABLE */
  }), $setup.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_preloader, {
    key: 0
  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64 /* STABLE_FRAGMENT */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/cameraMonitorLog/TagComponent.vue?vue&type=template&id=3c3f73ec":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/cameraMonitorLog/TagComponent.vue?vue&type=template&id=3c3f73ec ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  key: 0
};
var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* HOISTED */);
var _hoisted_3 = {
  key: 1
};
var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* HOISTED */);
var _hoisted_5 = {
  key: 2
};
var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* HOISTED */);
var _hoisted_7 = {
  key: 3
};
var _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* HOISTED */);
var _hoisted_9 = {
  key: 4
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_el_tag = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-tag");
  return $props.isTag ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 0
  }, [!$props.data.status_rtsp ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_tag, {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["ml-2", "blue_darken--bg blue_darken--border"]),
    effect: "dark"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.status_rtsp_txt), 1 /* TEXT */)];
    }),

    _: 1 /* STABLE */
  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$props.data.status_integration ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_tag, {
    key: 1,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["ml-2", "blue_lighten--bg blue_lighten--border"]),
    effect: "dark"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.status_integration_txt), 1 /* TEXT */)];
    }),

    _: 1 /* STABLE */
  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <el-tag\n            v-if=\"!data.status_core_ai\"\n            class=\"ml-2\"\n            effect=\"dark\"\n            :class=\"`red_lighten_3--bg red_lighten_3--border`\"\n        >\n            <strong>{{ status_core_ai_txt }}</strong>\n        </el-tag> "), !$props.data.status_stream ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_tag, {
    key: 2,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["ml-2", "orange_lighten--bg orange_lighten--border"]),
    effect: "dark"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.status_stream_txt), 1 /* TEXT */)];
    }),

    _: 1 /* STABLE */
  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$props.data.status_no_event ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_tag, {
    key: 3,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["ml-2", "green_darken_2--bg green_darken_2--border"]),
    effect: "dark"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.status_no_event_txt), 1 /* TEXT */)];
    }),

    _: 1 /* STABLE */
  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$props.data.status_unsend_file ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_tag, {
    key: 4,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["ml-2", "gray_lighten_2--bg gray_lighten_2--border"]),
    effect: "dark"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.status_unsend_file_txt), 1 /* TEXT */)];
    }),

    _: 1 /* STABLE */
  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64 /* STABLE_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 1
  }, [!$props.data.status_rtsp ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("strong", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.data.description_rtsp) + " ", 1 /* TEXT */), _hoisted_2])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$props.data.status_integration ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("strong", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.data.description_integration) + " ", 1 /* TEXT */), _hoisted_4])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <strong v-if=\"!data.status_core_ai\">{{ data.description_core_ai }} <br /></strong> "), !$props.data.status_stream ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("strong", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.data.description_stream) + " ", 1 /* TEXT */), _hoisted_6])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$props.data.status_no_event ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("strong", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.data.description_no_event) + " ", 1 /* TEXT */), _hoisted_8])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$props.data.status_unsend_file ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("strong", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.data.description_unsend_file), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64 /* STABLE_FRAGMENT */));
}

/***/ }),

/***/ "./resources/js/constants/status.js":
/*!******************************************!*\
  !*** ./resources/js/constants/status.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STATUS_CORE_AI": () => (/* binding */ STATUS_CORE_AI),
/* harmony export */   "STATUS_CORE_AI_TXT": () => (/* binding */ STATUS_CORE_AI_TXT),
/* harmony export */   "STATUS_INTEGRATION": () => (/* binding */ STATUS_INTEGRATION),
/* harmony export */   "STATUS_INTEGRATION_TXT": () => (/* binding */ STATUS_INTEGRATION_TXT),
/* harmony export */   "STATUS_NO_EVENT": () => (/* binding */ STATUS_NO_EVENT),
/* harmony export */   "STATUS_NO_EVENT_TXT": () => (/* binding */ STATUS_NO_EVENT_TXT),
/* harmony export */   "STATUS_RTSP": () => (/* binding */ STATUS_RTSP),
/* harmony export */   "STATUS_RTSP_TXT": () => (/* binding */ STATUS_RTSP_TXT),
/* harmony export */   "STATUS_STREAM": () => (/* binding */ STATUS_STREAM),
/* harmony export */   "STATUS_STREAM_TXT": () => (/* binding */ STATUS_STREAM_TXT),
/* harmony export */   "STATUS_UNSEND_FILE": () => (/* binding */ STATUS_UNSEND_FILE),
/* harmony export */   "STATUS_UNSEND_FILE_TXT": () => (/* binding */ STATUS_UNSEND_FILE_TXT)
/* harmony export */ });
var STATUS_RTSP = 'status_rtsp';
var STATUS_INTEGRATION = 'status_integration';
var STATUS_CORE_AI = 'status_core_ai';
var STATUS_STREAM = 'status_stream';
var STATUS_NO_EVENT = 'status_no_event';
var STATUS_UNSEND_FILE = 'status_unsend_file';
var STATUS_RTSP_TXT = 'Kết nối RTSP';
var STATUS_INTEGRATION_TXT = 'Tích hợp';
var STATUS_CORE_AI_TXT = 'Module AI';
var STATUS_STREAM_TXT = 'Camera stream';
var STATUS_NO_EVENT_TXT = 'Sinh sự kiện';
var STATUS_UNSEND_FILE_TXT = 'Truyền file';

/***/ }),

/***/ "./resources/js/pages/cameraMonitorLog/List.vue":
/*!******************************************************!*\
  !*** ./resources/js/pages/cameraMonitorLog/List.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _List_vue_vue_type_template_id_052ce5a5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./List.vue?vue&type=template&id=052ce5a5 */ "./resources/js/pages/cameraMonitorLog/List.vue?vue&type=template&id=052ce5a5");
/* harmony import */ var _List_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./List.vue?vue&type=script&lang=js */ "./resources/js/pages/cameraMonitorLog/List.vue?vue&type=script&lang=js");
/* harmony import */ var _home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_List_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_List_vue_vue_type_template_id_052ce5a5__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/pages/cameraMonitorLog/List.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/pages/cameraMonitorLog/TagComponent.vue":
/*!**************************************************************!*\
  !*** ./resources/js/pages/cameraMonitorLog/TagComponent.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TagComponent_vue_vue_type_template_id_3c3f73ec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagComponent.vue?vue&type=template&id=3c3f73ec */ "./resources/js/pages/cameraMonitorLog/TagComponent.vue?vue&type=template&id=3c3f73ec");
/* harmony import */ var _TagComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagComponent.vue?vue&type=script&lang=js */ "./resources/js/pages/cameraMonitorLog/TagComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_TagComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TagComponent_vue_vue_type_template_id_3c3f73ec__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/pages/cameraMonitorLog/TagComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/pages/cameraMonitorLog/List.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/pages/cameraMonitorLog/List.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_List_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_List_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./List.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/cameraMonitorLog/List.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/pages/cameraMonitorLog/TagComponent.vue?vue&type=script&lang=js":
/*!**************************************************************************************!*\
  !*** ./resources/js/pages/cameraMonitorLog/TagComponent.vue?vue&type=script&lang=js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TagComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TagComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TagComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/cameraMonitorLog/TagComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/pages/cameraMonitorLog/List.vue?vue&type=template&id=052ce5a5":
/*!************************************************************************************!*\
  !*** ./resources/js/pages/cameraMonitorLog/List.vue?vue&type=template&id=052ce5a5 ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_List_vue_vue_type_template_id_052ce5a5__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_List_vue_vue_type_template_id_052ce5a5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./List.vue?vue&type=template&id=052ce5a5 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/cameraMonitorLog/List.vue?vue&type=template&id=052ce5a5");


/***/ }),

/***/ "./resources/js/pages/cameraMonitorLog/TagComponent.vue?vue&type=template&id=3c3f73ec":
/*!********************************************************************************************!*\
  !*** ./resources/js/pages/cameraMonitorLog/TagComponent.vue?vue&type=template&id=3c3f73ec ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TagComponent_vue_vue_type_template_id_3c3f73ec__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TagComponent_vue_vue_type_template_id_3c3f73ec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TagComponent.vue?vue&type=template&id=3c3f73ec */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/cameraMonitorLog/TagComponent.vue?vue&type=template&id=3c3f73ec");


/***/ })

}]);