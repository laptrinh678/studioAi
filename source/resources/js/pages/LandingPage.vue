<template>
  <div class="w-100">
    <div class="sections-menu">
      <span class="menu-point" :class="{active: activeSection === index}"
            @click="scrollToSection(index)"
            v-for="(offset, index) in offsets"
            :key="index"
      >
      </span>
    </div>
<!--    <section class="fullpage red">-->
<!--      <h1>AI Studio</h1>-->
<!--      <p>by <a href="#" target="_blank">Viettel</a></p>-->
<!--    </section>-->
    <section class="fullpage black d-flex flex-column gap-5">
      <transition name="fade">
        <div class="d-grid gap-5 justify-content-center" v-if="isVisible" style="grid-template-columns: repeat(4, minmax(50px, 1fr));width: 80%">
          <card-component
              @show-dialog="handleDialog(item._id)"
              @show-share-link="showShareLink(item._id)"
              @like="handleInteraction(item._id, 'like')"
              :data="item"
              v-for="item in dataShared"
          />
        </div>
      </transition>
    </section>
    <section class="fullpage red">
      <h1>Section 3</h1>
    </section>
  </div>

  <!-- Dialog info -->
  <el-dialog v-model="visibleDialog" :title="$t('user_management.detail_info')" width="68%">
    <div class="d-flex gap-5">
      <div class="w-75 text-center" style="height: 55vh">
        <el-image class="h-100" :src="detailShared.result_path" fit="cover" />
      </div>
      <div class="d-flex flex-column gap-5">
        <div class="d-flex gap-5 align-items-center">
          <avatar-icon color="#ffffff" width="20" height="20" />
          <h3 class="m-0">{{ detailShared.user_name }}</h3>
        </div>
        <div class="d-flex gap-5 align-items-center">
          <copy-icon color="#ffffff" width="20" height="20" />
          <p class="m-0">{{ detailShared.reused }} {{ $t('landing_page.reused') }}</p>
        </div>
        <div class="d-flex gap-5 align-items-center">
          <view-icon color="#ffffff" width="20" height="20" />
          <p class="m-0">{{ detailShared.views }} {{ $t('landing_page.view') }}</p>
        </div>
        <div class="d-flex gap-5 align-items-center">
          <like-icon :color="detailShared.action.includes('like') ? '#ee0033' : '#ffffff'" width="20" height="20" />
          <p class="m-0">{{ detailShared.likes }} {{ $t('landing_page.like') }}</p>
        </div>
        <div class="d-flex gap-5 align-items-center">
          <share-icon color="#ffffff" width="20" height="20" />
          <p class="m-0">{{ detailShared.shares }} {{ $t('landing_page.share') }}</p>
        </div>
      </div>
    </div>
    <div class="mt-3 d-flex justify-content-center">
      <el-button type="danger" @click="handleReUse">{{ $t('landing_page.clone').toUpperCase() }}</el-button>
    </div>
  </el-dialog>

  <!-- Dialog share link -->
  <el-dialog v-model="visibleShareLink" :title="$t('landing_page.share_link')" width="40%">
    <div class="d-flex flex-column gap-5">
      <div class="d-flex gap-4">
        <div>URL</div>
        <el-input readonly v-model="shareLink"></el-input>
      </div>
      <div class="d-flex gap-4 justify-content-center">
        <el-button type="danger" @click="copyLink">Copy link</el-button>
        <el-button type="info">Đóng</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CopyIcon from "../components/icons/Copy.vue"
import ViewIcon from "../components/icons/View.vue"
import LikeIcon from "../components/icons/Like.vue"
import ShareIcon from "../components/icons/Link.vue"
import AvatarIcon from "../components/icons/Avatar.vue"
import CardComponent from "../pages/AiGenarate/Card.vue"
import AiGenerateService from "../services/AiGenarate"
import {find} from "lodash";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {ACTION_STORE_DATA_GENERATED} from "../store/common/actions";

const router = useRouter()
const store = useStore()
const visibleDialog = ref(false)
const visibleShareLink = ref(false)
const isVisible = ref(true)
const isCopied = ref(false)
const inMove = ref(false)
const dataShared = ref([])
const detailShared = ref([])
const inMoveDelay = 500
const activeSection = ref(0)
const offsets = ref([])
const touchStartY = ref(0)
const shareLink = ref('')

// Calculate the offsets of each section
const calculateSectionOffsets = () => {
  const sectionElements = document.getElementsByTagName('section')
  offsets.value = Array.from(sectionElements).map(section => section.offsetTop)
}

