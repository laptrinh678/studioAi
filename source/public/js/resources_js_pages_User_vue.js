"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_User_vue"],{

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/User.vue?vue&type=style&index=0&id=99948d58&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/User.vue?vue&type=style&index=0&id=99948d58&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\np[data-v-99948d58] {\n  margin-bottom: 4px;\n  font-weight: bold;\n  font-size: 15px;\n}\n.permission-container[data-v-99948d58] {\n  border: 1px solid #dcdfe6;\n  border-radius: 5px;\n  padding: 10px;\n  max-width: 100%;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/User.vue?vue&type=script&setup=true&lang=js":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/User.vue?vue&type=script&setup=true&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var vue_toastification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-toastification */ "./node_modules/vue-toastification/dist/index.mjs");
/* harmony import */ var _services_AdminService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/services/AdminService */ "./resources/js/services/AdminService.js");
/* harmony import */ var element_plus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! element-plus */ "./node_modules/element-plus/es/components/loading/index.mjs");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lang_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lang/i18n */ "./resources/js/lang/i18n.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'User',
  setup: function setup(__props, _ref) {
    var expose = _ref.expose;
    expose();
    var currenPage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(1);
    var userData = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var availableTime = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var checkAll = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var isIndeterminate = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var checkedPermissions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var permissions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var options = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var toast = (0,vue_toastification__WEBPACK_IMPORTED_MODULE_1__.useToast)();
    var userEmail = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("");
    var userRow = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("");
    var totalPage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    var perPage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    var nullRecord = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var anyFeature = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var titlePermissions = {
      'textToImage': _lang_i18n__WEBPACK_IMPORTED_MODULE_5__["default"].global.t('user_management.text_to_image'),
      'imageToImage': _lang_i18n__WEBPACK_IMPORTED_MODULE_5__["default"].global.t('user_management.image_to_image'),
      'virtualHuman': _lang_i18n__WEBPACK_IMPORTED_MODULE_5__["default"].global.t('user_management.virtual_human'),
      'virtualHumanV2': _lang_i18n__WEBPACK_IMPORTED_MODULE_5__["default"].global.t('user_management.virtual_human_v2')
    };
    var selectAll = (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)({
      startDate: '',
      endDate: ''
    });
    var features = (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)({
      textToImage: {
        status: false,
        date: []
      },
      imageToImage: {
        status: false,
        date: []
      },
      virtualHuman: {
        status: false,
        date: []
      },
      virtualHumanV2: {
        status: false,
        date: []
      }
    });
    var handleCheckAllChange = function handleCheckAllChange(val) {
      (0,lodash__WEBPACK_IMPORTED_MODULE_4__.forEach)(features, function (feature) {
        feature.status = val;
      });
      anyFeature.value = val;
      checkedPermissions.value = val ? permissions.value : [];
      isIndeterminate.value = false;
    };
    var handleCheckedChange = function handleCheckedChange(value) {
      var checkedCount = value.length;
      checkAll.value = checkedCount === permissions.value.length;
      isIndeterminate.value = checkedCount > 0 && checkedCount < permissions.value.length;
    };
    var changePage = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(page) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return onSearch(page);
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function changePage(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    var resetFormData = function resetFormData() {
      checkAll.value = false;
      isIndeterminate.value = false;
      permissions.value = [];
      checkedPermissions.value = [];
    };
    var onSearch = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var page,
          loading,
          users,
          _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              page = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 1;
              currenPage.value = page === 1 ? 1 : page;
              _context2.next = 4;
              return resetFormData();
            case 4:
              userData.value = [];
              loading = element_plus__WEBPACK_IMPORTED_MODULE_6__.ElLoading.service({
                lock: true,
                text: _lang_i18n__WEBPACK_IMPORTED_MODULE_5__["default"].global.t('common.loading'),
                background: 'rgba(0, 0, 0, 0.7)'
              });
              if (!((0,lodash__WEBPACK_IMPORTED_MODULE_4__.trim)(userEmail.value) === '')) {
                _context2.next = 12;
                break;
              }
              _context2.next = 9;
              return _services_AdminService__WEBPACK_IMPORTED_MODULE_2__["default"].listUser(page);
            case 9:
              _context2.t0 = _context2.sent;
              _context2.next = 15;
              break;
            case 12:
              _context2.next = 14;
              return _services_AdminService__WEBPACK_IMPORTED_MODULE_2__["default"].findUser((0,lodash__WEBPACK_IMPORTED_MODULE_4__.trim)(userEmail.value, " "), page);
            case 14:
              _context2.t0 = _context2.sent;
            case 15:
              users = _context2.t0;
              if (users.status === 200) {
                loading.close();
                totalPage.value = users.data.total;
                perPage.value = users.data.per_page;
                nullRecord.value = totalPage.value === 0;
                Object.keys(users.data.data).map(function (key) {
                  userData.value.push({
                    stt: (currenPage.value - 1) * 15 + 1 + Number(key),
                    name: users.data.data[key]['name'],
                    email: users.data.data[key]['email'],
                    phone_number: users.data.data[key]['phone_number']
                  });
                });
              }
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function onSearch() {
        return _ref3.apply(this, arguments);
      };
    }();
    var onSubmit = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var emptyDate, invalidDate, isStartDateGtEndDate, loading, res;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              // Thời gian sử dụng không được để trống
              emptyDate = (0,lodash__WEBPACK_IMPORTED_MODULE_4__.some)(features, function (feature) {
                return feature.status && (!feature.date[0] || !feature.date[1] || feature.date.length === 0);
              });
              if (!emptyDate) {
                _context3.next = 4;
                break;
              }
              toast.error(_lang_i18n__WEBPACK_IMPORTED_MODULE_5__["default"].global.t('user_management.date_required'));
              return _context3.abrupt("return");
            case 4:
              // Thời gian hết hạn phải > hiện tại
              invalidDate = (0,lodash__WEBPACK_IMPORTED_MODULE_4__.some)(features, function (feature) {
                return feature.status && new Date(feature.date[1]).setHours(23, 59, 59) < new Date();
              });
              if (!invalidDate) {
                _context3.next = 8;
                break;
              }
              toast.error(_lang_i18n__WEBPACK_IMPORTED_MODULE_5__["default"].global.t('user_management.date_invalid'));
              return _context3.abrupt("return");
            case 8:
              // Thời gian bắt đầu < thời gian kết thúc
              isStartDateGtEndDate = (0,lodash__WEBPACK_IMPORTED_MODULE_4__.some)(features, function (feature) {
                return feature.status && new Date(feature.date[0]) > new Date(feature.date[1]).setHours(23, 59, 59);
              });
              if (!isStartDateGtEndDate) {
                _context3.next = 12;
                break;
              }
              toast.error(_lang_i18n__WEBPACK_IMPORTED_MODULE_5__["default"].global.t('user_management.start_gt_end'));
              return _context3.abrupt("return");
            case 12:
              loading = element_plus__WEBPACK_IMPORTED_MODULE_6__.ElLoading.service({
                lock: true,
                text: _lang_i18n__WEBPACK_IMPORTED_MODULE_5__["default"].global.t('common.loading'),
                background: 'rgba(0, 0, 0, 0.7)'
              });
              _context3.next = 15;
              return _services_AdminService__WEBPACK_IMPORTED_MODULE_2__["default"].updateUser({
                email: userRow.value,
                permissions: checkedPermissions.value,
                date: availableTime.value,
                features: features
              });
            case 15:
              res = _context3.sent;
              if (res.data) {
                toast.success(_lang_i18n__WEBPACK_IMPORTED_MODULE_5__["default"].global.t('common.update_success'));
                loading.close();
              }
            case 17:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function onSubmit() {
        return _ref4.apply(this, arguments);
      };
    }();
    var clickEdit = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(email) {
        var loading, _yield$AdminService$g, data, userPermission;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              selectAll.startDate = '';
              selectAll.endDate = '';
              anyFeature.value = false;
              loading = element_plus__WEBPACK_IMPORTED_MODULE_6__.ElLoading.service({
                lock: true,
                text: _lang_i18n__WEBPACK_IMPORTED_MODULE_5__["default"].global.t('common.loading'),
                background: 'rgba(0, 0, 0, 0.7)'
              });
              _context4.next = 6;
              return resetFormData();
            case 6:
              userRow.value = email;
              _context4.next = 9;
              return _services_AdminService__WEBPACK_IMPORTED_MODULE_2__["default"].getUser(email);
            case 9:
              _yield$AdminService$g = _context4.sent;
              data = _yield$AdminService$g.data;
              if (data) loading.close();
              userPermission = JSON.parse(data.permissions);
              Object.keys(userPermission).map(function (key) {
                if (titlePermissions.hasOwnProperty(key)) {
                  if (userPermission[key].status) {
                    anyFeature.value = true;
                    isIndeterminate.value = true;
                    checkedPermissions.value.push(key);
                  }
                  var start_date = userPermission[key].start_date ? userPermission[key].start_date : new Date((0,moment__WEBPACK_IMPORTED_MODULE_3__.now)()).toISOString();
                  var end_date = userPermission[key].end_date ? userPermission[key].end_date : new Date((0,moment__WEBPACK_IMPORTED_MODULE_3__.now)()).toISOString();
                  features[key].date = [start_date.slice(0, 10), end_date.slice(0, 10)];
                  features[key].status = userPermission[key].status;
                  permissions.value.push(key);
                }
              });

              // Active radio "Chọn tất cả" nếu tất cả các chức năng được cho phép dùng
              if (checkedPermissions.value.length === Object.keys(titlePermissions).length) {
                checkAll.value = true;
                isIndeterminate.value = false;
              }
              if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.includes)(permissions.value, 'virtualHumanV2')) {
                permissions.value.push('virtualHumanV2');
              }
            case 16:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return function clickEdit(_x2) {
        return _ref5.apply(this, arguments);
      };
    }();
    var clickDelete = /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(email) {
        var _yield$AdminService$d, data;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return resetFormData();
            case 2:
              userRow.value = email;
              _context5.next = 5;
              return _services_AdminService__WEBPACK_IMPORTED_MODULE_2__["default"].deleteUser({
                email: email
              });
            case 5:
              _yield$AdminService$d = _context5.sent;
              data = _yield$AdminService$d.data;
              if (!data) {
                _context5.next = 11;
                break;
              }
              toast.success(_lang_i18n__WEBPACK_IMPORTED_MODULE_5__["default"].global.t('common.delete_success'));
              _context5.next = 11;
              return onSearch();
            case 11:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      return function clickDelete(_x3) {
        return _ref6.apply(this, arguments);
      };
    }();
    var changeStatus = function changeStatus(status, item) {
      features[item].status = status;
      if (!status) {
        var allActive = (0,lodash__WEBPACK_IMPORTED_MODULE_4__.every)(features, function (feature) {
          return feature.status === false;
        });
        if (allActive) anyFeature.value = false;
      } else anyFeature.value = true;
    };
    var changeAllStartDate = function changeAllStartDate(item) {
      (0,lodash__WEBPACK_IMPORTED_MODULE_4__.forEach)(features, function (feature) {
        if (feature.status) feature.date[0] = item;
      });
    };
    var changeAllEndDate = function changeAllEndDate(item) {
      (0,lodash__WEBPACK_IMPORTED_MODULE_4__.forEach)(features, function (feature) {
        if (feature.status) feature.date[1] = item;
      });
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeMount)(function () {
      onSearch();
    });
    var __returned__ = {
      currenPage: currenPage,
      userData: userData,
      availableTime: availableTime,
      checkAll: checkAll,
      isIndeterminate: isIndeterminate,
      checkedPermissions: checkedPermissions,
      permissions: permissions,
      options: options,
      toast: toast,
      userEmail: userEmail,
      userRow: userRow,
      totalPage: totalPage,
      perPage: perPage,
      nullRecord: nullRecord,
      anyFeature: anyFeature,
      titlePermissions: titlePermissions,
      selectAll: selectAll,
      features: features,
      handleCheckAllChange: handleCheckAllChange,
      handleCheckedChange: handleCheckedChange,
      changePage: changePage,
      resetFormData: resetFormData,
      onSearch: onSearch,
      onSubmit: onSubmit,
      clickEdit: clickEdit,
      clickDelete: clickDelete,
      changeStatus: changeStatus,
      changeAllStartDate: changeAllStartDate,
      changeAllEndDate: changeAllEndDate,
      nextTick: vue__WEBPACK_IMPORTED_MODULE_0__.nextTick,
      onBeforeMount: vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeMount,
      reactive: vue__WEBPACK_IMPORTED_MODULE_0__.reactive,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
      watch: vue__WEBPACK_IMPORTED_MODULE_0__.watch,
      useToast: vue_toastification__WEBPACK_IMPORTED_MODULE_1__.useToast,
      AdminService: _services_AdminService__WEBPACK_IMPORTED_MODULE_2__["default"],
      ElLoading: element_plus__WEBPACK_IMPORTED_MODULE_6__.ElLoading,
      now: moment__WEBPACK_IMPORTED_MODULE_3__.now,
      forEach: lodash__WEBPACK_IMPORTED_MODULE_4__.forEach,
      includes: lodash__WEBPACK_IMPORTED_MODULE_4__.includes,
      every: lodash__WEBPACK_IMPORTED_MODULE_4__.every,
      trim: lodash__WEBPACK_IMPORTED_MODULE_4__.trim,
      some: lodash__WEBPACK_IMPORTED_MODULE_4__.some,
      i18n: _lang_i18n__WEBPACK_IMPORTED_MODULE_5__["default"]
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/User.vue?vue&type=template&id=99948d58&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/User.vue?vue&type=template&id=99948d58&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _withScopeId = function _withScopeId(n) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.pushScopeId)("data-v-99948d58"), n = n(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.popScopeId)(), n;
};
var _hoisted_1 = {
  "class": "h3 mb-3"
};
var _hoisted_2 = {
  "class": "row user-management"
};
var _hoisted_3 = {
  "class": "col-12 pt-2 mb-3 d-flex gap-3 align-items-end"
};
var _hoisted_4 = {
  "class": "d-flex gap-3"
};
var _hoisted_5 = {
  "class": "list-user pt-2 w-50"
};
var _hoisted_6 = {
  key: 1
};
var _hoisted_7 = {
  key: 0
};
var _hoisted_8 = {
  "class": "setting-user pt-2"
};
var _hoisted_9 = {
  key: 0,
  "class": "permission-container d-flex flex-column"
};
var _hoisted_10 = {
  "class": "d-flex"
};
var _hoisted_11 = {
  "class": "mb-2"
};
var _hoisted_12 = {
  "class": "d-flex flex-column gap-3"
};
var _hoisted_13 = {
  "class": "d-flex flex-column gap-3"
};
var _hoisted_14 = {
  "class": "d-flex gap-3"
};
var _hoisted_15 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, "-", -1 /* HOISTED */);
});
var _hoisted_16 = {
  "class": "d-flex gap-3"
};
var _hoisted_17 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, "-", -1 /* HOISTED */);
});
var _hoisted_18 = {
  "class": "d-flex gap-3"
};
var _hoisted_19 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, "-", -1 /* HOISTED */);
});
var _hoisted_20 = {
  "class": "d-flex gap-3"
};
var _hoisted_21 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, "-", -1 /* HOISTED */);
});
var _hoisted_22 = {
  "class": "d-flex gap-3"
};
var _hoisted_23 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, "-", -1 /* HOISTED */);
});
var _hoisted_24 = {
  "class": "mt-3"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_el_input = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-input");
  var _component_el_button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-button");
  var _component_el_table_column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-table-column");
  var _component_el_popconfirm = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-popconfirm");
  var _component_el_table = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-table");
  var _component_el_pagination = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-pagination");
  var _component_el_checkbox = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-checkbox");
  var _component_el_checkbox_group = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-checkbox-group");
  var _component_el_date_picker = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-date-picker");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_1, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('user_management.permission_management')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('user_management.email_info')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
    modelValue: $setup.userEmail,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $setup.userEmail = $event;
    }),
    style: {
      "width": "240px"
    },
    placeholder: _ctx.$t('user_management.form.email_input')
  }, null, 8 /* PROPS */, ["modelValue", "placeholder"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $setup.onSearch();
    }),
    "class": "button_submit",
    type: "danger",
    style: {
      "font-family": "'FS Magistral Medium', sans-serif"
    }
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('common.search')), 1 /* TEXT */)];
    }),

    _: 1 /* STABLE */
  })])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [$setup.userData.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_table, {
    key: 0,
    data: $setup.userData,
    border: "",
    style: {
      "width": "100%"
    }
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_table_column, {
        "class-name": "title",
        prop: "stt",
        label: _ctx.$t('user_management.no'),
        "min-width": "10"
      }, null, 8 /* PROPS */, ["label"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_table_column, {
        "class-name": "title",
        prop: "name",
        label: _ctx.$t('user_management.name'),
        "min-width": "25"
      }, null, 8 /* PROPS */, ["label"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_table_column, {
        "class-name": "title",
        prop: "email",
        label: _ctx.$t('user_management.email'),
        "min-width": "30"
      }, null, 8 /* PROPS */, ["label"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_table_column, {
        "class-name": "title",
        prop: "phone_number",
        label: _ctx.$t('user_management.phone_number'),
        "min-width": "15"
      }, null, 8 /* PROPS */, ["label"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_table_column, {
        "class-name": "title",
        fixed: "right",
        label: _ctx.$t('user_management.permission'),
        "min-width": "20"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (scope) {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
            link: "",
            type: "primary",
            size: "small",
            onClick: function onClick($event) {
              return $setup.clickEdit(scope.row.email);
            }
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('common.edit')), 1 /* TEXT */)];
            }),

            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_popconfirm, {
            "confirm-button-text": "Yes",
            "cancel-button-text": "No",
            icon: _ctx.InfoFilled,
            "icon-color": "#626AEF",
            title: _ctx.$t('user_management.form.confirm_delete'),
            onConfirm: function onConfirm($event) {
              return $setup.clickDelete(scope.row.email);
            },
            width: 300
          }, {
            reference: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
                link: "",
                type: "warning",
                size: "small"
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('common.delete')), 1 /* TEXT */)];
                }),

                _: 1 /* STABLE */
              })];
            }),

            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["icon", "title", "onConfirm"])];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["label"])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["data"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.nullRecord ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('user_management.no_data')), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $setup.totalPage > $setup.perPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_pagination, {
    "current-page": $setup.currenPage,
    "page-size": $setup.perPage,
    size: "small",
    background: "",
    layout: "prev, pager, next",
    total: $setup.totalPage,
    "class": "mt-4",
    onCurrentChange: $setup.changePage
  }, null, 8 /* PROPS */, ["current-page", "page-size", "total"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [$setup.permissions.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('user_management.form.permission_title')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_checkbox, {
    modelValue: $setup.checkAll,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $setup.checkAll = $event;
    }),
    indeterminate: $setup.isIndeterminate,
    onChange: $setup.handleCheckAllChange
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('user_management.form.select_all')), 1 /* TEXT */)];
    }),

    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["modelValue", "indeterminate"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_checkbox_group, {
    modelValue: $setup.checkedPermissions,
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $setup.checkedPermissions = $event;
    }),
    onChange: $setup.handleCheckedChange,
    "class": "d-flex flex-column gap-3"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.permissions, function (item) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_checkbox, {
          label: item,
          value: item,
          onChange: function onChange($event) {
            return $setup.changeStatus($event, item);
          }
        }, {
          "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
            return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.titlePermissions[item]), 1 /* TEXT */)];
          }),

          _: 2 /* DYNAMIC */
        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["label", "value", "onChange"]);
      }), 256 /* UNKEYED_FRAGMENT */))];
    }),

    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["modelValue"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('user_management.form.available_date')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Select all "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_date_picker, {
    modelValue: $setup.selectAll.startDate,
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return $setup.selectAll.startDate = $event;
    }),
    placeholder: _ctx.$t('user_management.form.from_date'),
    format: "YYYY/MM/DD",
    type: "date",
    "value-format": "YYYY/MM/DD",
    onChange: $setup.changeAllStartDate,
    disabled: !$setup.anyFeature
  }, null, 8 /* PROPS */, ["modelValue", "placeholder", "disabled"]), _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_date_picker, {
    modelValue: $setup.selectAll.endDate,
    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
      return $setup.selectAll.endDate = $event;
    }),
    placeholder: _ctx.$t('user_management.form.to_date'),
    format: "YYYY/MM/DD",
    type: "date",
    "value-format": "YYYY/MM/DD",
    onChange: $setup.changeAllEndDate,
    disabled: !$setup.anyFeature
  }, null, 8 /* PROPS */, ["modelValue", "placeholder", "disabled"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Text to image "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_date_picker, {
    modelValue: $setup.features.textToImage.date[0],
    "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
      return $setup.features.textToImage.date[0] = $event;
    }),
    placeholder: _ctx.$t('user_management.form.from_date'),
    format: "YYYY/MM/DD",
    type: "date",
    "value-format": "YYYY/MM/DD",
    disabled: !$setup.features.textToImage.status
  }, null, 8 /* PROPS */, ["modelValue", "placeholder", "disabled"]), _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_date_picker, {
    modelValue: $setup.features.textToImage.date[1],
    "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
      return $setup.features.textToImage.date[1] = $event;
    }),
    placeholder: _ctx.$t('user_management.form.to_date'),
    format: "YYYY/MM/DD",
    type: "date",
    "value-format": "YYYY/MM/DD",
    disabled: !$setup.features.textToImage.status
  }, null, 8 /* PROPS */, ["modelValue", "placeholder", "disabled"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Image to image "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_date_picker, {
    modelValue: $setup.features.imageToImage.date[0],
    "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) {
      return $setup.features.imageToImage.date[0] = $event;
    }),
    placeholder: _ctx.$t('user_management.form.from_date'),
    format: "YYYY/MM/DD",
    type: "date",
    "value-format": "YYYY/MM/DD",
    disabled: !$setup.features.imageToImage.status
  }, null, 8 /* PROPS */, ["modelValue", "placeholder", "disabled"]), _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_date_picker, {
    modelValue: $setup.features.imageToImage.date[1],
    "onUpdate:modelValue": _cache[9] || (_cache[9] = function ($event) {
      return $setup.features.imageToImage.date[1] = $event;
    }),
    placeholder: _ctx.$t('user_management.form.to_date'),
    format: "YYYY/MM/DD",
    type: "date",
    "value-format": "YYYY/MM/DD",
    disabled: !$setup.features.imageToImage.status
  }, null, 8 /* PROPS */, ["modelValue", "placeholder", "disabled"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" MC "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_date_picker, {
    modelValue: $setup.features.virtualHuman.date[0],
    "onUpdate:modelValue": _cache[10] || (_cache[10] = function ($event) {
      return $setup.features.virtualHuman.date[0] = $event;
    }),
    placeholder: _ctx.$t('user_management.form.from_date'),
    format: "YYYY/MM/DD",
    type: "date",
    "value-format": "YYYY/MM/DD",
    disabled: !$setup.features.virtualHuman.status
  }, null, 8 /* PROPS */, ["modelValue", "placeholder", "disabled"]), _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_date_picker, {
    modelValue: $setup.features.virtualHuman.date[1],
    "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) {
      return $setup.features.virtualHuman.date[1] = $event;
    }),
    placeholder: _ctx.$t('user_management.form.to_date'),
    format: "YYYY/MM/DD",
    type: "date",
    "value-format": "YYYY/MM/DD",
    disabled: !$setup.features.virtualHuman.status
  }, null, 8 /* PROPS */, ["modelValue", "placeholder", "disabled"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" MC background "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_date_picker, {
    modelValue: $setup.features.virtualHumanV2.date[0],
    "onUpdate:modelValue": _cache[12] || (_cache[12] = function ($event) {
      return $setup.features.virtualHumanV2.date[0] = $event;
    }),
    placeholder: _ctx.$t('user_management.form.from_date'),
    format: "YYYY/MM/DD",
    type: "date",
    "value-format": "YYYY/MM/DD",
    disabled: !$setup.features.virtualHumanV2.status
  }, null, 8 /* PROPS */, ["modelValue", "placeholder", "disabled"]), _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_date_picker, {
    modelValue: $setup.features.virtualHumanV2.date[1],
    "onUpdate:modelValue": _cache[13] || (_cache[13] = function ($event) {
      return $setup.features.virtualHumanV2.date[1] = $event;
    }),
    placeholder: _ctx.$t('user_management.form.to_date'),
    format: "YYYY/MM/DD",
    type: "date",
    "value-format": "YYYY/MM/DD",
    disabled: !$setup.features.virtualHumanV2.status
  }, null, 8 /* PROPS */, ["modelValue", "placeholder", "disabled"])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
    onClick: _cache[14] || (_cache[14] = function ($event) {
      return $setup.onSubmit();
    }),
    "class": "button_submit",
    type: "danger"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('common.update')), 1 /* TEXT */)];
    }),

    _: 1 /* STABLE */
  })])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])], 64 /* STABLE_FRAGMENT */);
}

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/User.vue?vue&type=style&index=0&id=99948d58&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/User.vue?vue&type=style&index=0&id=99948d58&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_User_vue_vue_type_style_index_0_id_99948d58_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./User.vue?vue&type=style&index=0&id=99948d58&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/User.vue?vue&type=style&index=0&id=99948d58&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_User_vue_vue_type_style_index_0_id_99948d58_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_User_vue_vue_type_style_index_0_id_99948d58_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/pages/User.vue":
/*!*************************************!*\
  !*** ./resources/js/pages/User.vue ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _User_vue_vue_type_template_id_99948d58_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./User.vue?vue&type=template&id=99948d58&scoped=true */ "./resources/js/pages/User.vue?vue&type=template&id=99948d58&scoped=true");
