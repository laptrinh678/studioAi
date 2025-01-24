<template>
  <div class="m-grid m-grid--hor m-grid--root m-page justify-content-center">
    <div class="d-flex justify-content-center align-items-center">
      <div class="m-error_container text-center">
        <div class="m-error_subtitle m--font-inverse-light">
          <h1>{{ $t('error.503.title').toUpperCase() }}</h1>
        </div>
        <h3 class="m-error_description m--font-inverse-light">{{ $t('error.503.message_1') }}</h3>
        <h3 class="m-error_description m--font-inverse-light">{{ $t('error.503.message_2') }}</h3>
        <el-image src="images/error/under-construction.png" fit="cover" />
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
<style scoped lang="scss">
h1, h3 {
  margin-bottom: 18px;
  font-size: 30px;
  font-family: "FS Magistral Bold", sans-serif;
}
</style>