const handleMouseWheel = (e) => {
  if (e.wheelDelta < 30 && !inMove.value && activeSection.value < 2) {
    moveUp()
  } else if (e.wheelDelta > 30 && !inMove.value && activeSection.value > 0) {
    moveDown()
  }

  e.preventDefault()
}

const moveDown = () => {
  inMove.value = true
  activeSection.value--
  if (activeSection.value < 0) activeSection.value = offsets.value.length - 1
  scrollToSection(activeSection.value, true)
}

const moveUp = () => {
  inMove.value = true
  activeSection.value++
  if (activeSection.value > offsets.value.length - 1) activeSection.value = 0
  scrollToSection(activeSection.value, true)
}

// Scroll to the target section
const scrollToSection = (id, force = false) => {
  if (inMove.value && !force) return
  activeSection.value = id
  inMove.value = true

  const section = document.getElementsByTagName('section')[id]
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
    isVisible.value = true
  }

  setTimeout(() => {
    inMove.value = false
  }, inMoveDelay)
}

// Handle touch start event
const touchStart = (e) => {
  e.preventDefault()
  touchStartY.value = e.touches[0].clientY
}

// Handle touch move event
const touchMove = (e) => {
  if (inMove.value) return
  e.preventDefault()

  const currentY = e.touches[0].clientY

  if (touchStartY.value < currentY) {
    moveDown()
  } else {
    moveUp()
  }

  touchStartY.value = 0
}

const showShareLink = (id) => {
  detailShared.value = find(dataShared.value, (i) => {
    return i._id === id
  })
  visibleShareLink.value = true
  shareLink.value = detailShared.value.result_path
}

const copyLink = async () => {
  await navigator.clipboard.writeText(shareLink.value)
  isCopied.value = true

  await handleInteraction(detailShared.value._id, 'share')
}

const handleDialog = (id) => {
  visibleDialog.value = true
  detailShared.value = find(dataShared.value, (i) => {
    return i._id === id
  })

  handleInteraction(id, 'view')
}

const handleInteraction = async (id, action) => {
  const listAction = {
    reuse: 'reused',
    view: 'views',
    like: 'likes',
    share: 'shares',
  }
  const detail = find(dataShared.value, (i) => {
    return i._id === id
  })

  if (!detail.action.includes(action)) {
    detail.action.push(action)
    detail[listAction[action]] = detail[listAction[action]] + 1
    const formData = new FormData()
    formData.append('share_id', id)
    formData.append('action', action)
    await AiGenerateService.interaction(formData)
  }
}

const getDataShared = async () => {
  const data = await AiGenerateService.getShareGenerated()
  if (data.status === 200) {
    dataShared.value = data.data
  }
}

const handleReUse = async () => {
  await handleInteraction(detailShared.value._id, 'reuse')
  await store.dispatch(ACTION_STORE_DATA_GENERATED, detailShared.value)
  await router.push({name: 'AI Studio'})
}

onMounted(() => {
  getDataShared()
  calculateSectionOffsets()
  window.addEventListener('mousewheel', handleMouseWheel, { passive: false })
  window.addEventListener('touchstart', touchStart, { passive: false })
  window.addEventListener('touchmove', touchMove, { passive: false })
})

onBeforeUnmount(() => {
  window.removeEventListener('mousewheel', handleMouseWheel, { passive: false })
  window.removeEventListener('touchstart', touchStart)
  window.removeEventListener('touchmove', touchMove)
})
</script>

<style scoped>
body {
  margin: 0;
  color: #FFF;
  font-family: Helvetica, arial, sans-serif;
  overflow: hidden;
}

h2 {
  position: fixed;
}

.fullpage {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h1 {
  font-size: 6em;
  margin: 0;
  text-align: center;
  padding: 0 1rem;
}

p {
  font-size: 1em;
}

.fullpage a, .fullpage span {
  text-decoration: none;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  color: #FFF;
  margin-left: 5px;
}

.red {
  background-color: #ab4545;
}

section.black {
  background-color: #212121;
}

.blue {
  background-color: #237ad4;
}

.green {
  background-color: #5E9F6D;
}

.purple {
  background-color: #42325B;
}

h1.black {
  color: #000;
}

.sections-menu {
  position: fixed;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.sections-menu .menu-point {
  width: 10px;
  height: 10px;
  background-color: #FFF;
  display: block;
  margin: 1rem 0;
  opacity: .6;
  transition: .4s ease-in-out all;
  cursor: pointer;
}

.sections-menu .menu-point.active {
  opacity: 1;
  transform: scale(1.5);
}

.sections-menu .menu-point:hover {
  opacity: 1;
  transform: scale(1.2);
}

@media screen and (max-width: 1200px) {
  h1 {
    font-size: 2.5em;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>