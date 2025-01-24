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
                <div v-if="formUploadFile.isError" class="error">{{ promptErrorMessage }}</div>
              </div>
            </div>
            <div class="upload-img w-full">
              <div class="w-full">
                <div class="source w-full">
                  <vue-drawing-canvas
                      v-show="formUploadFile.isUpload"
                      ref="VueCanvasDrawing"
                      v-model:image="drawCanvas.image"
                      :width="drawCanvas.width"
                      :height="drawCanvas.height"
                      :stroke-type="drawCanvas.strokeType"
                      :line-cap="drawCanvas.lineCap"
                      :line-join="drawCanvas.lineJoin"
                      :fill-shape="drawCanvas.fillShape"
                      :eraser="drawCanvas.eraser"
                      :lineWidth="drawCanvas.line"
                      :color="drawCanvas.color"
                      :background-color="drawCanvas.backgroundColor"
                      :background-image="drawCanvas.backgroundImage"
                      :watermark="drawCanvas.watermark"
                      :initial-image="drawCanvas.initialImage"
                      saveAs="png"
                      :additional-images="drawCanvas.additionalImages"
                  />
                  <div v-if="!formUploadFile.isUpload" class="d-flex align-items-center form-upload">
                    <el-upload
                        ref="upload"
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :auto-upload="false"
                        :limit="1"
                        :on-change="checkUpload"
                        accept=".png, .jpeg, .jpg"
                    >
                      <div class="el-upload__text d-flew flex-column">
                        <div><image-icon /></div>
                        <div id="description-upload">{{ $t('common.form_config.upload_image') }}</div>
                      </div>
                    </el-upload>
                  </div>
                  <div class="flex justify-center items-center action-draw" v-if="formUploadFile.isUpload">
                    <div class="button-container">
                      <el-button @click.prevent="VueCanvasDrawing.reset()" :disabled="isLoading">
                        <eraser-icon />
                      </el-button>
                    </div>

                    <!-- Row draw -->
                    <div class="button-container flex-wrap">
                      <el-button @click="drawCanvas.chooseLine = !drawCanvas.chooseLine" :disabled="isLoading">
                        <paint-brush-icon />
                      </el-button>
                      <div class="choose_line" v-show="drawCanvas.chooseLine">
                        <input type="range" :min="1" :max="25" v-model="drawCanvas.line" />
                      </div>
                    </div>

                    <!-- Row rest -->
                    <div class="button-container">
                      <el-button @click.prevent="VueCanvasDrawing.undo()" :disabled="isLoading">
                        <undo-icon />
                      </el-button>
                    </div>

                    <!-- Delete draw -->
                    <div class="button-container">
                      <el-button v-if="formUploadFile.isUpload" @click="handleRemoveDrawImage" :disabled="isLoading">
                        <trash-icon />
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
              <span v-if="formUploadFile.isError" class="error">{{ formUploadFile.imageErrorMessage }}</span>
            </div>
            <!-- Form config -->
            <form-config
                @updateFormData="(val) => updateData(val)"
                :isToImage="false"
                :isTextToImage="false"
            />
            <el-button
                :disabled="isLoading || !permission"
                @click="onSubmit()"
                class="button_submit"
                id="submit-in-painting"
                type="danger"
            >
              <template #default>
                <span id="title-submit-in-painting">{{ $t('common.form_config.create_image') }}</span>
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
                gen-image-via="in-painting"
                height="51%"
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
import {decodeBase64, convertFileToBase64} from "~/helpers/ImageDetect";
import ShowImageVue from "./ShowImage.vue";
import AiGenarate from "~/services/AiGenarate";
import {MAX_LENGTH_PROMPT, MAX_LENGTH_NON_PROMPT} from "../../../helpers/localStorage";
import WarningPermission from "~/components/common/WarningPermission.vue";
import {useToast} from "vue-toastification";
import i18n from "../../../lang/i18n";
import EraserIcon from "../../icons/Eraser.vue";
import ImageIcon from "../../icons/Image.vue";
import UndoIcon from "../../icons/Undo.vue";
import VueDrawingCanvas from "vue-drawing-canvas";
import PaintBrushIcon from "../../icons/PaintBrush.vue";
import TrashIcon from "../../icons/Trash.vue";
import {convertToImage, dataURItoFile, isInValidFileSize, validFile} from "../../../helpers/ImageDetect";
import {MAX_SIZE_IN_PAINTING} from "../../../constants/constant";
import {useStore} from "vuex";

