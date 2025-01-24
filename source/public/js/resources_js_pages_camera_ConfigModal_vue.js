(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_camera_ConfigModal_vue"],{

/***/ "./node_modules/@vuelidate/core/dist/index.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/@vuelidate/core/dist/index.esm.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectFlag": () => (/* binding */ CollectFlag),
/* harmony export */   "default": () => (/* binding */ useVuelidate),
/* harmony export */   "useVuelidate": () => (/* binding */ useVuelidate)
/* harmony export */ });
/* harmony import */ var vue_demi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-demi */ "./node_modules/vue-demi/lib/index.mjs");


function unwrapObj(obj) {
  let ignoreKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return Object.keys(obj).reduce((o, k) => {
    if (ignoreKeys.includes(k)) return o;
    o[k] = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(obj[k]);
    return o;
  }, {});
}
function isFunction(val) {
  return typeof val === 'function';
}
function isProxy(value) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isReactive)(value) || (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isReadonly)(value);
}
function get(obj, stringPath, def) {
  // Cache the current object
  let current = obj;
  const path = stringPath.split('.'); // For each item in the path, dig into the object

  for (let i = 0; i < path.length; i++) {
    // If the item isn't found, return the default (or null)
    if (!current[path[i]]) return def; // Otherwise, update the current  value

    current = current[path[i]];
  }

  return current;
}
function gatherBooleanGroupProperties(group, nestedResults, property) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return group.some(path => {
      return get(nestedResults, path, {
        [property]: false
      })[property];
    });
  });
}
function gatherArrayGroupProperties(group, nestedResults, property) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return group.reduce((all, path) => {
      const fetchedProperty = get(nestedResults, path, {
        [property]: false
      })[property] || [];
      return all.concat(fetchedProperty);
    }, []);
  });
}

/**
 * Response form a raw Validator function.
 * Should return a Boolean or an object with $invalid property.
 * @typedef {Boolean | { $valid: Boolean }} ValidatorResponse
 */

/**
 * Calls a validation rule by unwrapping its value first from a ref.
 * @param {Validator} rule
 * @param {Ref} value
 * @param {VueInstance} instance
 * @param {Object} siblingState
 * @return {Promise<ValidatorResponse> | ValidatorResponse}
 */

function callRule(rule, value, siblingState, instance) {
  return rule.call(instance, (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(value), (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(siblingState), instance);
}
/**
 * Normalizes the validator result
 * Allows passing a boolean of an object like `{ $valid: Boolean }`
 * @param {ValidatorResponse} result - Validator result
 * @return {boolean}
 */


function normalizeValidatorResponse(result) {
  return result.$valid !== undefined ? !result.$valid : !result;
}
/**
 * Returns the result of an async validator.
 * @param {Validator} rule
 * @param {Ref<*>} model
 * @param {Ref<Boolean>} $pending
 * @param {Ref<Boolean>} $dirty
 * @param {GlobalConfig} config
 * @param {boolean} config.$lazy
 * @param {Ref<*>} $response
 * @param {VueInstance} instance
 * @param {Ref<*>[]} watchTargets
 * @param {Object} siblingState
 * @param {Ref<Boolean>} $lastInvalidState
 * @param {Ref<Number>} $lastCommittedOn
 * @return {{ $invalid: Ref<Boolean>, $unwatch: WatchStopHandle }}
 */


function createAsyncResult(rule, model, $pending, $dirty, _ref, $response, instance) {
  let {
    $lazy,
    $rewardEarly
  } = _ref;
  let watchTargets = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [];
  let siblingState = arguments.length > 8 ? arguments[8] : undefined;
  let $lastInvalidState = arguments.length > 9 ? arguments[9] : undefined;
  let $lastCommittedOn = arguments.length > 10 ? arguments[10] : undefined;
  const $invalid = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(!!$dirty.value);
  const $pendingCounter = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
  $pending.value = false;
  const $unwatch = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)([model, $dirty].concat(watchTargets, $lastCommittedOn), () => {
    if ( // if $lazy and not dirty, return
    $lazy && !$dirty.value || // if in $rewardEarly mode and no previous errors, nothing pending, return
    $rewardEarly && !$lastInvalidState.value && !$pending.value) {
      return;
    }

    let ruleResult; // make sure we dont break if a validator throws

    try {
      ruleResult = callRule(rule, model, siblingState, instance);
    } catch (err) {
      // convert to a promise, so we can handle it async
      ruleResult = Promise.reject(err);
    }

    $pendingCounter.value++;
    $pending.value = !!$pendingCounter.value; // ensure $invalid is false, while validator is resolving

    $invalid.value = false;
    Promise.resolve(ruleResult).then(data => {
      $pendingCounter.value--;
      $pending.value = !!$pendingCounter.value;
      $response.value = data;
      $invalid.value = normalizeValidatorResponse(data);
    }).catch(error => {
      $pendingCounter.value--;
      $pending.value = !!$pendingCounter.value;
      $response.value = error;
      $invalid.value = true;
    });
  }, {
    immediate: true,
    deep: typeof model === 'object'
  });
  return {
    $invalid,
    $unwatch
  };
}
/**
 * Returns the result of a sync validator
 * @param {Validator} rule
 * @param {Ref<*>} model
 * @param {Ref<Boolean>} $dirty
 * @param {GlobalConfig} config
 * @param {Boolean} config.$lazy
 * @param {Ref<*>} $response
 * @param {VueInstance} instance
 * @param {Object} siblingState
 * @param {Ref<Boolean>} $lastInvalidState
 * @return {{$unwatch: (function(): {}), $invalid: ComputedRef<boolean>}}
 */


function createSyncResult(rule, model, $dirty, _ref2, $response, instance, siblingState, $lastInvalidState) {
  let {
    $lazy,
    $rewardEarly
  } = _ref2;

  const $unwatch = () => ({});

  const $invalid = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    if ( // return early if $lazy mode and not touched
    $lazy && !$dirty.value || // If $rewardEarly mode is ON and last invalid was false (no error), return it.
    // If we want to invalidate, we just flip the last state to true, causing the computed to run again
    $rewardEarly && !$lastInvalidState.value) {
      return false;
    }

    let returnValue = true;

    try {
      const result = callRule(rule, model, siblingState, instance);
      $response.value = result;
      returnValue = normalizeValidatorResponse(result);
    } catch (err) {
      $response.value = err;
    }

    return returnValue;
  });
  return {
    $unwatch,
    $invalid
  };
}
/**
 * Returns the validation result.
 * Detects async and sync validators.
 * @param {NormalizedValidator} rule
 * @param {Ref<*>} model
 * @param {Ref<boolean>} $dirty
 * @param {GlobalConfig} config - Vuelidate config
 * @param {VueInstance} instance - component instance
 * @param {string} validatorName - name of the current validator
 * @param {string} propertyKey - the current property we are validating
 * @param {string} propertyPath - the deep path to the validated property
 * @param {Object} siblingState
 * @param {Ref<Boolean>} $lastInvalidState - the last invalid state
 * @param {Ref<Number>} $lastCommittedOn - the last time $commit was called
 * @return {{ $params: *, $message: Ref<String>, $pending: Ref<Boolean>, $invalid: Ref<Boolean>, $response: Ref<*>, $unwatch: WatchStopHandle }}
 */


function createValidatorResult(rule, model, $dirty, config, instance, validatorName, propertyKey, propertyPath, siblingState, $lastInvalidState, $lastCommittedOn) {
  const $pending = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
  const $params = rule.$params || {};
  const $response = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
  let $invalid;
  let $unwatch;

  if (rule.$async) {
    ({
      $invalid,
      $unwatch
    } = createAsyncResult(rule.$validator, model, $pending, $dirty, config, $response, instance, rule.$watchTargets, siblingState, $lastInvalidState, $lastCommittedOn));
  } else {
    ({
      $invalid,
      $unwatch
    } = createSyncResult(rule.$validator, model, $dirty, config, $response, instance, siblingState, $lastInvalidState));
  }

  const message = rule.$message;
  const $message = isFunction(message) ? (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => message(unwrapObj({
    $pending,
    $invalid,
    $params: unwrapObj($params),
    // $params can hold refs, so we unwrap them for easy access
    $model: model,
    $response,
    $validator: validatorName,
    $propertyPath: propertyPath,
    $property: propertyKey
  }))) : message || '';
  return {
    $message,
    $params,
    $pending,
    $invalid,
    $response,
    $unwatch
  };
}

/**
 * Sorts a validation definition into rules, configs and nested validators.
 * @param {Object<NormalizedValidator|Function>} validationsRaw
 * @return {{ rules: Object<NormalizedValidator>, nestedValidators: Object, config: GlobalConfig }}
 */

function sortValidations() {
  let validationsRaw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const validations = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(validationsRaw);
  const validationKeys = Object.keys(validations);
  const rules = {};
  const nestedValidators = {};
  const config = {};
  let validationGroups = null;
  validationKeys.forEach(key => {
    const v = validations[key];

    switch (true) {
      // If it is already normalized, use it
      case isFunction(v.$validator):
        rules[key] = v;
        break;
      // If it is just a function, normalize it first
      // into { $validator: <Fun> }

      case isFunction(v):
        rules[key] = {
          $validator: v
        };
        break;

      case key === '$validationGroups':
        validationGroups = v;
        break;
      // Catch $-prefixed properties as config

      case key.startsWith('$'):
        config[key] = v;
        break;
      // If it doesn’t match any of the above,
      // treat as nestedValidators state property

      default:
        nestedValidators[key] = v;
    }
  });
  return {
    rules,
    nestedValidators,
    config,
    validationGroups
  };
}

function _empty() {}

const ROOT_PATH = '__root';
/** @typedef {import('vue-demi').ComponentPublicInstance} VueInstance */

/** @typedef {import('vue-demi').ComputedRef} ComputedRef */

/** @typedef {import('vue-demi').UnwrapRef} UnwrapRef */

/** @typedef {import('vue-demi').WatchStopHandle} WatchStopHandle */

/** @typedef {import('vue-demi').WritableComputedRef} WritableComputedRef */

/** @typedef {import('vue-demi').UnwrapNestedRefs} UnwrapNestedRefs */

/**
 * @typedef NormalizedValidator
 * @property {Validator} $validator
 * @property {String | Ref<String> | function(*): string} [$message]
 * @property {Object | Ref<Object>} [$params]
 * @property {Object | Ref<Object>} [$async]
 * @property {Ref<*>[]} [$watchTargets]
 */

/**
 * Raw validator function, before being normalized
 * Can return a Promise or a {@see ValidatorResponse}
 * @typedef {function(*): ((Promise<ValidatorResponse> | ValidatorResponse))} Validator
 */

/**
 * @typedef ErrorObject
 * @property {Ref<String>} $message - Reactive error message
 * @property {Ref<Object>} $params - Params passed from withParams
 * @property {Ref<Boolean>} $pending - If validation is pending
 * @property {String} $property - State key
 * @property {String} $propertyPath - Dot notation path to state
 * @property {String} $validator - Validator name
 * @property {String} $uid - Unique identifier
 */

/**
 * @typedef ValidationResult
 * @property {Ref<Boolean>} $pending
 * @property {Ref<Boolean>} $dirty
 * @property {Ref<Boolean>} $invalid
 * @property {Ref<Boolean>} $error
 * @property {Ref<String>} $path
 * @property {Function} $touch
 * @property {Function} $reset
 * @property {ComputedRef<ErrorObject[]>} $errors
 * @property {ComputedRef<ErrorObject[]>} $silentErrors
 * @property {Function} $commit
 */

/**
 * Creates the main Validation Results object for a state tree
 * Walks the tree's top level branches
 * @param {Object<NormalizedValidator>} rules - Rules for the current state tree
 * @param {Object} model - Current state value
 * @param {String} key - Key for the current state tree
 * @param {ResultsStorage} [resultsCache] - A cache map of all the validators
 * @param {String} [path] - the current property path
 * @param {GlobalConfig} [config] - the config object
 * @param {VueInstance} instance
 * @param {ComputedRef<Object>} externalResults
 * @param {Object} siblingState
 * @return {ValidationResult | {}}
 */

function _call(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }

  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
/**
 * Collects the validation results of all nested state properties
 * @param {Object<NormalizedValidator|Function>} validations - The validation
 * @param {Object} nestedState - Current state
 * @param {String} path - Path to current property
 * @param {ResultsStorage} resultsCache - Validations cache map
 * @param {GlobalConfig} config - The config object
 * @param {VueInstance} instance - The current Vue instance
 * @param {ComputedRef<object>} nestedExternalResults - The external results for this nested collection
 * @return {Object<string, VuelidateState>}
 */


function _callIgnored(body, direct) {
  return _call(body, _empty, direct);
}

function _invoke(body, then) {
  var result = body();

  if (result && result.then) {
    return result.then(then);
  }

  return then(result);
}

function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function createValidationResults(rules, model, key, resultsCache, path, config, instance, externalResults, siblingState) {
  // collect the property keys
  const ruleKeys = Object.keys(rules);
  const cachedResult = resultsCache.get(path, rules);
  const $dirty = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(false); // state for the $rewardEarly option

  /** The last invalid state of this property */

  const $lastInvalidState = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
  /** The last time $commit was called. Used to re-trigger async calls */

  const $lastCommittedOn = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(0);

  if (cachedResult) {
    // if the rules are the same as before, use the cached results
    if (!cachedResult.$partial) return cachedResult; // remove old watchers

    cachedResult.$unwatch(); // use the `$dirty.value`, so we dont save references by accident

    $dirty.value = cachedResult.$dirty.value;
  }

  const result = {
    // restore $dirty from cache
    $dirty,
    $path: path,
    $touch: () => {
      if (!$dirty.value) $dirty.value = true;
    },
    $reset: () => {
      if ($dirty.value) $dirty.value = false;
    },
    $commit: () => {}
  };
  /**
   * If there are no validation rules, it is most likely
   * a top level state, aka root
   */

  if (!ruleKeys.length) {
    // if there are cached results, we should overwrite them with the new ones
    cachedResult && resultsCache.set(path, rules, result);
    return result;
  }

  ruleKeys.forEach(ruleKey => {
    result[ruleKey] = createValidatorResult(rules[ruleKey], model, result.$dirty, config, instance, ruleKey, key, path, siblingState, $lastInvalidState, $lastCommittedOn);
  });
  result.$externalResults = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    if (!externalResults.value) return [];
    return [].concat(externalResults.value).map((stringError, index) => ({
      $propertyPath: path,
      $property: key,
      $validator: '$externalResults',
      $uid: `${path}-externalResult-${index}`,
      $message: stringError,
      $params: {},
      $response: null,
      $pending: false
    }));
  });
  result.$invalid = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const r = ruleKeys.some(ruleKey => (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(result[ruleKey].$invalid)); // cache the last invalid state

    $lastInvalidState.value = r;
    return !!result.$externalResults.value.length || r;
  });
  result.$pending = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => ruleKeys.some(ruleKey => (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(result[ruleKey].$pending)));
  result.$error = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => result.$dirty.value ? result.$pending.value || result.$invalid.value : false);
  result.$silentErrors = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => ruleKeys.filter(ruleKey => (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(result[ruleKey].$invalid)).map(ruleKey => {
    const res = result[ruleKey];
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.reactive)({
      $propertyPath: path,
      $property: key,
      $validator: ruleKey,
      $uid: `${path}-${ruleKey}`,
      $message: res.$message,
      $params: res.$params,
      $response: res.$response,
      $pending: res.$pending
    });
  }).concat(result.$externalResults.value));
  result.$errors = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => result.$dirty.value ? result.$silentErrors.value : []);

  result.$unwatch = () => ruleKeys.forEach(ruleKey => {
    result[ruleKey].$unwatch();
  });

  result.$commit = () => {
    $lastInvalidState.value = true;
    $lastCommittedOn.value = Date.now();
  };

  resultsCache.set(path, rules, result);
  return result;
}

function collectNestedValidationResults(validations, nestedState, path, resultsCache, config, instance, nestedExternalResults) {
  const nestedValidationKeys = Object.keys(validations); // if we have no state, return empty object

  if (!nestedValidationKeys.length) return {};
  return nestedValidationKeys.reduce((results, nestedKey) => {
    // build validation results for nested state
    results[nestedKey] = setValidations({
      validations: validations[nestedKey],
      state: nestedState,
      key: nestedKey,
      parentKey: path,
      resultsCache,
      globalConfig: config,
      instance,
      externalResults: nestedExternalResults
    });
    return results;
  }, {});
}
/**
 * Generates the Meta fields from the results
 * @param {ValidationResult|{}} results
 * @param {Object.<string, VuelidateState>} nestedResults
 * @param {Object.<string, ValidationResult>} childResults
 * @return {{$anyDirty: Ref<Boolean>, $error: Ref<Boolean>, $invalid: Ref<Boolean>, $errors: Ref<ErrorObject[]>, $dirty: Ref<Boolean>, $touch: Function, $reset: Function }}
 */


function createMetaFields(results, nestedResults, childResults) {
  const allResults = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => [nestedResults, childResults].filter(res => res).reduce((allRes, res) => {
    return allRes.concat(Object.values((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(res)));
  }, [])); // returns `$dirty` as true, if all children are dirty

  const $dirty = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)({
    get() {
      return results.$dirty.value || (allResults.value.length ? allResults.value.every(r => r.$dirty) : false);
    },

    set(v) {
      results.$dirty.value = v;
    }

  });
  const $silentErrors = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    // current state level errors, fallback to empty array if root
    const modelErrors = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(results.$silentErrors) || []; // collect all nested and child $silentErrors

    const nestedErrors = allResults.value.filter(result => ((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(result).$silentErrors || []).length).reduce((errors, result) => {
      return errors.concat(...result.$silentErrors);
    }, []); // merge the $silentErrors

    return modelErrors.concat(nestedErrors);
  });
  const $errors = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    // current state level errors, fallback to empty array if root
    const modelErrors = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(results.$errors) || []; // collect all nested and child $errors

    const nestedErrors = allResults.value.filter(result => ((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(result).$errors || []).length).reduce((errors, result) => {
      return errors.concat(...result.$errors);
    }, []); // merge the $errors

    return modelErrors.concat(nestedErrors);
  });
  const $invalid = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => // if any of the nested values is invalid
  allResults.value.some(r => r.$invalid) || // or if the current state is invalid
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(results.$invalid) || // fallback to false if is root
  false);
  const $pending = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => // if any of the nested values is pending
  allResults.value.some(r => (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(r.$pending)) || // if any of the current state validators is pending
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(results.$pending) || // fallback to false if is root
  false);
  const $anyDirty = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => allResults.value.some(r => r.$dirty) || allResults.value.some(r => r.$anyDirty) || $dirty.value);
  const $error = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => $dirty.value ? $pending.value || $invalid.value : false);

  const $touch = () => {
    // call the root $touch
    results.$touch(); // call all nested level $touch

    allResults.value.forEach(result => {
      result.$touch();
    });
  };

  const $commit = () => {
    // call the root $touch
    results.$commit(); // call all nested level $touch

    allResults.value.forEach(result => {
      result.$commit();
    });
  };

  const $reset = () => {
    // reset the root $dirty state
    results.$reset(); // reset all the children $dirty states

    allResults.value.forEach(result => {
      result.$reset();
    });
  }; // Ensure that if all child and nested results are $dirty, this also becomes $dirty


  if (allResults.value.length && allResults.value.every(nr => nr.$dirty)) $touch();
  return {
    $dirty,
    $errors,
    $invalid,
    $anyDirty,
    $error,
    $pending,
    $touch,
    $reset,
    $silentErrors,
    $commit
  };
}
/**
 * @typedef VuelidateState
 * @property {WritableComputedRef<any>} $model
 * @property {ComputedRef<Boolean>} $dirty
 * @property {ComputedRef<Boolean>} $error
 * @property {ComputedRef<ErrorObject[]>} $errors
 * @property {ComputedRef<Boolean>} $invalid
 * @property {ComputedRef<Boolean>} $anyDirty
 * @property {ComputedRef<Boolean>} $pending
 * @property {Function} $touch
 * @property {Function} $reset
 * @property {String} $path
 * @property {ComputedRef<ErrorObject[]>} $silentErrors
 * @property {Function} [$validate]
 * @property {Function} [$getResultsForChild]
 * @property {Object.<string, VuelidateState>}
 */

