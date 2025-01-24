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
            <div class="upload-img w-full">
              <!-- Draw canvas start -->
              <div class="w-full">
                <div class="source w-full">
                  <div class="d-flex align-items-center form-upload" v-if="!sketchInfo.isUpload">
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
                  </div>
                  <div id="out-painting-stage" style="width: 630px;height: 350px" v-show="sketchInfo.isUpload"></div>
                  <div
                      class="flex justify-center items-center action-draw"
                      v-if="(sketchInfo.isUpload && !sketchInfo.isSketchDraw) || sketchInfo.isSketchDraw"
                  >

                    <!-- Resize -->
                    <div class="button-container">
                      <el-button @click.prevent="handleResize" :disabled="isLoading">
                        <resize-icon />
                      </el-button>
                    </div>

                    <!-- Clean draw -->
                    <div class="button-container">
                      <el-button @click.prevent="handleCleanDraw" :disabled="isLoading">
                        <eraser-icon/>
                      </el-button>
                    </div>

                    <!-- Stroke size -->
                    <div class="button-container" style="flex-wrap: wrap">
                      <el-button @click="sketchInfo.chooseLine = !sketchInfo.chooseLine" :disabled="isLoading">
                        <paint-brush-icon/>
                      </el-button>
                      <div class="choose_line" v-show="sketchInfo.chooseLine">
                        <input type="range" :min="1" :max="25" v-model="drawCanvas.line"/>
                      </div>
                    </div>

                    <!-- Undo draw -->
<!--                    <div class="button-container">-->
<!--                      <el-button @click.prevent="handleUndoDraw" :disabled="isLoading">-->
<!--                        <undo-icon/>-->
<!--                      </el-button>-->
<!--                    </div>-->

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
                @change-index="changeIndex"
                @redirect-image="redirectFeature"
            />
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
import ResizeIcon from "../../icons/Resize.vue"
import {controlModeOption} from "../../../helpers/constant";
import {useStore} from "vuex";
import i18n from "../../../lang/i18n";
import {MAX_SIZE_SKETCH} from "../../../constants/constant";
import DrawingCanvas from "./DrawingCanvas.vue";
import Konva from "konva";
import {forEach} from "lodash";

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
  line: 5,
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
const upload = ref(null)
const background = ref(null)
const backgroundOutPainting = ref(null)
const transformer = ref(null)
const canvas = reactive({
  width: 630,
  height: 350,
})

const maxOutPainting = reactive({
  width: 1920,
  height: 1080
})

const imageUpload = reactive({
  x: 0,
  y: 0,
  width: 0,
  height: 0
})
const image = ref(null)
const stage = ref(null)
const layer = ref(null)
const isPaint = ref(false)
const resize = ref(false)
const lastLine = ref(null)
const mask = ref(null)
const scale = ref(1)

const handleRemoveDrawImage = async () => {
  sketchInfo.isUpload = false
  sketchInfo.upload = null
  isError.value = false

  image.value.image(new Image())
  await handleCleanDraw()
}

