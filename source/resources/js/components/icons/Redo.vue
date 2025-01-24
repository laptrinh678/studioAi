<script setup>
const props = defineProps({
  width: {
    type: String,
    default: "20px"
  },
  height: {
    type: String,
    default: "20px"
  },
  color: {
    type: String,
    default: "#44494D"
  }
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" focusable="false"
       color="var(--token-87fc9375-35dd-480c-8f13-c396af336a77, rgb(68, 73, 77))"
       :width="width"
       :height="height"
       :fill="color"
       style="user-select: none; display: inline-block; flex-shrink: 0;">
    <g color="var(--token-87fc9375-35dd-480c-8f13-c396af336a77, rgb(68, 73, 77))" weight="light">
      <path
          d="M228.24,108.24l-48,48a6,6,0,0,1-8.48-8.48L209.51,110H128a90.1,90.1,0,0,0-90,90,6,6,0,0,1-12,0A102.12,102.12,0,0,1,128,98h81.51L171.76,60.24a6,6,0,0,1,8.48-8.48l48,48A6,6,0,0,1,228.24,108.24Z"></path>
    </g>
  </svg>
</template>