/**
 * Main Vuelidate bootstrap function.
 * Used both for Composition API in `setup` and for Global App usage.
 * Used to collect validation state, when walking recursively down the state tree
 * @param {Object} params
 * @param {Object<NormalizedValidator|Function>} params.validations
 * @param {Object} params.state
 * @param {String} [params.key] - Current state property key. Used when being called on nested items
 * @param {String} [params.parentKey] - Parent state property key. Used when being called recursively
 * @param {Object<string, ValidationResult>} [params.childResults] - Used to collect child results.
 * @param {ResultsStorage} params.resultsCache - The cached validation results
 * @param {VueInstance} params.instance - The current Vue instance
 * @param {GlobalConfig} params.globalConfig - The validation config, passed to this setValidations instance.
 * @param {UnwrapNestedRefs<object> | Ref<Object>} params.externalResults - External validation results
 * @return {UnwrapNestedRefs<VuelidateState>}
 */


function setValidations(_ref) {
  /**
   * Executes the validators and returns the result.
   * @return {Promise<boolean>}
   */
  const $validate = _async(function () {
    $touch();
    return _invoke(function () {
      if (mergedConfig.$rewardEarly) {
        $commit(); // await the watchers

        return _callIgnored(vue_demi__WEBPACK_IMPORTED_MODULE_0__.nextTick);
      }
    }, function () {
      // await the watchers
      return _call(vue_demi__WEBPACK_IMPORTED_MODULE_0__.nextTick, function () {
        return new Promise(resolve => {
          // return whether it is valid or not
          if (!$pending.value) return resolve(!$invalid.value);
          const unwatch = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)($pending, () => {
            resolve(!$invalid.value);
            unwatch();
          });
        });
      });
    });
  });
  /**
   * Returns a child component's results, based on registration name
   * @param {string} key
   * @return {VuelidateState}
   */


  let {
    validations,
    state,
    key,
    parentKey,
    childResults,
    resultsCache,
    globalConfig = {},
    instance,
    externalResults
  } = _ref;
  const path = parentKey ? `${parentKey}.${key}` : key; // Sort out the validation object into:
  // – rules = validators for current state tree fragment
  // — nestedValidators = nested state fragments keys that might contain more validators
  // – config = configuration properties that affect this state fragment

  const {
    rules,
    nestedValidators,
    config,
    validationGroups
  } = sortValidations(validations);
  const mergedConfig = Object.assign({}, globalConfig, config); // create protected state for cases when the state branch does not exist yet.
  // This protects when using the OptionsAPI as the data is bound after the setup method

  const nestedState = key ? (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const s = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(state);
    return s ? (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(s[key]) : undefined;
  }) : state; // cache the external results, so we can revert back to them

  const cachedExternalResults = Object.assign({}, (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(externalResults) || {});
  const nestedExternalResults = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const results = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(externalResults);
    if (!key) return results;
    return results ? (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(results[key]) : undefined;
  }); // Use rules for the current state fragment and validate it

  const results = createValidationResults(rules, nestedState, key, resultsCache, path, mergedConfig, instance, nestedExternalResults, state); // Use nested keys to repeat the process
  // *WARN*: This is recursive

  const nestedResults = collectNestedValidationResults(nestedValidators, nestedState, path, resultsCache, mergedConfig, instance, nestedExternalResults);
  const $validationGroups = {};

  if (validationGroups) {
    Object.entries(validationGroups).forEach(_ref2 => {
      let [key, group] = _ref2;
      $validationGroups[key] = {
        $invalid: gatherBooleanGroupProperties(group, nestedResults, '$invalid'),
        $error: gatherBooleanGroupProperties(group, nestedResults, '$error'),
        $pending: gatherBooleanGroupProperties(group, nestedResults, '$pending'),
        $errors: gatherArrayGroupProperties(group, nestedResults, '$errors'),
        $silentErrors: gatherArrayGroupProperties(group, nestedResults, '$silentErrors')
      };
    });
  } // Collect and merge this level validation results
  // with all nested validation results


  const {
    $dirty,
    $errors,
    $invalid,
    $anyDirty,
    $error,
    $pending,
    $touch,
    $reset,
    $silentErrors,
    $commit
  } = createMetaFields(results, nestedResults, childResults);
  /**
   * If we have no `key`, this is the top level state
   * We dont need `$model` there.
   */

  const $model = key ? (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)({
    get: () => (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(nestedState),
    set: val => {
      $dirty.value = true;
      const s = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(state);
      const external = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(externalResults);

      if (external) {
        external[key] = cachedExternalResults[key];
      }

      if ((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(s[key])) {
        s[key].value = val;
      } else {
        s[key] = val;
      }
    }
  }) : null;

  if (key && mergedConfig.$autoDirty) {
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(nestedState, () => {
      if (!$dirty.value) $touch();
      const external = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(externalResults);

      if (external) {
        external[key] = cachedExternalResults[key];
      }
    }, {
      flush: 'sync'
    });
  }

  function $getResultsForChild(key) {
    return (childResults.value || {})[key];
  }

  function $clearExternalResults() {
    if ((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(externalResults)) {
      externalResults.value = cachedExternalResults;
    } else {
      // if the external results state was empty, we need to delete every property, one by one
      if (Object.keys(cachedExternalResults).length === 0) {
        Object.keys(externalResults).forEach(k => {
          delete externalResults[k];
        });
      } else {
        // state was not empty, so we just assign it back into the current state
        Object.assign(externalResults, cachedExternalResults);
      }
    }
  }

  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.reactive)(Object.assign({}, results, {
    // NOTE: The order here is very important, since we want to override
    // some of the *results* meta fields with the collective version of it
    // that includes the results of nested state validation results
    $model,
    $dirty,
    $error,
    $errors,
    $invalid,
    $anyDirty,
    $pending,
    $touch,
    $reset,
    $path: path || ROOT_PATH,
    $silentErrors,
    $validate,
    $commit
  }, childResults && {
    $getResultsForChild,
    $clearExternalResults,
    $validationGroups
  }, nestedResults));
}

class ResultsStorage {
  constructor() {
    this.storage = new Map();
  }
  /**
   * Stores a validation result, and its rules by its path
   * @param {String} path
   * @param {Object<NormalizedValidator>} rules
   * @param {ValidationResult} result
   */


  set(path, rules, result) {
    this.storage.set(path, {
      rules,
      result
    });
  }
  /**
   * Check if the stored `results` for the provided `path` have the same `rules` compared to 'storedRules'
   * @param {String} path
   * @param {Object<NormalizedValidator>} rules
   * @param {Object<NormalizedValidator>} storedRules
   * @return {Boolean}
   */


  checkRulesValidity(path, rules, storedRules) {
    const storedRulesKeys = Object.keys(storedRules);
    const newRulesKeys = Object.keys(rules);
    if (newRulesKeys.length !== storedRulesKeys.length) return false;
    const hasAllValidators = newRulesKeys.every(ruleKey => storedRulesKeys.includes(ruleKey));
    if (!hasAllValidators) return false;
    return newRulesKeys.every(ruleKey => {
      if (!rules[ruleKey].$params) return true;
      return Object.keys(rules[ruleKey].$params).every(paramKey => {
        // make sure to unwrap before comparing
        return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(storedRules[ruleKey].$params[paramKey]) === (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(rules[ruleKey].$params[paramKey]);
      });
    });
  }
  /**
   * Returns the matched result if catche is valid
   * @param {String} path
   * @param {Object<NormalizedValidator>} rules
   * @return {{$partial: boolean, $dirty: Ref<Boolean>, $unwatch: function}|undefined|ValidationResult}
   */


  get(path, rules) {
    const storedRuleResultPair = this.storage.get(path);
    if (!storedRuleResultPair) return undefined;
    const {
      rules: storedRules,
      result
    } = storedRuleResultPair;
    const isValidCache = this.checkRulesValidity(path, rules, storedRules);
    const $unwatch = result.$unwatch ? result.$unwatch : () => ({});
    if (!isValidCache) return {
      $dirty: result.$dirty,
      $partial: true,
      $unwatch
    };
    return result;
  }

}

const CollectFlag = {
  COLLECT_ALL: true,
  COLLECT_NONE: false
};
const VuelidateInjectChildResults = Symbol('vuelidate#injectChildResults');
const VuelidateRemoveChildResults = Symbol('vuelidate#removeChildResults');
/**
 * Create helpers to collect validation state from child components
 * @param {Object} params
 * @param {String | Number | Boolean} params.$scope - Parent component scope
 * @return {{sendValidationResultsToParent: function[], childResults: ComputedRef<Object>, removeValidationResultsFromParent: function[]}}
 */

function nestedValidations(_ref) {
  let {
    $scope,
    instance
  } = _ref;
  const childResultsRaw = {};
  const childResultsKeys = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
  const childResults = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => childResultsKeys.value.reduce((results, key) => {
    results[key] = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(childResultsRaw[key]);
    return results;
  }, {}));
  /**
   * Allows children to send validation data up to their parent.
   * @param {Object} results - the results
   * @param {Object} args
   * @param {String} args.$registerAs - the $registeredAs key
   * @param {String | Number | Boolean} args.$scope - the $scope key
   */

  function injectChildResultsIntoParent(results, _ref2) {
    let {
      $registerAs: key,
      $scope: childScope,
      $stopPropagation
    } = _ref2;
    if ($stopPropagation || $scope === CollectFlag.COLLECT_NONE || childScope === CollectFlag.COLLECT_NONE || $scope !== CollectFlag.COLLECT_ALL && $scope !== childScope) return;
    childResultsRaw[key] = results;
    childResultsKeys.value.push(key);
  } // combine with other `injectChildResultsIntoParent` from vuelidate instances in this Vue component instance


  instance.__vuelidateInjectInstances = [].concat(instance.__vuelidateInjectInstances || [], injectChildResultsIntoParent);
  /**
   * Allows children to remove the validation data from their parent, before getting destroyed.
   * @param {String} key - the registeredAs key
   */

  function removeChildResultsFromParent(key) {
    // remove the key
    childResultsKeys.value = childResultsKeys.value.filter(childKey => childKey !== key); // remove the stored data for the key

    delete childResultsRaw[key];
  } // combine with other `removeChildResultsFromParent` from vuelidate instances in this Vue component instance


  instance.__vuelidateRemoveInstances = [].concat(instance.__vuelidateRemoveInstances || [], removeChildResultsFromParent); // inject the `injectChildResultsIntoParent` method, into the current scope

  const sendValidationResultsToParent = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.inject)(VuelidateInjectChildResults, []); // provide to all of its children the send results to parent function

  (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.provide)(VuelidateInjectChildResults, instance.__vuelidateInjectInstances);
  const removeValidationResultsFromParent = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.inject)(VuelidateRemoveChildResults, []); // provide to all of its children the remove results  function

  (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.provide)(VuelidateRemoveChildResults, instance.__vuelidateRemoveInstances);
  return {
    childResults,
    sendValidationResultsToParent,
    removeValidationResultsFromParent
  };
}

/**
 * Helper proxy for instance property access. It makes every reference
 * reactive for the validation function
 * @param target
 * @return {*|ComputedRef<*>}
 */

function ComputedProxyFactory(target) {
  return new Proxy(target, {
    get(target, prop) {
      return typeof target[prop] === 'object' ? ComputedProxyFactory(target[prop]) : (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => target[prop]);
    }

  });
}

/**
 * @typedef GlobalConfig
 * @property {String} [$registerAs] - Config Object
 * @property {String | Number | Symbol} [$scope] - A scope to limit child component registration
 * @property {Boolean} [$stopPropagation] - Tells a Vue component to stop sending its results up to the parent
 * @property {Ref<Object>} [$externalResults] - External error messages, like from server validation.
 * @property {Boolean} [$autoDirty] - Should the form watch for state changed, and automatically set `$dirty` to true.
 * @property {Boolean} [$lazy] - Should the validations be lazy, and run only after they are dirty
 * @property {Boolean} [$rewardEarly] - Once valid, re-runs property validators only on manual calls of $commit
 */

/**
 * Composition API compatible Vuelidate
 * Use inside the `setup` lifecycle hook
 * @param {Object | GlobalConfig} [validations] - Validations Object or the globalConfig.
 * @param {Object} [state] - State object - required if `validations` is a validation object.
 * @param {GlobalConfig} [globalConfig] - Config Object
 * @return {ComputedRef<*>}
 */

let uid = 0;
function useVuelidate(validations, state) {
  var _getCurrentInstance;

  let globalConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  // if we pass only one argument, its most probably the globalConfig.
  // This use case is so parents can just collect results of child forms.
  if (arguments.length === 1) {
    globalConfig = validations;
    validations = undefined;
    state = undefined;
  }

  let {
    $registerAs,
    $scope = CollectFlag.COLLECT_ALL,
    $stopPropagation,
    $externalResults,
    currentVueInstance
  } = globalConfig;
  const instance = currentVueInstance || ((_getCurrentInstance = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)()) === null || _getCurrentInstance === void 0 ? void 0 : _getCurrentInstance.proxy);
  const componentOptions = instance ? instance.$options : {}; // if there is no registration name, add one.

  if (!$registerAs) {
    uid += 1;
    $registerAs = `_vuelidate_${uid}`;
  }

  const validationResults = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)({});
  const resultsCache = new ResultsStorage();
  const {
    childResults,
    sendValidationResultsToParent,
    removeValidationResultsFromParent
  } = instance ? nestedValidations({
    $scope,
    instance
  }) : {
    childResults: (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)({})
  }; // Options API

  if (!validations && componentOptions.validations) {
    const rules = componentOptions.validations;
    state = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.onBeforeMount)(() => {
      // Delay binding state to validations defined with the Options API until mounting, when the data
      // has been attached to the component instance. From that point on it will be reactive.
      state.value = instance;
      (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(() => isFunction(rules) ? rules.call(state.value, new ComputedProxyFactory(state.value)) : rules, validations => {
        validationResults.value = setValidations({
          validations,
          state,
          childResults,
          resultsCache,
          globalConfig,
          instance,
          externalResults: $externalResults || instance.vuelidateExternalResults
        });
      }, {
        immediate: true
      });
    });
    globalConfig = componentOptions.validationsConfig || globalConfig;
  } else {
    const validationsWatchTarget = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(validations) || isProxy(validations) ? validations // wrap plain objects in a reactive, so we can track changes if they have computed in them.
    : (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.reactive)(validations || {});
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(validationsWatchTarget, newValidationRules => {
      validationResults.value = setValidations({
        validations: newValidationRules,
        state,
        childResults,
        resultsCache,
        globalConfig,
        instance: instance !== null && instance !== void 0 ? instance : {},
        externalResults: $externalResults
      });
    }, {
      immediate: true
    });
  }

  if (instance) {
    // send all the data to the parent when the function is invoked inside setup.
    sendValidationResultsToParent.forEach(f => f(validationResults, {
      $registerAs,
      $scope,
      $stopPropagation
    })); // before this component is destroyed, remove all the data from the parent.

    (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)(() => removeValidationResultsFromParent.forEach(f => f($registerAs)));
  }

  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return Object.assign({}, (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(validationResults.value), childResults.value);
  });
}




/***/ }),

/***/ "./node_modules/@vuelidate/validators/dist/index.esm.js":
/*!**************************************************************!*\
  !*** ./node_modules/@vuelidate/validators/dist/index.esm.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alpha": () => (/* binding */ alpha),
/* harmony export */   "alphaNum": () => (/* binding */ alphaNum),
/* harmony export */   "and": () => (/* binding */ and),
/* harmony export */   "between": () => (/* binding */ between),
/* harmony export */   "createI18nMessage": () => (/* binding */ createI18nMessage),
/* harmony export */   "decimal": () => (/* binding */ decimal),
/* harmony export */   "email": () => (/* binding */ email),
/* harmony export */   "helpers": () => (/* binding */ common),
/* harmony export */   "integer": () => (/* binding */ integer),
/* harmony export */   "ipAddress": () => (/* binding */ ipAddress),
/* harmony export */   "macAddress": () => (/* binding */ macAddress),
/* harmony export */   "maxLength": () => (/* binding */ maxLength),
/* harmony export */   "maxValue": () => (/* binding */ maxValue),
/* harmony export */   "minLength": () => (/* binding */ minLength),
/* harmony export */   "minValue": () => (/* binding */ minValue),
/* harmony export */   "not": () => (/* binding */ not),
/* harmony export */   "numeric": () => (/* binding */ numeric),
/* harmony export */   "or": () => (/* binding */ or),
/* harmony export */   "required": () => (/* binding */ required),
/* harmony export */   "requiredIf": () => (/* binding */ requiredIf),
/* harmony export */   "requiredUnless": () => (/* binding */ requiredUnless),
/* harmony export */   "sameAs": () => (/* binding */ sameAs),
/* harmony export */   "url": () => (/* binding */ url)
/* harmony export */ });
/* harmony import */ var vue_demi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-demi */ "./node_modules/vue-demi/lib/index.mjs");


function isFunction(val) {
  return typeof val === 'function';
}
function isObject(o) {
  return o !== null && typeof o === 'object' && !Array.isArray(o);
}
/**
 * Returns a standard ValidatorObject
 * Wraps a plain function into a ValidatorObject
 * @param {NormalizedValidator|Function} validator
 * @return {NormalizedValidator}
 */

