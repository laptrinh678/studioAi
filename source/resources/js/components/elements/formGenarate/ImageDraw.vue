<script setup>
import PaintBrushIcon from "../../icons/PaintBrush.vue";
import EraserIcon from "../../icons/Eraser.vue";
import TrashIcon from "../../icons/Trash.vue";
import ImageIcon from "../../icons/Image.vue";
import UndoIcon from "../../icons/Undo.vue";
import VueDrawingCanvas from "vue-drawing-canvas";
import {reactive, ref, watch} from "vue";
import {convertToImage, validFile, isInValidFileSize} from "../../../helpers/ImageDetect";
import {MAX_SIZE_IN_PAINTING} from "../../../constants/constant";

const props = defineProps({
  isInPain: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})
const initialImage = ref([]);
const x = ref(0);
const y = ref(0);
const image = ref("");
const eraser = ref(false);
const disabled = ref(false);
const fillShape = ref(false);
const line = ref(5);
const color = ref("#000000");
const strokeType = ref("dash");
const lineCap = ref("round");
const lineJoin = ref("round");
const backgroundColor = ref("#FFFFFF");
const backgroundImage = ref(null);
const watermark = ref(null);
const additionalImages = ref([]);
const VueCanvasDrawing = ref();
// const isInPain = ref(false);
const baseFile = ref();
const isUpload = ref(false);
const upload = ref();
const canvas = reactive({
  width: 354,
  height: 315
})

const isError = ref(false);
const isFileValid = ref(false);
const isInvalidResolution = ref(false)
import i18n from "../../../lang/i18n"

const emit = defineEmits(["changeImage", "changeResolution", "removeImage", "errorImage"]);

const handleRemoveDrawImage = () => {
  baseFile.value = undefined
  image.value = ""
  VueCanvasDrawing.value.reset();
  isUpload.value = false;
  isError.value = false;
  isFileValid.value = false;
  isInvalidResolution.value = false;
  emit("removeImage")
};

// Watch images if it change do emit\
watch(
    () => image.value,
    () => {
      if (props.isInPain) {
        const mask = convertToImage(
            JSON.stringify(VueCanvasDrawing.value.getAllStrokes()), canvas.width, canvas.height
        );
        emit("changeImage", { currentImage: baseFile.value, mask });
      } else {
        emit("changeImage", { currentImage: baseFile.value });
      }
    }
);

const getCoordinate = (event) => {
  const coordinates = VueCanvasDrawing.value.getCoordinates(event);
  x.value = coordinates.x;
  y.value = coordinates.y;
};

const checkUpload = async (uploadFile, uploadFiles) => {
  isFileValid.value = false;
  isInvalidResolution.value = false;

  // Kiểm tra file ảnh (.png, .jpg, .jpeg)
  if (!validFile(uploadFile.raw.name)) {
    emit('errorImage', i18n.global.t('mc_scene.image_asset.validate.file_format'))
    isError.value = true;
    isFileValid.value = true;
    upload.value.clearFiles();
    return;
  }

  // Kiểm tra kích thước ảnh
  if (await isInValidFileSize(uploadFile.raw, MAX_SIZE_IN_PAINTING)) {
    isError.value = true;
    emit('errorImage', i18n.global.t('common.limit_resolution', {width: MAX_SIZE_IN_PAINTING.width, height: MAX_SIZE_IN_PAINTING.height}))
    isInvalidResolution.value = true;
    upload.value.clearFiles();
    return;
  }

  isError.value = false;
  const URL = window.URL;
  await setSizeCanvas(URL.createObjectURL(uploadFile.raw))
  baseFile.value = uploadFile.raw;
  backgroundImage.value = URL.createObjectURL(uploadFile.raw);
  emit("onBaseImage", baseFile.value);
  await VueCanvasDrawing.value.redraw();
  isUpload.value = true;
};

const setSizeCanvas = (imageDataUrl) => {
  const img = new Image();
  img.src = imageDataUrl;
  img.onload = () => {
    canvas.width = img.width * canvas.height / img.height
    emit('changeResolution', {width: img.width, height: img.height})
  };
}

const chooseLine = ref(false);
</script>

<template>
  <div>
    <div class="w-full">
      <div class="source w-full">
        <vue-drawing-canvas
            v-show="isUpload"
            ref="VueCanvasDrawing"
            v-model:image="image"
            :width="canvas.width"
            :height="canvas.height"
            :stroke-type="strokeType"
            :line-cap="lineCap"
            :line-join="lineJoin"
            :fill-shape="fillShape"
            :eraser="eraser"
            :lineWidth="line"
            :color="color"
            :background-color="backgroundColor"
            :background-image="backgroundImage"
            :watermark="watermark"
            :initial-image="initialImage"
            saveAs="png"
            :lock="!isInPain"
            @mousemove="getCoordinate($event)"
            :additional-images="additionalImages"
        />

        <div
            v-if="!isUpload"
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
              <div><image-icon /></div>
              <div id="description-upload">{{ $t('common.form_config.upload_image') }}</div>
            </div>
          </el-upload>
        </div>
        <div
            class="flex justify-center items-center action-draw"
            v-if="isUpload"
        >

          <div class="button-container" v-if="isInPain">
            <el-button @click.prevent="VueCanvasDrawing.reset()" :disabled="isLoading">
              <eraser-icon />
            </el-button>
          </div>

          <!-- Row draw -->
          <div class="button-container" style="flex-wrap: wrap" v-if="isInPain">
            <el-button @click="chooseLine = !chooseLine" :disabled="isLoading">
              <paint-brush-icon />
            </el-button>
            <div class="choose_line" v-show="chooseLine">
              <input type="range" :min="1" :max="25" v-model="line" />
            </div>
          </div>

          <!-- Row rest -->
          <div class="button-container" v-if="isInPain">
            <el-button @click.prevent="VueCanvasDrawing.undo()" :disabled="isLoading">
              <undo-icon />
            </el-button>

            <!-- <el-button @click.prevent="VueCanvasDrawing.redo()">
              <el-icon><RefreshRight /></el-icon>
            </el-button> -->
          </div>

          <!-- Delete draw -->
          <div class="button-container">
            <el-button
                v-if="isUpload"
                @click="handleRemoveDrawImage"
                :disabled="isLoading"
            >
              <trash-icon />
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    right: 0%;
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