<script setup>
const props = defineProps({
  color: {type: String, default: "#000000"},
  width: {type: Number, default: 20},
  height: {type: Number, default: 20}
})
</script>

<template>
  <svg :width="width" :height="height" viewBox="0 0 1024 1024" class="icon" xmlns="http://www.w3.org/2000/svg">
    <path :fill="color"
          d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 110 448 224 224 0 010-448zm0 64a160.192 160.192 0 00-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/>
  </svg>
</template>

<style scoped lang="scss">

</style>