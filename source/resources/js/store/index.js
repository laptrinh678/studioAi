import { createStore } from 'vuex'
import common from "./common"
import auth from "./auth"
import scenes from "./scenes"

// Load store modules dynamically.
const requireContext = require.context("./modules", false, /.*\.js$/);
const debug = process.env.NODE_ENV !== "production";

const modules = requireContext
    .keys()
    .map(file => [file.replace(/(^.\/)|(\.js$)/g, ""), requireContext(file)])
    .reduce((modules, [name, module]) => {
        if (module.namespaced === undefined) {
            module.namespaced = true;
        }

        return { ...modules, [name]: module };
    }, {});

// Create a new store instance.
const store = createStore({
    modules:{
        common,
        auth,
        scenes
    },
    strict: debug,
    state () {
        return {
            sonla_001: 'http://117.4.155.161/video/sonla_001/index.m3u8',
            vungtau_001: 'http://117.4.155.161/video/vungtau_001/index.m3u8',
            vungtau_002: 'http://117.4.155.161/video/vungtau_002/index.m3u8'
        }
    }
})
export default store