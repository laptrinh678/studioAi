import ApiService from '~/services/ApiService';

const AdminService = {
    list(page, itemPerPage, email, adminName, stopFlag, deleteFlag) {
        return ApiService.get(`api/admin/list?page=${page}&itemPerPage=${itemPerPage}&email=${email}&adminName=${adminName}&stopFlag=${stopFlag}&deleteFlag=${deleteFlag}`)
    },

    create(params) {
        return ApiService.post('api/admin/create', params);
    },

    update(params) {
        return ApiService.update('api/admin/update', params);
    },

    delete(id) {
        return ApiService.delete(`api/admin/delete/${id}`);
    },

    detail(id) {
        return ApiService.get(`api/admin/detail/${id}`);
    },

    listUser(page) {
        return ApiService.get(`users?page=${page}`);
    },

    getUser(email) {
        return ApiService.get(`user-permission?email=${email}`);
    },

    deleteUser(params) {
        return ApiService.post('delete-user', params);
    },

    updateUser(params) {
        return ApiService.post('user-permission', params);
    },

    findUser(email, page) {
        return ApiService.get(`user/${email}?page=${page}`);
    },

    listUserPrompt(params) {
        return ApiService.get(`user-prompt?${params}`);
    }
};

export default AdminService;
