<template>
  <div class="d-flex justify-content-between">
    <p>{{ sceneName }}</p>
    <div class="d-flex dialog-play-video" style="gap: 18px">
      <div class="d-flex align-items-center" v-if="isLoading">
        <span class="text-danger">{{ $t('common.estimate') }} {{formatTime(countDownLoading.minute)}}:{{formatTime(countDownLoading.second)}}</span>
      </div>
      <div>
        <el-button
            v-loading="isLoading"
            :disabled="isLoading || scenes.length === 0"
            @click="onSubmit()"
            class="button_submit"
            id="submit-mc-scene"
            type="danger"
        >
          <template #default>
            <span id="title-submit-mc-scene">{{ $t('common.form_config.create_video').toUpperCase() }}</span>
          </template>
        </el-button>
      </div>
      <div v-if="genVideo.url !== ''">
        <el-button
            @click="genVideo.visible = true"
            class="button_submit"
        >{{ $t('mc_scene.watch_video').toUpperCase() }}</el-button>
        <el-dialog v-model="genVideo.visible" title="Thông tin video" width="68%" :key="genVideo.url">
          <video controls style="height: auto; width: 100%">
            <source :src="genVideo.url" type="video/mp4">
          </video>
        </el-dialog>
      </div>
      <div>
        <el-button
            @click="onSaveProject()"
            class="button_submit"
            type="primary"
        >{{ $t('common.save_scene') }}</el-button>
      </div>
    </div>
  </div>
  <div id="scene-box">
    <div>
      <div class="row d-flex flex-column" style="height: 100%; gap: 24px">
        <div class="col-12">
          <toolbar
              :align="options.align"
              :bold="options.bold"
              :italic="options.italic"
              :underline="options.underline"
              :strike="options.strike"
              :color="options.color"
              :fontSize="options.fontSize"
              :font-family="options.fontFamily"
              @changeFontStyle="changeFontStyle"
              @changeAlign="changeAlign"
              @changeFontSize="changeFontSize"
              @changeColor="changeColor"
              @change-font-family="changeFontFamily"
          />
        </div>

        <div class="col-12 d-flex justify-center">
          <div id="container"
               :style="{width: `${canvas.width}px`, height: `${canvas.height}px`, background: `${canvas.background}`, opacity: `${canvas.opacity}`}"
               @dragover.prevent @drop="handleDrop"
          ></div>
        </div>

        <div class="col-12">
          <div class="scene-scroll">
            <el-scrollbar :always="true">
              <div class="d-flex" style="gap: 10px">
                <!-- Danh sách phân cảnh -->
                <div class="scene-item d-flex align-items-end"
                     :class="{'scene-active': sceneTarget._id === item.id}"
                     v-for="(item, index) in scenes"
                     @click="handleChangeScene($event, item.id)"
                     @dragover.prevent="dragOver"
                >
                  <img class="background" :src="item.preview" :alt="item.id" v-show="item.preview">
                  <div class="order-number">
                    <div>{{ index + 1 }}</div>
                  </div>
                  <div class="duration">
                    <div>{{ item.duration }}s</div>
                    <el-dropdown placement="top" trigger="click">
                      <three-dots-icon style="cursor: pointer" />
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item @click="showDialogDeleteScene($event, item.id)">{{ $t('common.delete') }}</el-dropdown-item>
                          <el-dropdown-item @click="showDialogForm($event, item.id)">{{ $t('common.edit') }}</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </div>

                <!-- Dialog xóa phân cảnh -->
                <el-dialog v-model="dialogDeleteScene.visible" :width="330">
                  <strong class="text-white">{{ $t('mc_scene.scene.confirm_delete') }}</strong>
                  <template #footer>
                    <el-button @click="dialogDeleteScene.visible = false">{{ $t('common.cancel') }}</el-button>
                    <el-button type="danger" @click="onDeleteScene">{{ $t('common.delete') }}</el-button>
                  </template>
                </el-dialog>

                <!-- Dialog chọn thời gian cho phân cảnh -->
                <el-dialog v-model="dialogForm.visible" :title="dialogForm.title" width="500" @closed="clearError">
                  <el-form class="d-flex flex-column">
                    <el-form-item :label="$t('mc_scene.scene.name')" label-width="175px">
                      <el-input v-model="dialogForm.name" autocomplete="off" :placeholder="$t('mc_scene.scene.name_input')" />
                      <span v-if="errorMessage.name" class="error">{{ errorMessage.name }}</span>
                    </el-form-item>
                    <el-form-item :label="$t('mc_scene.scene.duration_input')" label-width="175px">
                      <el-input v-model="dialogForm.duration" autocomplete="off" type="number" :min="1" @keydown="blockKeys" />
                      <span v-if="errorMessage.duration" class="error">{{ errorMessage.duration }}</span>
                    </el-form-item>
                  </el-form>
                  <template #footer>
                    <div class="dialog-footer">
                      <el-button @click="dialogForm.visible = false">{{ $t('common.cancel') }}</el-button>
                      <el-button type="primary" @click="onSubmitDialogForm">{{ $t('common.confirm') }}</el-button>
                    </div>
                  </template>
                </el-dialog>

                <!-- Phân cảnh mẫu -->
                <div class="scene-item scene-example" @click="showDialogForm($event)">
                  <img class="background" style="opacity: 0.2;" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTI2IiBoZWlnaHQ9IjEyNiI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik0xMjYgMHYyMS41ODRMMjEuNTg0IDEyNkgwdi0xNy41ODVMMTA4LjQxNSAwSDEyNlptMCAxMDguNDE0VjEyNmgtMTcuNTg2TDEyNiAxMDguNDE0Wm0wLTg0djM5LjE3MUw2My41ODUgMTI2SDI0LjQxNEwxMjYgMjQuNDE0Wm0wIDQydjM5LjE3TDEwNS41ODQgMTI2aC0zOS4xN0wxMjYgNjYuNDE0Wk0xMDUuNTg2IDAgMCAxMDUuNTg2VjY2LjQxNUw2Ni40MTUgMGgzOS4xNzFabS00MiAwTDAgNjMuNTg2VjI0LjQxNUwyNC40MTUgMGgzOS4xNzFabS00MiAwTDAgMjEuNTg2VjBoMjEuNTg2WiIvPjwvZGVmcz48dXNlIHhsaW5rOmhyZWY9IiNhIiBmaWxsPSIjODg4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=" alt="img">
                  <div class="order-number">
                    <div>0</div>
                  </div>
                  <div class="duration">
                    <div>0s</div>
                    <three-dots-icon />
                  </div>
                  <div class="add-icon">
                    <plus-icon />
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Toolbar from "../Toolbar.vue"
import ThreeDotsIcon from "../../icons/ThreeDots.vue";
import PlusIcon from "../../icons/Plus.vue";
import Konva from "konva";
import {onMounted, reactive, ref} from "vue";
import {
  handleDbClickTextNode,
  keepTextNodeInCanvas,
  setEventToTextNode,
  setEventToArtist, setEventToImageDecorate,
  setToolbar
} from "../../../helpers/editorHelper";
import {useEventsBus} from "../../../helpers/eventBus";
import state from "../../../store/scenes/index"
import {
  ACTION_ADD_SCENE, ACTION_CLEAR_DATA, ACTION_DELETE_IMAGE_DECORATE,
  ACTION_SET_ARTIST,
  ACTION_SET_BACKGROUND,
  ACTION_SET_CONTENT,
  ACTION_SET_CONTENT_TYPE, ACTION_SET_IMAGE_DECORATE,
  ACTION_SET_TARGET,
  ACTION_SET_TEXT, ACTION_SET_VOICE_CONTENT
} from "../../../store/scenes/action";
import {useStore} from "vuex";
import {findIndex, forEach, remove} from "lodash";
import {ElLoading} from "element-plus";
import {dataURItoFile} from "../../../helpers/ImageDetect";
import {AiGenarate} from "../../../services";
import {useToast} from "vue-toastification";
import VirtualHumanService from "../../../services/VirtualHumanService";
import {formatTime} from "../../../helpers/formats";
import i18n from "../../../lang/i18n"

