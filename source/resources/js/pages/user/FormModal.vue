<template>
    <el-dialog
        :title="isCreate ? 'Thêm mới người dùng' : 'Cập nhật người dùng'"
        width="40%"
        center
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="onClose"
    >
        <el-form
            :model="fields"
            :rules="rules"
            ref="form"
            label-width="0"
            label-position="left"
        >
            <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :lg="8">
                    <div class="form-floating">
                        <input
                            type="text"
                            v-model.trim="fields.display_name"
                            class="form-control required"
                            placeholder="Họ và tên"
                            :class="{ 'is-invalid': v$.display_name.$errors.length || error_server.display_name }"
                        >
                        <label>Họ và tên</label>

                        <template v-if="error_server.display_name">
                            <div class="invalid-feedback d-block">{{ error_server.display_name[0] }}</div>
                        </template>

                        <template v-else>
                            <div v-for="error of v$.display_name.$errors" :key="error.$property">
                                <div class="invalid-feedback d-block">{{ error.$message }}</div>
                            </div>
                        </template>
                    </div>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                    <div class="form-floating">
                        <input
                            type="text"
                            v-model.trim="fields.email"
                            class="form-control required"
                            placeholder="Email"
                            :class="{ 'is-invalid': v$.email.$errors.length || error_server.email }"
                        >
                        <label>Email</label>

                        <template v-if="error_server.email">
                            <div class="invalid-feedback d-block">{{ error_server.email[0] }}</div>
                        </template>

                        <template v-else>
                            <div v-for="error of v$.email.$errors" :key="error.$property">
                                <div class="invalid-feedback d-block">{{ error.$message }}</div>
                            </div>
                        </template>
                    </div>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                    <div class="form-floating">
                        <input
                            type="text"
                            v-model.trim="fields.phone"
                            class="form-control required"
                            placeholder="Số điện thoại"
                            :class="{ 'is-invalid': v$.phone.$errors.length || error_server.phone }"
                        >
                        <label>Số điện thoại</label>

                        <template v-if="error_server.phone">
                            <div class="invalid-feedback d-block">{{ error_server.phone[0] }}</div>
                        </template>

                        <template v-else>
                            <div v-for="error of v$.phone.$errors" :key="error.$property">
                                <div class="invalid-feedback d-block">{{ error.$message }}</div>
                            </div>
                        </template>
                    </div>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                    <div class="form-floating">
                        <input
                            type="text"
                            v-model.trim="fields.user_name"
                            class="form-control required"
                            placeholder="Tên đăng nhập"
                            :class="{ 'is-invalid': v$.user_name.$errors.length || error_server.user_name }"
                        >
                        <label>Tên đăng nhập</label>

                        <template v-if="error_server.user_name">
                            <div class="invalid-feedback d-block">{{ error_server.user_name[0] }}</div>
                        </template>

                        <template v-else>
                            <div v-for="error of v$.user_name.$errors" :key="error.$property">
                                <div class="invalid-feedback d-block">{{ error.$message }}</div>
                            </div>
                        </template>
                    </div>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                    <div class="form-floating" v-if="isCreate">
                        <input
                            type="password"
                            v-model.trim="fields.password"
                            class="form-control required"
                            placeholder="Mật khẩu"
                            autocomplete="off"
                            :class="{ 'is-invalid': v$.password.$errors.length || error_server.password }"
                        >
                        <label>Mật khẩu</label>

                        <template v-if="error_server.password">
                            <div class="invalid-feedback d-block">{{ error_server.password[0] }}</div>
                        </template>

                        <template v-else>
                            <div v-for="error of v$.password.$errors" :key="error.$property">
                                <div class="invalid-feedback d-block">{{ error.$message }}</div>
                            </div>
                        </template>
                    </div>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                    <div class="form-floating" v-if="isCreate">
                        <input
                            type="password"
                            v-model.trim="fields.password_confirmation"
                            class="form-control required"
                            placeholder="Nhập lại mật khẩu"
                            autocomplete="new-password"
                            :class="{ 'is-invalid': v$.password_confirmation.$errors.length || error_server.password_confirmation }"
                        >
                        <label>Nhập lại mật khẩu</label>

                        <template v-if="error_server.password_confirmation">
                            <div class="invalid-feedback d-block">{{ error_server.password_confirmation[0] }}</div>
                        </template>

                        <template v-else>
                            <div v-for="error of v$.password_confirmation.$errors" :key="error.$property">
                                <div class="invalid-feedback d-block">{{ error.$message }}</div>
                            </div>
                        </template>
                    </div>
                </el-col>
            </el-row>
            <div>
                <strong class="white_darken_2--text">Danh sách quyền xem nhóm camera</strong>
            </div>
            <el-row
                v-for="(group, index) in groups"
                :key="`group_${index}`"
                align="middle"
                class="white_darken_2--text mt-2"
            >
                <el-col :xs="12" :sm="12" :md="6" :lg="12" :xl="15">
                    {{ group.name }}
                </el-col>
                <el-col :xs="12" :sm="12" :md="18" :lg="12" :xl="9">
                    <el-radio-group v-model="fields.permissions[index]">
                        <el-radio label="NONE">Không</el-radio>
                        <el-radio label="VIEW">Xem</el-radio>
                        <el-radio label="EDIT">Cập nhật</el-radio>
                    </el-radio-group>
                </el-col>
            </el-row>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button
                    round
                    @click="onClose"
                    class="btn-custom dark_lighten_2--bg dark_lighten_2--hover dark_lighten_2--border white_darken_2--text"
                >
                    Hủy bỏ
                </el-button>
                <el-button
                    round
                    :loading="isLoading"
                    @click="submitForm()"
                    class="btn-custom red--bg red--hover red--border white_darken_2--text"
                >
                    <template v-if="isCreate">
                        <el-icon size="14">
                            <Plus />
                        </el-icon>
                        <span>Thêm mới</span>
                    </template>

                    <template v-else>
                        Cập nhật
                    </template>
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import UserService from '~/services/UserService'
import CameraGroupService from '~/services/CameraGroupService'
import { useVuelidate } from '@vuelidate/core'
import { useToast } from 'vue-toastification'
import { helpers, required, sameAs, email, maxLength } from '@vuelidate/validators'
import { forEach } from 'lodash'

