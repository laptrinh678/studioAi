<template>
    <div class="wrapper">
        <div class="">
            <div class="px-0 container-fluid d-flex">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import {styleSidebar, styleMain} from '~/mixins/layout';
import { onMounted, ref } from 'vue';

export default {
    components: {
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