function normalizeValidatorObject(validator) {
  return isFunction(validator.$validator) ? Object.assign({}, validator) : {
    $validator: validator
  };
}
function isPromise(object) {
  return isObject(object) && isFunction(object.then);
}
/**
 * Unwraps a ValidatorResponse object, into a boolean.
 * @param {ValidatorResponse} result
 * @return {boolean}
 */

function unwrapValidatorResponse(result) {
  if (typeof result === 'object') return result.$valid;
  return result;
}
/**
 * Unwraps a `NormalizedValidator` object, returning its validator function.
 * @param {NormalizedValidator | Function} validator
 * @return {function}
 */

function unwrapNormalizedValidator(validator) {
  return validator.$validator || validator;
}

/**
 * Allows attaching parameters to a validator
 * @param {Object} $params
 * @param {NormalizedValidator|Function} $validator
 * @return {NormalizedValidator}
 */

function withParams($params, $validator) {
  if (!isObject($params)) throw new Error(`[@vuelidate/validators]: First parameter to "withParams" should be an object, provided ${typeof $params}`);
  if (!isObject($validator) && !isFunction($validator)) throw new Error(`[@vuelidate/validators]: Validator must be a function or object with $validator parameter`);
  const validatorObj = normalizeValidatorObject($validator);
  validatorObj.$params = Object.assign({}, validatorObj.$params || {}, $params);
  return validatorObj;
}

/**
 * @callback MessageCallback
 * @param {Object} params
 * @return String
 */

/**
 * Attaches a message to a validator
 * @param {MessageCallback | String} $message
 * @param {NormalizedValidator|Function} $validator
 * @return {NormalizedValidator}
 */

function withMessage($message, $validator) {
  if (!isFunction($message) && typeof (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)($message) !== 'string') throw new Error(`[@vuelidate/validators]: First parameter to "withMessage" should be string or a function returning a string, provided ${typeof $message}`);
  if (!isObject($validator) && !isFunction($validator)) throw new Error(`[@vuelidate/validators]: Validator must be a function or object with $validator parameter`);
  const validatorObj = normalizeValidatorObject($validator);
  validatorObj.$message = $message;
  return validatorObj;
}

/**
 * @typedef {function(*): Promise<boolean|ValidatorResponse>} asyncValidator
 */

/**
 * @typedef {Ref<*>[]|function(*): *} watchTargets
 */

/**
 * Wraps validators that returns a Promise.
 * @param {asyncValidator} $validator
 * @param {watchTargets} $watchTargets
 * @return {{$async: boolean, $validator: asyncValidator, $watchTargets: watchTargets}}
 */

function withAsync($validator) {
  let $watchTargets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  const validatorObj = normalizeValidatorObject($validator);
  return Object.assign({}, validatorObj, {
    $async: true,
    $watchTargets
  });
}

function forEach(validators) {
  return {
    $validator(collection) {
      for (var _len = arguments.length, others = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        others[_key - 1] = arguments[_key];
      }

      // go over the collection. It can be a ref as well.
      return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(collection).reduce((previous, collectionItem, index) => {
        // go over each property
        const collectionEntryResult = Object.entries(collectionItem).reduce((all, _ref) => {
          let [property, $model] = _ref;
          // get the validators for this property
          const innerValidators = validators[property] || {}; // go over each validator and run it

          const propertyResult = Object.entries(innerValidators).reduce((all, _ref2) => {
            let [validatorName, currentValidator] = _ref2;
            // extract the validator. Supports simple and extended validators.
            const validatorFunction = unwrapNormalizedValidator(currentValidator); // Call the validator, passing the VM as this, the value, current iterated object and the rest.

            const $response = validatorFunction.call(this, $model, collectionItem, index, ...others); // extract the valid from the result

            const $valid = unwrapValidatorResponse($response); // store the entire response for later

            all.$data[validatorName] = $response;
            all.$data.$invalid = !$valid || !!all.$data.$invalid;
            all.$data.$error = all.$data.$invalid; // if not valid, get the $message

            if (!$valid) {
              let $message = currentValidator.$message || '';
              const $params = currentValidator.$params || {}; // If $message is a function, we call it with the appropriate parameters

              if (typeof $message === 'function') {
                $message = $message({
                  $pending: false,
                  $invalid: !$valid,
                  $params,
                  $model,
                  $response
                });
              } // save the error object


              all.$errors.push({
                $property: property,
                $message,
                $params,
                $response,
                $model,
                $pending: false,
                $validator: validatorName
              });
            }

            return {
              $valid: all.$valid && $valid,
              $data: all.$data,
              $errors: all.$errors
            };
          }, {
            $valid: true,
            $data: {},
            $errors: []
          });
          all.$data[property] = propertyResult.$data;
          all.$errors[property] = propertyResult.$errors;
          return {
            $valid: all.$valid && propertyResult.$valid,
            $data: all.$data,
            $errors: all.$errors
          };
        }, {
          $valid: true,
          $data: {},
          $errors: {}
        });
        return {
          $valid: previous.$valid && collectionEntryResult.$valid,
          $data: previous.$data.concat(collectionEntryResult.$data),
          $errors: previous.$errors.concat(collectionEntryResult.$errors)
        };
      }, {
        $valid: true,
        $data: [],
        $errors: []
      });
    },

    // collect all the validation errors into a 2 dimensional array, for each entry in the collection, you have an array of error messages.
    $message: _ref3 => {
      let {
        $response
      } = _ref3;
      return $response ? $response.$errors.map(context => {
        return Object.values(context).map(errors => errors.map(error => error.$message)).reduce((a, b) => a.concat(b), []);
      }) : [];
    }
  };
}

// "required" core, used in almost every validator to allow empty values
const req = value => {
  value = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(value);
  if (Array.isArray(value)) return !!value.length;

  if (value === undefined || value === null) {
    return false;
  }

  if (value === false) {
    return true;
  }

  if (value instanceof Date) {
    // invalid date won't pass
    return !isNaN(value.getTime());
  }

  if (typeof value === 'object') {
    for (let _ in value) return true;

    return false;
  }

  return !!String(value).length;
};
/**
 * Returns the length of an arbitrary value
 * @param {Array|Object|String} value
 * @return {number}
 */

const len = value => {
  value = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(value);
  if (Array.isArray(value)) return value.length;

  if (typeof value === 'object') {
    return Object.keys(value).length;
  }

  return String(value).length;
};
/**
 * Regex based validator template
 * @param {RegExp} expr
 * @return {function(*=): boolean}
 */

function regex() {
  for (var _len = arguments.length, expr = new Array(_len), _key = 0; _key < _len; _key++) {
    expr[_key] = arguments[_key];
  }

  return value => {
    value = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(value);
    return !req(value) || expr.every(reg => reg.test(value));
  };
}

var common = /*#__PURE__*/Object.freeze({
  __proto__: null,
  withParams: withParams,
  withMessage: withMessage,
  withAsync: withAsync,
  forEach: forEach,
  req: req,
  len: len,
  regex: regex,
  unwrap: vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref,
  unwrapNormalizedValidator: unwrapNormalizedValidator,
  unwrapValidatorResponse: unwrapValidatorResponse,
  normalizeValidatorObject: normalizeValidatorObject
});

var alpha$1 = regex(/^[a-zA-Z]*$/);

/**
 * Validate if value is alphabetical string.
 * @type {NormalizedValidator}
 */

var alpha = {
  $validator: alpha$1,
  $message: 'The value is not alphabetical',
  $params: {
    type: 'alpha'
  }
};

var alphaNum$1 = regex(/^[a-zA-Z0-9]*$/);

/**
 * Validate if value is alpha-numeric string.
 * @type {NormalizedValidator}
 */

var alphaNum = {
  $validator: alphaNum$1,
  $message: 'The value must be alpha-numeric',
  $params: {
    type: 'alphaNum'
  }
};

var numeric$1 = regex(/^\d*(\.\d+)?$/);

/**
 * Check whether a value is numeric.
 * @type NormalizedValidator
 */

var numeric = {
  $validator: numeric$1,
  $message: 'Value must be numeric',
  $params: {
    type: 'numeric'
  }
};

/**
 * Check if a numeric value is between two values.
 * @param {Ref<Number> | Number} min
 * @param {Ref<Number> | Number} max
 * @return {function(*=): boolean}
 */

