<template>
    <portlet title="Danh sách người dùng">
        <template #tool>
            <el-button type="danger" round @click="showModalCreate">
                <el-icon>
                    <Plus />
                </el-icon>
                Thêm mới
            </el-button>
        </template>

        <data-table
            :rows="items"
            :pagination="pagination"
            :columns="columns"
            :perPageOptions="perPageOptions"
            @loadData="initCamera"
            filter
            striped
            hoverable
            sn
        >
            <template #thead-sn>
                <table-head>STT</table-head>
            </template>

            <template #thead>
                <table-head-cell v-for="(value, key) in columns" :key="'data-table-' + key">
                    {{ value }}
                </table-head-cell>

                <table-head-cell v-if="isEdit">Hành động</table-head-cell>
            </template>

            <template #tbody="{row}">
                <table-body> {{ row.display_name }}</table-body>
                <table-body> {{ row.phone }}</table-body>
                <table-body> {{ row.email }}</table-body>
                <table-body>
                    <span
                        v-for="(group, key) in row.groups"
                        :key="`table-body-${key}`"
                    >
                        {{ group.name }}<span v-show="key < row.groups.length - 1">, </span>
                    </span>
                </table-body>

                <table-body>
                    <el-icon
                        @click="showModalUpdate(row)"
                        size="16"
                        class="mr-4 green--text green--text--hover"
                    >
                        <EditPen />
                    </el-icon>

                    <el-icon
                        @click="showModalDelete(row)"
                        class="orange--text orange--text--hover"
                        size="16"
                    >
                        <Delete />
                    </el-icon>
                </table-body>
            </template>

            <template #empty>
                <table-body-cell colspan="6">
                    Không có dữ liệu
                </table-body-cell>
            </template>

            <template #pagination-info>
                Hiển thị {{ pagination.from + ' - ' + pagination.to }} của {{ pagination.total }} bản ghi
            </template>
        </data-table>
    </portlet>

    <form-modal
        v-if="isShowModal"
        v-model="isShowModal"
        :data-form="dataForm"
        @onSuccess="onSuccess"
        @onClose="onClose"
    />

    <modal-confirm
        v-if="isShowModalDelete"
        v-model="isShowModalDelete"
        :data-form="dataForm"
        @onSuccess="onDelete"
        @onClose="onClose"
        :is-loading="isLoadingSubmit"
    />

    <preloader v-if="isLoading" />
</template>

<script>
import { ref } from 'vue'
import UserService from '~/services/UserService'
import FormModal from './FormModal'
import { useToast } from 'vue-toastification'

const toast = useToast();

export default {
    name: "ListUser",
    components: { FormModal },
    setup() {
        const isLoading = ref(false)
        const isLoadingSubmit = ref(false)
        const columns = ref({
            display_name: 'Họ và tên',
            phone: 'Số điện thoại',
            email: 'Email',
            groups: 'Nhóm camera'
        })
        const items = ref([])
        const pagination = ref({})
        const perPageOptions = ref([10, 25, 50, 100])
        const tableQuery = ref({})

        const initCamera = async (query) => {
            isLoading.value = true

            UserService.list({
                page: query.page,
                per_page: query.per_page,
                keyword: query.search
            }).then(response => {
                isLoading.value = false

                items.value = response.data.data

                pagination.value = {
                    ...pagination.value,
                    page: query.page,
                    total: response.data.total,
                    from: response.data.from,
                    to: response.data.to
                }

                tableQuery.value = {
                    search: query.search,
                    page: query.page,
                    per_page: query.per_page
                }
            })
        }

        const isShowModal = ref(false)
        const isShowModalDelete = ref(false)
        const dataForm = ref({})

        const showModalCreate = () => {
            dataForm.value = {}
            isShowModal.value = true
        }
        const showModalUpdate = (row) => {
            dataForm.value = row
            isShowModal.value = true
        }
        const showModalDelete = (row) => {
            dataForm.value = {
                id: row.id,
                name: row.display_name,
                title: 'xóa người dùng'
            }
            isShowModalDelete.value = true
        }

        const onDelete = (id) => {
            isLoadingSubmit.value = true
            UserService.destroy(id)
                .then(response => {
                    onClose()

                    if (response.status == 200) {
                        toast.success('Xóa người dùng thành công')
                        initCamera(tableQuery.value)
                    }
                })
        }
        const onClose = () => {
            isShowModal.value = false
            isShowModalDelete.value = false
            isLoadingSubmit.value = false
        }
        const onSuccess = () => {
            initCamera(tableQuery.value)
        }

        const isEdit = ref(true)
        const isDelete = ref(true)

        return {
            isLoading,
            isLoadingSubmit,
            initCamera,
            items,
            columns,
            pagination,
            perPageOptions,
            isEdit,
            isDelete,
            dataForm,
            isShowModal,
            isShowModalDelete,
            showModalCreate,
            showModalUpdate,
            showModalDelete,
            onClose,
            onDelete,
            onSuccess
        };
    },
}
</script>