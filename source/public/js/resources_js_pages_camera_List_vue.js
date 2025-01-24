"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_camera_List_vue"],{

/***/ "./node_modules/@vuelidate/core/dist/index.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/@vuelidate/core/dist/index.esm.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".dark--bg {\n  background-color: #222222 !important;\n}\n.dark--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.dark--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.dark--text {\n  color: #222222 !important;\n}\n.dark--hover:hover {\n  transition: 10ms;\n  background-color: #555555 !important;\n  border: #555555 !important;\n  cursor: pointer;\n}\n.dark--text--hover:hover {\n  color: #555555 !important;\n  cursor: pointer;\n}\n.dark--border {\n  border: 1px solid #222222 !important;\n  border-radius: 4px;\n}\n.dark--border--hover:hover {\n  border: 1px solid #222222 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.dark_lighten--bg {\n  background-color: #373737 !important;\n}\n.dark_lighten--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.dark_lighten--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.dark_lighten--text {\n  color: #373737 !important;\n}\n.dark_lighten--hover:hover {\n  transition: 10ms;\n  background-color: #6a6a6a !important;\n  border: #6a6a6a !important;\n  cursor: pointer;\n}\n.dark_lighten--text--hover:hover {\n  color: #6a6a6a !important;\n  cursor: pointer;\n}\n.dark_lighten--border {\n  border: 1px solid #373737 !important;\n  border-radius: 4px;\n}\n.dark_lighten--border--hover:hover {\n  border: 1px solid #373737 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.dark_lighten_2--bg {\n  background-color: #4F4F4F !important;\n}\n.dark_lighten_2--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.dark_lighten_2--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.dark_lighten_2--text {\n  color: #4F4F4F !important;\n}\n.dark_lighten_2--hover:hover {\n  transition: 10ms;\n  background-color: #828282 !important;\n  border: #828282 !important;\n  cursor: pointer;\n}\n.dark_lighten_2--text--hover:hover {\n  color: #828282 !important;\n  cursor: pointer;\n}\n.dark_lighten_2--border {\n  border: 1px solid #4F4F4F !important;\n  border-radius: 4px;\n}\n.dark_lighten_2--border--hover:hover {\n  border: 1px solid #4F4F4F !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.dark_lighten_3--bg {\n  background-color: #353535 !important;\n}\n.dark_lighten_3--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.dark_lighten_3--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.dark_lighten_3--text {\n  color: #353535 !important;\n}\n.dark_lighten_3--hover:hover {\n  transition: 10ms;\n  background-color: #686868 !important;\n  border: #686868 !important;\n  cursor: pointer;\n}\n.dark_lighten_3--text--hover:hover {\n  color: #686868 !important;\n  cursor: pointer;\n}\n.dark_lighten_3--border {\n  border: 1px solid #353535 !important;\n  border-radius: 4px;\n}\n.dark_lighten_3--border--hover:hover {\n  border: 1px solid #353535 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.blue--bg {\n  background-color: #0d6efd !important;\n}\n.blue--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.blue--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.blue--text {\n  color: #0d6efd !important;\n}\n.blue--hover:hover {\n  transition: 10ms;\n  background-color: #72abfe !important;\n  border: #72abfe !important;\n  cursor: pointer;\n}\n.blue--text--hover:hover {\n  color: #72abfe !important;\n  cursor: pointer;\n}\n.blue--border {\n  border: 1px solid #0d6efd !important;\n  border-radius: 4px;\n}\n.blue--border--hover:hover {\n  border: 1px solid #0d6efd !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.blue_darken--bg {\n  background-color: #4359F0 !important;\n}\n.blue_darken--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.blue_darken--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.blue_darken--text {\n  color: #4359F0 !important;\n}\n.blue_darken--hover:hover {\n  transition: 10ms;\n  background-color: #a1acf8 !important;\n  border: #a1acf8 !important;\n  cursor: pointer;\n}\n.blue_darken--text--hover:hover {\n  color: #a1acf8 !important;\n  cursor: pointer;\n}\n.blue_darken--border {\n  border: 1px solid #4359F0 !important;\n  border-radius: 4px;\n}\n.blue_darken--border--hover:hover {\n  border: 1px solid #4359F0 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.blue_lighten--bg {\n  background-color: #409eff !important;\n}\n.blue_lighten--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.blue_lighten--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.blue_lighten--text {\n  color: #409eff !important;\n}\n.blue_lighten--hover:hover {\n  transition: 10ms;\n  background-color: #a6d2ff !important;\n  border: #a6d2ff !important;\n  cursor: pointer;\n}\n.blue_lighten--text--hover:hover {\n  color: #a6d2ff !important;\n  cursor: pointer;\n}\n.blue_lighten--border {\n  border: 1px solid #409eff !important;\n  border-radius: 4px;\n}\n.blue_lighten--border--hover:hover {\n  border: 1px solid #409eff !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.white--bg {\n  background-color: #fff !important;\n}\n.white--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.white--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.white--text {\n  color: #fff !important;\n}\n.white--hover:hover {\n  transition: 10ms;\n  background-color: white !important;\n  border: white !important;\n  cursor: pointer;\n}\n.white--text--hover:hover {\n  color: white !important;\n  cursor: pointer;\n}\n.white--border {\n  border: 1px solid #fff !important;\n  border-radius: 4px;\n}\n.white--border--hover:hover {\n  border: 1px solid #fff !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.white_darken--bg {\n  background-color: #F2F2F2 !important;\n}\n.white_darken--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.white_darken--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.white_darken--text {\n  color: #F2F2F2 !important;\n}\n.white_darken--hover:hover {\n  transition: 10ms;\n  background-color: white !important;\n  border: white !important;\n  cursor: pointer;\n}\n.white_darken--text--hover:hover {\n  color: white !important;\n  cursor: pointer;\n}\n.white_darken--border {\n  border: 1px solid #F2F2F2 !important;\n  border-radius: 4px;\n}\n.white_darken--border--hover:hover {\n  border: 1px solid #F2F2F2 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.white_darken_2--bg {\n  background-color: #F9F9F9 !important;\n}\n.white_darken_2--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.white_darken_2--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.white_darken_2--text {\n  color: #F9F9F9 !important;\n}\n.white_darken_2--hover:hover {\n  transition: 10ms;\n  background-color: white !important;\n  border: white !important;\n  cursor: pointer;\n}\n.white_darken_2--text--hover:hover {\n  color: white !important;\n  cursor: pointer;\n}\n.white_darken_2--border {\n  border: 1px solid #F9F9F9 !important;\n  border-radius: 4px;\n}\n.white_darken_2--border--hover:hover {\n  border: 1px solid #F9F9F9 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.yellow--bg {\n  background-color: #FFFF00 !important;\n}\n.yellow--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.yellow--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.yellow--text {\n  color: #FFFF00 !important;\n}\n.yellow--hover:hover {\n  transition: 10ms;\n  background-color: #ffff66 !important;\n  border: #ffff66 !important;\n  cursor: pointer;\n}\n.yellow--text--hover:hover {\n  color: #ffff66 !important;\n  cursor: pointer;\n}\n.yellow--border {\n  border: 1px solid #FFFF00 !important;\n  border-radius: 4px;\n}\n.yellow--border--hover:hover {\n  border: 1px solid #FFFF00 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.orange--bg {\n  background-color: #F2994A !important;\n}\n.orange--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.orange--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.orange--text {\n  color: #F2994A !important;\n}\n.orange--hover:hover {\n  transition: 10ms;\n  background-color: #f9cfa9 !important;\n  border: #f9cfa9 !important;\n  cursor: pointer;\n}\n.orange--text--hover:hover {\n  color: #f9cfa9 !important;\n  cursor: pointer;\n}\n.orange--border {\n  border: 1px solid #F2994A !important;\n  border-radius: 4px;\n}\n.orange--border--hover:hover {\n  border: 1px solid #F2994A !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.orange_lighten--bg {\n  background-color: #E6A23C !important;\n}\n.orange_lighten--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.orange_lighten--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.orange_lighten--text {\n  color: #E6A23C !important;\n}\n.orange_lighten--hover:hover {\n  transition: 10ms;\n  background-color: #f2cd96 !important;\n  border: #f2cd96 !important;\n  cursor: pointer;\n}\n.orange_lighten--text--hover:hover {\n  color: #f2cd96 !important;\n  cursor: pointer;\n}\n.orange_lighten--border {\n  border: 1px solid #E6A23C !important;\n  border-radius: 4px;\n}\n.orange_lighten--border--hover:hover {\n  border: 1px solid #E6A23C !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.green--bg {\n  background-color: #6FCF97 !important;\n}\n.green--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.green--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.green--text {\n  color: #6FCF97 !important;\n}\n.green--hover:hover {\n  transition: 10ms;\n  background-color: #bce9ce !important;\n  border: #bce9ce !important;\n  cursor: pointer;\n}\n.green--text--hover:hover {\n  color: #bce9ce !important;\n  cursor: pointer;\n}\n.green--border {\n  border: 1px solid #6FCF97 !important;\n  border-radius: 4px;\n}\n.green--border--hover:hover {\n  border: 1px solid #6FCF97 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.green_darken--bg {\n  background-color: #67C23A !important;\n}\n.green_darken--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.green_darken--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.green_darken--text {\n  color: #67C23A !important;\n}\n.green_darken--hover:hover {\n  transition: 10ms;\n  background-color: #a3db87 !important;\n  border: #a3db87 !important;\n  cursor: pointer;\n}\n.green_darken--text--hover:hover {\n  color: #a3db87 !important;\n  cursor: pointer;\n}\n.green_darken--border {\n  border: 1px solid #67C23A !important;\n  border-radius: 4px;\n}\n.green_darken--border--hover:hover {\n  border: 1px solid #67C23A !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.green_darken_2--bg {\n  background-color: #A39D2E !important;\n}\n.green_darken_2--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.green_darken_2--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.green_darken_2--text {\n  color: #A39D2E !important;\n}\n.green_darken_2--hover:hover {\n  transition: 10ms;\n  background-color: #d3cd64 !important;\n  border: #d3cd64 !important;\n  cursor: pointer;\n}\n.green_darken_2--text--hover:hover {\n  color: #d3cd64 !important;\n  cursor: pointer;\n}\n.green_darken_2--border {\n  border: 1px solid #A39D2E !important;\n  border-radius: 4px;\n}\n.green_darken_2--border--hover:hover {\n  border: 1px solid #A39D2E !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.green_darken_3--bg {\n  background-color: #34bfa3 !important;\n}\n.green_darken_3--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.green_darken_3--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.green_darken_3--text {\n  color: #34bfa3 !important;\n}\n.green_darken_3--hover:hover {\n  transition: 10ms;\n  background-color: #7ddcc9 !important;\n  border: #7ddcc9 !important;\n  cursor: pointer;\n}\n.green_darken_3--text--hover:hover {\n  color: #7ddcc9 !important;\n  cursor: pointer;\n}\n.green_darken_3--border {\n  border: 1px solid #34bfa3 !important;\n  border-radius: 4px;\n}\n.green_darken_3--border--hover:hover {\n  border: 1px solid #34bfa3 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.gray--bg {\n  background-color: #B5B4B4 !important;\n}\n.gray--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.gray--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.gray--text {\n  color: #B5B4B4 !important;\n}\n.gray--hover:hover {\n  transition: 10ms;\n  background-color: #e8e7e7 !important;\n  border: #e8e7e7 !important;\n  cursor: pointer;\n}\n.gray--text--hover:hover {\n  color: #e8e7e7 !important;\n  cursor: pointer;\n}\n.gray--border {\n  border: 1px solid #B5B4B4 !important;\n  border-radius: 4px;\n}\n.gray--border--hover:hover {\n  border: 1px solid #B5B4B4 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.gray_darken--bg {\n  background-color: #828282 !important;\n}\n.gray_darken--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.gray_darken--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.gray_darken--text {\n  color: #828282 !important;\n}\n.gray_darken--hover:hover {\n  transition: 10ms;\n  background-color: #b5b5b5 !important;\n  border: #b5b5b5 !important;\n  cursor: pointer;\n}\n.gray_darken--text--hover:hover {\n  color: #b5b5b5 !important;\n  cursor: pointer;\n}\n.gray_darken--border {\n  border: 1px solid #828282 !important;\n  border-radius: 4px;\n}\n.gray_darken--border--hover:hover {\n  border: 1px solid #828282 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.gray_lighten--bg {\n  background-color: #E0E0E0 !important;\n}\n.gray_lighten--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.gray_lighten--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.gray_lighten--text {\n  color: #E0E0E0 !important;\n}\n.gray_lighten--hover:hover {\n  transition: 10ms;\n  background-color: white !important;\n  border: white !important;\n  cursor: pointer;\n}\n.gray_lighten--text--hover:hover {\n  color: white !important;\n  cursor: pointer;\n}\n.gray_lighten--border {\n  border: 1px solid #E0E0E0 !important;\n  border-radius: 4px;\n}\n.gray_lighten--border--hover:hover {\n  border: 1px solid #E0E0E0 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.gray_lighten_2--bg {\n  background-color: #909399 !important;\n}\n.gray_lighten_2--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.gray_lighten_2--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.gray_lighten_2--text {\n  color: #909399 !important;\n}\n.gray_lighten_2--hover:hover {\n  transition: 10ms;\n  background-color: #c5c7ca !important;\n  border: #c5c7ca !important;\n  cursor: pointer;\n}\n.gray_lighten_2--text--hover:hover {\n  color: #c5c7ca !important;\n  cursor: pointer;\n}\n.gray_lighten_2--border {\n  border: 1px solid #909399 !important;\n  border-radius: 4px;\n}\n.gray_lighten_2--border--hover:hover {\n  border: 1px solid #909399 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.red--bg {\n  background-color: #EE0033 !important;\n}\n.red--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.red--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.red--text {\n  color: #EE0033 !important;\n}\n.red--hover:hover {\n  transition: 10ms;\n  background-color: #ff5579 !important;\n  border: #ff5579 !important;\n  cursor: pointer;\n}\n.red--text--hover:hover {\n  color: #ff5579 !important;\n  cursor: pointer;\n}\n.red--border {\n  border: 1px solid #EE0033 !important;\n  border-radius: 4px;\n}\n.red--border--hover:hover {\n  border: 1px solid #EE0033 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.red_lighten--bg {\n  background-color: #FF7171 !important;\n}\n.red_lighten--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.red_lighten--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.red_lighten--text {\n  color: #FF7171 !important;\n}\n.red_lighten--hover:hover {\n  transition: 10ms;\n  background-color: #ffd7d7 !important;\n  border: #ffd7d7 !important;\n  cursor: pointer;\n}\n.red_lighten--text--hover:hover {\n  color: #ffd7d7 !important;\n  cursor: pointer;\n}\n.red_lighten--border {\n  border: 1px solid #FF7171 !important;\n  border-radius: 4px;\n}\n.red_lighten--border--hover:hover {\n  border: 1px solid #FF7171 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.red_lighten_2--bg {\n  background-color: #F78787 !important;\n}\n.red_lighten_2--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.red_lighten_2--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.red_lighten_2--text {\n  color: #F78787 !important;\n}\n.red_lighten_2--hover:hover {\n  transition: 10ms;\n  background-color: #fde7e7 !important;\n  border: #fde7e7 !important;\n  cursor: pointer;\n}\n.red_lighten_2--text--hover:hover {\n  color: #fde7e7 !important;\n  cursor: pointer;\n}\n.red_lighten_2--border {\n  border: 1px solid #F78787 !important;\n  border-radius: 4px;\n}\n.red_lighten_2--border--hover:hover {\n  border: 1px solid #F78787 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.red_lighten_3--bg {\n  background-color: #f56C6C !important;\n}\n.red_lighten_3--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.red_lighten_3--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.red_lighten_3--text {\n  color: #f56C6C !important;\n}\n.red_lighten_3--hover:hover {\n  transition: 10ms;\n  background-color: #fbcccc !important;\n  border: #fbcccc !important;\n  cursor: pointer;\n}\n.red_lighten_3--text--hover:hover {\n  color: #fbcccc !important;\n  cursor: pointer;\n}\n.red_lighten_3--border {\n  border: 1px solid #f56C6C !important;\n  border-radius: 4px;\n}\n.red_lighten_3--border--hover:hover {\n  border: 1px solid #f56C6C !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.purple--bg {\n  background-color: #800080 !important;\n}\n.purple--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.purple--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.purple--text {\n  color: #800080 !important;\n}\n.purple--hover:hover {\n  transition: 10ms;\n  background-color: #e600e6 !important;\n  border: #e600e6 !important;\n  cursor: pointer;\n}\n.purple--text--hover:hover {\n  color: #e600e6 !important;\n  cursor: pointer;\n}\n.purple--border {\n  border: 1px solid #800080 !important;\n  border-radius: 4px;\n}\n.purple--border--hover:hover {\n  border: 1px solid #800080 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.purple_lighten_1--bg {\n  background-color: #803280 !important;\n}\n.purple_lighten_1--bg:not([disabled]).hoverable:hover {\n  filter: brightness(110%);\n  transition: all 0.1s ease-in-out;\n}\n.purple_lighten_1--bg:not([disabled]).focusable:focus {\n  filter: brightness(110%);\n}\n.purple_lighten_1--text {\n  color: #803280 !important;\n}\n.purple_lighten_1--hover:hover {\n  transition: 10ms;\n  background-color: #be5abe !important;\n  border: #be5abe !important;\n  cursor: pointer;\n}\n.purple_lighten_1--text--hover:hover {\n  color: #be5abe !important;\n  cursor: pointer;\n}\n.purple_lighten_1--border {\n  border: 1px solid #803280 !important;\n  border-radius: 4px;\n}\n.purple_lighten_1--border--hover:hover {\n  border: 1px solid #803280 !important;\n}\n.opacity-0--hover:hover {\n  opacity: 0;\n}\n.mt-0 {\n  margin-top: 0px;\n}\n.pt-0 {\n  padding-top: 0px !important;\n}\n.mb-0 {\n  margin-bottom: 0px;\n}\n.pb-0 {\n  padding-bottom: 0px !important;\n}\n.ml-0 {\n  margin-left: 0px;\n}\n.pl-0 {\n  padding-left: 0px !important;\n}\n.mr-0 {\n  margin-right: 0px;\n}\n.pr-0 {\n  padding-right: 0px !important;\n}\n.m-0 {\n  margin: 0px;\n}\n.mx-0 {\n  margin-left: 0px;\n  margin-right: 0px;\n}\n.my-0 {\n  margin-top: 0px;\n  margin-bottom: 0px;\n}\n.p-0 {\n  padding: 0px;\n}\n.px-0 {\n  padding-left: 0px;\n  padding-right: 0px;\n}\n.py-0 {\n  padding-top: 0px;\n  padding-bottom: 0px;\n}\n.mt-1 {\n  margin-top: 2px;\n}\n.pt-1 {\n  padding-top: 2px !important;\n}\n.mb-1 {\n  margin-bottom: 2px;\n}\n.pb-1 {\n  padding-bottom: 2px !important;\n}\n.ml-1 {\n  margin-left: 2px;\n}\n.pl-1 {\n  padding-left: 2px !important;\n}\n.mr-1 {\n  margin-right: 2px;\n}\n.pr-1 {\n  padding-right: 2px !important;\n}\n.m-1 {\n  margin: 2px;\n}\n.mx-1 {\n  margin-left: 2px;\n  margin-right: 2px;\n}\n.my-1 {\n  margin-top: 2px;\n  margin-bottom: 2px;\n}\n.p-1 {\n  padding: 2px;\n}\n.px-1 {\n  padding-left: 2px;\n  padding-right: 2px;\n}\n.py-1 {\n  padding-top: 2px;\n  padding-bottom: 2px;\n}\n.mt-2 {\n  margin-top: 4px;\n}\n.pt-2 {\n  padding-top: 4px !important;\n}\n.mb-2 {\n  margin-bottom: 4px;\n}\n.pb-2 {\n  padding-bottom: 4px !important;\n}\n.ml-2 {\n  margin-left: 4px;\n}\n.pl-2 {\n  padding-left: 4px !important;\n}\n.mr-2 {\n  margin-right: 4px;\n}\n.pr-2 {\n  padding-right: 4px !important;\n}\n.m-2 {\n  margin: 4px;\n}\n.mx-2 {\n  margin-left: 4px;\n  margin-right: 4px;\n}\n.my-2 {\n  margin-top: 4px;\n  margin-bottom: 4px;\n}\n.p-2 {\n  padding: 4px;\n}\n.px-2 {\n  padding-left: 4px;\n  padding-right: 4px;\n}\n.py-2 {\n  padding-top: 4px;\n  padding-bottom: 4px;\n}\n.mt-3 {\n  margin-top: 6px;\n}\n.pt-3 {\n  padding-top: 6px !important;\n}\n.mb-3 {\n  margin-bottom: 6px;\n}\n.pb-3 {\n  padding-bottom: 6px !important;\n}\n.ml-3 {\n  margin-left: 6px;\n}\n.pl-3 {\n  padding-left: 6px !important;\n}\n.mr-3 {\n  margin-right: 6px;\n}\n.pr-3 {\n  padding-right: 6px !important;\n}\n.m-3 {\n  margin: 6px;\n}\n.mx-3 {\n  margin-left: 6px;\n  margin-right: 6px;\n}\n.my-3 {\n  margin-top: 6px;\n  margin-bottom: 6px;\n}\n.p-3 {\n  padding: 6px;\n}\n.px-3 {\n  padding-left: 6px;\n  padding-right: 6px;\n}\n.py-3 {\n  padding-top: 6px;\n  padding-bottom: 6px;\n}\n.mt-4 {\n  margin-top: 8px;\n}\n.pt-4 {\n  padding-top: 8px !important;\n}\n.mb-4 {\n  margin-bottom: 8px;\n}\n.pb-4 {\n  padding-bottom: 8px !important;\n}\n.ml-4 {\n  margin-left: 8px;\n}\n.pl-4 {\n  padding-left: 8px !important;\n}\n.mr-4 {\n  margin-right: 8px;\n}\n.pr-4 {\n  padding-right: 8px !important;\n}\n.m-4 {\n  margin: 8px;\n}\n.mx-4 {\n  margin-left: 8px;\n  margin-right: 8px;\n}\n.my-4 {\n  margin-top: 8px;\n  margin-bottom: 8px;\n}\n.p-4 {\n  padding: 8px;\n}\n.px-4 {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.py-4 {\n  padding-top: 8px;\n  padding-bottom: 8px;\n}\n.mt-5 {\n  margin-top: 10px;\n}\n.pt-5 {\n  padding-top: 10px !important;\n}\n.mb-5 {\n  margin-bottom: 10px;\n}\n.pb-5 {\n  padding-bottom: 10px !important;\n}\n.ml-5 {\n  margin-left: 10px;\n}\n.pl-5 {\n  padding-left: 10px !important;\n}\n.mr-5 {\n  margin-right: 10px;\n}\n.pr-5 {\n  padding-right: 10px !important;\n}\n.m-5 {\n  margin: 10px;\n}\n.mx-5 {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n.my-5 {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.p-5 {\n  padding: 10px;\n}\n.px-5 {\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.py-5 {\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n.mt-6 {\n  margin-top: 12px;\n}\n.pt-6 {\n  padding-top: 12px !important;\n}\n.mb-6 {\n  margin-bottom: 12px;\n}\n.pb-6 {\n  padding-bottom: 12px !important;\n}\n.ml-6 {\n  margin-left: 12px;\n}\n.pl-6 {\n  padding-left: 12px !important;\n}\n.mr-6 {\n  margin-right: 12px;\n}\n.pr-6 {\n  padding-right: 12px !important;\n}\n.m-6 {\n  margin: 12px;\n}\n.mx-6 {\n  margin-left: 12px;\n  margin-right: 12px;\n}\n.my-6 {\n  margin-top: 12px;\n  margin-bottom: 12px;\n}\n.p-6 {\n  padding: 12px;\n}\n.px-6 {\n  padding-left: 12px;\n  padding-right: 12px;\n}\n.py-6 {\n  padding-top: 12px;\n  padding-bottom: 12px;\n}\n.mt-7 {\n  margin-top: 14px;\n}\n.pt-7 {\n  padding-top: 14px !important;\n}\n.mb-7 {\n  margin-bottom: 14px;\n}\n.pb-7 {\n  padding-bottom: 14px !important;\n}\n.ml-7 {\n  margin-left: 14px;\n}\n.pl-7 {\n  padding-left: 14px !important;\n}\n.mr-7 {\n  margin-right: 14px;\n}\n.pr-7 {\n  padding-right: 14px !important;\n}\n.m-7 {\n  margin: 14px;\n}\n.mx-7 {\n  margin-left: 14px;\n  margin-right: 14px;\n}\n.my-7 {\n  margin-top: 14px;\n  margin-bottom: 14px;\n}\n.p-7 {\n  padding: 14px;\n}\n.px-7 {\n  padding-left: 14px;\n  padding-right: 14px;\n}\n.py-7 {\n  padding-top: 14px;\n  padding-bottom: 14px;\n}\n.mt-8 {\n  margin-top: 16px;\n}\n.pt-8 {\n  padding-top: 16px !important;\n}\n.mb-8 {\n  margin-bottom: 16px;\n}\n.pb-8 {\n  padding-bottom: 16px !important;\n}\n.ml-8 {\n  margin-left: 16px;\n}\n.pl-8 {\n  padding-left: 16px !important;\n}\n.mr-8 {\n  margin-right: 16px;\n}\n.pr-8 {\n  padding-right: 16px !important;\n}\n.m-8 {\n  margin: 16px;\n}\n.mx-8 {\n  margin-left: 16px;\n  margin-right: 16px;\n}\n.my-8 {\n  margin-top: 16px;\n  margin-bottom: 16px;\n}\n.p-8 {\n  padding: 16px;\n}\n.px-8 {\n  padding-left: 16px;\n  padding-right: 16px;\n}\n.py-8 {\n  padding-top: 16px;\n  padding-bottom: 16px;\n}\n.mt-9 {\n  margin-top: 18px;\n}\n.pt-9 {\n  padding-top: 18px !important;\n}\n.mb-9 {\n  margin-bottom: 18px;\n}\n.pb-9 {\n  padding-bottom: 18px !important;\n}\n.ml-9 {\n  margin-left: 18px;\n}\n.pl-9 {\n  padding-left: 18px !important;\n}\n.mr-9 {\n  margin-right: 18px;\n}\n.pr-9 {\n  padding-right: 18px !important;\n}\n.m-9 {\n  margin: 18px;\n}\n.mx-9 {\n  margin-left: 18px;\n  margin-right: 18px;\n}\n.my-9 {\n  margin-top: 18px;\n  margin-bottom: 18px;\n}\n.p-9 {\n  padding: 18px;\n}\n.px-9 {\n  padding-left: 18px;\n  padding-right: 18px;\n}\n.py-9 {\n  padding-top: 18px;\n  padding-bottom: 18px;\n}\n.mt-10 {\n  margin-top: 20px;\n}\n.pt-10 {\n  padding-top: 20px !important;\n}\n.mb-10 {\n  margin-bottom: 20px;\n}\n.pb-10 {\n  padding-bottom: 20px !important;\n}\n.ml-10 {\n  margin-left: 20px;\n}\n.pl-10 {\n  padding-left: 20px !important;\n}\n.mr-10 {\n  margin-right: 20px;\n}\n.pr-10 {\n  padding-right: 20px !important;\n}\n.m-10 {\n  margin: 20px;\n}\n.mx-10 {\n  margin-left: 20px;\n  margin-right: 20px;\n}\n.my-10 {\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n.p-10 {\n  padding: 20px;\n}\n.px-10 {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.py-10 {\n  padding-top: 20px;\n  padding-bottom: 20px;\n}\n.mt-11 {\n  margin-top: 22px;\n}\n.pt-11 {\n  padding-top: 22px !important;\n}\n.mb-11 {\n  margin-bottom: 22px;\n}\n.pb-11 {\n  padding-bottom: 22px !important;\n}\n.ml-11 {\n  margin-left: 22px;\n}\n.pl-11 {\n  padding-left: 22px !important;\n}\n.mr-11 {\n  margin-right: 22px;\n}\n.pr-11 {\n  padding-right: 22px !important;\n}\n.m-11 {\n  margin: 22px;\n}\n.mx-11 {\n  margin-left: 22px;\n  margin-right: 22px;\n}\n.my-11 {\n  margin-top: 22px;\n  margin-bottom: 22px;\n}\n.p-11 {\n  padding: 22px;\n}\n.px-11 {\n  padding-left: 22px;\n  padding-right: 22px;\n}\n.py-11 {\n  padding-top: 22px;\n  padding-bottom: 22px;\n}\n.mt-12 {\n  margin-top: 24px;\n}\n.pt-12 {\n  padding-top: 24px !important;\n}\n.mb-12 {\n  margin-bottom: 24px;\n}\n.pb-12 {\n  padding-bottom: 24px !important;\n}\n.ml-12 {\n  margin-left: 24px;\n}\n.pl-12 {\n  padding-left: 24px !important;\n}\n.mr-12 {\n  margin-right: 24px;\n}\n.pr-12 {\n  padding-right: 24px !important;\n}\n.m-12 {\n  margin: 24px;\n}\n.mx-12 {\n  margin-left: 24px;\n  margin-right: 24px;\n}\n.my-12 {\n  margin-top: 24px;\n  margin-bottom: 24px;\n}\n.p-12 {\n  padding: 24px;\n}\n.px-12 {\n  padding-left: 24px;\n  padding-right: 24px;\n}\n.py-12 {\n  padding-top: 24px;\n  padding-bottom: 24px;\n}\n.mt-13 {\n  margin-top: 26px;\n}\n.pt-13 {\n  padding-top: 26px !important;\n}\n.mb-13 {\n  margin-bottom: 26px;\n}\n.pb-13 {\n  padding-bottom: 26px !important;\n}\n.ml-13 {\n  margin-left: 26px;\n}\n.pl-13 {\n  padding-left: 26px !important;\n}\n.mr-13 {\n  margin-right: 26px;\n}\n.pr-13 {\n  padding-right: 26px !important;\n}\n.m-13 {\n  margin: 26px;\n}\n.mx-13 {\n  margin-left: 26px;\n  margin-right: 26px;\n}\n.my-13 {\n  margin-top: 26px;\n  margin-bottom: 26px;\n}\n.p-13 {\n  padding: 26px;\n}\n.px-13 {\n  padding-left: 26px;\n  padding-right: 26px;\n}\n.py-13 {\n  padding-top: 26px;\n  padding-bottom: 26px;\n}\n.mt-14 {\n  margin-top: 28px;\n}\n.pt-14 {\n  padding-top: 28px !important;\n}\n.mb-14 {\n  margin-bottom: 28px;\n}\n.pb-14 {\n  padding-bottom: 28px !important;\n}\n.ml-14 {\n  margin-left: 28px;\n}\n.pl-14 {\n  padding-left: 28px !important;\n}\n.mr-14 {\n  margin-right: 28px;\n}\n.pr-14 {\n  padding-right: 28px !important;\n}\n.m-14 {\n  margin: 28px;\n}\n.mx-14 {\n  margin-left: 28px;\n  margin-right: 28px;\n}\n.my-14 {\n  margin-top: 28px;\n  margin-bottom: 28px;\n}\n.p-14 {\n  padding: 28px;\n}\n.px-14 {\n  padding-left: 28px;\n  padding-right: 28px;\n}\n.py-14 {\n  padding-top: 28px;\n  padding-bottom: 28px;\n}\n.mt-15 {\n  margin-top: 30px;\n}\n.pt-15 {\n  padding-top: 30px !important;\n}\n.mb-15 {\n  margin-bottom: 30px;\n}\n.pb-15 {\n  padding-bottom: 30px !important;\n}\n.ml-15 {\n  margin-left: 30px;\n}\n.pl-15 {\n  padding-left: 30px !important;\n}\n.mr-15 {\n  margin-right: 30px;\n}\n.pr-15 {\n  padding-right: 30px !important;\n}\n.m-15 {\n  margin: 30px;\n}\n.mx-15 {\n  margin-left: 30px;\n  margin-right: 30px;\n}\n.my-15 {\n  margin-top: 30px;\n  margin-bottom: 30px;\n}\n.p-15 {\n  padding: 30px;\n}\n.px-15 {\n  padding-left: 30px;\n  padding-right: 30px;\n}\n.py-15 {\n  padding-top: 30px;\n  padding-bottom: 30px;\n}\n.mt-16 {\n  margin-top: 32px;\n}\n.pt-16 {\n  padding-top: 32px !important;\n}\n.mb-16 {\n  margin-bottom: 32px;\n}\n.pb-16 {\n  padding-bottom: 32px !important;\n}\n.ml-16 {\n  margin-left: 32px;\n}\n.pl-16 {\n  padding-left: 32px !important;\n}\n.mr-16 {\n  margin-right: 32px;\n}\n.pr-16 {\n  padding-right: 32px !important;\n}\n.m-16 {\n  margin: 32px;\n}\n.mx-16 {\n  margin-left: 32px;\n  margin-right: 32px;\n}\n.my-16 {\n  margin-top: 32px;\n  margin-bottom: 32px;\n}\n.p-16 {\n  padding: 32px;\n}\n.px-16 {\n  padding-left: 32px;\n  padding-right: 32px;\n}\n.py-16 {\n  padding-top: 32px;\n  padding-bottom: 32px;\n}\n.mt-17 {\n  margin-top: 34px;\n}\n.pt-17 {\n  padding-top: 34px !important;\n}\n.mb-17 {\n  margin-bottom: 34px;\n}\n.pb-17 {\n  padding-bottom: 34px !important;\n}\n.ml-17 {\n  margin-left: 34px;\n}\n.pl-17 {\n  padding-left: 34px !important;\n}\n.mr-17 {\n  margin-right: 34px;\n}\n.pr-17 {\n  padding-right: 34px !important;\n}\n.m-17 {\n  margin: 34px;\n}\n.mx-17 {\n  margin-left: 34px;\n  margin-right: 34px;\n}\n.my-17 {\n  margin-top: 34px;\n  margin-bottom: 34px;\n}\n.p-17 {\n  padding: 34px;\n}\n.px-17 {\n  padding-left: 34px;\n  padding-right: 34px;\n}\n.py-17 {\n  padding-top: 34px;\n  padding-bottom: 34px;\n}\n.mt-18 {\n  margin-top: 36px;\n}\n.pt-18 {\n  padding-top: 36px !important;\n}\n.mb-18 {\n  margin-bottom: 36px;\n}\n.pb-18 {\n  padding-bottom: 36px !important;\n}\n.ml-18 {\n  margin-left: 36px;\n}\n.pl-18 {\n  padding-left: 36px !important;\n}\n.mr-18 {\n  margin-right: 36px;\n}\n.pr-18 {\n  padding-right: 36px !important;\n}\n.m-18 {\n  margin: 36px;\n}\n.mx-18 {\n  margin-left: 36px;\n  margin-right: 36px;\n}\n.my-18 {\n  margin-top: 36px;\n  margin-bottom: 36px;\n}\n.p-18 {\n  padding: 36px;\n}\n.px-18 {\n  padding-left: 36px;\n  padding-right: 36px;\n}\n.py-18 {\n  padding-top: 36px;\n  padding-bottom: 36px;\n}\n.mt-19 {\n  margin-top: 38px;\n}\n.pt-19 {\n  padding-top: 38px !important;\n}\n.mb-19 {\n  margin-bottom: 38px;\n}\n.pb-19 {\n  padding-bottom: 38px !important;\n}\n.ml-19 {\n  margin-left: 38px;\n}\n.pl-19 {\n  padding-left: 38px !important;\n}\n.mr-19 {\n  margin-right: 38px;\n}\n.pr-19 {\n  padding-right: 38px !important;\n}\n.m-19 {\n  margin: 38px;\n}\n.mx-19 {\n  margin-left: 38px;\n  margin-right: 38px;\n}\n.my-19 {\n  margin-top: 38px;\n  margin-bottom: 38px;\n}\n.p-19 {\n  padding: 38px;\n}\n.px-19 {\n  padding-left: 38px;\n  padding-right: 38px;\n}\n.py-19 {\n  padding-top: 38px;\n  padding-bottom: 38px;\n}\n.mt-20 {\n  margin-top: 40px;\n}\n.pt-20 {\n  padding-top: 40px !important;\n}\n.mb-20 {\n  margin-bottom: 40px;\n}\n.pb-20 {\n  padding-bottom: 40px !important;\n}\n.ml-20 {\n  margin-left: 40px;\n}\n.pl-20 {\n  padding-left: 40px !important;\n}\n.mr-20 {\n  margin-right: 40px;\n}\n.pr-20 {\n  padding-right: 40px !important;\n}\n.m-20 {\n  margin: 40px;\n}\n.mx-20 {\n  margin-left: 40px;\n  margin-right: 40px;\n}\n.my-20 {\n  margin-top: 40px;\n  margin-bottom: 40px;\n}\n.p-20 {\n  padding: 40px;\n}\n.px-20 {\n  padding-left: 40px;\n  padding-right: 40px;\n}\n.py-20 {\n  padding-top: 40px;\n  padding-bottom: 40px;\n}\n.mt-21 {\n  margin-top: 42px;\n}\n.pt-21 {\n  padding-top: 42px !important;\n}\n.mb-21 {\n  margin-bottom: 42px;\n}\n.pb-21 {\n  padding-bottom: 42px !important;\n}\n.ml-21 {\n  margin-left: 42px;\n}\n.pl-21 {\n  padding-left: 42px !important;\n}\n.mr-21 {\n  margin-right: 42px;\n}\n.pr-21 {\n  padding-right: 42px !important;\n}\n.m-21 {\n  margin: 42px;\n}\n.mx-21 {\n  margin-left: 42px;\n  margin-right: 42px;\n}\n.my-21 {\n  margin-top: 42px;\n  margin-bottom: 42px;\n}\n.p-21 {\n  padding: 42px;\n}\n.px-21 {\n  padding-left: 42px;\n  padding-right: 42px;\n}\n.py-21 {\n  padding-top: 42px;\n  padding-bottom: 42px;\n}\n.mt-22 {\n  margin-top: 44px;\n}\n.pt-22 {\n  padding-top: 44px !important;\n}\n.mb-22 {\n  margin-bottom: 44px;\n}\n.pb-22 {\n  padding-bottom: 44px !important;\n}\n.ml-22 {\n  margin-left: 44px;\n}\n.pl-22 {\n  padding-left: 44px !important;\n}\n.mr-22 {\n  margin-right: 44px;\n}\n.pr-22 {\n  padding-right: 44px !important;\n}\n.m-22 {\n  margin: 44px;\n}\n.mx-22 {\n  margin-left: 44px;\n  margin-right: 44px;\n}\n.my-22 {\n  margin-top: 44px;\n  margin-bottom: 44px;\n}\n.p-22 {\n  padding: 44px;\n}\n.px-22 {\n  padding-left: 44px;\n  padding-right: 44px;\n}\n.py-22 {\n  padding-top: 44px;\n  padding-bottom: 44px;\n}\n.mt-23 {\n  margin-top: 46px;\n}\n.pt-23 {\n  padding-top: 46px !important;\n}\n.mb-23 {\n  margin-bottom: 46px;\n}\n.pb-23 {\n  padding-bottom: 46px !important;\n}\n.ml-23 {\n  margin-left: 46px;\n}\n.pl-23 {\n  padding-left: 46px !important;\n}\n.mr-23 {\n  margin-right: 46px;\n}\n.pr-23 {\n  padding-right: 46px !important;\n}\n.m-23 {\n  margin: 46px;\n}\n.mx-23 {\n  margin-left: 46px;\n  margin-right: 46px;\n}\n.my-23 {\n  margin-top: 46px;\n  margin-bottom: 46px;\n}\n.p-23 {\n  padding: 46px;\n}\n.px-23 {\n  padding-left: 46px;\n  padding-right: 46px;\n}\n.py-23 {\n  padding-top: 46px;\n  padding-bottom: 46px;\n}\n.mt-24 {\n  margin-top: 48px;\n}\n.pt-24 {\n  padding-top: 48px !important;\n}\n.mb-24 {\n  margin-bottom: 48px;\n}\n.pb-24 {\n  padding-bottom: 48px !important;\n}\n.ml-24 {\n  margin-left: 48px;\n}\n.pl-24 {\n  padding-left: 48px !important;\n}\n.mr-24 {\n  margin-right: 48px;\n}\n.pr-24 {\n  padding-right: 48px !important;\n}\n.m-24 {\n  margin: 48px;\n}\n.mx-24 {\n  margin-left: 48px;\n  margin-right: 48px;\n}\n.my-24 {\n  margin-top: 48px;\n  margin-bottom: 48px;\n}\n.p-24 {\n  padding: 48px;\n}\n.px-24 {\n  padding-left: 48px;\n  padding-right: 48px;\n}\n.py-24 {\n  padding-top: 48px;\n  padding-bottom: 48px;\n}\n.mt-25 {\n  margin-top: 50px;\n}\n.pt-25 {\n  padding-top: 50px !important;\n}\n.mb-25 {\n  margin-bottom: 50px;\n}\n.pb-25 {\n  padding-bottom: 50px !important;\n}\n.ml-25 {\n  margin-left: 50px;\n}\n.pl-25 {\n  padding-left: 50px !important;\n}\n.mr-25 {\n  margin-right: 50px;\n}\n.pr-25 {\n  padding-right: 50px !important;\n}\n.m-25 {\n  margin: 50px;\n}\n.mx-25 {\n  margin-left: 50px;\n  margin-right: 50px;\n}\n.my-25 {\n  margin-top: 50px;\n  margin-bottom: 50px;\n}\n.p-25 {\n  padding: 50px;\n}\n.px-25 {\n  padding-left: 50px;\n  padding-right: 50px;\n}\n.py-25 {\n  padding-top: 50px;\n  padding-bottom: 50px;\n}\n.mt-26 {\n  margin-top: 52px;\n}\n.pt-26 {\n  padding-top: 52px !important;\n}\n.mb-26 {\n  margin-bottom: 52px;\n}\n.pb-26 {\n  padding-bottom: 52px !important;\n}\n.ml-26 {\n  margin-left: 52px;\n}\n.pl-26 {\n  padding-left: 52px !important;\n}\n.mr-26 {\n  margin-right: 52px;\n}\n.pr-26 {\n  padding-right: 52px !important;\n}\n.m-26 {\n  margin: 52px;\n}\n.mx-26 {\n  margin-left: 52px;\n  margin-right: 52px;\n}\n.my-26 {\n  margin-top: 52px;\n  margin-bottom: 52px;\n}\n.p-26 {\n  padding: 52px;\n}\n.px-26 {\n  padding-left: 52px;\n  padding-right: 52px;\n}\n.py-26 {\n  padding-top: 52px;\n  padding-bottom: 52px;\n}\n.mt-27 {\n  margin-top: 54px;\n}\n.pt-27 {\n  padding-top: 54px !important;\n}\n.mb-27 {\n  margin-bottom: 54px;\n}\n.pb-27 {\n  padding-bottom: 54px !important;\n}\n.ml-27 {\n  margin-left: 54px;\n}\n.pl-27 {\n  padding-left: 54px !important;\n}\n.mr-27 {\n  margin-right: 54px;\n}\n.pr-27 {\n  padding-right: 54px !important;\n}\n.m-27 {\n  margin: 54px;\n}\n.mx-27 {\n  margin-left: 54px;\n  margin-right: 54px;\n}\n.my-27 {\n  margin-top: 54px;\n  margin-bottom: 54px;\n}\n.p-27 {\n  padding: 54px;\n}\n.px-27 {\n  padding-left: 54px;\n  padding-right: 54px;\n}\n.py-27 {\n  padding-top: 54px;\n  padding-bottom: 54px;\n}\n.mt-28 {\n  margin-top: 56px;\n}\n.pt-28 {\n  padding-top: 56px !important;\n}\n.mb-28 {\n  margin-bottom: 56px;\n}\n.pb-28 {\n  padding-bottom: 56px !important;\n}\n.ml-28 {\n  margin-left: 56px;\n}\n.pl-28 {\n  padding-left: 56px !important;\n}\n.mr-28 {\n  margin-right: 56px;\n}\n.pr-28 {\n  padding-right: 56px !important;\n}\n.m-28 {\n  margin: 56px;\n}\n.mx-28 {\n  margin-left: 56px;\n  margin-right: 56px;\n}\n.my-28 {\n  margin-top: 56px;\n  margin-bottom: 56px;\n}\n.p-28 {\n  padding: 56px;\n}\n.px-28 {\n  padding-left: 56px;\n  padding-right: 56px;\n}\n.py-28 {\n  padding-top: 56px;\n  padding-bottom: 56px;\n}\n.mt-29 {\n  margin-top: 58px;\n}\n.pt-29 {\n  padding-top: 58px !important;\n}\n.mb-29 {\n  margin-bottom: 58px;\n}\n.pb-29 {\n  padding-bottom: 58px !important;\n}\n.ml-29 {\n  margin-left: 58px;\n}\n.pl-29 {\n  padding-left: 58px !important;\n}\n.mr-29 {\n  margin-right: 58px;\n}\n.pr-29 {\n  padding-right: 58px !important;\n}\n.m-29 {\n  margin: 58px;\n}\n.mx-29 {\n  margin-left: 58px;\n  margin-right: 58px;\n}\n.my-29 {\n  margin-top: 58px;\n  margin-bottom: 58px;\n}\n.p-29 {\n  padding: 58px;\n}\n.px-29 {\n  padding-left: 58px;\n  padding-right: 58px;\n}\n.py-29 {\n  padding-top: 58px;\n  padding-bottom: 58px;\n}\n.mt-30 {\n  margin-top: 60px;\n}\n.pt-30 {\n  padding-top: 60px !important;\n}\n.mb-30 {\n  margin-bottom: 60px;\n}\n.pb-30 {\n  padding-bottom: 60px !important;\n}\n.ml-30 {\n  margin-left: 60px;\n}\n.pl-30 {\n  padding-left: 60px !important;\n}\n.mr-30 {\n  margin-right: 60px;\n}\n.pr-30 {\n  padding-right: 60px !important;\n}\n.m-30 {\n  margin: 60px;\n}\n.mx-30 {\n  margin-left: 60px;\n  margin-right: 60px;\n}\n.my-30 {\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n.p-30 {\n  padding: 60px;\n}\n.px-30 {\n  padding-left: 60px;\n  padding-right: 60px;\n}\n.py-30 {\n  padding-top: 60px;\n  padding-bottom: 60px;\n}\n.mt-31 {\n  margin-top: 62px;\n}\n.pt-31 {\n  padding-top: 62px !important;\n}\n.mb-31 {\n  margin-bottom: 62px;\n}\n.pb-31 {\n  padding-bottom: 62px !important;\n}\n.ml-31 {\n  margin-left: 62px;\n}\n.pl-31 {\n  padding-left: 62px !important;\n}\n.mr-31 {\n  margin-right: 62px;\n}\n.pr-31 {\n  padding-right: 62px !important;\n}\n.m-31 {\n  margin: 62px;\n}\n.mx-31 {\n  margin-left: 62px;\n  margin-right: 62px;\n}\n.my-31 {\n  margin-top: 62px;\n  margin-bottom: 62px;\n}\n.p-31 {\n  padding: 62px;\n}\n.px-31 {\n  padding-left: 62px;\n  padding-right: 62px;\n}\n.py-31 {\n  padding-top: 62px;\n  padding-bottom: 62px;\n}\n.mt-32 {\n  margin-top: 64px;\n}\n.pt-32 {\n  padding-top: 64px !important;\n}\n.mb-32 {\n  margin-bottom: 64px;\n}\n.pb-32 {\n  padding-bottom: 64px !important;\n}\n.ml-32 {\n  margin-left: 64px;\n}\n.pl-32 {\n  padding-left: 64px !important;\n}\n.mr-32 {\n  margin-right: 64px;\n}\n.pr-32 {\n  padding-right: 64px !important;\n}\n.m-32 {\n  margin: 64px;\n}\n.mx-32 {\n  margin-left: 64px;\n  margin-right: 64px;\n}\n.my-32 {\n  margin-top: 64px;\n  margin-bottom: 64px;\n}\n.p-32 {\n  padding: 64px;\n}\n.px-32 {\n  padding-left: 64px;\n  padding-right: 64px;\n}\n.py-32 {\n  padding-top: 64px;\n  padding-bottom: 64px;\n}\n.mt-33 {\n  margin-top: 66px;\n}\n.pt-33 {\n  padding-top: 66px !important;\n}\n.mb-33 {\n  margin-bottom: 66px;\n}\n.pb-33 {\n  padding-bottom: 66px !important;\n}\n.ml-33 {\n  margin-left: 66px;\n}\n.pl-33 {\n  padding-left: 66px !important;\n}\n.mr-33 {\n  margin-right: 66px;\n}\n.pr-33 {\n  padding-right: 66px !important;\n}\n.m-33 {\n  margin: 66px;\n}\n.mx-33 {\n  margin-left: 66px;\n  margin-right: 66px;\n}\n.my-33 {\n  margin-top: 66px;\n  margin-bottom: 66px;\n}\n.p-33 {\n  padding: 66px;\n}\n.px-33 {\n  padding-left: 66px;\n  padding-right: 66px;\n}\n.py-33 {\n  padding-top: 66px;\n  padding-bottom: 66px;\n}\n.mt-34 {\n  margin-top: 68px;\n}\n.pt-34 {\n  padding-top: 68px !important;\n}\n.mb-34 {\n  margin-bottom: 68px;\n}\n.pb-34 {\n  padding-bottom: 68px !important;\n}\n.ml-34 {\n  margin-left: 68px;\n}\n.pl-34 {\n  padding-left: 68px !important;\n}\n.mr-34 {\n  margin-right: 68px;\n}\n.pr-34 {\n  padding-right: 68px !important;\n}\n.m-34 {\n  margin: 68px;\n}\n.mx-34 {\n  margin-left: 68px;\n  margin-right: 68px;\n}\n.my-34 {\n  margin-top: 68px;\n  margin-bottom: 68px;\n}\n.p-34 {\n  padding: 68px;\n}\n.px-34 {\n  padding-left: 68px;\n  padding-right: 68px;\n}\n.py-34 {\n  padding-top: 68px;\n  padding-bottom: 68px;\n}\n.mt-35 {\n  margin-top: 70px;\n}\n.pt-35 {\n  padding-top: 70px !important;\n}\n.mb-35 {\n  margin-bottom: 70px;\n}\n.pb-35 {\n  padding-bottom: 70px !important;\n}\n.ml-35 {\n  margin-left: 70px;\n}\n.pl-35 {\n  padding-left: 70px !important;\n}\n.mr-35 {\n  margin-right: 70px;\n}\n.pr-35 {\n  padding-right: 70px !important;\n}\n.m-35 {\n  margin: 70px;\n}\n.mx-35 {\n  margin-left: 70px;\n  margin-right: 70px;\n}\n.my-35 {\n  margin-top: 70px;\n  margin-bottom: 70px;\n}\n.p-35 {\n  padding: 70px;\n}\n.px-35 {\n  padding-left: 70px;\n  padding-right: 70px;\n}\n.py-35 {\n  padding-top: 70px;\n  padding-bottom: 70px;\n}\n.mt-36 {\n  margin-top: 72px;\n}\n.pt-36 {\n  padding-top: 72px !important;\n}\n.mb-36 {\n  margin-bottom: 72px;\n}\n.pb-36 {\n  padding-bottom: 72px !important;\n}\n.ml-36 {\n  margin-left: 72px;\n}\n.pl-36 {\n  padding-left: 72px !important;\n}\n.mr-36 {\n  margin-right: 72px;\n}\n.pr-36 {\n  padding-right: 72px !important;\n}\n.m-36 {\n  margin: 72px;\n}\n.mx-36 {\n  margin-left: 72px;\n  margin-right: 72px;\n}\n.my-36 {\n  margin-top: 72px;\n  margin-bottom: 72px;\n}\n.p-36 {\n  padding: 72px;\n}\n.px-36 {\n  padding-left: 72px;\n  padding-right: 72px;\n}\n.py-36 {\n  padding-top: 72px;\n  padding-bottom: 72px;\n}\n.mt-37 {\n  margin-top: 74px;\n}\n.pt-37 {\n  padding-top: 74px !important;\n}\n.mb-37 {\n  margin-bottom: 74px;\n}\n.pb-37 {\n  padding-bottom: 74px !important;\n}\n.ml-37 {\n  margin-left: 74px;\n}\n.pl-37 {\n  padding-left: 74px !important;\n}\n.mr-37 {\n  margin-right: 74px;\n}\n.pr-37 {\n  padding-right: 74px !important;\n}\n.m-37 {\n  margin: 74px;\n}\n.mx-37 {\n  margin-left: 74px;\n  margin-right: 74px;\n}\n.my-37 {\n  margin-top: 74px;\n  margin-bottom: 74px;\n}\n.p-37 {\n  padding: 74px;\n}\n.px-37 {\n  padding-left: 74px;\n  padding-right: 74px;\n}\n.py-37 {\n  padding-top: 74px;\n  padding-bottom: 74px;\n}\n.mt-38 {\n  margin-top: 76px;\n}\n.pt-38 {\n  padding-top: 76px !important;\n}\n.mb-38 {\n  margin-bottom: 76px;\n}\n.pb-38 {\n  padding-bottom: 76px !important;\n}\n.ml-38 {\n  margin-left: 76px;\n}\n.pl-38 {\n  padding-left: 76px !important;\n}\n.mr-38 {\n  margin-right: 76px;\n}\n.pr-38 {\n  padding-right: 76px !important;\n}\n.m-38 {\n  margin: 76px;\n}\n.mx-38 {\n  margin-left: 76px;\n  margin-right: 76px;\n}\n.my-38 {\n  margin-top: 76px;\n  margin-bottom: 76px;\n}\n.p-38 {\n  padding: 76px;\n}\n.px-38 {\n  padding-left: 76px;\n  padding-right: 76px;\n}\n.py-38 {\n  padding-top: 76px;\n  padding-bottom: 76px;\n}\n.mt-39 {\n  margin-top: 78px;\n}\n.pt-39 {\n  padding-top: 78px !important;\n}\n.mb-39 {\n  margin-bottom: 78px;\n}\n.pb-39 {\n  padding-bottom: 78px !important;\n}\n.ml-39 {\n  margin-left: 78px;\n}\n.pl-39 {\n  padding-left: 78px !important;\n}\n.mr-39 {\n  margin-right: 78px;\n}\n.pr-39 {\n  padding-right: 78px !important;\n}\n.m-39 {\n  margin: 78px;\n}\n.mx-39 {\n  margin-left: 78px;\n  margin-right: 78px;\n}\n.my-39 {\n  margin-top: 78px;\n  margin-bottom: 78px;\n}\n.p-39 {\n  padding: 78px;\n}\n.px-39 {\n  padding-left: 78px;\n  padding-right: 78px;\n}\n.py-39 {\n  padding-top: 78px;\n  padding-bottom: 78px;\n}\n.mt-40 {\n  margin-top: 80px;\n}\n.pt-40 {\n  padding-top: 80px !important;\n}\n.mb-40 {\n  margin-bottom: 80px;\n}\n.pb-40 {\n  padding-bottom: 80px !important;\n}\n.ml-40 {\n  margin-left: 80px;\n}\n.pl-40 {\n  padding-left: 80px !important;\n}\n.mr-40 {\n  margin-right: 80px;\n}\n.pr-40 {\n  padding-right: 80px !important;\n}\n.m-40 {\n  margin: 80px;\n}\n.mx-40 {\n  margin-left: 80px;\n  margin-right: 80px;\n}\n.my-40 {\n  margin-top: 80px;\n  margin-bottom: 80px;\n}\n.p-40 {\n  padding: 80px;\n}\n.px-40 {\n  padding-left: 80px;\n  padding-right: 80px;\n}\n.py-40 {\n  padding-top: 80px;\n  padding-bottom: 80px;\n}\n.mt-41 {\n  margin-top: 82px;\n}\n.pt-41 {\n  padding-top: 82px !important;\n}\n.mb-41 {\n  margin-bottom: 82px;\n}\n.pb-41 {\n  padding-bottom: 82px !important;\n}\n.ml-41 {\n  margin-left: 82px;\n}\n.pl-41 {\n  padding-left: 82px !important;\n}\n.mr-41 {\n  margin-right: 82px;\n}\n.pr-41 {\n  padding-right: 82px !important;\n}\n.m-41 {\n  margin: 82px;\n}\n.mx-41 {\n  margin-left: 82px;\n  margin-right: 82px;\n}\n.my-41 {\n  margin-top: 82px;\n  margin-bottom: 82px;\n}\n.p-41 {\n  padding: 82px;\n}\n.px-41 {\n  padding-left: 82px;\n  padding-right: 82px;\n}\n.py-41 {\n  padding-top: 82px;\n  padding-bottom: 82px;\n}\n.mt-42 {\n  margin-top: 84px;\n}\n.pt-42 {\n  padding-top: 84px !important;\n}\n.mb-42 {\n  margin-bottom: 84px;\n}\n.pb-42 {\n  padding-bottom: 84px !important;\n}\n.ml-42 {\n  margin-left: 84px;\n}\n.pl-42 {\n  padding-left: 84px !important;\n}\n.mr-42 {\n  margin-right: 84px;\n}\n.pr-42 {\n  padding-right: 84px !important;\n}\n.m-42 {\n  margin: 84px;\n}\n.mx-42 {\n  margin-left: 84px;\n  margin-right: 84px;\n}\n.my-42 {\n  margin-top: 84px;\n  margin-bottom: 84px;\n}\n.p-42 {\n  padding: 84px;\n}\n.px-42 {\n  padding-left: 84px;\n  padding-right: 84px;\n}\n.py-42 {\n  padding-top: 84px;\n  padding-bottom: 84px;\n}\n.mt-43 {\n  margin-top: 86px;\n}\n.pt-43 {\n  padding-top: 86px !important;\n}\n.mb-43 {\n  margin-bottom: 86px;\n}\n.pb-43 {\n  padding-bottom: 86px !important;\n}\n.ml-43 {\n  margin-left: 86px;\n}\n.pl-43 {\n  padding-left: 86px !important;\n}\n.mr-43 {\n  margin-right: 86px;\n}\n.pr-43 {\n  padding-right: 86px !important;\n}\n.m-43 {\n  margin: 86px;\n}\n.mx-43 {\n  margin-left: 86px;\n  margin-right: 86px;\n}\n.my-43 {\n  margin-top: 86px;\n  margin-bottom: 86px;\n}\n.p-43 {\n  padding: 86px;\n}\n.px-43 {\n  padding-left: 86px;\n  padding-right: 86px;\n}\n.py-43 {\n  padding-top: 86px;\n  padding-bottom: 86px;\n}\n.mt-44 {\n  margin-top: 88px;\n}\n.pt-44 {\n  padding-top: 88px !important;\n}\n.mb-44 {\n  margin-bottom: 88px;\n}\n.pb-44 {\n  padding-bottom: 88px !important;\n}\n.ml-44 {\n  margin-left: 88px;\n}\n.pl-44 {\n  padding-left: 88px !important;\n}\n.mr-44 {\n  margin-right: 88px;\n}\n.pr-44 {\n  padding-right: 88px !important;\n}\n.m-44 {\n  margin: 88px;\n}\n.mx-44 {\n  margin-left: 88px;\n  margin-right: 88px;\n}\n.my-44 {\n  margin-top: 88px;\n  margin-bottom: 88px;\n}\n.p-44 {\n  padding: 88px;\n}\n.px-44 {\n  padding-left: 88px;\n  padding-right: 88px;\n}\n.py-44 {\n  padding-top: 88px;\n  padding-bottom: 88px;\n}\n.mt-45 {\n  margin-top: 90px;\n}\n.pt-45 {\n  padding-top: 90px !important;\n}\n.mb-45 {\n  margin-bottom: 90px;\n}\n.pb-45 {\n  padding-bottom: 90px !important;\n}\n.ml-45 {\n  margin-left: 90px;\n}\n.pl-45 {\n  padding-left: 90px !important;\n}\n.mr-45 {\n  margin-right: 90px;\n}\n.pr-45 {\n  padding-right: 90px !important;\n}\n.m-45 {\n  margin: 90px;\n}\n.mx-45 {\n  margin-left: 90px;\n  margin-right: 90px;\n}\n.my-45 {\n  margin-top: 90px;\n  margin-bottom: 90px;\n}\n.p-45 {\n  padding: 90px;\n}\n.px-45 {\n  padding-left: 90px;\n  padding-right: 90px;\n}\n.py-45 {\n  padding-top: 90px;\n  padding-bottom: 90px;\n}\n.mt-46 {\n  margin-top: 92px;\n}\n.pt-46 {\n  padding-top: 92px !important;\n}\n.mb-46 {\n  margin-bottom: 92px;\n}\n.pb-46 {\n  padding-bottom: 92px !important;\n}\n.ml-46 {\n  margin-left: 92px;\n}\n.pl-46 {\n  padding-left: 92px !important;\n}\n.mr-46 {\n  margin-right: 92px;\n}\n.pr-46 {\n  padding-right: 92px !important;\n}\n.m-46 {\n  margin: 92px;\n}\n.mx-46 {\n  margin-left: 92px;\n  margin-right: 92px;\n}\n.my-46 {\n  margin-top: 92px;\n  margin-bottom: 92px;\n}\n.p-46 {\n  padding: 92px;\n}\n.px-46 {\n  padding-left: 92px;\n  padding-right: 92px;\n}\n.py-46 {\n  padding-top: 92px;\n  padding-bottom: 92px;\n}\n.mt-47 {\n  margin-top: 94px;\n}\n.pt-47 {\n  padding-top: 94px !important;\n}\n.mb-47 {\n  margin-bottom: 94px;\n}\n.pb-47 {\n  padding-bottom: 94px !important;\n}\n.ml-47 {\n  margin-left: 94px;\n}\n.pl-47 {\n  padding-left: 94px !important;\n}\n.mr-47 {\n  margin-right: 94px;\n}\n.pr-47 {\n  padding-right: 94px !important;\n}\n.m-47 {\n  margin: 94px;\n}\n.mx-47 {\n  margin-left: 94px;\n  margin-right: 94px;\n}\n.my-47 {\n  margin-top: 94px;\n  margin-bottom: 94px;\n}\n.p-47 {\n  padding: 94px;\n}\n.px-47 {\n  padding-left: 94px;\n  padding-right: 94px;\n}\n.py-47 {\n  padding-top: 94px;\n  padding-bottom: 94px;\n}\n.mt-48 {\n  margin-top: 96px;\n}\n.pt-48 {\n  padding-top: 96px !important;\n}\n.mb-48 {\n  margin-bottom: 96px;\n}\n.pb-48 {\n  padding-bottom: 96px !important;\n}\n.ml-48 {\n  margin-left: 96px;\n}\n.pl-48 {\n  padding-left: 96px !important;\n}\n.mr-48 {\n  margin-right: 96px;\n}\n.pr-48 {\n  padding-right: 96px !important;\n}\n.m-48 {\n  margin: 96px;\n}\n.mx-48 {\n  margin-left: 96px;\n  margin-right: 96px;\n}\n.my-48 {\n  margin-top: 96px;\n  margin-bottom: 96px;\n}\n.p-48 {\n  padding: 96px;\n}\n.px-48 {\n  padding-left: 96px;\n  padding-right: 96px;\n}\n.py-48 {\n  padding-top: 96px;\n  padding-bottom: 96px;\n}\n.mt-49 {\n  margin-top: 98px;\n}\n.pt-49 {\n  padding-top: 98px !important;\n}\n.mb-49 {\n  margin-bottom: 98px;\n}\n.pb-49 {\n  padding-bottom: 98px !important;\n}\n.ml-49 {\n  margin-left: 98px;\n}\n.pl-49 {\n  padding-left: 98px !important;\n}\n.mr-49 {\n  margin-right: 98px;\n}\n.pr-49 {\n  padding-right: 98px !important;\n}\n.m-49 {\n  margin: 98px;\n}\n.mx-49 {\n  margin-left: 98px;\n  margin-right: 98px;\n}\n.my-49 {\n  margin-top: 98px;\n  margin-bottom: 98px;\n}\n.p-49 {\n  padding: 98px;\n}\n.px-49 {\n  padding-left: 98px;\n  padding-right: 98px;\n}\n.py-49 {\n  padding-top: 98px;\n  padding-bottom: 98px;\n}\n.mt-50 {\n  margin-top: 100px;\n}\n.pt-50 {\n  padding-top: 100px !important;\n}\n.mb-50 {\n  margin-bottom: 100px;\n}\n.pb-50 {\n  padding-bottom: 100px !important;\n}\n.ml-50 {\n  margin-left: 100px;\n}\n.pl-50 {\n  padding-left: 100px !important;\n}\n.mr-50 {\n  margin-right: 100px;\n}\n.pr-50 {\n  padding-right: 100px !important;\n}\n.m-50 {\n  margin: 100px;\n}\n.mx-50 {\n  margin-left: 100px;\n  margin-right: 100px;\n}\n.my-50 {\n  margin-top: 100px;\n  margin-bottom: 100px;\n}\n.p-50 {\n  padding: 100px;\n}\n.px-50 {\n  padding-left: 100px;\n  padding-right: 100px;\n}\n.py-50 {\n  padding-top: 100px;\n  padding-bottom: 100px;\n}\n.fs-1 {\n  font-size: 1px;\n}\n.fs-2 {\n  font-size: 2px;\n}\n.fs-3 {\n  font-size: 3px;\n}\n.fs-4 {\n  font-size: 4px;\n}\n.fs-5 {\n  font-size: 5px;\n}\n.fs-6 {\n  font-size: 6px;\n}\n.fs-7 {\n  font-size: 7px;\n}\n.fs-8 {\n  font-size: 8px;\n}\n.fs-9 {\n  font-size: 9px;\n}\n.fs-10 {\n  font-size: 10px;\n}\n.fs-11 {\n  font-size: 11px;\n}\n.fs-12 {\n  font-size: 12px;\n}\n.fs-13 {\n  font-size: 13px;\n}\n.fs-14 {\n  font-size: 14px;\n}\n.fs-15 {\n  font-size: 15px;\n}\n.fs-16 {\n  font-size: 16px;\n}\n.fs-17 {\n  font-size: 17px;\n}\n.fs-18 {\n  font-size: 18px;\n}\n.fs-19 {\n  font-size: 19px;\n}\n.fs-20 {\n  font-size: 20px;\n}\n.fs-21 {\n  font-size: 21px;\n}\n.fs-22 {\n  font-size: 22px;\n}\n.fs-23 {\n  font-size: 23px;\n}\n.fs-24 {\n  font-size: 24px;\n}\n.fs-25 {\n  font-size: 25px;\n}\n.fs-26 {\n  font-size: 26px;\n}\n.fs-27 {\n  font-size: 27px;\n}\n.fs-28 {\n  font-size: 28px;\n}\n.fs-29 {\n  font-size: 29px;\n}\n.fs-30 {\n  font-size: 30px;\n}\n.fs-31 {\n  font-size: 31px;\n}\n.fs-32 {\n  font-size: 32px;\n}\n.fs-33 {\n  font-size: 33px;\n}\n.fs-34 {\n  font-size: 34px;\n}\n.fs-35 {\n  font-size: 35px;\n}\n.fs-36 {\n  font-size: 36px;\n}\n.fs-37 {\n  font-size: 37px;\n}\n.fs-38 {\n  font-size: 38px;\n}\n.fs-39 {\n  font-size: 39px;\n}\n.fs-40 {\n  font-size: 40px;\n}\n.w-1 {\n  width: 1% !important;\n}\n.h-1 {\n  height: 1% !important;\n}\n.mw-1 {\n  max-width: 1% !important;\n}\n.mh-1 {\n  max-height: 1% !important;\n}\n.miw-1 {\n  min-width: 1% !important;\n}\n.mih-1 {\n  min-height: 1% !important;\n}\n.w-2 {\n  width: 2% !important;\n}\n.h-2 {\n  height: 2% !important;\n}\n.mw-2 {\n  max-width: 2% !important;\n}\n.mh-2 {\n  max-height: 2% !important;\n}\n.miw-2 {\n  min-width: 2% !important;\n}\n.mih-2 {\n  min-height: 2% !important;\n}\n.w-3 {\n  width: 3% !important;\n}\n.h-3 {\n  height: 3% !important;\n}\n.mw-3 {\n  max-width: 3% !important;\n}\n.mh-3 {\n  max-height: 3% !important;\n}\n.miw-3 {\n  min-width: 3% !important;\n}\n.mih-3 {\n  min-height: 3% !important;\n}\n.w-4 {\n  width: 4% !important;\n}\n.h-4 {\n  height: 4% !important;\n}\n.mw-4 {\n  max-width: 4% !important;\n}\n.mh-4 {\n  max-height: 4% !important;\n}\n.miw-4 {\n  min-width: 4% !important;\n}\n.mih-4 {\n  min-height: 4% !important;\n}\n.w-5 {\n  width: 5% !important;\n}\n.h-5 {\n  height: 5% !important;\n}\n.mw-5 {\n  max-width: 5% !important;\n}\n.mh-5 {\n  max-height: 5% !important;\n}\n.miw-5 {\n  min-width: 5% !important;\n}\n.mih-5 {\n  min-height: 5% !important;\n}\n.w-6 {\n  width: 6% !important;\n}\n.h-6 {\n  height: 6% !important;\n}\n.mw-6 {\n  max-width: 6% !important;\n}\n.mh-6 {\n  max-height: 6% !important;\n}\n.miw-6 {\n  min-width: 6% !important;\n}\n.mih-6 {\n  min-height: 6% !important;\n}\n.w-7 {\n  width: 7% !important;\n}\n.h-7 {\n  height: 7% !important;\n}\n.mw-7 {\n  max-width: 7% !important;\n}\n.mh-7 {\n  max-height: 7% !important;\n}\n.miw-7 {\n  min-width: 7% !important;\n}\n.mih-7 {\n  min-height: 7% !important;\n}\n.w-8 {\n  width: 8% !important;\n}\n.h-8 {\n  height: 8% !important;\n}\n.mw-8 {\n  max-width: 8% !important;\n}\n.mh-8 {\n  max-height: 8% !important;\n}\n.miw-8 {\n  min-width: 8% !important;\n}\n.mih-8 {\n  min-height: 8% !important;\n}\n.w-9 {\n  width: 9% !important;\n}\n.h-9 {\n  height: 9% !important;\n}\n.mw-9 {\n  max-width: 9% !important;\n}\n.mh-9 {\n  max-height: 9% !important;\n}\n.miw-9 {\n  min-width: 9% !important;\n}\n.mih-9 {\n  min-height: 9% !important;\n}\n.w-10 {\n  width: 10% !important;\n}\n.h-10 {\n  height: 10% !important;\n}\n.mw-10 {\n  max-width: 10% !important;\n}\n.mh-10 {\n  max-height: 10% !important;\n}\n.miw-10 {\n  min-width: 10% !important;\n}\n.mih-10 {\n  min-height: 10% !important;\n}\n.w-11 {\n  width: 11% !important;\n}\n.h-11 {\n  height: 11% !important;\n}\n.mw-11 {\n  max-width: 11% !important;\n}\n.mh-11 {\n  max-height: 11% !important;\n}\n.miw-11 {\n  min-width: 11% !important;\n}\n.mih-11 {\n  min-height: 11% !important;\n}\n.w-12 {\n  width: 12% !important;\n}\n.h-12 {\n  height: 12% !important;\n}\n.mw-12 {\n  max-width: 12% !important;\n}\n.mh-12 {\n  max-height: 12% !important;\n}\n.miw-12 {\n  min-width: 12% !important;\n}\n.mih-12 {\n  min-height: 12% !important;\n}\n.w-13 {\n  width: 13% !important;\n}\n.h-13 {\n  height: 13% !important;\n}\n.mw-13 {\n  max-width: 13% !important;\n}\n.mh-13 {\n  max-height: 13% !important;\n}\n.miw-13 {\n  min-width: 13% !important;\n}\n.mih-13 {\n  min-height: 13% !important;\n}\n.w-14 {\n  width: 14% !important;\n}\n.h-14 {\n  height: 14% !important;\n}\n.mw-14 {\n  max-width: 14% !important;\n}\n.mh-14 {\n  max-height: 14% !important;\n}\n.miw-14 {\n  min-width: 14% !important;\n}\n.mih-14 {\n  min-height: 14% !important;\n}\n.w-15 {\n  width: 15% !important;\n}\n.h-15 {\n  height: 15% !important;\n}\n.mw-15 {\n  max-width: 15% !important;\n}\n.mh-15 {\n  max-height: 15% !important;\n}\n.miw-15 {\n  min-width: 15% !important;\n}\n.mih-15 {\n  min-height: 15% !important;\n}\n.w-16 {\n  width: 16% !important;\n}\n.h-16 {\n  height: 16% !important;\n}\n.mw-16 {\n  max-width: 16% !important;\n}\n.mh-16 {\n  max-height: 16% !important;\n}\n.miw-16 {\n  min-width: 16% !important;\n}\n.mih-16 {\n  min-height: 16% !important;\n}\n.w-17 {\n  width: 17% !important;\n}\n.h-17 {\n  height: 17% !important;\n}\n.mw-17 {\n  max-width: 17% !important;\n}\n.mh-17 {\n  max-height: 17% !important;\n}\n.miw-17 {\n  min-width: 17% !important;\n}\n.mih-17 {\n  min-height: 17% !important;\n}\n.w-18 {\n  width: 18% !important;\n}\n.h-18 {\n  height: 18% !important;\n}\n.mw-18 {\n  max-width: 18% !important;\n}\n.mh-18 {\n  max-height: 18% !important;\n}\n.miw-18 {\n  min-width: 18% !important;\n}\n.mih-18 {\n  min-height: 18% !important;\n}\n.w-19 {\n  width: 19% !important;\n}\n.h-19 {\n  height: 19% !important;\n}\n.mw-19 {\n  max-width: 19% !important;\n}\n.mh-19 {\n  max-height: 19% !important;\n}\n.miw-19 {\n  min-width: 19% !important;\n}\n.mih-19 {\n  min-height: 19% !important;\n}\n.w-20 {\n  width: 20% !important;\n}\n.h-20 {\n  height: 20% !important;\n}\n.mw-20 {\n  max-width: 20% !important;\n}\n.mh-20 {\n  max-height: 20% !important;\n}\n.miw-20 {\n  min-width: 20% !important;\n}\n.mih-20 {\n  min-height: 20% !important;\n}\n.w-21 {\n  width: 21% !important;\n}\n.h-21 {\n  height: 21% !important;\n}\n.mw-21 {\n  max-width: 21% !important;\n}\n.mh-21 {\n  max-height: 21% !important;\n}\n.miw-21 {\n  min-width: 21% !important;\n}\n.mih-21 {\n  min-height: 21% !important;\n}\n.w-22 {\n  width: 22% !important;\n}\n.h-22 {\n  height: 22% !important;\n}\n.mw-22 {\n  max-width: 22% !important;\n}\n.mh-22 {\n  max-height: 22% !important;\n}\n.miw-22 {\n  min-width: 22% !important;\n}\n.mih-22 {\n  min-height: 22% !important;\n}\n.w-23 {\n  width: 23% !important;\n}\n.h-23 {\n  height: 23% !important;\n}\n.mw-23 {\n  max-width: 23% !important;\n}\n.mh-23 {\n  max-height: 23% !important;\n}\n.miw-23 {\n  min-width: 23% !important;\n}\n.mih-23 {\n  min-height: 23% !important;\n}\n.w-24 {\n  width: 24% !important;\n}\n.h-24 {\n  height: 24% !important;\n}\n.mw-24 {\n  max-width: 24% !important;\n}\n.mh-24 {\n  max-height: 24% !important;\n}\n.miw-24 {\n  min-width: 24% !important;\n}\n.mih-24 {\n  min-height: 24% !important;\n}\n.w-25 {\n  width: 25% !important;\n}\n.h-25 {\n  height: 25% !important;\n}\n.mw-25 {\n  max-width: 25% !important;\n}\n.mh-25 {\n  max-height: 25% !important;\n}\n.miw-25 {\n  min-width: 25% !important;\n}\n.mih-25 {\n  min-height: 25% !important;\n}\n.w-26 {\n  width: 26% !important;\n}\n.h-26 {\n  height: 26% !important;\n}\n.mw-26 {\n  max-width: 26% !important;\n}\n.mh-26 {\n  max-height: 26% !important;\n}\n.miw-26 {\n  min-width: 26% !important;\n}\n.mih-26 {\n  min-height: 26% !important;\n}\n.w-27 {\n  width: 27% !important;\n}\n.h-27 {\n  height: 27% !important;\n}\n.mw-27 {\n  max-width: 27% !important;\n}\n.mh-27 {\n  max-height: 27% !important;\n}\n.miw-27 {\n  min-width: 27% !important;\n}\n.mih-27 {\n  min-height: 27% !important;\n}\n.w-28 {\n  width: 28% !important;\n}\n.h-28 {\n  height: 28% !important;\n}\n.mw-28 {\n  max-width: 28% !important;\n}\n.mh-28 {\n  max-height: 28% !important;\n}\n.miw-28 {\n  min-width: 28% !important;\n}\n.mih-28 {\n  min-height: 28% !important;\n}\n.w-29 {\n  width: 29% !important;\n}\n.h-29 {\n  height: 29% !important;\n}\n.mw-29 {\n  max-width: 29% !important;\n}\n.mh-29 {\n  max-height: 29% !important;\n}\n.miw-29 {\n  min-width: 29% !important;\n}\n.mih-29 {\n  min-height: 29% !important;\n}\n.w-30 {\n  width: 30% !important;\n}\n.h-30 {\n  height: 30% !important;\n}\n.mw-30 {\n  max-width: 30% !important;\n}\n.mh-30 {\n  max-height: 30% !important;\n}\n.miw-30 {\n  min-width: 30% !important;\n}\n.mih-30 {\n  min-height: 30% !important;\n}\n.w-31 {\n  width: 31% !important;\n}\n.h-31 {\n  height: 31% !important;\n}\n.mw-31 {\n  max-width: 31% !important;\n}\n.mh-31 {\n  max-height: 31% !important;\n}\n.miw-31 {\n  min-width: 31% !important;\n}\n.mih-31 {\n  min-height: 31% !important;\n}\n.w-32 {\n  width: 32% !important;\n}\n.h-32 {\n  height: 32% !important;\n}\n.mw-32 {\n  max-width: 32% !important;\n}\n.mh-32 {\n  max-height: 32% !important;\n}\n.miw-32 {\n  min-width: 32% !important;\n}\n.mih-32 {\n  min-height: 32% !important;\n}\n.w-33 {\n  width: 33% !important;\n}\n.h-33 {\n  height: 33% !important;\n}\n.mw-33 {\n  max-width: 33% !important;\n}\n.mh-33 {\n  max-height: 33% !important;\n}\n.miw-33 {\n  min-width: 33% !important;\n}\n.mih-33 {\n  min-height: 33% !important;\n}\n.w-34 {\n  width: 34% !important;\n}\n.h-34 {\n  height: 34% !important;\n}\n.mw-34 {\n  max-width: 34% !important;\n}\n.mh-34 {\n  max-height: 34% !important;\n}\n.miw-34 {\n  min-width: 34% !important;\n}\n.mih-34 {\n  min-height: 34% !important;\n}\n.w-35 {\n  width: 35% !important;\n}\n.h-35 {\n  height: 35% !important;\n}\n.mw-35 {\n  max-width: 35% !important;\n}\n.mh-35 {\n  max-height: 35% !important;\n}\n.miw-35 {\n  min-width: 35% !important;\n}\n.mih-35 {\n  min-height: 35% !important;\n}\n.w-36 {\n  width: 36% !important;\n}\n.h-36 {\n  height: 36% !important;\n}\n.mw-36 {\n  max-width: 36% !important;\n}\n.mh-36 {\n  max-height: 36% !important;\n}\n.miw-36 {\n  min-width: 36% !important;\n}\n.mih-36 {\n  min-height: 36% !important;\n}\n.w-37 {\n  width: 37% !important;\n}\n.h-37 {\n  height: 37% !important;\n}\n.mw-37 {\n  max-width: 37% !important;\n}\n.mh-37 {\n  max-height: 37% !important;\n}\n.miw-37 {\n  min-width: 37% !important;\n}\n.mih-37 {\n  min-height: 37% !important;\n}\n.w-38 {\n  width: 38% !important;\n}\n.h-38 {\n  height: 38% !important;\n}\n.mw-38 {\n  max-width: 38% !important;\n}\n.mh-38 {\n  max-height: 38% !important;\n}\n.miw-38 {\n  min-width: 38% !important;\n}\n.mih-38 {\n  min-height: 38% !important;\n}\n.w-39 {\n  width: 39% !important;\n}\n.h-39 {\n  height: 39% !important;\n}\n.mw-39 {\n  max-width: 39% !important;\n}\n.mh-39 {\n  max-height: 39% !important;\n}\n.miw-39 {\n  min-width: 39% !important;\n}\n.mih-39 {\n  min-height: 39% !important;\n}\n.w-40 {\n  width: 40% !important;\n}\n.h-40 {\n  height: 40% !important;\n}\n.mw-40 {\n  max-width: 40% !important;\n}\n.mh-40 {\n  max-height: 40% !important;\n}\n.miw-40 {\n  min-width: 40% !important;\n}\n.mih-40 {\n  min-height: 40% !important;\n}\n.w-41 {\n  width: 41% !important;\n}\n.h-41 {\n  height: 41% !important;\n}\n.mw-41 {\n  max-width: 41% !important;\n}\n.mh-41 {\n  max-height: 41% !important;\n}\n.miw-41 {\n  min-width: 41% !important;\n}\n.mih-41 {\n  min-height: 41% !important;\n}\n.w-42 {\n  width: 42% !important;\n}\n.h-42 {\n  height: 42% !important;\n}\n.mw-42 {\n  max-width: 42% !important;\n}\n.mh-42 {\n  max-height: 42% !important;\n}\n.miw-42 {\n  min-width: 42% !important;\n}\n.mih-42 {\n  min-height: 42% !important;\n}\n.w-43 {\n  width: 43% !important;\n}\n.h-43 {\n  height: 43% !important;\n}\n.mw-43 {\n  max-width: 43% !important;\n}\n.mh-43 {\n  max-height: 43% !important;\n}\n.miw-43 {\n  min-width: 43% !important;\n}\n.mih-43 {\n  min-height: 43% !important;\n}\n.w-44 {\n  width: 44% !important;\n}\n.h-44 {\n  height: 44% !important;\n}\n.mw-44 {\n  max-width: 44% !important;\n}\n.mh-44 {\n  max-height: 44% !important;\n}\n.miw-44 {\n  min-width: 44% !important;\n}\n.mih-44 {\n  min-height: 44% !important;\n}\n.w-45 {\n  width: 45% !important;\n}\n.h-45 {\n  height: 45% !important;\n}\n.mw-45 {\n  max-width: 45% !important;\n}\n.mh-45 {\n  max-height: 45% !important;\n}\n.miw-45 {\n  min-width: 45% !important;\n}\n.mih-45 {\n  min-height: 45% !important;\n}\n.w-46 {\n  width: 46% !important;\n}\n.h-46 {\n  height: 46% !important;\n}\n.mw-46 {\n  max-width: 46% !important;\n}\n.mh-46 {\n  max-height: 46% !important;\n}\n.miw-46 {\n  min-width: 46% !important;\n}\n.mih-46 {\n  min-height: 46% !important;\n}\n.w-47 {\n  width: 47% !important;\n}\n.h-47 {\n  height: 47% !important;\n}\n.mw-47 {\n  max-width: 47% !important;\n}\n.mh-47 {\n  max-height: 47% !important;\n}\n.miw-47 {\n  min-width: 47% !important;\n}\n.mih-47 {\n  min-height: 47% !important;\n}\n.w-48 {\n  width: 48% !important;\n}\n.h-48 {\n  height: 48% !important;\n}\n.mw-48 {\n  max-width: 48% !important;\n}\n.mh-48 {\n  max-height: 48% !important;\n}\n.miw-48 {\n  min-width: 48% !important;\n}\n.mih-48 {\n  min-height: 48% !important;\n}\n.w-49 {\n  width: 49% !important;\n}\n.h-49 {\n  height: 49% !important;\n}\n.mw-49 {\n  max-width: 49% !important;\n}\n.mh-49 {\n  max-height: 49% !important;\n}\n.miw-49 {\n  min-width: 49% !important;\n}\n.mih-49 {\n  min-height: 49% !important;\n}\n.w-50 {\n  width: 50% !important;\n}\n.h-50 {\n  height: 50% !important;\n}\n.mw-50 {\n  max-width: 50% !important;\n}\n.mh-50 {\n  max-height: 50% !important;\n}\n.miw-50 {\n  min-width: 50% !important;\n}\n.mih-50 {\n  min-height: 50% !important;\n}\n.w-51 {\n  width: 51% !important;\n}\n.h-51 {\n  height: 51% !important;\n}\n.mw-51 {\n  max-width: 51% !important;\n}\n.mh-51 {\n  max-height: 51% !important;\n}\n.miw-51 {\n  min-width: 51% !important;\n}\n.mih-51 {\n  min-height: 51% !important;\n}\n.w-52 {\n  width: 52% !important;\n}\n.h-52 {\n  height: 52% !important;\n}\n.mw-52 {\n  max-width: 52% !important;\n}\n.mh-52 {\n  max-height: 52% !important;\n}\n.miw-52 {\n  min-width: 52% !important;\n}\n.mih-52 {\n  min-height: 52% !important;\n}\n.w-53 {\n  width: 53% !important;\n}\n.h-53 {\n  height: 53% !important;\n}\n.mw-53 {\n  max-width: 53% !important;\n}\n.mh-53 {\n  max-height: 53% !important;\n}\n.miw-53 {\n  min-width: 53% !important;\n}\n.mih-53 {\n  min-height: 53% !important;\n}\n.w-54 {\n  width: 54% !important;\n}\n.h-54 {\n  height: 54% !important;\n}\n.mw-54 {\n  max-width: 54% !important;\n}\n.mh-54 {\n  max-height: 54% !important;\n}\n.miw-54 {\n  min-width: 54% !important;\n}\n.mih-54 {\n  min-height: 54% !important;\n}\n.w-55 {\n  width: 55% !important;\n}\n.h-55 {\n  height: 55% !important;\n}\n.mw-55 {\n  max-width: 55% !important;\n}\n.mh-55 {\n  max-height: 55% !important;\n}\n.miw-55 {\n  min-width: 55% !important;\n}\n.mih-55 {\n  min-height: 55% !important;\n}\n.w-56 {\n  width: 56% !important;\n}\n.h-56 {\n  height: 56% !important;\n}\n.mw-56 {\n  max-width: 56% !important;\n}\n.mh-56 {\n  max-height: 56% !important;\n}\n.miw-56 {\n  min-width: 56% !important;\n}\n.mih-56 {\n  min-height: 56% !important;\n}\n.w-57 {\n  width: 57% !important;\n}\n.h-57 {\n  height: 57% !important;\n}\n.mw-57 {\n  max-width: 57% !important;\n}\n.mh-57 {\n  max-height: 57% !important;\n}\n.miw-57 {\n  min-width: 57% !important;\n}\n.mih-57 {\n  min-height: 57% !important;\n}\n.w-58 {\n  width: 58% !important;\n}\n.h-58 {\n  height: 58% !important;\n}\n.mw-58 {\n  max-width: 58% !important;\n}\n.mh-58 {\n  max-height: 58% !important;\n}\n.miw-58 {\n  min-width: 58% !important;\n}\n.mih-58 {\n  min-height: 58% !important;\n}\n.w-59 {\n  width: 59% !important;\n}\n.h-59 {\n  height: 59% !important;\n}\n.mw-59 {\n  max-width: 59% !important;\n}\n.mh-59 {\n  max-height: 59% !important;\n}\n.miw-59 {\n  min-width: 59% !important;\n}\n.mih-59 {\n  min-height: 59% !important;\n}\n.w-60 {\n  width: 60% !important;\n}\n.h-60 {\n  height: 60% !important;\n}\n.mw-60 {\n  max-width: 60% !important;\n}\n.mh-60 {\n  max-height: 60% !important;\n}\n.miw-60 {\n  min-width: 60% !important;\n}\n.mih-60 {\n  min-height: 60% !important;\n}\n.w-61 {\n  width: 61% !important;\n}\n.h-61 {\n  height: 61% !important;\n}\n.mw-61 {\n  max-width: 61% !important;\n}\n.mh-61 {\n  max-height: 61% !important;\n}\n.miw-61 {\n  min-width: 61% !important;\n}\n.mih-61 {\n  min-height: 61% !important;\n}\n.w-62 {\n  width: 62% !important;\n}\n.h-62 {\n  height: 62% !important;\n}\n.mw-62 {\n  max-width: 62% !important;\n}\n.mh-62 {\n  max-height: 62% !important;\n}\n.miw-62 {\n  min-width: 62% !important;\n}\n.mih-62 {\n  min-height: 62% !important;\n}\n.w-63 {\n  width: 63% !important;\n}\n.h-63 {\n  height: 63% !important;\n}\n.mw-63 {\n  max-width: 63% !important;\n}\n.mh-63 {\n  max-height: 63% !important;\n}\n.miw-63 {\n  min-width: 63% !important;\n}\n.mih-63 {\n  min-height: 63% !important;\n}\n.w-64 {\n  width: 64% !important;\n}\n.h-64 {\n  height: 64% !important;\n}\n.mw-64 {\n  max-width: 64% !important;\n}\n.mh-64 {\n  max-height: 64% !important;\n}\n.miw-64 {\n  min-width: 64% !important;\n}\n.mih-64 {\n  min-height: 64% !important;\n}\n.w-65 {\n  width: 65% !important;\n}\n.h-65 {\n  height: 65% !important;\n}\n.mw-65 {\n  max-width: 65% !important;\n}\n.mh-65 {\n  max-height: 65% !important;\n}\n.miw-65 {\n  min-width: 65% !important;\n}\n.mih-65 {\n  min-height: 65% !important;\n}\n.w-66 {\n  width: 66% !important;\n}\n.h-66 {\n  height: 66% !important;\n}\n.mw-66 {\n  max-width: 66% !important;\n}\n.mh-66 {\n  max-height: 66% !important;\n}\n.miw-66 {\n  min-width: 66% !important;\n}\n.mih-66 {\n  min-height: 66% !important;\n}\n.w-67 {\n  width: 67% !important;\n}\n.h-67 {\n  height: 67% !important;\n}\n.mw-67 {\n  max-width: 67% !important;\n}\n.mh-67 {\n  max-height: 67% !important;\n}\n.miw-67 {\n  min-width: 67% !important;\n}\n.mih-67 {\n  min-height: 67% !important;\n}\n.w-68 {\n  width: 68% !important;\n}\n.h-68 {\n  height: 68% !important;\n}\n.mw-68 {\n  max-width: 68% !important;\n}\n.mh-68 {\n  max-height: 68% !important;\n}\n.miw-68 {\n  min-width: 68% !important;\n}\n.mih-68 {\n  min-height: 68% !important;\n}\n.w-69 {\n  width: 69% !important;\n}\n.h-69 {\n  height: 69% !important;\n}\n.mw-69 {\n  max-width: 69% !important;\n}\n.mh-69 {\n  max-height: 69% !important;\n}\n.miw-69 {\n  min-width: 69% !important;\n}\n.mih-69 {\n  min-height: 69% !important;\n}\n.w-70 {\n  width: 70% !important;\n}\n.h-70 {\n  height: 70% !important;\n}\n.mw-70 {\n  max-width: 70% !important;\n}\n.mh-70 {\n  max-height: 70% !important;\n}\n.miw-70 {\n  min-width: 70% !important;\n}\n.mih-70 {\n  min-height: 70% !important;\n}\n.w-71 {\n  width: 71% !important;\n}\n.h-71 {\n  height: 71% !important;\n}\n.mw-71 {\n  max-width: 71% !important;\n}\n.mh-71 {\n  max-height: 71% !important;\n}\n.miw-71 {\n  min-width: 71% !important;\n}\n.mih-71 {\n  min-height: 71% !important;\n}\n.w-72 {\n  width: 72% !important;\n}\n.h-72 {\n  height: 72% !important;\n}\n.mw-72 {\n  max-width: 72% !important;\n}\n.mh-72 {\n  max-height: 72% !important;\n}\n.miw-72 {\n  min-width: 72% !important;\n}\n.mih-72 {\n  min-height: 72% !important;\n}\n.w-73 {\n  width: 73% !important;\n}\n.h-73 {\n  height: 73% !important;\n}\n.mw-73 {\n  max-width: 73% !important;\n}\n.mh-73 {\n  max-height: 73% !important;\n}\n.miw-73 {\n  min-width: 73% !important;\n}\n.mih-73 {\n  min-height: 73% !important;\n}\n.w-74 {\n  width: 74% !important;\n}\n.h-74 {\n  height: 74% !important;\n}\n.mw-74 {\n  max-width: 74% !important;\n}\n.mh-74 {\n  max-height: 74% !important;\n}\n.miw-74 {\n  min-width: 74% !important;\n}\n.mih-74 {\n  min-height: 74% !important;\n}\n.w-75 {\n  width: 75% !important;\n}\n.h-75 {\n  height: 75% !important;\n}\n.mw-75 {\n  max-width: 75% !important;\n}\n.mh-75 {\n  max-height: 75% !important;\n}\n.miw-75 {\n  min-width: 75% !important;\n}\n.mih-75 {\n  min-height: 75% !important;\n}\n.w-76 {\n  width: 76% !important;\n}\n.h-76 {\n  height: 76% !important;\n}\n.mw-76 {\n  max-width: 76% !important;\n}\n.mh-76 {\n  max-height: 76% !important;\n}\n.miw-76 {\n  min-width: 76% !important;\n}\n.mih-76 {\n  min-height: 76% !important;\n}\n.w-77 {\n  width: 77% !important;\n}\n.h-77 {\n  height: 77% !important;\n}\n.mw-77 {\n  max-width: 77% !important;\n}\n.mh-77 {\n  max-height: 77% !important;\n}\n.miw-77 {\n  min-width: 77% !important;\n}\n.mih-77 {\n  min-height: 77% !important;\n}\n.w-78 {\n  width: 78% !important;\n}\n.h-78 {\n  height: 78% !important;\n}\n.mw-78 {\n  max-width: 78% !important;\n}\n.mh-78 {\n  max-height: 78% !important;\n}\n.miw-78 {\n  min-width: 78% !important;\n}\n.mih-78 {\n  min-height: 78% !important;\n}\n.w-79 {\n  width: 79% !important;\n}\n.h-79 {\n  height: 79% !important;\n}\n.mw-79 {\n  max-width: 79% !important;\n}\n.mh-79 {\n  max-height: 79% !important;\n}\n.miw-79 {\n  min-width: 79% !important;\n}\n.mih-79 {\n  min-height: 79% !important;\n}\n.w-80 {\n  width: 80% !important;\n}\n.h-80 {\n  height: 80% !important;\n}\n.mw-80 {\n  max-width: 80% !important;\n}\n.mh-80 {\n  max-height: 80% !important;\n}\n.miw-80 {\n  min-width: 80% !important;\n}\n.mih-80 {\n  min-height: 80% !important;\n}\n.w-81 {\n  width: 81% !important;\n}\n.h-81 {\n  height: 81% !important;\n}\n.mw-81 {\n  max-width: 81% !important;\n}\n.mh-81 {\n  max-height: 81% !important;\n}\n.miw-81 {\n  min-width: 81% !important;\n}\n.mih-81 {\n  min-height: 81% !important;\n}\n.w-82 {\n  width: 82% !important;\n}\n.h-82 {\n  height: 82% !important;\n}\n.mw-82 {\n  max-width: 82% !important;\n}\n.mh-82 {\n  max-height: 82% !important;\n}\n.miw-82 {\n  min-width: 82% !important;\n}\n.mih-82 {\n  min-height: 82% !important;\n}\n.w-83 {\n  width: 83% !important;\n}\n.h-83 {\n  height: 83% !important;\n}\n.mw-83 {\n  max-width: 83% !important;\n}\n.mh-83 {\n  max-height: 83% !important;\n}\n.miw-83 {\n  min-width: 83% !important;\n}\n.mih-83 {\n  min-height: 83% !important;\n}\n.w-84 {\n  width: 84% !important;\n}\n.h-84 {\n  height: 84% !important;\n}\n.mw-84 {\n  max-width: 84% !important;\n}\n.mh-84 {\n  max-height: 84% !important;\n}\n.miw-84 {\n  min-width: 84% !important;\n}\n.mih-84 {\n  min-height: 84% !important;\n}\n.w-85 {\n  width: 85% !important;\n}\n.h-85 {\n  height: 85% !important;\n}\n.mw-85 {\n  max-width: 85% !important;\n}\n.mh-85 {\n  max-height: 85% !important;\n}\n.miw-85 {\n  min-width: 85% !important;\n}\n.mih-85 {\n  min-height: 85% !important;\n}\n.w-86 {\n  width: 86% !important;\n}\n.h-86 {\n  height: 86% !important;\n}\n.mw-86 {\n  max-width: 86% !important;\n}\n.mh-86 {\n  max-height: 86% !important;\n}\n.miw-86 {\n  min-width: 86% !important;\n}\n.mih-86 {\n  min-height: 86% !important;\n}\n.w-87 {\n  width: 87% !important;\n}\n.h-87 {\n  height: 87% !important;\n}\n.mw-87 {\n  max-width: 87% !important;\n}\n.mh-87 {\n  max-height: 87% !important;\n}\n.miw-87 {\n  min-width: 87% !important;\n}\n.mih-87 {\n  min-height: 87% !important;\n}\n.w-88 {\n  width: 88% !important;\n}\n.h-88 {\n  height: 88% !important;\n}\n.mw-88 {\n  max-width: 88% !important;\n}\n.mh-88 {\n  max-height: 88% !important;\n}\n.miw-88 {\n  min-width: 88% !important;\n}\n.mih-88 {\n  min-height: 88% !important;\n}\n.w-89 {\n  width: 89% !important;\n}\n.h-89 {\n  height: 89% !important;\n}\n.mw-89 {\n  max-width: 89% !important;\n}\n.mh-89 {\n  max-height: 89% !important;\n}\n.miw-89 {\n  min-width: 89% !important;\n}\n.mih-89 {\n  min-height: 89% !important;\n}\n.w-90 {\n  width: 90% !important;\n}\n.h-90 {\n  height: 90% !important;\n}\n.mw-90 {\n  max-width: 90% !important;\n}\n.mh-90 {\n  max-height: 90% !important;\n}\n.miw-90 {\n  min-width: 90% !important;\n}\n.mih-90 {\n  min-height: 90% !important;\n}\n.w-91 {\n  width: 91% !important;\n}\n.h-91 {\n  height: 91% !important;\n}\n.mw-91 {\n  max-width: 91% !important;\n}\n.mh-91 {\n  max-height: 91% !important;\n}\n.miw-91 {\n  min-width: 91% !important;\n}\n.mih-91 {\n  min-height: 91% !important;\n}\n.w-92 {\n  width: 92% !important;\n}\n.h-92 {\n  height: 92% !important;\n}\n.mw-92 {\n  max-width: 92% !important;\n}\n.mh-92 {\n  max-height: 92% !important;\n}\n.miw-92 {\n  min-width: 92% !important;\n}\n.mih-92 {\n  min-height: 92% !important;\n}\n.w-93 {\n  width: 93% !important;\n}\n.h-93 {\n  height: 93% !important;\n}\n.mw-93 {\n  max-width: 93% !important;\n}\n.mh-93 {\n  max-height: 93% !important;\n}\n.miw-93 {\n  min-width: 93% !important;\n}\n.mih-93 {\n  min-height: 93% !important;\n}\n.w-94 {\n  width: 94% !important;\n}\n.h-94 {\n  height: 94% !important;\n}\n.mw-94 {\n  max-width: 94% !important;\n}\n.mh-94 {\n  max-height: 94% !important;\n}\n.miw-94 {\n  min-width: 94% !important;\n}\n.mih-94 {\n  min-height: 94% !important;\n}\n.w-95 {\n  width: 95% !important;\n}\n.h-95 {\n  height: 95% !important;\n}\n.mw-95 {\n  max-width: 95% !important;\n}\n.mh-95 {\n  max-height: 95% !important;\n}\n.miw-95 {\n  min-width: 95% !important;\n}\n.mih-95 {\n  min-height: 95% !important;\n}\n.w-96 {\n  width: 96% !important;\n}\n.h-96 {\n  height: 96% !important;\n}\n.mw-96 {\n  max-width: 96% !important;\n}\n.mh-96 {\n  max-height: 96% !important;\n}\n.miw-96 {\n  min-width: 96% !important;\n}\n.mih-96 {\n  min-height: 96% !important;\n}\n.w-97 {\n  width: 97% !important;\n}\n.h-97 {\n  height: 97% !important;\n}\n.mw-97 {\n  max-width: 97% !important;\n}\n.mh-97 {\n  max-height: 97% !important;\n}\n.miw-97 {\n  min-width: 97% !important;\n}\n.mih-97 {\n  min-height: 97% !important;\n}\n.w-98 {\n  width: 98% !important;\n}\n.h-98 {\n  height: 98% !important;\n}\n.mw-98 {\n  max-width: 98% !important;\n}\n.mh-98 {\n  max-height: 98% !important;\n}\n.miw-98 {\n  min-width: 98% !important;\n}\n.mih-98 {\n  min-height: 98% !important;\n}\n.w-99 {\n  width: 99% !important;\n}\n.h-99 {\n  height: 99% !important;\n}\n.mw-99 {\n  max-width: 99% !important;\n}\n.mh-99 {\n  max-height: 99% !important;\n}\n.miw-99 {\n  min-width: 99% !important;\n}\n.mih-99 {\n  min-height: 99% !important;\n}\n.w-100 {\n  width: 100% !important;\n}\n.h-100 {\n  height: 100% !important;\n}\n.mw-100 {\n  max-width: 100% !important;\n}\n.mh-100 {\n  max-height: 100% !important;\n}\n.miw-100 {\n  min-width: 100% !important;\n}\n.mih-100 {\n  min-height: 100% !important;\n}\n.menu-config {\n  height: calc(100vh - 54px - 25px - 40px);\n}\n.parent-div-stage {\n  max-height: calc(100vh - 54px - 25px - 40px);\n  overflow: auto;\n  text-align: center;\n}\n.div-stage {\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center center;\n  cursor: crosshair;\n  margin: auto;\n}\n.choose-file {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #909399;\n  color: #B5B4B4;\n  width: 100%;\n  max-width: 160px;\n  border-radius: 5px;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  cursor: pointer;\n}\n.choose-file:hover {\n  background-color: #EE0033;\n  color: #fff;\n}\n.dialog-config .el-dialog, .dialog-config .el-dialog__body {\n  background: #222222 !important;\n}\n.dialog-config .el-dialog__header {\n  padding-bottom: 20px !important;\n}\n.dialog-config .el-dialog__body {\n  padding-top: 0 !important;\n  padding-bottom: 10px !important;\n}\n.dialog-config .time .el-input {\n  width: 35px !important;\n  height: 32px !important;\n}\n.dialog-config .time .el-input .el-input__wrapper {\n  background-color: transparent !important;\n  box-shadow: 0 0 0 1px #909399 inset !important;\n}\n.dialog-config .time .el-input .el-input__wrapper input {\n  padding: 0 !important;\n  color: #B5B4B4 !important;\n  text-align: center;\n}\n::-webkit-scrollbar {\n  width: 8px !important;\n  height: 8px !important;\n}\n::-webkit-scrollbar-track,\n::-webkit-scrollbar-corner {\n  background: #222222 !important;\n}\n::-webkit-scrollbar-thumb {\n  background: #888 !important;\n}\n::-webkit-scrollbar-thumb:hover {\n  background: #555 !important;\n}\n.vc-color-wrap {\n  width: 70% !important;\n  height: 33px !important;\n  margin-right: 0 !important;\n  border: 1px solid #828282 !important;\n  border-radius: 3px !important;\n}\n.vc-colorpicker--container {\n  background: #4F4F4F !important;\n}\n.vc-colorpicker--container input, .vc-colorpicker--container .vc-input-toggle {\n  color: #B5B4B4 !important;\n}\n.vc-colorpicker--container .vc-input-toggle:hover {\n  background: #828282 !important;\n}\n.flex-center {\n  display: flex !important;\n  justify-content: center;\n  align-items: center;\n}\n.shape-items {\n  max-height: calc(100vh - 64px - 25px - 375px - 60px - 20px - 10px - 45px) !important;\n  overflow-y: auto !important;\n}\n.shape-items .el-row {\n  width: 100%;\n  padding: 10px 8px;\n}\n.shape-items .el-row.is-active {\n  background-color: #4F4F4F;\n}\n.shape-items .el-row:not(:last-child) {\n  border-bottom: 1px solid #828282;\n}\n.shape-items .el-row:hover {\n  background-color: #4F4F4F;\n  opacity: 0.7;\n  cursor: pointer !important;\n}\n.shape-items .el-row img:hover {\n  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(227deg) brightness(105%) contrast(104%);\n}\n.shape-items .el-row .type {\n  margin-right: 4px;\n  text-transform: capitalize;\n  color: #828282 !important;\n}\n.shape-items::-webkit-scrollbar-track, .shape-items::-webkit-scrollbar-corner {\n  background: #353535 !important;\n}\n@media only screen and (max-width: 767px) {\n.col-stage {\n    padding: 0 !important;\n}\n.menu-config {\n    margin-top: 10px;\n    height: auto !important;\n}\n}\n.tab-items {\n  margin-bottom: 5px;\n}\n.tab-items .el-button {\n  color: #B5B4B4 !important;\n  background: #353535;\n  border: none;\n  border-left: 1px solid #4F4F4F;\n}\n.tab-items .el-button:hover {\n  background: #4f4f4f;\n}\n.tab-items .el-button.is_active {\n  color: #fff !important;\n  background: #EE0033;\n  border-left: 1px solid #EE0033;\n}\n.tab-items .el-button.is_active:hover {\n  background: #ff2251;\n  border-color: #EE0033;\n}\n.tab-items .el-button.icon_plus span {\n  padding: 0 5px !important;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=style&index=0&id=b42ee6e0&lang=scss":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=style&index=0&id=b42ee6e0&lang=scss ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media only screen and (max-width: 767px) {\n.dialog-config-type .el-dialog {\n    width: 80% !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.dialog-config-type .el-dialog {\n    width: 60% !important;\n}\n}\n@media only screen and (min-width: 1440px) {\n.dialog-config-type .el-dialog {\n    width: 30% !important;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./resources/assets/icon/Eye.png":
/*!***************************************!*\
  !*** ./resources/assets/icon/Eye.png ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/Eye.png?940cad455cd61d7dc17ad8c1d08c396d");

/***/ }),

