<template>
  <h1 class="h3 mb-3">{{ $t('user_management.permission_management') }}</h1>
  <div class="row user-management">
    <div class="col-12 pt-2 mb-3 d-flex gap-3 align-items-end">
      <div>
        <p>{{ $t('user_management.email_info') }}</p>
        <el-input v-model="userEmail" style="width: 240px" :placeholder="$t('user_management.form.email_input')" />
      </div>
      <div>
        <el-button
            @click="onSearch()"
            class="button_submit"
            type="danger"
            style="font-family: 'FS Magistral Medium', sans-serif"
        >{{ $t('common.search') }}
        </el-button>
      </div>
    </div>
    <div class="d-flex gap-3">
      <div class="list-user pt-2 w-50">
        <div>
          <el-table :data="userData" border style="width: 100%" v-if="userData.length > 0">
            <el-table-column class-name="title" prop="stt" :label="$t('user_management.no')" min-width="10" />
            <el-table-column class-name="title" prop="name" :label="$t('user_management.name')" min-width="25" />
            <el-table-column class-name="title" prop="email" :label="$t('user_management.email')" min-width="30" />
            <el-table-column class-name="title" prop="phone_number" :label="$t('user_management.phone_number')" min-width="15" />
            <el-table-column class-name="title" fixed="right" :label="$t('user_management.permission')" min-width="20">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="clickEdit(scope.row.email)">{{ $t('common.edit') }}</el-button>
                <el-popconfirm
                    confirm-button-text="Yes"
                    cancel-button-text="No"
                    :icon="InfoFilled"
                    icon-color="#626AEF"
                    :title="$t('user_management.form.confirm_delete')"
                    @confirm="clickDelete(scope.row.email)"
                    :width="300"
                >
                  <template #reference>
                    <el-button link type="warning" size="small">{{ $t('common.delete') }}</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <p v-if="nullRecord">{{ $t('user_management.no_data') }}</p>
        </div>

        <div v-if="totalPage > perPage">
          <el-pagination
              :current-page="currenPage"
              :page-size="perPage"
              size="small"
              background
              layout="prev, pager, next"
              :total="totalPage"
              class="mt-4"
              @current-change="changePage"
          />
        </div>
      </div>
      <div class="setting-user pt-2">
        <div v-if="permissions.length > 0" class="permission-container d-flex flex-column">
          <div class="d-flex">
            <div class="mb-2">
              <p>{{ $t('user_management.form.permission_title') }}</p>
              <div class="d-flex flex-column gap-3">
                <el-checkbox
                    v-model="checkAll"
                    :indeterminate="isIndeterminate"
                    @change="handleCheckAllChange"
                >
                  {{ $t('user_management.form.select_all') }}
                </el-checkbox>
                <el-checkbox-group
                    v-model="checkedPermissions"
                    @change="handleCheckedChange"
                    class="d-flex flex-column gap-3"
                >
                  <el-checkbox v-for="item in permissions" :label="item" :value="item" @change="changeStatus($event, item)">
                    {{ titlePermissions[item] }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>

            <div>
              <p>{{ $t('user_management.form.available_date') }}</p>
              <div class="d-flex flex-column gap-3">
                <!-- Select all -->
                <div class="d-flex gap-3">
                  <el-date-picker
                      v-model="selectAll.startDate"
                      :placeholder="$t('user_management.form.from_date')"
                      format="YYYY/MM/DD"
                      type="date"
                      value-format="YYYY/MM/DD"
                      @change="changeAllStartDate"
                      :disabled="!anyFeature"
                  />
                  <div>-</div>
                  <el-date-picker
                      v-model="selectAll.endDate"
                      :placeholder="$t('user_management.form.to_date')"
                      format="YYYY/MM/DD"
                      type="date"
                      value-format="YYYY/MM/DD"
                      @change="changeAllEndDate"
                      :disabled="!anyFeature"
                  />
                </div>

                <!-- Text to image -->
                <div class="d-flex gap-3">
                  <el-date-picker
                      v-model="features.textToImage.date[0]"
                      :placeholder="$t('user_management.form.from_date')"
                      format="YYYY/MM/DD"
                      type="date"
                      value-format="YYYY/MM/DD"
                      :disabled="!features.textToImage.status"
                  />
                  <div>-</div>
                  <el-date-picker
                      v-model="features.textToImage.date[1]"
                      :placeholder="$t('user_management.form.to_date')"
                      format="YYYY/MM/DD"
                      type="date"
                      value-format="YYYY/MM/DD"
                      :disabled="!features.textToImage.status"
                  />
                </div>

                <!-- Image to image -->
                <div class="d-flex gap-3">
                  <el-date-picker
                      v-model="features.imageToImage.date[0]"
                      :placeholder="$t('user_management.form.from_date')"
                      format="YYYY/MM/DD"
                      type="date"
                      value-format="YYYY/MM/DD"
                      :disabled="!features.imageToImage.status"
                  />
                  <div>-</div>
                  <el-date-picker
                      v-model="features.imageToImage.date[1]"
                      :placeholder="$t('user_management.form.to_date')"
                      format="YYYY/MM/DD"
                      type="date"
                      value-format="YYYY/MM/DD"
                      :disabled="!features.imageToImage.status"
                  />
                </div>

                <!-- MC -->
                <div class="d-flex gap-3">
                  <el-date-picker
                      v-model="features.virtualHuman.date[0]"
                      :placeholder="$t('user_management.form.from_date')"
                      format="YYYY/MM/DD"
                      type="date"
                      value-format="YYYY/MM/DD"
                      :disabled="!features.virtualHuman.status"
                  />
                  <div>-</div>
                  <el-date-picker
                      v-model="features.virtualHuman.date[1]"
                      :placeholder="$t('user_management.form.to_date')"
                      format="YYYY/MM/DD"
                      type="date"
                      value-format="YYYY/MM/DD"
                      :disabled="!features.virtualHuman.status"
                  />
                </div>

                <!-- MC background -->
                <div class="d-flex gap-3">
                  <el-date-picker
                      v-model="features.virtualHumanV2.date[0]"
                      :placeholder="$t('user_management.form.from_date')"
                      format="YYYY/MM/DD"
                      type="date"
                      value-format="YYYY/MM/DD"
                      :disabled="!features.virtualHumanV2.status"
                  />
                  <div>-</div>
                  <el-date-picker
                      v-model="features.virtualHumanV2.date[1]"
                      :placeholder="$t('user_management.form.to_date')"
                      format="YYYY/MM/DD"
                      type="date"
                      value-format="YYYY/MM/DD"
                      :disabled="!features.virtualHumanV2.status"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <el-button
                @click="onSubmit()"
                class="button_submit"
                type="danger"
            >{{ $t('common.update') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {nextTick, onBeforeMount, reactive, ref, watch} from 'vue'
import {useToast} from "vue-toastification";
import AdminService from '~/services/AdminService'
import {ElLoading} from "element-plus";
import {now} from "moment";
import {forEach, includes, every, trim, some} from "lodash";
import i18n from "../lang/i18n";

const currenPage = ref(1)
const userData = ref([])
const availableTime = ref([])
const checkAll = ref(false)
const isIndeterminate = ref(false)
const checkedPermissions = ref([])
const permissions = ref([])
const options = ref([])
const toast = useToast();
const userEmail = ref("")
const userRow = ref("")
const totalPage = ref(0)
const perPage = ref(0)
const nullRecord = ref(false)
const anyFeature = ref(false)
const titlePermissions = {
  'textToImage': i18n.global.t('user_management.text_to_image'),
  'imageToImage': i18n.global.t('user_management.image_to_image'),
  'virtualHuman': i18n.global.t('user_management.virtual_human'),
  'virtualHumanV2': i18n.global.t('user_management.virtual_human_v2')
}
const selectAll = reactive({
  startDate: '',
  endDate: ''
})
const features = reactive({
  textToImage: {status: false, date: []},
  imageToImage: {status: false, date: []},
  virtualHuman: {status: false, date: []},
  virtualHumanV2: {status: false, date: []}
})

const handleCheckAllChange = (val) => {
  forEach(features, (feature) => {
    feature.status = val
  })
  anyFeature.value = val
  checkedPermissions.value = val ? permissions.value : []
  isIndeterminate.value = false
}

const handleCheckedChange = (value) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === permissions.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < permissions.value.length
}

const changePage = async (page) => {
  await onSearch(page)
}

const resetFormData = () => {
  checkAll.value = false
  isIndeterminate.value = false
  permissions.value = []
  checkedPermissions.value = []
}

const onSearch = async (page = 1) => {
  currenPage.value = page === 1 ? 1 : page
  await resetFormData()
  userData.value = []
  const loading = ElLoading.service({
    lock: true,
    text: i18n.global.t('common.loading'),
    background: 'rgba(0, 0, 0, 0.7)',
  })

  const users = trim(userEmail.value) === '' ? await AdminService.listUser(page) : await AdminService.findUser(trim(userEmail.value, " "), page)
  if (users.status === 200) {
    loading.close()
    totalPage.value = users.data.total
    perPage.value = users.data.per_page
    nullRecord.value = totalPage.value === 0

    Object.keys(users.data.data).map((key) => {
      userData.value.push({
        stt: ((currenPage.value - 1) * 15) + 1 + Number(key),
        name: users.data.data[key]['name'],
        email: users.data.data[key]['email'],
        phone_number: users.data.data[key]['phone_number']
      })
    })
  }
}

const onSubmit = async () => {
  // Thời gian sử dụng không được để trống
  const emptyDate = some(features, (feature) => {
    return feature.status && (!feature.date[0] || !feature.date[1] || feature.date.length === 0)
  })
  if (emptyDate) {
    toast.error(i18n.global.t('user_management.date_required'))
    return
  }

  // Thời gian hết hạn phải > hiện tại
  const invalidDate = some(features, (feature) => {
    return feature.status && (new Date(feature.date[1]).setHours(23, 59, 59) < new Date())
  })
  if (invalidDate) {
    toast.error(i18n.global.t('user_management.date_invalid'))
    return
  }

  // Thời gian bắt đầu < thời gian kết thúc
  const isStartDateGtEndDate = some(features, (feature) => {
    return feature.status && (new Date(feature.date[0]) > new Date(feature.date[1]).setHours(23, 59, 59))
  })
  if (isStartDateGtEndDate) {
    toast.error(i18n.global.t('user_management.start_gt_end'))
    return
  }

  const loading = ElLoading.service({
    lock: true,
    text: i18n.global.t('common.loading'),
    background: 'rgba(0, 0, 0, 0.7)',
  })

  const res = await AdminService.updateUser({
    email: userRow.value,
    permissions: checkedPermissions.value,
    date: availableTime.value,
    features: features
  })
  if (res.data) {
    toast.success(i18n.global.t('common.update_success'))
    loading.close()
  }
}

const clickEdit = async (email) => {
  selectAll.startDate = ''
  selectAll.endDate = ''
  anyFeature.value = false
  const loading = ElLoading.service({
    lock: true,
    text: i18n.global.t('common.loading'),
    background: 'rgba(0, 0, 0, 0.7)',
  })
  await resetFormData()
  userRow.value = email

  const {data} = await AdminService.getUser(email)
  if (data) loading.close()

  const userPermission = JSON.parse(data.permissions)
  Object.keys(userPermission).map((key) => {
    if (titlePermissions.hasOwnProperty(key)) {
      if (userPermission[key].status) {
        anyFeature.value = true
        isIndeterminate.value = true
        checkedPermissions.value.push(key)
      }

      const start_date = userPermission[key].start_date ? userPermission[key].start_date : new Date(now()).toISOString()
      const end_date = userPermission[key].end_date ? userPermission[key].end_date : new Date(now()).toISOString()
      features[key].date = [start_date.slice(0, 10), end_date.slice(0, 10)]
      features[key].status = userPermission[key].status
      permissions.value.push(key)
    }
  });

  // Active radio "Chọn tất cả" nếu tất cả các chức năng được cho phép dùng
  if (checkedPermissions.value.length === Object.keys(titlePermissions).length) {
    checkAll.value = true
    isIndeterminate.value = false
  }

  if (!includes(permissions.value, 'virtualHumanV2')) {
    permissions.value.push('virtualHumanV2')
  }
}

const clickDelete = async (email) => {
  await resetFormData()
  userRow.value = email

  const {data} = await AdminService.deleteUser({
    email: email
  })

  if (data) {
    toast.success(i18n.global.t('common.delete_success'))
    await onSearch()
  }
}

const changeStatus = (status, item) => {
  features[item].status = status
  if (!status) {
    const allActive = every(features, (feature) => {
      return feature.status === false
    })
    if (allActive) anyFeature.value = false
  } else anyFeature.value = true
}

const changeAllStartDate = (item) => {
  forEach(features, (feature) => {
    if (feature.status) feature.date[0] = item
  })
}

const changeAllEndDate = (item) => {
  forEach(features, (feature) => {
    if (feature.status) feature.date[1] = item
  })
}

onBeforeMount(() => {
  onSearch()
})
</script>
<style scoped>
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
</style>