function between$1 (min, max) {
  return value => !req(value) || (!/\s/.test(value) || value instanceof Date) && +(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(min) <= +value && +(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(max) >= +value;
}

/**
 * Checks if a value is between two values.
 * @param {Ref<Number> | Number} min
 * @param {Ref<Number> | Number} max
 * @return {NormalizedValidator}
 */

function between (min, max) {
  return {
    $validator: between$1(min, max),
    $message: _ref => {
      let {
        $params
      } = _ref;
      return `The value must be between ${$params.min} and ${$params.max}`;
    },
    $params: {
      min,
      max,
      type: 'between'
    }
  };
}

const emailRegex = /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
var email$1 = regex(emailRegex);

/**
 * Validate if value is an email.
 * @type {NormalizedValidator}
 */

var email = {
  $validator: email$1,
  $message: 'Value is not a valid email address',
  $params: {
    type: 'email'
  }
};

/**
 * Check if a string is an IP Address
 * @param {String} value
 * @returns {boolean}
 */

function ipAddress$1 (value) {
  if (!req(value)) {
    return true;
  }

  if (typeof value !== 'string') {
    return false;
  }

  const nibbles = value.split('.');
  return nibbles.length === 4 && nibbles.every(nibbleValid);
}

const nibbleValid = nibble => {
  if (nibble.length > 3 || nibble.length === 0) {
    return false;
  }

  if (nibble[0] === '0' && nibble !== '0') {
    return false;
  }

  if (!nibble.match(/^\d+$/)) {
    return false;
  }

  const numeric = +nibble | 0;
  return numeric >= 0 && numeric <= 255;
};

/**
 * Validate if value is an ipAddress string.
 * @type {NormalizedValidator}
 */

var ipAddress = {
  $validator: ipAddress$1,
  $message: 'The value is not a valid IP address',
  $params: {
    type: 'ipAddress'
  }
};

/**
 * Check if value is a properly formatted Mac Address.
 * @param {String | Ref<String>} [separator]
 * @returns {function(*): boolean}
 */

function macAddress$1 () {
  let separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ':';
  return value => {
    separator = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(separator);

    if (!req(value)) {
      return true;
    }

    if (typeof value !== 'string') {
      return false;
    }

    const parts = typeof separator === 'string' && separator !== '' ? value.split(separator) : value.length === 12 || value.length === 16 ? value.match(/.{2}/g) : null;
    return parts !== null && (parts.length === 6 || parts.length === 8) && parts.every(hexValid);
  };
}

const hexValid = hex => hex.toLowerCase().match(/^[0-9a-f]{2}$/);

/**
 * Validate if value is a valid Mac Address string.
 * @returns {NormalizedValidator}
 */

function macAddress (separator) {
  return {
    $validator: macAddress$1(separator),
    $message: 'The value is not a valid MAC Address',
    $params: {
      type: 'macAddress'
    }
  };
}

/**
 * Check if provided value has a maximum length
 * @param {Number | Ref<Number>} length
 * @returns {function(Array|Object|String): boolean}
 */

function maxLength$1 (length) {
  return value => !req(value) || len(value) <= (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(length);
}

/**
 * Validate the max length of a string.
 * @param {Number} max
 * @return {NormalizedValidator}
 */

function maxLength (max) {
  return {
    $validator: maxLength$1(max),
    $message: _ref => {
      let {
        $params
      } = _ref;
      return `The maximum length allowed is ${$params.max}`;
    },
    $params: {
      max,
      type: 'maxLength'
    }
  };
}

/**
 * Check if value is above a threshold.
 * @param {Number | Ref<Number>} length
 * @returns {function(Array|Object|String): boolean}
 */

function minLength$1 (length) {
  return value => !req(value) || len(value) >= (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(length);
}

/**
 * Check if value is above a threshold.
 * @param {Number | Ref<Number>} min
 * @returns {NormalizedValidator}
 */

function minLength (min) {
  return {
    $validator: minLength$1(min),
    $message: _ref => {
      let {
        $params
      } = _ref;
      return `This field should be at least ${$params.min} characters long`;
    },
    $params: {
      min,
      type: 'minLength'
    }
  };
}

/**
 * Validates if a value is empty.
 * @param {String | Array | Date | Object} value
 * @returns {boolean}
 */

function required$1 (value) {
  if (typeof value === 'string') {
    value = value.trim();
  }

  return req(value);
}

/**
 * Check if a value is empty or not.
 * @type {NormalizedValidator}
 */

var required = {
  $validator: required$1,
  $message: 'Value is required',
  $params: {
    type: 'required'
  }
};

const validate$1 = (prop, val) => prop ? req(typeof val === 'string' ? val.trim() : val) : true;
/**
 * Returns required if the passed property is truthy
 * @param {Boolean | String | function(any): Boolean | Ref<string | boolean>} propOrFunction
 * @return {function(value: *, parentVM: object): Boolean}
 */


function requiredIf$1(propOrFunction) {
  return function (value, parentVM) {
    if (typeof propOrFunction !== 'function') {
      return validate$1((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(propOrFunction), value);
    }

    const result = propOrFunction.call(this, value, parentVM);
    return validate$1(result, value);
  };
}

/**
 * Returns required if the passed property is truthy
 * @param {Boolean | String | function(): (Boolean | Promise<boolean>)} prop
 * @return {NormalizedValidator}
 */

function requiredIf (prop) {
  return {
    $validator: requiredIf$1(prop),
    $message: 'The value is required',
    $params: {
      type: 'requiredIf',
      prop
    }
  };
}

const validate = (prop, val) => !prop ? req(typeof val === 'string' ? val.trim() : val) : true;
/**
 * Returns required if the passed property is falsy.
 * @param {Boolean | String | function(any): Boolean | Ref<string | boolean>} propOrFunction
 * @return {function(value: *, parentVM: object): Boolean}
 */


function requiredUnless$1(propOrFunction) {
  return function (value, parentVM) {
    if (typeof propOrFunction !== 'function') {
      return validate((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(propOrFunction), value);
    }

    const result = propOrFunction.call(this, value, parentVM);
    return validate(result, value);
  };
}

/**
 * Returns required unless the passed property is truthy
 * @param {Boolean | String | function(): (Boolean | Promise<boolean>)} prop
 * @return {NormalizedValidator}
 */

function requiredUnless (prop) {
  return {
    $validator: requiredUnless$1(prop),
    $message: 'The value is required',
    $params: {
      type: 'requiredUnless',
      prop
    }
  };
}

/**
 * Check if two values are identical.
 * @param {*} equalTo
 * @return {function(*=): boolean}
 */

function sameAs$1 (equalTo) {
  return value => (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(value) === (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(equalTo);
}

/**
 * Check if two values are identical
 * @param {*} equalTo
 * @param {String} [otherName]
 * @return {NormalizedValidator}
 */

function sameAs (equalTo) {
  let otherName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'other';
  return {
    $validator: sameAs$1(equalTo),
    $message: _ref => {
      return `The value must be equal to the ${otherName} value`;
    },
    $params: {
      equalTo,
      otherName,
      type: 'sameAs'
    }
  };
}

/**
 * Regex taken from {@link https://gist.github.com/dperini/729294}
 */

const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
var url$1 = regex(urlRegex);

/**
 * Check if a value is a url
 * @type {NormalizedValidator}
 */

var url = {
  $validator: url$1,
  $message: 'The value is not a valid URL address',
  $params: {
    type: 'url'
  }
};

function _await$1(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function syncOr(validators) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return validators.reduce((valid, fn) => {
      if (unwrapValidatorResponse(valid)) return valid;
      return unwrapNormalizedValidator(fn).apply(this, args);
    }, false);
  };
}

function asyncOr(validators) {
  return function () {
    const _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.reduce(function (valid, fn) {
      return _await$1(valid, function (r) {
        return unwrapValidatorResponse(r) ? r : unwrapNormalizedValidator(fn).apply(_this, args);
      });
    }, Promise.resolve(false));
  };
}
/**
 * Returns true when one of the provided functions returns true.
 * @param {...(NormalizedValidator|Function)} validators
 * @return {{$validator: function(...[*]=): (boolean | Promise<boolean>), $async: boolean, $watchTargets: any[]}}
 */


function or$1() {
  for (var _len3 = arguments.length, validators = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    validators[_key3] = arguments[_key3];
  }

  const $async = validators.some(v => v.$async);
  const $watchTargets = validators.reduce((all, v) => {
    if (!v.$watchTargets) return all;
    return all.concat(v.$watchTargets);
  }, []);

  let $validator = () => false;

  if (validators.length) $validator = $async ? asyncOr(validators) : syncOr(validators);
  return {
    $async,
    $validator,
    $watchTargets
  };
}

/**
 * Returns true when one of the provided functions returns true.
 * @param {...(NormalizedValidator|Function)} validators
 * @return {NormalizedValidator}
 */

function or () {
  return withParams({
    type: 'or'
  }, withMessage('The value does not match any of the provided validators', or$1(...arguments)));
}

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}
/**
 *
 * @param validators
 * @return {function(...[*]=): Promise<boolean>}
 */


function syncAnd(validators) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return validators.reduce((valid, fn) => {
      if (!unwrapValidatorResponse(valid)) return valid;
      return unwrapNormalizedValidator(fn).apply(this, args);
    }, true);
  };
}

function asyncAnd(validators) {
  return function () {
    const _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.reduce(function (valid, fn) {
      return _await(valid, function (r) {
        return unwrapValidatorResponse(r) ? unwrapNormalizedValidator(fn).apply(_this, args) : r;
      });
    }, Promise.resolve(true));
  };
}
/**
 * Returns true when all validators are truthy
 * @param {...(NormalizedValidator | Function)} validators
 * @return {{$validator: function(...[*]=): (boolean | Promise<boolean>), $async: boolean, $watchTargets: any[]}}
 */


function and$1() {
  for (var _len3 = arguments.length, validators = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    validators[_key3] = arguments[_key3];
  }

  const $async = validators.some(v => v.$async);
  const $watchTargets = validators.reduce((all, v) => {
    if (!v.$watchTargets) return all;
    return all.concat(v.$watchTargets);
  }, []);

  let $validator = () => false;

  if (validators.length) $validator = $async ? asyncAnd(validators) : syncAnd(validators);
  return {
    $async,
    $validator,
    $watchTargets
  };
}

/**
 * Validate if all validators match.
 * @param {...*} validators
 * @returns {NormalizedValidator}
 */

function and () {
  return withParams({
    type: 'and'
  }, withMessage('The value does not match all of the provided validators', and$1(...arguments)));
}

/**
 * Swaps the result of a value
 * @param {NormalizedValidator|Function} validator
 * @returns {function(*=, *=): boolean}
 */

function not$1 (validator) {
  return function (value, vm) {
    if (!req(value)) return true;
    const response = unwrapNormalizedValidator(validator).call(this, value, vm);
    if (!isPromise(response)) return !unwrapValidatorResponse(response);
    return response.then(r => !unwrapValidatorResponse(r));
  };
}

/**
 * Swaps the result of a value
 * @param {NormalizedValidator|Function} validator
 * @returns {NormalizedValidator}
 */

function not (validator) {
  return {
    $validator: not$1(validator),
    $message: `The value does not match the provided validator`,
    $params: {
      type: 'not'
    }
  };
}

/**
 * Check if a value is above a threshold.
 * @param {String | Number | Ref<Number> | Ref<String>} min
 * @returns {function(*=): boolean}
 */

function minValue$1 (min) {
  return value => !req(value) || (!/\s/.test(value) || value instanceof Date) && +value >= +(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(min);
}

/**
 * Check if a value is above a threshold.
 * @param {String | Number | Ref<Number> | Ref<String>} min
 * @returns {NormalizedValidator}
 */

function minValue (min) {
  return {
    $validator: minValue$1(min),
    $message: _ref => {
      let {
        $params
      } = _ref;
      return `The minimum value allowed is ${$params.min}`;
    },
    $params: {
      min,
      type: 'minValue'
    }
  };
}

/**
 * Check if value is below a threshold.
 * @param {Number | Ref<Number> | Ref<String>} max
 * @returns {function(*=): boolean}
 */

function maxValue$1 (max) {
  return value => !req(value) || (!/\s/.test(value) || value instanceof Date) && +value <= +(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(max);
}

/**
 * Check if value is below a threshold.
 * @param {Number | Ref<Number> | Ref<String>} max
 * @return {NormalizedValidator}
 */

var maxValue = (max => ({
  $validator: maxValue$1(max),
  $message: _ref => {
    let {
      $params
    } = _ref;
    return `The maximum value allowed is ${$params.max}`;
  },
  $params: {
    max,
    type: 'maxValue'
  }
}));

// ^-[0-9]+$ - only for negative integer (minus sign without at least 1 digit is not a number)

var integer$1 = regex(/(^[0-9]*$)|(^-[0-9]+$)/);

/**
 * Validate if value is integer.
 * @type {NormalizedValidator}
 */

var integer = {
  $validator: integer$1,
  $message: 'Value is not an integer',
  $params: {
    type: 'integer'
  }
};

var decimal$1 = regex(/^[-]?\d*(\.\d+)?$/);

/**
 * Validate if value is decimal number.
 * @type {NormalizedValidator}
 */

var decimal = {
  $validator: decimal$1,
  $message: 'Value must be decimal',
  $params: {
    type: 'decimal'
  }
};

/**
 * Creates a translatable version of `withMessage` helper.
 * @param {function} t - the translation function of your choice
 * @param {function} [messagePath] - a function to generate the message path, passed to `t` for each message. By default it is `validations.${$validator}`
 * @param {function} [messageParams] - a function to augment the params, passed to `t` for each message.
 */

function createI18nMessage(_ref) {
  let {
    t,
    messagePath = _ref2 => {
      let {
        $validator
      } = _ref2;
      return `validations.${$validator}`;
    },
    messageParams = params => params
  } = _ref;
  return function withI18nMessage(validator) {
    let {
      withArguments = false,
      messagePath: localMessagePath = messagePath,
      messageParams: localMessageParams = messageParams
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    function message(props) {
      return t(localMessagePath(props), localMessageParams(Object.assign({
        model: props.$model,
        property: props.$property,
        pending: props.$pending,
        invalid: props.$invalid,
        response: props.$response,
        validator: props.$validator,
        propertyPath: props.$propertyPath
      }, props.$params)));
    }

    if (withArguments && typeof validator === 'function') {
      return function () {
        return withMessage(message, validator(...arguments));
      };
    }

    return withMessage(message, validator);
  };
}




/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=style&index=0&id=e36795ac&lang=scss":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=style&index=0&id=e36795ac&lang=scss ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_images_ex_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/images/ex.png */ "./resources/assets/images/ex.png");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(_assets_images_ex_png__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".div-stage {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  height: 100%;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center center;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./resources/assets/icon/plus.png":
/*!****************************************!*\
  !*** ./resources/assets/icon/plus.png ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/plus.png?ac13bf592352b7a99fe0ce6c34a0b22f");

/***/ }),

/***/ "./resources/assets/images/ex.png":
/*!****************************************!*\
  !*** ./resources/assets/images/ex.png ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/ex.png?35eabc65e74cec7b79951e1b8ce4921d");

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_drawing_canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-drawing-canvas */ "./node_modules/vue-drawing-canvas/dist/vue-drawing-canvas.esm.js");
/* harmony import */ var _constants_labels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/constants/labels */ "./resources/js/constants/labels.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }



var width = window.innerWidth;
var height = window.innerHeight;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ConfigModal",
  props: {
    dataForm: {
      type: Object,
      "default": {}
    }
  },
  components: {
    VueDrawingCanvas: vue_drawing_canvas__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data(vm) {
    return {
      configKonva: {
        width: width,
        height: height
      },
      configCircle: {
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 2,
        draggable: true
      },
      lines: [],
      polygons: [],
      rectangles: [
        // {
        //     x: 20,
        //     y: 20,
        //     x2: 300,
        //     y2: 300,
        //     x2_0: 300,
        //     y2_0: 300,
        //     width_0: 280,
        //     width: 280,
        //     height: 280,
        //     draggable: true,
        //     fill: 'blue',
        //     name: 'dsadasd'
        // },
        // {
        //     x: 350,
        //     y: 200,
        //     x2: 550,
        //     y2: 200,
        //     x2_0: 550,
        //     y2_0: 200,
        //     width_0: 200,
        //     width: 200,
        //     height: 280,
        //     draggable: true,
        //     fill: 'red',
        //     name: 'cc'
        // }
      ],
      strokeWidthLine: 3,
      circles: [1, 2, 3],
      isDrawing: false,
      opacityShape: 0.6,
      labels: _constants_labels__WEBPACK_IMPORTED_MODULE_1__["default"],
      labelChoosen: _constants_labels__WEBPACK_IMPORTED_MODULE_1__["default"][0].value,
      color: _constants_labels__WEBPACK_IMPORTED_MODULE_1__["default"][0].color,
      typeOfShapes: ['Polygon', 'Line', 'Rectangle'],
      typeOfShapeChoosen: 'Polygon',
      shapeNameChoosen: '',
      positionXRectStart: 0,
      positionYRectStart: 0,
      posX: 0,
      posY: 0,
      jsonResult: [],
      isAddItemJsonResult: false,
      isHoldingCtrl: false,
      isHoldingShift: false,
      isHoldingSpace: false,
      isPolygonCreated: false
    };
  },
  mounted: function mounted() {
    var _this2 = this;
    this.$nextTick(function () {
      _this2.configKonva = {
        width: _this2.$refs.konva.clientWidth,
        height: _this2.$refs.konva.clientHeight
      };
    });
  },
  created: function created() {
    this.handleShiftKeypress();
    // this.handleSpaceKeypress()
    // this.handleUndo()
  },

  methods: {
    onClose: function onClose() {
      this.$emit('onClose');
    },
    onChangeSelectLabel: function onChangeSelectLabel() {
      var _this = this;
      var index = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(this.labels, function (o) {
        return o.value == _this.labelChoosen;
      });
      if (index > -1) {
        this.color = this.labels[index].color;
      }
    },
    handleStageMouseDown: function handleStageMouseDown(e) {
      var target = e.target;
      var stage = target.getStage();
      if (target == stage || this.isHoldingShift) {
        this.isDrawing = true;
        this.shapeNameChoosen = '';
        this.updateTransformer();
        var position = stage.getPointerPosition();
        var timestamp = new Date().getTime();

        // Shape mới đc sinh ra trong array tương ứng
        if (this.typeOfShapeChoosen == 'Polygon' && !this.isPolygonCreated) {
          this.polygons = [].concat(_toConsumableArray(this.polygons), [{
            points: [position.x, position.y],
            fill: this.color,
            closed: true,
            opacity: this.opacityShape,
            draggable: false,
            name: "shape-".concat(timestamp),
            stroke: this.color,
            type: 'polygon',
            label: this.labelChoosen
            // strokeWidth: 2,
          }]);

          this.isPolygonCreated = true;
        }
        if (this.typeOfShapeChoosen == 'Line') {
          this.lines = [].concat(_toConsumableArray(this.lines), [{
            points: [position.x, position.y],
            points_0: [position.x, position.y],
            stroke: this.color,
            strokeWidth: this.strokeWidthLine,
            opacity: this.opacityShape,
            draggable: false,
            name: "shape-".concat(timestamp),
            type: 'line',
            label: this.labelChoosen
          }]);
        }
        if (this.typeOfShapeChoosen == 'Rectangle') {
          this.rectangles = [].concat(_toConsumableArray(this.rectangles), [{
            x: position.x,
            y: position.y,
            fill: this.color,
            opacity: this.opacityShape,
            draggable: false,
            name: "shape-".concat(timestamp),
            type: 'rectangle',
            label: this.labelChoosen
          }]);
        }

        // state để xử lý case click chuột nhưng ko move -> shape ko đc vẽ
        this.positionXRectStart = position.x;
        this.positionYRectStart = position.y;
        return;
      }

      // click khung viền transformer -> ko làm gì cả
      var clickedOnTransformer = target.getParent().className === 'Transformer';
      if (clickedOnTransformer) {
        return;
      }

      // lấy ra name của shape đc click
      var name = target.name();
      var rectangle = this.rectangles.find(function (r) {
        return r.name === name;
      });
      var polygon = this.polygons.find(function (r) {
        return r.name === name;
      });
      var line = this.lines.find(function (r) {
        return r.name === name;
      });
      this.shapeNameChoosen = line || rectangle || polygon ? name : '';
      this.updateTransformer();
    },
    handleStageMouseMove: function handleStageMouseMove(e) {
      // Tọa độ x,y của mouse
      var position = e.target.getStage().getPointerPosition();
      this.posX = position.x;
      this.posY = position.y;

      // no drawing - skipping
      if (!this.isDrawing) {
        return;
      }
      if (this.typeOfShapeChoosen == 'Polygon') {
        var newestShape = this.polygons[this.polygons.length - 1];
        if (!this.isHoldingShift) {
          newestShape.points = newestShape.points.concat([position.x, position.y]);
        }
      }
      if (this.typeOfShapeChoosen == 'Line') {
        var _newestShape = this.lines[this.lines.length - 1];
        // add point
        _newestShape.points = _newestShape.points_0.concat([position.x, position.y]);

        // // replace last
        // this.lines.splice(this.lines.length - 1, 1, newestShape);
      }

      // Tính toán (x2, y2), (width, height)
      /* Case 1: Vẽ từ trải qua phải, từ trên xuống dưới */
      if (this.typeOfShapeChoosen == 'Rectangle') {
        var _newestShape2 = this.rectangles[this.rectangles.length - 1];
        _newestShape2.x2 = position.x;
        _newestShape2.y2 = position.y;
        _newestShape2.x2_0 = position.x;
        _newestShape2.y2_0 = position.y;

        /* Case 2:
            - Vẽ từ phải -> trái: width < 0
            - Vẽ từ dưới -> trên: height < 0
            - Gọi thêm func calcCoordinatesRectangle() khi nhả chuột (mouseUp) để tính toán lại coordinates
        */
        _newestShape2.width = _newestShape2.x2 - _newestShape2.x;
        _newestShape2.height = _newestShape2.y2 - _newestShape2.y;
      }
    },
    handleStageMouseUp: function handleStageMouseUp(e) {
      var position = e.target.getStage().getPointerPosition();
      if (this.isHoldingShift) {
        if (this.typeOfShapeChoosen == 'Polygon' && this.isPolygonCreated) {
          var newestShape = this.polygons[this.polygons.length - 1];
          newestShape.points = newestShape.points.concat([position.x, position.y]);
        }
      } else {
        this.isPolygonCreated = false;

        // tự động xóa shape vừa đc sinh ra sau khi click chuột mà ko move
        if (this.positionXRectStart == position.x && this.positionYRectStart == position.y) {
          if (this.typeOfShapeChoosen == 'Polygon') {
            this.polygons.splice(this.polygons.length - 1, 1);
          }
          if (this.typeOfShapeChoosen == 'Line') {
            this.lines.splice(this.lines.length - 1, 1);
          }
          if (this.typeOfShapeChoosen == 'Rectangle') {
            this.rectangles.splice(this.rectangles.length - 1, 1);
          }
        } else {
          if (this.typeOfShapeChoosen == 'Line' && !this.shapeNameChoosen) {
            var _newestShape3 = this.lines[this.lines.length - 1];
            _newestShape3.points_0 = _newestShape3.points;
          }
        }
        this.isDrawing = false;
        this.positionXRectStart = 0;
        this.positionYRectStart = 0;
      }

      // Tính toán lại coordinates cho case 2 Rectangles
      this.calcCoordinatesRectangle();

      // xóa shape khi nhấn phím Delete
      this.handleRemoveShape(e);
    },
    calcCoordinatesRectangle: function calcCoordinatesRectangle() {
      if (this.typeOfShapeChoosen == 'Rectangle') {
        var shapeSelected = this.rectangles[this.rectangles.length - 1];
        var absWidth = Math.abs(shapeSelected.width);
        var absHeight = Math.abs(shapeSelected.height);

        // Case vẽ từ phải -> trái
        if (shapeSelected.width < 0) {
          shapeSelected.x = shapeSelected.x - absWidth;
          shapeSelected.x2 = shapeSelected.x + absWidth;
          shapeSelected.x2_0 = shapeSelected.x + absWidth;
          shapeSelected.width_0 = absWidth;
        }

        // Case vẽ từ dưới -> trên
        if (shapeSelected.height < 0) {
          shapeSelected.y = shapeSelected.y - absHeight;
          shapeSelected.y2 = shapeSelected.y + absHeight;
          shapeSelected.y2_0 = shapeSelected.y + absHeight;
          shapeSelected.height_0 = absHeight;
        }
        shapeSelected.width = absWidth;
        shapeSelected.height = absHeight;
      }
    },
    addShapeToJson: function addShapeToJson() {
      var allShape = [].concat(_toConsumableArray(this.lines), _toConsumableArray(this.polygons), _toConsumableArray(this.rectangles));
      var result = [];
      allShape.forEach(function (value, index) {
        var points = [];
        if (value.type == 'rectangle') {
          points = [[value.x, value.y], [value.x2, value.y2]];
        }
        if (value.type == 'line') {
          var valuePoint = value.points;
          points = [[valuePoint[0], valuePoint[1]], [valuePoint[2], valuePoint[3]]];
        }
        if (value.type == 'polygon') {
          var _index = 0;
          value.points.forEach(function (value, key) {
            if (key > 1) {
              if (key % 2 == 0) {
                points.push([value]);
              } else {
                points[_index].push(value);
                _index++;
              }
            }
          });
        }
        result = [].concat(_toConsumableArray(result), [{
          "label": value.label,
          "points": points,
          "group_id": null,
          "shape_type": value.type,
          "flags": {}
        }]);
      });
      this.jsonResult = {
        "version": "4.2.10",
        "flags": {},
        "shapes": result
      };
    },
    handleRemoveShape: function handleRemoveShape() {
      var _this3 = this;
      window.addEventListener('keypress', function (e) {
        if (e.key == 'Delete') {
          var _this = _this3;
          var indexLine = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(_this3.lines, function (o) {
            return o.name == _this.shapeNameChoosen;
          });
          var indexPolygon = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(_this3.polygons, function (o) {
            return o.name == _this.shapeNameChoosen;
          });
          var indexRectangle = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(_this3.rectangles, function (o) {
            return o.name == _this.shapeNameChoosen;
          });
          if (indexLine > -1) {
            _this3.lines.splice(indexLine, 1);
          }
          if (indexPolygon > -1) {
            _this3.polygons.splice(indexPolygon, 1);
          }
          if (indexRectangle > -1) {
            _this3.rectangles.splice(indexRectangle, 1);
          }
          _this3.shapeNameChoosen = '';
          _this3.updateTransformer();
        }
      });
    },
    handleShiftKeypress: function handleShiftKeypress() {
      var _this4 = this;
      window.addEventListener('keydown', function (e) {
        if (_this4.typeOfShapeChoosen == 'Polygon' && e.key == 'Shift') {
          _this4.isHoldingShift = true;
          _this4.isDrawing = true;
        }
      });
      window.addEventListener('keyup', function (e) {
        if (_this4.typeOfShapeChoosen == 'Polygon' && _this4.isHoldingShift) {
          _this4.isHoldingShift = false;
          _this4.isDrawing = false;
          _this4.isPolygonCreated = false;
        }
      });
    },
    handleSpaceKeypress: function handleSpaceKeypress() {
      var _this5 = this;
      var _this = this;
      window.addEventListener('keydown', function (e) {
        if (e.keyCode == 32 && e.target == document.body) {
          _this.isHoldingSpace = true;
          e.preventDefault();
        }
      });
      window.addEventListener('keyup', function (e) {
        if (e.keyCode == 32 && e.target == document.body && _this5.isHoldingSpace) {
          _this5.isHoldingSpace = false;
        }
      });
    },
    handleUndo: function handleUndo() {
      var _this6 = this;
      window.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.code == 'KeyZ') {
          var allShapeName = [].concat(_toConsumableArray(_this6.lines), _toConsumableArray(_this6.polygons), _toConsumableArray(_this6.rectangles));
          if (!allShapeName.length) {
            return;
          }
          allShapeName = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.sortBy)(allShapeName, ['name']);
          var newsetShapeName = allShapeName[allShapeName.length - 1].name;
          var indexLine = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(_this6.lines, function (o) {
            return o.name == newsetShapeName;
          });
          var indexPolygon = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(_this6.polygons, function (o) {
            return o.name == newsetShapeName;
          });
          var indexRectangle = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(_this6.rectangles, function (o) {
            return o.name == newsetShapeName;
          });
          if (indexLine > -1) {
            _this6.lines.splice(indexLine, 1);
          }
          if (indexPolygon > -1) {
            _this6.polygons.splice(indexPolygon, 1);
          }
          if (indexRectangle > -1) {
            _this6.rectangles.splice(indexRectangle, 1);
          }
          _this6.shapeNameChoosen = '';
          _this6.updateTransformer();
        }
      });
    },
    handleDragEnd: function handleDragEnd(e) {
      var _this7 = this;
      console.log('x-y: ', e.target.x(), e.target.y());
      var _this = this;
      var rectangle = this.rectangles.find(function (r) {
        return r.name === _this7.shapeNameChoosen;
      });
      var line = this.lines.find(function (r) {
        return r.name === _this7.shapeNameChoosen;
      });
      var indexLine = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(this.lines, function (o) {
        return o.name == _this.shapeNameChoosen;
      });
      if (rectangle) {
        rectangle.x = e.target.x();
        rectangle.y = e.target.y();
        rectangle.x2 = rectangle.x + rectangle.width;
        rectangle.y2 = rectangle.y + rectangle.height;
      }
      if (line) {
        var newPoints = [];
        line.points_0.forEach(function (value, key) {
          if (key % 2 == 0) {
            console.log('key-value 1: ', key, value);
            newPoints = [].concat(_toConsumableArray(newPoints), [value + e.target.x()]);
          } else {
            console.log('key-value 2: ', key, value);
            newPoints = [].concat(_toConsumableArray(newPoints), [value + e.target.y()]);
          }
        });
        console.log('newPoints: ', newPoints);

        // line.points = [ 412.203125, 246.203125, 550.203125, 248.203125 ]
        line.points = newPoints;
        this.lines.splice(this.lines.length - 1, 1, lastLine);

        // line.x2 = line.x + line.width
        // line.y2 = line.y + line.height
      }

      this.$forceUpdate();
    },
    handleTransformEnd: function handleTransformEnd(e) {
      var _this8 = this;
      return;
      var transformerNode = this.$refs.transformer.getNode();
      var anchor = transformerNode.getActiveAnchor();
      var target = e.target;
      var position = e.target.getStage().getPointerPosition();
      var rectangle = this.rectangles.find(function (r) {
        return r.name === _this8.shapeNameChoosen;
      });

      // x2_0, y2_0: Tọa độ (x2, y2) ban đầu (không thay đổi khi transform)
      if (anchor == 'middle-right' || anchor == 'bottom-right') {
        rectangle.x2 = rectangle.x2_0 * target.scaleX() - (rectangle.x * target.scaleX() - rectangle.x);
      }
      if (anchor == 'bottom-center' || anchor == 'bottom-right') {
        rectangle.y2 = rectangle.y2_0 * target.scaleY() - (rectangle.y * target.scaleY() - rectangle.y);
      }
      rectangle.x = target.x();
      rectangle.y = target.y();
      console.log('scale: ', target.scaleX());
      console.log('width: ', rectangle.x, rectangle.x2, (0,lodash__WEBPACK_IMPORTED_MODULE_0__.round)(rectangle.x2 - rectangle.x, 0));
      // rectangle.width = rectangle.width_0 * target.scaleX()
      // rectangle.height = round(rectangle.y2 - rectangle.y, 0)
      // rectangle.height = rectangle.height + round(rectangle.y2 - rectangle.y, 0) / 2
      // rectangle.height = newY2 - rectangle.y

      this.$forceUpdate();
    },
    updateTransformer: function updateTransformer() {
      if (this.isHoldingShift) {
        return;
      }
      var transformerNode = this.$refs.transformer.getNode();
      var stage = transformerNode.getStage();
      var shapeNameChoosen = this.shapeNameChoosen;
      var selectedNode = stage.findOne('.' + shapeNameChoosen);

      // do nothing if selected node is allready attached
      if (selectedNode === transformerNode.node()) {
        return;
      }
      if (selectedNode) {
        // attach to another node
        transformerNode.attachTo(selectedNode);
        // transformerNode.nodes([selectedNode])
      } else {
        transformerNode.detach();
        // transformerNode.nodes([])
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/FormModal.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/FormModal.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm-bundler.js");
/* harmony import */ var _services_CameraService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/services/CameraService */ "./resources/js/services/CameraService.js");
/* harmony import */ var _services_CameraGroupService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/services/CameraGroupService */ "./resources/js/services/CameraGroupService.js");
/* harmony import */ var _services_ViolationService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/services/ViolationService */ "./resources/js/services/ViolationService.js");
/* harmony import */ var _vuelidate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vuelidate/core */ "./node_modules/@vuelidate/core/dist/index.esm.js");
/* harmony import */ var vue_toastification__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue-toastification */ "./node_modules/vue-toastification/dist/index.mjs");
/* harmony import */ var _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @vuelidate/validators */ "./node_modules/@vuelidate/validators/dist/index.esm.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _assets_icon_plus_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/assets/icon/plus.png */ "./resources/assets/icon/plus.png");
/* harmony import */ var _mixins_clickSelect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ~/mixins/clickSelect.js */ "./resources/js/mixins/clickSelect.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }











var toast = (0,vue_toastification__WEBPACK_IMPORTED_MODULE_5__.useToast)();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "FormModal",
  props: {
    dataForm: {
      type: Object,
      "default": {}
    }
  },
  emits: ['onClose', 'onSuccess'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var store = (0,vuex__WEBPACK_IMPORTED_MODULE_9__.useStore)();
    var isLoading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var isCreate = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return !Object.keys(props.dataForm).length;
    });
    var isAdmin = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return store.getters["isAdmin"];
    });
    var fields = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      id_cam: '',
      name: '',
      address: '',
      hls_url: '',
      rtsp_url: '',
      lat: '',
      lng: '',
      group_ids: [],
      violation_ids: []
    });
    var rules = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      id_cam: {
        required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.helpers.withMessage('ID camera là bắt buộc', _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.required),
        maxLength: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.helpers.withMessage('ID camera tối đa 255 ký tự', (0,_vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.maxLength)(255))
      },
      name: {
        required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.helpers.withMessage('Tên camera là bắt buộc', _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.required),
        maxLength: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.helpers.withMessage('Tên camera tối đa 45 ký tự', (0,_vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.maxLength)(45))
      },
      address: {
        required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.helpers.withMessage('Địa chỉ là bắt buộc', _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.required),
        maxLength: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.helpers.withMessage('Địa chỉ tối đa 255 ký tự', (0,_vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.maxLength)(255))
      },
      hls_url: {
        required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.helpers.withMessage('Url HLS là bắt buộc', _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.required),
        maxLength: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.helpers.withMessage('Url HLS tối đa 255 ký tự', (0,_vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.maxLength)(255))
      },
      rtsp_url: {
        required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.helpers.withMessage('Url RTSP là bắt buộc', _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.required),
        maxLength: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.helpers.withMessage('Url RTSP tối đa 255 ký tự', (0,_vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.maxLength)(255))
      }
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {
      initData(), getListCameraGroup();
      getListViolation();
    });
    var groups = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var violations = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var getListCameraGroup = function getListCameraGroup() {
      if (isAdmin.value) {
        _services_CameraGroupService__WEBPACK_IMPORTED_MODULE_2__["default"].listAll().then(function (response) {
          groups.value = response.data;
        });
      }
    };
    var getListViolation = function getListViolation() {
      _services_ViolationService__WEBPACK_IMPORTED_MODULE_3__["default"].listAll().then(function (response) {
        violations.value = response.data;
      });
    };
    var v$ = (0,_vuelidate_core__WEBPACK_IMPORTED_MODULE_4__.useVuelidate)(rules, fields);
    var error_server = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var initData = function initData() {
      if (!isCreate.value) {
        fields.value = _objectSpread({}, props.dataForm);
        var group_ids = [];
        var violation_ids = [];
        (0,lodash__WEBPACK_IMPORTED_MODULE_6__.forEach)(props.dataForm.groups, function (value, key) {
          group_ids.push(value.id);
        });
        (0,lodash__WEBPACK_IMPORTED_MODULE_6__.forEach)(props.dataForm.violations, function (value, key) {
          violation_ids.push(value.id);
        });
        fields.value = _objectSpread(_objectSpread({}, props.dataForm), {}, {
          group_ids: group_ids,
          violation_ids: violation_ids
        });
      }
    };
    var submitForm = function submitForm() {
      error_server.value = {};
      v$.value.$validate();
      if (!v$.value.$error) {
        isLoading.value = true;
        if (isCreate.value) {
          _services_CameraService__WEBPACK_IMPORTED_MODULE_1__["default"].create(fields.value).then(function (response) {
            handleResponse(response);
          });
        } else {
          _services_CameraService__WEBPACK_IMPORTED_MODULE_1__["default"].update(props.dataForm.id, fields.value).then(function (response) {
            handleResponse(response);
          });
        }
      }
    };
    var handleResponse = function handleResponse(response) {
      isLoading.value = false;
      if (response.status != 200) {
        console.log('adasd');
        error_server.value = response.data.errors;
      } else {
        toast.success(isCreate.value ? 'Thêm mới camera thành công' : 'Cập nhật camera thành công');
        emit('onSuccess');
        onClose();
      }
    };
    var onClose = function onClose() {
      emit('onClose');
      v$.value.$reset();
      error_server.value = {};
      fields.value = {
        name: ""
      };
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {
      handleClickOutside();
    });
    var _clickSelectMixins = (0,_mixins_clickSelect_js__WEBPACK_IMPORTED_MODULE_8__.clickSelectMixins)(),
      handleClickOutside = _clickSelectMixins.handleClickOutside,
      clickSelect = _clickSelectMixins.clickSelect;
    var iconPlus = _assets_icon_plus_png__WEBPACK_IMPORTED_MODULE_7__["default"];
    return {
      iconPlus: iconPlus,
      isAdmin: isAdmin,
      isLoading: isLoading,
      groups: groups,
      violations: violations,
      fields: fields,
      rules: rules,
      isCreate: isCreate,
      submitForm: submitForm,
      onClose: onClose,
      clickSelect: clickSelect,
      error_server: error_server,
      v$: v$
    };
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/List.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/List.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm-bundler.js");
/* harmony import */ var _services_CameraService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/services/CameraService */ "./resources/js/services/CameraService.js");
/* harmony import */ var _FormModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FormModal */ "./resources/js/pages/camera/FormModal.vue");
/* harmony import */ var _ConfigModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ConfigModal */ "./resources/js/pages/camera/ConfigModal.vue");
/* harmony import */ var vue_toastification__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-toastification */ "./node_modules/vue-toastification/dist/index.mjs");
/* harmony import */ var _assets_icon_plus_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/assets/icon/plus.png */ "./resources/assets/icon/plus.png");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