const scenes = ref([])
const artistAttr = ref({
  width: 200,
  height: 200,
  x: 50,
  y: 50,
  draggable: true
})
const textAttr = ref({
  text: i18n.global.t('mc_scene.text.input'),
  x: 50,
  y: 80,
  fontSize: 24,
  draggable: true,
  width: 200
})
const dialogForm = reactive({
  duration: 1,
  name: '',
  sceneIndex: null,
  visible: false,
  title: i18n.global.t('mc_scene.scene.info')
})
const genVideo = reactive({
  url: '',
  visible: false
})
const countDownLoading = reactive({
  minute: 0,
  second: 0
})
const isStage = ref(false)
const isLoading = ref(false)
const duration = ref(1)
const count = ref(0)
const audioDuration = ref(0)
const countScene = ref(0)
const listAction = ref([])
const listRedo = ref([])
const layers = ref([])
const sceneTarget = ref(null)
const imageDecorateTarget = ref(null)
const backgroundTarget = ref(null)
const artistTarget = ref(null)
const transformTarget = ref(null)
const stage = ref(null)
const sceneName = ref('')
const canvas = reactive({
  width: 910,
  height: 512,
  background: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTI2IiBoZWlnaHQ9IjEyNiI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik0xMjYgMHYyMS41ODRMMjEuNTg0IDEyNkgwdi0xNy41ODVMMTA4LjQxNSAwSDEyNlptMCAxMDguNDE0VjEyNmgtMTcuNTg2TDEyNiAxMDguNDE0Wm0wLTg0djM5LjE3MUw2My41ODUgMTI2SDI0LjQxNEwxMjYgMjQuNDE0Wm0wIDQydjM5LjE3TDEwNS41ODQgMTI2aC0zOS4xN0wxMjYgNjYuNDE0Wk0xMDUuNTg2IDAgMCAxMDUuNTg2VjY2LjQxNUw2Ni40MTUgMGgzOS4xNzFabS00MiAwTDAgNjMuNTg2VjI0LjQxNUwyNC40MTUgMGgzOS4xNzFabS00MiAwTDAgMjEuNTg2VjBoMjEuNTg2WiIvPjwvZGVmcz48dXNlIHhsaW5rOmhyZWY9IiNhIiBmaWxsPSIjODg4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')`,
  opacity: 0.2
})
const sceneHd = {
  width: 1280,
  height: 720
}
const options = reactive({
  align: 0,
  fontSize: 24,
  bold: false,
  italic: false,
  underline: false,
  strike: false,
  color: 'rgba(0, 0, 0, 1)',
  fontFamily: ''
})

