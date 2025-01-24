<template>
  <div class="main-text-to-video">
    <div class="main-text-form">
      <div class="d-flex gap-4">
        <div class="setting-container d-flex flex-column gap-3">
          <div>
            <div class="prompt-content">
              <p class="form-title">{{ $t('common.form_config.config') }}</p>
              <div class="label items-center flex justify-between">
                <span class="text">{{ $t('common.form_config.select_mc') }}</span>
              </div>
            </div>
          </div>

          <div class="d-flex gap-4" style="height: 67.5vh;">
            <div>
              <div class="prompt-content h-100">
                <div class="input-form h-100" id="artists">
                  <el-scrollbar style="padding-right: 10px">
                    <el-radio-group class="d-grid gap-3" fill="#ffffff" v-model="nameMc" style="grid-template-columns: repeat(2, minmax(50px, 1fr))">
                      <el-radio :label="item.label" border class="items-radio flex-column-reverse justify-content-around w-100 p-0"
                                v-for="item in mc">
                        <img :src="item.src" alt="#" class="w-100 px-2" style="object-fit: cover">
                        <p class="p-0 m-0 text-center font-weight-bold">{{ item.name }}</p>
                      </el-radio>
                    </el-radio-group>
                  </el-scrollbar>
                </div>
              </div>
            </div>
            <div style="width: 60%">
              <el-scrollbar style="padding-right: 10px">
                <div class="prompt-content">
                  <div class="input-form">
                    <el-radio-group
                        v-model="contentType"
                        @change="isError = false"
                        style="max-height: 310px; overflow-y: auto">
                      <el-radio label="message" class="font-weight-bold">{{ $t('common.content_type[0]') }}</el-radio>
                      <el-radio label="file" class="font-weight-bold">{{ $t('common.content_type[1]') }}</el-radio>
                      <el-radio label="record" class="font-weight-bold">{{ $t('common.content_type[2]') }}</el-radio>
                    </el-radio-group>
                  </div>
                </div>
                <!-- Văn bản -->
                <div class="prompt-content d-flex" v-if="contentType === 'message'">
                  <div class="input-form">
                    <div class="label items-center flex justify-between">
                      <span class="text">{{ $t('common.form_config.text_input') }}</span>
                    </div>
                    <el-input
                        v-model="messageRef"
                        :autosize="{ minRows: 8, maxRows: 8 }"
                        maxlength="500"
                        show-word-limit
                        type="textarea"
                        :placeholder="$t('common.form_config.description_input')"
                        @change="changeText"
                    />
                    <span v-if="isError" class="error">{{ errorMessage }}</span>
                  </div>
                </div>

                <!-- File -->
                <div class="prompt-content" v-if="contentType === 'file'">
                  <div class="input-form">
                    <div class="label items-center flex justify-between">
                      <span class="text">{{ $t('common.form_config.upload_voice') }}</span>
                    </div>
                    <el-upload
                        v-model:file-list="audioFile"
                        ref="upload"
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :auto-upload="false"
                        accept=".mp3"
                        :limit="1"
                        :on-exceed="checkUpload"
                        :on-change="onChaneFile"
                    >
                      <div class="el-upload__text">
                        <el-button :type="'primary'">Click to upload</el-button>
                      </div>
                      <template #tip>
                        <div class="el-upload__tip">{{ $t('common.upload_file_mp3') }}</div>
                        <div class="el-upload__tip text-danger">
                          {{ $t('common.warning_file_duration', {maxDuration: maxDuration}) }}
                        </div>
                      </template>
                    </el-upload>
                    <span v-if="isError" class="error">{{ errorMessage }}</span>
                  </div>
                </div>

                <!-- Ghi âm -->
                <div class="prompt-content d-flex" v-if="contentType === 'record'">
                  <div class="input-form">
                    <div class="label items-center flex flex-column justify-between align-items-baseline">
                      <span class="text">{{ $t('common.form_config.record') }}</span>
                      <span class="text text-danger">{{
                          $t('common.warning_record_duration', {maxDuration: maxDuration})
                        }}</span>
                    </div>
                    <div class="d-flex align-items-center">
                      <el-button @click="startBtn" :disabled="isStartRecord">{{
                          $t('common.form_config.start_record')
                        }}
                      </el-button>
                      <el-button @click="stopBtn" :disabled="!isStartRecord">{{
                          $t('common.form_config.end_record')
                        }}
                      </el-button>
                      <div v-if="isStartRecord" id="count-time-record">
                        <div>{{ countTimeRecord.hour.toString().padStart(2, '0') }}</div>
                        <div>:</div>
                        <div>{{ countTimeRecord.minute.toString().padStart(2, '0') }}</div>
                        <div>:</div>
                        <div>{{ countTimeRecord.second.toString().padStart(2, '0') }}</div>
                      </div>
                      <div v-show="!isStartRecord">
                        <audio class="ml-3" id="audioPlayback" controls src=""></audio>
                      </div>
                    </div>
                    <span v-if="isError" class="error">{{ errorMessage }}</span>
                  </div>
                </div>

                <div class="prompt-content" v-if="contentType === 'message'">
                  <div class="input-form">
                    <div class="label items-center flex justify-between">
                      <span class="text">{{ $t('common.form_config.sound_input') }}</span>
                    </div>
                    <div>
                      <el-radio-group v-model="soundRegion">
                        <el-radio-button :label="item.region" v-for="item in voice">
                          {{ $t(`common.region.${item.region_name}`) }}
                        </el-radio-button>
                      </el-radio-group>
                    </div>
                    <div>
                      <div class="row">
                        <el-radio-group v-model="nameVoice">
                          <el-radio class="col-3 mt-3" :label="voice.code" border
                                    v-for="voice in voice[soundRegionSelected].entities">{{ voice.name }}
                          </el-radio>
                        </el-radio-group>
                      </div>
                    </div>
                    <span v-if="isInvalidVoice" class="error">{{ $t('common.warning_voice')}}</span>
                  </div>
                </div>

                <el-button @click="onSubmit()"
                           :disabled="isLoading || !permission"
                           class="button_submit"
                           id="submit-mc-green-background"
                           style="font-family: 'FS Magistral Medium', sans-serif"
                           type="danger">
                  <template #default>
                    <span id="title-submit-mc-green-background">{{ $t('common.form_config.create_video') }}</span>
                  </template>
                </el-button>
                <warning-permission v-if="!permission"/>
              </el-scrollbar>
            </div>
          </div>
        </div>
        <div class="result-container" id="video_wrapper">
          <div class="prompt-content">
            <p class="form-title">{{ $t('common.form_config.result') }}</p>
          </div>
          <div class="process-custom" v-if="isLoading">
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
              <span class="text-black">{{ $t('common.estimate') }} {{formatTime(countDownLoading.minute)}}:{{formatTime(countDownLoading.second)}}</span>
            </el-progress>
          </div>
          <div class="d-flex justify-content-center">
            <video v-if="videoSrc" :height="483" controls style="width: auto">
              <source :src="videoSrc" type="video/mp4">
            </video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {computed, reactive, ref} from "vue";
