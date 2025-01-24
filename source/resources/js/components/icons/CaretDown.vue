<script setup>
const props = defineProps({
  width: {
    type: String,
    default: "100%"
  },
  height: {
    type: String,
    default: "100%"
  },
  color: {
    type: String,
    default: "#000000bf"
  }
})
</script>

<template>
<!--  <svg width="200px" height="200px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--    <path d="M17 10l-5 6-5-6h10z" fill="#0D0D0D"/>-->
<!--  </svg>-->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" focusable="false" color="rgba(0, 0, 0, 0.75)"
       :width="width"
       :height="height"
       :fill="color"
       :color="color"
       style="user-select: none; display: inline-block; flex-shrink: 0;">
    <g color="rgba(0, 0, 0, 0.75)" weight="bold">
      <path
          d="M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z"></path>
    </g>
  </svg>
</template>

<style scoped lang="scss">

</style>