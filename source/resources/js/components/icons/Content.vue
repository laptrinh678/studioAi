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
       color="rgb(181, 180, 180)"
       :fill="color"
       :width="width"
       :height="height"
       style="user-select: none; display: inline-block; flex-shrink: 0;">
    <g color="rgb(181, 180, 180)" weight="fill">
      <path
          d="M96,113.89,107.06,136H84.94ZM232,56V216a8,8,0,0,1-11.58,7.16L192,208.94l-28.42,14.22a8,8,0,0,1-7.16,0L128,208.94,99.58,223.16a8,8,0,0,1-7.16,0L64,208.94,35.58,223.16A8,8,0,0,1,24,216V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM135.16,156.42l-32-64a8,8,0,0,0-14.32,0l-32,64a8,8,0,0,0,14.32,7.16L76.94,152h38.12l5.78,11.58a8,8,0,1,0,14.32-7.16ZM208,128a8,8,0,0,0-8-8H184V104a8,8,0,0,0-16,0v16H152a8,8,0,0,0,0,16h16v16a8,8,0,0,0,16,0V136h16A8,8,0,0,0,208,128Z"></path>
    </g>
  </svg>
</template>

<style scoped lang="scss">

</style>