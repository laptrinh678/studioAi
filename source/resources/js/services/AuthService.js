import ApiService from '~/services/ApiService'
import {
    API_LOGIN,
    API_LOGOUT,
    API_REFRESH,
    API_PROFILE,
    API_GET_TOKEN,
    API_ADD_USER
} from '~/constants/url'
import { REFRESH_TOKEN } from '~/helpers/localStorage'

const AuthService = {
    login({email, password, requestTime}) {
        return ApiService.post(API_LOGIN, {email, password, requestTime} );
    },
    refreshToken() {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        // return ApiService.post(API_REFRESH);
    },
    logout() {
        return ApiService.post(API_LOGOUT, {}, {
            globalErrorHandler: {on: false}
        });
    },
    getAuthUser() {
        return ApiService.get(API_PROFILE);
    },
    getTokenSSO({code, code_verifier}) {
        return ApiService.post(API_GET_TOKEN, {code, code_verifier} );
    },
    addUser({email}) {
        return ApiService.post(API_ADD_USER, {email})
    }
}
export default AuthService;