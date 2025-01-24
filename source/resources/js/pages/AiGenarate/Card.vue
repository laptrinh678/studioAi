<template>
  <div class="cardContainer">
    <div class="card">
      <div class="d-flex flex-column gap-4 w-100">
        <div class="w-100 text-center" style="height: 202px" @click="emits('showDialog')">
          <el-image class="h-100" :src="data.result_path" fit="cover" />
        </div>
        <div class="d-flex gap-4 justify-content-center text-white">
          <div class="d-flex gap-2 align-items-center">
            <copy-icon color="#ffffff" width="20" height="20" />
            <p class="m-0">{{ data.reused }}</p>
          </div>
          <div class="d-flex gap-2 align-items-center">
            <view-icon color="#ffffff" width="20" height="20" />
            <p class="m-0">{{ data.views }}</p>
          </div>
          <div class="d-flex gap-2 align-items-center" @click="emits('like')">
            <like-icon :color="data.action.includes('like') ? '#ee0033' : '#ffffff'" width="20" height="20" />
            <p class="m-0">{{ data.likes }}</p>
          </div>
          <div class="d-flex gap-2 align-items-center" @click="emits('showShareLink')">
            <share-icon color="#ffffff" width="20" height="20" />
            <p class="m-0">{{ data.shares }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LikeIcon from "../../components/icons/Like.vue";
import CopyIcon from "../../components/icons/Copy.vue";
import ShareIcon from "../../components/icons/Link.vue";
import ViewIcon from "../../components/icons/View.vue";

const props = defineProps({
  data: {
    type: Object,
    default: {
      result_path: '',
      reused: 0,
      views: 0,
      likes: 0,
      shares: 0,
      action: ''
    }
  },
})
const emits = defineEmits(["showDialog", "showShareLink", "view", "like"])
</script>

<style scoped lang="scss">
.cardContainer {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  border-radius: 10px;
  backdrop-filter: blur(30px);
  background-color: rgba(65, 65, 65, 0.308);
  border: 1px solid rgba(255, 255, 255, 0.089);
  cursor: pointer;
}

.city {
  font-weight: 700;
  font-size: 0.9em;
  letter-spacing: 1.2px;
  color: white;
}

.weather {
  font-weight: 500;
  font-size: 0.7em;
  letter-spacing: 1.2px;
  color: rgb(197, 197, 197);
}

.temp {
  font-size: 1.8em;
  color: white;
}

.minmaxContainer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.min,
.max {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 0 20px;
  gap: 4px;
}

.max {
  align-items: flex-start;
  border-left: 2px solid white;
}

.maxHeading,
.minHeading {
  font-size: 0.7em;
  font-weight: 600;
  color: white;
}

.maxTemp,
.minTemp {
  font-size: 0.6em;
  font-weight: 500;
  color: rgb(197, 197, 197);
}

//.cardContainer::before {
//  width: 100px;
//  height: 100px;
//  content: "";
//  position: absolute;
//  background-color: rgb(144, 161, 255);
//  z-index: -1;
//  border-radius: 50%;
//  left: 100px;
//  top: 50px;
//  transition: all 1s;
//}
</style>