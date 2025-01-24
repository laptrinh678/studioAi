<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { ACTION_CLEAR_ERROR } from '~/store/common/actions'
import { useStore } from "vuex";
import { computed, watchEffect } from "vue"
import authUser from "~/mixins/authUser"
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { ACTION_SAVE_AUTH_USER } from "~/store/auth/actions"

const toast = useToast();

export default {
    name: "App",
    mixins: [authUser],
    setup() {
        const store = useStore();
        const router = useRouter();
        const isAuthenticated = computed(() => store.getters["isAuthenticated"]);
        const isLoading = computed(() => store.getters["isLoading"]);
        const error = computed(() => store.getters["error"]);
        const message = computed(() => store.getters["message"]);
        const authUser = computed(() => store.getters["authUser"]);
        watchEffect(() => {
            if (error.value !== null && error.value.message !== "") {
                toast.error(error.value.message)
                store.dispatch(ACTION_CLEAR_ERROR);
            }
        })
        watchEffect(() => {
            if (message.value) {
                toast(message.value)
            }
        })
        // if (!authUser.value || !authUser.value.username) {
        //     store.dispatch(ACTION_SAVE_AUTH_USER)
        // }
        return {
            isAuthenticated,
            isLoading,
            error,
            message,
            authUser,
            router
        };
    }
}
</script>

<style lang="scss">
@import "@/sass/index.scss";
@import "@/sass/layout.scss";
</style>