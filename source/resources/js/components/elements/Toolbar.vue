<template>
  <div id="font-family-toolbar" class="d-flex justify-content-center" style="gap: 16px">
    <!-- Undo and Redo -->
<!--    <div class="d-flex" style="gap: 4px">-->
<!--      <el-button>-->
<!--        <undo-icon width="20px" height="20px" type="line" />-->
<!--      </el-button>-->
<!--      <el-button>-->
<!--        <redo-icon />-->
<!--      </el-button>-->
<!--    </div>-->

    <!-- Play Audio -->
    <div>
      <el-button @click="playAudio()" :style="contentComponent.content ? 'background-color: #8f99a84d' : ''">
        <play-audio-icon />
      </el-button>
    </div>

    <!-- Font Family -->
    <div v-show="editText">
      <el-select v-model="fontFamily" placeholder="Chọn phông chữ" style="width: 150px" class="test" @change="changeFontFamily">
        <el-option
            v-for="(item, index) in options.fonts"
            :class="`font-${item.value}`"
            :key="index"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </div>

    <!-- Font Size -->
    <div v-show="editText">
      <el-input
          v-model="fontSize"
          :min="8"
          :max="144"
          style="width: 60px;"
          type="number"
          @change="changeFontSize"
          @keydown="blockKeys"
      />
    </div>

    <!-- Align -->
<!--    <el-button @click="emits('changeAlign')">-->
<!--      <align-left-icon v-if="align === 0" />-->
<!--      <align-center-icon v-if="align === 1" />-->
<!--      <align-right-icon v-if="align === 2" />-->
<!--    </el-button>-->

    <div class="d-flex" style="gap: 8px" v-if="editText">
      <!-- Color -->
      <el-button class="p-0">
        <el-color-picker v-model="color" show-alpha :predefine="options.colors" @change="changeColor"/>
      </el-button>

      <!-- Font Style -->
      <el-button @click="changeFontStyle('bold')" :style="bold ? 'background-color: #8f99a84d' : ''">
        <bold />
      </el-button>
      <el-button @click="changeFontStyle('italic')" :style="italic ? 'background-color: #8f99a84d' : ''">
        <italic />
      </el-button>
      <el-button @click="changeFontStyle('underline')" :style="underline ? 'background-color: #8f99a84d' : ''">
        <underline />
      </el-button>
<!--      <el-button @click="changeFontStyle('strike')" :style="strike ? 'background-color: #8f99a84d' : ''">-->
<!--        <strike-through />-->
<!--      </el-button>-->
    </div>
  </div>
</template>

<script setup>
import AlignLeftIcon from '../icons/AlignLeft.vue'
import AlignRightIcon from '../icons/AlignRight.vue'
import AlignCenterIcon from '../icons/AlignCenter.vue'
import Bold from '../icons/Bold.vue'
import Italic from '../icons/Italic.vue'
import Underline from '../icons/Underline.vue'
import StrikeThrough from '../icons/Strikethrough.vue'
import UndoIcon from "../icons/Undo.vue";
import RedoIcon from "../icons/Redo.vue";
import {onMounted, reactive, ref} from "vue";
import {useEventsBus} from "../../helpers/eventBus";
import PlayAudioIcon from "../icons/PlayAudio.vue";
import VirtualHumanService from "../../services/VirtualHumanService";
import {ACCESS_TOKEN} from "../../helpers/localStorage";

const eventBus = useEventsBus()
const props = defineProps({
  align: {
    // 0 => left, 1 => center, 2 => right
    type: Number,
    default: 0
  },
  fontSize: {
    type: Number,
    default: 24
  },
  fontFamily: {
    type: String,
    default: "arial"
  },
  bold: {
    type: Boolean,
    default: false
  },
  italic: {
    type: Boolean,
    default: false
  },
  underline: {
    type: Boolean,
    default: false
  },
  strike: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'rgba(0, 0, 0, 1)'
  }
})
const audioPlay = ref(null)
const contentComponent = reactive({
  content: null,
  contentType: null,
  voice: null
})
const options = reactive({
  colors: [
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
  ],
  fonts: [
    {label: "Arial", value: "arial"},
    {label: "Monospace", value: "monospace"},
    {label: "Serif", value: "serif"}
  ]
})
const emits = defineEmits([
    'changeFontSize',
    'changeFontStyle',
    'changeFontFamily',
    'changeAlign',
    'changeColor'
])
const editText = ref(false)

const changeFontStyle = (type) => {
  emits('changeFontStyle', type)
}

const changeFontSize = (size) => {
  if (size < 8) emits('changeFontSize', 8)
  else if (size > 144) emits('changeFontSize', 144)
  else emits('changeFontSize', size)
}

const blockKeys = (ev) => {
  if (['Space', 'Minus', 'Period'].includes(ev.code)) ev.preventDefault()
}

const changeFontFamily = (fontFamily) => {
  console.log(fontFamily)
  emits('changeFontFamily', fontFamily)
}

const playAudio = async () => {
  console.log('content: ' + contentComponent.content)
  console.log('content type: ' + contentComponent.contentType)
  // Dừng audio đang phát khi người dùng thực hiện apply nội dung mới
  if (audioPlay.value !== null) await audioPlay.value.pause()

  if (contentComponent.content) {
    if (contentComponent.contentType === 'message') {
      const formData = new FormData()
      formData.append('text', contentComponent.content)
      formData.append('voice', contentComponent.voice)

      await fetch('/api/text-to-speech', {
        method: 'post',
        headers: new Headers({
          'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          text: contentComponent.content,
          voice: contentComponent.voice
        })
      }).then(response => response.blob())
          .then(blob => {
            const audioUrl = URL.createObjectURL(blob);
            audioPlay.value = new Audio(audioUrl)
            audioPlay.value.play()
          })
    } else {
      const audioUrl = URL.createObjectURL(contentComponent.content)
      audioPlay.value = new Audio(audioUrl)
      await audioPlay.value.play()
    }
  }
}

const applyVoiceContent = async (content, contentType, voice) => {
  contentComponent.content = content
  contentComponent.contentType = contentType
  contentComponent.voice = voice

  // Dừng audio đang phát khi người dùng thực hiện apply nội dung mới
  if (audioPlay.value !== null) await audioPlay.value.pause()
}

const clearData = async () => {
  contentComponent.content = null
  contentComponent.contentType = null
  contentComponent.voice = null
}

const changeColor = (color) => {
  emits('changeColor', color)
}

onMounted(() => {
  eventBus.on('changeToText', (name) => {
    editText.value = name === 'text';
  })

  eventBus.on('applyVoiceContent', (props) => {
    applyVoiceContent(props.content, props.contentType, props.voice)
  })

  eventBus.on('selectProject', (item) => {
    clearData()
  })

})
</script>

<style scoped lang="scss">
  .el-button {
    border: 0;
    padding: 8px;
    margin-left: 0;
    font-family: monospace;
  }
</style>