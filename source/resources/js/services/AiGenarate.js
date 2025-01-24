import ApiService from '~/services/ApiService';
const prefix = ''
const AiGenarate = {
    getPromptStyles() {
        return ApiService.get(`${prefix}/get-prompt-styles`)
    },

    textToImages(body) {
        return ApiService.post(`${prefix}/text-to-images`, body)
    },

    imageToImages(body) {
        return ApiService.post(`${prefix}/image-to-images`, body)
    },

    inpaintingToImages(body) {
        return ApiService.post(`${prefix}/inpainting`, body)
    },

    upScaleImage(body) {
        return ApiService.post(`${prefix}/upscale-images`, body)
    },

    translateVnToEng(text) {
        return ApiService.post(`${prefix}/vn-to-eng`, {text: text})
    },

    textToVideo(body) {
        return ApiService.post(`${prefix}/text-to-video`, body)
    },

    textToBackground(body) {
        return ApiService.post(`${prefix}/sound-to-background`, body)
    },

    soundToVideo(body) {
        return ApiService.post(`${prefix}/sound-to-video`, body)
    },

    saveProject(body) {
        return ApiService.post(`${prefix}/save-project`, body)
    },

    textToImageControlnet(body) {
        return ApiService.post(`${prefix}text-to-image-controlnet`, body)
    },

    outPainting(body) {
        return ApiService.post(`${prefix}out-painting`, body)
    },

    shareGenerated(body) {
        return ApiService.post(`${prefix}share-generated`, body)
    },

    getShareGenerated() {
        return ApiService.get(`${prefix}share-generated`)
    },

    interaction(body) {
        return ApiService.post(`${prefix}user-interact`, body)
    }
}

export default AiGenarate