import AiGenarate from "~/services/AiGenarate";
import {useToast} from "vue-toastification";
import mc from "~home/mc.json"
import voice from "~home/voice.json"
import i18n from "../../../lang/i18n"
import {find, flatMap} from "lodash";
import {formatTime} from "../../../helpers/formats";

const props = defineProps({
  permission: {
    type: Boolean,
    default: false,
  }
})
const toast = useToast()
const videoWrapper = ref({
  width: 300,
  height: 300
})
const countTimeRecord = ref({
  hour: 0,
  minute: 0,
  second: 0
})
const countDownLoading = reactive({
  minute: 0,
  second: 0
})
const artists = ref([])
const contentType = ref("message")
const nameMc = ref(mc[0].label)
const soundRegion = ref(voice[0].region)
const audioFile = ref([])
const recordFile = ref(null)
const isStartRecord = ref(false)
const formData = new FormData();
const videoSrc = ref("")
const nameVoice = ref(voice[0].entities[0].code)
const mcObject = ref(mc[0])
const voiceObject = ref(voice[0].entities[0])
const messageRef = ref("");
const isInvalidVoice = ref(false)
const isError = ref(false);
const isLoading = ref(false);
const percentage = ref(0);
const audioDuration = ref(0)
const maxDuration = process.env.MIX_MAX_FILE_DURATION
const handleTime = process.env.MIX_CORE_HANDLE_TIME
let mediaRecorder;
let audioChunks = [];