/***/ "./resources/assets/icon/EyeSlash.png":
/*!********************************************!*\
  !*** ./resources/assets/icon/EyeSlash.png ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/EyeSlash.png?f563d03f72387decca11b9ef12499c21");

/***/ }),

/***/ "./resources/assets/icon/crowd.png":
/*!*****************************************!*\
  !*** ./resources/assets/icon/crowd.png ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/crowd.png?1fcaae59dcce963083d0051f77592dd0");

/***/ }),

/***/ "./resources/assets/icon/dumptrash.png":
/*!*********************************************!*\
  !*** ./resources/assets/icon/dumptrash.png ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/dumptrash.png?fa54d0d76d534b440b34009a89a660de");

/***/ }),

/***/ "./resources/assets/icon/fight.png":
/*!*****************************************!*\
  !*** ./resources/assets/icon/fight.png ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/fight.png?687f0d28a5bb29d16b8aaaf0505d319b");

/***/ }),

/***/ "./resources/assets/icon/intrusion.png":
/*!*********************************************!*\
  !*** ./resources/assets/icon/intrusion.png ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/intrusion.png?194ade278482c97d6648ca4cd2c10955");

/***/ }),

/***/ "./resources/assets/icon/lost.png":
/*!****************************************!*\
  !*** ./resources/assets/icon/lost.png ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/lost.png?98780028eeb4cd56d773cf5ffc1a9e90");

/***/ }),

