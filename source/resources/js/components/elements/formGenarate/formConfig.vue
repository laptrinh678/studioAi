<template>
  <div>
    <!-- Form ratio option -->
<!--    <el-radio-group v-model="ratioOption" size="large" class="form-group-ratio">-->
<!--      <el-radio-button label="1x1">-->
<!--        <template #default>-->
<!--          <div class="d-flex flex-column gap-1 align-items-center">-->
<!--            <ratio1x1/>-->
<!--            <div>1:1</div>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-radio-button>-->
<!--      <el-radio-button label="16x9">-->
<!--        <template #default>-->
<!--          <div class="d-flex flex-column gap-1 align-items-center">-->
<!--            <ratio16x9/>-->
<!--            <div>16:9</div>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-radio-button>-->
<!--      <el-radio-button label="9x16">-->
<!--        <template #default>-->
<!--          <div class="d-flex flex-column gap-1 align-items-center">-->
<!--            <ratio9x16/>-->
<!--            <div>9:16</div>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-radio-button>-->
<!--      <el-radio-button label="Chicago">-->
<!--        <template #default>-->
<!--          <div class="d-flex flex-column gap-1 align-items-center">-->
<!--            <ratio3x4/>-->
<!--            <div>3:4</div>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-radio-button>-->
<!--      <el-radio-button label="Chicago1">-->
<!--        <template #default>-->
<!--          <div class="d-flex flex-column gap-1 align-items-center">-->
<!--            <ratio4x3/>-->
<!--            <div>4:3  </div>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-radio-button>-->
<!--    </el-radio-group>-->

    <div class="flex justify-between items-center w-full gap-24">
      <div class="w-full">
        <select-option
          :title="$t('common.form_config.num_images')"
          :model="bodyData.num_images"
          :options="bodyData.image_number_option"
          @update:model="(val) => updateNumImages(val)"
        />
      </div>
      <div class="w-full">
        <select-option
            :title="$t('common.form_config.guidance_scale')"
            :hint-message="$t('common.hint.guidance_scale')"
          :model="bodyData.guidance_scale"
          :options="guidanceScale"
          @update:model="(val) => updateGyudanceScale(val)"
        />
      </div>
    </div>

    <div class="flex justify-between items-center gap-24">
      <div class="w-full">
        <select-option
            :title="$t('common.form_config.seed')"
            :hint-message="$t('common.hint.seed')"
            :model="bodyData.seed"
            :options="diversity"
            @update:model="(val) => updateSeed(val)"
        />
      </div>
      <div class="w-full">
        <select-option
            :title="$t('common.form_config.prompt_style')"
            :hint-message="$t('common.hint.prompt_style')"
            :model="bodyData.prompt_styles"
            :options="promptStyleOption"
            @update:model="(val) => updateStyles(val)"
        />
      </div>
    </div>

    <div class="flex justify-between items-center gap-24">
      <div class="w-full">
        <select-option
            v-if="isTextToImage"
            :title="$t('common.form_config.image_size')"
            :model="bodyData.image_size"
            :options="imageSize"
            @update:model="(val) => updateImageSize(val)"
        />
      </div>
      <div class="w-full">
<!--        <select-option-->
<!--            title="Loại ảnh"-->
<!--            :model="bodyData.lora_names"-->
<!--            :options="lora"-->
<!--            @update:model="(val) => updateLora(val)"-->
<!--        />-->
      </div>
    </div>

    <div
      class="w-full flex justify-between items-center gap-24"
    >
      <div class="w-full select-option">
        <div class="flex align-items-center">
          <p>{{ $t('common.form_config.main_color') }}</p>
          <div style="margin-left: 4px"><hint :message="$t('common.hint.main_color')" /></div>
        </div>
        <el-input
            v-model="mainColor"
            style="width: 100%;"
            :placeholder="$t('common.form_config.description_main_color')"
            size="large"
            maxlength="100"
            show-word-limit
            @input="() => updateMainColor()"
        />
      </div>
      <!-- <div class="w-full" v-if="$props.isToImage">
        <select-option
          title="Mức độ đa dạng so với ảnh gốc"
          :model="strength"
          :options="strengthOption"
          @update:model="(val) => updateStrength(val)"
        />
      </div> -->
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import SelectOption from "../../common/SelectOption.vue";
import Hint from "../../common/Hint.vue"
import {controlModeOption, oneImageOption} from "../../../helpers/constant";

