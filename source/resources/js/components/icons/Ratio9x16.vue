<script setup>
import {FORM_RATIO} from "../../constants/constant";

const props = defineProps({
  width: { type: Number, default: FORM_RATIO.width },
  height: { type: Number, default: FORM_RATIO.height },
})
</script>

<template>
  <svg :width="width" :height="height" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M20 1.6499H36C37.6569 1.6499 39 2.99305 39 4.6499V39.3499C39 41.0068 37.6569 42.3499 36 42.3499H20C18.3431 42.3499 17 41.0068 17 39.3499V4.64991C17 2.99305 18.3431 1.6499 20 1.6499Z"
        stroke="currentColor" stroke-width="2"/>
  </svg>
</template>

<style scoped lang="scss">

</style>