/***/ "./resources/assets/icon/plus.png":
/*!****************************************!*\
  !*** ./resources/assets/icon/plus.png ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/plus.png?ac13bf592352b7a99fe0ce6c34a0b22f");

/***/ }),

/***/ "./resources/assets/icon/protest.png":
/*!*******************************************!*\
  !*** ./resources/assets/icon/protest.png ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/protest.png?2cc9aa7764d63e767910fa7ecf866b12");

/***/ }),

/***/ "./resources/assets/icon/security_2.png":
/*!**********************************************!*\
  !*** ./resources/assets/icon/security_2.png ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/security_2.png?ba9ff86bdb8a2ddbc1a6eba9cf7a0e7b");

/***/ }),

/***/ "./resources/assets/icon/steal.png":
/*!*****************************************!*\
  !*** ./resources/assets/icon/steal.png ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/steal.png?38b193885bf03269b0e3e403c9ef43ef");

/***/ }),

/***/ "./resources/assets/icon/traffic.png":
/*!*******************************************!*\
  !*** ./resources/assets/icon/traffic.png ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/traffic.png?5b22155cfbf2c2435b9d176ce5610573");

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_drawing_canvas__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! vue-drawing-canvas */ "./node_modules/vue-drawing-canvas/dist/vue-drawing-canvas.esm.js");
/* harmony import */ var _constants_labels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/constants/labels */ "./resources/js/constants/labels.js");
/* harmony import */ var _services_CameraService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/services/CameraService */ "./resources/js/services/CameraService.js");
/* harmony import */ var _assets_icon_Eye_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~assets/icon/Eye.png */ "./resources/assets/icon/Eye.png");
/* harmony import */ var _assets_icon_EyeSlash_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~assets/icon/EyeSlash.png */ "./resources/assets/icon/EyeSlash.png");
/* harmony import */ var _ConfigTypeModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ConfigTypeModal */ "./resources/js/pages/camera/ConfigTypeModal.vue");
/* harmony import */ var _helpers_utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ~/helpers/utils.js */ "./resources/js/helpers/utils.js");
/* harmony import */ var _assets_icon_intrusion_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ~assets/icon/intrusion.png */ "./resources/assets/icon/intrusion.png");
/* harmony import */ var _assets_icon_dumptrash_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ~assets/icon/dumptrash.png */ "./resources/assets/icon/dumptrash.png");
/* harmony import */ var _assets_icon_lost_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ~assets/icon/lost.png */ "./resources/assets/icon/lost.png");
/* harmony import */ var _assets_icon_crowd_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ~assets/icon/crowd.png */ "./resources/assets/icon/crowd.png");
/* harmony import */ var _assets_icon_steal_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ~assets/icon/steal.png */ "./resources/assets/icon/steal.png");
/* harmony import */ var _assets_icon_fight_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ~assets/icon/fight.png */ "./resources/assets/icon/fight.png");
/* harmony import */ var _assets_icon_protest_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ~assets/icon/protest.png */ "./resources/assets/icon/protest.png");
/* harmony import */ var _constants_constant__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ~/constants/constant */ "./resources/js/constants/constant.js");
/* harmony import */ var vue_toastification__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! vue-toastification */ "./node_modules/vue-toastification/dist/index.mjs");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_16__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


















