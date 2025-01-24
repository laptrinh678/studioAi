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

              <!-- Control mode -->
              <div class="w-50">
                <select-option
                    :title="$t('common.form_config.control_mode')"
                    :hint-message="$t('common.hint.control_mode')"
                    :model="bodyData.control_mode"
                    :options="controlModeOption"
                    @update:model="(val) => updateControlMode(val)"
                />
              </div>
            </div>
            <div class="upload-img w-full">
              <!-- Draw canvas start -->
              <div class="w-full">
                <div class="source w-full">
                  <div class="mb-8 w-95">
                    <div class="container-image-draw">
                      <el-button
                          size="large"
                          class="btn_choose_type_image border-0"
                          :class="{ active_button: !sketchInfo.isSketchDraw }"
                          @click="handleNormal"
                          :disabled="isLoading"
                      >{{ $t('sketch.upload') }}
                      </el-button
                      >
                      <el-button
                          size="large"
                          class="btn_choose_type_image m-0 border-0"
                          :class="{ active_button: sketchInfo.isSketchDraw }"
                          @click="handleInDraw"
                          :disabled="isLoading"
                      >{{ $t('sketch.draw') }}
                      </el-button
                      >
                    </div>
                  </div>
                  <img v-show="showMaskImg"
                      :src="maskImg.src"
                       alt="img"
                       :style="{width: `${maskImg.width}px`, height: `${maskImg.height}px`}">
                  <drawing-canvas
                      v-show="showCanvas"
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
                      :styles="{border: sketchInfo.isSketchDraw ? 'solid 1px #000' : ''}"
                      :lock="drawCanvas.disabled"
                      @mousemove="getCoordinate($event)"
                  />

                  <div
                      v-if="!sketchInfo.isUpload && !sketchInfo.isSketchDraw"
                      class="d-flex align-items-center"
                      style="width: 100%; height: 352px; cursor: pointer; padding-bottom: 50px"
                  >
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
                        <div>
                          <image-icon/>
                        </div>
                        <div id="description-upload">{{ $t('common.form_config.upload_image') }}</div>
                      </div>
                    </el-upload>
                    <div id="test"></div>
                  </div>
                  <div
                      class="flex justify-center items-center action-draw"
                      v-if="(sketchInfo.isUpload && !sketchInfo.isSketchDraw) || sketchInfo.isSketchDraw"
                  >

                    <!-- Clean draw -->
                    <div class="button-container" v-if="sketchInfo.isInPain">
                      <el-button @click.prevent="VueCanvasDrawing.reset()" :disabled="isLoading">
                        <eraser-icon/>
                      </el-button>
                    </div>

                    <!-- Stroke size -->
                    <div class="button-container" style="flex-wrap: wrap" v-if="sketchInfo.isInPain">
                      <el-button @click="sketchInfo.chooseLine = !sketchInfo.chooseLine" :disabled="isLoading">
                        <paint-brush-icon/>
                      </el-button>
                      <div class="choose_line" v-show="sketchInfo.chooseLine">
                        <input type="range" :min="1" :max="25" v-model="drawCanvas.line"/>
                      </div>
                    </div>

                    <!-- Undo draw -->
                    <div class="button-container" v-if="sketchInfo.isInPain">
                      <el-button @click.prevent="VueCanvasDrawing.undo()" :disabled="isLoading">
                        <undo-icon/>
                      </el-button>
                    </div>

                    <!-- Delete draw -->
                    <div class="button-container">
                      <el-button
                          v-if="sketchInfo.isUpload"
                          @click="handleRemoveDrawImage"
                          :disabled="isLoading"
                      >
                        <trash-icon/>
                      </el-button>
                    </div>

                    <!-- Stroke color -->
                    <div class="flex justify-center items-center" style="gap: 4px">
                      <input id="stroke-color" type="color" v-model="drawCanvas.color" :disabled="isLoading"/>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <span v-if="fileErrorMessage !== ''" class="error">{{ fileErrorMessage }}</span>
              </div>
              <!-- Draw canvas end -->
            </div>
            <el-button
                :disabled="isLoading || !permission"
                @click="onSubmit()"
                class="button_submit"
                id="submit-sketch"
                type="danger"
            >
              <template #default>
                <span id="title-submit-sketch">{{ $t('common.form_config.create_image') }}</span>
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
                gen-image-via="sketch"
                height="59%"
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
import {onMounted, reactive, ref} from "vue"
import {decodeBase64} from "~/helpers/ImageDetect"
import ShowImageVue from "./ShowImage.vue"
import AiGenarate from "~/services/AiGenarate"
import {MAX_LENGTH_NON_PROMPT, MAX_LENGTH_PROMPT} from "../../../helpers/localStorage"
import {useToast} from "vue-toastification"
import PaintBrushIcon from "../../icons/PaintBrush.vue"
import ImageIcon from "../../icons/Image.vue"
import EraserIcon from "../../icons/Eraser.vue"
import TrashIcon from "../../icons/Trash.vue"
import UndoIcon from "../../icons/Undo.vue"
import {dataURItoFile, isInValidFileSize, validFile} from "../../../helpers/ImageDetect"
import WarningPermission from "~/components/common/WarningPermission.vue"
import SelectOption from "../../common/SelectOption.vue";
import {controlModeOption} from "../../../helpers/constant";
import {useStore} from "vuex";
import i18n from "../../../lang/i18n";
import {MAX_SIZE_SKETCH} from "../../../constants/constant";
import DrawingCanvas from "./DrawingCanvas.vue";

