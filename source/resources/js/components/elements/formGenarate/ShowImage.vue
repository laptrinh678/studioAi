<template>
  <div class="w-full" :style="{height: height}">
    <div class="img-binding w-full">
      <div
        v-if="!images"
        class="img-not-found w-full flex justify-center items-center h-full"
      >
        <el-icon :size="24" color="#1f2937"><Picture /></el-icon>
      </div>

      <el-image
        v-else
        :src="props.images[objIndex]"
        style="width: 100%; padding: 24px 0"
        :zoom-rate="1.2"
        :max-scale="4"
        :min-scale="0.2"
        :initial-index="4"
        fit="contain"
        hide-on-click-modal
        :preview-src-list="props.images"
      >
        <template #error>
          <div
            class="img-not-found w-full flex justify-center items-center h-full"
          >
            <el-icon :size="24" color="#1f2937"><Picture /></el-icon>
          </div>
        </template>
      </el-image>
      <div class="main_list_img position-relative">
        <!-- Chia sẻ hình ảnh, download, xóa ảnh -->
        <div class="action-images flex items-center justify-end" v-if="!props.isLoading && props.images.length">
<!--          <el-dropdown @visible-change="handleShowDropdown">-->
<!--            <el-button class="border-0 bg-transparent">-->
<!--              <upload-icon />-->
<!--            </el-button>-->
<!--            <template #dropdown>-->
<!--              <div class="d-flex gap-1 p-2">-->
<!--                <el-button class="border-0 p-2 h-100 entities-share"><facebook-icon /></el-button>-->
<!--                <el-tooltip-->
<!--                    class="box-item"-->
<!--                    effect="dark"-->
<!--                    placement="bottom"-->
<!--                    :enterable="false"-->
<!--                >-->
<!--                  <template #content>-->
<!--                    <div class="copy-link">{{ isCopied ? $t('common.copied') : $t('common.copy_to_clipboard')}}</div>-->
<!--                  </template>-->
<!--                  <el-button class="border-0 p-2 h-100 entities-share" @click="handleCopy">-->
<!--                    <check-icon v-if="isCopied"/>-->
<!--                    <link-icon v-else/>-->
<!--                  </el-button>-->
<!--                </el-tooltip>-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-dropdown>-->

          <el-button @click="handleDownloadImage" class="border-0 bg-transparent">
            <download-icon />
          </el-button>

          <el-popconfirm
              confirm-button-text="Yes"
              cancel-button-text="No"
              :icon="InfoFilled"
              icon-color="#626AEF"
              :title="$t('common.confirm_delete')"
              @confirm="handleRemoveCurrentImage"
              :width="300"
          >
            <template #reference>
              <el-button class="m-0 border-0 bg-transparent">
                <trash-icon />
              </el-button>
            </template>
          </el-popconfirm>
        </div>

        <!-- Chuyển hướng sang các chức năng khác -->
        <div v-if="props.images.length > 0" class="position-absolute redirect-feature">
          <el-button
              v-if="genImageVia !== 'image-to-image'"
              @click="redirectImage('image-to-image')"
              :title="$t('image_to_image.title')"
              class="border-0 bg-transparent">
            <image-to-image-icon  />
          </el-button>
          <el-button
              v-if="genImageVia !== 'in-painting'"
              @click="redirectImage('in-painting')"
              :title="$t('in_painting.title')"
              class="border-0 bg-transparent">
            <in-painting-icon />
          </el-button>
        </div>

        <div class="list_img_general">
          <div
            class="img_item"
            :class="{ active: key == objIndex }"
            v-for="(item, key) in props.images"
            :key="key"
            @click="changeIndex(key)"
          >
            <img :src="item" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watchEffect} from "vue";
import DownloadIcon from "~/components/icons/Download.vue"
import TrashIcon from "~/components/icons/Trash.vue"
import LinkIcon from "../../icons/Link.vue"
import FacebookIcon from "../../icons/Facebook.vue"
import UploadIcon from "../../icons/Upload.vue"
import CheckIcon from "../../icons/Check.vue"
import TextToImageIcon from "../../icons/TextToImage.vue"
import ImageToImageIcon from "../../icons/ImageToImage.vue"
import InPaintingIcon from "../../icons/InPainting.vue"
import SketchIcon from "../../icons/Sketch.vue"
import VirtualHumanService from "../../../services/VirtualHumanService";
import i18n from "../../../lang/i18n";
import {dataURItoFile} from "../../../helpers/ImageDetect";

const props = defineProps({
  images: [],
  isLoading: false,
  objIndex: 0,
  genImageVia: {
    type: String,
    default: "text-to-image"
  },
  height: {
    type: String,
    default: "75%"
  }
})
const emits = defineEmits(['changeIndex', 'redirectImage'])
const isCopied = ref(false)
const linkCopied = ref('')

const handleRemoveCurrentImage = () => {
  props.images.splice(0, 1);
};

const fakeArrImg = [
  "https://vcdn1-vnexpress.vnecdn.net/2022/01/29/A-nh-chu-p-Ma-n-hi-nh-2022-01-2886-4031-1643470228.png?w=460&h=0&q=100&dpr=2&fit=crop&s=4adOPqG2sbU_SEKOr5sWfQ",
  "https://kenh14cdn.com/2016/meo3-1471521215699.jpg",
  "https://kingspet.vn/wp-content/uploads/2021/02/1614337299_Cho-meo-con-an-gi-de-co-chiec-meo-beo.jpg",
];

const handleDownloadImage = () => {
  if (!props.images.length) return;

  const imageURL = props.images[props.objIndex];

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = "stable_image.jpg";
  link.style.display = "none";
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

const changeIndex = (index) => {
  emits('changeIndex', index)
};

const handleShowDropdown = (visible) => {
  if (visible) isCopied.value = false
}

const handleCopy = async () => {
  if (linkCopied.value !== '') {
    await navigator.clipboard.writeText(linkCopied.value)
    isCopied.value = true
    return
  }

  const blob = dataURItoFile(props.images[0])
  const file = new File([blob], 'file.png', { type: 'image/png' })
  const formData = new FormData()
  formData.append('image', file)
  const data = await VirtualHumanService.shareImage(formData)
  if (data.status === 200) {
    linkCopied.value = data.data.path
    await navigator.clipboard.writeText(data.data.path)
    isCopied.value = true
  }
}

const redirectImage = (name) => {
  emits('redirectImage', name)
}

watchEffect(() => {
  if (props.images) {
    linkCopied.value = '';
  }
})
</script>

<style lang="scss" scoped>
.copy-link {
  text-align: center;
  min-width: 120px;
  font-size: 15px;
  font-family: 'Verdana',serif;
}

.redirect-feature {
  left: 25%;
  transform: translateX(-50%);
  bottom: 10px;
}
</style>