var toast = (0,vue_toastification__WEBPACK_IMPORTED_MODULE_15__.useToast)();
var width = window.innerWidth;
var height = window.innerHeight;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ConfigModal",
  props: {
    dataProps: {
      type: Object,
      "default": {}
    }
  },
  components: {
    VueDrawingCanvas: vue_drawing_canvas__WEBPACK_IMPORTED_MODULE_17__["default"],
    ConfigTypeModal: _ConfigTypeModal__WEBPACK_IMPORTED_MODULE_5__["default"]
  },
  data: function data(vm) {
    var _ref;
    return _ref = {
      configStage: {
        width: width,
        height: height
      },
      lines: [],
      polygons: [],
      rectangles: [],
      strokeWidthPolygon: 3,
      strokeWidth: 3,
      isDrawing: false,
      opacityShape: 1,
      opacityShapeActive: 0.6,
      labels: _constants_labels__WEBPACK_IMPORTED_MODULE_1__["default"],
      labelChoosen: _constants_labels__WEBPACK_IMPORTED_MODULE_1__["default"][2].value,
      color: _constants_labels__WEBPACK_IMPORTED_MODULE_1__["default"][2].color,
      pureColor: _constants_labels__WEBPACK_IMPORTED_MODULE_1__["default"][2].color,
      typeOfShapes: ['Polygon', 'Line', 'Rectangle'],
      typeOfShapeChoosen: _constants_labels__WEBPACK_IMPORTED_MODULE_1__["default"][2].type,
      typeOfRedLight: [{
        title: 'Đèn đỏ được rẽ phải',
        value: 'right'
      }, {
        title: 'Đèn đỏ được rẽ trái',
        value: 'left'
      }, {
        title: 'Đèn đỏ được đi thẳng',
        value: 'straight'
      }],
      typeOfRedLightChoosen: '',
      shapeNameChoosen: '',
      positionXRectStart: 0,
      positionYRectStart: 0,
      posX: 0,
      posY: 0,
      jsonResultCore: {},
      // bắn sang core
      jsonResult: {},
      // lưu DB
      countAnchor: 0,
      isHoldingShift: false,
      isHoldingCtrl: false,
      isHoldingSpace: false,
      isPolygonCreated: false,
      file: '',
      fileName: '',
      isLoading: false,
      isLoadingDelete: false,
      isShowModalConfirm: false,
      isShowModalConfirmDelete: false,
      imageData: {},
      shapeBefore: {},
      shapeAfter: {},
      stack: null,
      isAllowUndo: false,
      isAllowRedo: false,
      isTransform: false,
      listAnchors: ['middle-right', 'middle-left', 'top-center', 'bottom-center'
      // 'top-left',
      // 'top-right',
      // 'bottom-left',
      // 'bottom-right'
      ],

      widthBreak: 50,
      scale: 100,
      oldScale: 100,
      ratioImg: 0,
      isMouseDown: false,
      isBackground: false,
      isDragScroll: false,
      isClickBorder: false,
      iconHiddenEye: _assets_icon_EyeSlash_png__WEBPACK_IMPORTED_MODULE_4__["default"],
      iconShowEye: _assets_icon_Eye_png__WEBPACK_IMPORTED_MODULE_3__["default"],
      isTraffic: true,
      traffic: _constants_constant__WEBPACK_IMPORTED_MODULE_14__.TRAFFIC,
      securityTypes: [],
      currentConfigType: '',
      score_thres: 0.7,
      startTime1: '',
      endTime1: '',
      startTime2: '',
      endTime2: '',
      type: 'Biểu tình',
      isShowModalConfigType: false,
      listTypes: [{
        icon: _assets_icon_intrusion_png__WEBPACK_IMPORTED_MODULE_7__["default"],
        name: _constants_constant__WEBPACK_IMPORTED_MODULE_14__.INTRUSION,
        visible: true
      }, {
        icon: _assets_icon_dumptrash_png__WEBPACK_IMPORTED_MODULE_8__["default"],
        name: _constants_constant__WEBPACK_IMPORTED_MODULE_14__.DUMPTRASH,
        visible: true
      }, {
        icon: _assets_icon_lost_png__WEBPACK_IMPORTED_MODULE_9__["default"],
        name: _constants_constant__WEBPACK_IMPORTED_MODULE_14__.ABANDON,
        visible: true
      }, {
        icon: _assets_icon_crowd_png__WEBPACK_IMPORTED_MODULE_10__["default"],
        name: _constants_constant__WEBPACK_IMPORTED_MODULE_14__.CROWD,
        visible: true
      }, {
        icon: _assets_icon_steal_png__WEBPACK_IMPORTED_MODULE_11__["default"],
        name: _constants_constant__WEBPACK_IMPORTED_MODULE_14__.STEAL,
        visible: true
      }, {
        icon: _assets_icon_fight_png__WEBPACK_IMPORTED_MODULE_12__["default"],
        name: _constants_constant__WEBPACK_IMPORTED_MODULE_14__.FIGHT,
        visible: true
      }, {
        icon: _assets_icon_protest_png__WEBPACK_IMPORTED_MODULE_13__["default"],
        name: _constants_constant__WEBPACK_IMPORTED_MODULE_14__.PROTEST,
        visible: true
      }],
      dataConfirm: {}
    }, _defineProperty(_ref, "traffic", _constants_constant__WEBPACK_IMPORTED_MODULE_14__.TRAFFIC), _defineProperty(_ref, "intrusion", _constants_constant__WEBPACK_IMPORTED_MODULE_14__.INTRUSION), _defineProperty(_ref, "dumptrash", _constants_constant__WEBPACK_IMPORTED_MODULE_14__.DUMPTRASH), _defineProperty(_ref, "abandon", _constants_constant__WEBPACK_IMPORTED_MODULE_14__.ABANDON), _defineProperty(_ref, "crowd", _constants_constant__WEBPACK_IMPORTED_MODULE_14__.CROWD), _defineProperty(_ref, "steal", _constants_constant__WEBPACK_IMPORTED_MODULE_14__.STEAL), _defineProperty(_ref, "fight", _constants_constant__WEBPACK_IMPORTED_MODULE_14__.FIGHT), _defineProperty(_ref, "protest", _constants_constant__WEBPACK_IMPORTED_MODULE_14__.PROTEST), _defineProperty(_ref, "dist_thres", 0), _defineProperty(_ref, "max_age", 0), _defineProperty(_ref, "n_init", 0), _defineProperty(_ref, "n_members", 0), _defineProperty(_ref, "isAllowConfig", true), _defineProperty(_ref, "isActive", true), _ref;
  },
  mounted: function mounted() {
    var _this2 = this;
    this.addEventListener();
    this.$nextTick(function () {
      _this2.initData();
    });
  },
  watch: {
    file: function file(value) {
      if (value) {
        this.isBackground = true;
      } else {
        this.isBackground = false;
      }
    },
    shapeNameChoosen: function shapeNameChoosen(newVal, oldVal) {
      if (oldVal) {
        var oldShape = this.getShapeByName(oldVal);
        oldShape.fill('transparent');
        oldShape.opacity(1);
      }
      if (newVal) {
        var newShape = this.getShapeByName(newVal);
        newShape.fill(newShape.attrs.stroke);
        newShape.opacity(this.opacityShapeActive);
      }
    },
    isTraffic: function isTraffic(newVal, oldVal) {
      if (newVal) {
        this.labelChoosen = _constants_labels__WEBPACK_IMPORTED_MODULE_1__["default"][2].value;
      } else {
        this.labelChoosen = 'focus';
        this.typeOfShapeChoosen = _constants_labels__WEBPACK_IMPORTED_MODULE_1__["default"][3].type;
      }
    }
  },
  methods: {
    addEventListener: function addEventListener() {
      window.addEventListener('keyup', this.handleKeyupSpace);
      window.addEventListener('keyup', this.handleKeyupShift);
      window.addEventListener('keydown', this.handleKeydownSpace);
      window.addEventListener('keydown', this.handleKeydownShift);
      window.addEventListener('keydown', this.handleKeydownUndo);
      window.addEventListener('keydown', this.handleKeydownRedo);
      window.addEventListener('keydown', this.handleKeypressSave);
      window.addEventListener('keypress', this.handleKeypressDelete);
    },
    removeEventListener: function removeEventListener() {
      window.removeEventListener('keyup', this.handleKeyupSpace);
      window.removeEventListener('keyup', this.handleKeyupShift);
      window.removeEventListener('keydown', this.handleKeydownSpace);
      window.removeEventListener('keydown', this.handleKeydownShift);
      window.removeEventListener('keydown', this.handleKeydownUndo);
      window.removeEventListener('keydown', this.handleKeydownRedo);
      window.removeEventListener('keydown', this.handleKeypressSave);
      window.removeEventListener('keypress', this.handleKeypressDelete);
    },
    handleKeydownSpace: function handleKeydownSpace(e) {
      if (e.code == 'Space') {
        this.isHoldingSpace = true;
        this.isDragScroll = true;
        this.setCursor('grab');
        e.preventDefault();
      }
    },
    handleKeyupSpace: function handleKeyupSpace(e) {
      if (e.code == 'Space' && this.isHoldingSpace) {
        this.isHoldingSpace = false;
        this.isDragScroll = false;
        this.setCursor('crosshair');
      }
    },
    handleKeydownShift: function handleKeydownShift(e) {
      if (this.typeOfShapeChoosen == 'Polygon' && e.key == 'Shift') {
        this.isHoldingShift = true;
        this.isDrawing = true;
      }
    },
    handleKeyupShift: function handleKeyupShift(e) {
      if (this.typeOfShapeChoosen == 'Polygon' && this.isHoldingShift) {
        this.isHoldingShift = false;
        this.isDrawing = false;
        this.isPolygonCreated = false;
        this.countAnchor = 0;
        this.removePolygonOneClick();
      }
    },
    handleKeydownUndo: function handleKeydownUndo(e) {
      if (e.ctrlKey && e.code == 'KeyZ' && !e.shiftKey) {
        this.applyUndoShape();
      }
    },
    handleKeydownRedo: function handleKeydownRedo(e) {
      if (e.ctrlKey && e.shiftKey && e.code == 'KeyZ' || e.ctrlKey && e.code == 'KeyY') {
        this.applyRedoShape();
      }
    },
    handleKeypressDelete: function handleKeypressDelete(e) {
      if (e.key == 'Delete') {
        this.applyDeleteShape();
      }
    },
    handleKeypressSave: function handleKeypressSave(e) {
      if (e.ctrlKey && e.code == 'KeyS') {
        e.preventDefault();
        this.validateForm();
      }
    },
    showModalConfigType: function showModalConfigType() {
      this.isShowModalConfigType = true;
    },
    onCloseModalConfigType: function onCloseModalConfigType() {
      this.isShowModalConfigType = false;
    },
    onCloseModalConfirm: function onCloseModalConfirm() {
      this.isShowModalConfirm = false;
      this.isShowModalConfirmDelete = false;
    },
    onChangeTab: function onChangeTab(item) {
      if (!this.isShowModalConfirmDelete) {
        this.unselectedShape();
        this.currentConfigType = item;
        this.initPoints();
      }
    },
    onDeleteConfigType: function onDeleteConfigType(name) {
      this.dataConfirm = {
        id: name,
        name: this.dataProps.name,
        title: "x\xF3a c\u1EA5u h\xECnh ".concat(name, " cho camera ")
      };
      this.isShowModalConfirmDelete = true;
    },
    deleteConfigType: function deleteConfigType(configTypeName) {
      var _this3 = this;
      // Nếu có cấu hình trong DB thì bắn api delete
      var indexConfig = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(this.dataProps.ai_configs, function (o) {
        return o.type == configTypeName;
      });
      if (indexConfig > -1) {
        this.isLoadingDelete = true;
        _services_CameraService__WEBPACK_IMPORTED_MODULE_2__["default"].destroyConfig(this.dataProps.id, {
          type: configTypeName
        }).then(function (response) {
          _this3.handleResponseDelete(response, configTypeName);
        });
      } else {
        this.onCloseModalConfirm();
        var indexTab = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(this.securityTypes, function (o) {
          return o == configTypeName;
        });
        if (indexTab > -1) {
          this.securityTypes.splice(indexTab, 1);
        }
      }
      this.addOrRemoveListTypes(configTypeName, true);
    },
    handleResponseDelete: function handleResponseDelete(response, configTypeName) {
      this.isLoadingDelete = false;
      if (response.data.status == 200) {
        toast.success("X\xF3a c\u1EA5u h\xECnh ".concat(configTypeName, " th\xE0nh c\xF4ng"));
        this.onCloseModalConfirm();
        var index = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(this.dataProps.ai_configs, function (o) {
          return o.type == configTypeName;
        });
        if (index > -1) {
          var currentConfigType = this.currentConfigType;
          this.dataProps.ai_configs.splice(index, 1);
          this.initPoints();
          this.initTabs();
          if (currentConfigType != configTypeName) {
            this.currentConfigType = currentConfigType;
          }
        }
      }
    },
    clearData: function clearData() {
      this.startTime1 = '';
      this.startTime2 = '';
      this.endTime1 = '';
      this.endTime2 = '';
      this.score_thres = 0.7;
    },
    addConfigType: function addConfigType(type) {
      this.securityTypes.push(type);
      this.addOrRemoveListTypes(type, false);
      this.onCloseModalConfigType();
      this.clearData();
      this.onChangeTab(type);
    },
    onChangeTime: function onChangeTime() {
      this.startTime1 = this.startTime1 ? parseInt(this.startTime1) : '';
      this.endTime1 = this.endTime1 ? parseInt(this.endTime1) : '';
      this.startTime2 = this.startTime2 ? parseInt(this.startTime2) : '';
      this.endTime2 = this.endTime2 ? parseInt(this.endTime2) : '';
      if (isNaN(this.startTime1) || this.startTime1 < 0 || this.startTime1 > 24) {
        this.startTime1 = 0;
      }
      if (isNaN(this.endTime1) || this.endTime1 < 0 || this.endTime1 > 24) {
        this.endTime1 = 0;
      }
      if (isNaN(this.startTime2) || this.startTime2 < 0 || this.startTime2 > 24) {
        this.startTime2 = 0;
      }
      if (isNaN(this.endTime2) || this.endTime2 < 0 || this.endTime2 > 24) {
        this.endTime2 = 0;
      }
    },
    onChangeDataCrowd: function onChangeDataCrowd() {
      this.dist_thres = this.dist_thres ? parseInt(this.dist_thres) : 0;
      this.max_age = this.max_age ? parseInt(this.max_age) : 0;
      this.n_init = this.n_init ? parseInt(this.n_init) : 0;
      this.n_members = this.n_members ? parseInt(this.n_members) : 0;
      if (isNaN(this.dist_thres) || this.dist_thres < 0) {
        this.dist_thres = 0;
      }
      if (isNaN(this.max_age) || this.max_age < 0) {
        this.max_age = 0;
      }
      if (isNaN(this.n_init) || this.n_init < 0) {
        this.n_init = 0;
      }
      if (isNaN(this.n_members) || this.n_members < 0) {
        this.n_members = 0;
      }
    },
    generateShapeLabel: function generateShapeLabel(label) {
      var index = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(this.labels, function (o) {
        return o.value == label;
      });
      if (index > -1) {
        return this.labels[index].description;
      }
    },
    generateShapeType: function generateShapeType(type) {
      switch (type) {
        case "rectangle":
          return "Rect";
        case "polygon":
          return "Poly";
        default:
          return "Line";
      }
    },
    pureColorChange: function pureColorChange(color) {
      this.color = color;
    },
    initData: function initData() {
      this.initBg();
      this.initTabs();
      this.initPoints();
    },
    initBg: function initBg() {
      var dataImg = this.dataProps.image;
      if (!dataImg) {
        this.configStage = {
          width: this.$refs.parent_canvas.clientWidth,
          height: this.$refs.parent_canvas.clientHeight - 54 - 55
        };
      } else {
        this.ratioImg = dataImg.width / dataImg.height;
        this.changeBg(dataImg.width);
        this.file = 'data:image/jpeg;base64,' + dataImg.base64;
      }
    },
    initTabs: function initTabs() {
      var _this4 = this;
      this.isTraffic = this.dataProps.type == _constants_constant__WEBPACK_IMPORTED_MODULE_14__.TRAFFIC;
      this.securityTypes = [];
      this.currentConfigType = '';
      if (this.isTraffic) {
        this.currentConfigType = _constants_constant__WEBPACK_IMPORTED_MODULE_14__.TRAFFIC;
      } else {
        this.currentConfigType = _constants_constant__WEBPACK_IMPORTED_MODULE_14__.CROWD;
        return;
        this.dataProps.ai_configs.forEach(function (value, key) {
          if (value.type != _constants_constant__WEBPACK_IMPORTED_MODULE_14__.TRAFFIC) {
            _this4.securityTypes.push(value.type);
            if (!_this4.currentConfigType) {
              _this4.currentConfigType = value.type;
            }
          }
        });
      }
    },
    initPoints: function initPoints() {
      var _this5 = this;
      // if (!this.isTraffic & !this.securityTypes.length) {
      //     this.showModalConfigType()
      // }

      this.polygons = [];
      var ai_configs = this.dataProps.ai_configs.find(function (r) {
        return r.type === _this5.currentConfigType;
      });
      if (!ai_configs) {
        return;
      }
      var points = JSON.parse(ai_configs.points);
      if (this.isTraffic) {
        points.forEach(function (shape, key) {
          if (shape.type == 'polygon') {
            _this5.polygons.push(shape);
          }
          if (shape.type == 'line') {
            _this5.lines.push(shape);
          }
          if (shape.type == 'rectangle') {
            _this5.rectangles.push(shape);
          }
          if (shape.allowRedLight) {
            _this5.typeOfRedLightChoosen = shape.allowRedLight;
          }
        });
      } else {
        if (!points.shapes && this.currentConfigType !== _constants_constant__WEBPACK_IMPORTED_MODULE_14__.CROWD) {
          this.showModalConfigType();
          return;
        }
        if (this.currentConfigType == _constants_constant__WEBPACK_IMPORTED_MODULE_14__.CROWD) {
          this.dist_thres = points.dist_thres;
          this.max_age = points.max_age;
          this.n_init = points.n_init;
          this.n_members = points.n_members;
          this.isActive = points.isActive;
          return;
        }
        if (!points.shapes) {
          return;
        }
        points.shapes.forEach(function (shape, key) {
          _this5.polygons.push(shape);
        });
        this.dataProps.ai_configs.forEach(function (item, key) {
          _this5.addOrRemoveListTypes(item.type, false);
        });
        this.startTime1 = points.start_time_1;
        this.startTime2 = points.start_time_2;
        this.endTime1 = points.end_time_1;
        this.endTime2 = points.end_time_2;
        this.score_thres = points.score_thres;
        this.isActive = points.isActive;
      }
    },
    addOrRemoveListTypes: function addOrRemoveListTypes(configTypeName) {
      var isVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var index = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(this.listTypes, function (o) {
        return o.name == configTypeName;
      });
      if (index > -1) {
        this.listTypes[index].visible = isVisible;
      }
    },
    changeBg: function changeBg(width) {
      var height = width / this.ratioImg;
      var img = this.$refs.img_hidden;
      img.classList.remove('d-none');
      img.width = width;
      this.imageData.width = width;
      this.imageData.height = height;
      this.configStage = {
        width: width,
        height: height
      };
      var div_stage = this.$refs.canvas;
      div_stage.style.width = "".concat(width, "px");
      img.classList.add('d-none');
    },
    onFileChange: function onFileChange(e) {
      var _this6 = this;
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.fileName = files[0].name;
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = function (e) {
        _this6.file = e.target.result;
      };
      setTimeout(function () {
        _this6.scale = 100;
        _this6.oldScale = 100;
        _this6.addBgCanvas();
      }, 1);
    },
    addBgCanvas: function addBgCanvas() {
      var _this7 = this;
      var div_stage = this.$refs.canvas;
      var div_parent_stage = this.$refs.parent_canvas;
      var img = this.$refs.img_hidden;
      img.classList.remove('d-none');
      img.width = div_parent_stage.clientWidth;
      setTimeout(function () {
        var imgWidth = div_parent_stage.clientWidth;
        var imgHeight = img.height;
        _this7.imageData.width = imgWidth;
        _this7.imageData.height = imgHeight;
        _this7.ratioImg = imgWidth / imgHeight;
        _this7.configStage = {
          width: imgWidth,
          height: imgHeight
        };
        img.classList.add('d-none');
        div_stage.style.width = "".concat(imgWidth, "px");
      }, 1);
    },
    onClose: function onClose() {
      this.removeEventListener();
      this.$emit('onClose');
    },
    onChangeSelectLabel: function onChangeSelectLabel() {
      var _this = this;
      var index = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(this.labels, function (o) {
        return o.value == _this.labelChoosen;
      });
      if (index > -1) {
        this.color = this.labels[index].color;
        this.pureColor = this.labels[index].color;
        this.typeOfShapeChoosen = this.labels[index].type;
      }
    },
    setCursor: function setCursor(cursorType) {
      // e.target.getStage().container().style.cursor = cursorType

      var stage = document.getElementsByClassName('konvajs-content')[0];
      stage.style.cursor = cursorType;
    },
    fillShapeColor: function fillShapeColor(shapeNameChoosen) {
      var isTransparent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!this.isDrawing) {
        var shape = this.getShapeByName(shapeNameChoosen);
        shape.fill(isTransparent ? 'transparent' : shape.attrs.stroke);
        if (shapeNameChoosen != this.shapeNameChoosen) {
          shape.opacity(isTransparent ? 1 : this.opacityShapeActive);
        }
      }
    },
    handleMouseEnter: function handleMouseEnter(e) {
      if (!this.isDrawing && !this.isHoldingShift) {
        this.setCursor('pointer');
      }
      if (this.isDrawing && this.isHoldingShift) {
        this.setCursor('crosshair');
      }

      // if (!this.isClickBorder) {
      //     this.fillShapeColor(e.target.name())
      // }
    },
    handleMouseLeave: function handleMouseLeave(e) {
      this.setCursor('crosshair');
      if (this.shapeNameChoosen != e.target.name()) {
        this.fillShapeColor(e.target.name(), true);
      }
    },
    handleMouseLeaveShapeItem: function handleMouseLeaveShapeItem(shapeName) {
      if (this.shapeNameChoosen != shapeName) {
        this.fillShapeColor(shapeName, true);
      }
    },
    activeShapeItem: function activeShapeItem(name) {
      if (name) {
        this.shapeNameChoosen = name;
        var shape = this.getShapeByName(name);
        shape.opacity(this.opacityShapeActive);
        this.updateTransformer();
      }
    },
    handleStageMouseDown: function handleStageMouseDown(e) {
      if (this.currentConfigType == _constants_constant__WEBPACK_IMPORTED_MODULE_14__.CROWD) {
        this.setCursor('default');
        return;
      }
      if (!this.isBackground) {
        this.$message({
          message: 'Vui lòng chọn background!',
          type: 'warning'
        });
        return;
      }
      if (this.isHoldingSpace) {
        return;
      }
      this.isMouseDown = true;
      var target = e.target;
      var stage = target.getStage();
      if (target == stage || this.isHoldingShift) {
        this.isDrawing = true;
        this.unselectedShape();
        var position = stage.getPointerPosition();
        var timestamp = new Date().getTime();

        // Shape mới đc sinh ra trong array tương ứng
        if (this.typeOfShapeChoosen == 'Polygon' && !this.isPolygonCreated) {
          this.polygons = [].concat(_toConsumableArray(this.polygons), [{
            points: [position.x, position.y],
            // fill: this.color,
            closed: true,
            opacity: this.opacityShape,
            draggable: true,
            name: "shape-".concat(timestamp),
            stroke: this.color,
            strokeWidth: this.strokeWidth,
            visible: true,
            type: 'polygon',
            label: this.labelChoosen
          }]);
          this.isPolygonCreated = true;
          // state để xử lý case click chuột nhưng ko move -> shape ko đc vẽ
          this.positionXRectStart = position.x;
          this.positionYRectStart = position.y;
        }
        if (this.typeOfShapeChoosen == 'Line') {
          this.lines = [].concat(_toConsumableArray(this.lines), [{
            points: [position.x, position.y],
            points_0: [position.x, position.y],
            stroke: this.color,
            strokeWidth: this.strokeWidth,
            opacity: this.opacityShape,
            draggable: true,
            name: "shape-".concat(timestamp),
            visible: true,
            type: 'line',
            label: this.labelChoosen
          }]);

          // state để xử lý case click chuột nhưng ko move -> shape ko đc vẽ
          this.positionXRectStart = position.x;
          this.positionYRectStart = position.y;
        }
        if (this.typeOfShapeChoosen == 'Rectangle') {
          this.rectangles = [].concat(_toConsumableArray(this.rectangles), [{
            x: position.x,
            y: position.y,
            // fill: this.color,
            opacity: this.opacityShape,
            draggable: true,
            name: "shape-".concat(timestamp),
            stroke: this.color,
            strokeWidth: this.strokeWidth,
            visible: true,
            type: 'rectangle',
            label: this.labelChoosen
          }]);

          // state để xử lý case click chuột nhưng ko move -> shape ko đc vẽ
          this.positionXRectStart = position.x;
          this.positionYRectStart = position.y;
        }
        return;
      }
      if (!this.isHoldingShift) {
        stage.container().style.cursor = 'move';
      }

      // click khung viền transformer -> ko làm gì cả
      var clickedOnTransformer = target.getParent().className === 'Transformer';
      if (clickedOnTransformer) {
        this.isClickBorder = true;
        return;
      }

      // lấy ra name của shape đc click
      var name = target.name();
      var shape = this.getShapeFromList(name);
      this.shapeNameChoosen = shape ? name : '';
      this.updateTransformer();
    },
    handleStageMouseMove: function handleStageMouseMove(e) {
      if (this.currentConfigType == _constants_constant__WEBPACK_IMPORTED_MODULE_14__.CROWD) {
        this.setCursor('default');
        return;
      }

      // Tọa độ x,y của mouse
      var position = e.target.getStage().getPointerPosition();
      position.x = position.x < 0 ? 0 : position.x;
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
      if (this.currentConfigType == _constants_constant__WEBPACK_IMPORTED_MODULE_14__.CROWD) {
        this.setCursor('default');
        return;
      }
      var position = e.target.getStage().getPointerPosition();
      var isAddItemUndo = true;
      if (this.isHoldingShift) {
        this.countAnchor++;
        if (this.typeOfShapeChoosen == 'Polygon' && this.isPolygonCreated) {
          var newestShape = this.polygons[this.polygons.length - 1];
          var allowAddPointX = true;
          var allowAddPointY = true;
          var minMinus = 8;

          // apply khi vẽ đỉnh thứ 3 của polygon
          if (this.countAnchor >= 2) {
            newestShape.points.every(function (value, key) {
              var minusX = Math.abs(value - position.x);
              var minusY = Math.abs(value - position.y);
              if (key % 2 == 0 && minusX <= minMinus) {
                allowAddPointX = false;
              }
              if (key % 2 != 0 && minusY <= minMinus) {
                allowAddPointY = false;
              }
              if (!allowAddPointX && !allowAddPointY) {
                return false; //break loop
              }

              return true; //continue loop
            });
          }

          if (allowAddPointX || allowAddPointY) {
            newestShape.points = newestShape.points.concat([position.x, position.y]);
          }
        }
      } else {
        this.isPolygonCreated = false;
        var minusX = Math.abs(this.positionXRectStart - position.x);
        var minusY = Math.abs(this.positionYRectStart - position.y);
        var _minMinus = 8;

        // tự động xóa shape vừa đc sinh ra sau khi click chuột mà ko move
        if (minusX <= _minMinus && minusY <= _minMinus) {
          if (this.typeOfShapeChoosen == 'Polygon') {
            isAddItemUndo = false;
            this.polygons.splice(-1);
          }
          if (this.typeOfShapeChoosen == 'Line') {
            isAddItemUndo = false;
            this.lines.splice(-1);
          }
          if (this.typeOfShapeChoosen == 'Rectangle') {
            isAddItemUndo = false;
            this.rectangles.splice(-1);
          }
        } else if (minusX <= _minMinus || minusY <= _minMinus) {
          if (this.typeOfShapeChoosen == 'Rectangle') {
            this.rectangles.splice(-1);
          }
        } else {
          if (this.typeOfShapeChoosen == 'Line' && !this.shapeNameChoosen) {
            var _newestShape3 = this.lines[this.lines.length - 1];
            _newestShape3.points_0 = _newestShape3.points;
          }
        }

        // nếu click vào hình thì ko add stack
        if (this.shapeNameChoosen) {
          isAddItemUndo = false;
        }
        this.isDrawing = false;
        this.positionXRectStart = 0;
        this.positionYRectStart = 0;
      }
      this.calcCoordinatesRectangle(); // Tính toán lại coordinates cho case 2 Rectangles

      /*
          state ${isMouseDown} đc dùng khi thay đổi background:
              - ng dùng click đúp vào file ảnh
              - mouseup đc kích hoạt nhưng mousedown thì ko
          Nên chỉ call addStack() khi mousedown đc kích hoạt trước
      */
      // thêm vào stack có thể Undo/Redo
      if (isAddItemUndo && this.isMouseDown) {
        this.addStack();
      }
      this.isMouseDown = false; // reset state về trạng thái ban đầu
    },
    calcCoordinatesRectangle: function calcCoordinatesRectangle() {
      if (this.isTransform) {
        return;
      }
      if (this.typeOfShapeChoosen == 'Rectangle') {
        var shapeSelected = this.rectangles[this.rectangles.length - 1];
        if (!shapeSelected) {
          return;
        }
        var absWidth = Math.abs(shapeSelected.width);
        var absHeight = Math.abs(shapeSelected.height);

        // Case vẽ từ phải -> trái
        if (shapeSelected.width < 0) {
          shapeSelected.x = shapeSelected.x - absWidth;
          shapeSelected.x2 = shapeSelected.x + absWidth;
          shapeSelected.width_0 = absWidth;
        }

        // Case vẽ từ dưới -> trên
        if (shapeSelected.height < 0) {
          shapeSelected.y = shapeSelected.y - absHeight;
          shapeSelected.y2 = shapeSelected.y + absHeight;
          shapeSelected.height_0 = absHeight;
        }
        shapeSelected.width = absWidth;
        shapeSelected.height = absHeight;
      }
    },
    addStack: function addStack() {
      if (this.isTransform) {
        return;
      }
      this.stack = null;
      if (this.typeOfShapeChoosen == 'Line') {
        this.stack = this.lines[this.lines.length - 1];
      }
      if (this.typeOfShapeChoosen == 'Rectangle') {
        this.stack = this.rectangles[this.rectangles.length - 1];
      }
      if (this.typeOfShapeChoosen == 'Polygon') {
        this.stack = this.polygons[this.polygons.length - 1];
      }
      this.shapeBefore = {
        x: this.stack.x,
        y: this.stack.y,
        x2: this.stack.x2,
        y2: this.stack.y2,
        visible: false
      };
      this.shapeAfter = {
        x: this.stack.x,
        y: this.stack.y,
        x2: this.stack.x2,
        y2: this.stack.y2,
        visible: true
      };
      this.toogleUndoRedo();
    },
    toogleUndoRedo: function toogleUndoRedo() {
      var isAllowUndo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.isAllowUndo = isAllowUndo;
      this.isAllowRedo = !isAllowUndo;
    },
    unselectedShape: function unselectedShape() {
      this.shapeNameChoosen = '';
      this.isClickBorder = false;
      this.updateTransformer();
      this.$forceUpdate();
    },
    mergeAttributes: function mergeAttributes(dataChange) {
      var listKey = Object.keys(dataChange);
      for (var _i = 0, _listKey = listKey; _i < _listKey.length; _i++) {
        var key = _listKey[_i];
        if (this.stack.hasOwnProperty(key)) {
          this.stack[key] = dataChange[key];
        }
      }
    },
    applyUndoShape: function applyUndoShape() {
      if (!this.stack) {
        console.log('no undo');
        return;
      }
      this.mergeAttributes(this.shapeBefore);
      this.toogleUndoRedo(false);
      this.unselectedShape();
    },
    applyRedoShape: function applyRedoShape() {
      if (!this.stack) {
        console.log('no redo');
        return;
      }
      this.mergeAttributes(this.shapeAfter);
      this.toogleUndoRedo();
      this.unselectedShape();
    },
    getShapeByName: function getShapeByName(shapeName) {
      return this.$refs.transformer.getNode().getStage().findOne('.' + shapeName);
    },
    getShapeFromList: function getShapeFromList(shapeName) {
      var rectangle = this.rectangles.find(function (r) {
        return r.name === shapeName;
      });
      var line = this.lines.find(function (r) {
        return r.name === shapeName;
      });
      var polygon = this.polygons.find(function (r) {
        return r.name === shapeName;
      });
      if (rectangle) {
        return rectangle;
      }
      if (line) {
        return line;
      }
      return polygon;
    },
    toggleShowShape: function toggleShowShape(shape) {
      var _this8 = this;
      this.toogleUndoRedo();
      var visibleBefore = false;
      var visibleAfter = false;
      if (shape) {
        visibleBefore = shape.visible;
        visibleAfter = !shape.visible;
        shape.visible = !shape.visible;
        this.stack = shape;
      }
      this.shapeBefore = {
        visible: visibleBefore
      };
      this.shapeAfter = {
        visible: visibleAfter
      };
      setTimeout(function () {
        _this8.unselectedShape();
      }, 0);
    },
    applyDeleteShape: function applyDeleteShape() {
      this.toogleUndoRedo();
      var shape = this.getShapeFromList(this.shapeNameChoosen);
      if (shape) {
        shape.visible = false;
        shape["delete"] = true;
        this.stack = shape;
      }
      this.shapeBefore = {
        visible: true,
        "delete": false
      };
      this.shapeAfter = {
        visible: false,
        "delete": true
      };
      this.unselectedShape();
    },
    applyZoomIn: function applyZoomIn() {
      var shapeNameChoosen = this.shapeNameChoosen;
      this.oldScale = this.scale;
      this.scale += this.widthBreak * 2;
      this.unselectedShape();
      this.initBgAfterZoom();
      this.activeShapeItem(shapeNameChoosen);
    },
    applyZoomOut: function applyZoomOut() {
      var shapeNameChoosen = this.shapeNameChoosen;
      this.oldScale = this.scale;
      this.scale -= this.widthBreak;
      this.unselectedShape();
      this.initBgAfterZoom();
      this.activeShapeItem(shapeNameChoosen);
    },
    initBgAfterZoom: function initBgAfterZoom() {
      var scale = (this.scale - this.oldScale) / 100;
      var div_stage = this.$refs.canvas;
      var widthDivStage = div_stage.getBoundingClientRect().width; // lấy chính xác width khi chưa đc làm tròn

      var newWidth = widthDivStage + widthDivStage * scale;
      this.changeBg(newWidth);
      this.calcCoordinatesShapeAfterZoom(scale);
    },
    calcCoordinatesShapeAfterZoom: function calcCoordinatesShapeAfterZoom(scale) {
      var _this9 = this;
      this.rectangles.forEach(function (value, key) {
        value.x = value.x + value.x * scale;
        value.y = value.y + value.y * scale;
        value.x2 = value.x2 + value.x2 * scale;
        value.y2 = value.y2 + value.y2 * scale;
        value.width = value.width + value.width * scale;
        value.height = value.height + value.height * scale;
      });
      this.lines.forEach(function (value, key) {
        value.points.forEach(function (value, key2) {
          _this9.lines[key].points[key2] = _this9.lines[key].points[key2] + _this9.lines[key].points[key2] * scale;
        });
      });
      this.polygons.forEach(function (value, key) {
        value.points.forEach(function (value, key2) {
          _this9.polygons[key].points[key2] = _this9.polygons[key].points[key2] + _this9.polygons[key].points[key2] * scale;
        });
      });
    },
    removePolygonOneClick: function removePolygonOneClick() {
      var lengthPolygon = this.polygons.length;
      if (!lengthPolygon) {
        return;
      }
      var newestPolygon = this.polygons[lengthPolygon - 1];
      if (newestPolygon.points.length <= 4) {
        this.polygons.splice(-1);
        this.stack = null;
        this.isAllowUndo = false;
      }
    },
    handleDragStart: function handleDragStart(e) {
      this.setCursor('move');
    },
    handleDragEnd: function handleDragEnd(e) {
      var _this10 = this;
      this.toogleUndoRedo();
      var _this = this;
      var rectangle = this.rectangles.find(function (r) {
        return r.name === _this10.shapeNameChoosen;
      });
      var line = this.lines.find(function (r) {
        return r.name === _this10.shapeNameChoosen;
      });
      var polygon = this.polygons.find(function (r) {
        return r.name === _this10.shapeNameChoosen;
      });
      if (rectangle) {
        this.stack = rectangle;
        this.shapeBefore = {
          x: rectangle.x,
          y: rectangle.y,
          x2: rectangle.x2,
          y2: rectangle.y2
        };
        rectangle.x = e.target.x();
        rectangle.y = e.target.y();
        rectangle.x2 = rectangle.x + rectangle.width;
        rectangle.y2 = rectangle.y + rectangle.height;
        this.shapeAfter = {
          x: rectangle.x,
          y: rectangle.y,
          x2: rectangle.x2,
          y2: rectangle.y2
        };
      }
      if (line) {
        var index = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(this.lines, function (o) {
          return o.name == _this.shapeNameChoosen;
        });
        this.shapeBefore = {
          points: line.points
        };
        var newPoints = [];
        line.points.forEach(function (value, key) {
          var newPosition = key % 2 == 0 ? e.target.x() : e.target.y();
          newPoints = [].concat(_toConsumableArray(newPoints), [value + newPosition]);
        });
        line.points = newPoints;

        // remove item at index ${index}
        this.lines.splice(index, 1);
        setTimeout(function () {
          _this10.lines.push(line);
          _this10.stack = line;
          _this10.shapeAfter = {
            points: line.points
          };
        }, 0);
      }
      if (polygon) {
        var _index = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(this.polygons, function (o) {
          return o.name == _this.shapeNameChoosen;
        });
        this.shapeBefore = {
          points: polygon.points
        };
        var _newPoints = [];
        polygon.points.forEach(function (value, key) {
          var newPosition = key % 2 == 0 ? e.target.x() : e.target.y();
          _newPoints = [].concat(_toConsumableArray(_newPoints), [value + newPosition]);
        });
        polygon.points = _newPoints;

        // remove item at index ${index}
        this.polygons.splice(_index, 1);
        setTimeout(function () {
          _this10.polygons.push(polygon);
          _this10.stack = polygon;
          _this10.shapeAfter = {
            points: polygon.points
          };
        }, 0);
      }
      this.unselectedShape();
    },
    handleTransformEnd: function handleTransformEnd(e) {
      this.toogleUndoRedo();
      this.isTransform = true;
      var transformerNode = this.$refs.transformer.getNode();
      var anchor = transformerNode.getActiveAnchor(); // hướng resize

      var target = e.target;
      var scaleX = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.round)(target.scaleX(), 3);
      var scaleY = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.round)(target.scaleY(), 3);
      var _this = this;
      var indexRectangle = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(this.rectangles, function (o) {
        return o.name == _this.shapeNameChoosen;
      });
      var indexPolygon = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(this.polygons, function (o) {
        return o.name == _this.shapeNameChoosen;
      });
      if (indexRectangle > -1) {
        this.transformRectangle(target, this.rectangles[indexRectangle], indexRectangle, scaleX, scaleY, anchor);
      }
      if (indexPolygon > -1) {
        this.transformPolygon(this.polygons[indexPolygon], indexPolygon, scaleX, scaleY, anchor);
      }
      this.unselectedShape();
    },
    transformRectangle: function transformRectangle(target, rectangle, indexRectangle, scaleX, scaleY, anchor) {
      var _this11 = this;
      var newWidth = rectangle.width * scaleX;
      var newHeight = Math.abs(rectangle.height * scaleY);

      /*
          Anchor rectangle
          11h-----12h-----1h
          |                |
          9h              3h
          |                |
          7h------6h------5h
      */

      this.shapeBefore = {
        x: rectangle.x,
        y: rectangle.y,
        x2: rectangle.x2,
        y2: rectangle.y2,
        width: rectangle.width,
        height: rectangle.height
      };

      // Case shape không bị đảo ngược
      if (scaleY > 0) {
        rectangle.x = target.x();
        rectangle.y = target.y();

        // Node 9h, 12h tọa độ (x2, y2) k thay đổi
        // Node 3h
        if (anchor == 'middle-right') {
          rectangle.x2 = rectangle.x + newWidth;
        }

        // Node 6h
        if (anchor == 'bottom-center') {
          rectangle.y2 = rectangle.y + newHeight;
        }
      }

      // Case shape bị đảo ngược
      if (scaleY < 0) {
        // Node 3h
        if (anchor == 'middle-left') {
          rectangle.x = rectangle.x - newWidth;
          rectangle.x2 = target.x();
        }

        // Node 6h
        if (anchor == 'top-center') {
          rectangle.y = rectangle.y - newHeight;
          rectangle.y2 = target.y();
        }

        // Node 9h
        if (anchor == 'middle-right') {
          rectangle.x = rectangle.x2;
          rectangle.x2 = rectangle.x2 + newWidth;
        }

        // Node 12h
        if (anchor == 'bottom-center') {
          rectangle.y = rectangle.y2;
          rectangle.y2 = rectangle.y2 + newHeight;
        }
      }
      rectangle.width = newWidth;
      rectangle.height = newHeight;
      this.rectangles.splice(indexRectangle, 1);
      setTimeout(function () {
        _this11.rectangles.push(rectangle);
        _this11.stack = rectangle;
        _this11.shapeAfter = {
          x: rectangle.x,
          y: rectangle.y,
          x2: rectangle.x2,
          y2: rectangle.y2,
          width: rectangle.width,
          height: rectangle.height
        };
        _this11.isTransform = false;
      }, 0);
    },
    transformPolygon: function transformPolygon(polygon, indexPolygon, scaleX, scaleY, anchor) {
      var _this12 = this;
      var points = polygon.points;
      this.shapeBefore = {
        points: points
      };
      var newPoints = [],
        minMaxCoors = this.getMinMaxCoordinatesPolygon(points);

      // Khi scale từ trái sang phải thì min_x sẽ ko thay đổi, tương tự vs các case còn lại
      var minX = minMaxCoors.minX,
        maxX = minMaxCoors.maxX,
        minY = minMaxCoors.minY,
        maxY = minMaxCoors.maxY;
      points.forEach(function (value, key) {
        var newValue = 0;

        // Case shape không bị đảo ngược
        if (scaleY > 0) {
          if (key % 2 == 0) {
            // tọa độ x
            // Node 3h
            if (anchor == 'middle-right') {
              newValue = scaleX * (value - minX) + minX;
            }
            // Node 9h
            if (anchor == 'middle-left') {
              newValue = scaleX * (value - maxX) + maxX;
            }
          } else {
            // tọa độ y
            // Node 6h
            if (anchor == 'bottom-center') {
              newValue = scaleY * (value - minY) + minY;
            }
            // Node 12h
            if (anchor == 'top-center') {
              newValue = scaleY * (value - maxY) + maxY;
            }
          }
        }

        // Case shape bị đảo ngược
        // if (scaleY < 0) {
        //     // Node 3h
        //     if (anchor == 'middle-left') {
        //         newValue = scaleX * (value - minX) + minX
        //     }
        // }

        newPoints.push(newValue ? newValue : value);
      });
      polygon.points = newPoints;
      this.polygons.splice(indexPolygon, 1);
      setTimeout(function () {
        _this12.polygons.push(polygon);
        _this12.stack = polygon;
        _this12.shapeAfter = {
          points: polygon.points
        };
        _this12.isTransform = false;
      }, 0);
    },
    getMinMaxCoordinatesPolygon: function getMinMaxCoordinatesPolygon(points) {
      var coorsX = [],
        coorsY = [];
      points.forEach(function (value, key) {
        if (key % 2 == 0) {
          coorsX.push(value);
        } else {
          coorsY.push(value);
        }
      });
      return {
        minX: (0,lodash__WEBPACK_IMPORTED_MODULE_0__.min)(coorsX),
        maxX: (0,lodash__WEBPACK_IMPORTED_MODULE_0__.max)(coorsX),
        minY: (0,lodash__WEBPACK_IMPORTED_MODULE_0__.min)(coorsY),
        maxY: (0,lodash__WEBPACK_IMPORTED_MODULE_0__.max)(coorsY)
      };
    },
    updateTransformer: function updateTransformer() {
      if (this.isHoldingShift) {
        return;
      }
      var shapeNameChoosen = this.shapeNameChoosen;
      var transformerNode = this.$refs.transformer.getNode();
      transformerNode.enabledAnchors(this.listAnchors);
      var stage = transformerNode.getStage();
      var selectedNode = stage.findOne('.' + shapeNameChoosen);

      // do nothing if selected node is allready attached
      if (selectedNode === transformerNode.node()) {
        return;
      }
      if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode]);
        this.changeAttr(transformerNode, selectedNode.attrs);
      } else {
        transformerNode.nodes([]);
      }
    },
    changeAttr: function changeAttr(transformerNode, shape) {
      transformerNode.resizeEnabled(true);
      if (shape.type == 'line') {
        transformerNode.resizeEnabled(false);
      }
      this.labelChoosen = shape.label;
      this.color = shape.stroke;
      this.pureColor = shape.stroke;
      this.typeOfShapeChoosen = (0,_helpers_utils_js__WEBPACK_IMPORTED_MODULE_6__.capitalize)(shape.type);
    },
    submitForm: function submitForm() {
      this.isLoading = true;
      switch (this.currentConfigType) {
        case _constants_constant__WEBPACK_IMPORTED_MODULE_14__.INTRUSION:
          this.createDataIntrusion();
          break;
        case _constants_constant__WEBPACK_IMPORTED_MODULE_14__.CROWD:
          this.createDataCrowd();
          break;
        default:
          this.createDataTraffic();
          break;
      }
      this.updateCameraConfigs();
    },
    getCameraConfigs: function getCameraConfigs() {
      var _this13 = this;
      if (!this.isTraffic) {
        _services_CameraService__WEBPACK_IMPORTED_MODULE_2__["default"].show(this.dataProps.id).then(function (response) {
          if (response.status == 200) {
            if (response.data) {
              _this13.dataProps.ai_configs = response.data.configs;
              _this13.initPoints();
            }
          }
        });
      }
    },
    updateCameraConfigs: function updateCameraConfigs() {
      var _this14 = this;
      var params = {
        points: this.jsonResult,
        data_core: this.jsonResultCore,
        ai_server_ip: this.dataProps.ai_server_ip,
        id_cam: this.dataProps.id_cam,
        type: this.currentConfigType
      };
      _services_CameraService__WEBPACK_IMPORTED_MODULE_2__["default"].updateConfig(this.dataProps.id, params).then(function (response) {
        _this14.handleResponse(response);
      });
    },
    handleResponse: function handleResponse(response) {
      this.isLoading = false;
      if (response.status == 200) {
        if (response.data.status != 200) {
          this.$emit('onFailed');
        } else {
          if (this.isTraffic) {
            this.onClose();
          } else {
            this.onCloseModalConfirm();
            this.onClose();
          }
          this.$emit('onConfigSuccess');
          this.getCameraConfigs();
        }
      }
    },
    createDataIntrusion: function createDataIntrusion() {
      var _this15 = this;
      var result = [];
      var shapes = [];
      var points = [];
      this.polygons.forEach(function (value, index) {
        if (value.visible) {
          var _index2 = 0;
          points = [];
          value.points.forEach(function (value, key) {
            if (key <= 1) {
              return;
            }
            if (key % 2 == 0) {
              // tọa độ x
              points.push([value / _this15.imageData.width]);
            } else {
              // tọa độ y
              points[_index2].push(value / _this15.imageData.height);
              _index2++;
            }
          });
          result = [].concat(_toConsumableArray(points), [points]);
          shapes = [].concat(_toConsumableArray(shapes), [value]);
        }
      });
      result = points;
      var startTime = 0;
      var endTime = 0;
      if (this.startTime2) {
        startTime = (this.startTime1 + ',' + this.startTime2).toString();
        endTime = (this.endTime1 + ',' + this.endTime2).toString();
      } else {
        startTime = this.startTime1.toString();
        endTime = this.endTime1.toString();
      }
      this.jsonResultCore = {
        // name: this.dataProps.name,
        location: this.dataProps.address,
        camid: this.dataProps.id_cam,
        lat: this.dataProps.lat ? this.dataProps.lat : "0",
        lng: this.dataProps.lng ? this.dataProps.lng : "0",
        start_time: startTime,
        end_time: endTime,
        isActive: this.isActive,
        protocol: "rtsp",
        url: this.dataProps.rtsp_url,
        prefer_fps: 15,
        width: this.imageData.width,
        height: this.imageData.height,
        in_region_score_thres: this.score_thres,
        regions: [["focus", result]]
      };
      this.jsonResult = {
        isActive: this.isActive,
        start_time_1: this.startTime1,
        start_time_2: this.startTime2,
        end_time_1: this.endTime1,
        end_time_2: this.endTime2,
        score_thres: this.score_thres,
        shapes: shapes
      };
    },
    createDataCrowd: function createDataCrowd() {
      this.jsonResultCore = {
        // name: this.dataProps.name,
        location: this.dataProps.address,
        camid: this.dataProps.id_cam,
        isActive: this.isActive,
        protocol: "rtsp",
        url: this.dataProps.rtsp_url,
        prefer_fps: 15,
        dist_thres: this.dist_thres,
        max_age: this.max_age,
        n_init: this.n_init,
        n_members: this.n_members,
        imageData: (0,_helpers_utils_js__WEBPACK_IMPORTED_MODULE_6__.convertBase64)(this.file),
        width: this.imageData.width,
        height: this.imageData.height
      };
      this.jsonResult = {
        isActive: this.isActive,
        dist_thres: this.dist_thres,
        max_age: this.max_age,
        n_init: this.n_init,
        n_members: this.n_members
      };
    },
    validateForm: function validateForm() {
      if (!this.isTraffic) {
        if (!this.polygons.length && this.currentConfigType !== _constants_constant__WEBPACK_IMPORTED_MODULE_14__.CROWD) {
          this.$message({
            message: 'Vui lòng cấu hình vùng vi phạm',
            type: 'warning'
          });
          return;
        }
      }
      if (this.currentConfigType == _constants_constant__WEBPACK_IMPORTED_MODULE_14__.CROWD) {
        if (this.n_init >= this.max_age) {
          this.$message({
            message: 'Thời gian liên tục phải nhỏ hơn thời gian tan rã',
            type: 'warning'
          });
          return;
        }
      }
      if (this.currentConfigType == _constants_constant__WEBPACK_IMPORTED_MODULE_14__.INTRUSION) {
        if (this.startTime1 >= this.endTime1) {
          this.$message({
            message: 'Khung giờ 1 không hợp lệ',
            type: 'warning'
          });
          return;
        }
        if (this.startTime2) {
          if (this.startTime2 >= this.endTime2) {
            this.$message({
              message: 'Khung giờ 2 không hợp lệ',
              type: 'warning'
            });
            return;
          }
        }
      }
      this.dataConfirm = {
        name: this.dataProps.name,
        title: "l\u01B0u c\u1EA5u h\xECnh ".concat(this.currentConfigType, " cho camera ")
      };
      this.isShowModalConfirm = true;
    },
    createShapeData: function createShapeData() {
      var _this16 = this;
      this.jsonResult = [];
      var allShape = [].concat(_toConsumableArray(this.lines), _toConsumableArray(this.polygons), _toConsumableArray(this.rectangles));
      var result = [];
      allShape.forEach(function (value, index) {
        if (value.visible) {
          var points = [];
          _this16.jsonResult.push(value);
          if (value.type == 'rectangle') {
            points = [[value.x, value.y], [value.x2, value.y2]];
          }
          if (value.type == 'line') {
            var valuePoint = value.points;
            points = [[valuePoint[0], valuePoint[1]], [valuePoint[2], valuePoint[3]]];
          }
          if (value.type == 'polygon') {
            var _index3 = 0;
            value.points.forEach(function (value, key) {
              if (key <= 1) {
                return;
              }
              if (key % 2 == 0) {
                // tọa độ x
                points.push([value]);
              } else {
                // tọa độ y
                points[_index3].push(value);
                _index3++;
              }
            });
          }
          result = [].concat(_toConsumableArray(result), [{
            label: value.label,
            points: points,
            group_id: null,
            shape_type: value.type,
            flags: {}
          }]);
        }
      });
      return result;
    },
    createDataTraffic: function createDataTraffic() {
      var result = this.createShapeData();
      this.jsonResultCore = {
        shapes: result,
        imageData: (0,_helpers_utils_js__WEBPACK_IMPORTED_MODULE_6__.convertBase64)(this.file),
        imageWidth: this.imageData.width,
        imageHeight: this.imageData.height
      };
      if (this.typeOfRedLightChoosen) {
        this.jsonResultCore = _objectSpread(_objectSpread({}, this.jsonResultCore), {}, {
          allowRedLight: this.typeOfRedLightChoosen
        });
        this.jsonResult = [].concat(_toConsumableArray(this.jsonResult), [{
          allowRedLight: this.typeOfRedLightChoosen
        }]);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ConfigTypeModal",
  props: {
    isLoading: {
      type: Boolean,
      "default": false
    },
    addConfig: {
      type: Boolean,
      "default": false
    },
    listTypes: {
      type: Array
    },
    type: {
      type: String // Giao thông | An ninh
    }
  },

  emits: ['onClose', 'onSuccess'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {
      if (props.type) {
        typeChoosen.value = props.type;
      }
    });
    var typeChoosen = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    var submitForm = function submitForm() {
      emit('onSuccess', typeChoosen.value);
    };
    var onClose = function onClose() {
      emit('onClose');
    };
    return {
      typeChoosen: typeChoosen,
      submitForm: submitForm,
      onClose: onClose
    };
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/FormModal.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/FormModal.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _assets_icon_plus_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ~assets/icon/plus.png */ "./resources/assets/icon/plus.png");
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
      ai_server_ip: '',
      lat: '',
      lng: '',
      group_ids: [],
      violation_ids: []
      // ai_model: 'TRANSPORTATION',
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
      },
      ai_server_ip: {
        required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.helpers.withMessage('AI server IP là bắt buộc', _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.required),
        maxLength: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.helpers.withMessage('AI server IP tối đa 255 ký tự', (0,_vuelidate_validators__WEBPACK_IMPORTED_MODULE_10__.maxLength)(255))
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm-bundler.js");
/* harmony import */ var _services_CameraService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/services/CameraService */ "./resources/js/services/CameraService.js");
/* harmony import */ var _FormModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FormModal */ "./resources/js/pages/camera/FormModal.vue");
/* harmony import */ var _ConfigModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ConfigModal */ "./resources/js/pages/camera/ConfigModal.vue");
/* harmony import */ var _ConfigTypeModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ConfigTypeModal */ "./resources/js/pages/camera/ConfigTypeModal.vue");
/* harmony import */ var vue_toastification__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue-toastification */ "./node_modules/vue-toastification/dist/index.mjs");
/* harmony import */ var _assets_icon_plus_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ~assets/icon/plus.png */ "./resources/assets/icon/plus.png");
/* harmony import */ var _helpers_message__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ~/helpers/message */ "./resources/js/helpers/message.js");
/* harmony import */ var _assets_icon_traffic_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ~assets/icon/traffic.png */ "./resources/assets/icon/traffic.png");
/* harmony import */ var _assets_icon_security_2_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ~assets/icon/security_2.png */ "./resources/assets/icon/security_2.png");
/* harmony import */ var _constants_constant__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ~/constants/constant */ "./resources/js/constants/constant.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }












var toast = (0,vue_toastification__WEBPACK_IMPORTED_MODULE_5__.useToast)();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ListCamera",
  components: {
    FormModal: _FormModal__WEBPACK_IMPORTED_MODULE_2__["default"],
    ConfigModal: _ConfigModal__WEBPACK_IMPORTED_MODULE_3__["default"],
    ConfigTypeModal: _ConfigTypeModal__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  setup: function setup() {
    var store = (0,vuex__WEBPACK_IMPORTED_MODULE_11__.useStore)();
    var isAdmin = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return store.getters["isAdmin"];
    });
    var isLoading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var isLoadingSubmit = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var items = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var pagination = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var perPageOptions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([5, 10, 25, 50, 100]);
    var tableQuery = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var columnsForAdmin = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      name: 'Tên camera',
      address: 'Url HLS',
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
    var isShowModalConfigType = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    // const dataForm = ref({})
    var dataForm = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      ai_server_ip: "http://172.16.2.70:1888",
      id_cam: "TK037"
    });
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
        id: row.id,
        name: row.name,
        title: 'xóa camera'
      };
      isShowModalDelete.value = true;
    };
    var configType = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    var listTypes = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([{
      icon: _assets_icon_traffic_png__WEBPACK_IMPORTED_MODULE_8__["default"],
      name: _constants_constant__WEBPACK_IMPORTED_MODULE_10__.TRAFFIC,
      visible: true
    }, {
      icon: _assets_icon_security_2_png__WEBPACK_IMPORTED_MODULE_9__["default"],
      name: _constants_constant__WEBPACK_IMPORTED_MODULE_10__.SECURITY,
      visible: true
    }]);
    var showModalConfigType = function showModalConfigType(row) {
      if (!row.configs.length) {
        configType.value = '';
      } else if (row.configs.length == 1 && row.configs[0].type == _constants_constant__WEBPACK_IMPORTED_MODULE_10__.TRAFFIC) {
        configType.value = _constants_constant__WEBPACK_IMPORTED_MODULE_10__.TRAFFIC;
      } else {
        configType.value = _constants_constant__WEBPACK_IMPORTED_MODULE_10__.SECURITY;
      }
      isShowModalConfigType.value = true;
      dataForm.value = {
        type: 'camera',
        id: row.id,
        id_cam: row.id_cam,
        hls_url: row.hls_url,
        rtsp_url: row.rtsp_url,
        name: row.name,
        address: row.address,
        ai_server_ip: row.ai_server_ip,
        ai_configs: row.configs
      };
    };
    var showModalConfig = function showModalConfig(type) {
      dataForm.value.type = type;
      getImgConfig();
    };
    var getImgConfig = function getImgConfig() {
      isLoadingSubmit.value = true;
      _services_CameraService__WEBPACK_IMPORTED_MODULE_1__["default"].getImgConfig({
        id_cam: dataForm.value.id_cam,
        ai_server_ip: dataForm.value.ai_server_ip,
        type: dataForm.value.type
      }).then(function (response) {
        isLoadingSubmit.value = false;
        if (response.data.status == 200) {
          dataForm.value.image = response.data.data;
          isShowModalConfig.value = true;
          return;
        }
        toast.error(response.data.status == 404 ? 'ID Camera không tồn tại' : 'Không lấy được ảnh cấu hình AI');
      });
    };
    var onDelete = function onDelete(id) {
      isLoadingSubmit.value = true;
      _services_CameraService__WEBPACK_IMPORTED_MODULE_1__["default"].destroy(id).then(function (response) {
        onClose();
        if (response.status == 200) {
          toast.success('Xóa camera thành công');
          initCamera(tableQuery.value);
        }
      });
    };
    var onClose = function onClose() {
      isShowModal.value = false;
      isShowModalDelete.value = false;
      isShowModalConfig.value = false;
      isShowModalConfigType.value = false;
      isLoadingSubmit.value = false;
    };
    var onSuccess = function onSuccess() {
      initCamera(tableQuery.value);
    };
    var onConfigSuccess = function onConfigSuccess() {
      initCamera(tableQuery.value);
      toast.success("C\u1EA5u h\xECnh vi ph\u1EA1m ".concat(dataForm.value.type, " th\xE0nh c\xF4ng"));
    };
    var onFailed = function onFailed() {
      toast.error(_helpers_message__WEBPACK_IMPORTED_MODULE_7__.SOMETHING_WHEN_WRONG);
    };
    var isEdit = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(true);
    var isDelete = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(true);
    var iconPlus = _assets_icon_plus_png__WEBPACK_IMPORTED_MODULE_6__["default"];
    return {
      isAdmin: isAdmin,
      isLoading: isLoading,
      isLoadingSubmit: isLoadingSubmit,
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
      isShowModalConfigType: isShowModalConfigType,
      iconPlus: iconPlus,
      configType: configType,
      listTypes: listTypes,
      showModalCreate: showModalCreate,
      showModalUpdate: showModalUpdate,
      showModalDelete: showModalDelete,
      showModalConfig: showModalConfig,
      showModalConfigType: showModalConfigType,
      onClose: onClose,
      onDelete: onDelete,
      onSuccess: onSuccess,
      onFailed: onFailed,
      onConfigSuccess: onConfigSuccess
    };
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=template&id=e36795ac":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=template&id=e36795ac ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  ref: "parent_canvas",
  "class": "parent-div-stage"
};
var _hoisted_2 = ["src"];
var _hoisted_3 = {
  "class": "dark_lighten_3--bg py-10"
};
var _hoisted_4 = {
  tabindex: "0",
  "class": "choose-file mb-4"
};
var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Tải ảnh lên ");
var _hoisted_6 = {
  "class": "select_custom mw-80 mb-3"
};
var _hoisted_7 = {
  style: {
    "float": "left"
  },
  "class": "mr-5"
};
var _hoisted_8 = {
  style: {
    "float": "right",
    "color": "#8492a6",
    "font-size": "13px"
  }
};
var _hoisted_9 = {
  "class": "select_custom mw-80 mb-3"
};
var _hoisted_10 = {
  "class": "select_custom mw-80 mb-3"
};
var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Khung giờ 1", -1 /* HOISTED */);
var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "mx-2"
}, "-", -1 /* HOISTED */);
var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Khung giờ 2", -1 /* HOISTED */);
var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "mx-2"
}, "-", -1 /* HOISTED */);
var _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Ngưỡng", -1 /* HOISTED */);
var _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Trạng thái hoạt động", -1 /* HOISTED */);
var _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Khoảng cách", -1 /* HOISTED */);
var _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, " (m)", -1 /* HOISTED */);
var _hoisted_19 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Số lượng", -1 /* HOISTED */);
var _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, " (người)", -1 /* HOISTED */);
var _hoisted_21 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Thời gian tan rã", -1 /* HOISTED */);
var _hoisted_22 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, " (giây)", -1 /* HOISTED */);
var _hoisted_23 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Thời gian liên tục", -1 /* HOISTED */);
var _hoisted_24 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, " (giây)", -1 /* HOISTED */);
var _hoisted_25 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Trạng thái hoạt động", -1 /* HOISTED */);
var _hoisted_26 = {
  "class": "group-button"
};
var _hoisted_27 = {
  "class": "group-button"
};
var _hoisted_28 = {
  "class": "dark_lighten_3--bg py-3 mt-1 d-flex justify-content-center"
};
var _hoisted_29 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Lưu cấu hình ");
var _hoisted_30 = {
  key: 0,
  "class": "dark_lighten_3--bg mt-1 gray--text"
};
var _hoisted_31 = {
  "class": "shape-items"
};
var _hoisted_32 = ["src", "onClick"];
var _hoisted_33 = {
  "class": "type"
};
var _hoisted_34 = ["src", "onClick"];
var _hoisted_35 = {
  "class": "type"
};
var _hoisted_36 = ["src", "onClick"];
var _hoisted_37 = {
  "class": "type"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Close = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Close");
  var _component_el_icon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-icon");
  var _component_el_button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-button");
  var _component_el_button_group = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-button-group");
  var _component_v_rect = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("v-rect");
  var _component_v_line = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("v-line");
  var _component_v_transformer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("v-transformer");
  var _component_v_layer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("v-layer");
  var _component_v_stage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("v-stage");
  var _component_el_col = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-col");
  var _component_Picture = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Picture");
  var _component_color_picker = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("color-picker");
  var _component_el_option = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-option");
  var _component_el_select = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-select");
  var _component_el_input = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-input");
  var _component_el_row = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-row");
  var _component_el_slider = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-slider");
  var _component_el_switch = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-switch");
  var _component_InfoFilled = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("InfoFilled");
  var _component_el_tooltip = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-tooltip");
  var _component_RefreshLeft = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("RefreshLeft");
  var _component_RefreshRight = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("RefreshRight");
  var _component_ZoomIn = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ZoomIn");
  var _component_ZoomOut = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ZoomOut");
  var _component_modal_confirm = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("modal-confirm");
  var _component_config_type_modal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("config-type-modal");
  var _component_el_dialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-dialog");
  var _directive_dragscroll = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDirective)("dragscroll");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_dialog, {
    title: "C\u1EA5u h\xECnh vi ph\u1EA1m ".concat($props.dataProps.type == $data.traffic ? 'giao thông' : 'an ninh', " camera ").concat($props.dataProps.name),
    width: "95%",
    center: "",
    "close-on-click-modal": false,
    "close-on-press-escape": false,
    onClose: $options.onClose,
    fullscreen: "",
    "lock-scroll": "",
    "modal-class": "dialog-config"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button_group, {
        "class": "tab-items"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.securityTypes, function (item, index) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_button, {
              key: "config-type-".concat(index),
              "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
                'px-2': !item,
                'is_active': item == $data.currentConfigType,
                'icon_plus': !item
              }),
              onClick: function onClick($event) {
                return $options.onChangeTab(item);
              }
            }, {
              icon: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_icon, {
                  size: "10",
                  "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["white--text--hover", item == $data.currentConfigType ? 'red--hover' : 'dark_lighten_2--hover']),
                  onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
                    return $options.onDeleteConfigType(item);
                  }, ["prevent"])
                }, {
                  "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                    return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Close)];
                  }),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "onClick"])];
              }),
              "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)];
              }),

              _: 2 /* DYNAMIC */
            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "onClick"]);
          }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <el-button\n                class=\"px-2 icon_plus\"\n                @click=\"showModalConfigType()\"\n                v-show=\"!isTraffic && securityTypes.length < 7\"\n            >\n                <el-icon size=\"15\"><Plus /></el-icon>\n            </el-button> ")];
        }),
        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
        gutter: 20
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
            xs: 24,
            sm: 18,
            md: 18,
            lg: 19,
            xl: 20,
            "class": "col-stage dark--bg"
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
                ref: "canvas",
                "class": "div-stage",
                style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
                  backgroundImage: "url(".concat($data.file, ")")
                })
              }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
                ref: "img_hidden",
                src: $data.file,
                alt: "",
                "class": "img_hidden"
              }, null, 8 /* PROPS */, _hoisted_2), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_v_stage, {
                ref: "stage",
                config: $data.configStage,
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
                      return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.rectangles, function (item, index) {
                        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_v_rect, {
                          key: "item-".concat(item.name),
                          config: item,
                          onTransformend: $options.handleTransformEnd,
                          onDragstart: $options.handleDragStart,
                          onDragend: $options.handleDragEnd,
                          onMouseenter: $options.handleMouseEnter,
                          onMouseleave: $options.handleMouseLeave
                        }, null, 8 /* PROPS */, ["config", "onTransformend", "onDragstart", "onDragend", "onMouseenter", "onMouseleave"]);
                      }), 128 /* KEYED_FRAGMENT */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.polygons, function (item, index) {
                        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_v_line, {
                          key: "item-".concat(item.name),
                          config: item,
                          onTransformend: $options.handleTransformEnd,
                          onDragstart: $options.handleDragStart,
                          onDragend: $options.handleDragEnd,
                          onMouseenter: $options.handleMouseEnter,
                          onMouseleave: $options.handleMouseLeave
                        }, null, 8 /* PROPS */, ["config", "onTransformend", "onDragstart", "onDragend", "onMouseenter", "onMouseleave"]);
                      }), 128 /* KEYED_FRAGMENT */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.lines, function (item, index) {
                        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_v_line, {
                          key: "item-".concat(item.name),
                          config: item,
                          onTransformend: $options.handleTransformEnd,
                          onDragstart: $options.handleDragStart,
                          onDragend: $options.handleDragEnd,
                          onMouseenter: $options.handleMouseEnter,
                          onMouseleave: $options.handleMouseLeave
                        }, null, 8 /* PROPS */, ["config", "onTransformend", "onDragstart", "onDragend", "onMouseenter", "onMouseleave"]);
                      }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_v_transformer, {
                        ref: "transformer",
                        rotateEnabled: false,
                        resizeEnabled: true,
                        borderStrokeWidth: 2,
                        anchorSize: 7
                      }, null, 512 /* NEED_PATCH */)];
                    }),

                    _: 1 /* STABLE */
                  }, 512 /* NEED_PATCH */)];
                }),

                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["config", "onMousedown", "onMousemove", "onMouseup", "onTouchstart"])], 4 /* STYLE */)])), [[_directive_dragscroll, $data.isDragScroll]])];
            }),
            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
            xs: 24,
            sm: 6,
            md: 6,
            lg: 5,
            xl: 4,
            "class": "menu-config"
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                gutter: 20,
                "class": "row-bg",
                justify: "space-around"
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                    xs: 24,
                    "class": "flex-center"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_icon, {
                        size: "20",
                        "class": "mr-4"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Picture)];
                        }),
                        _: 1 /* STABLE */
                      }), _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                        type: "file",
                        "class": "d-none",
                        ref: "file",
                        onChange: _cache[0] || (_cache[0] = function () {
                          return $options.onFileChange && $options.onFileChange.apply($options, arguments);
                        }),
                        accept: "image/png,image/jpg,image/jpeg"
                      }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */)])];
                    }),

                    _: 1 /* STABLE */
                  }), $data.currentConfigType !== $data.crowd ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_col, {
                    key: 0,
                    xs: 12,
                    sm: 24,
                    "class": "flex-center mb-4"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_color_picker, {
                        format: "hex",
                        onPureColorChange: $options.pureColorChange,
                        "round-history": "",
                        pureColor: $data.pureColor
                      }, null, 8 /* PROPS */, ["onPureColorChange", "pureColor"])];
                    }),
                    _: 1 /* STABLE */
                  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Traffic "), $data.currentConfigType == $data.traffic ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    key: 1
                  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                    xs: 12,
                    sm: 24,
                    "class": "flex-center"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_select, {
                        modelValue: $data.labelChoosen,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
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
                              label: item.description,
                              value: item.value
                            }, {
                              "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.value), 1 /* TEXT */)];
                              }),

                              _: 2 /* DYNAMIC */
                            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["label", "value"]);
                          }), 128 /* KEYED_FRAGMENT */))];
                        }),

                        _: 1 /* STABLE */
                      }, 8 /* PROPS */, ["modelValue", "onChange"])])];
                    }),
                    _: 1 /* STABLE */
                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                    xs: 12,
                    sm: 24,
                    "class": "flex-center"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_select, {
                        modelValue: $data.typeOfShapeChoosen,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
                          return $data.typeOfShapeChoosen = $event;
                        }),
                        "class": "select-label",
                        placeholder: "Select"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.typeOfShapes, function (item, index) {
                            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_option, {
                              key: "type_of_shape-".concat(index),
                              label: item,
                              value: item
                            }, null, 8 /* PROPS */, ["label", "value"]);
                          }), 128 /* KEYED_FRAGMENT */))];
                        }),

                        _: 1 /* STABLE */
                      }, 8 /* PROPS */, ["modelValue"])])];
                    }),
                    _: 1 /* STABLE */
                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                    xs: 12,
                    sm: 24,
                    "class": "flex-center"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_select, {
                        modelValue: $data.typeOfRedLightChoosen,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
                          return $data.typeOfRedLightChoosen = $event;
                        }),
                        "class": "select-label show_placeholder",
                        placeholder: "-- Chọn hướng ưu tiên --",
                        clearable: ""
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.typeOfRedLight, function (item, index) {
                            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_option, {
                              key: "type_of_redlight-".concat(index),
                              label: item.title,
                              value: item.value
                            }, null, 8 /* PROPS */, ["label", "value"]);
                          }), 128 /* KEYED_FRAGMENT */))];
                        }),

                        _: 1 /* STABLE */
                      }, 8 /* PROPS */, ["modelValue"])])];
                    }),
                    _: 1 /* STABLE */
                  })], 64 /* STABLE_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" End Traffic "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Intrusion "), $data.currentConfigType == $data.intrusion ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    key: 2
                  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                    xs: 12,
                    sm: 24,
                    "class": "flex-center mb-3"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                        "class": "w-90 align-items-center gray--text"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 10,
                            sm: 9,
                            md: 10
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [_hoisted_11];
                            }),
                            _: 1 /* STABLE */
                          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 14,
                            sm: 15,
                            md: 14,
                            "class": "time"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
                                modelValue: $data.startTime1,
                                "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
                                  return $data.startTime1 = $event;
                                }),
                                min: "1",
                                max: "24",
                                size: "small",
                                onChange: $options.onChangeTime
                              }, null, 8 /* PROPS */, ["modelValue", "onChange"]), _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
                                modelValue: $data.endTime1,
                                "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
                                  return $data.endTime1 = $event;
                                }),
                                min: "1",
                                max: "24",
                                size: "small",
                                onChange: $options.onChangeTime
                              }, null, 8 /* PROPS */, ["modelValue", "onChange"])];
                            }),
                            _: 1 /* STABLE */
                          })];
                        }),

                        _: 1 /* STABLE */
                      })];
                    }),

                    _: 1 /* STABLE */
                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                    xs: 12,
                    sm: 24,
                    "class": "flex-center mb-3"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                        "class": "w-90 align-items-center gray--text"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 10,
                            sm: 9,
                            md: 10
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [_hoisted_13];
                            }),
                            _: 1 /* STABLE */
                          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 14,
                            sm: 15,
                            md: 14,
                            "class": "time"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
                                modelValue: $data.startTime2,
                                "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
                                  return $data.startTime2 = $event;
                                }),
                                min: "1",
                                max: "24",
                                size: "small",
                                onChange: $options.onChangeTime
                              }, null, 8 /* PROPS */, ["modelValue", "onChange"]), _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
                                modelValue: $data.endTime2,
                                "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
                                  return $data.endTime2 = $event;
                                }),
                                min: "1",
                                max: "24",
                                size: "small",
                                onChange: $options.onChangeTime
                              }, null, 8 /* PROPS */, ["modelValue", "onChange"])];
                            }),
                            _: 1 /* STABLE */
                          })];
                        }),

                        _: 1 /* STABLE */
                      })];
                    }),

                    _: 1 /* STABLE */
                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                    xs: 12,
                    sm: 24,
                    "class": "flex-center mb-3"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                        "class": "w-90 gray--text"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 10,
                            sm: 10,
                            "class": "d-flex align-items-center"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [_hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <el-tooltip\n                                            content=\"\"\n                                            placement=\"top\"\n                                        >\n                                            <el-icon size=\"15\" color=\"#828282\" class=\"pl-1\"><InfoFilled /></el-icon>\n                                        </el-tooltip> ")];
                            }),
                            _: 1 /* STABLE */
                          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 14,
                            sm: 14
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_slider, {
                                modelValue: $data.score_thres,
                                "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) {
                                  return $data.score_thres = $event;
                                }),
                                size: "small",
                                step: 0.05,
                                min: 0.7,
                                max: 1
                              }, null, 8 /* PROPS */, ["modelValue", "step", "min"])];
                            }),
                            _: 1 /* STABLE */
                          })];
                        }),

                        _: 1 /* STABLE */
                      })];
                    }),

                    _: 1 /* STABLE */
                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                    xs: 12,
                    sm: 24,
                    "class": "flex-center mb-3"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                        "class": "w-90 align-items-center gray--text"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 10,
                            sm: 13,
                            "class": "d-flex align-items-center"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [_hoisted_16];
                            }),
                            _: 1 /* STABLE */
                          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 14,
                            sm: 11,
                            md: 11,
                            "class": "time"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_switch, {
                                modelValue: $data.isActive,
                                "onUpdate:modelValue": _cache[9] || (_cache[9] = function ($event) {
                                  return $data.isActive = $event;
                                }),
                                "active-color": "#13ce66",
                                "inactive-color": "#828282"
                              }, null, 8 /* PROPS */, ["modelValue"])];
                            }),
                            _: 1 /* STABLE */
                          })];
                        }),

                        _: 1 /* STABLE */
                      })];
                    }),

                    _: 1 /* STABLE */
                  })], 64 /* STABLE_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" End Intrusion "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Crowd "), $data.currentConfigType == $data.crowd ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    key: 3
                  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <el-col :xs=\"12\" :sm=\"24\" class=\"flex-center mb-3\">\n                                <el-row class=\"w-90 gray--text\">\n                                    <el-col :xs=\"10\" :sm=\"10\" class=\"d-flex align-items-center\">\n                                        <el-tooltip\n                                            content=\"Khoảng cách giữa các cá thể để tính là đám đông, khoảng cách tối đa của cá thể đến các thể gần nhất trong đám đông\"\n                                            placement=\"top\"\n                                        >\n                                            <el-icon size=\"15\" color=\"#828282\" class=\"pr-2\"><InfoFilled /></el-icon>\n                                        </el-tooltip>\n                                        <span>Khoảng cách (m)</span>\n                                    </el-col>\n                                    <el-col :xs=\"14\" :sm=\"14\">\n                                        <el-slider\n                                        class=\"ml-2\"\n                                            v-model=\"score_thres\"\n                                            size=\"small\"\n                                            :step=\"0.05\"\n                                            :min=\"0.7\"\n                                            :max=\"1\"\n                                        />\n                                    </el-col>\n                                </el-row>\n                            </el-col> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                    xs: 24,
                    sm: 24,
                    "class": "flex-center mb-3"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                        "class": "w-90 align-items-center gray--text"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 10,
                            sm: 13,
                            "class": "d-flex align-items-center"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_tooltip, {
                                content: "Khoảng cách giữa các cá thể để tính là đám đông, khoảng cách tối đa của cá thể đến các thể gần nhất trong đám đông",
                                placement: "top"
                              }, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_icon, {
                                    size: "15",
                                    color: "#828282",
                                    "class": "pr-2"
                                  }, {
                                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InfoFilled)];
                                    }),
                                    _: 1 /* STABLE */
                                  })];
                                }),

                                _: 1 /* STABLE */
                              }), _hoisted_17];
                            }),
                            _: 1 /* STABLE */
                          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 14,
                            sm: 11,
                            md: 11,
                            "class": "time"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
                                modelValue: $data.dist_thres,
                                "onUpdate:modelValue": _cache[10] || (_cache[10] = function ($event) {
                                  return $data.dist_thres = $event;
                                }),
                                min: "1",
                                max: "24",
                                size: "small",
                                onChange: $options.onChangeDataCrowd
                              }, null, 8 /* PROPS */, ["modelValue", "onChange"]), _hoisted_18];
                            }),
                            _: 1 /* STABLE */
                          })];
                        }),

                        _: 1 /* STABLE */
                      })];
                    }),

                    _: 1 /* STABLE */
                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                    xs: 12,
                    sm: 24,
                    "class": "flex-center mb-3"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                        "class": "w-90 align-items-center gray--text"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 10,
                            sm: 13,
                            "class": "d-flex align-items-center"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_tooltip, {
                                content: "Số người tối thiểu thỏa mãn khoảng cách để đươc tính là đám đông",
                                placement: "top"
                              }, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_icon, {
                                    size: "15",
                                    color: "#828282",
                                    "class": "pr-2"
                                  }, {
                                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InfoFilled)];
                                    }),
                                    _: 1 /* STABLE */
                                  })];
                                }),

                                _: 1 /* STABLE */
                              }), _hoisted_19];
                            }),
                            _: 1 /* STABLE */
                          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 14,
                            sm: 11,
                            md: 11,
                            "class": "time"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
                                modelValue: $data.n_members,
                                "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) {
                                  return $data.n_members = $event;
                                }),
                                min: "1",
                                max: "24",
                                size: "small",
                                onChange: $options.onChangeDataCrowd
                              }, null, 8 /* PROPS */, ["modelValue", "onChange"]), _hoisted_20];
                            }),
                            _: 1 /* STABLE */
                          })];
                        }),

                        _: 1 /* STABLE */
                      })];
                    }),

                    _: 1 /* STABLE */
                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                    xs: 12,
                    sm: 24,
                    "class": "flex-center mb-3"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                        "class": "w-90 align-items-center gray--text"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 10,
                            sm: 13,
                            "class": "d-flex align-items-center"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_tooltip, {
                                content: "Khoảng thời gian cho phép đám đông đó tạm \"tan rã\" sau đó tập hợp lại",
                                placement: "top"
                              }, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_icon, {
                                    size: "15",
                                    color: "#828282",
                                    "class": "pr-2"
                                  }, {
                                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InfoFilled)];
                                    }),
                                    _: 1 /* STABLE */
                                  })];
                                }),

                                _: 1 /* STABLE */
                              }), _hoisted_21];
                            }),
                            _: 1 /* STABLE */
                          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 14,
                            sm: 11,
                            md: 11,
                            "class": "time"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
                                modelValue: $data.max_age,
                                "onUpdate:modelValue": _cache[12] || (_cache[12] = function ($event) {
                                  return $data.max_age = $event;
                                }),
                                min: "1",
                                max: "24",
                                size: "small",
                                onChange: $options.onChangeDataCrowd
                              }, null, 8 /* PROPS */, ["modelValue", "onChange"]), _hoisted_22];
                            }),
                            _: 1 /* STABLE */
                          })];
                        }),

                        _: 1 /* STABLE */
                      })];
                    }),

                    _: 1 /* STABLE */
                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                    xs: 12,
                    sm: 24,
                    "class": "flex-center mb-3"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                        "class": "w-90 align-items-center gray--text"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 10,
                            sm: 13,
                            "class": "d-flex align-items-center"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_tooltip, {
                                content: "Khoảng thời gian liên tục tối thiểu đảm bảo các điều kiện để được tính là đám đông",
                                placement: "top"
                              }, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_icon, {
                                    size: "15",
                                    color: "#828282",
                                    "class": "pr-2"
                                  }, {
                                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InfoFilled)];
                                    }),
                                    _: 1 /* STABLE */
                                  })];
                                }),

                                _: 1 /* STABLE */
                              }), _hoisted_23];
                            }),
                            _: 1 /* STABLE */
                          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 14,
                            sm: 11,
                            md: 11,
                            "class": "time"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
                                modelValue: $data.n_init,
                                "onUpdate:modelValue": _cache[13] || (_cache[13] = function ($event) {
                                  return $data.n_init = $event;
                                }),
                                min: "1",
                                max: "24",
                                size: "small",
                                onChange: $options.onChangeDataCrowd
                              }, null, 8 /* PROPS */, ["modelValue", "onChange"]), _hoisted_24];
                            }),
                            _: 1 /* STABLE */
                          })];
                        }),

                        _: 1 /* STABLE */
                      })];
                    }),

                    _: 1 /* STABLE */
                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                    xs: 12,
                    sm: 24,
                    "class": "flex-center mb-3"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                        "class": "w-90 align-items-center gray--text"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 10,
                            sm: 13,
                            "class": "d-flex align-items-center"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [_hoisted_25];
                            }),
                            _: 1 /* STABLE */
                          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                            xs: 14,
                            sm: 11,
                            md: 11,
                            "class": "time"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_switch, {
                                modelValue: $data.isActive,
                                "onUpdate:modelValue": _cache[14] || (_cache[14] = function ($event) {
                                  return $data.isActive = $event;
                                }),
                                "active-color": "#13ce66",
                                "inactive-color": "#828282"
                              }, null, 8 /* PROPS */, ["modelValue"])];
                            }),
                            _: 1 /* STABLE */
                          })];
                        }),

                        _: 1 /* STABLE */
                      })];
                    }),

                    _: 1 /* STABLE */
                  })], 64 /* STABLE_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" End Crowd "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                    xs: 12,
                    sm: 24,
                    "class": "flex-center mb-2"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
                        onClick: $options.applyUndoShape,
                        disabled: !$data.isAllowUndo,
                        "class": "btn-undo"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_icon, {
                            size: "16",
                            color: $data.isAllowUndo ? '#828282' : '#4F4F4F'
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RefreshLeft)];
                            }),
                            _: 1 /* STABLE */
                          }, 8 /* PROPS */, ["color"])];
                        }),
                        _: 1 /* STABLE */
                      }, 8 /* PROPS */, ["onClick", "disabled"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
                        onClick: $options.applyRedoShape,
                        disabled: !$data.isAllowRedo,
                        "class": "btn-redo"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_icon, {
                            size: "16",
                            color: $data.isAllowRedo ? '#828282' : '#4F4F4F'
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RefreshRight)];
                            }),
                            _: 1 /* STABLE */
                          }, 8 /* PROPS */, ["color"])];
                        }),
                        _: 1 /* STABLE */
                      }, 8 /* PROPS */, ["onClick", "disabled"])])];
                    }),
                    _: 1 /* STABLE */
                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                    xs: 12,
                    sm: 24,
                    "class": "flex-center"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
                        onClick: $options.applyZoomIn,
                        disabled: !$data.isBackground,
                        "class": "btn-zoomin"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_icon, {
                            size: "16",
                            color: $data.isBackground ? '#828282' : '#4F4F4F'
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ZoomIn)];
                            }),
                            _: 1 /* STABLE */
                          }, 8 /* PROPS */, ["color"])];
                        }),
                        _: 1 /* STABLE */
                      }, 8 /* PROPS */, ["onClick", "disabled"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
                        onClick: $options.applyZoomOut,
                        disabled: !$data.isBackground,
                        "class": "btn-zoomout"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_icon, {
                            size: "16",
                            color: $data.isBackground ? '#828282' : '#4F4F4F'
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ZoomOut)];
                            }),
                            _: 1 /* STABLE */
                          }, 8 /* PROPS */, ["color"])];
                        }),
                        _: 1 /* STABLE */
                      }, 8 /* PROPS */, ["onClick", "disabled"])])];
                    }),
                    _: 1 /* STABLE */
                  })];
                }),

                _: 1 /* STABLE */
              })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
                type: "danger",
                round: "",
                onClick: $options.validateForm,
                loading: $data.isLoading,
                style: {
                  "margin-right": "0"
                }
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [_hoisted_29];
                }),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["onClick", "loading"])]), $data.isTraffic ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.lines, function (shape, index) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_tooltip, {
                  content: $options.generateShapeLabel(shape.label),
                  placement: "left-start",
                  key: "shape-item-line-".concat(index)
                }, {
                  "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                    return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
                        'is-active': $data.shapeNameChoosen == shape.name
                      }),
                      onClick: function onClick($event) {
                        return $options.activeShapeItem(shape.name);
                      },
                      onMouseenter: function onMouseenter($event) {
                        return $options.fillShapeColor(shape.name);
                      },
                      onMouseleave: function onMouseleave($event) {
                        return $options.handleMouseLeaveShapeItem(shape.name);
                      }
                    }, {
                      "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                        return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
                          alt: "icon_eye",
                          src: shape.visible ? $data.iconShowEye : $data.iconHiddenEye,
                          "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon_input mr-3", shape.visible ? 'gray' : 'gray_darken']),
                          width: "15",
                          onClick: function onClick($event) {
                            return $options.toggleShowShape(shape);
                          }
                        }, null, 10 /* CLASS, PROPS */, _hoisted_32), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_33, " [" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.generateShapeType(shape.type)) + "] ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shape.label), 1 /* TEXT */)];
                      }),

                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "onClick", "onMouseenter", "onMouseleave"]), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, shape["delete"] ? !shape["delete"] : true]])];
                  }),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["content"]);
              }), 128 /* KEYED_FRAGMENT */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.rectangles, function (shape, index) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_tooltip, {
                  content: $options.generateShapeLabel(shape.label),
                  placement: "left-start",
                  key: "shape-item-rectangle-".concat(index)
                }, {
                  "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                    return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
                        'is-active': $data.shapeNameChoosen == shape.name
                      }),
                      onClick: function onClick($event) {
                        return $options.activeShapeItem(shape.name);
                      },
                      onMouseenter: function onMouseenter($event) {
                        return $options.fillShapeColor(shape.name);
                      },
                      onMouseleave: function onMouseleave($event) {
                        return $options.handleMouseLeaveShapeItem(shape.name);
                      }
                    }, {
                      "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                        return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
                          alt: "icon_eye",
                          src: shape.visible ? $data.iconShowEye : $data.iconHiddenEye,
                          "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon_input mr-3", shape.visible ? 'gray' : 'gray_darken']),
                          width: "15",
                          onClick: function onClick($event) {
                            return $options.toggleShowShape(shape);
                          }
                        }, null, 10 /* CLASS, PROPS */, _hoisted_34), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_35, " [" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.generateShapeType(shape.type)) + "] ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shape.label), 1 /* TEXT */)];
                      }),

                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "onClick", "onMouseenter", "onMouseleave"]), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, shape["delete"] ? !shape["delete"] : true]])];
                  }),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["content"]);
              }), 128 /* KEYED_FRAGMENT */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.polygons, function (shape, index) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_tooltip, {
                  content: $options.generateShapeLabel(shape.label),
                  placement: "left-start",
                  key: "shape-item-polygon-".concat(index)
                }, {
                  "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                    return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
                        'is-active': $data.shapeNameChoosen == shape.name
                      }),
                      onClick: function onClick($event) {
                        return $options.activeShapeItem(shape.name);
                      },
                      onMouseenter: function onMouseenter($event) {
                        return $options.fillShapeColor(shape.name);
                      },
                      onMouseleave: function onMouseleave($event) {
                        return $options.handleMouseLeaveShapeItem(shape.name);
                      }
                    }, {
                      "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                        return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
                          alt: "icon_eye",
                          src: shape.visible ? $data.iconShowEye : $data.iconHiddenEye,
                          "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon_input mr-3", shape.visible ? 'gray' : 'gray_darken']),
                          width: "15",
                          onClick: function onClick($event) {
                            return $options.toggleShowShape(shape);
                          }
                        }, null, 10 /* CLASS, PROPS */, _hoisted_36), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_37, " [" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.generateShapeType(shape.type)) + "] ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shape.label), 1 /* TEXT */)];
                      }),

                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "onClick", "onMouseenter", "onMouseleave"]), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, shape["delete"] ? !shape["delete"] : true]])];
                  }),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["content"]);
              }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
            }),
            _: 1 /* STABLE */
          })];
        }),

        _: 1 /* STABLE */
      }), $data.isShowModalConfirm ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_modal_confirm, {
        key: 0,
        modelValue: $data.isShowModalConfirm,
        "onUpdate:modelValue": _cache[15] || (_cache[15] = function ($event) {
          return $data.isShowModalConfirm = $event;
        }),
        "data-form": $data.dataConfirm,
        onOnSuccess: $options.submitForm,
        onOnClose: $options.onCloseModalConfirm,
        "is-loading": $data.isLoading
      }, null, 8 /* PROPS */, ["modelValue", "data-form", "onOnSuccess", "onOnClose", "is-loading"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.isShowModalConfirmDelete ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_modal_confirm, {
        key: 1,
        modelValue: $data.isShowModalConfirmDelete,
        "onUpdate:modelValue": _cache[16] || (_cache[16] = function ($event) {
          return $data.isShowModalConfirmDelete = $event;
        }),
        "data-form": $data.dataConfirm,
        onOnSuccess: $options.deleteConfigType,
        onOnClose: $options.onCloseModalConfirm,
        "is-loading": $data.isLoadingDelete
      }, null, 8 /* PROPS */, ["modelValue", "data-form", "onOnSuccess", "onOnClose", "is-loading"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.isShowModalConfigType ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_config_type_modal, {
        key: 2,
        modelValue: $data.isShowModalConfigType,
        "onUpdate:modelValue": _cache[17] || (_cache[17] = function ($event) {
          return $data.isShowModalConfigType = $event;
        }),
        onOnSuccess: $options.addConfigType,
        onOnClose: $options.onCloseModalConfigType,
        "add-config": "",
        "list-types": $data.listTypes
      }, null, 8 /* PROPS */, ["modelValue", "onOnSuccess", "onOnClose", "list-types"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["title", "onClose"]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=template&id=b42ee6e0":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=template&id=b42ee6e0 ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "white--text d-flex justify-content-around flex-wrap"
};
var _hoisted_2 = ["onClick"];
var _hoisted_3 = ["src"];
var _hoisted_4 = {
  "class": "dialog-footer"
};
var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Hủy bỏ ");
var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Xác nhận ");
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_el_button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-button");
  var _component_el_dialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-dialog");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_dialog, {
    title: !$props.addConfig ? 'Loại cấu hình ' : 'Thêm cấu hình',
    center: "",
    "close-on-click-modal": false,
    "close-on-press-escape": false,
    onClose: $setup.onClose,
    "modal-class": $props.addConfig ? 'dialog-config-type' : 'dialog-responsive'
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
        round: "",
        onClick: $setup.onClose,
        "class": "btn-custom dark_lighten_2--bg dark_lighten_2--hover dark_lighten_2--border white_darken_2--text"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_5];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
        round: "",
        type: "primary",
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return $setup.submitForm();
        }),
        loading: $props.isLoading,
        "class": "btn-custom red--bg red--hover red--border"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_6];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["loading"])])];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.listTypes, function (type, index) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: "type-setting-".concat(index),
          "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["d-flex flex-column align-items-center", {
            'd-none': !type.visible,
            'my-2 mx-3': $props.addConfig
          }]),
          onDblclick: _cache[0] || (_cache[0] = function ($event) {
            return $setup.submitForm();
          })
        }, [type.visible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          key: 0
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
          "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["mb-3", $setup.typeChoosen == type.name ? 'red--bg' : 'dark_lighten_2--bg red--hover']),
          onClick: function onClick($event) {
            return $setup.typeChoosen = type.name;
          }
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
          src: type.icon,
          alt: "icon_arrow_right",
          width: "120",
          "class": "gray_lighten pl-3"
        }, null, 8 /* PROPS */, _hoisted_3)], 10 /* CLASS, PROPS */, _hoisted_2), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(type.name), 1 /* TEXT */)], 64 /* STABLE_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 34 /* CLASS, HYDRATE_EVENTS */);
      }), 128 /* KEYED_FRAGMENT */))])];
    }),

    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["title", "onClose", "modal-class"]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/FormModal.vue?vue&type=template&id=464973a8":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/FormModal.vue?vue&type=template&id=464973a8 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Url HLS", -1 /* HOISTED */);
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
var _hoisted_14 = ["disabled"];
var _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Url RTSP", -1 /* HOISTED */);
var _hoisted_16 = {
  key: 0,
  "class": "invalid-feedback d-block"
};
var _hoisted_17 = {
  "class": "invalid-feedback d-block"
};
var _hoisted_18 = {
  "class": "form-floating"
};
var _hoisted_19 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "AI server IP", -1 /* HOISTED */);
var _hoisted_20 = {
  key: 0,
  "class": "invalid-feedback d-block"
};
var _hoisted_21 = {
  "class": "invalid-feedback d-block"
};
var _hoisted_22 = {
  "class": "select_custom"
};
var _hoisted_23 = {
  key: 0,
  "class": "invalid-feedback d-block"
};
var _hoisted_24 = {
  key: 0,
  "class": "select_custom"
};
var _hoisted_25 = {
  key: 0,
  "class": "invalid-feedback d-block"
};
var _hoisted_26 = {
  "class": "form-floating"
};
var _hoisted_27 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Địa chỉ", -1 /* HOISTED */);
var _hoisted_28 = {
  key: 0,
  "class": "invalid-feedback d-block"
};
var _hoisted_29 = {
  "class": "invalid-feedback d-block"
};
var _hoisted_30 = {
  "class": "form-floating"
};
var _hoisted_31 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Latitude", -1 /* HOISTED */);
var _hoisted_32 = {
  key: 0,
  "class": "invalid-feedback d-block"
};
var _hoisted_33 = {
  "class": "form-floating"
};
var _hoisted_34 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Longitude", -1 /* HOISTED */);
var _hoisted_35 = {
  key: 0,
  "class": "invalid-feedback d-block"
};
var _hoisted_36 = {
  "class": "dialog-footer"
};
var _hoisted_37 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Hủy bỏ ");
var _hoisted_38 = ["src"];
var _hoisted_39 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Thêm mới", -1 /* HOISTED */);
var _hoisted_40 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Cập nhật ");
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
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
        round: "",
        onClick: $setup.onClose,
        "class": "btn-custom dark_lighten_2--bg dark_lighten_2--hover dark_lighten_2--border white_darken_2--text"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_37];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
        round: "",
        loading: $setup.isLoading,
        onClick: _cache[12] || (_cache[12] = function ($event) {
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
          }, null, 8 /* PROPS */, _hoisted_38), _hoisted_39], 64 /* STABLE_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            key: 1
          }, [_hoisted_40], 64 /* STABLE_FRAGMENT */))];
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
              }, 8 /* PROPS */, ["md"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_col, {
                key: 1,
                xs: 24
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                    type: "text",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
                      return $setup.fields.hls_url = $event;
                    }),
                    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control required", {
                      'is-invalid': $setup.v$.hls_url.$errors.length || $setup.error_server.hls_url
                    }]),
                    placeholder: "Url HLS"
                  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.fields.hls_url, void 0, {
                    trim: true
                  }]]), _hoisted_10, $setup.error_server.hls_url ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.hls_url[0]), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    key: 1
                  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.v$.hls_url.$errors, function (error) {
                    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
                      key: error.$property
                    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(error.$message), 1 /* TEXT */)]);
                  }), 128 /* KEYED_FRAGMENT */))])];
                }),

                _: 1 /* STABLE */
              })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                xs: 24
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                    type: "text",
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
                      return $setup.fields.rtsp_url = $event;
                    }),
                    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control required", {
                      'is-invalid': $setup.v$.rtsp_url.$errors.length || $setup.error_server.rtsp_url
                    }]),
                    placeholder: "Url RTSP",
                    disabled: !$setup.isAdmin
                  }, null, 10 /* CLASS, PROPS */, _hoisted_14), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.fields.rtsp_url, void 0, {
                    trim: true
                  }]]), _hoisted_15, $setup.error_server.rtsp_url ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.rtsp_url[0]), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    key: 1
                  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.v$.rtsp_url.$errors, function (error) {
                    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
                      key: error.$property
                    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(error.$message), 1 /* TEXT */)]);
                  }), 128 /* KEYED_FRAGMENT */))])];
                }),

                _: 1 /* STABLE */
              }), $setup.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_col, {
                key: 2,
                xs: 24
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                    type: "text",
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
                      return $setup.fields.ai_server_ip = $event;
                    }),
                    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control required", {
                      'is-invalid': $setup.v$.ai_server_ip.$errors.length || $setup.error_server.ai_server_ip
                    }]),
                    placeholder: "AI server IP"
                  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.fields.ai_server_ip, void 0, {
                    trim: true
                  }]]), _hoisted_19, $setup.error_server.ai_server_ip ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.ai_server_ip[0]), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    key: 1
                  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.v$.ai_server_ip.$errors, function (error) {
                    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
                      key: error.$property
                    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(error.$message), 1 /* TEXT */)]);
                  }), 128 /* KEYED_FRAGMENT */))])];
                }),

                _: 1 /* STABLE */
              })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                xs: 24
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_select, {
                    modelValue: $setup.fields.violation_ids,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
                      return $setup.fields.violation_ids = $event;
                    }),
                    "class": "select_violation",
                    onClick: _cache[6] || (_cache[6] = function ($event) {
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
                  }, " Lỗi vi phạm ", 2 /* CLASS */), $setup.error_server.violation_ids ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.violation_ids[0]), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])];
                }),
                _: 1 /* STABLE */
              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                xs: 24
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [$setup.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_select, {
                    modelValue: $setup.fields.group_ids,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
                      return $setup.fields.group_ids = $event;
                    }),
                    "class": "select_group",
                    onClick: _cache[8] || (_cache[8] = function ($event) {
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
                  }, " Nhóm camera ", 2 /* CLASS */), $setup.error_server.group_ids ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.group_ids[0]), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
                }),
                _: 1 /* STABLE */
              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                xs: 24
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                    type: "text",
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = function ($event) {
                      return $setup.fields.address = $event;
                    }),
                    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control required", {
                      'is-invalid': $setup.v$.address.$errors.length || $setup.error_server.address
                    }]),
                    placeholder: "Địa chỉ"
                  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.fields.address, void 0, {
                    trim: true
                  }]]), _hoisted_27, $setup.error_server.address ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.address[0]), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    key: 1
                  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.v$.address.$errors, function (error) {
                    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
                      key: error.$property
                    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(error.$message), 1 /* TEXT */)]);
                  }), 128 /* KEYED_FRAGMENT */))])];
                }),

                _: 1 /* STABLE */
              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                xs: 24,
                sm: 12
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                    type: "text",
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = function ($event) {
                      return $setup.fields.lat = $event;
                    }),
                    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
                      'is-invalid': $setup.error_server.lat
                    }]),
                    placeholder: "Latitude"
                  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.fields.lat, void 0, {
                    trim: true
                  }]]), _hoisted_31, $setup.error_server.lat ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.lat[0]), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])];
                }),
                _: 1 /* STABLE */
              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                xs: 24,
                sm: 12
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                    type: "text",
                    "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) {
                      return $setup.fields.lng = $event;
                    }),
                    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
                      'is-invalid': $setup.error_server.lng
                    }]),
                    placeholder: "Longitude"
                  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.fields.lng, void 0, {
                    trim: true
                  }]]), _hoisted_34, $setup.error_server.lng ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error_server.lng[0]), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])];
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
  var _component_config_type_modal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("config-type-modal");
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
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.name) + " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.id), 1 /* TEXT */)];
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
                "class": "mr-4 green--text green--text--hover"
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
                "class": "mr-4 orange--text orange--text--hover",
                size: "16"
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Delete)];
                }),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.isAdmin || row.permission == 'EDIT' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_icon, {
                key: 2,
                onClick: function onClick($event) {
                  return $setup.showModalConfigType(row);
                },
                "class": "gray--text gray--text--hover",
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
          return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.columns, function (value, key) {
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
    "data-props": $setup.dataForm,
    onOnConfigSuccess: $setup.onConfigSuccess,
    onOnFailed: $setup.onFailed,
    onOnClose: $setup.onClose
  }, null, 8 /* PROPS */, ["modelValue", "data-props", "onOnConfigSuccess", "onOnFailed", "onOnClose"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.isShowModalDelete ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_modal_confirm, {
    key: 2,
    modelValue: $setup.isShowModalDelete,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $setup.isShowModalDelete = $event;
    }),
    "data-form": $setup.dataForm,
    "is-loading": $setup.isLoadingSubmit,
    onOnSuccess: $setup.onDelete,
    onOnClose: $setup.onClose
  }, null, 8 /* PROPS */, ["modelValue", "data-form", "is-loading", "onOnSuccess", "onOnClose"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.isShowModalConfigType ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_config_type_modal, {
    key: 3,
    modelValue: $setup.isShowModalConfigType,
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $setup.isShowModalConfigType = $event;
    }),
    "is-loading": $setup.isLoadingSubmit,
    onOnSuccess: $setup.showModalConfig,
    onOnClose: $setup.onClose,
    type: $setup.configType,
    "list-types": $setup.listTypes
  }, null, 8 /* PROPS */, ["modelValue", "is-loading", "onOnSuccess", "onOnClose", "type", "list-types"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_preloader, {
    key: 4
  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64 /* STABLE_FRAGMENT */);
}

