<template>
  <div class="d-flex flex-column" style="gap: 12px" v-loading="isLoading">
    <div id="project-container" class="d-flex justify-content-between align-items-center" style="gap: 10px">
      <p>{{ $t('mc_scene.project.list') }}</p>
      <div>
        <el-button
            @click="dialogForm.visible = true"
            class="button_submit"
            type="danger"
        >{{ $t('mc_scene.project.create') }}</el-button>
      </div>
      <el-dialog v-model="dialogForm.visible" :title="$t('mc_scene.project.create_title')" width="500" @closed="closeDialog">
        <el-form class="d-flex flex-column" @submit.prevent>
          <el-form-item :label="$t('mc_scene.project.name')" label-width="175px">
            <el-input v-model="dialogForm.name"
                      autocomplete="off"
                      :placeholder="$t('mc_scene.project.name_input')"
                      maxlength="30"
                      show-word-limit
            />
            <span class="error" v-if="isError">{{ errorMessage }}</span>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogForm.visible = false">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="onSubmitDialogForm">{{ $t('common.confirm') }}</el-button>
          </div>
        </template>
      </el-dialog>
    </div>

    <div class="project-list">
      <div class="project-item" v-for="item in projects">
        <div class="background">
          <img @click="selectProject(item)"
               src="https://framerusercontent.com/images/APf5hVdNiU0xdNkN86hmOeQtq9U.jpg?scale-down-to=2048" alt="img">
          <div class="project-title">
            <div class="project-date">{{ item.created_at }}</div>
            <div class="delete-icon">
              <el-popconfirm :title="$t('mc_scene.project.is_delete')"
                             @confirm="deleteProject($event, item._id)"
                             :width="240"
                             :confirm-button-text="$t('common.confirm')"
                             :cancel-button-text="$t('common.cancel')"
              >
                <template #reference>
                  <trash-icon :original="false" />
                </template>
              </el-popconfirm>
            </div>
          </div>
        </div>
        <div class="project-name" @click="selectProject(item)">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TrashIcon from "../../icons/Trash.vue";
import {onBeforeMount, reactive, ref} from "vue";
import VirtualHumanService from "../../../services/VirtualHumanService";
import {useEventsBus} from "../../../helpers/eventBus";
import {useStore} from "vuex";
import {ACTION_STORE_PROJECT_ID, ACTION_STORE_PROJECT_ACTION} from "../../../store/common/actions";
import {useToast} from "vue-toastification";
import {ElLoading} from "element-plus";
import i18n from "../../../lang/i18n"

const toast = useToast()
const store = useStore()
const eventBus = useEventsBus()
const emits = defineEmits(['selectProject', 'deleteSelectedProject'])
const projects = ref()
const projectTarget = ref(null)
const isError = ref(false)
const errorMessage = ref(i18n.global.t('mc_scene.project.name_required'))
const dialogForm = reactive({
  name: '',
  invisible: false
})
const isLoading = ref(true)

const onSubmitDialogForm = async (ev) => {
  if (dialogForm.name.trim().length === 0) {
    isError.value = true
    errorMessage.value = i18n.global.t('mc_scene.project.name_required')
    return
  }

  if (dialogForm.name.length > 30) {
    isError.value = true
    errorMessage.value = i18n.global.t('mc_scene.project.name_max_length')
    return
  }

  const loading = ElLoading.service({
    lock: true,
    text: i18n.global.t('common.loading'),
    background: 'rgba(0, 0, 0, 0.7)',
  })

  isError.value = false
  const formData = new FormData()
  formData.append('name', dialogForm.name)
  const res = await VirtualHumanService.storeProject(formData)
  if (res.status === 201) {
    dialogForm.visible = false
    const projectId = res.data.project._id
    projectTarget.value = projectId
    await store.dispatch(ACTION_STORE_PROJECT_ACTION, 'create')
    await store.dispatch(ACTION_STORE_PROJECT_ID, projectId)
    await eventBus.emit('selectProject', {_id: projectId})
    emits('selectProject', projectId)
    await getProject()
  }

  loading.close()
  dialogForm.name = ''
}

const selectProject = async (item) => {
  projectTarget.value = item._id
  await store.dispatch(ACTION_STORE_PROJECT_ACTION, 'edit')
  await store.dispatch(ACTION_STORE_PROJECT_ID, item._id)
  await eventBus.emit('selectProject', item)
  emits('selectProject', item)
}

const getProject = async () => {
  const {data} = await VirtualHumanService.getProjects()
  if (data) {
    projects.value = data.data
  }
  isLoading.value = false
}

const deleteProject = async (ev, projectId) => {
  if (projectTarget.value === projectId) {
    projectTarget.value = null
    emits('deleteSelectedProject')
  }

  const loading = ElLoading.service({
    lock: true,
    text: i18n.global.t('common.loading'),
    background: 'rgba(0, 0, 0, 0.7)',
  })

  const formData = new FormData()
  formData.append('project_id', projectId)

  const res = await VirtualHumanService.deleteProject(formData)
  if (res.status === 200) {
    await getProject()
    loading.close()
    toast.success(i18n.global.t('mc_scene.project.delete_success'))
  }
}

const closeDialog = () => {
  isError.value = false
  dialogForm.name = ''
}

onBeforeMount(() => {
  getProject()
})
</script>

<style scoped lang="scss">
.project-list {
  position: relative;
  display: grid;
  gap: 48px;
  grid-template-columns: repeat(4, minmax(50px, 1fr));
  padding: 0;

  .project-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    cursor: pointer;

    .background {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }

  .project-title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;

    .project-date {
      font-size: 14px;
      font-family: "FS Magistral Book", sans-serif;
      color: #b5b4b4;
      letter-spacing: 0.04em;
    }

    .delete-icon {
      border-radius: 8px;
      padding: 4px;
      background-color: #00000040;
    }
  }

  .project-name {
    font-size: 16px;
    font-family: "FS Magistral Medium", sans-serif;
    color: #44494d;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
  }
}
</style>