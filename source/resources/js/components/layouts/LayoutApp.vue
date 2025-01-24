<template>
    <div class="wrapper">
        <Navbar :auth="true" />
        <div class="main-content">
            <sidebar @refresh="refresh"></sidebar>
            <div class="px-5 pt-2 container-fluid">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import {styleSidebar, styleMain} from '~/mixins/layout';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { onMounted, ref } from 'vue';

export default {
    components: {
        Sidebar,
        Navbar,
    },
    setup() {
        const isRouterAlive = ref(false);
        const refresh = () => {
            isRouterAlive.value = false;
            setTimeout(() => {
                isRouterAlive.value = true;
            });
        };
        onMounted(() => {
            styleSidebar();
            styleMain();
        })
        return {
            isRouterAlive,
            refresh,
        };
    },
};
</script>
<style lang="scss">
</style>