const props = defineProps({
  permission: {
    type: Boolean,
    default: false,
  }
})
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
const drawCanvas = reactive({
  width: 354,
  height: 315,
  x: 0,
  y: 0,
  line: 5,
  strokeType: "dash",
  lineCap: "round",
  lineJoin: "round",
  backgroundColor: "#ffffff",
  color: "#000000",
  image: "",
  backgroundImage: null,
  watermark: null,
  eraser: false,
  disabled: false,
  fillShape: false,
  additionalImages: [],
  initialImage: [],
  chooseLine: false
})
const currentImg = reactive({
  width: 1024,
  height: 1024
})
const store = useStore()
const toast = useToast()
const VueCanvasDrawing = ref()
const formUploadFile = reactive({
  isError: false,
  isFileValid: false,
  isInvalidResolution: false,
  isUpload: false,
  imageErrorMessage: ""
})
const upload = ref()
const isLoading = ref(false)
const openAI = ref(false)
const percentage = ref(0)
const objIndex = ref(0)
const images = ref([])
const promptRef = ref("")
const storeStyleImage = ref("")
const storeMainColor = ref("")
const currentImageDraw = ref("")
const mask = ref("")
const promptErrorMessage = ref("")

const isValidate = () => {
  promptErrorMessage.value = ''
  formUploadFile.imageErrorMessage = ''
  // Prompt không được để trống
  if (promptRef.value.trim().length === 0) {
    formUploadFile.isError = true;
    promptErrorMessage.value = i18n.global.t('common.prompt_required');
    return false;
  }

  // Giới hạn maxlength của prompt, negative prompt, main color
  if (promptRef.value.length > MAX_LENGTH_PROMPT ||
      bodyData.value.negative_prompt.length > MAX_LENGTH_NON_PROMPT ||
      storeMainColor.value.length > MAX_LENGTH_NON_PROMPT
  ) {
    toast.error(i18n.global.t('common.text_too_long'))
    return false;
  }

  // File upload không được để trống
  if (formUploadFile.isUpload === false) {
    formUploadFile.isError = true
    formUploadFile.imageErrorMessage = i18n.global.t('common.image_required')
    return false
  }

  // Phải đánh dấu vùng cần sửa
  if (VueCanvasDrawing.value.isEmpty()) {
    formUploadFile.isError = true
    formUploadFile.imageErrorMessage = i18n.global.t('common.mask_required')
    return false
  }

  formUploadFile.isError = false;
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
  mask.value = await convertToImage(JSON.stringify(VueCanvasDrawing.value.getAllStrokes()), drawCanvas.width, drawCanvas.height)

  emits('onLoading', true)
  const dataForm = {
    ...bodyData.value,
    prompt: promptRef.value,
    main_color: storeMainColor.value,
    open_ai: openAI.value,
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
    formData.append("image", currentImageDraw.value);
    formData.append("mask", mask.value);
    console.log(await convertFileToBase64(currentImageDraw.value))
    console.log(await convertFileToBase64(mask.value))
    const res = await AiGenarate.inpaintingToImages(formData);
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
      data.imageType !== "none" && data.imageType ? ` ${data.imageType}` : "";
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
        data.prompt_styles === "none" || data.prompt_styles.value === "none"
            ? []
            : [data.prompt_styles],
    strength: data.strength,
    lora_names:
        data.lora_names === "none" || data.lora_names.value === "none"
            ? []
            : [data.lora_names],
  };
};

const handleChangeResolution = (size) => {
  const width = Math.floor(size.width / 8) * 8
  const height = Math.floor(size.height / 8) * 8
  currentImg.width = width
  currentImg.height = height
  bodyData.value.image_width = width
  bodyData.value.image_height = height
}

const changeIndex = (index) => {
  objIndex.value = index
}