const errorMessage = ref("");

const soundRegionSelected = computed(() => {
  if (soundRegion.value === 'norther') {
    nameVoice.value = voice[0].entities[0].code
    return 0
  } else if (soundRegion.value === 'central') {
    nameVoice.value = voice[1].entities[0].code
    return 1
  } else {
    nameVoice.value = voice[2].entities[0].code
    return 2
  }
})

const isValidate = () => {
  isInvalidVoice.value = false
  isError.value = false
  if (messageRef.value.trim().length === 0 && contentType.value === 'message') {
    isError.value = true;
    errorMessage.value = i18n.global.t('common.content_required');
    return false;
  } else if (audioFile.value.length === 0 && contentType.value === 'file') {
    isError.value = true;
    errorMessage.value = i18n.global.t('common.file_required');
    return false;
  } else if (recordFile.value === null && contentType.value === 'record') {
    isError.value = true;
    errorMessage.value = i18n.global.t('common.record_required');
    return false
  } else if (audioDuration.value > maxDuration) {
    isError.value = true;
    errorMessage.value = i18n.global.t('common.limit_file_time', {maxDuration: maxDuration});
    return false
  }

  // Kiểm tra mc và giọng đọc phải phù hợp (mc nữ => giọng đọc nữ)
  const mcObject = find(mc, {label: nameMc.value})
  const voiceObject = find(flatMap(voice, 'entities'), {code: nameVoice.value})
  if (mcObject.sex !== voiceObject.sex) {
    isInvalidVoice.value = true
    return false
  }

  return true;
};

const startBtn = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    startRecording(stream);
  } catch (err) {
    toast.error(i18n.global.t('common.no_micro_device'))
    console.error('Error accessing microphone', err);
  }
}

const stopBtn = () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
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
    audioChunks = [];
    isStartRecord.value = true
  };
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      audioChunks.push(event.data);
    }
  };
  mediaRecorder.onstop = () => {
    toast.success(i18n.global.t('common.form_config.end_record'))
    clearInterval(timeRecord)
    audioDuration.value = countTimeRecord.value.second + countTimeRecord.value.minute * 60 + countTimeRecord.value.hour * 3600
    countTimeRecord.value.second = 0
    countTimeRecord.value.minute = 0
    countTimeRecord.value.hour = 0

    const audioBlob = new Blob(audioChunks, {type: 'audio/mpeg'});
    recordFile.value = new File([audioBlob], "virtual_speaker", {type: "audio/mpeg"})
    document.getElementById("audioPlayback").src = URL.createObjectURL(audioBlob);

    isStartRecord.value = false
  };
  mediaRecorder.start();
}

