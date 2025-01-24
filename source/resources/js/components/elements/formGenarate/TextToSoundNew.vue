<template>
  <div class="main-background-to-videos">
    <div class="main-text-form">
      <div class="row">
        <div class="wrapper">
          <div id="option-container" :style="activeName === 'project' ? 'width: 100%' : ''">
            <el-tabs v-model="activeName" tab-position="left" class="tab-vertical" @tab-change="onTabChange" :before-leave="onTabClick">
              <el-tab-pane name="project">
                <template #label>
                  <folder-icon :color="iconColor" />
                  <p class="option-title" :class="isInProject ? '' : 'selected-project'">{{ $t('mc_scene.project.title') }}</p>
                </template>
                <warning-permission v-if="!permission" />
                <project-component @select-project="handleSelectProject" @delete-selected-project="deleteSelectedProject" v-else/>
              </el-tab-pane>

              <el-tab-pane name="artist" :disabled="isInProject">
                <template #label>
                  <avatar-icon :color="iconColor" />
                  <p class="option-title" :class="isInProject ? '' : 'selected-project'">{{ $t('mc_scene.mc.title') }}</p>
                </template>
                <artist-component />
              </el-tab-pane>

              <el-tab-pane name="content" :disabled="isInProject">
                <template #label>
                  <content-icon :color="iconColor" />
                  <p class="option-title" :class="isInProject ? '' : 'selected-project'">{{ $t('mc_scene.content.title') }}</p>
                </template>
                <content-component />
              </el-tab-pane>

              <el-tab-pane name="background" :lazy="true" :disabled="isInProject">
                <template #label>
                  <pinwheel-icon :color="iconColor" />
                  <p style="font-size: 12.4px" class="option-title" :class="isInProject ? '' : 'selected-project'">{{ $t('mc_scene.background.title') }}</p>
                </template>
                <background-component />
              </el-tab-pane>

              <el-tab-pane name="text" :disabled="isInProject">
                <template #label>
                  <font-family-icon :color="iconColor" />
                  <p class="option-title" :class="isInProject ? '' : 'selected-project'">{{ $t('mc_scene.text.title') }}</p>
                </template>
                <text-component />
              </el-tab-pane>

              <el-tab-pane name="upload" :lazy="true" :disabled="isInProject">
                <template #label>
                  <upload-icon :color="iconColor" />
                  <p class="option-title" :class="isInProject ? '' : 'selected-project'">{{ $t('mc_scene.image_asset.title') }}</p>
                </template>
                <upload-image-component />
              </el-tab-pane>
            </el-tabs>
          </div>
          <div id="scene-container" v-show="activeName !== 'project'">
            <editor-component @save-project="onSaveProject" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Thông báo lưu thay đổi -->
  <el-dialog
      v-model="dialogVisible"
      :title="$t('common.warning')"
      width="500"
  >
    <span class="text-danger">{{ $t('mc_scene.project.warning_save_project') }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="confirmDialog">{{ $t('common.confirm') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import FolderIcon from "../../icons/Folder.vue"
import AvatarIcon from "../../icons/Avatar.vue"
import ContentIcon from "../../icons/Content.vue"
import FontFamilyIcon from "../../icons/FontFamily.vue"
import PinwheelIcon from "../../icons/Pinwheel.vue"
import UploadIcon from "../../icons/Upload.vue"
import ArtistComponent from "../formVirtualHuman/Artist.vue";
import ContentComponent from "../formVirtualHuman/Content.vue";
import EditorComponent from "../formGenarate/Editor.vue"
import BackgroundComponent from "../formVirtualHuman/Background.vue"
import TextComponent from "../formVirtualHuman/Text.vue"
import ProjectComponent from "../formVirtualHuman/Project.vue";
import UploadImageComponent from "../formVirtualHuman/UploadImage.vue"
import {computed, onBeforeMount, ref} from "vue";
import {useEventsBus} from "../../../helpers/eventBus";
import WarningPermission from "../../common/WarningPermission.vue"
import VirtualHumanService from "../../../services/VirtualHumanService";
import {useStore} from "vuex";
import {ACTION_SET_IMAGE_ASSETS} from "../../../store/scenes/action";

const props = defineProps({
  permission: {
    type: Boolean,
    default: false,
  }
})

const store = useStore()
const eventBus = useEventsBus()
const activeName = ref('project')
const isInProject = ref(true)
const isSaveProject = ref(false)
const dialogVisible = ref(false)
const iconColor = computed(() => {
  return isInProject.value ? '#B5B4B4' : '#44494d'
})

const handleSelectProject = (item) => {
  isInProject.value = false
  activeName.value = 'artist'
  isSaveProject.value = false
}

const deleteSelectedProject = () => {
  isInProject.value = true
}

const onSaveProject = () => {
  isSaveProject.value = true
}

const onTabChange = (name) => {
  eventBus.emit('changeToText', name)
  if (name === 'project') isInProject.value = true
}

const onTabClick = (name) => {
  if (name === 'project' && !isInProject.value && !isSaveProject.value) {
    dialogVisible.value = true
    return false
  }
}

const confirmDialog = () => {
  dialogVisible.value = false
  isInProject.value = true
  activeName.value = 'project'
}

const getUploadedImage = async () => {
  const {data} = await VirtualHumanService.getImageAsset()
  if (data) {
    await store.dispatch(ACTION_SET_IMAGE_ASSETS, data)
  }
}

onBeforeMount(() => {
  getUploadedImage()
})
</script>

<style lang="scss" scoped>
#scene-box {
  margin-top: 12px;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 24px;
}

.option-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 72px;
  text-wrap: balance;
  text-align: center;
  margin: 0;
  line-height: normal;

  &:hover {
    -webkit-line-clamp: unset;
    overflow: visible;
  }
}

.items-radio {
  margin-bottom: 10px;
  width: 200px;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

img {
  width: 180px;
  height: 180px;
}

#count-time-record {
  display: flex;
  font-weight: bold;
  font-size: 20px;
  margin-left: 20px;
}
</style>