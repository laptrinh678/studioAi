<template>
    <div class="dark_lighten_2--bg mt-4 pt-18 px-20 pb-5" style="border-radius: 20px">
    <!-- <portlet title="" class="white--bg"> -->
        <el-form
            :model="fields"
            :rules="rules"
            ref="form"
            label-width="0"
            label-position="left"
        >
            <el-row :gutter="20">
                <el-col :xs="24" :sm="12" class="mb-4">
                    <strong class="white--text">Thông tin cá nhân</strong>
                </el-col>
                <el-col :xs="24" :sm="12" class="mb-4">
                    <strong class="white--text">Đổi mật khẩu</strong>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <div class="form-floating dark_lighten_2-theme">
                        <input
                            type="text"
                            v-model.trim="fields.display_name"
                            class="form-control"
                            placeholder="Họ và tên"
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

                <el-col :xs="24" :sm="12">
                    <div class="form-floating dark_lighten_2-theme">
                        <input
                            type="password"
                            v-model.trim="fields.password"
                            class="form-control "
                            placeholder="Mật khẩu hiện tại"
                            autocomplete="off"
                        >
                        <label>Mật khẩu hiện tại</label>

                        <template v-if="error_server.password">
                            <div class="invalid-feedback d-block">{{ error_server.password[0] }}</div>
                        </template>

                        <template v-if="v$.password">
                            <div v-for="error of v$.password.$errors" :key="error.$property">
                                <div class="invalid-feedback d-block">{{ error.$message }}</div>
                            </div>
                        </template>
                    </div>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <div class="form-floating dark_lighten_2-theme">
                        <input
                            type="text"
                            v-model.trim="fields.phone"
                            class="form-control required"
                            placeholder="Số điện thoại"
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

                <el-col :xs="24" :sm="12">
                    <div class="form-floating dark_lighten_2-theme">
                        <input
                            type="password"
                            v-model.trim="fields.new_password"
                            class="form-control"
                            placeholder="Mật khẩu mới"
                            autocomplete="off"
                        >
                        <label>Mật khẩu mới</label>

                        <template v-if="error_server.new_password">
                            <div class="invalid-feedback d-block">{{ error_server.new_password[0] }}</div>
                        </template>

                        <template v-if="v$.new_password">
                            <div v-for="error of v$.new_password.$errors" :key="error.$property">
                                <div class="invalid-feedback d-block">{{ error.$message }}</div>
                            </div>
                        </template>
                    </div>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <div class="form-floating dark_lighten_2-theme">
                        <input
                            type="text"
                            v-model.trim="fields.email"
                            class="form-control required"
                            placeholder="Email"
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

                <el-col :xs="24" :sm="12">
                    <div class="form-floating dark_lighten_2-theme">
                        <input
                            type="password"
                            v-model.trim="fields.password_confirmation"
                            class="form-control"
                            placeholder="Nhập lại mật khẩu mới"
                            autocomplete="new-password"
                        >
                        <label>Nhập lại mật khẩu mới</label>

                        <template v-if="error_server.password_confirmation">
                            <div class="invalid-feedback d-block">{{ error_server.password_confirmation[0] }}</div>
                        </template>

                        <template v-if="v$.password_confirmation">
                            <div v-for="error of v$.password_confirmation.$errors" :key="error.$property">
                                <div class="invalid-feedback d-block">{{ error.$message }}</div>
                            </div>
                        </template>
                    </div>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <div class="form-floating dark_lighten_2-theme">
                        <input
                            type="text"
                            v-model.trim="fields.user_name"
                            class="form-control required"
                            placeholder="Tên đăng nhập"
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

                <el-col :xs="24" :sm="12" class="d-flex justify-content-end pt-2">
                    <el-button
                        round
                        :loading="isLoading"
                        @click="submitForm()"
                        class="btn-custom red--bg red--hover red--border white_darken_2--text"
                    >
                        <span>Cập nhật</span>
                    </el-button>
                </el-col>
            </el-row>


        </el-form>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import UserService from '~/services/UserService'
import { useToast } from 'vue-toastification'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, sameAs, email } from '@vuelidate/validators'
import { getUserInfo } from '~/helpers/localStorage'

