<template>
  <el-dialog v-model="dialogVisible" :title="$t('user_management.detail_info')" width="50%" @closed="emits('closeDialog')">
    <table class="table table-bordered table-dark">
      <tr>
        <td style="width: 20%">{{ $t('user_management.date_time') }}</td>
        <td>{{ userDetail.date }}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{{ userDetail.email }}</td>
      </tr>
      <tr>
        <td>{{ $t('user_management.type') }}</td>
        <td>{{ userDetail.type }}</td>
      </tr>
      <tr>
        <td>{{ $t('user_management.prompt_original') }}</td>
        <td>{{ userDetail.prompt_original }}</td>
      </tr>
      <tr>
        <td>{{ $t('user_management.prompt_open_ai') }}</td>
        <td>{{ userDetail.prompt_open_ai }}</td>
      </tr>
      <tr>
        <td>{{ $t('user_management.prompt_translate') }}</td>
        <td>{{ userDetail.prompt }}</td>
      </tr>
      <tr>
        <td>{{ $t('user_management.execute_time') }}</td>
        <td>{{ userDetail.execute_time }}</td>
      </tr>
      <tr>
        <td>{{ $t('user_management.status_code') }}</td>
        <td>{{ userDetail.status_code }}</td>
      </tr>
      <tr v-if="userDetail.type === 'video'" v-for="item in genVideo">
        <td>{{ $t(`common.form_config.${item}`) }}</td>
        <td>{{ userDetail[item] }}</td>
      </tr>
      <tr v-else v-for="item in genImage">
        <td>{{ $t(`common.form_config.${item}`) }}</td>
        <td>{{ userDetail[item] }}</td>
      </tr>
    </table>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  userDetail: {
    type: Object,
    required: true
  },
  dialogVisible: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['closeDialog'])
const genImage = ['guidance_scale', 'image_width', 'image_height', 'num_images', 'seed']
const genVideo = ['name_voice', 'name_mc']
</script>

<style scoped lang="scss">

</style>