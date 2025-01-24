<template>
  <div class="select-option">
    <div class="flex align-items-center">
      <p>{{ title }}</p>
      <div style="margin-left: 4px" v-if="hintMessage"><hint :message="hintMessage" /></div>
    </div>
    <el-select v-model="model" placeholder="Chọn loại" size="large" @change="updateModel($event)" :suffix-icon="CaretDown">
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
import Hint from "../common/Hint.vue";
import CaretDown from "../icons/CaretDown.vue";

export default {
  components: { Hint, CaretDown },
  props: {
    title: "",
    hintMessage: "",
    model: {
      label: "",
      value: ""
    },
    options: [],
  },

  setup(props, { emit }) {
    const updateModel = (newValue) => {
      // Emit the updated model to the parent component
      emit('update:model', newValue); // Use the full `update:model` event for Vue reactivity
    };

    return {
      updateModel, // Expose the update function
      CaretDown
    };
  },
};
</script>

<style lang="scss">
.select-option {
  p {
    font-family: "FS Magistral Medium", sans-serif;
    font-size: 13px;
    color: #44494d;
    padding: 12px 0;
    margin: 0;
  }
  .el-select {
    width: 100%;
  }
}
</style>