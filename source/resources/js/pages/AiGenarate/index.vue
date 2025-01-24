<template>
  <div class="framer-1yjxhke-container">
    <div class="position-absolute d-flex align-items-center gap-5" style="top: 10px; right: 40px; z-index: 1">
      <!-- Xử lý đa ngôn ngữ -->
      <div>
        <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img class="m-topbar__language-selected-img" :src="'images/'+locale+'.svg'" alt="img">
            </span>
          <template #dropdown>
            <div class="m-dropdown__header-locale m--align-center">
              <span class="m-dropdown__header-subtitle text-white">{{ $t('common.choose_language') }}</span>
            </div>
            <el-dropdown-menu>
              <el-dropdown-item :icon="LocaleViIcon" @click="updateLocale('vi')">
                <a href="#" class="m-nav__link" :class="{'m-nav__link--active': locale === 'vi'}">
                  <span class="m-nav__link-title m-topbar__language-text m-nav__link-text">Tiếng Việt</span>
                </a>
              </el-dropdown-item>
              <el-dropdown-item :icon="LocaleEnIcon" @click="updateLocale('en')">
                <a href="#" class="m-nav__link" :class="{'active': locale === 'en'}">
                  <span class="m-nav__link-title m-topbar__language-text m-nav__link-text">English</span>
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <!-- Xử lý đăng xuất -->
      <div class="d-flex flex-column align-items-end"
           style="gap: 10px; max-width: 300px" @mouseenter.prevent @mouseleave="showInfo = false">
        <el-dropdown trigger="click">
          <div class="d-flex gap-2">
                <span class="el-avatar el-avatar--circle" style="height: 32px; width: 32px; line-height: 32px;">
                  <img src="/images/avatar.jpeg" style="object-fit: cover;" alt="avatar"/>
                </span>
            <span class="d-flex align-items-center limit-show">
                  <span>{{ userName }}</span>
                  <caret-down-icon width="20" height="20" color="#ffffff" @mouseenter="showInfo = true"/>
                </span>
          </div>
          <template #dropdown>
            <div class="m-dropdown__header-logout m--align-center">
              <span class="m-dropdown__header-subtitle text-white">{{ $t('common.user_info') }}</span>
            </div>
            <el-dropdown-menu>
              <el-dropdown-item :icon="LogoutIcon">
                <div class="d-flex logout-item" style="gap: 15px; padding: 5px" @click="handleLogout">
                  <div class="v-list-item__content">
                    <div>{{ $t('common.logout') }}</div>
                  </div>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="framer-bzqad framer-1tnokga framer-v-1ef6s99" data-framer-name="Fill"
         style="background-color: rgb(238, 0, 51);width: 100%;opacity: 1;">
      <div class="framer-1gtbgts"
           style="mask: radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%);opacity: 1;">
        <div data-framer-background-image-wrapper="true"
             style="position: absolute; border-radius: inherit; inset: 0;">
          <img decoding="async"
               src="https://framerusercontent.com/images/184W907UA8Isuhr34SuUJtWF4Y.gif"
               alt=""
               style="display: block; width: 100%; height: 100%; border-radius: inherit; object-position: center center; object-fit: cover; image-rendering: auto;">
        </div>
      </div>
    </div>
  </div>

  <div id="ai-generate-logo">
    <ai-generate-icon />
  </div>
    <div class="main-ai" style="margin-top: 84px"
         :class="activeName === 'user_setting' ? 'user_setting' : ''"
         :style="style[activeName]">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
      <el-tab-pane label="Landing Page" name="landing-page" />
      <el-tab-pane :label="$t('common.nav_bar.gen_image')" :lazy="true" name="image-generate">
        <image-generate :permission-text-to-image="userPermission.textToImage"
                        :permission-image-to-image="userPermission.imageToImage"/>
      </el-tab-pane>
      <el-tab-pane :label="$t('mc_background.title')" :lazy="true" name="mc-generate">
        <text-to-sound :permission="userPermission.virtualHuman" />
      </el-tab-pane>
      <el-tab-pane :label="$t('mc_scene.title')" :lazy="true" name="mc-background-generate">
        <text-to-sound-new :permission="userPermission.virtualHumanV2" />
      </el-tab-pane>
      <el-tab-pane :label="$t('user_management.title')" name="user_setting" v-if="role === 'admin'">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TextToImages from "~/components/elements/formGenarate/TextToImages.vue";
import ImageToImages from "~/components/elements/formGenarate/ImageToImages.vue";
import ScaleUpImage from "~/components/elements/formGenarate/ScaleUpImage.vue";
import TextToSound from "~/components/elements/formGenarate/TextToSound.vue";
import TextToSoundNew from "~/components/elements/formGenarate/TextToSoundNew.vue";
import ImageGenerate from "../../components/elements/formGenarate/ImageGenerate.vue";
import {onBeforeMount, onMounted, ref} from "vue";
import { useStore } from "vuex";
import { ACTION_STORE_PROMPT_STYLES } from "~/store/common/actions";
import { defaultOption, optionTypePrompt } from "../../helpers/constant";
import AuthService from '~/services/AuthService'
import {ElLoading} from "element-plus";
import User from "../User.vue";
import AiGenerateIcon from "../../components/icons/AiGenerate.vue";
import AvatarIcon from "../../components/icons/Avatar.vue"
import CaretDownIcon from "../../components/icons/CaretDown.vue"
import LogoutIcon from "../../components/icons/Logout.vue"
import LocaleViIcon from "../../components/icons/LocaleVi.vue";
import LocaleEnIcon from "../../components/icons/LocaleEn.vue";
import {ACTION_LOGOUT} from "../../store/auth/actions";
import Sketch from "../../components/elements/formGenarate/Sketch.vue";
import router from "../../router";
import Cookies from "js-cookie";
import i18n from "../../lang/i18n";