import {
  imageNumber,
  diversity,
  guidanceScale,
  imageSize,
  defaultOption,
  strengthOption,
  optionTypePrompt,
  twoImageOption,
  imageNumberBySize
} from "~/helpers/constant";
import { extractFloat } from "~/helpers/utils";
import { useStore } from "vuex";
import lora from '~home/lora.json'
import Ratio1x1 from "../../icons/Ratio1x1.vue";
import Ratio16x9 from "../../icons/Ratio16x9.vue";
import Ratio9x16 from "../../icons/Ratio9x16.vue";
import Ratio3x4 from "../../icons/Ratio3x4.vue";
import Ratio4x3 from "../../icons/Ratio4x3.vue";

export default {
  components: {Ratio4x3, Ratio3x4, Ratio9x16, Ratio16x9, Ratio1x1, SelectOption, Hint },
  props: {
    isToImage: false,
    isTextToImage: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const bodyData = ref({
      num_images: imageNumber[0].value,
      guidance_scale: guidanceScale[1].value,
      image_size: imageSize[0].value, //image_width, image_height
      image_width: 1024,
      image_height: 1024,
      seed: diversity[1].value,
      prompt_styles: optionTypePrompt[0].value,
      lora_names: lora[0].value,
      image_number_option: props.isTextToImage ? twoImageOption : oneImageOption,
      control_mode: controlModeOption[0].value
    });

    const strength = ref(strengthOption[0].value);
    const typeImage = ref(optionTypePrompt[0].value);
    const mainColor = ref("");
    const ratioOption = ref("New York")

    const updateMainColor = () => {
      bodyData.value["mainColor"] = mainColor.value
      emit("update-form-data", bodyData.value);
    }

    const updateLora = (newValue) => {
      if (!newValue || newValue == "none") {
        bodyData.value = { ...bodyData.value, lora_names: defaultOption };
      } else {
        bodyData.value = { ...bodyData.value, lora_names: newValue };
      }
      emit("update-form-data", bodyData.value);
    }

    const updatetypeImage = (newValue) => {
      bodyData.value["imageType"] = newValue
      emit("update-form-data", bodyData.value);
    }

    const updateStrength = (newValue) => {
      bodyData.value["strength"] = extractFloat(newValue);
      emit("update-form-data", bodyData.value);
    };

    const updateNumImages = (newValue) => {
      bodyData.value = { ...bodyData.value, num_images: newValue };
      emit("update-form-data", bodyData.value);
    };
    // updateGyudanceScale
    const updateGyudanceScale = (newValue) => {
      bodyData.value = {
        ...bodyData.value,
        guidance_scale: extractFloat(newValue),
      };
      emit("update-form-data", bodyData.value);
    };
    // updateImageSize
    const updateImageSize = (newValue) => {
      bodyData.value.image_number_option = imageNumberBySize[newValue]
      bodyData.value.num_images = imageNumber[0].value

      const sizeConvert = newValue.split("x");
      const image_width_convert = parseInt(sizeConvert[0]);
      const image_height = parseInt(sizeConvert[1]);
      bodyData.value = {
        ...bodyData.value,
        image_width: image_width_convert,
        image_height: image_height,
        image_size: newValue,
      };
      emit("update-form-data", bodyData.value);
    };
    // updateStyles
    const updateStyles = (newValue) => {
      if (!newValue || newValue == "none") {
        bodyData.value = { ...bodyData.value, prompt_styles: optionTypePrompt[0].value };
      } else {
        bodyData.value = { ...bodyData.value, prompt_styles: newValue };
      }
      emit("update-form-data", bodyData.value);
    };
    // updateSeed 
    const updateSeed = (newValue) => {
      bodyData.value = { ...bodyData.value, seed: newValue };
      emit("update-form-data", bodyData.value);
    };

    const updateControlMode = (value) => {
      bodyData.value = { ...bodyData.value, control_mode: value }
      emit("update-form-data", bodyData.value)
    }

    const promptStyleOption = computed(() => store.getters["prompt_styles"]);

    return {
      promptStyleOption,
      updateNumImages,
      imageNumber,
      diversity,
      guidanceScale,
      imageSize,
      updateSeed,
      updateStyles,
      updateGyudanceScale,
      updateImageSize,
      bodyData,
      strengthOption,
      updateStrength,
      strength,
      optionTypePrompt,
      typeImage,
      mainColor,
      updateMainColor,
      updatetypeImage,
      lora,
      updateLora,
      controlModeOption,
      updateControlMode,
      ratioOption
    };
  },
};
</script>