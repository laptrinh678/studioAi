import { createApp } from 'vue';
import App from '~/components/App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from '../store';
import { API_ENDPOINT } from '~/constants/config';
import {
    ACTION_SET_ERROR,
    ACTION_SET_LOADING,
    ACTION_FINISH_LOADING
} from '~/store/common/actions';
import {
    NO_INTERNET,
    TOKEN_INVALID,
    UNAUTHORIZED,
    DATA_INVALID,
    FORBIDDEN,
    SOMETHING_WHEN_WRONG
} from '~/helpers/message';
import { ACTION_REFRESH_TOKEN, ACTION_AUTHORIZE_SSO } from '~/store/auth/actions';
import router from '~/router';
import {
    deleteUserInfo,
    deleteToken,
    getExpiredDate,
    EXPIRED_DATE,
    deleteExpiredDate,
    ACCESS_TOKEN
} from '~/helpers/localStorage';
import moment from 'moment';
import { useToast } from 'vue-toastification';
import {
    FORMAT_DATE,
    ONE_MINUTE,
    UNIT_MILLISECONDS
} from '~/helpers/constant';
import { API_LOGIN, API_REFRESH } from '~/constants/url'

const toast = useToast();
const app = createApp(App);
const ApiService = {
    init() {
        const service = this;
        app.use(VueAxios, axios);
        axios.defaults.baseURL = API_ENDPOINT;
        // intercept every request
        axios.interceptors.request.use(
            async (request) => {
                // check expired token
                // const isFetchingAccessToken = store.getters.isFetchingAccessToken;
                // let expiredDate = moment(getExpiredDate(EXPIRED_DATE))
                //                     .add((-(ONE_MINUTE/UNIT_MILLISECONDS)), 'seconds')
                //                     .format(FORMAT_DATE.FULL_DATE_TIME);
                // let currentDate = moment(new Date()).format(FORMAT_DATE.FULL_DATE_TIME);
                //
                // if (moment(expiredDate).diff(moment(currentDate)) <= 0 && !isFetchingAccessToken) {
                //     await store.dispatch(ACTION_REFRESH_TOKEN);
                // }

                let accessToken = store.getters.accessToken || localStorage.getItem(ACCESS_TOKEN);

                if (accessToken) {
                    request.headers.Authorization = `Bearer ${accessToken}`;
                }
                // if (request.setLoading) {
                //     store.dispatch(ACTION_SET_LOADING).then(() => {});
                // }
                return request;
            },
            (error) => {
                const { response } = error;
                if (response.config.setLoading) {
                    store.dispatch(ACTION_FINISH_LOADING).then(() => {});
                }
                // Do something with request error
                return Promise.reject(response);
            }
        );
        // // intercept every response
        axios.interceptors.response.use(
            (response) => {
                const { config } = response;
                if (config.setLoading) {
                    store.dispatch(ACTION_FINISH_LOADING).then(() => {});
                }
                return response;
            },
            (error) => {
                const { response, config } = error;
                if (config.setLoading) {
                    store.dispatch(ACTION_FINISH_LOADING).then(() => {});
                }

                if (response && response.status === 401) {
                    // Đi đến trang đăng nhập sso
                    deleteUserInfo();
                    store.dispatch(ACTION_AUTHORIZE_SSO).then(() => {})

                    // if (config.url === API_LOGIN) {
                    //     toast.error(UNAUTHORIZED);
                    // }
                    //
                    // // refresh token
                    // if (config.url !== API_REFRESH && config.url !== API_LOGIN) {
                    //     toast.error(TOKEN_INVALID);
                    //
                    //     deleteUserInfo();
                    //     deleteToken();
                    //     deleteExpiredDate();
                    //     router.push({
                    //         name: 'Login',
                    //     });
                    // }
                }

                // check if config errorHandler is on
                if (config.globalErrorHandler.on) {
                    service.handleError(response, config.globalErrorHandler.exclude);
                }

                return response
                // return Promise.reject(response);
            }
        );
    },
    setHeader() {
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.setLoading = true;
        axios.defaults.globalErrorHandler = {
            on: true,
            exclude: [],
        };
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    },
    setHeaderImage(type) {
        axios.defaults.headers.common['Content-Type'] = type;
    },
    setResponseType(type) {
        axios.defaults.responseType = type;
    },
    get(resource, config = {}) {
        return axios.get(resource, config);
    },
    post(resource, params, config = {}) {
        return axios.post(`${resource}`, params, config);
    },
    update(resource, params, config = {}) {
        return axios.put(resource, params, config);
    },
    updateBulk(resource, params, config = {}) {
        return axios.put(resource, params, config);
    },
    delete(resource, config = {}) {
        return axios.delete(resource, config);
    },
    patch(resource, params, config = {}) {
        return axios.patch(resource, params, config);
    },
    customRequest(config) {
        return axios(config);
    },
    handleError(response, ignore = []) {
        if (ignore.length > 0 && ignore.includes(response.status)) return response;
        let error = null;
        if (!navigator.onLine || !response) {
            error = new Error(NO_INTERNET);
        } else {
            switch (response.status) {
                case 400:
                    if (response.data.message.length > 0) toast.error(response.data.message)
                    break;

                case 401:
                    router.push({
                        name: 'Login',
                    });
                    break;

                case 403:
                    toast.error(FORBIDDEN);
                    break;

                case 404:
                    router.push({
                        name: 'PageNotFound',
                    });
                    break;

                case 405:
                    error = new Error(`${response.status} ${response.data.message}`);
                    break;

                case 413:
                    toast.error(SOMETHING_WHEN_WRONG);
                    break;

                case 422:
                    for (let er in response.data.errors) {
                        if (response.data.errors[er][0]) {
                            error = response.data.errors[er][0];
                        } else {
                            error = response.data.errors[er];
                        }
                        break;
                    }
                    if (response.config.url === 'admin/login') {
                        error = new Error(`${response.status} ${response.data.message}`);
                    }

                    if (response.data.message.length > 0) toast.error(response.data.message)
                    else toast.error(DATA_INVALID);

                    break;

                case 409:
                    break;

                case 500:
                    toast.error(SOMETHING_WHEN_WRONG);
                    break;

                case 502:
                case 504:
                case 503:
                    router.push({name: 'ServiceUnavailable'});
                    break;

                default:
                    router.push({
                        name: 'ServerError',
                    });
                    break;
            }
        }
        // store.dispatch(ACTION_SET_ERROR, error).then(() => {});
    },
    makeURL(prefix, params = {}) {
        let url = `${prefix}?`;
        Object.keys(params).map((e, i) => {
            url += `${e}=${params[e]}`;
            if (i < Object.keys(params).length - 1) {
                url += `&`;
            }
        });
        return url;
    },
};

export default ApiService;
