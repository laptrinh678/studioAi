<template>
  <div class="main-text-to-images">
    <div class="main-text-form">
      <div class="form-config">
        <div class="form-content flex w-full">
          <div class="w-full">
            <p class="form-title">{{ $t('common.form_config.title') }}</p>
            <div class="prompt-content flex justify-between flex-column">
              <div class="input-form">
                <div class="label items-center flex align-items-center">
                  <div class="text">{{ $t('common.form_config.prompt_input') }}</div>
                </div>
                <el-input
                    v-model="promptRef"
                    :autosize="{ minRows: 2, maxRows: 8 }"
                    maxlength="1000"
                    show-word-limit
                    type="textarea"
                    :placeholder="$t('common.form_config.description_input')"
                />
                <el-checkbox v-model="openAI" :label="$t('common.form_config.openAI')" size="large" />
                <div v-if="isError" class="error">{{ promptErrorMessage }}</div>
              </div>
            </div>
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

              <div class="preview-container pt-0" v-else>
                <el-button @click="handleRemoveImage">
                  <trash-icon />
                </el-button>
                <img
                    style="object-fit: contain"
                    :src="previewImages"
                    alt="Uploaded Image"
                />
              </div>
            </div>
            <span v-if="isError" class="error">
              <span v-if="isFileInvalid">{{ $t('mc_scene.image_asset.validate.file_format') }}</span>
              <span v-else-if="isInvalidResolution">{{ $t('common.limit_resolution', {width: MAX_SIZE_IMAGE_TO_IMAGE.width, height: MAX_SIZE_IMAGE_TO_IMAGE.height}) }}</span>
              <span v-else-if="isEmptyFile">{{ $t('common.image_required') }}</span>
            </span>
            <!-- Form config -->
            <form-config
                @updateFormData="(val) => updateData(val)"
                :isToImage="true"
                :isTextToImage="false"
            />
            <el-button
                :disabled="isLoading || !permission"
                @click="onSubmit()"
                class="button_submit"
                id="submit-image-to-image"
                type="danger"
            >
              <template #default>
                <span id="title-submit-image-to-image">{{ $t('common.form_config.create_image') }}</span>
              </template>
            </el-button>
            <warning-permission v-if="!permission" />
          </div>
          <div class="w-full">
            <div>
              <p class="form-title">{{ $t('common.form_config.result') }}</p>
              <div class="process-custom mb-2 p-0" v-if="isLoading">
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
            </div>
            <!-- Show Image -->
            <show-image-vue
                :images="images"
                :isLoading="isLoading"
                :obj-index="objIndex"
                gen-image-via="image-to-image"
                height="48%"
                @change-index="changeIndex"
                @redirect-image="redirectFeature"
            />
            <div class="d-flex gap-5 justify-content-center" v-if="images.length > 0">
              <el-button @click="shareGenerated" type="success">Chia sẻ</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import formConfig from "./formConfig.vue";
import {decodeBase64} from "~/helpers/ImageDetect";
import ShowImageVue from "./ShowImage.vue";
import AiGenarate from "~/services/AiGenarate";
import {MAX_LENGTH_PROMPT, MAX_LENGTH_NON_PROMPT} from "../../../helpers/localStorage";
import WarningPermission from "~/components/common/WarningPermission.vue";
import {useToast} from "vue-toastification";
import i18n from "../../../lang/i18n"
import TrashIcon from "../../icons/Trash.vue";
import ImageIcon from "../../icons/Image.vue";
import {dataURItoFile, isInValidFileSize, validFile} from "../../../helpers/ImageDetect";
import {MAX_SIZE_IMAGE_TO_IMAGE} from "../../../constants/constant";
import {useStore} from "vuex";

const props = defineProps({
  permission: {
    type: Boolean,
    default: false,
  }
})
const store = useStore()
const emits = defineEmits(['onLoading', 'redirectFeature'])
const bodyData = ref({
  prompt_original: "",
  prompt: "",
  negative_prompt: "",
  guidance_scale: 3.0,
  image_width: 1024,
  image_height: 1024,
  num_images: 1,
  seed: -1,
  prompt_styles: [],
  strength: 0.0,
  lora_names: [],
});
const currentImg = reactive({
  width: 1024,
  height: 1024
})

const toast = useToast()
const upload = ref()
const file = ref()
const isError = ref(false);
const isLoading = ref(false);
const isUpload = ref(false)
const openAI = ref(false)
const isFileInvalid = ref(false)
const isInvalidResolution = ref(false)
const isEmptyFile = ref(true)
const percentage = ref(0);
const objIndex = ref(0)
const images = ref([]);
const promptRef = ref("");
const storeStyleImage = ref("");
const storeMainColor = ref("");
const previewImages = ref("")

const promptErrorMessage = ref("");

const isValidate = () => {
  promptErrorMessage.value = ''
  isEmptyFile.value = false
  if (promptRef.value.trim().length === 0) {
    isError.value = true;
    promptErrorMessage.value = i18n.global.t('common.prompt_required');
    return false;
  }

  if (promptRef.value.length > MAX_LENGTH_PROMPT ||
      bodyData.value.negative_prompt.length > MAX_LENGTH_NON_PROMPT ||
      storeMainColor.value.length > MAX_LENGTH_NON_PROMPT
  ) {
    toast.error(i18n.global.t('common.text_too_long'))
    return false;
  }

  if (!file.value) {
    isError.value = true
    isEmptyFile.value = true
    return false
  }

  isError.value = false;
  return true;
}

