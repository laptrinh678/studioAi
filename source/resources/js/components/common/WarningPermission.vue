<template>
  <p class="text-danger p-0 mt-3 mb-0">
    {{ $t('warning_permission', {gmail: gmail})}}
  </p>
</template>

<script>
export default {
  name: 'WarningPermission',
  data() {
    return {
      gmail: process.env.MIX_GMAIL_ADMIN
    }
  }}
</script>