const emits = defineEmits(['saveProject'])
const eventsBus = useEventsBus()
const store = useStore()
const toast = useToast()
const errorMessage = reactive({
  name: '',
  duration: ''
})
const dialogDeleteScene = reactive({
  sceneIndex: null,
  visible: false,
})
const maxFileDuration = Number(process.env.MIX_MAX_FILE_DURATION)
const handleTime = Number(process.env.MIX_CORE_HANDLE_TIME)

const addScene = () => {
  // Tạo stage
  if (isStage.value === false) {
    setStage()
    isStage.value = true
  }

  // Tạo layer mới
  const layer = new Konva.Layer()

  // Tạo background và artist cho layer
  const background = new Konva.Image({
    width: canvas.width,
    height: canvas.height,
    x: 0,
    y: 0,
    draggable: false
  })

  const artist = new Konva.Image(artistAttr.value)
  const tr = new Konva.Transformer({
    node: artist,
    enabledAnchors: [],
    rotateEnabled: false,
    borderEnabled: false,
    name: 'artistTransformer',
    // set minimum width of text
    boundBoxFunc: function (oldBoundBox, newBoundBox) {
      const { x, y, width, height } = newBoundBox;
      const isOut =
          x < 0 ||
          y < 0 ||
          x + width > canvas.width ||
          y + height > canvas.height

      if (isOut) return oldBoundBox

      return newBoundBox;
    },
  })

  setEventToArtist({
    artist: artist,
    tr: tr,
    canvasWidth: canvas.width,
    canvasHeight: canvas.height
  })

  artist.on('dragend', (ev) => {
    convertCanvasToImg()
  })

  artist.on('click', function () {
    tr.setAttrs({
      enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      borderEnabled: true
    })

    artistTarget.value = artist
  })

  background.on('click', function () {
    backgroundTarget.value = background
  })

  // Xóa bỏ những layer cũ và thay layer mới
  stage.value.removeChildren()
  layer.add(background, artist, tr)
  stage.value.add(layer)

  // Lưu thông tin layer
  layers.value.push(layer)
  scenes.value.push({
    id: layer._id,
    name: dialogForm.name,
    duration: dialogForm.duration,
    preview: ''
  })
  store.dispatch(ACTION_ADD_SCENE, {
    id: layer._id,
    name: dialogForm.name,
    duration: dialogForm.duration,
  })

  // Xóa background viền, set tên phân cảnh
  canvas.background = 'none'
  canvas.opacity = 1
  sceneName.value = dialogForm.name
  sceneTarget.value = layer
  store.dispatch(ACTION_SET_TARGET, layer._id)
  countScene.value += 1
}

const deleteArtist = (ev) => {
  const artistTransformer = sceneTarget.value.findOne('.artistTransformer')
  artistTransformer.setAttrs({
    enabledAnchors: [],
    borderEnabled: false
  })
  artistTransformer._nodes[0].image(new Image())
  artistTarget.value.hide()
  convertCanvasToImg()

  const StateIndex = findIndex(state.state, e => e.id === sceneTarget.value._id)
  state.state[StateIndex].artist = {imgObj:null, item: null, attr: artistAttr.value, nodeId: null}
}

const deleteBackground = (ev) => {
  sceneTarget.value.children[0].image(new Image())
  convertCanvasToImg()
}

// Change font size
const changeFontSize = (size) => {
  if (transformTarget.value === null) return true
  options.fontSize = size
  transformTarget.value._nodes[0].fontSize(Number(size))
}

const blockKeys = (ev) => {
  if (['Space', 'Minus', 'Period'].includes(ev.code)) ev.preventDefault()
}

// Change color
const changeColor = (color) => {
  if (transformTarget.value === null) return true

  options.color = color
  transformTarget.value._nodes[0].fill(color)
}

// Click change style
const changeFontStyle = (ev) => {
  if (transformTarget.value === null) return true

  options[`${ev}`] = !options[`${ev}`]
  const fontStyle = []
  const textDecoration = []
  if (options.bold) fontStyle.push('bold');
  if (options.italic) fontStyle.push('italic');
  if (options.underline) textDecoration.push('underline')
  if (options.strike) textDecoration.push('line-through')

  transformTarget.value._nodes[0].setAttr('fontStyle', fontStyle.join(' '))
  transformTarget.value._nodes[0].setAttr('textDecoration', textDecoration.join(' '))
}

// Click change font family
const changeFontFamily = (fontFamily) => {
  if (transformTarget.value === null) return true

  options.fontFamily = fontFamily
  transformTarget.value._nodes[0].setAttr('fontFamily', fontFamily)
}

// Click change align
const changeAlign = () => {
  if (transformTarget.value === null) return true

  const alignMap = {
    0: 'left',
    1: 'center',
    2: 'right'
  };
  options.align = (options.align + 1) % 3;
  transformTarget.value._nodes[0].setAttr('align', alignMap[options.align]);
}