var toast = (0,vue_toastification__WEBPACK_IMPORTED_MODULE_4__.useToast)();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ListCamera",
  components: {
    FormModal: _FormModal__WEBPACK_IMPORTED_MODULE_2__["default"],
    ConfigModal: _ConfigModal__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  setup: function setup() {
    var store = (0,vuex__WEBPACK_IMPORTED_MODULE_6__.useStore)();
    var isAdmin = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return store.getters["authUser"];
    });
    var isLoading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var items = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var pagination = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var perPageOptions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([5, 10, 25, 50, 100]);
    var tableQuery = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var columnsForAdmin = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      name: 'Tên camera',
      address: 'Địa chỉ',
      rtsp_url: 'Url RTSP',
      violations: 'Cấu hình vi phạm',
      groups: 'Nhóm camera'
    });
    var columns = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      name: 'Tên camera',
      address: 'Địa chỉ',
      rtsp_url: 'Url RTSP'
    });

    // onMounted(() => {
    // initTableColumn()
    // });

    // const initTableColumn = async () => {
    //     await nextTick()
    //     if (isAdmin.value) {
    //         columns.value = {
    //             name: 'Tên camera',
    //             hls_url: 'Url HLS',
    //             rtsp_url: 'Url RTSP',
    //             violations: 'Cấu hình vi phạm',
    //             groups: 'Nhóm camera'
    //         }
    //     } else {
    //         columns.value = {
    //             name: 'Tên camera',
    //             address: 'Địa chỉ',
    //             rtsp_url: 'Url RTSP',
    //             // hls_url: 'Url HLS',
    //             // violations: 'Cấu hình vi phạm'
    //         }
    //     }
    // }

    var initCamera = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(query) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              isLoading.value = true;
              _services_CameraService__WEBPACK_IMPORTED_MODULE_1__["default"].list({
                page: query.page,
                per_page: query.per_page,
                keyword: query.search
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
    var isShowModal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var isShowModalDelete = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var isShowModalConfig = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var dataForm = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var showModalCreate = function showModalCreate() {
      dataForm.value = {};
      isShowModal.value = true;
    };
    var showModalUpdate = function showModalUpdate(row) {
      dataForm.value = row;
      isShowModal.value = true;
    };
    var showModalDelete = function showModalDelete(row) {
      dataForm.value = {
        type: 'camera',
        id: row.id,
        name: row.name
      };
      isShowModalDelete.value = true;
    };
    var showModalConfig = function showModalConfig(row) {
      dataForm.value = {
        type: 'camera',
        id_cam: row.id,
        hls_url: row.hls_url,
        name: row.name
      };
      isShowModalConfig.value = true;
    };
    var onDelete = function onDelete(id) {
      _services_CameraService__WEBPACK_IMPORTED_MODULE_1__["default"].destroy(id).then(function (response) {
        onClose();
        if (response.status != 200) {
          toast.success('Có lỗi xảy ra, vui lòng thử lại!');
        } else {
          toast.success('Xóa camera thành công');
          initCamera(tableQuery.value);
        }
      });
    };
    var onClose = function onClose() {
      isShowModal.value = false;
      isShowModalDelete.value = false;
      isShowModalConfig.value = false;
    };
    var onSuccess = function onSuccess() {
      initCamera(tableQuery.value);
    };
    var isEdit = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(true);
    var isDelete = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(true);
    var iconPlus = _assets_icon_plus_png__WEBPACK_IMPORTED_MODULE_5__["default"];
    return {
      isAdmin: isAdmin,
      isLoading: isLoading,
      initCamera: initCamera,
      items: items,
      columns: columns,
      columnsForAdmin: columnsForAdmin,
      pagination: pagination,
      perPageOptions: perPageOptions,
      isEdit: isEdit,
      isDelete: isDelete,
      dataForm: dataForm,
      isShowModal: isShowModal,
      isShowModalDelete: isShowModalDelete,
      isShowModalConfig: isShowModalConfig,
      iconPlus: iconPlus,
      showModalCreate: showModalCreate,
      showModalUpdate: showModalUpdate,
      showModalDelete: showModalDelete,
      showModalConfig: showModalConfig,
      onClose: onClose,
      onDelete: onDelete,
      onSuccess: onSuccess
    };
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=template&id=e36795ac":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=template&id=e36795ac ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "d-flex justify-content-center align-items-center mb-4"
};
var _hoisted_2 = {
  "class": "select_custom mb-0 mr-20"
};
var _hoisted_3 = {
  "class": "dialog-footer"
};
var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Hủy bỏ ");
var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Lưu cấu hình ");
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_el_option = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-option");
  var _component_el_select = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-select");
  var _component_el_radio_button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-radio-button");
  var _component_el_radio_group = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-radio-group");
  var _component_el_col = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-col");
  var _component_el_row = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-row");
  var _component_v_rect = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("v-rect");
  var _component_v_line = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("v-line");
  var _component_v_transformer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("v-transformer");
  var _component_v_layer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("v-layer");
  var _component_v_stage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("v-stage");
  var _component_el_button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-button");
  var _component_el_dialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-dialog");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_dialog, {
    title: "C\u1EA5u h\xECnh vi ph\u1EA1m camera ".concat($props.dataForm.name),
    width: "95%",
    center: "",
    "close-on-click-modal": false,
    "close-on-press-escape": false,
    onClose: $options.onClose,
    fullscreen: ""
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
        round: "",
        onClick: $options.onClose,
        "class": "btn-custom dark_lighten_2--bg dark_lighten_2--hover dark_lighten_2--border white_darken_2--text"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_4];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
        type: "danger",
        round: "",
        onClick: $options.addShapeToJson
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_5];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["onClick"])])];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_select, {
        modelValue: $data.labelChoosen,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          return $data.labelChoosen = $event;
        }),
        "class": "select-label",
        onChange: $options.onChangeSelectLabel,
        placeholder: "Select"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.labels, function (item, index) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_option, {
              key: "label-".concat(index),
              label: item.value,
              value: item.value
            }, null, 8 /* PROPS */, ["label", "value"]);
          }), 128 /* KEYED_FRAGMENT */))];
        }),

        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["modelValue", "onChange"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <span class=\"white--text pr-4\">Label</span> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <select\n                    v-model=\"labelChoosen\"\n                    @change=\"onChangeSelectLabel\"\n                    filterable\n                >\n                    <option\n                        v-for=\"(item, index) in labels\"\n                        :key=\"`label-${index}`\"\n                        :value=\"item.value\"\n                    >\n                        {{ item.value }}\n                    </option>\n                </select> ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_radio_group, {
        modelValue: $data.typeOfShapeChoosen,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          return $data.typeOfShapeChoosen = $event;
        }),
        size: "large",
        "class": "radio-group-custom"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.typeOfShapes, function (item, index) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_radio_button, {
              key: "label-".concat(index),
              label: item
            }, null, 8 /* PROPS */, ["label"]);
          }), 128 /* KEYED_FRAGMENT */))];
        }),

        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["modelValue"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
            md: 6
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
            md: 6,
            "class": "d-flex align-items-center"
          })];
        }),
        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        ref: "konva",
        "class": "div-stage",
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
          'background-image': 'url(' + __webpack_require__("./resources/js/pages/camera sync recursive ^.*$")("" + _ctx.item.img) + ')'
        })
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_v_stage, {
        ref: "stage",
        config: $data.configKonva,
        onMousedown: $options.handleStageMouseDown,
        onMousemove: $options.handleStageMouseMove,
        onMouseup: $options.handleStageMouseUp,
        onTouchstart: $options.handleStageMouseDown
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_v_layer, {
            ref: "layer"
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <v-circle\n                        :config=\"configCircle\"\n                        v-for=\"(circle, index) in circles\"\n                        :key=\"`circle-${index}`\"\n                    /> "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.rectangles, function (item, index) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_v_rect, {
                  key: "item-".concat(item.name),
                  config: item,
                  onTransformend: $options.handleTransformEnd,
                  onDragend: $options.handleDragEnd
                }, null, 8 /* PROPS */, ["config", "onTransformend", "onDragend"]);
              }), 128 /* KEYED_FRAGMENT */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.polygons, function (item, index) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_v_line, {
                  key: "item-".concat(item.name),
                  config: item,
                  onDragend: $options.handleDragEnd
                }, null, 8 /* PROPS */, ["config", "onDragend"]);
              }), 128 /* KEYED_FRAGMENT */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.lines, function (item, index) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_v_line, {
                  key: "item-".concat(item.name),
                  config: item,
                  onDragend: $options.handleDragEnd
                }, null, 8 /* PROPS */, ["config", "onDragend"]);
              }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_v_transformer, {
                ref: "transformer",
                rotateEnabled: false,
                resizeEnabled: false,
                borderStrokeWidth: 4
              }, null, 512 /* NEED_PATCH */)];
            }),

            _: 1 /* STABLE */
          }, 512 /* NEED_PATCH */)];
        }),

        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["config", "onMousedown", "onMousemove", "onMouseup", "onTouchstart"])], 4 /* STYLE */)];
    }),

    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["title", "onClose"]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/FormModal.vue?vue&type=template&id=464973a8":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/FormModal.vue?vue&type=template&id=464973a8 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "form-floating"
};
var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Tên camera", -1 /* HOISTED */);
var _hoisted_3 = {
  key: 0,
  "class": "invalid-feedback d-block"
};
var _hoisted_4 = {
  "class": "invalid-feedback d-block"
};
var _hoisted_5 = {
  "class": "form-floating"
};
var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "ID camera", -1 /* HOISTED */);
var _hoisted_7 = {
  key: 0,
  "class": "invalid-feedback d-block"
};
var _hoisted_8 = {
  "class": "invalid-feedback d-block"
};
var _hoisted_9 = {
  "class": "form-floating"
};
var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Địa chỉ", -1 /* HOISTED */);
var _hoisted_11 = {
  key: 0,
  "class": "invalid-feedback d-block"
};
var _hoisted_12 = {
  "class": "invalid-feedback d-block"
};
var _hoisted_13 = {
  "class": "form-floating"
};
var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Url HLS", -1 /* HOISTED */);
var _hoisted_15 = {
  key: 0,
  "class": "invalid-feedback d-block"
};
var _hoisted_16 = {
  "class": "invalid-feedback d-block"
};
var _hoisted_17 = {
  "class": "form-floating"
};
var _hoisted_18 = ["disabled"];
var _hoisted_19 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Url RTSP", -1 /* HOISTED */);
var _hoisted_20 = {
  key: 0,
  "class": "invalid-feedback d-block"
};
var _hoisted_21 = {
  "class": "invalid-feedback d-block"
};
var _hoisted_22 = {
  key: 0,
  "class": "select_custom"
};
var _hoisted_23 = {
  key: 0,
  "class": "invalid-feedback d-block"
};
var _hoisted_24 = {
  "class": "select_custom"
};
var _hoisted_25 = {
  key: 0,
  "class": "invalid-feedback d-block"
};
var _hoisted_26 = {
  "class": "form-floating"
};
var _hoisted_27 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Latitude", -1 /* HOISTED */);
var _hoisted_28 = {
  key: 0,
  "class": "invalid-feedback d-block"
};
var _hoisted_29 = {
  "class": "form-floating"
};
var _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Longitude", -1 /* HOISTED */);
var _hoisted_31 = {
  key: 0,
  "class": "invalid-feedback d-block"
};
var _hoisted_32 = {
  "class": "dialog-footer"
};
var _hoisted_33 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Hủy bỏ ");
var _hoisted_34 = ["src"];
var _hoisted_35 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Thêm mới", -1 /* HOISTED */);
var _hoisted_36 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Cập nhật ");
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_el_col = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-col");
  var _component_el_option = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-option");
  var _component_el_select = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-select");
  var _component_el_row = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-row");
  var _component_el_form = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-form");
  var _component_el_button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-button");
  var _component_el_dialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-dialog");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_dialog, {
    title: $setup.isCreate ? 'Thêm mới camera' : 'Cập nhật camera',
    width: "40%",
    center: "",
    "close-on-click-modal": false,
    "close-on-press-escape": false,
    onClose: $setup.onClose
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
        round: "",
        onClick: $setup.onClose,
        "class": "btn-custom dark_lighten_2--bg dark_lighten_2--hover dark_lighten_2--border white_darken_2--text"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_33];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
        round: "",
        loading: $setup.isLoading,
        onClick: _cache[11] || (_cache[11] = function ($event) {
          return $setup.submitForm();
        }),
        "class": "btn-custom red--bg red--hover red--border white_darken_2--text"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [$setup.isCreate ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            key: 0
          }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
            src: $setup.iconPlus,
            "class": "white mr-3",
            alt: "icon_plus",
            width: "17"
          }, null, 8 /* PROPS */, _hoisted_34), _hoisted_35], 64 /* STABLE_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            key: 1
          }, [_hoisted_36], 64 /* STABLE_FRAGMENT */))];
        }),

        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["loading"])])];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form, {
        model: $setup.fields,
        rules: $setup.rules,
        ref: "form",
        "label-width": "0",
        "label-position": "left"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
            gutter: 20
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                xs: 24,
                md: $setup.isAdmin ? 12 : 24
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                    type: "text",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
                      return $setup.fields.name = $event;
                    }),
                    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control required", {
                      'is-invalid': $setup.v$.name.$errors.length || $setup.error_server.name
                    }]),
                    placeholder: "Tên camera"
                  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.fields.name, void 0, {
                    trim: true
                  }]]), _hoisted_2, $setup.error_server.name ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.name[0]), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    key: 1
                  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.v$.name.$errors, function (error) {
                    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
                      key: error.$property
                    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(error.$message), 1 /* TEXT */)]);
                  }), 128 /* KEYED_FRAGMENT */))])];
                }),

                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["md"]), $setup.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_col, {
                key: 0,
                xs: 24,
                md: $setup.isAdmin ? 12 : 24
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                    type: "text",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
                      return $setup.fields.id_cam = $event;
                    }),
                    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control required", {
                      'is-invalid': $setup.v$.id_cam.$errors.length || $setup.error_server.id_cam
                    }]),
                    placeholder: "ID camera"
                  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.fields.id_cam, void 0, {
                    trim: true
                  }]]), _hoisted_6, $setup.error_server.id_cam ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.id_cam[0]), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    key: 1
                  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.v$.id_cam.$errors, function (error) {
                    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
                      key: error.$property
                    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(error.$message), 1 /* TEXT */)]);
                  }), 128 /* KEYED_FRAGMENT */))])];
                }),

                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["md"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                xs: 24
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                    type: "text",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
                      return $setup.fields.address = $event;
                    }),
                    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control required", {
                      'is-invalid': $setup.v$.address.$errors.length || $setup.error_server.address
                    }]),
                    placeholder: "Địa chỉ"
                  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.fields.address, void 0, {
                    trim: true
                  }]]), _hoisted_10, $setup.error_server.address ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.address[0]), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    key: 1
                  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.v$.address.$errors, function (error) {
                    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
                      key: error.$property
                    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(error.$message), 1 /* TEXT */)]);
                  }), 128 /* KEYED_FRAGMENT */))])];
                }),

                _: 1 /* STABLE */
              }), $setup.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_col, {
                key: 1,
                xs: 24
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                    type: "text",
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
                      return $setup.fields.hls_url = $event;
                    }),
                    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control required", {
                      'is-invalid': $setup.v$.hls_url.$errors.length || $setup.error_server.hls_url
                    }]),
                    placeholder: "Url HLS"
                  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.fields.hls_url, void 0, {
                    trim: true
                  }]]), _hoisted_14, $setup.error_server.hls_url ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.hls_url[0]), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    key: 1
                  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.v$.hls_url.$errors, function (error) {
                    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
                      key: error.$property
                    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(error.$message), 1 /* TEXT */)]);
                  }), 128 /* KEYED_FRAGMENT */))])];
                }),

                _: 1 /* STABLE */
              })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                xs: 24
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                    type: "text",
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
                      return $setup.fields.rtsp_url = $event;
                    }),
                    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control required", {
                      'is-invalid': $setup.v$.rtsp_url.$errors.length || $setup.error_server.rtsp_url
                    }]),
                    placeholder: "Url RTSP",
                    disabled: !$setup.isAdmin
                  }, null, 10 /* CLASS, PROPS */, _hoisted_18), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.fields.rtsp_url, void 0, {
                    trim: true
                  }]]), _hoisted_19, $setup.error_server.rtsp_url ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.rtsp_url[0]), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    key: 1
                  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.v$.rtsp_url.$errors, function (error) {
                    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
                      key: error.$property
                    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(error.$message), 1 /* TEXT */)]);
                  }), 128 /* KEYED_FRAGMENT */))])];
                }),

                _: 1 /* STABLE */
              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                xs: 24
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [$setup.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_select, {
                    modelValue: $setup.fields.group_ids,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
                      return $setup.fields.group_ids = $event;
                    }),
                    "class": "select_group",
                    onClick: _cache[6] || (_cache[6] = function ($event) {
                      return $setup.clickSelect('select_group');
                    }),
                    multiple: ""
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.groups, function (group) {
                        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_option, {
                          key: group.id,
                          label: group.name,
                          value: group.id
                        }, null, 8 /* PROPS */, ["label", "value"]);
                      }), 128 /* KEYED_FRAGMENT */))];
                    }),

                    _: 1 /* STABLE */
                  }, 8 /* PROPS */, ["modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
                    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.fields.group_ids && $setup.fields.group_ids.length ? 'has-value' : '')
                  }, " Nhóm camera ", 2 /* CLASS */), $setup.error_server.group_ids ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.group_ids[0]), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
                }),
                _: 1 /* STABLE */
              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                xs: 24
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_select, {
                    modelValue: $setup.fields.violation_ids,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
                      return $setup.fields.violation_ids = $event;
                    }),
                    "class": "select_violation",
                    onClick: _cache[8] || (_cache[8] = function ($event) {
                      return $setup.clickSelect('select_violation');
                    }),
                    multiple: ""
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.violations, function (violation) {
                        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_option, {
                          key: violation.id,
                          label: violation.name,
                          value: violation.id
                        }, null, 8 /* PROPS */, ["label", "value"]);
                      }), 128 /* KEYED_FRAGMENT */))];
                    }),

                    _: 1 /* STABLE */
                  }, 8 /* PROPS */, ["modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
                    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.fields.violation_ids && $setup.fields.violation_ids.length ? 'has-value' : '')
                  }, " Lỗi vi phạm ", 2 /* CLASS */), $setup.error_server.violation_ids ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.violation_ids[0]), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])];
                }),
                _: 1 /* STABLE */
              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                xs: 24,
                sm: 12
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                    type: "text",
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = function ($event) {
                      return $setup.fields.lat = $event;
                    }),
                    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
                      'is-invalid': $setup.error_server.lat
                    }]),
                    placeholder: "Latitude"
                  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.fields.lat, void 0, {
                    trim: true
                  }]]), _hoisted_27, $setup.error_server.lat ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.lat[0]), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])];
                }),
                _: 1 /* STABLE */
              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                xs: 24,
                sm: 12
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                    type: "text",
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = function ($event) {
                      return $setup.fields.lng = $event;
                    }),
                    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
                      'is-invalid': $setup.error_server.lng
                    }]),
                    placeholder: "Longitude"
                  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.fields.lng, void 0, {
                    trim: true
                  }]]), _hoisted_30, $setup.error_server.lng ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.lng[0]), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])];
                }),
                _: 1 /* STABLE */
              })];
            }),

            _: 1 /* STABLE */
          })];
        }),

        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["model", "rules"])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["title", "onClose"]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/List.vue?vue&type=template&id=6f1fbe8f":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/List.vue?vue&type=template&id=6f1fbe8f ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = ["src"];
var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Thêm mới ");
var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("STT");
var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Hành động");
var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Không có dữ liệu ");
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_el_button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-button");
  var _component_table_head = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("table-head");
  var _component_table_head_cell = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("table-head-cell");
  var _component_table_body = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("table-body");
  var _component_EditPen = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("EditPen");
  var _component_el_icon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-icon");
  var _component_Delete = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Delete");
  var _component_Setting = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Setting");
  var _component_table_body_cell = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("table-body-cell");
  var _component_data_table = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("data-table");
  var _component_portlet = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("portlet");
  var _component_form_modal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("form-modal");
  var _component_config_modal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("config-modal");
  var _component_modal_confirm = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("modal-confirm");
  var _component_preloader = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("preloader");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_portlet, {
    title: "Danh sách camera"
  }, {
    tool: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$setup.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_button, {
        key: 0,
        type: "danger",
        round: "",
        onClick: $setup.showModalCreate
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
            src: $setup.iconPlus,
            "class": "white mr-3",
            alt: "icon_plus",
            width: "17"
          }, null, 8 /* PROPS */, _hoisted_1), _hoisted_2];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["onClick"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_data_table, {
        rows: $setup.items,
        pagination: $setup.pagination,
        columns: $setup.columns,
        perPageOptions: $setup.perPageOptions,
        onLoadData: $setup.initCamera,
        filter: "",
        striped: "",
        hoverable: "",
        sn: ""
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createSlots)({
        "thead-sn": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_table_head, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [_hoisted_3];
            }),
            _: 1 /* STABLE */
          })];
        }),

        tbody: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (_ref) {
          var row = _ref.row;
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_table_body, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.name), 1 /* TEXT */)];
            }),

            _: 2 /* DYNAMIC */
          }, 1024 /* DYNAMIC_SLOTS */), !$setup.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_table_body, {
            key: 0
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.address), 1 /* TEXT */)];
            }),

            _: 2 /* DYNAMIC */
          }, 1024 /* DYNAMIC_SLOTS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_table_body, {
            key: 1
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.hls_url), 1 /* TEXT */)];
            }),

            _: 2 /* DYNAMIC */
          }, 1024 /* DYNAMIC_SLOTS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_table_body, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.rtsp_url), 1 /* TEXT */)];
            }),

            _: 2 /* DYNAMIC */
          }, 1024 /* DYNAMIC_SLOTS */), $setup.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_table_body, {
            key: 2
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(row.violations, function (violation, key) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
                  key: "table-body-".concat(key)
                }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, row.violations.length > 3 && key == Math.round(row.violations.length / 2)]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(violation.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, ", ", 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, key < row.violations.length - 1]])]);
              }), 128 /* KEYED_FRAGMENT */))];
            }),

            _: 2 /* DYNAMIC */
          }, 1024 /* DYNAMIC_SLOTS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_table_body, {
            key: 3
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(row.groups, function (group, key) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
                  key: "table-body-".concat(key)
                }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(group.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, ", ", 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, key < row.groups.length - 1]])]);
              }), 128 /* KEYED_FRAGMENT */))];
            }),

            _: 2 /* DYNAMIC */
          }, 1024 /* DYNAMIC_SLOTS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_table_body, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [$setup.isAdmin || row.permission == 'EDIT' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_icon, {
                key: 0,
                onClick: function onClick($event) {
                  return $setup.showModalUpdate(row);
                },
                size: "16",
                "class": "mr-4 green--text"
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_EditPen)];
                }),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_icon, {
                key: 1,
                onClick: function onClick($event) {
                  return $setup.showModalDelete(row);
                },
                "class": "mr-4 orange--text",
                size: "16"
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Delete)];
                }),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_icon, {
                key: 2,
                onClick: function onClick($event) {
                  return $setup.showModalConfig(row);
                },
                "class": "gray--text",
                size: "16"
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Setting)];
                }),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
            }),
            _: 2 /* DYNAMIC */
          }, 1024 /* DYNAMIC_SLOTS */)];
        }),

        "pagination-info": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Hiển thị " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.pagination.from + ' - ' + $setup.pagination.to) + " của " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.pagination.total) + " bản ghi ", 1 /* TEXT */)];
        }),

        _: 2 /* DYNAMIC */
      }, [$setup.isAdmin ? {
        name: "thead",
        fn: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.columnsForAdmin, function (value, key) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_table_head_cell, {
              key: 'data-table-' + key
            }, {
              "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(value), 1 /* TEXT */)];
              }),

              _: 2 /* DYNAMIC */
            }, 1024 /* DYNAMIC_SLOTS */);
          }), 128 /* KEYED_FRAGMENT */)), $setup.isEdit ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_table_head_cell, {
            key: 0
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [_hoisted_4];
            }),
            _: 1 /* STABLE */
          })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
        })
      } : {
        name: "thead",
        fn: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.columnsFor, function (value, key) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_table_head_cell, {
              key: 'data-table-' + key
            }, {
              "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(value), 1 /* TEXT */)];
              }),

              _: 2 /* DYNAMIC */
            }, 1024 /* DYNAMIC_SLOTS */);
          }), 128 /* KEYED_FRAGMENT */)), $setup.isEdit ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_table_head_cell, {
            key: 0
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Hành động")];
            }),
            _: 1 /* STABLE */
          })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
        })
      }, !$setup.isLoading ? {
        name: "empty",
        fn: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_table_body_cell, {
            colspan: "7"
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [_hoisted_5];
            }),
            _: 1 /* STABLE */
          })];
        })
      } : undefined]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["rows", "pagination", "columns", "perPageOptions", "onLoadData"])];
    }),
    _: 1 /* STABLE */
  }), $setup.isShowModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_form_modal, {
    key: 0,
    modelValue: $setup.isShowModal,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $setup.isShowModal = $event;
    }),
    "data-form": $setup.dataForm,
    onOnSuccess: $setup.onSuccess,
    onOnClose: $setup.onClose
  }, null, 8 /* PROPS */, ["modelValue", "data-form", "onOnSuccess", "onOnClose"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.isShowModalConfig ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_config_modal, {
    key: 1,
    modelValue: $setup.isShowModalConfig,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $setup.isShowModalConfig = $event;
    }),
    "data-form": $setup.dataForm,
    onOnSuccess: $setup.onSuccess,
    onOnClose: $setup.onClose
  }, null, 8 /* PROPS */, ["modelValue", "data-form", "onOnSuccess", "onOnClose"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.isShowModalDelete ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_modal_confirm, {
    key: 2,
    modelValue: $setup.isShowModalDelete,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $setup.isShowModalDelete = $event;
    }),
    "data-form": $setup.dataForm,
    onOnSuccess: $setup.onDelete,
    onOnClose: $setup.onClose
  }, null, 8 /* PROPS */, ["modelValue", "data-form", "onOnSuccess", "onOnClose"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_preloader, {
    key: 3
  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64 /* STABLE_FRAGMENT */);
}

/***/ }),

