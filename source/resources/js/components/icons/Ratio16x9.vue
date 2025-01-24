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
        d="M7.64999 30L7.64999 14C7.64999 12.3431 8.99314 11 10.65 11L45.35 11C47.0068 11 48.35 12.3431 48.35 14V30C48.35 31.6569 47.0068 33 45.35 33H10.65C8.99314 33 7.64999 31.6569 7.64999 30Z"
        stroke="currentColor" stroke-width="2"/>
  </svg>
</template>

<style scoped lang="scss">

</style>