// Click add text
const setTextNode = (attr, textNodeId = null) => {
  const textNode = new Konva.Text(attr);

  const tr = new Konva.Transformer({
    node: textNode,
    enabledAnchors: [],
    rotateEnabled: false,
    borderEnabled: false,
    name: 'textNodeTransformer',
    // set minimum width of text
    boundBoxFunc: function (oldBox, newBox) {
      newBox.width = Math.max(30, newBox.width);
      return newBox;
    },
  });

  // Lưu thông tin artist trong phân cảnh
  store.dispatch(ACTION_SET_TEXT, {
    sceneId: sceneTarget.value._id,
    attr: textNode.attrs,
    nodeId: textNode._id,
    transformId: tr._id
  })

  // Add textNode vào phân cảnh
  sceneTarget.value.add(textNode, tr)

  // Tăng giảm kích thước textNode
  textNode.on('transform', () => {
    textNode.setAttrs({
      width: textNode.width() * textNode.scaleX(),
      scaleX: 1,
    });
  });

  // Giữ lại textNode khi bị kéo ra khỏi canvas
  textNode.on('dragend', (ev) => {
    keepTextNodeInCanvas(ev.target, textNode, canvas.width, canvas.height)
    if (transformTarget.value === null) convertCanvasToImg()
  })

  // Di chuột vào và ra khỏi textNode
  setEventToTextNode({
    node: textNode,
    tr: tr
  })

  // Double click để edit nội dung
  textNode.on('dblclick dbltap', () => {
    handleDbClickTextNode({
      stage: stage.value,
      tr: tr,
      textNode: textNode
    })
  });

  // Click để focus textNode
  textNode.on('click tap', () => {
    setToolbar(options, textNode)

    const textNodeSelected = sceneTarget.value.findOne('.textNodeTransformerSelected')
    if (textNodeSelected !== undefined) {
      if (textNodeSelected._nodes[0]._id === textNode._id) return

      textNodeSelected.setAttrs({enabledAnchors: [], borderEnabled: false})
      textNodeSelected.removeName('textNodeTransformerSelected')
    }

    tr.setAttrs({enabledAnchors: ['middle-left', 'middle-right'], borderEnabled: true})
    tr.addName('textNodeTransformerSelected')

    // Ghi nhờ target
    transformTarget.value = tr
  })
}

const handleDrop = (ev) => {
  if (isStage.value === false) return
  if (ev.dataTransfer.getData('dragArtist')) {
    const item = JSON.parse(ev.dataTransfer.getData('dragArtist'))
    setArtist(item.image_path, item, artistAttr.value)
  }

  if (ev.dataTransfer.getData('dragText')) {
    setTextNode(textAttr.value)
  }

  if (ev.dataTransfer.getData('dragBackground')) {
    setBackgroundImg(ev.dataTransfer.getData('dragBackground'))
  }

  if (ev.dataTransfer.getData('dragImageDecorate')) {
    setImageDecorate(ev.dataTransfer.getData('dragImageDecorate'))
  }

  // Convert canvas to image
  convertCanvasToImg()
}

const setArtist = (imagePath, item, attr, type = 'add') => {
  new Promise((resolve) => {
    const artistTarget = sceneTarget.value.children[1]
    artistTarget.addName('artistNode')
    const imgObj = new Image()
    imgObj.setAttribute('crossOrigin', 'anonymous');
    imgObj.src = imagePath
    imgObj.onload = () => {
      // Lấy thông tin attr từ DB khi vào màn hình edit
      if (type === 'edit') artistTarget.setAttrs(attr)
      else {
        attr.height = artistAttr.value.width * imgObj.height / imgObj.width
        artistTarget.setAttrs({width: attr.width, height: attr.height})
        if (artistTarget.x() + artistTarget.width() > canvas.width) artistTarget.x(canvas.width - attr.width)
        if (artistTarget.y() + artistTarget.height() > canvas.height) artistTarget.y(canvas.height - attr.height)
      }

      artistTarget.image(imgObj)
    }
    artistTarget.show()

    // Lưu thông tin artist trong phân cảnh
    store.dispatch(ACTION_SET_ARTIST, {
      sceneId: sceneTarget.value._id,
      imgObj: imgObj,
      item: item,
      attr: artistTarget.attrs,
      nodeId: artistTarget._id
    })

    resolve(true)
  })
}

const setBackgroundImg = (imgUrl) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = imgUrl
    img.onload = () => {
      // backgroundImage.value.image(img)
      sceneTarget.value.children[0].image(img)
      console.log(sceneTarget.value)

      // Lưu thông tin background trong phân cảnh
      store.dispatch(ACTION_SET_BACKGROUND, {
        sceneId: sceneTarget.value._id,
        url: imgUrl
      })

      resolve(true)
    }
    img.onerror = () => {
      resolve(true)
    }
  })
}