/***/ "./resources/js/constants/labels.js":
/*!******************************************!*\
  !*** ./resources/js/constants/labels.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// import colorVariable from "../../sass/_variables.scss";

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{
  value: 'red',
  color: '#EE0033',
  description: 'vị trí cấu hình đèn đỏ'
}, {
  value: 'yellow',
  color: '#FFFF00',
  description: 'vị trí cấu hình đèn vàng'
}, {
  value: 'green',
  color: '#6FCF97',
  description: 'vị trí cấu hình đèn xanh'
}, {
  value: 'detect_plate_area',
  color: '#F2994A',
  description: 'vùng phát hiện biển số (Polygon)'
}, {
  value: 'counting_area',
  color: '#B5B4B4',
  description: 'vùng đo đếm (Polygon)'
}, {
  value: 'red_line',
  color: '#F78787',
  description: 'vạch vượt đèn đỏ (line)'
}, {
  value: 'straight_violation_line',
  color: '#34bfa3',
  description: 'hướng xác định xe đi thẳng (Polygon)'
}, {
  value: 'left_violation_line',
  color: '#409eff',
  description: 'hướng xác định xe rẽ trái (Polygon)'
}, {
  value: 'right_violation_line',
  color: '#E6A23C',
  description: 'hướng xác định xe rẽ phải (Polygon)'
}, {
  value: 'straight_lane',
  color: '#A39D2E',
  description: 'lane đi thẳng (Polygon)'
}, {
  value: 'left_lane',
  color: '#E0E0E0',
  description: 'lane rẽ trái (Polygon)'
}, {
  value: 'right_lane',
  color: '#828282',
  description: ' lane rẽ phải (Polygon)'
}, {
  value: 'straight_left_lane',
  color: '#800080',
  description: 'lane đi thẳng rẽ trái ( đi thẳng rẽ phải tương tự) (Polygon)'
}, {
  value: 'side_walk',
  color: '#E361E3',
  description: 'vùng kg phát hiện phương tiện (Polygon)'
}, {
  value: 'lane_direction',
  color: '#0d6efd',
  description: 'chiều của lane (line)'
}, {
  value: 'stop_area',
  color: '#4F4F4F',
  description: 'vùng cấm dừng đỗ (Polygon)'
}, {
  value: 'long_stop',
  color: '#f56C6C',
  description: 'thời gian cho phép dừng đỗ (Polygon)'
}, {
  value: 'over_line',
  color: '#67C23A',
  description: 'phát hiện đè vạch (Polygon)'
}]);

/***/ }),

/***/ "./resources/js/mixins/clickSelect.js":
/*!********************************************!*\
  !*** ./resources/js/mixins/clickSelect.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clickSelectMixins": () => (/* binding */ clickSelectMixins)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

function clickSelectMixins() {
  function handleClickOutside() {
    $(document).mouseup(function (e) {
      if (e.target.classList.value !== 'el-dialog__footer') {
        var selectElement = document.getElementsByClassName('el-select');
        (0,lodash__WEBPACK_IMPORTED_MODULE_0__.forEach)(selectElement, function (value, key) {
          value.classList.remove('is_focus');
        });
      }
    }.bind(this));
  }
  function clickSelect(className) {
    var selectElement = document.getElementsByClassName("".concat(className))[0];
    selectElement.classList.add('is_focus');
  }
  return {
    handleClickOutside: handleClickOutside,
    clickSelect: clickSelect
  };
}

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=style&index=0&id=e36795ac&lang=scss":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=style&index=0&id=e36795ac&lang=scss ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_13_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_13_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_13_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigModal_vue_vue_type_style_index_0_id_e36795ac_lang_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ConfigModal.vue?vue&type=style&index=0&id=e36795ac&lang=scss */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=style&index=0&id=e36795ac&lang=scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_13_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_13_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_13_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigModal_vue_vue_type_style_index_0_id_e36795ac_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_13_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_13_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_13_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigModal_vue_vue_type_style_index_0_id_e36795ac_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/vue-drawing-canvas/dist/vue-drawing-canvas.esm.js":
/*!************************************************************************!*\
  !*** ./node_modules/vue-drawing-canvas/dist/vue-drawing-canvas.esm.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VueDrawingCanvas)
/* harmony export */ });
/* harmony import */ var vue_demi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-demi */ "./node_modules/vue-drawing-canvas/node_modules/vue-demi/lib/index.mjs");


/* eslint-disable no-debugger, no-console */
var VueDrawingCanvas = /*#__PURE__*/(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'VueDrawingCanvas',
  props: {
    strokeType: {
      type: String,
      validator: value => {
        return ['dash', 'line', 'square', 'circle', 'triangle', 'half_triangle'].indexOf(value) !== -1;
      },
      default: () => 'dash'
    },
    fillShape: {
      type: Boolean,
      default: () => false
    },
    width: {
      type: [String, Number],
      default: () => 600
    },
    height: {
      type: [String, Number],
      default: () => 400
    },
    image: {
      type: String,
      default: () => ''
    },
    eraser: {
      type: Boolean,
      default: () => false
    },
    color: {
      type: String,
      default: () => '#000000'
    },
    lineWidth: {
      type: Number,
      default: () => 5
    },
    lineCap: {
      type: String,
      validator: value => {
        return ['round', 'square', 'butt'].indexOf(value) !== -1;
      },
      default: () => 'round'
    },
    lineJoin: {
      type: String,
      validator: value => {
        return ['miter', 'round', 'bevel'].indexOf(value) !== -1;
      },
      default: () => 'miter'
    },
    lock: {
      type: Boolean,
      default: () => false
    },
    styles: {
      type: [Array, String, Object]
    },
    classes: {
      type: [Array, String, Object]
    },
    backgroundColor: {
      type: String,
      default: () => '#FFFFFF'
    },
    backgroundImage: {
      type: String,
      default: () => null
    },
    watermark: {
      type: Object,
      default: () => null
    },
    saveAs: {
      type: String,
      validator: value => {
        return ['jpeg', 'png'].indexOf(value) !== -1;
      },
      default: () => 'png'
    },
    canvasId: {
      type: String,
      default: () => 'VueDrawingCanvas'
    },
    initialImage: {
      type: Array,
      default: () => []
    },
    additionalImages: {
      type: Array,
      default: () => []
    },
    outputWidth: {
      type: Number
    },
    outputHeight: {
      type: Number
    }
  },

  data() {
    return {
      loadedImage: null,
      drawing: false,
      context: null,
      images: [],
      strokes: {
        type: '',
        from: {
          x: 0,
          y: 0
        },
        coordinates: [],
        color: '',
        width: '',
        fill: false,
        lineCap: '',
        lineJoin: ''
      },
      guides: [],
      trash: []
    };
  },

  mounted() {
    this.setContext();
    this.$nextTick(() => {
      this.drawInitialImage();
      this.drawAdditionalImages();
    });
  },

  watch: {
    backgroundImage: function () {
      this.loadedImage = null;
    }
  },
  methods: {
    async setContext() {
      let canvas = document.querySelector('#' + this.canvasId);
      this.context = this.context ? this.context : canvas.getContext('2d');
      await this.setBackground();
    },

    drawInitialImage() {
      if (this.initialImage && this.initialImage.length > 0) {
        // @ts-ignore
        this.images = [].concat(this.images, this.initialImage);
        this.redraw(true);
      }
    },

    drawAdditionalImages() {
      if (this.additionalImages && this.additionalImages.length > 0) {
        let canvas = document.querySelector('#' + this.canvasId);
        this.additionalImages.forEach(watermarkObject => {
          this.drawWatermark(canvas, this.context, watermarkObject);
        });
      }
    },

    clear() {
      this.context.clearRect(0, 0, Number(this.width), Number(this.height));
    },

    async setBackground() {
      this.clear();
      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(0, 0, Number(this.width), Number(this.height));
      await this.$nextTick(async () => {
        await this.drawBackgroundImage();
      });
      this.save();
    },

    async drawBackgroundImage() {
      if (!this.loadedImage) {
        return new Promise(resolve => {
          if (!this.backgroundImage) {
            resolve();
            return;
          }

          const image = new Image();
          image.src = this.backgroundImage;

          image.onload = () => {
            this.context.drawImage(image, 0, 0, Number(this.width), Number(this.height));
            this.loadedImage = image;
            resolve();
          };
        });
      } else {
        this.context.drawImage(this.loadedImage, 0, 0, Number(this.width), Number(this.height));
      }
    },

    getCoordinates(event) {
      let x, y;

      if (event.touches && event.touches.length > 0) {
        let canvas = document.querySelector('#' + this.canvasId);
        let rect = canvas.getBoundingClientRect();
        x = event.touches[0].clientX - rect.left;
        y = event.touches[0].clientY - rect.top;
      } else {
        x = event.offsetX;
        y = event.offsetY;
      }

      return {
        x: x,
        y: y
      };
    },

    startDraw(event) {
      if (!this.lock) {
        this.drawing = true;
        let coordinate = this.getCoordinates(event);
        this.strokes = {
          type: this.eraser ? 'eraser' : this.strokeType,
          from: coordinate,
          coordinates: [],
          color: this.eraser ? this.backgroundColor : this.color,
          width: this.lineWidth,
          fill: this.eraser || this.strokeType === 'dash' || this.strokeType === 'line' ? false : this.fillShape,
          lineCap: this.lineCap,
          lineJoin: this.lineJoin
        };
        this.guides = [];
      }
    },

    draw(event) {
      if (this.drawing) {
        if (!this.context) {
          this.setContext();
        }

        let coordinate = this.getCoordinates(event);

        if (this.eraser || this.strokeType === 'dash') {
          this.strokes.coordinates.push(coordinate);
          this.drawShape(this.context, this.strokes, false);
        } else {
          switch (this.strokeType) {
            case 'line':
              this.guides = [{
                x: coordinate.x,
                y: coordinate.y
              }];
              break;

            case 'square':
              this.guides = [{
                x: coordinate.x,
                y: this.strokes.from.y
              }, {
                x: coordinate.x,
                y: coordinate.y
              }, {
                x: this.strokes.from.x,
                y: coordinate.y
              }, {
                x: this.strokes.from.x,
                y: this.strokes.from.y
              }];
              break;

            case 'triangle':
              let center = Math.floor((coordinate.x - this.strokes.from.x) / 2) < 0 ? Math.floor((coordinate.x - this.strokes.from.x) / 2) * -1 : Math.floor((coordinate.x - this.strokes.from.x) / 2);
              let width = this.strokes.from.x < coordinate.x ? this.strokes.from.x + center : this.strokes.from.x - center;
              this.guides = [{
                x: coordinate.x,
                y: this.strokes.from.y
              }, {
                x: width,
                y: coordinate.y
              }, {
                x: this.strokes.from.x,
                y: this.strokes.from.y
              }];
              break;

            case 'half_triangle':
              this.guides = [{
                x: coordinate.x,
                y: this.strokes.from.y
              }, {
                x: this.strokes.from.x,
                y: coordinate.y
              }, {
                x: this.strokes.from.x,
                y: this.strokes.from.y
              }];
              break;

            case 'circle':
              let radiusX = this.strokes.from.x - coordinate.x < 0 ? (this.strokes.from.x - coordinate.x) * -1 : this.strokes.from.x - coordinate.x;
              this.guides = [{
                x: this.strokes.from.x > coordinate.x ? this.strokes.from.x - radiusX : this.strokes.from.x + radiusX,
                y: this.strokes.from.y
              }, {
                x: radiusX,
                y: radiusX
              }];
              break;
          }

          this.drawGuide(true);
        }
      }
    },

    drawGuide(closingPath) {
      this.redraw(true);
      this.$nextTick(() => {
        this.context.strokeStyle = this.color;
        this.context.lineWidth = 1;
        this.context.lineJoin = this.lineJoin;
        this.context.lineCap = this.lineCap;
        this.context.beginPath();
        this.context.setLineDash([15, 15]);

        if (this.strokes.type === 'circle') {
          this.context.ellipse(this.guides[0].x, this.guides[0].y, this.guides[1].x, this.guides[1].y, 0, 0, Math.PI * 2);
        } else {
          this.context.moveTo(this.strokes.from.x, this.strokes.from.y);
          this.guides.forEach(coordinate => {
            this.context.lineTo(coordinate.x, coordinate.y);
          });

          if (closingPath) {
            this.context.closePath();
          }
        }

        this.context.stroke();
      });
    },

    drawShape(context, strokes, closingPath) {
      context.strokeStyle = strokes.color;
      context.fillStyle = strokes.color;
      context.lineWidth = strokes.width;
      context.lineJoin = strokes.lineJoin === undefined ? this.lineJoin : strokes.lineJoin;
      context.lineCap = strokes.lineCap === undefined ? this.lineCap : strokes.lineCap;
      context.beginPath();
      context.setLineDash([]);

      if (strokes.type === 'circle') {
        context.ellipse(strokes.coordinates[0].x, strokes.coordinates[0].y, strokes.coordinates[1].x, strokes.coordinates[1].y, 0, 0, Math.PI * 2);
      } else {
        context.moveTo(strokes.from.x, strokes.from.y);
        strokes.coordinates.forEach(stroke => {
          context.lineTo(stroke.x, stroke.y);
        });

        if (closingPath) {
          context.closePath();
        }
      }

      if (strokes.fill) {
        context.fill();
      } else {
        context.stroke();
      }
    },

    stopDraw() {
      if (this.drawing) {
        this.strokes.coordinates = this.guides.length > 0 ? this.guides : this.strokes.coordinates;
        this.images.push(this.strokes);
        this.redraw(true);
        this.drawing = false;
        this.trash = [];
      }
    },

    reset() {
      if (!this.lock) {
        this.images = [];
        this.strokes = {
          type: '',
          coordinates: [],
          color: '',
          width: '',
          fill: false,
          lineCap: '',
          lineJoin: ''
        };
        this.guides = [];
        this.trash = [];
        this.redraw(true);
      }
    },

    undo() {
      if (!this.lock) {
        let strokes = this.images.pop();

        if (strokes) {
          this.trash.push(strokes);
          this.redraw(true);
        }
      }
    },

    redo() {
      if (!this.lock) {
        let strokes = this.trash.pop();

        if (strokes) {
          this.images.push(strokes);
          this.redraw(true);
        }
      }
    },

    async redraw(output) {
      output = typeof output !== 'undefined' ? output : true;
      await this.setBackground().then(() => {
        this.drawAdditionalImages();
      }).then(() => {
        let baseCanvas = document.createElement('canvas');
        let baseCanvasContext = baseCanvas.getContext('2d');
        baseCanvas.width = Number(this.width);
        baseCanvas.height = Number(this.height);

        if (baseCanvasContext) {
          this.images.forEach(stroke => {
            if (baseCanvasContext) {
              baseCanvasContext.globalCompositeOperation = stroke.type === 'eraser' ? 'destination-out' : 'source-over';

              if (stroke.type !== 'circle' || stroke.type === 'circle' && stroke.coordinates.length > 0) {
                this.drawShape(baseCanvasContext, stroke, stroke.type === 'eraser' || stroke.type === 'dash' || stroke.type === 'line' ? false : true);
              }
            }
          });
          this.context.drawImage(baseCanvas, 0, 0, Number(this.width), Number(this.height));
        }
      }).then(() => {
        if (output) {
          this.save();
        }
      });
    },

    wrapText(context, text, x, y, maxWidth, lineHeight) {
      const newLineRegex = /(\r\n|\n\r|\n|\r)+/g;
      const whitespaceRegex = /\s+/g;
      var lines = text.split(newLineRegex).filter(word => word.length > 0);

      for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
        var words = lines[lineNumber].split(whitespaceRegex).filter(word => word.length > 0);
        var line = '';

        for (var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;

          if (testWidth > maxWidth && n > 0) {
            if (this.watermark && this.watermark.fontStyle && this.watermark.fontStyle.drawType && this.watermark.fontStyle.drawType === 'stroke') {
              context.strokeText(line, x, y);
            } else {
              context.fillText(line, x, y);
            }

            line = words[n] + ' ';
            y += lineHeight;
          } else {
            line = testLine;
          }
        }

        if (this.watermark && this.watermark.fontStyle && this.watermark.fontStyle.drawType && this.watermark.fontStyle.drawType === 'stroke') {
          context.strokeText(line, x, y);
        } else {
          context.fillText(line, x, y);
        }

        y += words.length > 0 ? lineHeight : 0;
      }
    },

    save() {
      let canvas = document.querySelector('#' + this.canvasId);

      if (this.watermark) {
        let temp = document.createElement('canvas');
        let ctx = temp.getContext('2d');

        if (ctx) {
          temp.width = Number(this.width);
          temp.height = Number(this.height);
          ctx.drawImage(canvas, 0, 0, Number(this.width), Number(this.height));
          this.drawWatermark(temp, ctx, this.watermark);
        }
      } else {
        let temp = document.createElement('canvas');
        let tempCtx = temp.getContext('2d');
        let tempWidth = this.outputWidth === undefined ? this.width : this.outputWidth;
        let tempHeight = this.outputHeight === undefined ? this.height : this.outputHeight;
        temp.width = Number(tempWidth);
        temp.height = Number(tempHeight);

        if (tempCtx) {
          tempCtx.drawImage(canvas, 0, 0, Number(tempWidth), Number(tempHeight));
          this.$emit('update:image', temp.toDataURL('image/' + this.saveAs, 1));
          return temp.toDataURL('image/' + this.saveAs, 1);
        }
      }
    },

    drawWatermark(canvas, ctx, watermark) {
      if (watermark.type === 'Image') {
        let imageWidth = watermark.imageStyle ? watermark.imageStyle.width ? watermark.imageStyle.width : Number(this.width) : Number(this.width);
        let imageHeight = watermark.imageStyle ? watermark.imageStyle.height ? watermark.imageStyle.height : Number(this.height) : Number(this.height);
        const image = new Image();
        image.src = watermark.source;

        image.onload = () => {
          if (watermark && ctx) {
            ctx.drawImage(image, watermark.x, watermark.y, Number(imageWidth), Number(imageHeight));
          }

          let temp = document.createElement('canvas');
          let tempCtx = temp.getContext('2d');
          let tempWidth = this.outputWidth === undefined ? this.width : this.outputWidth;
          let tempHeight = this.outputHeight === undefined ? this.height : this.outputHeight;
          temp.width = Number(tempWidth);
          temp.height = Number(tempHeight);

          if (tempCtx) {
            tempCtx.drawImage(canvas, 0, 0, Number(tempWidth), Number(tempHeight));
            this.$emit('update:image', temp.toDataURL('image/' + this.saveAs, 1));
            return temp.toDataURL('image/' + this.saveAs, 1);
          }
        };
      } else if (watermark.type === 'Text') {
        let font = watermark.fontStyle ? watermark.fontStyle.font ? watermark.fontStyle.font : '20px serif' : '20px serif';
        let align = watermark.fontStyle ? watermark.fontStyle.textAlign ? watermark.fontStyle.textAlign : 'start' : 'start';
        let baseline = watermark.fontStyle ? watermark.fontStyle.textBaseline ? watermark.fontStyle.textBaseline : 'alphabetic' : 'alphabetic';
        let color = watermark.fontStyle ? watermark.fontStyle.color ? watermark.fontStyle.color : '#000000' : '#000000';
        ctx.font = font;
        ctx.textAlign = align;
        ctx.textBaseline = baseline;

        if (watermark.fontStyle && watermark.fontStyle.rotate) {
          let centerX, centerY;

          if (watermark.fontStyle && watermark.fontStyle.width) {
            centerX = watermark.x + Math.floor(watermark.fontStyle.width / 2);
          } else {
            centerX = watermark.x;
          }

          if (watermark.fontStyle && watermark.fontStyle.lineHeight) {
            centerY = watermark.y + Math.floor(watermark.fontStyle.lineHeight / 2);
          } else {
            centerY = watermark.y;
          }

          ctx.translate(centerX, centerY);
          ctx.rotate(watermark.fontStyle.rotate * Math.PI / 180);
          ctx.translate(centerX * -1, centerY * -1);
        }

        if (watermark.fontStyle && watermark.fontStyle.drawType && watermark.fontStyle.drawType === 'stroke') {
          ctx.strokeStyle = watermark.fontStyle.color;

          if (watermark.fontStyle && watermark.fontStyle.width) {
            this.wrapText(ctx, watermark.source, watermark.x, watermark.y, watermark.fontStyle.width, watermark.fontStyle.lineHeight);
          } else {
            ctx.strokeText(watermark.source, watermark.x, watermark.y);
          }
        } else {
          ctx.fillStyle = color;

          if (watermark.fontStyle && watermark.fontStyle.width) {
            this.wrapText(ctx, watermark.source, watermark.x, watermark.y, watermark.fontStyle.width, watermark.fontStyle.lineHeight);
          } else {
            ctx.fillText(watermark.source, watermark.x, watermark.y);
          }
        }

        let temp = document.createElement('canvas');
        let tempCtx = temp.getContext('2d');
        let tempWidth = this.outputWidth === undefined ? this.width : this.outputWidth;
        let tempHeight = this.outputHeight === undefined ? this.height : this.outputHeight;
        temp.width = Number(tempWidth);
        temp.height = Number(tempHeight);

        if (tempCtx) {
          tempCtx.drawImage(canvas, 0, 0, Number(tempWidth), Number(tempHeight));
          this.$emit('update:image', temp.toDataURL('image/' + this.saveAs, 1));
          return temp.toDataURL('image/' + this.saveAs, 1);
        }
      }
    },

    isEmpty() {
      return this.images.length > 0 ? false : true;
    },

    getAllStrokes() {
      return this.images;
    }

  },

  render() {
    if (vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2) {
      return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.h)('canvas', {
        attrs: {
          id: this.canvasId,
          width: Number(this.width),
          height: Number(this.height)
        },
        style: {
          'touchAction': 'none',
          // @ts-ignore
          ...this.styles
        },
        class: this.classes,
        on: {
          mousedown: event => this.startDraw(event),
          mousemove: event => this.draw(event),
          mouseup: () => this.stopDraw(),
          mouseleave: () => this.stopDraw(),
          touchstart: event => this.startDraw(event),
          touchmove: event => this.draw(event),
          touchend: () => this.stopDraw(),
          touchleave: () => this.stopDraw(),
          touchcancel: () => this.stopDraw(),
          pointerdown: event => this.startDraw(event),
          pointermove: event => this.draw(event),
          pointerup: () => this.stopDraw(),
          pointerleave: () => this.stopDraw(),
          pointercancel: () => this.stopDraw()
        },
        ...this.$props
      });
    }

    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.h)('canvas', {
      id: this.canvasId,
      height: Number(this.height),
      width: Number(this.width),
      style: {
        'touchAction': 'none',
        // @ts-ignore
        ...this.styles
      },
      class: this.classes,
      onMousedown: $event => this.startDraw($event),
      onMousemove: $event => this.draw($event),
      onMouseup: () => this.stopDraw(),
      onMouseleave: () => this.stopDraw(),
      onTouchstart: $event => this.startDraw($event),
      onTouchmove: $event => this.draw($event),
      onTouchend: () => this.stopDraw(),
      onTouchleave: () => this.stopDraw(),
      onTouchcancel: () => this.stopDraw(),
      onPointerdown: $event => this.startDraw($event),
      onPointermove: $event => this.draw($event),
      onPointerup: () => this.stopDraw(),
      onPointerleave: () => this.stopDraw(),
      onPointercancel: () => this.stopDraw()
    });
  }

});




