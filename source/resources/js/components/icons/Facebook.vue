<script setup>
const props = defineProps({
  width: { type: Number, default: 24 },
  height: { type: Number, default: 24 },
  color: { type: String, default: '#1877F2' },
})
</script>

<template>
  <svg :fill="color" :height="height" :width="width" id="Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" xml:space="preserve">
    <path d="M23,0H9C4,0,0,4,0,9v14c0,5,4,9,9,9h7V20h-4c-0.6,0-1-0.4-1-1v-3c0-0.6,0.4-1,1-1h4v-3c0-3.3,1.7-6,5-6h4c0.6,0,1,0.4,1,1v3
      c0,0.6-0.4,1-1,1h-3.8c-0.1,0-0.2,0.1-0.2,0.2V15h5c0.3,0,0.6,0.2,0.8,0.4s0.2,0.6,0.1,0.9l-2,3C24.8,19.8,24.4,20,24,20h-3v12h2
      c5,0,9-4,9-9V9C32,4,28,0,23,0z"/>
  </svg>
</template>