const setImageDecorate = (imgUrl, attrs = null) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = imgUrl
    img.onload = () => {
      const imgDecorate = new Konva.Image()
      imgDecorate.image(img)
      if (attrs) {
        imgDecorate.setAttrs({
          width: attrs.width,
          height: attrs.height,
          x: attrs.x,
          y: attrs.y,
        })
      }

      const tr = new Konva.Transformer({
        node: imgDecorate,
        enabledAnchors: [],
        rotateEnabled: false,
        borderEnabled: false,
        name: 'imageDecorateTransformer',
        // set minimum width of text
        boundBoxFunc: function (oldBoundBox, newBoundBox) {
          return newBoundBox
        },
      })

      // Focus vào image decorate khi click vào hoặc chuyển sang một đối tượng khác
      imgDecorate.on('click tap', function (ev) {
        const imageSelected = sceneTarget.value.findOne('.imageDecorateTransformerSelected')
        if (imageSelected !== undefined) {
          if (imageSelected._nodes[0]._id === imgDecorate._id) return

          imageSelected.setAttrs({
            enabledAnchors: [],
            borderEnabled: false
          })
          imageSelected.removeName('imageDecorateTransformerSelected')
        }

        tr.setAttrs({
          enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
          borderEnabled: true
        })
        tr.addName('imageDecorateTransformerSelected')

        // Ghi nhờ target
        imageDecorateTarget.value = {
          _id: imgDecorate._id,
          target: 'imageDecorate',
          node: tr
        }
      })

      imgDecorate.on('dragend', function () {
        convertCanvasToImg()
      })

      // Set các event
      setEventToImageDecorate({
        image: imgDecorate,
        tr: tr,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height
      })

      sceneTarget.value.add(imgDecorate, tr)

      // Lưu thông tin target
      store.dispatch(ACTION_SET_IMAGE_DECORATE, {
        sceneId: sceneTarget.value._id,
        nodeId: imgDecorate._id,
        attr: imgDecorate.attrs,
        imagePath: imgUrl
      })

      resolve(true)
    }
    img.onerror = () => {
      resolve(true)
    }
  })

}

const convertCanvasToImg = () => {
  setTimeout(() => {
    const index = findIndex(scenes.value, e => e.id === sceneTarget.value._id)
    scenes.value[index].preview = stage.value.toDataURL({width: canvas.width, height: canvas.height, mimeType: 'image/png'})
  }, 500)
}

const handleChangeScene = (ev, sceneId) => {
  if (sceneTarget.value._id !== sceneId) {
    // Thay layer cũ thành layer mới
    stage.value.removeChildren()
    const index = findIndex(layers.value, e => e._id === sceneId)
    sceneTarget.value = layers.value[index]
    stage.value.add(sceneTarget.value)

    store.dispatch(ACTION_SET_TARGET, sceneId)
    eventsBus.emit('changeScene', sceneId)

    // Thay đổi tên phân cảnh
    const stateIndex = findIndex(state.state, e => e.id === sceneId)
    sceneName.value = state.state[stateIndex].name

    // Reset các target ở phân cảnh cũ
    backgroundTarget.value = null
    imageDecorateTarget.value = null
    artistTarget.value = null
    transformTarget.value = null
  }
}

const onSubmit = async () => {
  if (await validateForm()) return
  isLoading.value = true
  const formData = new FormData()
  formData.append(`project_id`, store.getters.project_id)
  forEach(scenes.value, (scene, key) => {
    // Ẩn artist trong layer và scale layer thành hd
    const index = findIndex(layers.value, e => e._id === scene.id)
    // layers.value[index].children[1].hide()
    const layerClone = layers.value[index].clone()
    layerClone.children[1].hide()
    const scale = Number((sceneHd.width / canvas.width).toFixed(1))
    layerClone.scale({x: scale, y: scale})
    layerClone.size({width: sceneHd.width, height: sceneHd.height})

    // Scale artist trong phân cảnh
    const artist = layerClone.children[1]
    artist.setAttrs({
      width: artist.width() * scale,
      height: artist.height() * scale,
      x: artist.x() * scale,
      y: artist.y() * scale
    })

    // Convert layer to image file
    const blob = dataURItoFile(layerClone.toDataURL({width: sceneHd.width, height: sceneHd.height, mimeType: 'image/png'}))
    const file = new File([blob], 'file.png', { type: 'image/png' })

    const StateIndex = findIndex(state.state, e => e.id === scene.id)
    formData.append(`artist_info[${index}]`, JSON.stringify(state.state[StateIndex].artist.item))
    formData.append(`artist_attr[${index}]`, JSON.stringify(artist.attrs))
    formData.append(`voice_content[${index}]`, state.state[StateIndex].voice.content)
    formData.append(`image[${index}]`, file)
    formData.append(`duration[${index}]`, scene.duration)
    formData.append(`audio[${index}]`, state.state[StateIndex].content)
  })

  // Hiển thị thời gian ước lượng xử lý
  countDownLoading.minute = Math.floor(audioDuration.value * handleTime / 60)
  countDownLoading.second = audioDuration.value * handleTime % 60
  let interval = setInterval(() => {
    if (countDownLoading.second === 0) {
      if (countDownLoading.minute === 0) {
        clearInterval(interval)
      } else {
        countDownLoading.minute -= 1;
        countDownLoading.second = 59;
      }
    } else {
      countDownLoading.second -= 1;
    }
  }, 1000)

  const res = await AiGenarate.textToBackground(formData)
  if (res.status === 200) {
    genVideo.url = res.data.path_video
  }
  clearInterval(interval)
  isLoading.value = false
}

