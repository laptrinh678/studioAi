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
          d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,96a8,8,0,0,1-16,0V88H136v88h16a8,8,0,0,1,0,16H104a8,8,0,0,1,0-16h16V88H88v8a8,8,0,0,1-16,0V80a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8Z"></path>
    </g>
  </svg>
</template>

<style scoped lang="scss">

</style>