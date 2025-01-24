<template>
  <div class="main-text-to-images">
    <div class="main-text-form">
      <div class="form-config">
        <div class="form-content flex w-full">
          <div class="w-full">
            <p class="form-title">{{ $t('common.form_config.config') }}</p>
            <div class="upload-img-container w-full p-0">
              <div class="form-content-upload d-flex align-items-center justify-content-center">
                <el-upload
                  ref="upload"
                  v-if="!previewImages"
                  class="upload-demo w-100"
                  drag
                  action="#"
                  :auto-upload="false"
                  :limit="1"
                  :on-change="checkUpload"
                  list-type="picture"
                  :show-file-list="false"
                  accept=".png, .jpeg, .jpg"
                >
                  <div class="el-upload__text d-flex flex-column">
                    <div><image-icon /></div>
                    <div id="description-upload">{{ $t('common.form_config.upload_image') }}</div>
                  </div>
                </el-upload>

                <div class="preview-container" v-else>
                  <el-button @click="handleRemoveImage">
                    <trash-icon />
                  </el-button>
                  <img
                    style="object-fit: contain"
                    :key="index"
                    :src="previewImages"
                    alt="Uploaded Image"
                  />
                </div>
              </div>
              <span v-if="isError" class="error">
                <span v-if="isFileValid">{{ $t('mc_scene.image_asset.validate.file_format') }}</span>
                <span v-else-if="isInvalidResolution">{{ $t('common.limit_resolution', {width: MAX_SIZE_SCALE_IMAGE.width, height: MAX_SIZE_SCALE_IMAGE.height}) }}</span>
                <span v-else>{{ $t('common.image_required') }}</span>
              </span>
              <div class="flex justify-between gap-12" style="margin-top: 12px">
                <div class="">
                  <div class="select-option">
                    <p>{{ $t('common.form_config.scale') }}</p>
                    <input
                      :disabled="!previewImages || isMaxScale"
                      type="range"
                      :min="1"
                      :max="maxScale"
                      v-model="scale"
                      :step="0.1"
                      @change="changeScale"
                    />
                  </div>
                </div>
                <div class="w-200">
                  <div class="select-option">
                    <p>{{ $t('common.form_config.width') }}</p>
                    <el-input
                      v-model="widthScale"
                      :min="1"
                      :max="MAX_SIZE_SCALE_IMAGE.width"
                      @change="changeSizeWidth"
                      type="number"
                      :disabled="!previewImages || isMaxScale"
                    />
                  </div>
                  <span v-if="isMaxSizeWidth" class="error"
                    >{{ $t('common.max_width') }}: {{ MAX_SIZE_SCALE_IMAGE.width }}</span
                  >
                </div>
                <div class="w-200">
                  <div class="select-option">
                    <p>{{ $t('common.form_config.height') }}</p>
                    <el-input
                      v-model="heightScale"
                      :min="1"
                      :max="MAX_SIZE_SCALE_IMAGE.height"
                      @change="changeSizeHeight"
                      type="number"
                      :disabled="!previewImages || isMaxScale"
                    />
                  </div>
                  <span v-if="isMaxSizeHeight" class="error"
                    >{{ $t('common.max_height') }}: {{ MAX_SIZE_SCALE_IMAGE.height }}</span
                  >
                </div>
              </div>
            </div>
            <!-- Form config -->
            <el-button
              :disabled="isLoading || !permission"
              @click="onSubmit()"
              class="button_submit"
              type="danger"
              >{{ $t('common.form_config.create_image') }}</el-button
            >
            <warning-permission v-if="!permission" />
          </div>
          <div class="w-full">
            <!-- Show Image -->
            <p class="form-title">{{ $t('common.form_config.result') }}</p>
            <div class="process-custom" v-if="isLoading">
              <el-progress
                  :percentage="percentage"
                  :stroke-width="20"
                  :text-inside="true"
                  :duration="1"
                  status="exception"
                  striped
                  striped-flow
                  color="#0060df"
              >
                <span>{{ percentage }}%</span>
              </el-progress>
            </div>
            <show-image-vue :images="images" :isLoading="isLoading" :obj-index="objIndex" @change-index="changeIndex" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {decodeBase64, isInValidFileSize, validFile} from "../../../helpers/ImageDetect";
import ShowImageVue from "./ShowImage.vue";
import AiGenarate from "~/services/AiGenarate";
import {MAX_SCALE, MAX_SIZE_SCALE_IMAGE} from "../../../constants/constant";
import WarningPermission from "~/components/common/WarningPermission.vue";
import ImageIcon from "../../icons/Image.vue";
import TrashIcon from "../../icons/Trash.vue";

const props = defineProps({
  permission: {
    type: Boolean,
    default: false,
  }
})
const emits = defineEmits(['onLoading'])
const percentage = ref(0);
const objIndex = ref(0)
const isLoading = ref(false);
const isError = ref(false);
const isFileValid = ref(false);
const isInvalidResolution = ref(false);
const isMaxScale = ref(false)
const images = ref([]);
const upload = ref();

const fileUpload = ref();
const scale = ref(1);
const maxScale = ref(MAX_SCALE)
const ratio = ref(1);
const previewImages = ref("");
const file = ref();

const widthScale = ref(0);
const heightScale = ref(0);

const oldWidthScale = ref(0);
const oldHeightScale = ref(0);

const isMaxSizeWidth = ref(false);
const isMaxSizeHeight = ref(false);

