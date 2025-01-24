import finIndex from 'lodash/findIndex'

import {
    ACTION_SET_ERROR,
    ACTION_CLEAR_ERROR,
    ACTION_SET_LOADING,
    ACTION_FINISH_LOADING,
    ACTION_CLEAR_LOADING,
    ACTION_SET_MESS,
    ACTION_CLEAR_MESS,
    ACTION_SET_PAGE_TITLE,
    ACTION_SET_ACTIVE_SIDEBAR,
    ACTION_SET_SPECIAL_LOADING,
    ACTION_SET_DATA_LOADED,
    ACTION_SET_SEARCH_PARAMS,
    ACTION_CLEAR_SEARCH_PARAMS,
    ACTION_SET_ACTIVE_PAGE,
    ACTION_CLEAR_ACTIVE_PAGE,
    ACTION_STORE_PROMPT_STYLES, ACTION_STORE_PROJECT_ID, ACTION_STORE_PROJECT_ACTION, ACTION_STORE_DATA_GENERATED
} from './actions'

import {
    SET_ERROR,
    CLEAR_ERROR,
    SET_LOADING,
    FINISH_LOADING,
    CLEAR_LOADING,
    SET_MESSAGE,
    CLEAR_MESSAGE,
    SET_PAGE_TITLE,
    SET_ACTIVE_SIDEBAR,
    SET_SPECIAL_LOADING,
    SET_DATA_LOADED,
    CLEAR_SEARCH_PARAMS,
    SET_SEARCH_PARAMS,
    SET_ACTIVE_PAGE,
    CLEAR_ACTIVE_PAGE,
    SET_PROMPT_STYLES, SET_PROJECT_ID, SET_PROJECT_ACTION, SET_DATA_GENERATED
} from './mutations'

const state = {
    loading: 0,
    specialLoading: 0,
    message: null,
    error: null,
    pageTitle: '',
    activeSidebar: '',
    dataLoaded: [],
    searchParams: {
        admins: {},
    },
    activePage: '',
    prompt_styles: [],
    project_id: '',
    project_action: 'create',
    result_generated: null
}

const getters = {
    dataLoaded: (state) => state.dataLoaded,
    specialLoading: (state) => state.specialLoading > 0,
    isLoading: (state) => state.loading > 0 && state.specialLoading <= 0,
    error: (state) => state.error,
    message: (state) => state.message,
    pageTitle: (state) => state.pageTitle,
    activeSidebar: (state) => state.activeSidebar,
    searchParams: (state) => state.searchParams,
    activePage: (state) => state.activePage,
    prompt_styles: (state) => state.prompt_styles,
    project_id: (state) => state.project_id,
    project_action: (state) => state.project_action,
    result_generated: (state) => state.result_generated
}

const actions = {
    [ACTION_SET_ERROR](context, error) {
        context.commit(SET_ERROR, error);
    },
    [ACTION_CLEAR_ERROR](context) {
        context.commit(CLEAR_ERROR);
    },
    [ACTION_SET_LOADING](context) {
        context.commit(SET_LOADING)
    },
    [ACTION_FINISH_LOADING](context) {
        context.commit(FINISH_LOADING)
    },
    [ACTION_CLEAR_LOADING](context) {
        context.commit(CLEAR_LOADING)
    },
    [ACTION_SET_SPECIAL_LOADING](context, payload) {
        context.commit(SET_SPECIAL_LOADING, payload)
    },
    [ACTION_SET_DATA_LOADED](context, payload) {
        context.commit(SET_DATA_LOADED, payload)
    },
    [ACTION_SET_MESS](context, message) {
        context.commit(SET_MESSAGE, message)
    },
    [ACTION_CLEAR_MESS](context) {
        context.commit(CLEAR_MESSAGE)
    },
    [ACTION_SET_PAGE_TITLE](context, pageTitle) {
        context.commit(SET_PAGE_TITLE, pageTitle)
    },
    [ACTION_SET_ACTIVE_SIDEBAR](context, sidebar) {
        context.commit(SET_ACTIVE_SIDEBAR, sidebar)
    },
    [ACTION_CLEAR_SEARCH_PARAMS](context, params) {
        context.commit(CLEAR_SEARCH_PARAMS, params)
    },
    [ACTION_SET_SEARCH_PARAMS](context, params) {
        context.commit(SET_SEARCH_PARAMS, params)
    },
    [ACTION_SET_ACTIVE_PAGE](context, params) {
        context.commit(SET_ACTIVE_PAGE, params)
    },
    [ACTION_CLEAR_ACTIVE_PAGE](context, params) {
        context.commit(CLEAR_ACTIVE_PAGE, params)
    },
    [ACTION_STORE_PROMPT_STYLES](context, params) {
        context.commit(SET_PROMPT_STYLES, params)
    },
    [ACTION_STORE_PROJECT_ID](context, params) {
        context.commit(SET_PROJECT_ID, params)
    },
    [ACTION_STORE_PROJECT_ACTION](context, params) {
        context.commit(SET_PROJECT_ACTION, params)
    },
    [ACTION_STORE_DATA_GENERATED](context, params) {
        context.commit(SET_DATA_GENERATED, params)
    }
}

const mutations = {
    [SET_LOADING](state) {
        state.loading++
    },
    [FINISH_LOADING](state) {
        if (state.loading > 0) {
            state.loading--
        }
    },
    [CLEAR_LOADING](state) {
        state.loading = 0
    },
    [SET_SPECIAL_LOADING](state, payload) {
        state.specialLoading = payload
    },
    [SET_DATA_LOADED](state, payload) {
        if (payload) {
            let index = finIndex(state.dataLoaded, e => e.id === payload.id)
            if (index >= 0) {
                state.dataLoaded[index] = {...payload}
            } else {
                state.dataLoaded = [...state.dataLoaded, ...[payload]]
            }
        }
    },
    [SET_MESSAGE](state, message) {
        state.message = message
    },
    [CLEAR_MESSAGE](state) {
        state.message = null
    },
    [SET_ERROR](state, error) {
        state.error = error
    },
    [CLEAR_ERROR](state) {
        state.error = null
    },
    [SET_PAGE_TITLE](state, pageTitle) {
        state.pageTitle = pageTitle
    },
    [SET_ACTIVE_SIDEBAR](state, sidebar) {
        state.activeSidebar = sidebar
    },
    [CLEAR_SEARCH_PARAMS](state, params) {
        Object.keys(state.searchParams).map((e) => {
            if (e !== params) {
                state.searchParams[e] = {}
            }
        })
    },
    [SET_SEARCH_PARAMS](state, params) {
        state.searchParams[params.key] = params.data
    },
    [SET_ACTIVE_PAGE](state, params) {
        state.searchParams[params.key] = params.data
    },
    [CLEAR_ACTIVE_PAGE](state, params) {
        Object.keys(state.activePage).map((e) => {
            if (e !== params) {
                state.activePage[e] = {}
            }
        })
    },
    [SET_PROMPT_STYLES] (state, params) {
        state.prompt_styles = params
    },
    [SET_PROJECT_ID] (state, params) {
        state.project_id = params
    },
    [SET_PROJECT_ACTION] (state, params) {
        state.project_action = params
    },
    [SET_DATA_GENERATED](state, params) {
        state.result_generated = params
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
