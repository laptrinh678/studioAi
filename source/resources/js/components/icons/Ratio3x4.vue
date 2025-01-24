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
            d="M20 7H36C37.6569 7 39 8.34315 39 10V34C39 35.6569 37.6569 37 36 37H20C18.3431 37 17 35.6569 17 34V10C17 8.34315 18.3431 7 20 7Z"
            stroke="currentColor" stroke-width="2"/>
    </g>
  </svg>
</template>

<style scoped lang="scss">

</style>