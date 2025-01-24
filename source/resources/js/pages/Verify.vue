<template>

</template>

<script>
import {onMounted, ref} from 'vue'
import { ElLoading } from 'element-plus'
import {useRoute, useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {FORBIDDEN} from '~/helpers/message';
import {SSO_STATE, SSO_VERIFY} from "../helpers/localStorage";
import store from "~/store";
import {ACTION_GET_TOKEN_SSO} from "~/store/auth/actions"

export default {
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const toast = useToast();

    const code = route.query.code
    const codeVerify = JSON.parse(localStorage.getItem(SSO_VERIFY)).value
    const error = route.query.error

    const openFullScreen = () => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Verify',
        background: 'rgba(0, 0, 0, 0.7)',
      })

      if (error !== undefined) {
        toast.error(FORBIDDEN);
      }

      setTimeout(() => {
        loading.close()
      }, 2000)

      return store.dispatch(ACTION_GET_TOKEN_SSO, {
        code: code,
        code_verifier: codeVerify
      })
    }

    onMounted(() => {
      openFullScreen()
    })

    return {
      openFullScreen
    };
  },
};
</script>
<style scoped>

</style>