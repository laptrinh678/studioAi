<template>
    <router-view v-slot="{ Component }">
        <transition>
            <component :is="Component" />
        </transition>
    </router-view>

    <transition name="fade" mode="out-in">
        <slot>
            <router-view />
        </slot>
    </transition>
</template>

<script>
export default {
    name: "Child"
};
</script>
