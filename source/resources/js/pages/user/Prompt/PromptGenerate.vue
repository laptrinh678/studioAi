<template>
  <form-table
      :curren-page="currenPage"
      :per-page="perPage"
      :total-page="totalPage"
      @change-page="changePage"
      @change-per-page="changePerPage"
  >
    <template #title>
      <h1 class="h3 mb-3">{{ $t('user_management.user_prompt_management') }}</h1>
    </template>

    <template #filter>
      <div class="mt-3 d-flex flex-column gap-3">
        <div class="d-flex gap-3">
          <!-- Tìm kiếm theo địa chỉ email -->
          <div>
            <p class="form-title">{{ $t('user_management.email_info') }}</p>
            <el-input v-model="userEmail" :placeholder="$t('user_management.form.email_input')" />
          </div>

          <!-- Tìm kiếm theo thời gian -->
          <div>
            <p class="form-title">{{ $t('user_management.date_time') }}</p>
            <el-date-picker
                v-model="dateRange"
                type="daterange"
                :start-placeholder="$t('user_management.form.from_date')"
                :end-placeholder="$t('user_management.form.to_date')"
                format="DD/MM/YYYY"
                value-format="YYYY-MM-DD"
                style="width: 240px"
            />
          </div>

          <!-- Tìm kiếm theo kỹ thuật xử lý -->
          <div>
            <p class="form-title">{{ $t('user_management.type') }}</p>
            <el-select
                v-model="generateType"
                multiple
                collapse-tags
                collapse-tags-tooltip
                :placeholder="$t('user_management.placeholder_generate_type')"
                style="width: 200px"
            >
              <el-option v-for="item in generateOption" :key="item" :value="item" :label="item"/>
            </el-select>
          </div>

          <!-- Tìm kiếm theo nội dung prompt -->
          <div>
            <p class="form-title">{{ $t('user_management.prompt_content') }}</p>
            <el-input v-model="prompt" :placeholder="$t('user_management.form.prompt_input')" />
          </div>

          <!-- Tìm kiếm theo thời gian xử lý -->
          <div>
            <p class="form-title">{{ $t('user_management.time') }}</p>
            <div class="d-flex gap-2">
              <el-input-number
                  :min="0"
                  v-model="timeStart"
                  controls-position="right"
                  size="default"
                  style="width: 80px"
                  @keydown="blockKeys"
              />
              <div>-</div>
              <el-input-number
                  :min="0"
                  v-model="timeEnd"
                  controls-position="right"
                  size="default"
                  style="width: 80px"
                  @keydown="blockKeys"
              />
            </div>
            <div v-if="isTimeError" class="error">{{ $t('user_management.time_error') }}</div>
          </div>

          <!-- Tìm kiếm theo mã trạng thái -->
          <div>
            <p class="form-title">{{ $t('user_management.status_code') }}</p>
            <el-select
                v-model="statusCode"
                multiple
                collapse-tags
                collapse-tags-tooltip
                :placeholder="$t('user_management.placeholder_status_code')"
                style="width: 150px"
            >
              <el-option v-for="item in statusCodeOption" :key="item" :value="item" :label="item"/>
            </el-select>
          </div>
        </div>
        <div>
          <el-button
              @click="onSearch"
              class="button_submit"
              type="danger"
          >{{ $t('common.search') }}
          </el-button>
        </div>
      </div>
    </template>

    <template #table>
      <div>
        <el-table :data="userData" border style="width: 100%" :empty-text="$t('user_management.no_data')">
          <el-table-column prop="date" :label="$t('user_management.day')" min-width="10"/>
          <el-table-column prop="email" :label="$t('user_management.email')" min-width="14"/>
          <el-table-column prop="type" :label="$t('user_management.type')" min-width="9"/>
          <el-table-column prop="prompt_original" :label="$t('user_management.prompt_original')" min-width="17"/>
          <el-table-column prop="prompt_open_ai" :label="$t('user_management.prompt_open_ai')" min-width="17"/>
          <el-table-column prop="prompt" :label="$t('user_management.prompt_translate')" min-width="17"/>
          <el-table-column prop="execute_time" :label="$t('user_management.execute_time')" min-width="5"/>
          <el-table-column prop="status_code" :label="$t('user_management.status_code')" min-width="5">
            <template #default="scope">
              <el-tag :type="scope.row.status_code === 200 ? 'success' : 'warning'" disable-transitions>{{ scope.row.status_code }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="" min-width="5">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="showDetail(scope.row.id)">{{ $t('common.detail') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <p v-if="userData === []">{{ $t('user_management.no_data') }}</p>
      </div>
    </template>
  </form-table>

  <!-- Dialog show detail -->
  <dialog-detail :dialog-visible="dialogVisible" :user-detail="userDetail" @close-dialog="dialogVisible = false" />
</template>

<script setup>
import {onMounted, ref} from "vue";
import {ElLoading} from "element-plus";
import {AdminService} from "../../../services";
import {findIndex} from "lodash";
import FormTable from "../FormTable.vue";
import DialogDetail from "./DialogDetail.vue";
import i18n from "../../../lang/i18n";

const prompt = ref('')
const isTimeError = ref(false)
const dialogVisible = ref(false)
const totalPage = ref(0)
const perPage = ref(10)
const currenPage = ref(1)
const timeStart = ref(0)
const timeEnd = ref(0)
const userEmail = ref('')
const dateRange = ref([])
const userData = ref([])
const statusCode = ref([])
const statusCodeOption = ref(['200', '500', '502', '503', '504'])
const generateType = ref([])
const generateOption = ref([
    'Text To Image',
    'Image To Image',
    'In Painting',
    'Sketch',
    'Video'
])
const userDetail = ref(null)

const getPrompts = async () => {
  userData.value = []
  const loading = ElLoading.service({
    lock: true,
    text: i18n.global.t('common.loading'),
    background: 'rgba(0, 0, 0, 0.7)',
  })

  const time = [timeStart.value, timeEnd.value]
  const query = `email=${userEmail.value}&date=${dateRange.value}&page=${currenPage.value}&perPage=${perPage.value}&type=${generateType.value.join(',')}&statusCode=${statusCode.value.join(',')}&prompt=${prompt.value}&time=${time.join(',')}`
  const users = await AdminService.listUserPrompt(query)
  if (users.status === 200) {
    totalPage.value = users.data.total
    perPage.value = users.data.per_page

    const data = users.data.data
    Object.keys(data).map(async (key) => {
      userData.value.push({
        id: users.data.data[key]['_id'].$oid,
        email: users.data.data[key]['email'],
        prompt: users.data.data[key]['prompt'],
        negative_prompt: users.data.data[key]['negative_prompt'],
        guidance_scale: users.data.data[key]['guidance_scale'],
        image_width: users.data.data[key]['image_width'],
        image_height: users.data.data[key]['image_height'],
        num_images: users.data.data[key]['num_images'],
        prompt_styles: JSON.stringify(users.data.data[key]['prompt_styles']),
        seed: users.data.data[key]['seed'],
        date: await convertDate(users.data.data[key]['created_at']),
        name_voice: users.data.data[key]['name_voice'],
        name_mc: users.data.data[key]['name_mc'],
        type: users.data.data[key]['type'],
        prompt_original: users.data.data[key]['prompt_original'],
        prompt_open_ai: users.data.data[key]['prompt_open_ai'],
        execute_time: users.data.data[key]['execute_time'],
        status_code: users.data.data[key]['status_code'],
      })
    })
  }

  loading.close()
}

const convertDate = async (mongoDate) => {
  const timestamp = Number(mongoDate.$date.$numberLong);
  const jsDate = new Date(timestamp);

  // Format the date as YYYY-MM-DD using Vietnam's timezone (GMT+7)
  const formatDate = jsDate.toLocaleDateString('vi-VN', {hour: '2-digit', minute: '2-digit', second: '2-digit' }).split(' ')
  return formatDate[1] + ' ' + formatDate[0]
}

const onSearch = async () => {
  if (!isValidTime()) {
    return false
  }

  isTimeError.value = false
  currenPage.value = 1
  await getPrompts(currenPage.value)
}

const isValidTime = () => {
  if (timeStart.value < 0 || timeEnd.value < 0 || timeStart.value > timeEnd.value) {
    isTimeError.value = true
    return false
  }

  return true
}

const blockKeys = (ev) => {
  if (['Space', 'Minus', 'Period'].includes(ev.code)) ev.preventDefault()
}

const showDetail = async (id) => {
  dialogVisible.value = true

  const index = findIndex(userData.value, (item) => item.id === id)
  userDetail.value = userData.value[index]
}

const changePage = async (page) => {
  currenPage.value = page
  await getPrompts(page)
}

const changePerPage = async (pageSize) => {
  perPage.value = pageSize
  currenPage.value = 1
  await getPrompts()
}

onMounted(() => {
  getPrompts()
})
</script>

<style scoped lang="scss">
.form-title {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #44494d;
  font-family: "FS Magistral Book", sans-serif;
}
</style>