const toast = useToast();

export default {
    name: "FormModal",
    props: {
        dataForm: {
            type: Object,
            default: {}
        }
    },
    emits: ['onClose', 'onSuccess'],
    setup(props, {emit}) {
        const isLoading = ref(false)

        const isCreate = computed(() => !Object.keys(props.dataForm).length)

        const fields = ref({
            display_name: '',
            user_name: '',
            email: '',
            phone: '',
            status: '',
            password: '',
            password_confirmation: '',
            group_ids: [],
            permissions: []
        })

        const password_confirmation = computed(() => fields.value.password)

        const rules = ref({
            display_name: {
                required: helpers.withMessage('Họ và tên là bắt buộc', required),
                maxLength: helpers.withMessage('Họ và tên tối đa 255 ký tự', maxLength(255)),
            },
            user_name: {
                required: helpers.withMessage('Tên đăng nhập là bắt buộc', required),
                maxLength: helpers.withMessage('Tên đăng nhập tối đa 255 ký tự', maxLength(255)),
            },
            email: {
                required: helpers.withMessage('Email là bắt buộc', required),
                maxLength: helpers.withMessage('Email tối đa 255 ký tự', maxLength(255)),
                email: helpers.withMessage('Email không đúng định dạng', email),
            },
            phone: {
                required: helpers.withMessage('Số điện thoại là bắt buộc', required),
                maxLength: helpers.withMessage('Số điện thoại tối đa 45 ký tự', maxLength(45)),
                regex: helpers.withMessage('Số điện thoại không đúng định dạng', helpers.regex(/^(84|0)+([0-9]{9,10})$/)),
            }
        });

        onMounted(() => {
            initData(),
            initRules(),
            getListCameraGroup()
        });

        const initData = () => {
            if (!isCreate.value) {
                let group_ids = []
                let permissions = []

                forEach(props.dataForm.groups, (value, key) => {
                    group_ids.push(value.id)
                    permissions.push(value.pivot.permission)
                })

                fields.value = {
                    ...props.dataForm,
                    permissions: permissions,
                    group_ids: group_ids
                }
            }
        }

        const groups = ref([])

        const getListCameraGroup = () => {
            let group_ids = []
            let permissions = []

            CameraGroupService.listAll().then(response => {
                groups.value = response.data

                forEach(response.data, (value, key) => {
                    group_ids.push(value.id)
                    permissions.push('NONE')
                })

                fields.value.group_ids = group_ids

                if (isCreate.value) {
                    fields.value.permissions = permissions
                }
            })
        }

        const initRules = () => {
            if (isCreate.value) {
                rules.value = {
                    ...rules.value,
                    password: {
                        required: helpers.withMessage('Mật khẩu là bắt buộc', required),
                        maxLength: helpers.withMessage('Mật khẩu tối đa 100 ký tự', maxLength(100)),
                        regex: helpers.withMessage('Mật khẩu không đúng định dạng', helpers.regex(/^(?=.*[a-z])+(?=.*[A-Z])+(?=.*\d)+(?=.*[$~!#^()@%*?&_/\-])[A-Za-z\d$~!#^()@%*?&_/\-]{8,}/)),
                    },
                    password_confirmation: {
                        required: helpers.withMessage('Nhập lại mật khẩu là bắt buộc', required),
                        maxLength: helpers.withMessage('Nhập lại mật khẩu tối đa 100 ký tự', maxLength(100)),
                        sameAs: helpers.withMessage('Nhập lại mật khẩu không khớp', sameAs(password_confirmation)),
                    }
                }
            }
        }

        const v$ = useVuelidate(rules, fields);
        const error_server = ref({})

        const submitForm = () => {
            error_server.value = {}
            v$.value.$validate();

            if (!v$.value.$error) {
                isLoading.value = true

                forEach(fields.value.permissions, (value, key) => {
                    console.log('value: ', value);
                    console.log('key: ', key);
                })

                if (isCreate.value) {
                    UserService.create(fields.value)
                        .then(response => {
                            handleResponse(response)
                        })
                } else {
                    UserService.update(props.dataForm.id, fields.value)
                        .then(response => {
                            handleResponse(response)
                        })
                }
            }
        }

        const handleResponse = (response) => {
            isLoading.value = false

            if (response.status != 200) {
                error_server.value = response.data.errors
            } else {
                toast.success(isCreate.value ? 'Thêm mới người dùng thành công' : 'Cập nhật người dùng thành công')
                emit('onSuccess')
                onClose()
            }
        }

        const onClose = () => {
            emit('onClose')
            v$.value.$reset()
            error_server.value = {}
            fields.value = {
                name: ""
            }
        }

        return {
            isLoading,
            groups,
            fields,
            rules,
            isCreate,
            submitForm,
            onClose,
            error_server,
            v$
        };
    },
}
</script>