const onSubmit = async () => {
  if (!isValidate()) {
    return;
  }

  percentage.value = 0;
  isLoading.value = true;
  images.value = [];
  objIndex.value = 0

  emits('onLoading', true)

  const dataForm = {
    ...bodyData.value,
    prompt: promptRef.value,
    main_color: storeMainColor.value,
    open_ai: openAI.value
  };

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
          ...dataForm,
        })
    );

    formData.append("image", file.value);
    let res = await AiGenarate.imageToImages(formData);
    if (res && res.status === 200) {
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

const updateData = (data) => {
  storeStyleImage.value =
      data.imageType != "none" && data.imageType ? ` ${data.imageType}` : "";
  storeMainColor.value = data.mainColor ? data.mainColor : "";

  bodyData.value = {
    prompt: promptRef.value,
    negative_prompt: bodyData.value.negative_prompt,
    guidance_scale: data.guidance_scale,
    image_width: currentImg.width,
    image_height: currentImg.height,
    num_images: data.num_images,
    seed: data.seed,
    prompt_styles:
        data.prompt_styles == "none" || data.prompt_styles.value == "none"
            ? []
            : [data.prompt_styles],
    strength: data.strength,
    lora_names:
        data.lora_names == "none" || data.lora_names.value == "none"
            ? []
            : [data.lora_names],
  };
};

const handleChangeResolution = (imageDataUrl) => {
  const img = new Image()
  img.src = imageDataUrl
  img.onload = () => {
    const width = Math.floor(img.width / 8) * 8
    const height = Math.floor(img.height / 8) * 8
    bodyData.value.image_width = width
    bodyData.value.image_height = height
  }
}

const checkUpload = async (uploadFile, uploadFiles) => {
  isFileInvalid.value = false
  isInvalidResolution.value = false
  isError.value = false

  // Kiểm tra file ảnh (.png, .jpg, .jpeg)
  if (!validFile(uploadFile.raw.name)) {
    isError.value = true
    isFileInvalid.value = true
    upload.value.clearFiles()
    return
  }

  // Kiểm tra kích thước ảnh
  if (await isInValidFileSize(uploadFile.raw, MAX_SIZE_IMAGE_TO_IMAGE)) {
    isError.value = true
    isInvalidResolution.value = true
    upload.value.clearFiles()
    return
  }

  await handleChangeResolution(URL.createObjectURL(uploadFile.raw))
  file.value = uploadFile.raw
  previewImages.value = URL.createObjectURL(uploadFile.raw)
}

const handleRemoveImage = () => {
  isFileInvalid.value = false
  isInvalidResolution.value = false
  isError.value = false
  file.value = null
  previewImages.value = ""
}

const changeIndex = (index) => {
  objIndex.value = index
}

const redirectFeature = (feature) => {
  emits('redirectFeature', {
    feature: feature,
    image: images.value
  })
}

const shareGenerated = async () => {
  emits('onLoading', true)

  const dataPrompt = {
    ...bodyData.value,
    prompt: promptRef.value,
    main_color: storeMainColor.value,
    type: 'image-to-image'
  }
  const blob = dataURItoFile(images.value[0])
  const imageResult = new File([blob], 'file.png', { type: 'image/png' })
  const formData = new FormData()
  formData.append('image', imageResult)
  formData.append('image_upload', file.value)
  formData.append('params', JSON.stringify(dataPrompt))

  const res = await AiGenarate.shareGenerated(formData)
  if (res.status === 200) {
    toast.success('Chia sẻ thành công.')
  } else {
    isLoading.value = false
  }

  emits('onLoading', false)
}

onMounted(() => {
  const dataGenerated = store.getters.result_generated
  if (dataGenerated && dataGenerated.type === 'image-to-image') {
    const form = JSON.parse(dataGenerated.attrs)
    promptRef.value = form.prompt
    getImage(form.image_upload)
  }
})

const getImage = async (path) => {
  const response = await fetch(path)
  const blob = await response.blob()
  const result = await new File([blob], 'file.png', { type: 'image/png' })
  isUpload.value = true
  file.value = result
  previewImages.value = path
}

const getImageViaGenerator = (data) => {
  const image = data.image[0]
  const fileImage = dataURItoFile(image)
  isUpload.value = true
  file.value = fileImage
  previewImages.value = image
}

defineExpose({getImageViaGenerator})
</script>
<style lang="scss">
#toolbar-container .ql-font span[data-label="Alex Brush"]::before {
  font-family: "Alex Brush", cursive;
  font-weight: 400;
  font-style: normal;
}

.ql-font-alex-brush {
  font-family: "Alex Brush", cursive;
  font-weight: 400;
  font-style: normal;
}

.form-title {
  font-weight: 700;
  color: #ee0033;
}

img {
  width: auto;
  height: 500px;
}
</style>
