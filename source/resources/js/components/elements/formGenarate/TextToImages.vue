<template>
  <div class="main-text-to-images">
    <div class="main-text-form">
      <div class="form-config">
        <div class="form-content flex w-full">
          <div class="w-full">
            <!-- Prompt -->
            <p class="form-title">{{ $t('common.form_config.title') }}</p>
            <div class="prompt-content">
              <div class="input-form" style="margin-bottom: 12px">
                <div class="label items-center flex align-items-center">
                  <div class="text">{{ $t('common.form_config.prompt_input') }}</div>
                </div>
                <el-input
                    v-model="promptRef"
                    maxlength="1000"
                    show-word-limit
                    :autosize="{ minRows: 2, maxRows: 8 }"
                    type="textarea"
                    :placeholder="$t('common.form_config.description_input')"
                />
                <el-checkbox v-model="openAI" :label="$t('common.form_config.openAI')" size="large" />
                <div v-if="isError" class="error">{{ promptErrorMessage }}</div>
              </div>
            </div>

            <!-- Form config -->
            <form-config @updateFormData="(val) => updateData(val)" />
            <el-button
              :disabled="isLoading || !permission"
              @click="onSubmit()"
              class="button_submit"
              id="submit-text-to-image"
              type="danger"
              >
              <template #default>
                <span id="title-submit-text-to-image">{{ $t('common.form_config.create_image') }}</span>
              </template>
            </el-button
            >
            <warning-permission v-if="!permission" />
          </div>

          <div class="w-full">
            <!-- Show Image -->
            <p class="form-title">{{ $t('common.form_config.result') }}</p>
            <div class="process-custom ml-12" v-if="isLoading">
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
            <show-image-vue
                :images="images"
                :isLoading="isLoading"
                :obj-index="objIndex"
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
import {computed, onMounted, ref} from "vue";
import formConfig from "./formConfig.vue";
import { decodeBase64, translateVnToEng } from "~/helpers/ImageDetect";
import ShowImageVue from "./ShowImage.vue";
import AiGenarate from "~/services/AiGenarate";
import {MAX_LENGTH_NON_PROMPT, MAX_LENGTH_PROMPT} from "../../../helpers/localStorage";
import WarningPermission from "~/components/common/WarningPermission.vue";
import {useToast} from "vue-toastification";
import i18n from "../../../lang/i18n";
import {dataURItoFile} from "../../../helpers/ImageDetect";
import {useStore} from "vuex";

const props = defineProps({
  permission: {
    type: Boolean,
    default: false
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
  lora_names: [],
});

const toast = useToast()
const promptRef = ref("");
const isError = ref(false);
const isLoading = ref(false);
const openAI = ref(false)
const percentage = ref(0);
const objIndex = ref(0);
const images = ref([]);
const storeStyleImage = ref("");
const storeMainColor = ref("");

const promptErrorMessage = ref("");

const isValidate = computed(() => {
  if (promptRef.value.trim().length === 0) {
    isError.value = true;
    promptErrorMessage.value = i18n.global.t('common.prompt_required')
    return false;
  }

  if (promptRef.value.length > MAX_LENGTH_PROMPT ||
      bodyData.value.negative_prompt.length > MAX_LENGTH_NON_PROMPT ||
      storeMainColor.value.length > MAX_LENGTH_NON_PROMPT
  ) {
    toast.error(i18n.global.t('common.text_too_long'))
    return false;
  }

  isError.value = false;
  return true;
});

const onSubmit = async () => {
  if (!isValidate.value) {
    return;
  }
  images.value = [];
  percentage.value = 0;
  isLoading.value = true;
  objIndex.value = 0

  if (
      !bodyData.value.prompt_styles[0] ||
      bodyData.value.prompt_styles[0] == "none"
  ) {
    bodyData.value.prompt_styles = [];
  }

  emits('onLoading', true)
  const formData = {
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

    const res = await AiGenarate.textToImages(formData);
    if (res.status === 200) {
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
    image_width: data.image_width,
    image_height: data.image_height,
    num_images: data.num_images,
    seed: data.seed,
    prompt_styles:
        data.prompt_styles == "none" || data.prompt_styles.value == "none"
            ? []
            : [data.prompt_styles],
    lora_names:
        data.lora_names == "none" || data.lora_names.value == "none"
            ? []
            : [data.lora_names],
  };
};

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
    type: 'text-to-image'
  }
  const blob = dataURItoFile(images.value[0])
  const file = new File([blob], 'file.png', { type: 'image/png' })
  const formData = new FormData()
  formData.append('image', file)
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
  if (dataGenerated && dataGenerated.type === 'text-to-image') {
    const form = JSON.parse(dataGenerated.attrs)
    promptRef.value = form.prompt
  }
})
</script>
<style lang="scss">
  .form-title {
    font-family: "FS Magistral Bold", sans-serif;
    letter-spacing: 0.04em;
    font-weight: 700;
    font-size: 16px;
    color: #ee0033;
    margin-bottom: 20px;
  }

  img {
    width: auto;
    height: 500px;
  }
</style>