/* harmony import */ var _User_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./User.vue?vue&type=script&setup=true&lang=js */ "./resources/js/pages/User.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _User_vue_vue_type_style_index_0_id_99948d58_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./User.vue?vue&type=style&index=0&id=99948d58&scoped=true&lang=css */ "./resources/js/pages/User.vue?vue&type=style&index=0&id=99948d58&scoped=true&lang=css");
/* harmony import */ var _home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_User_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_User_vue_vue_type_template_id_99948d58_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-99948d58"],['__file',"resources/js/pages/User.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/pages/User.vue?vue&type=script&setup=true&lang=js":
/*!************************************************************************!*\
  !*** ./resources/js/pages/User.vue?vue&type=script&setup=true&lang=js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_User_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_User_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./User.vue?vue&type=script&setup=true&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/User.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/pages/User.vue?vue&type=template&id=99948d58&scoped=true":
/*!*******************************************************************************!*\
  !*** ./resources/js/pages/User.vue?vue&type=template&id=99948d58&scoped=true ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_User_vue_vue_type_template_id_99948d58_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_User_vue_vue_type_template_id_99948d58_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./User.vue?vue&type=template&id=99948d58&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/User.vue?vue&type=template&id=99948d58&scoped=true");


/***/ }),

/***/ "./resources/js/pages/User.vue?vue&type=style&index=0&id=99948d58&scoped=true&lang=css":
/*!*********************************************************************************************!*\
  !*** ./resources/js/pages/User.vue?vue&type=style&index=0&id=99948d58&scoped=true&lang=css ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_User_vue_vue_type_style_index_0_id_99948d58_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./User.vue?vue&type=style&index=0&id=99948d58&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/User.vue?vue&type=style&index=0&id=99948d58&scoped=true&lang=css");


/***/ })

}]);