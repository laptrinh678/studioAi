<script setup>
const props = defineProps({
  width: { type: Number, default: 24 },
  height: { type: Number, default: 24 },
  color: { type: String, default: "#198754" },
})
</script>

<template>
  <svg :fill="color" :width="width" :height="height" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M18.7,7.2c-0.4-0.4-1-0.4-1.4,0l-7.5,7.5l-3.1-3.1c0,0,0,0,0,0c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4l3.8,3.8c0.2,0.2,0.4,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3l8.2-8.2C19.1,8.2,19.1,7.6,18.7,7.2z"/>
  </svg>
</template>

<style scoped lang="scss">

</style>