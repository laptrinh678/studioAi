import axios from "axios";
import Cookies from "js-cookie";
import * as types from "../mutation-types";
import { API_PROFILE, API_LOGOUT, API_REFRESH } from "~/constants/url";

// state
export const state = {
    user: null,
    perms: [],
    token: Cookies.get("token")
};

// getters
export const getters = {
    user: state => state.user,
    token: state => state.token,
    perms: state => state.perms,
    check: state => state.user !== null
};

// actions
export const actions = {
    saveToken({ commit, dispatch }, payload) {
        commit(types.SAVE_TOKEN, payload);
    },

    async fetchUser({ commit, dispatch }) {
        console.log('fetchUser');
        try {
            const { data } = await axios.post(API_PROFILE);

            let perms = [];
            data.roles.forEach(role => {
                perms = perms.concat(role.perms);
            });

            setInterval(() => {
                dispatch("refreshToken");
            }, 30 * 60 * 1000);
            let user = data.user;
            user.defaultUrl = data.roles[0].default_url;
            commit(types.FETCH_USER_SUCCESS, { user: data.user, perms: perms });
        } catch (e) {
            commit(types.FETCH_USER_FAILURE);
        }
    },

    async refreshToken({ commit }) {
        try {
            const { data } = await axios.post(API_REFRESH);

            if (data.code == 0) {
                commit(types.SAVE_TOKEN, {
                    token: data.access_token,
                    remember: true
                });
            }
        } catch (e) {}
    },

    updateUser({ commit }, payload) {
        commit(types.UPDATE_USER, payload);
    },

    async logout({ commit }) {
        try {
            await axios.post(API_LOGOUT);
        } catch (e) {}

        commit(types.LOGOUT);
    }
};

// mutations
export const mutations = {
    [types.SAVE_TOKEN](state, { token, remember }) {
        state.token = token;
        Cookies.set("token", token, { expires: remember ? 365 : null });
    },

    [types.FETCH_USER_SUCCESS](state, { user, perms }) {
        state.user = user;
        state.perms = perms;
    },

    [types.FETCH_USER_FAILURE](state) {
        state.token = null;
        state.perms = [];
        Cookies.remove("token");
    },

    [types.LOGOUT](state) {
        state.user = null;
        state.perms = [];
        state.token = null;

        Cookies.remove("token");
    },

    [types.UPDATE_USER](state, { user }) {
        state.user = user;
    }
};
