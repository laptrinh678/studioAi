import {computed} from "vue";
import {useStore} from "vuex";

export default {
    setup() {
        const store = useStore()
        const userInfo = computed(() => store.getters["authUser"])
        return {
            userInfo
        }
    },
}