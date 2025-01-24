import ApiService from '~/services/ApiService';
const prefix = ''
const VirtualHumanService = {
    storeArtist(body) {
        return ApiService.post(`${prefix}/artist`, body)
    },

    getArtists() {
        return ApiService.get(`${prefix}/artist`)
    },

    getProjects() {
        return ApiService.get(`${prefix}/project`)
    },

    storeProject(body) {
        return ApiService.post(`${prefix}/project`, body)
    },

    deleteProject(body) {
        return ApiService.post(`${prefix}/project/delete`, body)
    },

    getScenes(projectId) {
        return ApiService.get(`${prefix}/scene/${projectId}`)
    },

    textToSpeech(body) {
        return ApiService.post(`${prefix}/text-to-speech`, body)
    },

    getImageAsset() {
        return ApiService.get(`${prefix}/image-asset`)
    },

    uploadImage(body) {
        return ApiService.post(`${prefix}/upload`, body)
    },

    shareImage(body) {
        return ApiService.post(`${prefix}/share-image`, body)
    }
}

export default VirtualHumanService