/***/ }),

/***/ "./resources/js/constants/constant.js":
/*!********************************************!*\
  !*** ./resources/js/constants/constant.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ABANDON": () => (/* binding */ ABANDON),
/* harmony export */   "ABANDON_CODE": () => (/* binding */ ABANDON_CODE),
/* harmony export */   "CROWD": () => (/* binding */ CROWD),
/* harmony export */   "CROWD_CODE": () => (/* binding */ CROWD_CODE),
/* harmony export */   "DUMPTRASH": () => (/* binding */ DUMPTRASH),
/* harmony export */   "DUMPTRASH_CODE": () => (/* binding */ DUMPTRASH_CODE),
/* harmony export */   "FIGHT": () => (/* binding */ FIGHT),
/* harmony export */   "FIGHT_CODE": () => (/* binding */ FIGHT_CODE),
/* harmony export */   "INTRUSION": () => (/* binding */ INTRUSION),
/* harmony export */   "INTRUSION_CODE": () => (/* binding */ INTRUSION_CODE),
/* harmony export */   "PROTEST": () => (/* binding */ PROTEST),
/* harmony export */   "PROTEST_CODE": () => (/* binding */ PROTEST_CODE),
/* harmony export */   "SECURITY": () => (/* binding */ SECURITY),
/* harmony export */   "SECURITY_CODE": () => (/* binding */ SECURITY_CODE),
/* harmony export */   "STEAL": () => (/* binding */ STEAL),
/* harmony export */   "STEAL_CODE": () => (/* binding */ STEAL_CODE),
/* harmony export */   "TRAFFIC": () => (/* binding */ TRAFFIC),
/* harmony export */   "TRAFFIC_CODE": () => (/* binding */ TRAFFIC_CODE),
/* harmony export */   "securityTypes": () => (/* binding */ securityTypes)
/* harmony export */ });
var TRAFFIC = "Giao thông";
var SECURITY = "An ninh";
var TRAFFIC_CODE = 'Giaothong';
var SECURITY_CODE = 'Anninh';
var INTRUSION_CODE = "xamnhap";
var DUMPTRASH_CODE = "dorac";
var ABANDON_CODE = "vatboroi";
var CROWD_CODE = 'damdong';
var STEAL_CODE = 'vatmatcap';
var FIGHT_CODE = 'danhnhau';
var PROTEST_CODE = 'bieutinh';
var INTRUSION = "Xâm nhập";
var DUMPTRASH = "Đổ rác";
var ABANDON = 'Vật bỏ rơi';
var CROWD = 'Đám đông';
var STEAL = 'Vật mất cắp';
var FIGHT = 'Đánh nhau';
var PROTEST = 'Biểu tình';
var securityTypes = [{
  code: INTRUSION_CODE,
  title: INTRUSION
}, {
  code: DUMPTRASH_CODE,
  title: DUMPTRASH
}, {
  code: ABANDON_CODE,
  title: ABANDON
}, {
  code: CROWD_CODE,
  title: CROWD
}, {
  code: STEAL_CODE,
  title: STEAL
}, {
  code: FIGHT_CODE,
  title: FIGHT
}, {
  code: PROTEST_CODE,
  title: PROTEST
}];

