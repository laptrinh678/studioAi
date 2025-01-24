<template>
  <div class="main-image-generate">
    <div class="main-text-form">
      <div class="row">
        <div class="wrapper">
          <div id="option-container" class="w-100" >
            <el-tabs v-model="activeName" tab-position="left" class="tab-vertical" >
              <el-tab-pane name="text-to-image" :disabled="isLoading">
                <template #label>
                  <text-to-image-icon />
                  <p class="option-title text-to-image">{{ $t('text_to_image.title') }}</p>
                </template>
                <text-to-images
                    :permission="permissionTextToImage"
                    @onLoading="updateStatus"
                    @redirect-feature="handleRedirect"
                />
              </el-tab-pane>

              <el-tab-pane name="image-to-image" :disabled="isLoading">
                <template #label>
                  <image-to-image-icon />
                  <p class="option-title image-to-image" >{{ $t('image_to_image.title') }}</p>
                </template>
                <image-to-images
                    ref="imageToImageRef"
                    :permission="permissionImageToImage"
                    @onLoading="updateStatus"
                    @redirect-feature="handleRedirect"
                />
              </el-tab-pane>

              <el-tab-pane name="sketch" :disabled="isLoading">
                <template #label>
                  <sketch-icon />
                  <p class="option-title sketch" >{{ $t('sketch.title') }}</p>
                </template>
                <sketch
                    :permission="permissionImageToImage"
                    @onLoading="updateStatus"
                    @redirect-feature="handleRedirect"
                />
              </el-tab-pane>

              <el-tab-pane name="in-painting" :disabled="isLoading">
                <template #label>
                  <in-painting-icon />
                  <p class="option-title in-painting" >{{ $t('in_painting.title') }}</p>
                </template>
                <in-painting
                    ref="inPaintingRef"
                    :permission="permissionImageToImage"
                    @onLoading="updateStatus"
                    @redirect-feature="handleRedirect"
                />
              </el-tab-pane>

              <el-tab-pane name="out-painting" :disabled="isLoading">
                <template #label>
                  <p class="option-title in-painting" >Out painting</p>
                </template>
                <out-painting
                    :permission="permissionImageToImage"
                    @onLoading="updateStatus"
                    @redirect-feature="handleRedirect"
                />
              </el-tab-pane>

<!--              <el-tab-pane name="scale-image" :lazy="true" :disabled="isLoading">-->
<!--                <template #label>-->
<!--                  <scale-image-icon />-->
<!--                  <p class="option-title scale-image" >{{ $t('scale_image.title') }}</p>-->
<!--                </template>-->
<!--                <scale-up-image :permission="permissionImageToImage" @onLoading="updateStatus"/>-->
<!--              </el-tab-pane>-->
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TextToImages from "./TextToImages.vue"
import ImageToImages from "./ImageToImages.vue"
import InPainting from "./InPainting.vue"
import Sketch from "./Sketch.vue"
import ScaleUpImage from "./ScaleUpImage.vue"
import OutPainting from "./OutPainting.vue";
import TextToImageIcon from "../../icons/TextToImage.vue"
import ImageToImageIcon from "../../icons/ImageToImage.vue"
import InPaintingIcon from "../../icons/InPainting.vue"
import SketchIcon from "../../icons/Sketch.vue"
import ScaleImageIcon from "../../icons/ScaleImage.vue"
import {onMounted, reactive, ref} from "vue"
import {useStore} from "vuex";

const props = defineProps({
  permissionTextToImage: {
    type: Boolean,
    default: false
  },
  permissionImageToImage: {
    type: Boolean,
    default: false
  }
})
const store = useStore()
const isLoading = ref(false)
const activeName = ref('text-to-image')
const imageToImageRef = ref()
const inPaintingRef = ref()
const featureGenerate = ['text-to-image', 'image-to-image', 'sketch', 'in-painting', 'out-painting']

const updateStatus = (value) => {
  isLoading.value = value
}

const handleRedirect = (data) => {
  if (data.feature === 'image-to-image') {
    imageToImageRef.value.getImageViaGenerator(data)
  }

  if (data.feature === 'in-painting') {
    inPaintingRef.value.getImageViaGenerator(data)
  }
  activeName.value = data.feature
}

onMounted(() => {
  const dataGenerated = store.getters.result_generated
  // localStorage.setItem('in-painting', JSON.stringify(dataGenerated))
  if (dataGenerated && featureGenerate.includes(dataGenerated.type)) {
    activeName.value = dataGenerated.type
  }
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
  width: 24px;
  height: auto;
  object-fit: contain;
}

#count-time-record {
  display: flex;
  font-weight: bold;
  font-size: 20px;
  margin-left: 20px;
}
</style>