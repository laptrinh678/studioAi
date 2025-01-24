<template>
  <el-popover :width="280">
    <template #reference>
      <warning-icon />
    </template>
    <template #default>
      <div class="demo-rich-content">
        <p class="demo-rich-content__desc" v-html="message"></p>
      </div>
    </template>
  </el-popover>
</template>

<script setup>
import WarningIcon from "../icons/Warning.vue"

const props = defineProps({
  message: {
    type: String,
    default: ''
  }
})
</script>
<style scoped lang="scss">
.demo-rich-content__desc {
  padding: 0;
  margin: 0;
  word-break: auto-phrase;
}
</style>