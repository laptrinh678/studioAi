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
          d="M232,120H192.49A72,72,0,0,0,128,16a8,8,0,0,0-8,8V63.51A72,72,0,0,0,16,128a8,8,0,0,0,8,8H63.51A72,72,0,0,0,128,240a8,8,0,0,0,8-8V192.49A72,72,0,0,0,240,128,8,8,0,0,0,232,120ZM88,72a55.31,55.31,0,0,1,32,10v38H32.57A56.09,56.09,0,0,1,88,72Zm80,112A55.31,55.31,0,0,1,136,174V136h87.43A56.09,56.09,0,0,1,168,184Z"></path>
    </g>
  </svg>
</template>

<style scoped lang="scss">

</style>