export default {
  components: {
    Sketch,
    User,
    ImageToImages,
    TextToImages,
    ScaleUpImage,
    TextToSound,
    AiGenerateIcon,
    AvatarIcon,
    CaretDownIcon,
    LogoutIcon,
    TextToSoundNew,
    ImageGenerate,
  },
  setup(props) {
    const userPermission = ref({
      textToImage: false,
      imageToImage: false,
      virtualHuman: false,
      virtualHumanV2: false,
    })
    const role = ref('user')
    const userName = ref('')
    const store = useStore();
    const activeName = ref("image-generate");
    const locale = ref('vi')
    const showInfo = ref(false)
    const style = {
      'mc-background-generate': {
        width: '100%',
        backgroundColor: '#F9F9F9'
      },
      'image-generate': {
        width: '100%',
        backgroundColor: '#ffffff'
      },
      'mc-generate': {
        width: '100%',
        backgroundColor: '#ffffff'
      }
    }
    const getPromoptStyle = async () => {
      await store.dispatch(ACTION_STORE_PROMPT_STYLES, optionTypePrompt);
    };

    const getUserInfo = async () => {
      const loading = ElLoading.service({
        lock: true,
        text: i18n.global.t('common.loading'),
        background: 'rgba(0, 0, 0, 0.7)',
      })

      const {data} = await AuthService.getAuthUser()
      if (data) loading.close()

      // Admin sẽ có full quyền
      if (data.role === 'admin') {
        Object.keys(userPermission.value).forEach(function(key){
          userPermission.value[key] = true
        })
      } else {
        const permissions = JSON.parse(data.permissions)
        Object.keys(permissions).forEach(function(key){
          console.log(key);
          const startDate = permissions[key]['start_date']
          const endDate = permissions[key]['end_date']
          const date = new Date().toISOString().slice(0, 10).replace(/-/g, '/')
          const time = new Date().toLocaleString('vi-VI', {hour: '2-digit', minute: '2-digit',second: '2-digit'})
          const now = date + ' ' + time
          if (now >= startDate && now <= endDate && permissions[key]['status']) {
            userPermission.value[key] = permissions[key]['status']
          }
        })
      }

      role.value = data.role
      userName.value = data.name ?? ''
    }

    const onReloadWindow = () => {
      window.location.reload();
    }

    const handleClick = (tabName) => {
      if (tabName === 'user_setting') {
        router.push({name: 'User Management'})
      }

      if (tabName === 'landing-page') {
        router.push({name: 'Landing Page'})
      }
    }

    const handleLogout = async () => {
      const loading = ElLoading.service({
        lock: true,
        text: i18n.global.t('common.loading'),
        background: 'rgba(0, 0, 0, 0.7)',
      })

      localStorage.clear()
      await store.dispatch(ACTION_LOGOUT)
    }

    const updateLocale = async (newLocale) => {
      if (locale.value !== newLocale) {
        await Cookies.set("locale", newLocale, { expires: 365 })
        location.reload()
      }
    }

    onBeforeMount(() => {
      getUserInfo()
      locale.value = Cookies.get("locale") || 'vi'
    })

    onMounted(() => {
      getPromoptStyle();
    });
    return {
      activeName,
      onReloadWindow,
      userPermission,
      role,
      showInfo,
      handleLogout,
      userName,
      handleClick,
      style,
      locale,
      updateLocale,
      LocaleViIcon,
      LocaleEnIcon,
      LogoutIcon
    };
  },
};
</script>

<style scoped lang="scss">
.framer-1gtbgts {
  flex: none;
  height: 148px;
  mix-blend-mode: screen;
  overflow: hidden;
  position: relative;
  width: 100%;
  z-index: 0;
}

.framer-1tnokga {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0;
  height: min-content;
  justify-content: flex-end;
  overflow: hidden;
  padding: 0;
  position: absolute;
}

#ai-generate-logo {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.el-avatar {
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  color: #fff;
  background: #c0c4cc;
  font-size: 14px;
}

.logout-container {
  background-color: #ffffff;
  padding: 5px;
  border-radius: 4px;
  max-width: 123px;
}

.limit-show {
  height: 32px;
  color: white;
  cursor: pointer
}

.m-topbar__language-selected-img, .m-topbar__language-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

a {
  text-decoration: none;
}

.m-dropdown__header-locale {
  padding: 20px;
  background-image: url("/images/quick_actions_bg.jpg");
  background-size: cover;
}

.m-dropdown__header-logout {
  padding: 20px;
  background-image: url("/images/user_profile_bg.jpg");
  background-size: cover;
}
</style>