"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_Verify_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Verify.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Verify.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var element_plus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! element-plus */ "./node_modules/element-plus/es/components/loading/index.mjs");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm-bundler.js");
/* harmony import */ var vue_toastification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-toastification */ "./node_modules/vue-toastification/dist/index.mjs");
/* harmony import */ var _helpers_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/helpers/message */ "./resources/js/helpers/message.js");
/* harmony import */ var _helpers_localStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/localStorage */ "./resources/js/helpers/localStorage.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/store */ "./resources/js/store/index.js");
/* harmony import */ var _store_auth_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/store/auth/actions */ "./resources/js/store/auth/actions.js");








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  setup: function setup(props) {
    var router = (0,vue_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    var route = (0,vue_router__WEBPACK_IMPORTED_MODULE_6__.useRoute)();
    var toast = (0,vue_toastification__WEBPACK_IMPORTED_MODULE_1__.useToast)();
    var code = route.query.code;
    var codeVerify = JSON.parse(localStorage.getItem(_helpers_localStorage__WEBPACK_IMPORTED_MODULE_3__.SSO_VERIFY)).value;
    var error = route.query.error;
    var openFullScreen = function openFullScreen() {
      var loading = element_plus__WEBPACK_IMPORTED_MODULE_7__.ElLoading.service({
        lock: true,
        text: 'Verify',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      if (error !== undefined) {
        toast.error(_helpers_message__WEBPACK_IMPORTED_MODULE_2__.FORBIDDEN);
      }
      setTimeout(function () {
        loading.close();
      }, 2000);
      return _store__WEBPACK_IMPORTED_MODULE_4__["default"].dispatch(_store_auth_actions__WEBPACK_IMPORTED_MODULE_5__.ACTION_GET_TOKEN_SSO, {
        code: code,
        code_verifier: codeVerify
      });
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {
      openFullScreen();
    });
    return {
      openFullScreen: openFullScreen
    };
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Verify.vue?vue&type=template&id=5f28f6c2":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Verify.vue?vue&type=template&id=5f28f6c2 ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return null;
}

/***/ }),

/***/ "./resources/js/pages/Verify.vue":
/*!***************************************!*\
  !*** ./resources/js/pages/Verify.vue ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Verify_vue_vue_type_template_id_5f28f6c2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Verify.vue?vue&type=template&id=5f28f6c2 */ "./resources/js/pages/Verify.vue?vue&type=template&id=5f28f6c2");
/* harmony import */ var _Verify_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Verify.vue?vue&type=script&lang=js */ "./resources/js/pages/Verify.vue?vue&type=script&lang=js");
/* harmony import */ var _home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Verify_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Verify_vue_vue_type_template_id_5f28f6c2__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/pages/Verify.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/pages/Verify.vue?vue&type=script&lang=js":
/*!***************************************************************!*\
  !*** ./resources/js/pages/Verify.vue?vue&type=script&lang=js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Verify_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Verify_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Verify.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Verify.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/pages/Verify.vue?vue&type=template&id=5f28f6c2":
/*!*********************************************************************!*\
  !*** ./resources/js/pages/Verify.vue?vue&type=template&id=5f28f6c2 ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Verify_vue_vue_type_template_id_5f28f6c2__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Verify_vue_vue_type_template_id_5f28f6c2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Verify.vue?vue&type=template&id=5f28f6c2 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Verify.vue?vue&type=template&id=5f28f6c2");


/***/ })

}]);