/***/ }),

/***/ "./resources/js/constants/labels.js":
/*!******************************************!*\
  !*** ./resources/js/constants/labels.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// import colorVariable from "../../sass/_variables.scss";

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{
  value: 'red',
  color: '#EE0033',
  description: 'Vị trí cấu hình đèn đỏ',
  type: 'Rectangle'
}, {
  value: 'yellow',
  color: '#FFFF00',
  description: 'Vị trí cấu hình đèn vàng',
  type: 'Rectangle'
}, {
  value: 'green',
  color: '#6FCF97',
  description: 'Vị trí cấu hình đèn xanh',
  type: 'Rectangle'
}, {
  value: 'detect_plate_area',
  color: '#F2994A',
  description: 'Vùng phát hiện biển số',
  type: 'Polygon'
}, {
  value: 'counting_area',
  color: '#B5B4B4',
  description: 'Vùng đo đếm',
  type: 'Polygon'
}, {
  value: 'red_line',
  color: '#F78787',
  description: 'Vạch vượt đèn đỏ',
  type: 'Line'
}, {
  value: 'straight_violation_line',
  color: '#34bfa3',
  description: 'Hướng xác định xe đi thẳng',
  type: 'Polygon'
}, {
  value: 'left_violation_line',
  color: '#409eff',
  description: 'Hướng xác định xe rẽ trái',
  type: 'Polygon'
}, {
  value: 'right_violation_line',
  color: '#E6A23C',
  description: 'Hướng xác định xe rẽ phải',
  type: 'Polygon'
}, {
  value: 'straight_lane',
  color: '#A39D2E',
  description: 'Lane đi thẳng',
  type: 'Polygon'
}, {
  value: 'left_lane',
  color: '#E0E0E0',
  description: 'Lane rẽ trái',
  type: 'Polygon'
}, {
  value: 'right_lane',
  color: '#828282',
  description: ' Lane rẽ phải',
  type: 'Polygon'
}, {
  value: 'straight_left_lane',
  color: '#800080',
  description: 'Lane đi thẳng rẽ trái',
  type: 'Polygon'
}, {
  value: 'straight_right_lane',
  color: '#642b64',
  description: 'Lane đi thẳng rẽ phải',
  type: 'Polygon'
}, {
  value: 'side_walk',
  color: '#E361E3',
  description: 'Vùng không phát hiện phương tiện',
  type: 'Polygon'
}, {
  value: 'lane_direction',
  color: '#0d6efd',
  description: 'Chiều của lane',
  type: 'Line'
}, {
  value: 'stop_area',
  color: '#4F4F4F',
  description: 'Vùng cấm dừng đỗ',
  type: 'Polygon'
}, {
  value: 'long_stop',
  color: '#f56C6C',
  description: 'Thời gian cho phép dừng đỗ',
  type: 'Polygon'
}, {
  value: 'over_line',
  color: '#67C23A',
  description: 'Phát hiện đè vạch',
  type: 'Polygon'
}]);

/***/ }),

