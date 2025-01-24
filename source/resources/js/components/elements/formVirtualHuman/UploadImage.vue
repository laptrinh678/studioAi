<template>
  <div class="d-flex flex-column upload-image" style="gap: 28px">
    <div class="w-100">
      <div class="option-title">{{ $t('mc_scene.image_asset.list') }}</div>
    </div>

    <div class="w-100">
      <div class="main-container">
        <div class="artist-container" v-for="item in imageAsset">
          <div class="image-container">
            <img :src="item.image_path" alt="image" style="cursor: pointer"
                 @click="handleClick($event, item)"
                 @dragstart="handleDragStart($event, item)"
            >
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center mt-3">
        <el-button class="w-75" style="height: 40px" type="danger" @click="isDialogVisible = true">
          <div class="d-flex gap-2">
            <upload-icon width="14px" height="14px" color="#ffffff" />
            <div>{{ $t('mc_scene.image_asset.select_image_asset') }}</div>
          </div>
        </el-button>
      </div>
    </div>
  </div>

  <!-- Dialog form image -->
  <el-dialog v-model="isDialogVisible" :title="$t('mc_scene.image_asset.list_upload')" width="60%" class="voice-dialog" style="margin-top: 5vh">
    <p class="warning-max-upload">* {{ $t('mc_scene.image_asset.limit', {maxImage: maxUploadFile}) }}</p>
    <el-upload
        v-model:file-list="uploadImages"
        class="upload-demo d-flex flex-column justify-content-center"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
        :auto-upload="false"
        list-type="picture-card"
        :limit="maxUploadFile"
        :on-exceed="handleExceed"
        :on-remove="handleRemove"
        accept=".png, .jpeg, .jpg"
    >
      <el-icon><Plus/></el-icon>
    </el-upload>
    <template #footer>
      <div class="dialog-footer w-50 ms-auto">
        <el-button @click="closeDialog" class="button-cancel">{{ $t('common.cancel').toUpperCase() }}</el-button>
        <el-button @click="onSubmit" class="button-submit">{{ $t('mc_scene.content.apply') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import UploadIcon from "../../icons/Upload.vue";
import {onMounted, ref} from "vue";
import {ElLoading, ElMessage} from "element-plus";
import {validFile} from "../../../helpers/ImageDetect";
import VirtualHumanService from "../../../services/VirtualHumanService";
import {clone, forEach, filter} from "lodash";
import {useToast} from "vue-toastification";
import {useEventsBus} from "../../../helpers/eventBus";
import {useStore} from "vuex";
import {ACTION_SET_IMAGE_ASSETS} from "../../../store/scenes/action";
import {storeImageAsset} from "../../../store/scenes/index"
import i18n from "../../../lang/i18n"

const toast = useToast()
const eventBus = useEventsBus()
const store = useStore()

const isError = ref(false)
const isDialogVisible = ref(false)
const imageAsset = ref([])
const uploadImages = ref([])
const backupUploadImages = ref([])
const removeImages = ref([])
const upload = ref()
const errorMessage = ref('')
const maxUploadFile = Number(process.env.MIX_MAX_UPLOAD_IMAGE)

const onSubmit = async () => {
  // Kiểm tra file ảnh (.png, .jpg, .jpeg) và max size 4MB
  const filterUploadFile = filter(uploadImages.value, {status: 'ready'})
  filterUploadFile.some(item => {
    if (!validFile(item.raw.name)) {
      isError.value = true
      return ElMessage.error(i18n.global.t('mc_scene.image_asset.validate.file_format'))
    }
    if (item.size > 4194304) {
      isError.value = true
      return ElMessage.error(i18n.global.t('mc_scene.image_asset.validate.file_size'))
    }
  })

  // Dừng khi upload ảnh có lỗi
  if (isError.value) {
    isError.value = false
    return
  }

  if (removeImages.value.length > 0) {
    await eventBus.emit('removeImageAsset', removeImages.value)
  }

  isDialogVisible.value = false
  isError.value = false
  const loading = ElLoading.service({
    lock: true,
    text: i18n.global.t('common.loading'),
    background: 'rgba(0, 0, 0, 0.7)',
  })
  const formData = new FormData()
  forEach(filterUploadFile, (item, key) => formData.append(`files[${key}]`, item.raw))
  forEach(removeImages.value, (item, key) => formData.append(`remove_files[${key}]`, item.name))

  const data = await VirtualHumanService.uploadImage(formData)
  if (data.status === 200) {
    await resetData()
    await fetchImageAsset()
    removeImages.value = []
    toast.success(i18n.global.t('common.update_success'))
  }

  loading.close()
}

const fetchImageAsset = async () => {
  const {data} = await VirtualHumanService.getImageAsset()
  if (data) {
    await store.dispatch(ACTION_SET_IMAGE_ASSETS, data)

    forEach(data, (item) => {
      imageAsset.value.push({'image_path': item.asset_path})
      uploadImages.value.push({name: item._id, url: item.asset_path})
      backupUploadImages.value.push({name: item._id, url: item.asset_path})
    })
  }
}

const handleRemove = (uploadFile, uploadFiles) => {
  removeImages.value.push(uploadFile)
}

const handleExceed = async () => {
  return ElMessage.error(i18n.global.t('mc_scene.image_asset.validate.max_upload', {maxUploadFile: maxUploadFile}));
}

const closeDialog = () => {
  isDialogVisible.value = false
  uploadImages.value = clone(backupUploadImages.value)
}

const getImageAsset = async () => {
  const dataAsset = storeImageAsset
  console.log(dataAsset)
  forEach(dataAsset, (item) => {
    imageAsset.value.push({'image_path': item.asset_path})
    uploadImages.value.push({name: item._id, url: item.asset_path})
    backupUploadImages.value.push({name: item._id, url: item.asset_path})
  })
}

const resetData = () => {
  imageAsset.value = []
  uploadImages.value = []
  backupUploadImages.value = []
}

const handleClick = (ev, item) => {
  isDialogVisible.value = false
  eventBus.emit('selectImageDecorate', item.image_path)
}

const handleDragStart = (ev, item) => {
  ev.dataTransfer.setData('dragImageDecorate', item.image_path)
}

onMounted(() => {
  getImageAsset()
})
</script>

<style scoped lang="scss">
.option-title {
  font-size: 16px;
  font-family: "FS Magistral Bold", sans-serif;
  color: #ee0033;
}

.main-container {
  position: relative;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2,minmax(50px,1fr));
  padding: 0;
}

.artist-container {
  position: relative;
  height: 200px;
  width: 100%;

  .image-container {
    border-radius: 8px;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center center;
    border-radius: inherit;
  }
}

.warning-max-upload {
  font-size: 12px;
  color: #ee0033;
}
</style>