const onSaveProject = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: i18n.global.t('common.loading'),
    background: 'rgba(0, 0, 0, 0.7)',
  })

  const formData = new FormData()
  if (scenes.value.length === 0) {
    formData.append(`project_id`, store.getters.project_id)
  }

  await forEach(scenes.value, async (scene, key) => {
    // Ẩn artist trong layer và scale layer thành hd
    const index = findIndex(layers.value, e => e._id === scene.id)

    // Convert scene preview to image file
    const blob = await dataURItoFile(layers.value[index].toDataURL({width: canvas.width, height: canvas.height, mimeType: 'image/png'}))
    const file = await new File([blob], 'file.png', { type: 'image/png' })

    const StateIndex = findIndex(state.state, e => e.id === scene.id)
    formData.append(`project_id`, store.getters.project_id)
    formData.append(`artist_info[${index}]`, JSON.stringify(state.state[StateIndex].artist.item))
    formData.append(`nodes_attr[${index}]`, JSON.stringify(layers.value[index].children))
    formData.append(`mc_voice[${index}]`, state.state[StateIndex].voice.content)
    formData.append(`region[${index}]`, state.state[StateIndex].voice.region)
    formData.append(`image_preview[${index}]`, file)
    formData.append(`background_image[${index}]`, state.state[StateIndex].backgroundImage)
    formData.append(`content_type[${index}]`, state.state[StateIndex].contentType)
    formData.append(`name[${index}]`, scene.name)
    formData.append(`duration[${index}]`, scene.duration)
    formData.append(`audio[${index}]`, state.state[StateIndex].content)
    formData.append(`image_decorate[${index}]`, JSON.stringify(state.state[StateIndex].imageDecorate))
  })

  const res = await AiGenarate.saveProject(formData)
  if (res.status === 200) {
    toast.success(i18n.global.t('common.save_success'))
    await loading.close()
    emits('saveProject')
  }

  loading.close()
}

const validateForm = async () => {
  let isError = false
  forEach(state.state, (item) => {
    if (item.artist.item === null) {
      isError = true
      toast.error(i18n.global.t('mc_scene.mc.required'))
      return true
    }

    if (item.content === null || item.content === '') {
      isError = true
      toast.error(i18n.global.t('mc_scene.content.required'))
      return true
    }

    if (item.content instanceof File && item.content.type !== 'audio/mpeg') {
      isError = true
      toast.error(i18n.global.t('mc_scene.content.invalid_format'))
      return true
    }
  })

  // Tổng thời gian của tất cả phân cảnh không > 30s
  audioDuration.value = 0
  forEach(scenes.value, (scene, key) => {
    audioDuration.value += Number(scene.duration)
  })

  if (audioDuration.value > maxFileDuration) {
    isError = true
    toast.error(i18n.global.t('mc_scene.limit_duration', {maxDuration: maxFileDuration}))
    return true
  }

  return isError
}

const showDialogForm = (ev, sceneId = null) => {
  if (sceneId !== null) {
    const index = findIndex(scenes.value, e => e.id === sceneId)
    dialogForm.name = scenes.value[index].name
    dialogForm.duration = scenes.value[index].duration
    dialogForm.sceneIndex = index
    dialogForm.title = i18n.global.t('mc_scene.scene.info')
  } else {
    dialogForm.name = ''
    dialogForm.sceneIndex = null
    dialogForm.duration = 1
    dialogForm.title = i18n.global.t('mc_scene.scene.create')
  }

  dialogForm.visible = true
}

const showDialogDeleteScene = (ev, sceneId) => {
  dialogDeleteScene.sceneIndex = findIndex(scenes.value, e => e.id === sceneId)
  dialogDeleteScene.visible = true
}

const onSubmitDialogForm = () => {
  if (validateDialogForm()) return

  // Thay đổi thời gian của phân cảnh hoặc thêm phân cảnh mới
  if (dialogForm.sceneIndex !== null) {
    scenes.value[dialogForm.sceneIndex].duration = dialogForm.duration
    scenes.value[dialogForm.sceneIndex].name = dialogForm.name
    sceneName.value = dialogForm.name
  } else {
    // Cho phép tạo tối đa 10 phân cảnh
    if (countScene.value >= 10) {
      errorMessage.name = i18n.global.t('mc_scene.scene.max_scene')
      return
    }

    addScene()
    eventsBus.emit('changeScene', sceneTarget.value._id)
  }

  errorMessage.name = ''
  errorMessage.duration = ''
  dialogForm.visible = false
}

const validateDialogForm = () => {
  let isError = false
  errorMessage.name = ''
  errorMessage.duration = ''
  if (dialogForm.name.trim().length === 0) {
    errorMessage.name = i18n.global.t('mc_scene.scene.name_required')
    isError = true
  }

  if (dialogForm.duration <= 0) {
    errorMessage.duration = i18n.global.t('mc_scene.scene.min_duration')
    isError = true
  }

  if (dialogForm.duration > maxFileDuration) {
    errorMessage.duration = i18n.global.t('mc_scene.scene.max_duration', {maxDuration: maxFileDuration})
    isError = true
  }

  return isError
}

