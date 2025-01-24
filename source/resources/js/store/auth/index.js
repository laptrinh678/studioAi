import {AuthService} from '~/services'
import {
    saveToken,
    getToken,
    saveUserInfo,
    deleteSearchParams,
    deleteActivePage,
    saveExpiredDate,
    deleteLocalStorage,
    saveSSO,
    base64URLEncode,
    sha256,
    generateState,
    saveIdToken
} from '~/helpers/localStorage'
import router from "~/router"
import {
    ACTION_LOGIN,
    ACTION_REFRESH_TOKEN,
    ACTION_LOGOUT,
    ACTION_SAVE_AUTH_USER, ACTION_AUTHORIZE_SSO, ACTION_GET_TOKEN_SSO
} from './actions'

import {
    LOGOUT,
    SAVE_ACCESS_TOKEN,
    SAVE_AUTH_USER,
    TOGGLE_IS_FETCHING_ACCESS_TOKEN,
    SAVE_ID_TOKEN
} from './mutations'
import moment from 'moment';
import { FORMAT_DATE } from '~/helpers/constant'
import crypto from 'crypto-js'

const state = {
    isAdmin: null,
    authUser: null,
    accessToken: null,
    refreshToken: null,
    userInfo: null,
    isFetchingAccessToken: false
}

const getters = {
    isAdmin(state) {
        return state.isAdmin;
    },
    authUser(state) {
        return state.authUser;
    },
    accessToken(state) {
        return state.accessToken;
    },
    refreshToken(state) {
        return state.refreshToken;
    },
    isAuthenticated(state) {
        return Boolean(state.authUser);
    },
    isFetchingAccessToken(state) {
        return state.isFetchingAccessToken;
    },
    userInfo(state){
        return state.userInfo
    }
}

const actions = {
    async [ACTION_LOGIN](context, payload) {
        const {data} = await AuthService.login(payload);

        if (!data.error) {
            state.authUser = "1"
            deleteSearchParams();
            deleteActivePage();

            // saveUserInfo(JSON.stringify(data))
            // saveExpiredDate(moment().add((data.expires_in / 14400), 'days').format(FORMAT_DATE.FULL_DATE_TIME));

            // context.commit(SAVE_ACCESS_TOKEN, data.access_token);
            // context.dispatch(ACTION_SAVE_AUTH_USER);
        }
    },

    async [ACTION_LOGOUT](context) {
        const stateSSO = generateState(10)
        const verifier = base64URLEncode(crypto.lib.WordArray.random(32))
        const challenge = base64URLEncode(sha256(verifier))
        saveSSO('ssoState', stateSSO)
        saveSSO('ssoVerify', verifier)

        const sso_authorize_url = process.env.MIX_SSO_LOGOUT_URL
        const client_id = process.env.MIX_CLIENT_ID
        const redirect_url = process.env.MIX_REDIRECT_URL

        const request = `${sso_authorize_url}?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=code&scope=openid email profile phone &state=${state}&code_challenge=${challenge}&code_challenge_method=S256`
        return window.location.href = request
        // context.commit(LOGOUT);
        // deleteLocalStorage();
        // router.push(
        //     {
        //         name: 'Login',
        //     }
        // )
    },

    async [ACTION_REFRESH_TOKEN](context) {
        console.log('ACTION_REFRESH_TOKEN');
        context.commit(TOGGLE_IS_FETCHING_ACCESS_TOKEN, true);
        const refreshToken = localStorage.getItem('refreshToken')
        const {data} = await AuthService.refreshToken(refreshToken);

        saveExpiredDate(moment().add((data.expires_in / 14400), 'days').format(FORMAT_DATE.FULL_DATE_TIME));

        context.commit(SAVE_ACCESS_TOKEN, data.access_token);
        context.commit(TOGGLE_IS_FETCHING_ACCESS_TOKEN);

        await context.dispatch(ACTION_SAVE_AUTH_USER);
        return data.access_token
    },

    async [ACTION_SAVE_AUTH_USER](context) {
        if (getToken()) {
            const {data} = await AuthService.getAuthUser();
            saveUserInfo(JSON.stringify(data))
            context.commit(SAVE_AUTH_USER, data);
            return data;
        }
    },

    async [ACTION_AUTHORIZE_SSO](context) {
        const stateSSO = generateState(10)
        const verifier = base64URLEncode(crypto.lib.WordArray.random(32))
        const challenge = base64URLEncode(sha256(verifier))
        saveSSO('ssoState', stateSSO)
        saveSSO('ssoVerify', verifier)

        const sso_authorize_url = process.env.MIX_SSO_AUTHORIZE_URL
        const client_id = process.env.MIX_CLIENT_ID
        const redirect_url = process.env.MIX_REDIRECT_URL

        const request = `${sso_authorize_url}?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=code&scope=openid email profile phone &state=${state}&code_challenge=${challenge}&code_challenge_method=S256`
        return window.location.href = request
    },

    async [ACTION_GET_TOKEN_SSO](context, payload) {
        const {data} = await AuthService.getTokenSSO(payload)
        context.commit(SAVE_ACCESS_TOKEN, data.access_token);
        context.commit(SAVE_ID_TOKEN, data.id_token)

        if (data.access_token.length > 0) {
            return router.push({name: 'Landing Page'})
        }

        return router.push({name: 'PageNotFound'})
    }
}

const mutations = {
    [LOGOUT](state) {
        Object.assign(state, {
            authUser: null,
            accessToken: null
        });
    },

    [SAVE_ACCESS_TOKEN](state, token) {
        saveToken(token); // save acces_token to localStorage
        state.accessToken = token;
    },

    [SAVE_ID_TOKEN](state, idToken) {
        saveIdToken(idToken)
    },

    [SAVE_AUTH_USER](state, authUser) {
        state.isAdmin = authUser.id == 1;
        state.authUser = authUser;
    },

    [TOGGLE_IS_FETCHING_ACCESS_TOKEN](state, forceState = null) {
        state.isFetchingAccessToken = forceState !== null ?
            forceState :
            !state.isFetchingAccessToken;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
