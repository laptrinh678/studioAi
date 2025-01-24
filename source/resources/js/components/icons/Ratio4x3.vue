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
            d="M16 11H40C41.6569 11 43 12.3431 43 14V30C43 31.6569 41.6569 33 40 33H16C14.3431 33 13 31.6569 13 30V14C13 12.3431 14.3431 11 16 11Z"
            stroke="currentColor" stroke-width="2"/>
    </g>
  </svg>
</template>

<style scoped lang="scss">

</style>