const props = defineProps({
  permission: {
    type: Boolean,
    default: false,
  }})
const emits = defineEmits(['onLoading', 'redirectFeature'])
const store = useStore()

const bodyData = reactive({
  prompt_original: "",
  prompt: "",
  negative_prompt: "",
  guidance_scale: 3.0,
  image_width: 1920,
  image_height: 1080,
  num_images: 1,
  seed: -1,
  prompt_styles: [],
  strength: 0.0,
  lora_names: [],
  control_mode: controlModeOption[0].value
})

const drawCanvas = reactive({
  image: '',
  x: 0,
  y: 0,
  width: 560,
  height: 315,
  strokeType: "dash",
  lineCap: "round",
  lineJoin: "round",
  fillShape: false,
  eraser: false,
  line: 5,
  color: "#000000",
  backgroundColor: "#FFFFFF",
  backgroundImage: null,
  watermark: null,
  disabled: false,
  initialImage: [],
})

const sketchInfo = reactive({
  isSketchDraw: false,
  upload: null,
  isUpload: false,
  chooseLine: false,
  isInPain: false
})

const maskImg = reactive({
  src: '',
  width: 560,
  height: 315
})

const toast = useToast()
const isError = ref(false)
const isLoading = ref(false)
const openAI = ref(false)
const percentage = ref(0)
const objIndex = ref(0)
const images = ref([])
const promptRef = ref("")
const promptErrorMessage = ref("")
const fileErrorMessage = ref("")
const VueCanvasDrawing = ref(null)
const oldBackgroundImage = ref(null)
const showCanvas = ref(false)
const showMaskImg = ref(false)
const upload = ref(null)
const currentSizeImg = reactive({
  width: 1024,
  height: 1024
})
const canvasScale = reactive({
  width: 1024,
  height: 1024
})

const getCoordinate = (event) => {
  const coordinates = VueCanvasDrawing.value.getCoordinates(event);
  drawCanvas.x = coordinates.x;
  drawCanvas.y = coordinates.y;
}

const handleNormal = () => {
  VueCanvasDrawing.value.reset()
  sketchInfo.isInPain = true
  if (sketchInfo.isSketchDraw) showCanvas.value = false
  sketchInfo.isSketchDraw = false
}

