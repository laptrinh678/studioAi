<script setup>
const props = defineProps({
  width: {
    type: String,
    default: "24px"
  },
  height: {
    type: String,
    default: "24px"
  },
  color: {
    type: String,
    default: "#B5B4B4"
  }
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" focusable="false"
       color="rgb(238, 0, 51)"
       :fill="color"
       :width="width"
       :height="height"
       style="user-select: none; display: inline-block; flex-shrink: 0;">
    <g color="rgb(238, 0, 51)" weight="fill">
      <path
          d="M216,72H131.31L104,44.69A15.88,15.88,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.41,15.41,0,0,0,39.39,216h177.5A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40Z"></path>
    </g>
  </svg>
</template>

<style scoped lang="scss">

</style>