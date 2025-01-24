<template>
  <div class="d-flex flex-column" style="gap: 28px">
    <div class="w-100">
      <div class="option-title">{{ $t('mc_scene.mc.list') }}</div>
    </div>
    <div class="w-100">
      <div class="main-container">
        <div class="artist-container" v-for="item in artists">
          <div class="image-container">
            <img :src="item.image_path" alt="image" style="cursor: pointer"
                 @click="handleClick($event, item)"
                 @dragstart="handleDragstart($event, item)"
            >
          </div>
          <div class="title-container">
            <div class="title">
              <p class="m-0 text-dark">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import {useEventsBus} from "../../../helpers/eventBus";
import VirtualHumanService from "../../../services/VirtualHumanService";

const eventBus = useEventsBus()
const artists = ref(null)

const handleClick = (ev, item) => {
  eventBus.emit('selectArtist', item)
}

const handleDragstart = (ev, item) => {
  ev.dataTransfer.setData('dragArtist', JSON.stringify(item))
}

const getArtists = async () => {
  const {data} = await VirtualHumanService.getArtists()
  if (data) {
    artists.value = data.data
  }
}

onBeforeMount(() => {
  getArtists()
})
</script>

<style scoped lang="scss">
.main-container {
  position: relative;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2,minmax(50px,1fr));
  padding: 0;
}

.artist-container {
  position: relative;
  height: 200px;
  width: 100%;

  .image-container {
    border-radius: 8px;
    height: 100%;
  }

  .title-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 8px;

    .title {
      padding: 6px;
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 4px;
      text-align: center;
      font-size: 13px;
      font-family: "FS Magistral Medium", sans-serif;
      color: #ffffff;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center center;
    border-radius: inherit;
  }
}

.option-title {
  font-size: 16px;
  font-family: "FS Magistral Bold", sans-serif;
  color: #ee0033;
}
</style>