const toast = useToast();

export default {
    name: "Profile",
    setup() {
        const fields = ref({
            display_name: '',
            user_name: '',
            email: '',
            phone: '',
            status: '',
            password: '',
            new_password: '',
            password_confirmation: ''
        })

        const rules = ref({
            display_name: {
                required: helpers.withMessage('Họ và tên là bắt buộc', required)
            },
            user_name: {
                required: helpers.withMessage('Tên đăng nhập là bắt buộc', required)
            },
            email: {
                required: helpers.withMessage('Email là bắt buộc', required),
                email: helpers.withMessage('Email không đúng định dạng', email)
            },
            phone: {
                required: helpers.withMessage('Số điện thoại là bắt buộc', required),
                regex: helpers.withMessage('Số điện thoại không đúng định dạng', helpers.regex(/^(84|0)+([0-9]{9,10})$/))
            }
        });

        const authUser = JSON.parse(getUserInfo())

        onMounted(() => {
            initData()
        });

        const initData = async () => {
            fields.value = {
                display_name: authUser.display_name,
                user_name: authUser.user_name,
                email: authUser.email,
                phone: authUser.phone,
                status: authUser.status,
                password: '',
                new_password: '',
                password_confirmation: ''
            }
        }

        const allowAddPasswordRule = ref(true)

        watch(() => fields.value.password, (newValue, oldValue) => {
            if (newValue && allowAddPasswordRule.value) {
                addPasswordRules()
                allowAddPasswordRule.value = false
            }
            if (!newValue) {
                addPasswordRules(false)
                allowAddPasswordRule.value = true
            }
        })

        const password_confirmation = computed(() => fields.value.new_password)

        const addPasswordRules = (isAddRule = true) => {
            if (!isAddRule) {
                rules.value = {
                    ...rules.value,
                    password: {},
                    new_password: {},
                    password_confirmation: {}
                }
            } else {
                if (fields.value.password) {
                    rules.value = {
                        ...rules.value,
                        password: {
                            required: helpers.withMessage('Mật khẩu hiện tại là bắt buộc', required),
                            regex: helpers.withMessage('Mật khẩu mới không đúng định dạng', helpers.regex(/^(?=.*[a-z])+(?=.*[A-Z])+(?=.*\d)+(?=.*[$~!#^()@%*?&_/\-])[A-Za-z\d$~!#^()@%*?&_/\-]{8,}/))
                        },
                        new_password: {
                            required: helpers.withMessage('Mật khẩu mới là bắt buộc', required),
                            regex: helpers.withMessage('Mật khẩu mới không đúng định dạng', helpers.regex(/^(?=.*[a-z])+(?=.*[A-Z])+(?=.*\d)+(?=.*[$~!#^()@%*?&_/\-])[A-Za-z\d$~!#^()@%*?&_/\-]{8,}/))
                        },
                        password_confirmation: {
                            required: helpers.withMessage('Nhập lại mật khẩu mới là bắt buộc', required),
                            sameAs: helpers.withMessage('Nhập lại mật khẩu mới không khớp', sameAs(password_confirmation))
                        }
                    }
                }
            }
        }

        const isLoading = ref(false)

        const v$ = useVuelidate(rules, fields);
        const error_server = ref({})

        const submitForm = () => {
            error_server.value = {}
            v$.value.$validate();

            if (!v$.value.$error) {
                isLoading.value = true

                if (fields.value.password) {
                    UserService.change_password(fields.value)
                        .then(response => {
                            if (response.status != 200) {
                                isLoading.value = false
                                error_server.value = response.data.errors
                            } else {
                                updateProfile()
                            }
                        })
                } else {
                    updateProfile()
                }
            }
        }

        const updateProfile = () => {
            UserService.update_profile(fields.value)
                .then(response => {
                    handleResponse(response)
                })
        }

        const handleResponse = (response) => {
            isLoading.value = false

            if (response.status != 200) {
                error_server.value = response.data.errors
            } else {
                toast.success('Cập nhật thông tin cá nhân thành công')
            }
        }

        return {
            isLoading,
            fields,
            rules,
            submitForm,
            error_server,
            v$
        };
    },
}
</script>