const onSubmit = async () => {
  if (!isValidate()) {
    return false
  }

  if (!checkAudioFile()) {
    toast.error(i18n.global.t('mc_scene.content.invalid_format'))
    return false
  }

  percentage.value = 0
  isLoading.value = true
  videoSrc.value = ""

  // Resize video
  const videoWrapperElement = document.getElementById('video_wrapper')
  videoWrapper.value.width = videoWrapperElement.offsetWidth - 20
  videoWrapper.value.height = videoWrapperElement.offsetHeight

  try {
    const totalTime = Math.round(audioDuration.value) * handleTime
    // Chuyển tổng thời gian (giây) sang mm:ss
    countDownLoading.minute = Math.floor(totalTime / 60)
    countDownLoading.second = totalTime % 60
    // Số phần trăm được load mỗi giây (làm tròn xuống)
    const percentagePerTime = Math.floor(100 / (totalTime))
    // Cộng thêm phần còn thiếu để đủ 100%
    const remainder = 100 % totalTime
    const increases = Array(totalTime).fill(percentagePerTime)
    for (let i = 0; i < remainder; i++) {
      increases[i] += 1
    }
    let increasesIndex = 0
    let interval = setInterval(() => {
      if (countDownLoading.second === 0) {
        if (countDownLoading.minute === 0) {
          clearInterval(interval)
          percentage.value = 100
        } else {
          countDownLoading.minute -= 1;
          countDownLoading.second = 59;
        }
      } else {
        countDownLoading.second -= 1;
      }

      if (increasesIndex < increases.length) percentage.value += increases[increasesIndex]
      increasesIndex += 1
    }, 1000)

    const res = contentType.value === 'message' ? await textToVideo() : await audioToVideo();

    if (res.status === 200) {
      const data = res.data;
      videoSrc.value = data.path_video
      percentage.value = 100;

      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    } else {
      isLoading.value = false;
    }

    countDownLoading.minute = 0
    countDownLoading.second = 0
    clearInterval(interval)
  } catch (error) {
    isLoading.value = false;
    toast.error(i18n.global.t('common.catch_exception'))
  }
};

const textToVideo = async () => {
  return await AiGenarate.textToVideo({
    name_mc: nameMc.value,
    text: messageRef.value,
    name_voice: nameVoice.value,
    speed: 1.0
  })
}

const audioToVideo = async () => {
  formData.delete('name_mc')
  formData.delete('audio')

  formData.append('name_mc', nameMc.value)
  if (contentType.value === 'file') {
    if (audioFile.value[0].raw === undefined) {
      formData.append('audio', audioFile.value[0])
    } else {
      formData.append('audio', audioFile.value[0].raw)
    }
  } else {
    formData.append('audio', recordFile.value)
  }

  return await AiGenarate.soundToVideo(formData)
}

const changeText = (text) => {
  // Trung bình đọc 240 từ / phút
  const normalizeSpaces = text.replace(/\s+/g, ' ')
  const wps = normalizeSpaces.split(" ").length / (240 / 60)
  audioDuration.value = Math.round(wps) > maxDuration ? maxDuration : Math.round(wps)
}

const checkUpload = async (uploadFile, uploadFiles) => {
  audioFile.value[0] = null
  audioFile.value[0] = uploadFile[0]
  await getFileDuration(uploadFile[0])
}

const onChaneFile = async (uploadFile, uploadFiles) => {
  audioFile.value[0] = uploadFile.raw
  await getFileDuration(uploadFile.raw)
}

const getFileDuration = async (file) => {
  const url = URL.createObjectURL(file)
  const audio = document.createElement('audio')
  audio.src = url
  audio.addEventListener('loadedmetadata', function () {
    audioDuration.value = audio.duration
  })
}

const checkAudioFile = () => {
  if (contentType.value === 'file') {
    let type
    if (audioFile.value[0].raw === undefined) {
      type = audioFile.value[0].type
    } else {
      type = audioFile.value[0].raw.type
    }

    return type === "audio/mpeg"
  }

  return true
}
</script>
<style lang="scss" scoped>
.items-radio {
  margin-bottom: 10px;
  width: 200px;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

img {
  width: 180px;
  height: 180px;
}

#count-time-record {
  display: flex;
  font-weight: bold;
  font-size: 20px;
  margin-left: 20px;
}
</style>