/***/ }),

/***/ "./resources/js/pages/camera/ConfigModal.vue":
/*!***************************************************!*\
  !*** ./resources/js/pages/camera/ConfigModal.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ConfigModal_vue_vue_type_template_id_e36795ac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfigModal.vue?vue&type=template&id=e36795ac */ "./resources/js/pages/camera/ConfigModal.vue?vue&type=template&id=e36795ac");
/* harmony import */ var _ConfigModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfigModal.vue?vue&type=script&lang=js */ "./resources/js/pages/camera/ConfigModal.vue?vue&type=script&lang=js");
/* harmony import */ var _ConfigModal_vue_vue_type_style_index_0_id_e36795ac_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfigModal.vue?vue&type=style&index=0&id=e36795ac&lang=scss */ "./resources/js/pages/camera/ConfigModal.vue?vue&type=style&index=0&id=e36795ac&lang=scss");
/* harmony import */ var _home_anhpt_Sites_cybervision_utvm_new_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_home_anhpt_Sites_cybervision_utvm_new_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ConfigModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ConfigModal_vue_vue_type_template_id_e36795ac__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/pages/camera/ConfigModal.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/pages/camera/FormModal.vue":
/*!*************************************************!*\
  !*** ./resources/js/pages/camera/FormModal.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FormModal_vue_vue_type_template_id_464973a8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormModal.vue?vue&type=template&id=464973a8 */ "./resources/js/pages/camera/FormModal.vue?vue&type=template&id=464973a8");
/* harmony import */ var _FormModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormModal.vue?vue&type=script&lang=js */ "./resources/js/pages/camera/FormModal.vue?vue&type=script&lang=js");
/* harmony import */ var _home_anhpt_Sites_cybervision_utvm_new_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_anhpt_Sites_cybervision_utvm_new_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_FormModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_FormModal_vue_vue_type_template_id_464973a8__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/pages/camera/FormModal.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/pages/camera/List.vue":
/*!********************************************!*\
  !*** ./resources/js/pages/camera/List.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _List_vue_vue_type_template_id_6f1fbe8f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./List.vue?vue&type=template&id=6f1fbe8f */ "./resources/js/pages/camera/List.vue?vue&type=template&id=6f1fbe8f");
/* harmony import */ var _List_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./List.vue?vue&type=script&lang=js */ "./resources/js/pages/camera/List.vue?vue&type=script&lang=js");
/* harmony import */ var _home_anhpt_Sites_cybervision_utvm_new_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_anhpt_Sites_cybervision_utvm_new_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_List_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_List_vue_vue_type_template_id_6f1fbe8f__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/pages/camera/List.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/pages/camera/ConfigModal.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/pages/camera/ConfigModal.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ConfigModal.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/pages/camera/FormModal.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./resources/js/pages/camera/FormModal.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FormModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FormModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FormModal.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/FormModal.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/pages/camera/List.vue?vue&type=script&lang=js":
/*!********************************************************************!*\
  !*** ./resources/js/pages/camera/List.vue?vue&type=script&lang=js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_List_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_List_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./List.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/List.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/pages/camera/ConfigModal.vue?vue&type=template&id=e36795ac":
/*!*********************************************************************************!*\
  !*** ./resources/js/pages/camera/ConfigModal.vue?vue&type=template&id=e36795ac ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigModal_vue_vue_type_template_id_e36795ac__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigModal_vue_vue_type_template_id_e36795ac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ConfigModal.vue?vue&type=template&id=e36795ac */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=template&id=e36795ac");


/***/ }),

/***/ "./resources/js/pages/camera/FormModal.vue?vue&type=template&id=464973a8":
/*!*******************************************************************************!*\
  !*** ./resources/js/pages/camera/FormModal.vue?vue&type=template&id=464973a8 ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FormModal_vue_vue_type_template_id_464973a8__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FormModal_vue_vue_type_template_id_464973a8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FormModal.vue?vue&type=template&id=464973a8 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/FormModal.vue?vue&type=template&id=464973a8");


/***/ }),

/***/ "./resources/js/pages/camera/List.vue?vue&type=template&id=6f1fbe8f":
/*!**************************************************************************!*\
  !*** ./resources/js/pages/camera/List.vue?vue&type=template&id=6f1fbe8f ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_List_vue_vue_type_template_id_6f1fbe8f__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_List_vue_vue_type_template_id_6f1fbe8f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./List.vue?vue&type=template&id=6f1fbe8f */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/List.vue?vue&type=template&id=6f1fbe8f");


/***/ }),

/***/ "./resources/js/pages/camera/ConfigModal.vue?vue&type=style&index=0&id=e36795ac&lang=scss":
/*!************************************************************************************************!*\
  !*** ./resources/js/pages/camera/ConfigModal.vue?vue&type=style&index=0&id=e36795ac&lang=scss ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_13_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_13_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_13_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigModal_vue_vue_type_style_index_0_id_e36795ac_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ConfigModal.vue?vue&type=style&index=0&id=e36795ac&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=style&index=0&id=e36795ac&lang=scss");


/***/ }),

/***/ "./resources/js/pages/camera sync recursive ^.*$":
/*!**********************************************!*\
  !*** ./resources/js/pages/camera/ sync ^.*$ ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ConfigModal": "./resources/js/pages/camera/ConfigModal.vue",
	"./ConfigModal.vue": "./resources/js/pages/camera/ConfigModal.vue",
	"./FormModal": "./resources/js/pages/camera/FormModal.vue",
	"./FormModal.vue": "./resources/js/pages/camera/FormModal.vue",
	"./List": "./resources/js/pages/camera/List.vue",
	"./List.vue": "./resources/js/pages/camera/List.vue"
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
webpackContext.id = "./resources/js/pages/camera sync recursive ^.*$";

/***/ }),

/***/ "./node_modules/vue-drawing-canvas/node_modules/vue-demi/lib/index.mjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/vue-drawing-canvas/node_modules/vue-demi/lib/index.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseTransition": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.BaseTransition),
/* harmony export */   "Comment": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.Comment),
/* harmony export */   "EffectScope": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.EffectScope),
/* harmony export */   "Fragment": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.Fragment),
/* harmony export */   "KeepAlive": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.KeepAlive),
/* harmony export */   "ReactiveEffect": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.ReactiveEffect),
/* harmony export */   "Static": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.Static),
/* harmony export */   "Suspense": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.Suspense),
/* harmony export */   "Teleport": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.Teleport),
/* harmony export */   "Text": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.Text),
/* harmony export */   "Transition": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.Transition),
/* harmony export */   "TransitionGroup": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.TransitionGroup),
/* harmony export */   "Vue": () => (/* reexport module object */ vue__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "Vue2": () => (/* binding */ Vue2),
/* harmony export */   "VueElement": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.VueElement),
/* harmony export */   "callWithAsyncErrorHandling": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.callWithAsyncErrorHandling),
/* harmony export */   "callWithErrorHandling": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.callWithErrorHandling),
/* harmony export */   "camelize": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.camelize),
/* harmony export */   "capitalize": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.capitalize),
/* harmony export */   "cloneVNode": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.cloneVNode),
/* harmony export */   "compatUtils": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.compatUtils),
/* harmony export */   "compile": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.compile),
/* harmony export */   "computed": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.computed),
/* harmony export */   "createApp": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createApp),
/* harmony export */   "createBlock": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createBlock),
/* harmony export */   "createCommentVNode": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode),
/* harmony export */   "createElementBlock": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock),
/* harmony export */   "createElementVNode": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode),
/* harmony export */   "createHydrationRenderer": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createHydrationRenderer),
/* harmony export */   "createPropsRestProxy": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createPropsRestProxy),
/* harmony export */   "createRenderer": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createRenderer),
/* harmony export */   "createSSRApp": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createSSRApp),
/* harmony export */   "createSlots": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createSlots),
/* harmony export */   "createStaticVNode": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode),
/* harmony export */   "createTextVNode": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode),
/* harmony export */   "createVNode": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createVNode),
/* harmony export */   "customRef": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.customRef),
/* harmony export */   "defineAsyncComponent": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.defineAsyncComponent),
/* harmony export */   "defineComponent": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent),
/* harmony export */   "defineCustomElement": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.defineCustomElement),
/* harmony export */   "defineEmits": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.defineEmits),
/* harmony export */   "defineExpose": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.defineExpose),
/* harmony export */   "defineProps": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.defineProps),
/* harmony export */   "defineSSRCustomElement": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.defineSSRCustomElement),
/* harmony export */   "del": () => (/* binding */ del),
/* harmony export */   "devtools": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.devtools),
/* harmony export */   "effect": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.effect),
/* harmony export */   "effectScope": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.effectScope),
/* harmony export */   "getCurrentInstance": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance),
/* harmony export */   "getCurrentScope": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope),
/* harmony export */   "getTransitionRawChildren": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.getTransitionRawChildren),
/* harmony export */   "guardReactiveProps": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.guardReactiveProps),
/* harmony export */   "h": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.h),
/* harmony export */   "handleError": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.handleError),
/* harmony export */   "hydrate": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.hydrate),
/* harmony export */   "initCustomFormatter": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.initCustomFormatter),
/* harmony export */   "initDirectivesForSSR": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.initDirectivesForSSR),
/* harmony export */   "inject": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.inject),
/* harmony export */   "install": () => (/* binding */ install),
/* harmony export */   "isMemoSame": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isMemoSame),
/* harmony export */   "isProxy": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isProxy),
/* harmony export */   "isReactive": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isReactive),
/* harmony export */   "isReadonly": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isReadonly),
/* harmony export */   "isRef": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isRef),
/* harmony export */   "isRuntimeOnly": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isRuntimeOnly),
/* harmony export */   "isShallow": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isShallow),
/* harmony export */   "isVNode": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isVNode),
/* harmony export */   "isVue2": () => (/* binding */ isVue2),
/* harmony export */   "isVue3": () => (/* binding */ isVue3),
/* harmony export */   "markRaw": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.markRaw),
/* harmony export */   "mergeDefaults": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.mergeDefaults),
/* harmony export */   "mergeProps": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps),
/* harmony export */   "nextTick": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.nextTick),
/* harmony export */   "normalizeClass": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass),
/* harmony export */   "normalizeProps": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.normalizeProps),
/* harmony export */   "normalizeStyle": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle),
/* harmony export */   "onActivated": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onActivated),
/* harmony export */   "onBeforeMount": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeMount),
/* harmony export */   "onBeforeUnmount": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount),
/* harmony export */   "onBeforeUpdate": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUpdate),
/* harmony export */   "onDeactivated": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onDeactivated),
/* harmony export */   "onErrorCaptured": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onErrorCaptured),
/* harmony export */   "onMounted": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onMounted),
/* harmony export */   "onRenderTracked": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onRenderTracked),
/* harmony export */   "onRenderTriggered": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onRenderTriggered),
/* harmony export */   "onScopeDispose": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onScopeDispose),
/* harmony export */   "onServerPrefetch": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onServerPrefetch),
/* harmony export */   "onUnmounted": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted),
/* harmony export */   "onUpdated": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onUpdated),
/* harmony export */   "openBlock": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.openBlock),
/* harmony export */   "popScopeId": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.popScopeId),
/* harmony export */   "provide": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.provide),
/* harmony export */   "proxyRefs": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.proxyRefs),
/* harmony export */   "pushScopeId": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.pushScopeId),
/* harmony export */   "queuePostFlushCb": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.queuePostFlushCb),
/* harmony export */   "reactive": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.reactive),
/* harmony export */   "readonly": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.readonly),
/* harmony export */   "ref": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.ref),
/* harmony export */   "registerRuntimeCompiler": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.registerRuntimeCompiler),
/* harmony export */   "render": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "renderList": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.renderList),
/* harmony export */   "renderSlot": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot),
/* harmony export */   "resolveComponent": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent),
/* harmony export */   "resolveDirective": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.resolveDirective),
/* harmony export */   "resolveDynamicComponent": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.resolveDynamicComponent),
/* harmony export */   "resolveFilter": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.resolveFilter),
/* harmony export */   "resolveTransitionHooks": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.resolveTransitionHooks),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "setBlockTracking": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.setBlockTracking),
/* harmony export */   "setDevtoolsHook": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.setDevtoolsHook),
/* harmony export */   "setTransitionHooks": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.setTransitionHooks),
/* harmony export */   "shallowReactive": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.shallowReactive),
/* harmony export */   "shallowReadonly": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly),
/* harmony export */   "shallowRef": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.shallowRef),
/* harmony export */   "ssrContextKey": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.ssrContextKey),
/* harmony export */   "ssrUtils": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.ssrUtils),
/* harmony export */   "stop": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.stop),
/* harmony export */   "toDisplayString": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString),
/* harmony export */   "toHandlerKey": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.toHandlerKey),
/* harmony export */   "toHandlers": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.toHandlers),
/* harmony export */   "toRaw": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.toRaw),
/* harmony export */   "toRef": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.toRef),
/* harmony export */   "toRefs": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.toRefs),
/* harmony export */   "transformVNodeArgs": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.transformVNodeArgs),
/* harmony export */   "triggerRef": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.triggerRef),
/* harmony export */   "unref": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.unref),
/* harmony export */   "useAttrs": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.useAttrs),
/* harmony export */   "useCssModule": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.useCssModule),
/* harmony export */   "useCssVars": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.useCssVars),
/* harmony export */   "useSSRContext": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.useSSRContext),
/* harmony export */   "useSlots": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.useSlots),
/* harmony export */   "useTransitionState": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.useTransitionState),
/* harmony export */   "vModelCheckbox": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox),
/* harmony export */   "vModelDynamic": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.vModelDynamic),
/* harmony export */   "vModelRadio": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio),
/* harmony export */   "vModelSelect": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect),
/* harmony export */   "vModelText": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.vModelText),
/* harmony export */   "vShow": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.vShow),
/* harmony export */   "version": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.version),
/* harmony export */   "warn": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.warn),
/* harmony export */   "watch": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.watch),
/* harmony export */   "watchEffect": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.watchEffect),
/* harmony export */   "watchPostEffect": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.watchPostEffect),
/* harmony export */   "watchSyncEffect": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.watchSyncEffect),
/* harmony export */   "withAsyncContext": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.withAsyncContext),
/* harmony export */   "withCtx": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.withCtx),
/* harmony export */   "withDefaults": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.withDefaults),
/* harmony export */   "withDirectives": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives),
/* harmony export */   "withKeys": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.withKeys),
/* harmony export */   "withMemo": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.withMemo),
/* harmony export */   "withModifiers": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers),
/* harmony export */   "withScopeId": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.withScopeId)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


var isVue2 = false
var isVue3 = true
var Vue2 = undefined

function install() {}

function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  target[key] = val
  return val
}

function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1)
    return
  }
  delete target[key]
}





/***/ })

}]);