"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_layouts_LayoutClient_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/layouts/LayoutClient.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/layouts/LayoutClient.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/mixins/layout */ "./resources/js/mixins/layout.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {},
  setup: function setup() {
    var isRouterAlive = (0,vue__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
    var refresh = function refresh() {
      isRouterAlive.value = false;
      setTimeout(function () {
        isRouterAlive.value = true;
      });
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_1__.onMounted)(function () {
      (0,_mixins_layout__WEBPACK_IMPORTED_MODULE_0__.styleSidebar)();
      (0,_mixins_layout__WEBPACK_IMPORTED_MODULE_0__.styleMain)();
    });
    return {
      isRouterAlive: isRouterAlive,
      refresh: refresh
    };
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/layouts/LayoutClient.vue?vue&type=template&id=fdaca674":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/layouts/LayoutClient.vue?vue&type=template&id=fdaca674 ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "wrapper"
};
var _hoisted_2 = {
  "class": ""
};
var _hoisted_3 = {
  "class": "px-0 container-fluid d-flex"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_view = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-view");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_view)])])]);
}

/***/ }),

/***/ "./resources/js/mixins/layout.js":
/*!***************************************!*\
  !*** ./resources/js/mixins/layout.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "styleMain": () => (/* binding */ styleMain),
/* harmony export */   "styleSidebar": () => (/* binding */ styleSidebar)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var styleSidebar = function styleSidebar() {
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(function () {
    var navbar = document.querySelector('#navbar');
    var sidebar = document.querySelector('#sidebar');
    var mainContent = document.querySelector('.main-content');
    // const navbarHeight = navbar.offsetHeight;
    // sidebar.style.top = `${navbarHeight}px`;
    // mainContent.style.paddingTop = `${navbarHeight}px`;
  });
};

var styleMain = function styleMain() {
  (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(function () {
    var navbar = document.querySelector('#navbar');
    var mainContent = document.querySelector('.main-content');
    // const navbarHeight = navbar.offsetHeight;
    // mainContent.style.paddingTop = `${navbarHeight}px`;
  });
};



/***/ }),

/***/ "./resources/js/components/layouts/LayoutClient.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/layouts/LayoutClient.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _LayoutClient_vue_vue_type_template_id_fdaca674__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LayoutClient.vue?vue&type=template&id=fdaca674 */ "./resources/js/components/layouts/LayoutClient.vue?vue&type=template&id=fdaca674");
/* harmony import */ var _LayoutClient_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LayoutClient.vue?vue&type=script&lang=js */ "./resources/js/components/layouts/LayoutClient.vue?vue&type=script&lang=js");
/* harmony import */ var _home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_LayoutClient_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_LayoutClient_vue_vue_type_template_id_fdaca674__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/layouts/LayoutClient.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/layouts/LayoutClient.vue?vue&type=script&lang=js":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/layouts/LayoutClient.vue?vue&type=script&lang=js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LayoutClient_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LayoutClient_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LayoutClient.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/layouts/LayoutClient.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/layouts/LayoutClient.vue?vue&type=template&id=fdaca674":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/layouts/LayoutClient.vue?vue&type=template&id=fdaca674 ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LayoutClient_vue_vue_type_template_id_fdaca674__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LayoutClient_vue_vue_type_template_id_fdaca674__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LayoutClient.vue?vue&type=template&id=fdaca674 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/layouts/LayoutClient.vue?vue&type=template&id=fdaca674");


/***/ })

}]);