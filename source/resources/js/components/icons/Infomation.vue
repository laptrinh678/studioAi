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
  <svg :fill="color" :width="width" :height="height" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg"
       preserveAspectRatio="xMinYMin" class="jam jam-info">
    <path
        d='M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'/>
  </svg>
</template>

<style scoped lang="scss">

</style>