const onDeleteScene = () => {
  if (dialogDeleteScene.sceneIndex !== null) {
    const index = dialogDeleteScene.sceneIndex
    const layerId = scenes.value[index].id
    const lenScene = scenes.value.length
    const newSceneIndex = index === lenScene - 1 ? index - 1 : index

    // Xóa tên phân cảnh
    sceneName.value = ''

    // Xóa khỏi danh sách layer
    remove(layers.value, (item) => {
      return item._id === layerId
    })

    // Xóa khỏi store
    remove(state.state, (item) => {
      return item.id === layerId
    })

    // Xóa khỏi danh sách phân cảnh
    remove(scenes.value, (item, index) => {
      return index === dialogDeleteScene.sceneIndex
    })

    // Chuyển phân cảnh
    if (lenScene > 1) handleChangeScene('', scenes.value[newSceneIndex].id)
    else {
      stage.value.removeChildren()
      sceneTarget.value = null
    }

    countScene.value === 0 ? countScene.value : countScene.value -= 1
  }

  dialogDeleteScene.visible = false
}

const setStage = () => {
  stage.value = new Konva.Stage({
    container: 'container',
    width: canvas.width,
    height: canvas.height,
  })

  const container = stage.value.container()
  container.tabIndex = 1
  container.focus()
  container.addEventListener('keydown', function (e) {
    e.preventDefault()
    if (e.code === 'Delete') {
      // Xóa image decorate
      if (imageDecorateTarget.value) {
        const tr = imageDecorateTarget.value.node
        store.dispatch(ACTION_DELETE_IMAGE_DECORATE, {
          sceneId: sceneTarget.value._id,
          nodeId: tr._nodes[0]._id
        })

        tr._nodes[0].remove()
        tr.remove()
      } else if (backgroundTarget.value) {
        // Xóa background image
        deleteBackground()
      } else if (artistTarget.value) {
        // Xóa artist
        deleteArtist()
      } else if (transformTarget.value) {
        // Xóa textNode
        const tr = transformTarget.value
        tr._nodes[0].remove()
        tr.remove()
      }

      convertCanvasToImg()
    }
  });

  stage.value.on('click tap', (ev) => {
    // Bỏ focus image decorate khi click ra ngoài
    if (!ev.target.hasName('imageDecorate')) {
      imageDecorateTarget.value = null
      const imageSelected = sceneTarget.value.findOne('.imageDecorateTransformerSelected')
      if (imageSelected !== undefined) {
        imageSelected.setAttrs({
          enabledAnchors: [],
          borderEnabled: false
        })
        imageSelected.removeName('imageDecorateTransformerSelected')
      }
    }

    // Bỏ focus textNode khi click ra ngoài
    if (ev.target.constructor.name !== "Text" && transformTarget.value) {
      const textNodeSelected = sceneTarget.value.findOne('.textNodeTransformerSelected')
      if (textNodeSelected !== undefined) {
        textNodeSelected.setAttrs({borderEnabled: false, enabledAnchors: []})
        textNodeSelected.removeName('textNodeTransformerSelected')
      }

      // removeActiveTextNode(transformTarget.value)
      transformTarget.value = null
      convertCanvasToImg()
    }

    // Bỏ focus artist khi click ra ngoài
    if (!ev.target.hasName('artistNode')) {
      artistTarget.value = null
      sceneTarget.value.children[2].setAttrs({
        enabledAnchors: [],
        borderEnabled: false
      })
    }

    // Bỏ event xóa background khi focus vào một node khác
    if (sceneTarget.value && ev.target._id !== sceneTarget.value.children[0]._id) {
      backgroundTarget.value = null
    }
  })
}

const dragOver = (ev) => {
  ev.dataTransfer.dropEffect = "move";
}

const getScene = async (projectId) => {
  await clearScene()
  const {data} = await VirtualHumanService.getScenes(projectId)
  if (data) {
    let key = 0
    for(const item of data.data) {
      // Set name và duration của từng phân cảnh
      dialogForm.name = item.scene.name
      dialogForm.duration = Number(item.scene.duration)
      addScene()

      if (isStage.value) stage.value.hide()

      // Lấy video nếu trước đó đã gen video thành công
      genVideo.url = item.video_path

      // Set artist
      if (item.artist.info !== null) {
        setArtist(item.artist.info.image_path, item.artist.info, item.artist.attrs, 'edit')
      }

      // Set background
      await setBackgroundImg(item.background.img)

      // Set text node
      forEach(item.text_nodes.attrs, (textNodeAttr) => {
        setTextNode(textNodeAttr)
      })

      // Set image decorate
      for(const image of item.images_decorate) {
        await setImageDecorate(image.image_path, image.attrs)
      }

      // Set voice content
      await store.dispatch(ACTION_SET_CONTENT_TYPE, item.voice.type)
      await store.dispatch(ACTION_SET_CONTENT, item.voice.content)
      await store.dispatch(ACTION_SET_VOICE_CONTENT, {voiceRegion: item.voice.region, voiceContent: item.voice.name})
      await eventsBus.emit('changeScene', sceneTarget.value._id)

      scenes.value[key].preview = item.scene.preview
      key += 1
    }
    if (isStage.value) stage.value.show()
    countScene.value = key
  }
}