const checkUpload = async (uploadFile, uploadFiles) => {
  formUploadFile.isFileValid = false
  formUploadFile.isInvalidResolution = false

  // Kiểm tra file ảnh (.png, .jpg, .jpeg)
  if (!validFile(uploadFile.raw.name)) {
    formUploadFile.imageErrorMessage = i18n.global.t('mc_scene.image_asset.validate.file_format')
    formUploadFile.isError = true
    formUploadFile.isFileValid = true
    upload.value.clearFiles()
    return
  }

  // Kiểm tra kích thước ảnh
  if (await isInValidFileSize(uploadFile.raw, MAX_SIZE_IN_PAINTING)) {
    formUploadFile.isError = true
    formUploadFile.imageErrorMessage = i18n.global.t('common.limit_resolution', {width: MAX_SIZE_IN_PAINTING.width, height: MAX_SIZE_IN_PAINTING.height})
    formUploadFile.isInvalidResolution = true
    upload.value.clearFiles()
    return
  }

  currentImageDraw.value = uploadFile.raw
  formUploadFile.isError = false
  const URL = window.URL
  await setSizeCanvas(URL.createObjectURL(uploadFile.raw))
  drawCanvas.backgroundImage = URL.createObjectURL(uploadFile.raw)
  await VueCanvasDrawing.value.redraw()
  formUploadFile.isUpload = true
}

const setSizeCanvas = (imageDataUrl) => {
  const img = new Image()
  img.src = imageDataUrl
  img.onload = () => {
    drawCanvas.width = img.width * drawCanvas.height / img.height
    handleChangeResolution({width: img.width, height: img.height})
  };
}

const handleRemoveDrawImage = () => {
  currentImageDraw.value = undefined
  drawCanvas.image = ""
  VueCanvasDrawing.value.reset()
  formUploadFile.isUpload = false
  formUploadFile.isError = false
  formUploadFile.isFileValid = false
  formUploadFile.isInvalidResolution = false
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
    type: 'in-painting'
  }
  const blob = dataURItoFile(images.value[0])
  const imageResult = new File([blob], 'file.png', { type: 'image/png' })
  const formData = new FormData()
  formData.append('image', imageResult)
  formData.append('image_upload', currentImageDraw.value)
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
  if (dataGenerated && dataGenerated.type === 'in-painting') {
    const form = JSON.parse(dataGenerated.attrs)
    promptRef.value = form.prompt
    getImage(form.image_upload)
  }
})

const getImage = async (path) => {
  const response = await fetch(path)
  const blob = await response.blob()
  const result = await new File([blob], 'file.png', { type: 'image/png' })

  currentImageDraw.value = result
  formUploadFile.isError = false
  await setSizeCanvas(path)
  drawCanvas.backgroundImage = URL.createObjectURL(result)
  await VueCanvasDrawing.value.redraw()
  formUploadFile.isUpload = true
}

const getImageViaGenerator = async (data) => {
  const image = data.image[0]
  const fileImage = dataURItoFile(image)

  currentImageDraw.value = fileImage
  formUploadFile.isError = false
  const URL = window.URL
  await setSizeCanvas(URL.createObjectURL(fileImage))
  drawCanvas.backgroundImage = URL.createObjectURL(fileImage)
  await VueCanvasDrawing.value.redraw()
  formUploadFile.isUpload = true
}

defineExpose({getImageViaGenerator})
</script>
<style lang="scss" scoped>
.form-title {
  font-weight: 700;
  color: #ee0033;
}

img {
  width: auto;
  height: 500px;
}

.form-upload {
  width: 100%;
  height: 352px;
  cursor: pointer;
  padding-bottom: 50px;
}

.upload-demo {
  width: 100%;
  height: 100%;
}
.source {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 8px 0 0 0;
  border: 1px dashed #e5e7eb;
  border-radius: 6px;
  position: relative;
  .btn_remove {
    position: absolute;
    top: 1%;
    right: 1%;
  }
  .action-draw {
    position: relative;
    width: 95%;
    justify-content: end;
  }
  .choose_line {
    position: absolute;
    top: -25px;
    right: 0;
  }
  .button-container {
    display: flex;
    flex-direction: row;
    position: relative;
    .el-button {
      width: 30px;
      border: 0;
    }
    .el-icon {
      font-size: 24px;
    }
  }
  .button-container > * {
    margin-top: 5px;
    margin-right: 10px;
  }
}

.flex-row {
  display: flex;
  flex-direction: row;
}
.active_button {
  background: #ee0033 !important;
  color: white !important;
}
.btn_choose_type_image {
  background: linear-gradient(to bottom right, #f3f4f6, #e5e7eb);
  color: #374151;
  font-family: "FS Magistral Medium", sans-serif;
  font-size: 13px;
  border-radius: 4px;
  height: 30px;
}

.container-image-draw {
  width: 50%;
  background: linear-gradient(to bottom right, #f3f4f6, #e5e7eb);
  border-radius: 12px;
}

#description-upload {
  font-size: 13px;
  font-family: "FS Magistral Medium Italic", sans-serif;
  color: #B5B4B4;
}
</style>