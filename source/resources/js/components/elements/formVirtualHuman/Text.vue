<template>
  <div class="d-flex flex-column" style="gap: 28px">
    <div class="w-100">
      <div class="option-title">{{ $t('mc_scene.text.title') }}</div>
    </div>

    <div class="w-100">
      <div class="main-container">
        <div class="d-flex flex-column" style="gap: 12px">
          <div class="add-text-container" draggable="true"
               @dragstart="handleDragStart($event, item)"
               @click="handleClick"
               v-for="item in texts"
          >
            <div class="title" :style="`font-family: ${item.style.fontFamily}; color: ${item.style.color}`">
              {{ item.title }}
            </div>
          </div>
        </div>
<!--        <div>-->
<!--          <div class="example-text-container">-->
<!--            <div class="title">Danh sách mẫu nội dung</div>-->
<!--            <div class="content">-->
<!--              <div class="box">-->
<!--                <div class="box-content">Mẫu nội dung 01</div>-->
<!--              </div>-->
<!--              <div class="box">-->
<!--                <div class="box-content">Mẫu nội dung 02</div>-->
<!--              </div>-->
<!--              <div class="box">-->
<!--                <div class="box-content">Mẫu nội dung 03</div>-->
<!--              </div>-->
<!--              <div class="box">-->
<!--                <div class="box-content">Mẫu nội dung 04</div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useEventsBus} from "../../../helpers/eventBus";
import i18n from "../../../lang/i18n"

const texts = ref([
  // {style: {fontFamily: 'FS Magistral Bold', color: '#000000'}, title: "Thêm tiêu đề"},
  // {style: {fontFamily: 'FS Magistral Medium', color: '#44494d'}, title: "Thêm tiêu đề"},
  {style: {fontFamily: 'FS Magistral Book', color: '#44494d'}, title: i18n.global.t('mc_scene.text.create')},
])

const eventBus = useEventsBus()

const handleDragStart = (ev, item) => {
  ev.dataTransfer.setData('dragText', item)
}

const handleClick = (ev) => {
  eventBus.emit('selectText')
}
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
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

.background-item {
  width: 100%;
  height: 138px;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 13px;
  font-family: "FS Magistral Medium", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-text-container {
  padding: 0 24px;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  cursor: pointer;
}

.title {
  font-size: 14px;
  letter-spacing: 0.04em;
}

.example-text-container {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title {
    color: #44494d;
    font-family: "FS Magistral Bold", sans-serif;
  }

  .content {
    display: grid;
    grid-template-columns: repeat(2,minmax(50px,1fr));
    gap: 12px;

    .box {
      background-color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      padding: 0 24px;
      height: 138px;
    }

    .box-content {
      font-size: 13px;
      font-family: "FS Magistral Medium", sans-serif;
      color: #44494d;
    }
  }
}
</style>