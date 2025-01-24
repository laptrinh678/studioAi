<template>
    <div v-if="authUser" class="sidebar-right d-flex">
        <img :src="logoUser" height="30" alt="" class="width-4 me-4" />
    </div>
</template>

<script>
import { computed } from "vue"
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import LogoImg from '@/assets/img/logo/logo.svg'
import LogoUser from '@/assets/svg/icons/ic_user.svg'

export default {
    setup() {
        const router = useRouter();
        const goHome = () => {
            router.push({
                name: 'dashboard',
                params: {},
            });
        };
        const store = useStore();
        const authUser = computed(() => store.getters["authUser"]);
        const logoImg = LogoImg;
        const logoUser = LogoUser;
        return {
            logoImg,
            logoUser,
            goHome,
            authUser
        }
    },
    methods: {
        logout() {
            console.log('logout');
        }
    }
}
</script>
