<template>
  <div class="d-flex flex-column" style="gap: 12px">
    <div class="w-100">
      <div class="option-title">{{ $t('mc_scene.content.list') }}</div>
    </div>

    <div class="w-100">
      <div class="main-container">
        <div class="prompt-content">
          <div class="input-form">
            <el-radio-group
                v-model="contentType"
                @change="handleChange"
                style="max-height: 310px; overflow-y: auto">
              <el-radio label="message" class="font-weight-bold">{{ $t('common.content_type[0]') }}</el-radio>
              <el-radio label="file" class="font-weight-bold">{{ $t('common.content_type[1]') }}</el-radio>
              <el-radio label="record" class="font-weight-bold">{{ $t('common.content_type[2]') }}</el-radio>
            </el-radio-group>
          </div>
        </div>

        <!-- Nhập văn bản -->
        <div class="prompt-content voice-content d-flex" v-if="contentType === 'message'">
          <div class="input-form">
            <div class="label title">
              <span>{{ $t('mc_scene.content.content_input') }}</span>
            </div>
            <el-input
                v-model="messageRef"
                :autosize="{ minRows: 4, maxRows: 8 }"
                maxlength="500"
                show-word-limit
                type="textarea"
                :placeholder="$t('common.form_config.description_input')"
                @change="handleChangeText"
                @paste="handlePasteText"
            />
            <el-button type="danger" @click="dialogForm.visible = true">
              <sound-icon />
              {{ $t('mc_scene.content.voice') }}
            </el-button>
            <span v-if="isError" class="error">{{ errorMessage }}</span>
          </div>

          <el-dialog v-model="dialogForm.visible" :title="$t('common.form_config.sound_input').toUpperCase()" width="550" class="voice-dialog" @closed="closeDialog">
            <el-form>
              <el-tabs v-model="regionName" class="demo-tabs" @tab-click="changeTab">
                <el-tab-pane :label="$t(`common.region.${item.region_name}`)" :name="item.region" v-for="item in voice">
                  <el-radio-group v-model="nameVoice">
                    <el-radio size="large" border :label="voice.code" v-for="voice in item.entities">{{ voice.name }}</el-radio>
                  </el-radio-group>
                </el-tab-pane>
              </el-tabs>
            </el-form>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogForm.visible = false" class="button-cancel">{{ $t('common.cancel').toUpperCase() }}</el-button>
                <el-button @click="submitDialogForm" class="button-submit">{{ $t('mc_scene.content.apply') }}</el-button>
              </div>
            </template>
          </el-dialog>
        </div>

        <!-- Upload file âm thanh -->
        <div class="prompt-content voice-content" v-if="contentType === 'file'">
          <div class="input-form">
            <div class="label title">
              <span>{{ $t('common.form_config.upload_voice').toUpperCase() }}</span>
            </div>
            <el-upload
                v-model:file-list="audioFile"
                ref="upload"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                accept=".mp3"
                :auto-upload="false"
                :limit="1"
                :on-exceed="checkUpload"
                :on-change="onChaneFile"
            >
              <div class="el-upload__text">
                <el-button :type="'primary'">Click to upload</el-button>
              </div>
              <template #tip>
                <div class="el-upload__tip">{{ $t('common.upload_file_mp3') }}</div>
              </template>
            </el-upload>
            <span v-if="isError" class="error">{{ errorMessage }}</span>
          </div>
        </div>

        <!-- Ghi âm -->
        <div class="prompt-content voice-content d-flex" v-if="contentType === 'record'">
          <div class="input-form">
            <div class="label title">
              <span>{{ $t('common.form_config.record').toUpperCase() }}</span>
            </div>
            <div class="d-flex flex-column" style="gap: 15px">
              <div class="d-flex flex-wrap gap-3">
                <el-button @click="startBtn" :disabled="isStartRecord">{{ $t('common.form_config.start_record') }}</el-button>
                <el-button @click="stopBtn" :disabled="!isStartRecord" style="margin: 0">{{ $t('common.form_config.end_record') }}</el-button>
              </div>
              <div>
                <div class="d-flex" v-if="isStartRecord" id="count-time-record">
                  <div>{{ countTimeRecord.hour.toString().padStart(2, '0') }}</div>
                  <div>:</div>
                  <div>{{ countTimeRecord.minute.toString().padStart(2, '0') }}</div>
                  <div>:</div>
                  <div>{{ countTimeRecord.second.toString().padStart(2, '0') }}</div>
                </div>
                <div v-show="!isStartRecord">
                  <audio class="w-100" id="audioPlayback" controls :src="audioPlay"></audio>
                </div>
              </div>
            </div>
            <span v-if="isError" class="error">{{ errorMessage }}</span>
          </div>
        </div>

        <div class="prompt-content text-center">
          <el-button type="success" class="btn-play-audio" @click="applyContent">{{ $t('mc_scene.content.apply') }}</el-button>
        </div>
