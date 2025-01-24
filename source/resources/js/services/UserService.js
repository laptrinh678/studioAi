import ApiService from '~/services/ApiService';

const prefix = 'users'

const UserService = {
    list(page) {
        return ApiService.post(`${prefix}`, page);
    },
    create(params) {
        return ApiService.post(`${prefix}/store`, params)
    },
    update(id, params) {
        return ApiService.post(`${prefix}/update/${id}`, params)
    },
    update_profile(params) {
        return ApiService.post(`${prefix}/update-profile`, params)
    },
    change_password(params) {
        return ApiService.post(`${prefix}/change-password`, params)
    },
    destroy(id) {
        return ApiService.post(`${prefix}/destroy/${id}`)
    }
};

export default UserService;