const handleInDraw = async () => {
  showCanvas.value = true
  drawCanvas.backgroundImage = null
  drawCanvas.width = 560
  drawCanvas.height = 315
  await VueCanvasDrawing.value.redraw()
  await VueCanvasDrawing.value.reset()

  sketchInfo.isUpload = false
  sketchInfo.upload = null
  sketchInfo.isInPain = true
  sketchInfo.isSketchDraw = true
}

const handleRemoveDrawImage = async () => {
  VueCanvasDrawing.value.reset()
  sketchInfo.isUpload = false
  sketchInfo.upload = null
  isError.value = false
  showCanvas.value = false
  showMaskImg.value = false

  // Reset size canvas
  drawCanvas.width = 560
  drawCanvas.height = 315
}

const isValidate = () => {
  isError.value = false
  fileErrorMessage.value = ""
  if (promptRef.value.trim().length === 0) {
    isError.value = true
    promptErrorMessage.value = i18n.global.t('common.prompt_required')
    return false
  }

  if (promptRef.value.length > MAX_LENGTH_PROMPT ||
      bodyData.negative_prompt.length > MAX_LENGTH_NON_PROMPT
  ) {
    toast.error(i18n.global.t('common.text_too_long'))
    return false
  }

  if (!sketchInfo.isUpload && !sketchInfo.isSketchDraw) {
    fileErrorMessage.value = i18n.global.t('common.image_required')
    return false
  }

  if (sketchInfo.isSketchDraw) {
    if (VueCanvasDrawing.value.isEmpty()) {
      fileErrorMessage.value = i18n.global.t('common.stroke_required')
      return false
    }
  }

  return true
}

const checkUpload = async (uploadFile, uploadFiles) => {
  // Kiểm tra file ảnh (.png, .jpg, .jpeg)
  if (!validFile(uploadFile.raw.name)) {
    fileErrorMessage.value = i18n.global.t('mc_scene.image_asset.validate.file_format')
    upload.value.clearFiles()
    return
  }

  // Kiểm tra kích thước ảnh
  if (await isInValidFileSize(uploadFile.raw, MAX_SIZE_SKETCH)) {
    fileErrorMessage.value = i18n.global.t('common.limit_resolution', {width: MAX_SIZE_SKETCH.width, height: MAX_SIZE_SKETCH.height})
    upload.value.clearFiles()
    return
  }

  isError.value = false
  fileErrorMessage.value = ''
  const URL = window.URL
  await setSizeCanvas(URL.createObjectURL(uploadFile.raw))
  drawCanvas.backgroundImage = URL.createObjectURL(uploadFile.raw)
  oldBackgroundImage.value = URL.createObjectURL(uploadFile.raw)
  await VueCanvasDrawing.value.redraw()
  sketchInfo.isUpload = true
  sketchInfo.isInPain = true
  showCanvas.value = true
}

const setSizeCanvas = (imageDataUrl) => {
  const img = new Image()
  img.src = imageDataUrl
  img.onload = () => {
    drawCanvas.width = img.width * drawCanvas.height / img.height

    // Lưu kích thước ảnh ban đầu
    currentSizeImg.width = img.width
    currentSizeImg.height = img.height

    // Lưu kích thước sau khi scale
    canvasScale.width = drawCanvas.width
    canvasScale.height = drawCanvas.height
  }
}

const resizeCanvas = async (width, height) => {
  const scale = Number((width / drawCanvas.width))
  drawCanvas.width = width
  drawCanvas.height = height

  const strokes = VueCanvasDrawing.value.getAllStrokes()
  strokes.forEach((stroke, index) => {
    stroke.width *= scale
    stroke.from.x *= scale
    stroke.from.y *= scale

    const coordinates = stroke.coordinates
    coordinates.forEach((coordinate, key) => {
      coordinate.x *= scale
      coordinate.y *= scale
    })
  })
  drawCanvas.initialImage = strokes
  await VueCanvasDrawing.value.redraw()
}

