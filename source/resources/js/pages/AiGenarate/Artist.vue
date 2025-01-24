<template>
  <div class="row">
    <div class="col-12">
      <el-scrollbar>
        <div class="scrollbar-flex-content">
          <p v-for="item in list" :key="item.key" class="scrollbar-demo-item">
            {{ item.label }}
          </p>
        </div>
      </el-scrollbar>
    </div>
    <el-button @click="addDiv">Add</el-button>
  </div>
<!--  <div class="row">-->
<!--    <div class="col-12 pt-2">-->
<!--      <div class="mb-3">-->
<!--        <p>Tên mc</p>-->
<!--        <el-input v-model="artistName" style="width: 240px" placeholder="Nhập thông tin" />-->
<!--      </div>-->
<!--      <div class="mb-3">-->
<!--        <p>Mã code</p>-->
<!--        <el-input v-model="artistCode" style="width: 240px" placeholder="Nhập thông tin" />-->
<!--      </div>-->
<!--      <div v-if="isUpload">-->
<!--        <img :src="imageUpload" alt="image" style="width: 240px">-->
<!--      </div>-->
<!--      <div v-else>-->
<!--        <p>Hình ảnh</p>-->
<!--        <el-upload-->
<!--            ref="upload"-->
<!--            class="upload-demo"-->
<!--            drag-->
<!--            action="https://jsonplaceholder.typicode.com/posts/"-->
<!--            :auto-upload="false"-->
<!--            :limit="1"-->
<!--            :on-change="checkUpload"-->
<!--            style="width: 240px"-->
<!--        >-->
<!--          <div class="el-upload__text d-flew flex-column">-->
<!--            <div><image-icon /></div>-->
<!--            <div id="description-upload">Kéo thả file hoặc click để tải ảnh</div>-->
<!--          </div>-->
<!--        </el-upload>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script setup>
import {ref} from 'vue'
import ImageIcon from "../../components/icons/Image.vue";
import VirtualHumanService from "~/services/VirtualHumanService";

const list = ref([
  {
    key: 1,
    label: "div 1"
  },
  {
    key: 2,
    label: "div 2"
  },
  {
    key: 3,
    label: "div 3"
  }

])

const imageUpload = ref(null)
const isUpload = ref(false)
const artistName = ref('')
const artistCode = ref('')
const artistImage = ref(null)

const checkUpload = async (uploadFile) => {
  const formData = new FormData();
  imageUpload.value = URL.createObjectURL(uploadFile.raw)
  isUpload.value = true
  formData.append('params', JSON.stringify({
        name: artistName.value,
        code: artistCode.value
      })
  )
  formData.append('image', uploadFile.raw)
  await VirtualHumanService.storeArtist(formData)
}

const handDragover = (ev, key) => {
  console.log(ev.target, key)
}

const handleDragstart = (e) => {
  e.target.classList.add('dragging');
  setTimeout(() => e.target.style.display = 'none', 0);
}

const handleDrop = (e) => {
  console.log(e.target.getBoundingClientRect())
}

const addDiv = () => {
  list.value.push({
    key: 4,
    label: "div 4"
  })
}
</script>
<style scoped lang="scss">
p {
  margin-bottom: 4px;
  font-weight: bold;
  font-size: 15px;
}

.permission-container {
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding: 10px;
  max-width: 100%;
}

#description-upload {
  font-size: 13px;
  font-family: "FS Magistral Medium Italic", sans-serif;
  color: #B5B4B4;
}


.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid #ccc;
}

.draggable-div {
  width: 100px;
  height: 50px;
  margin: 10px;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #000;
}

.dragging {
  opacity: 0.5;
}

.placeholder {
  width: 100px;
  height: 50px;
  margin: 10px;
  background-color: #f0f0f0;
  border: 1px dashed #000;
}

.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
</style>