const isValidate = () => {
  isError.value = false
  fileErrorMessage.value = ""
  // Prompt required
  if (promptRef.value.trim().length === 0) {
    isError.value = true
    promptErrorMessage.value = i18n.global.t('common.prompt_required')
    return false
  }

  // Max length prompt
  if (promptRef.value.length > MAX_LENGTH_PROMPT ||
      bodyData.negative_prompt.length > MAX_LENGTH_NON_PROMPT
  ) {
    toast.error(i18n.global.t('common.text_too_long'))
    return false
  }

  // Image required
  if (!sketchInfo.isUpload) {
    fileErrorMessage.value = i18n.global.t('common.image_required')
    return false
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
  sketchInfo.isUpload = true
}

const setSizeCanvas = (imageDataUrl) => {
  const img = new Image()
  img.src = imageDataUrl
  img.onload = () => {
    // const maxWidthOutPainting = maxOutPainting.width * (canvas.height - 30) / maxOutPainting.height
    // const maxHeightOutPainting = canvas.height - 30

    scale.value = maxOutPainting.width / canvas.width

    imageUpload.width = img.width / scale.value
    imageUpload.height = img.height / scale.value
    imageUpload.x = (canvas.width - imageUpload.width) / 2
    imageUpload.y = (canvas.height - imageUpload.height) / 2
    console.log(imageUpload)

    // Set background to center canvas
    image.value.setAttrs({
      width: imageUpload.width,
      height: imageUpload.height,
      x: imageUpload.x,
      y: imageUpload.y,
    })
    image.value.image(img)

    // Set backgroundOutPainting
    backgroundOutPainting.value.setAttrs({
      width: imageUpload.width,
      height: imageUpload.height,
      x: imageUpload.x,
      y: imageUpload.y,
      scale: {x: 1, y: 1}
    })
  }
}

const onSubmit = async () => {
  // Get image origin, remove all stroke, remove border transformer
  const imageOrigin = layer.value.clone()
  imageOrigin.children[0].setAttrs({
    width: backgroundOutPainting.value.width(),
    height: backgroundOutPainting.value.height()
  })
  imageOrigin.children[1].setAttrs({
    width: image.value.width(),
    height: image.value.height()
  })
  const strokes = imageOrigin.getChildren(function (node) {
    return node.getClassName() === 'Line'
  })
  forEach(strokes, (node) => {
    node.remove()
  })

  transformer.value.setAttrs({
    enabledAnchors: [],
    borderEnabled: false
  })
  resize.value = false

  console.log(imageOrigin.toDataURL({
    x: transformer.value.x(),
    y: transformer.value.y(),
    width: transformer.value.width(),
    height: transformer.value.height(),
    mimeType: 'image/png'})
  )

  // Get mask
  const imageMask = layer.value.clone()
  const maskClone = imageMask.getChildren(function (node) {
    return node.hasName('mask')
  })
  maskClone[0].setAttrs({
    x: image.value.x(),
    y: image.value.y(),
    width: image.value.width(),
    height: image.value.height(),
  })
  imageMask.children[0].fill('white')
  const strokesMask = imageMask.getChildren(function (node) {
    return node.getClassName() === 'Line'
  })
  forEach(strokesMask, (node) => {
    node.stroke('#ffffff')
  })
  console.log(imageMask.toDataURL({
    x: transformer.value.x(),
    y: transformer.value.y(),
    width: transformer.value.width(),
    height: transformer.value.height(),
    mimeType: 'image/png'})
  )

  if (!isValidate()) {
    return
  }

  const blob_1 = dataURItoFile(imageOrigin.toDataURL({x: transformer.value.x(), y: transformer.value.y(), width: transformer.value.width(), height: transformer.value.height(), mimeType: 'image/png'}))
  const blob_2 = dataURItoFile(imageMask.toDataURL({x: transformer.value.x(), y: transformer.value.y(), width: transformer.value.width(), height: transformer.value.height(), mimeType: 'image/png'}))
  const file_origin = new File([blob_1], 'file_origin.png', { type: 'image/png' })
  const file_mask = new File([blob_2], 'file_mask.png', { type: 'image/png' })

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

    formData.append("image", file_origin)
    formData.append("mask", file_mask)
    const res = await AiGenarate.outPainting(formData)
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

    emits('onLoading', false)
  } catch (error) {
    emits('onLoading', false)
    console.log("e", error)
  }
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

const handleResize = async () => {
  if (resize.value) {
    transformer.value.setAttrs({
      enabledAnchors: [],
      borderEnabled: false
    })

    await freeDraw()
  } else {
    transformer.value.setAttrs({
      enabledAnchors: ['top-center', 'middle-right', 'middle-left', 'bottom-center'],
      borderEnabled: true
    })
    await stage.value.off('mousedown touchstart mouseup touchend mousemove touchmove')
  }

  resize.value = !resize.value
}

const handleCleanDraw = () => {
  const strokes = layer.value.getChildren(function (node) {
    return node.getClassName() === 'Line'
  })

  forEach(strokes, (node) => {
    node.remove()
  })
}

const freeDraw = () => {
  stage.value.on('mousedown touchstart', function (e) {
    isPaint.value = true
    const pos = stage.value.getPointerPosition();
    lastLine.value = new Konva.Line({
      stroke: '#df4b26',
      strokeWidth: drawCanvas.line,
      globalCompositeOperation: 'source-over',
      lineCap: 'round',
      lineJoin: 'round',
      name: 'lineDraw',
      // add point twice, so we have some drawings even on a simple click
      points: [pos.x, pos.y, pos.x, pos.y],
    });
    layer.value.add(lastLine.value);
  });

  stage.value.on('mouseup touchend', function () {
    isPaint.value = false;
  })

  stage.value.on('mousemove touchmove', function (e) {
    if (!isPaint.value) {
      return;
    }

    // prevent scrolling on touch devices
    e.evt.preventDefault();

    const pos = stage.value.getPointerPosition();
    const newPoints = lastLine.value.points().concat([pos.x, pos.y]);
    lastLine.value.points(newPoints);
  })
}

onMounted(() => {
  stage.value = new Konva.Stage({
    container: 'out-painting-stage',
    width: canvas.width,
    height: canvas.height,
  })

  layer.value = new Konva.Layer()
  image.value = new Konva.Image({
    draggable: false
  })

  backgroundOutPainting.value = new Konva.Rect({
    fill: 'black',
  })

  mask.value = new Konva.Rect({
    name: 'mask',
    fill: 'black'
  })

  transformer.value = new Konva.Transformer({
    node: backgroundOutPainting.value,
    rotateEnabled: false,
    enabledAnchors: [],
    borderEnabled: false,
    boundBoxFunc: function (oldBoundBox, newBoundBox) {
      const {x, y, width, height} = newBoundBox
      if (
          y <= 15 ||
          x <= 15
          // x + width >= canvas.width - 15 ||
          // y + height >= canvas.height - 15
          // height <= imageUpload.height ||
          // width <= imageUpload.width ||
          // Math.abs(x + width) <= Math.abs(imageUpload.x + imageUpload.width) ||
          // Math.abs(y + height) <= Math.abs(imageUpload.y + imageUpload.height)
      ) return oldBoundBox
      return newBoundBox
    },
  })
  layer.value.add(backgroundOutPainting.value, image.value, transformer.value, mask.value)

  // const scaleBy = 1.01
  // stage.on('wheel', (e) => {
  //   e.evt.preventDefault();
  //
  //   const oldScale = stage.scaleX();
  //   const pointer = stage.getPointerPosition();
  //
  //   const mousePointTo = {
  //     x: (pointer.x - stage.x()) / oldScale,
  //     y: (pointer.y - stage.y()) / oldScale,
  //   };
  //
  //   let direction = e.evt.deltaY < 0 ? 1 : -1;
  //
  //   const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
  //   if (newScale < 1 &&  newScale > 0.5) {
  //     stage.scale({x: newScale, y: newScale});
  //     const newPos = {
  //       x: pointer.x - mousePointTo.x * newScale,
  //       y: pointer.y - mousePointTo.y * newScale,
  //     };
  //     stage.position(newPos);
  //   }
  // })

  freeDraw()

  stage.value.add(layer.value)
})
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

.form-upload {
  width: 100%;
  height: 352px;
  cursor: pointer;
  padding-bottom: 50px
}
</style>