const onSubmit = async () => {
  if (await !isValidate()) {
    return
  }

  // Ẩn canvas và hiện thị ảnh thay cho canvas
  maskImg.src = drawCanvas.image
  maskImg.width = drawCanvas.width
  maskImg.height = drawCanvas.height
  showMaskImg.value = true
  showCanvas.value = false

  // Scale về kích thước ban đầu
  if (sketchInfo.isSketchDraw) {
    // Scale với option "Vẽ ảnh phác thảo"
    bodyData.image_width = 640
    bodyData.image_height = 360
    await resizeCanvas(640, 360)
  } else {
    // Scale với option "Upload ảnh phác thảo"
    bodyData.image_width = currentSizeImg.width
    bodyData.image_height = currentSizeImg.height
    await resizeCanvas(currentSizeImg.width, currentSizeImg.height)
  }

  percentage.value = 0
  isLoading.value = true
  images.value = []

  emits('onLoading', true)
  const dataForm = {
    ...bodyData,
    prompt: promptRef.value,
    open_ai: openAI.value
  }

  try {
    let interval = setInterval(() => {
      percentage.value += Math.floor(Math.random() * 11)
      if (percentage.value >= 80) {
        clearInterval(interval)
      }
    }, 1500)

    const formData = new FormData()
    formData.append(
        "params",
        JSON.stringify({
          ...dataForm,
        })
    )
    const blob = await dataURItoFile(drawCanvas.image)
    const file = await new File([blob], 'file.png', {type: 'image/png'})
    formData.append("image", file)
    const res = await AiGenarate.textToImageControlnet(formData)
    if (res && res.status === 200) {
      const data = res.data

      if (data && data.images) {
        data.images.forEach(async (image) => {
          const currentImg = await decodeBase64(image)
          images.value.push(currentImg)
        })
        percentage.value = 100

        setTimeout(() => {
          isLoading.value = false
        }, 1000)
      }
    } else {
      isLoading.value = false
    }

    // Hiển thị canvas sau khi submit thành công
    showMaskImg.value = false
    showCanvas.value = true
    if (sketchInfo.isSketchDraw) {
      await resizeCanvas(560, 315)
    } else {
      await resizeCanvas(canvasScale.width, canvasScale.height)
    }
    emits('onLoading', false)
  } catch (error) {
    emits('onLoading', false)
    console.log("e", error)
  }
}

const changeIndex = (index) => {
  objIndex.value = index
}

const updateControlMode = (value) => {
  bodyData.control_mode = value
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
    ...bodyData,
    prompt: promptRef.value,
    type: 'sketch'
  }
  const blobImgResult = dataURItoFile(images.value[0])
  const imageResult = new File([blobImgResult], 'file.png', { type: 'image/png' })
  const blobImgDraw = await dataURItoFile(drawCanvas.image)
  const imageDraw = new File([blobImgDraw], 'file.png', { type: 'image/png' })
  const formData = new FormData()
  formData.append('image', imageResult)
  formData.append('image_upload', imageDraw)
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
  if (dataGenerated && dataGenerated.type === 'sketch') {
    const form = JSON.parse(dataGenerated.attrs)
    promptRef.value = form.prompt
    getImage(form.image_upload)
  }
})

const getImage = async (path) => {
  const response = await fetch(path)
  const blob = await response.blob()
  const result = await new File([blob], 'file.png', { type: 'image/png' })

  oldBackgroundImage.value = result
  await setSizeCanvas(path)
  drawCanvas.backgroundImage = URL.createObjectURL(result)
  await VueCanvasDrawing.value.redraw()
  sketchInfo.isUpload = true
  sketchInfo.isInPain = true
  showCanvas.value = true
}
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
  width: fit-content;
  background: linear-gradient(to bottom right, #f3f4f6, #e5e7eb);
  border-radius: 12px;
}

#description-upload {
  font-size: 13px;
  font-family: "FS Magistral Medium Italic", sans-serif;
  color: #B5B4B4;
}

#stroke-color {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid rgb(153, 153, 153);
  padding: 2px;

  &::-webkit-color-swatch {
    border-radius: 50%;
  }
}
</style>