<!--        <div class="content-container">-->
<!--          <el-upload-->
<!--              ref="upload"-->
<!--              drag-->
<!--              action="https://jsonplaceholder.typicode.com/posts/"-->
<!--              :auto-upload="false"-->
<!--              :limit="1"-->
<!--              :on-change="checkUpload"-->
<!--          >-->
<!--            <div class="el-upload__text d-flew flex-column">-->
<!--              <div>-->
<!--                <image-icon/>-->
<!--              </div>-->
<!--              <div id="description-upload">-->
<!--                <p class="m-0">Kéo thả file <span>(.png, .jpg, .mp4)</span> hoặc</p>-->
<!--                <p class="m-0" style="color: #ee0033; text-decoration: underline">click tải file</p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-upload>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script setup>
import SoundIcon from "../../icons/Sound.vue";
import {onMounted, reactive, ref} from "vue";
import {useToast} from "vue-toastification";
import {ACTION_SET_CONTENT, ACTION_SET_CONTENT_TYPE, ACTION_SET_VOICE_CONTENT} from "../../../store/scenes/action";
import {useStore} from "vuex";
import {useEventsBus} from "../../../helpers/eventBus";
import state from "../../../store/scenes/index"
import {findIndex} from "lodash";
import voice from "../../../../../voice.json"
import i18n from "../../../lang/i18n"

const dialogForm = reactive({
  duration: 1,
  sceneIndex: null,
  visible: false
})
const duration = ref(1)
const countTimeRecord = ref({
  hour: 0,
  minute: 0,
  second: 0
})
const stateIndex = ref(null)
const messageRef = ref('')
const audioFile = ref([])
const isError = ref(false)
const errorMessage = ref("")
const isStartRecord = ref(false)
const contentType = ref("message")
const recordFile = ref(null)
const toast = useToast()
const store = useStore()
let mediaRecorder
let audioChunks = []
const audioPlay = ref(null)
const eventBus = useEventsBus()

const regionName = ref('norther')
const nameVoice = ref(voice[0].entities[0].code)
const regionNameActive = ref('')
const nameVoiceActive = ref('')

const changeTab = (tab) => {
  const name = tab.paneName
  if (name === 'norther') nameVoice.value = voice[0].entities[0].code
  else if (name === 'central') nameVoice.value = voice[1].entities[0].code
  else nameVoice.value = voice[2].entities[0].code
}

const closeDialog = () => {
  regionName.value = regionNameActive.value !== '' ? regionNameActive.value : 'norther'
  nameVoice.value = nameVoiceActive.value !== '' ? nameVoiceActive.value : voice[0].entities[0].code
}

const submitDialogForm = () => {
  regionNameActive.value = regionName.value
  nameVoiceActive.value = nameVoice.value
  dialogForm.visible = false

  // Lưu giọng đọc
  store.dispatch(ACTION_SET_VOICE_CONTENT, {
    voiceRegion: regionNameActive.value,
    voiceContent: nameVoiceActive.value
  })
}

const handleChange = () => {
  isError.value = false
  // store.dispatch(ACTION_SET_CONTENT_TYPE, contentType.value)
}

const startBtn = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    startRecording(stream)
  } catch (err) {
    toast.error(i18n.global.t('common.no_micro_device'))
    console.error('Error accessing microphone', err)
  }
}

const startRecording = (stream) => {
  toast.success(i18n.global.t('common.form_config.start_record'))
  let timeRecord = setInterval(() => {
    countTimeRecord.value.second += 1
    if (countTimeRecord.value.second === 60) {
      countTimeRecord.value.second = 0
      countTimeRecord.value.minute += 1
    }

    if (countTimeRecord.value.minute === 60) {
      countTimeRecord.value.minute = 0
      countTimeRecord.value.hour += 1
    }
  }, 1000)

  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.onstart = () => {
    audioChunks = []
    isStartRecord.value = true
  }
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      audioChunks.push(event.data)
    }
  }
  mediaRecorder.onstop = () => {
    toast.success(i18n.global.t('common.form_config.end_record'))
    clearInterval(timeRecord)
    countTimeRecord.value.second = 0
    countTimeRecord.value.minute = 0
    countTimeRecord.value.hour = 0

    const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' })
    recordFile.value = new File([audioBlob], "virtual_speaker", {type: "audio/mpeg"})
    audioPlay.value = URL.createObjectURL(audioBlob)
    // document.getElementById("audioPlayback").src = URL.createObjectURL(audioBlob)
    // store.dispatch(ACTION_SET_CONTENT, recordFile.value)

    isStartRecord.value = false
  }
  mediaRecorder.start()
}

const stopBtn = () => {
  if (mediaRecorder) {
    mediaRecorder.stop()
  }
}

const checkUpload = async (uploadFile, uploadFiles) => {
  audioFile.value[0] = null
  audioFile.value[0] = uploadFile[0]
  // await store.dispatch(ACTION_SET_CONTENT, audioFile.value[0])
}

