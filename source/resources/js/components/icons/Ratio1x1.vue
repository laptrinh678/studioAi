<script setup>
import {FORM_RATIO} from "../../constants/constant";

const props = defineProps({
  width: { type: Number, default: FORM_RATIO.width },
  height: { type: Number, default: FORM_RATIO.height },
})
</script>

<template>
  <svg :width="width" :height="height" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Aspect Ratio Shape">
      <path id="Shape"
            d="M20 11H36C37.6569 11 39 12.3431 39 14V30C39 31.6569 37.6569 33 36 33H20C18.3431 33 17 31.6569 17 30V14C17 12.3431 18.3431 11 20 11Z"
            stroke="currentColor" stroke-width="2"/>
    </g>
  </svg>
</template>

<style scoped lang="scss">

</style>