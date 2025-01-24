<template>
  <div class="d-flex flex-column" style="gap: 28px">
    <div class="w-100">
      <div class="option-title">{{ $t('mc_scene.background.list') }}</div>
    </div>

    <div class="w-100">
      <div class="main-container">
        <div class="d-flex flex-column" style="gap: 12px">
          <div class="d-grid" style="grid-template-columns: repeat(2, minmax(50px, 1fr)); gap: 12px">
            <div class="background-item" draggable="true"
                 v-for="item in backgrounds"
                 :style="`background-image: url('${item.imgUrl}')`"
                 @click="handleClick($event, item.imgUrl)"
                 @dragstart="handleDragStart($event, item.imgUrl)"
            ></div>
          </div>

          <el-button type="danger" style="height: 40px" @click="openDialog">
            <image-icon color="#ffffff" />{{ $t('mc_scene.background.select_background') }}
          </el-button>
          <p class="text-notice">{{ $t('mc_scene.background.warning') }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Dialog form image -->
  <el-dialog v-model="isDialogVisible" :title="$t('mc_scene.background.select_image').toUpperCase()" width="60%" class="voice-dialog" style="margin-top: 5vh">
    <div class="uploaded-image-container gap-3">
      <div class="mt-auto mb-auto" v-for="item in uploadedImages">
        <img :src="item.image_path" alt="" class="uploaded-images"
             @click="handleClick($event, item.image_path)"
        >
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import {useEventsBus} from "../../../helpers/eventBus";
import {ref} from "vue";
import ImageIcon from "../../icons/Image.vue";
import {useStore} from "vuex";
import {forEach} from "lodash";
import {storeImageAsset} from "../../../store/scenes/index"

const backgrounds = ref([
    {imgUrl: "/images/artists/background-1.avif"},
    {imgUrl: "/images/artists/background-2.avif"},
    {imgUrl: "/images/artists/background-3.avif"},
    {imgUrl: "/images/artists/background-4.avif"},
])
const isDialogVisible = ref(false)
const uploadedImages = ref([])
const eventBus = useEventsBus()
const store = useStore()

const handleClick = (ev, imgUrl) => {
  isDialogVisible.value = false
  eventBus.emit('selectBackground', imgUrl)
}

const handleDragStart = (ev, imgUrl) => {
  ev.dataTransfer.setData('dragBackground', imgUrl)
}

const openDialog = async () => {
  uploadedImages.value = []
  await getUploadedImage()
  isDialogVisible.value = true
}

const getUploadedImage = async () => {
  forEach(storeImageAsset, (item) => uploadedImages.value.push({
    'image_path': item.asset_path
  }))
}
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.content-container {
  border: 1px dashed rgb(181, 180, 180);
  border-radius: 8px;
  background-color: rgb(243, 243, 243);
}

.option-title {
  font-size: 16px;
  font-family: "FS Magistral Bold", sans-serif;
  color: #ee0033;
}

#description-upload {
  font-family: "FS Magistral Book Italic", sans-serif;
  font-size: 12px;
  color: #44494d;

  span {
    font-family: "FS Magistral Bold Italic", sans-serif;
  }
}

.background-item {
  width: 100%;
  height: 138px;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 13px;
  font-family: "FS Magistral Medium", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center center;
}

.text-notice {
  font-size: 12px;
  color: #ee0033;
}

.uploaded-images {
  width: 100%;
  height: auto;
  cursor: pointer;
}

.uploaded-image-container {
  display: grid;
  grid-template-columns: repeat(4, minmax(50px, 1fr))
}
</style>