const onChaneFile = async (uploadFile, uploadFiles) => {
  audioFile.value[0] = await uploadFile.raw
  // await store.dispatch(ACTION_SET_CONTENT, audioFile.value[0])
}

const handleChangeText = (text) => {
  // Trung bình đọc 260 từ / phút
  const normalizeSpaces = text.replace(/\s+/g, ' ')
  const wps = normalizeSpaces.split(" ").length / (260 / 60)

  console.log(normalizeSpaces.split(" "))
  console.log(wps.toFixed(2))
  // store.dispatch(ACTION_SET_CONTENT, text)
}

const handlePasteText = (text) => {
  messageRef.value = messageRef.value.replace(/[\r\n]+/gm, ' ').trim()
}

const setData = async (sceneId) => {
  await clearData()

  const index = findIndex(state.state, e => e.id === sceneId)
  const content = state.state[index].content
  contentType.value = state.state[index].contentType
  stateIndex.value = index

  // Set nội dung văn bản, audio file hoặc ghi âm
  if (store.getters.project_action === 'create') {
    await setDataInCreate(content, contentType)
  } else {
    await setDataInEdit(content, contentType.value)
  }

  // Set giọng đọc
  const voice = state.state[index].voice
  if (voice.content !== '') {
    regionName.value = voice.region
    regionNameActive.value = voice.region
    nameVoice.value = voice.content
    nameVoiceActive.value = voice.content
  }
}

const setDataInCreate = async (content, contentType) => {
  console.log(content, contentType.value)
  // Set nội dung văn bản, audio file hoặc ghi âm
  if (contentType.value === 'message') messageRef.value = content === null ? '' : content
  else if (contentType.value === 'file') {
    if (content !== null) audioFile.value[0] = content
  }
  else {
    recordFile.value = content
    audioPlay.value = URL.createObjectURL(content)
  }

  await eventBus.emit('applyVoiceContent', {
    content: content,
    contentType: contentType.value,
    voice: nameVoiceActive.value
  })
}

const setDataInEdit = async (content, contentType) => {
  console.log(contentType, content)
  if (contentType === 'message') messageRef.value = content === null ? '' : content
  else {
    // Lấy url lưu trong DB convert thành file
    if (typeof content === 'string') {
      const response = await fetch(content);
      const blob = await response.blob();
      const file = await new File([blob], 'audio_file', {type: 'audio/mpeg'});
      if (contentType === 'file') audioFile.value[0] = file
      else {
        recordFile.value = file
        audioPlay.value = URL.createObjectURL(file)
      }

      // await store.dispatch(ACTION_SET_CONTENT, file)
    }
    else {
      // Trường hợp đã up file thì sẽ tự động load vào
      if (contentType === 'file') audioFile.value[0] = content
      else {
        recordFile.value = content
        audioPlay.value = content !== null ? URL.createObjectURL(content) : null
      }
    }
  }

  // Lưu thông tin
  await saveContent()
}

const applyContent = async () => {
  if (await validateContent()) {
    toast.error(i18n.global.t('mc_scene.content.required'))
    return
  }

  await saveContent()
}

const saveContent = async () => {
  let content
  if (contentType.value === 'message') content = messageRef.value.replace(/[\r\n]+/gm, ' ').trim()
  else if (contentType.value === 'file') content = audioFile.value[0]
  else content = recordFile.value

  await store.dispatch(ACTION_SET_CONTENT, content)
  await store.dispatch(ACTION_SET_CONTENT_TYPE, contentType.value)
  await eventBus.emit('applyVoiceContent', {
    content: content,
    contentType: contentType.value,
    voice: nameVoiceActive.value
  })
}

const validateContent = () => {
  if (contentType.value === 'message' && messageRef.value === '') return true
  if (contentType.value === 'file' && audioFile.value[0] === undefined) return true
  return contentType.value === 'record' && audioPlay.value === null
}

const clearData = () => {
  messageRef.value = ''
  audioFile.value = []
  audioPlay.value = null
  regionName.value = 'norther'
  nameVoice.value = voice[0].entities[0].code
}

onMounted(() => {
  eventBus.on('changeScene', (sceneId) => {
    setData(sceneId)
  })

  eventBus.on('selectProject', (item) => {
    clearData()
  })

})
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.content-container {
  border: 1px dashed rgb(181, 180, 180);
  border-radius: 8px;
  background-color: rgb(243, 243, 243);
}

.option-title {
  font-size: 16px;
  font-family: "FS Magistral Bold", sans-serif;
  color: #ee0033;
}

#description-upload {
  font-family: "FS Magistral Book Italic", sans-serif;
  font-size: 12px;
  color: #44494d;

  span {
    font-family: "FS Magistral Bold Italic", sans-serif;
  }
}

.title {
  font-size: 14px;
  font-family: "FS Magistral Book", sans-serif;
  color: #44494d;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(181, 180, 180, 0.25);
}
</style>