// Trường hợp đang edit project và đổi sang project khác
// Xóa toàn bộ thông tin về project đang edit
const clearScene = async () => {
  await store.dispatch(ACTION_CLEAR_DATA)
  sceneTarget.value = null
  scenes.value = []
  layers.value = []
  genVideo.url = ''
  sceneName.value = ''
  canvas.background = `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTI2IiBoZWlnaHQ9IjEyNiI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik0xMjYgMHYyMS41ODRMMjEuNTg0IDEyNkgwdi0xNy41ODVMMTA4LjQxNSAwSDEyNlptMCAxMDguNDE0VjEyNmgtMTcuNTg2TDEyNiAxMDguNDE0Wm0wLTg0djM5LjE3MUw2My41ODUgMTI2SDI0LjQxNEwxMjYgMjQuNDE0Wm0wIDQydjM5LjE3TDEwNS41ODQgMTI2aC0zOS4xN0wxMjYgNjYuNDE0Wk0xMDUuNTg2IDAgMCAxMDUuNTg2VjY2LjQxNUw2Ni40MTUgMGgzOS4xNzFabS00MiAwTDAgNjMuNTg2VjI0LjQxNUwyNC40MTUgMGgzOS4xNzFabS00MiAwTDAgMjEuNTg2VjBoMjEuNTg2WiIvPjwvZGVmcz48dXNlIHhsaW5rOmhyZWY9IiNhIiBmaWxsPSIjODg4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')`
  canvas.opacity = 0.2
  if (isStage.value) stage.value.removeChildren()
}

const resizeScreen = () => {
  if (window.innerWidth >= 1150 && window.innerWidth <= 1250) {
    artistAttr.value.width /= 1.2
    artistAttr.value.height /= 1.2
    canvas.width /= 1.2
    canvas.height /= 1.2
  }
}

const clearError = () => {
  errorMessage.name = ''
  errorMessage.duration = ''
}

onMounted(() => {
  resizeScreen()

  // Lắng nghe các event
  eventsBus.on('selectProject', (item) => {
    getScene(item._id)
  })

  eventsBus.on('selectArtist', (item) => {
    if (isStage.value === false) return
    setArtist(item.image_path, item, artistAttr.value)
    convertCanvasToImg()
  })

  eventsBus.on('selectText', () => {
    if (isStage.value === false) return
    setTextNode(textAttr.value)
    convertCanvasToImg()
  })

  eventsBus.on('selectBackground', (imgUrl) => {
    if (isStage.value === false) return
    setBackgroundImg(imgUrl)
    convertCanvasToImg()
  })

  eventsBus.on('selectImageDecorate', (imgUrl) => {
    if (isStage.value === false) return
    setImageDecorate(imgUrl)
    convertCanvasToImg()
  })

  eventsBus.on('removeImageAsset', (item) => {
    if (sceneTarget.value) {
      // Xóa background image trong phân cảnh khi bị xóa khỏi "Kho ảnh"
      if (sceneTarget.value.children[0].image() !== undefined) {
        const src = sceneTarget.value.children[0].image().src
        if (item[0].url === src) {
          sceneTarget.value.children[0].image(new Image())

          // Lưu thông tin background trong phân cảnh
          store.dispatch(ACTION_SET_BACKGROUND, {
            sceneId: sceneTarget.value._id,
            url: ''
          })
        }
      }

      // Xóa các image decorate trong phân cảnh khi bị xóa khỏi "Kho ảnh"
      const imagesDecorate = sceneTarget.value.find('.imageDecorate')
      forEach(imagesDecorate, (imageDecorate) => {
        const src = imageDecorate.image().src
        if (item[0].url === src) {
          imageDecorate.remove()
          if (imageDecorateTarget.value) {
            imageDecorateTarget.value.node.remove()
          }
          imageDecorate.image(new Image())

          // Lưu thông tin image decorate trong phân cảnh
          store.dispatch(ACTION_DELETE_IMAGE_DECORATE, {
            sceneId: sceneTarget.value._id,
            nodeId: imageDecorate._id
          })
        }
      })

      convertCanvasToImg()
    }
  })
})
</script>

<style scoped lang="scss">
#container {
  border: 1px solid rgba(181, 180, 180, 0.5);
  background-repeat: no-repeat;
  background-position: center center;
}

.scene-item {
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 132px;
  height: 132px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid rgba(35, 40, 51, 0.1);

  .background {
    width: 100%;
    height: 80%;
    opacity: 1;
    object-position: center;
    object-fit: contain;
  }

  .order-number {
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 1.5px 4px;
    border-radius: 4px;
    background-color: #ffffff;
  }

  .duration {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    padding: 0 8px;
    gap: 12px;
    border-radius: 4px;
    background-color: #ffffff;
  }

  .add-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.scene-scroll {
  background-color: rgb(249, 249, 249);
  border-radius: 8px;
  padding: 12px
}

.scene-example {
  cursor: pointer;
}

#scene-box {
  margin-top: 12px;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 24px;
}

.scene-active {
  border-color: rgb(238, 0, 51);
}
</style>