/***/ "./resources/js/helpers/utils.js":
/*!***************************************!*\
  !*** ./resources/js/helpers/utils.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "address": () => (/* binding */ address),
/* harmony export */   "aphaNumberHalfWidth": () => (/* binding */ aphaNumberHalfWidth),
/* harmony export */   "capitalize": () => (/* binding */ capitalize),
/* harmony export */   "categoryCode": () => (/* binding */ categoryCode),
/* harmony export */   "checkAddressWard": () => (/* binding */ checkAddressWard),
/* harmony export */   "checkMatchPasswordNotRequiredConfirm": () => (/* binding */ checkMatchPasswordNotRequiredConfirm),
/* harmony export */   "checkMatchPasswordRequiredConfirm": () => (/* binding */ checkMatchPasswordRequiredConfirm),
/* harmony export */   "checkValidatePassword": () => (/* binding */ checkValidatePassword),
/* harmony export */   "convertBase64": () => (/* binding */ convertBase64),
/* harmony export */   "emailExt": () => (/* binding */ emailExt),
/* harmony export */   "halfWidth": () => (/* binding */ halfWidth),
/* harmony export */   "katakana": () => (/* binding */ katakana),
/* harmony export */   "milliseconds": () => (/* binding */ milliseconds),
/* harmony export */   "password": () => (/* binding */ password),
/* harmony export */   "phone": () => (/* binding */ phone),
/* harmony export */   "postCode": () => (/* binding */ postCode),
/* harmony export */   "procedureCode": () => (/* binding */ procedureCode),
/* harmony export */   "requiredPassword": () => (/* binding */ requiredPassword),
/* harmony export */   "upperCamelCaseToSnakeCase": () => (/* binding */ upperCamelCaseToSnakeCase)
/* harmony export */ });
/* harmony import */ var _vuelidate_validators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vuelidate/validators */ "./node_modules/@vuelidate/validators/dist/index.esm.js");

var capitalize = function capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
var convertBase64 = function convertBase64(base64) {
  return base64.replace('data:', '').replace(/^.+,/, '');
};
var upperCamelCaseToSnakeCase = function upperCamelCaseToSnakeCase(value) {
  return value.replace(/^([A-Z])/, function ($1) {
    return $1.toLowerCase();
  }).replace(/([A-Z])/g, function ($1) {
    return "-".concat($1.toLowerCase());
  });
};
var milliseconds = function milliseconds() {
  var h = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return (h * 60 * 60 + m * 60 + s) * 1000;
};
var aphaNumberHalfWidthRegex = /^[ A-Za-z0-9!#$%.@~]*$/;
var passwordRegex = /^[0-9a-zA-Z!#$%.@~]{6,}$/;
var halfWidth = _vuelidate_validators__WEBPACK_IMPORTED_MODULE_0__.helpers.regex(/[a-zA-Z0-9]/);
var aphaNumberHalfWidth = _vuelidate_validators__WEBPACK_IMPORTED_MODULE_0__.helpers.regex(aphaNumberHalfWidthRegex);
var emailExt = _vuelidate_validators__WEBPACK_IMPORTED_MODULE_0__.helpers.regex(/^[a-zA-Z0-9"'+_-]+(?:\.[a-zA-Z0-9_-]+)*@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+))$/);
var phone = _vuelidate_validators__WEBPACK_IMPORTED_MODULE_0__.helpers.regex(/^[0-9\- ]+$/);
var postCode = _vuelidate_validators__WEBPACK_IMPORTED_MODULE_0__.helpers.regex(/(^\d{3}-\d{4}$)/);
var katakana = _vuelidate_validators__WEBPACK_IMPORTED_MODULE_0__.helpers.regex(/^([ァ-ン]|ー|\u3000)+$/);
var address = _vuelidate_validators__WEBPACK_IMPORTED_MODULE_0__.helpers.regex(/^福岡県福岡市.*$/);
var categoryCode = _vuelidate_validators__WEBPACK_IMPORTED_MODULE_0__.helpers.regex(/^\d{3}$/);
var procedureCode = _vuelidate_validators__WEBPACK_IMPORTED_MODULE_0__.helpers.regex(/^[a-zA-Z0-9]{3}$/);
var password = _vuelidate_validators__WEBPACK_IMPORTED_MODULE_0__.helpers.regex(passwordRegex);
var checkAddressWard = function checkAddressWard(e) {
  if (e) {
    var ward = '区';
    return !(e.includes(ward) && e.indexOf(ward) - 6 >= 10);
  } else {
    return true;
  }
};
var requiredPassword = function requiredPassword(e) {
  return !!e;
};
var checkValidatePassword = function checkValidatePassword(e) {
  if (e) {
    if (!passwordRegex.test(e)) {
      return false;
    }
  }
  return true;
};
var checkMatchPasswordRequiredConfirm = function checkMatchPasswordRequiredConfirm(passsword, passswordConfirm) {
  return !(passsword && passswordConfirm && passsword !== passswordConfirm);
};
var checkMatchPasswordNotRequiredConfirm = function checkMatchPasswordNotRequiredConfirm(passsword, passswordConfirm) {
  return !((passsword || passswordConfirm) && passsword !== passswordConfirm);
};


/***/ }),

/***/ "./resources/js/mixins/clickSelect.js":
/*!********************************************!*\
  !*** ./resources/js/mixins/clickSelect.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=style&index=0&id=b42ee6e0&lang=scss":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=style&index=0&id=b42ee6e0&lang=scss ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_13_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_13_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_13_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigTypeModal_vue_vue_type_style_index_0_id_b42ee6e0_lang_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ConfigTypeModal.vue?vue&type=style&index=0&id=b42ee6e0&lang=scss */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=style&index=0&id=b42ee6e0&lang=scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_13_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_13_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_13_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigTypeModal_vue_vue_type_style_index_0_id_b42ee6e0_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_13_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_13_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_13_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigTypeModal_vue_vue_type_style_index_0_id_b42ee6e0_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/vue-drawing-canvas/dist/vue-drawing-canvas.esm.js":
/*!************************************************************************!*\
  !*** ./node_modules/vue-drawing-canvas/dist/vue-drawing-canvas.esm.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ConfigModal_vue_vue_type_template_id_e36795ac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfigModal.vue?vue&type=template&id=e36795ac */ "./resources/js/pages/camera/ConfigModal.vue?vue&type=template&id=e36795ac");
/* harmony import */ var _ConfigModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfigModal.vue?vue&type=script&lang=js */ "./resources/js/pages/camera/ConfigModal.vue?vue&type=script&lang=js");
/* harmony import */ var _ConfigModal_vue_vue_type_style_index_0_id_e36795ac_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfigModal.vue?vue&type=style&index=0&id=e36795ac&lang=scss */ "./resources/js/pages/camera/ConfigModal.vue?vue&type=style&index=0&id=e36795ac&lang=scss");
/* harmony import */ var _home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ConfigModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ConfigModal_vue_vue_type_template_id_e36795ac__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/pages/camera/ConfigModal.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/pages/camera/ConfigTypeModal.vue":
/*!*******************************************************!*\
  !*** ./resources/js/pages/camera/ConfigTypeModal.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ConfigTypeModal_vue_vue_type_template_id_b42ee6e0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfigTypeModal.vue?vue&type=template&id=b42ee6e0 */ "./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=template&id=b42ee6e0");
/* harmony import */ var _ConfigTypeModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfigTypeModal.vue?vue&type=script&lang=js */ "./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=script&lang=js");
/* harmony import */ var _ConfigTypeModal_vue_vue_type_style_index_0_id_b42ee6e0_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfigTypeModal.vue?vue&type=style&index=0&id=b42ee6e0&lang=scss */ "./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=style&index=0&id=b42ee6e0&lang=scss");
/* harmony import */ var _home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ConfigTypeModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ConfigTypeModal_vue_vue_type_template_id_b42ee6e0__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/pages/camera/ConfigTypeModal.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/pages/camera/FormModal.vue":
/*!*************************************************!*\
  !*** ./resources/js/pages/camera/FormModal.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FormModal_vue_vue_type_template_id_464973a8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormModal.vue?vue&type=template&id=464973a8 */ "./resources/js/pages/camera/FormModal.vue?vue&type=template&id=464973a8");
/* harmony import */ var _FormModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormModal.vue?vue&type=script&lang=js */ "./resources/js/pages/camera/FormModal.vue?vue&type=script&lang=js");
/* harmony import */ var _home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_FormModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_FormModal_vue_vue_type_template_id_464973a8__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/pages/camera/FormModal.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/pages/camera/List.vue":
/*!********************************************!*\
  !*** ./resources/js/pages/camera/List.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _List_vue_vue_type_template_id_6f1fbe8f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./List.vue?vue&type=template&id=6f1fbe8f */ "./resources/js/pages/camera/List.vue?vue&type=template&id=6f1fbe8f");
/* harmony import */ var _List_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./List.vue?vue&type=script&lang=js */ "./resources/js/pages/camera/List.vue?vue&type=script&lang=js");
/* harmony import */ var _home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_hungns_src_Project_StableDiffusion_src_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_List_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_List_vue_vue_type_template_id_6f1fbe8f__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/pages/camera/List.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/pages/camera/ConfigModal.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/pages/camera/ConfigModal.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ConfigModal.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigTypeModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigTypeModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ConfigTypeModal.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/pages/camera/FormModal.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./resources/js/pages/camera/FormModal.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigModal_vue_vue_type_template_id_e36795ac__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigModal_vue_vue_type_template_id_e36795ac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ConfigModal.vue?vue&type=template&id=e36795ac */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=template&id=e36795ac");


/***/ }),

/***/ "./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=template&id=b42ee6e0":
/*!*************************************************************************************!*\
  !*** ./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=template&id=b42ee6e0 ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigTypeModal_vue_vue_type_template_id_b42ee6e0__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigTypeModal_vue_vue_type_template_id_b42ee6e0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ConfigTypeModal.vue?vue&type=template&id=b42ee6e0 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=template&id=b42ee6e0");


/***/ }),

/***/ "./resources/js/pages/camera/FormModal.vue?vue&type=template&id=464973a8":
/*!*******************************************************************************!*\
  !*** ./resources/js/pages/camera/FormModal.vue?vue&type=template&id=464973a8 ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_13_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_13_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_13_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigModal_vue_vue_type_style_index_0_id_e36795ac_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ConfigModal.vue?vue&type=style&index=0&id=e36795ac&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigModal.vue?vue&type=style&index=0&id=e36795ac&lang=scss");


/***/ }),

/***/ "./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=style&index=0&id=b42ee6e0&lang=scss":
/*!****************************************************************************************************!*\
  !*** ./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=style&index=0&id=b42ee6e0&lang=scss ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_13_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_13_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_13_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConfigTypeModal_vue_vue_type_style_index_0_id_b42ee6e0_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ConfigTypeModal.vue?vue&type=style&index=0&id=b42ee6e0&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-13.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-13.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-13.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/camera/ConfigTypeModal.vue?vue&type=style&index=0&id=b42ee6e0&lang=scss");


/***/ }),

/***/ "./node_modules/vue-drawing-canvas/node_modules/vue-demi/lib/index.mjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/vue-drawing-canvas/node_modules/vue-demi/lib/index.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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