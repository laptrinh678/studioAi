import {findIndex, last, remove} from "lodash";
import {
    ACTION_SET_ARTIST,
    ACTION_SET_CONTENT,
    ACTION_SET_TEXT,
    ACTION_SET_BACKGROUND,
    ACTION_SET_CONTENT_TYPE,
    ACTION_ADD_SCENE,
    ACTION_DELETE_TEXT,
    ACTION_SET_DURATION,
    ACTION_SET_TARGET,
    ACTION_GET_TARGET,
    ACTION_SET_VOICE_CONTENT,
    ACTION_SET_NAME_SCENE,
    ACTION_CLEAR_DATA,
    ACTION_SET_IMAGE_DECORATE,
    ACTION_DELETE_IMAGE_DECORATE,
    ACTION_SET_IMAGE_ASSETS
} from "./action";

const artistAttr = {
    width: 150,
    height: 200,
    x: 50,
    y: 50,
    draggable: true
}

const state = []
export let storeImageAsset = null
let target = null

const actions = {
    [ACTION_ADD_SCENE](context, data) {
        state.push({
            id: data.id,
            name: data.name,
            backgroundImage: '',
            artist: {imgObj:null, item: null, attr: artistAttr, nodeId: null},
            preview: '',
            texts: [],
            contentType: 'message',
            content: null,
            voice: {content: '', region: ''},
            duration: data.duration,
            imageDecorate: []
        })
    },

    [ACTION_SET_ARTIST](context, data) {
        const index = findScene(data.sceneId)
        state[index].artist = {
            imgObj: data.imgObj,
            item: data.item,
            attr: data.attr,
            nodeId: data.nodeId
        }
    },

    [ACTION_SET_BACKGROUND](context, data) {
        const index = findScene(data.sceneId)
        state[index].backgroundImage = data.url
    },

    [ACTION_SET_TEXT](context, data) {
        const index = findScene(data.sceneId)
        state[index].texts.push({
            attr: data.attr,
            nodeId: data.nodeId,
            transformId: data.transformId,
        })
    },

    [ACTION_DELETE_TEXT](context, data) {
        const index = findScene(data.sceneId)
        remove(state[index].texts, e => e.id === data.textNodeId)
    },

    [ACTION_SET_CONTENT](context, data) {
        if (target !== null) {
            const index = findScene(target)
            state[index].content = data
        }
    },

    [ACTION_SET_CONTENT_TYPE](context, data) {
        if (target !== null) {
            const index = findScene(target)
            state[index].contentType = data
        }
    },

    [ACTION_SET_VOICE_CONTENT](context, data) {
        if (target !== null) {
            const index = findScene(target)
            state[index].voice.content = data.voiceContent
            state[index].voice.region = data.voiceRegion

            console.log(state[index].voice)
        }
    },

    [ACTION_SET_DURATION](context, data) {
        if (target !== null) {
            const index = findScene(target)
            state[index].duration = data
        }
    },

    [ACTION_SET_TARGET](context, data) {
        target = data
    },

    [ACTION_GET_TARGET]() {
        return target
    },

    [ACTION_SET_NAME_SCENE](context, data) {
        const index = findScene(data.sceneId)
        state[index].name = data.name
    },

    [ACTION_CLEAR_DATA](context) {
        const len = state.length
        state.splice(0, len)
    },

    [ACTION_SET_IMAGE_DECORATE](context, data) {
        const index = findScene(data.sceneId)
        state[index].imageDecorate.push({
            nodeId: data.nodeId,
            attr: data.attr,
            imagePath: data.imagePath
        })
    },

    [ACTION_DELETE_IMAGE_DECORATE](context, data) {
        const index = findScene(data.sceneId)
        remove(state[index].imageDecorate, e => e.nodeId === data.nodeId)
    },

    [ACTION_SET_IMAGE_ASSETS](context, data) {
        storeImageAsset = data
    }
}

const findScene = (sceneId) => {
    return findIndex(state, e => e.id === sceneId)
}

export default {
    state,
    actions,
    target
}