const changeScale = () => {
  isMaxSizeWidth.value = false;
  isMaxSizeHeight.value = false;

  widthScale.value = Math.floor(oldWidthScale.value * scale.value);
  heightScale.value = Math.floor(oldHeightScale.value * scale.value);
};

const changeSizeWidth = (e) => {
  isMaxSizeWidth.value = false;
  if (e < oldWidthScale.value) {
    scale.value = 1
    heightScale.value = oldHeightScale.value
    widthScale.value = oldWidthScale.value
    return;
  }

  if (e > oldWidthScale.value * maxScale.value) {
    scale.value = maxScale.value
    heightScale.value = Math.floor(oldHeightScale.value * maxScale.value);
    widthScale.value = Math.floor(oldWidthScale.value * maxScale.value);
    return;
  }
  const newScale = widthScale.value / oldWidthScale.value;
  scale.value = newScale > MAX_SCALE ? MAX_SCALE : newScale;

  heightScale.value = Math.floor(oldHeightScale.value * scale.value);
};

const changeSizeHeight = (e) => {
  isMaxSizeHeight.value = false;
  if (e < oldHeightScale.value) {
    scale.value = 1
    heightScale.value = oldHeightScale.value
    widthScale.value = oldWidthScale.value
    return;
  }

  if (e > oldHeightScale.value * maxScale.value) {
    scale.value = maxScale.value
    heightScale.value = Math.floor(oldHeightScale.value * maxScale.value);
    widthScale.value = Math.floor(oldWidthScale.value * maxScale.value);
    return;
  }

  const newScale = heightScale.value / oldHeightScale.value;
  scale.value = newScale > MAX_SCALE ? MAX_SCALE : newScale;

  widthScale.value = Math.floor(oldWidthScale.value * scale.value);
};

const checkUpload = async (uploadFile, uploadFiles) => {
  isFileValid.value = false;
  isInvalidResolution.value = false;
  isError.value = false;

  // Kiểm tra file ảnh (.png, .jpg, .jpeg)
  if (!validFile(uploadFile.raw.name)) {
    isError.value = true;
    isFileValid.value = true;
    upload.value.clearFiles();
    return;
  }

  // Kiểm tra kích thước ảnh
  if (await isInValidFileSize(uploadFile.raw, MAX_SIZE_SCALE_IMAGE)) {
    isError.value = true;
    isInvalidResolution.value = true;
    upload.value.clearFiles();
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();

    img.src = e.target.result;

    img.onload = () => {
      widthScale.value = img.naturalWidth;
      heightScale.value = img.naturalHeight;

      oldHeightScale.value = img.naturalHeight;
      oldWidthScale.value = img.naturalWidth;

      // Xử lý giới hạn kích thước scale
      handleLimitScale(img.naturalWidth, img.naturalHeight)
    };
  };

  reader.readAsDataURL(uploadFile.raw);
  file.value = uploadFile.raw;

  previewImages.value = URL.createObjectURL(uploadFile.raw);
};

const handleLimitScale = (width, height) => {
  // Tỉ lệ phóng đại tối đa sao cho diện tích không vượt quá kích thước tối đa
  const maxArea = MAX_SIZE_SCALE_IMAGE.width * MAX_SIZE_SCALE_IMAGE.height
  const maxNaturalArea = width * height
  maxScale.value = Math.floor(Math.min(Math.sqrt(maxArea / maxNaturalArea), 2) * 10) / 10
  if (maxScale.value <= 1) {
    scale.value = 1
    isMaxScale.value = true
  }
}

const handleRemoveImage = () => {
  isFileValid.value = false;
  isInvalidResolution.value = false;
  isError.value = false;
  previewImages.value = "";
  file.value = null;
  onResetForm();
};

const onResetForm = () => {
  widthScale.value = 0;
  heightScale.value = 0;
  scale.value = 1;
  isMaxScale.value = false
};

const onSubmit = async () => {
  if (!file.value) {
    isError.value = true;
    return;
  }
  emits('onLoading', true)
  images.value = [];
  isError.value = false;
  percentage.value = 0;
  isLoading.value = true;
  try {
    let interval = setInterval(() => {
      percentage.value += Math.floor(Math.random() * 11);
      if (percentage.value >= 80) {
        clearInterval(interval);
      }
    }, 1500);
    const formData = new FormData();
    formData.append(
        "params",
        JSON.stringify({
          scale: scale.value,
        })
    );
    formData.append("image", file.value);

    const res = await AiGenarate.upScaleImage(formData);

    if (res.status == 200) {
      const data = res.data;

      if (data && data.images) {
        data.images.forEach(async (image) => {
          const currentImg = await decodeBase64(image);
          images.value.push(currentImg);
        });
        percentage.value = 100;

        setTimeout(() => {
          isLoading.value = false;
        }, 1000);
      }
    } else {
      isLoading.value = false;
    }
    emits('onLoading', false)
  } catch (error) {
    emits('onLoading', false)
    console.log("e", error);
  }
};

const changeIndex = (index) => {
  objIndex.value = index
}
</script>
<style lang="scss">
.form-title {
  font-weight: 700;
  color: #ee0033;
}

#description-upload {
  font-size: 13px;
  font-family: "FS Magistral Medium Italic", sans-serif;
  color: #B5B4B4;
}

img {
  width: auto;
  height: 500px;
}
</style>