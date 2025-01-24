import ApiService from '~/services/ApiService';

const RegistrantsService = {
    getRegistrants(month) {
        return ApiService.get(`api/admin/general-user/statistical/${month}`);
    },
};

export default RegistrantsService;
