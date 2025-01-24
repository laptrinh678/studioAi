<template>
  <slot name="title"></slot>

  <div class="user-prompt">
    <slot name="filter"></slot>

    <div class="d-flex flex-column gap-3 mt-3">
      <slot name="table"></slot>

      <div v-if="totalPage > perPage">
        <el-config-provider :locale="lang">
          <el-pagination
              v-model:current-page="currenPage"
              v-model:page-size="perPage"
              :page-sizes="[10, 20, 30, 40, 50, 100]"
              size="small"
              background
              layout="total, sizes, prev, pager, next"
              :total="totalPage"
              class="mt-4"
              @current-change="changePage"
              @size-change="changePerPage"
          />
        </el-config-provider>
      </div>
    </div>
  </div>
</template>

<script setup>
import vi from 'element-plus/es/locale/lang/vi'
import en from 'element-plus/es/locale/lang/en'
import {onMounted, ref} from "vue";
import Cookies from "js-cookie";

const props = defineProps({
  totalPage: {
    type: Number,
    default: 0
  },
  perPage: {
    type: Number,
    default: 10
  },
  currenPage: {
    type: Number,
    default: 1
  },
})
const emits = defineEmits(['changePage', 'changePerPage'])
const lang = ref(vi)

const changePage = async (page) => {
  emits('changePage', page)
}

const changePerPage = async (pageSize) => {
  emits('changePerPage', pageSize)
}

onMounted(() => {
  const locale = Cookies.get("locale") || 'vi'
  if (locale === 'vi') lang.value = vi
  else lang.value = en
})
</script>

<style scoped lang="scss">

</style>