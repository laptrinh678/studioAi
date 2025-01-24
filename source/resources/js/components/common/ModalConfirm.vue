<template>
    <el-dialog
        title="Xác nhận"
        center
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="onClose"
        modal-class="dialog-responsive"
    >
        <div class="white--text">
            Bạn có chắc chắn muốn {{ dataForm.title }} <span class="red--text">{{ dataForm.name }}</span>?
        </div>
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
                    type="primary"
                    @click="submitForm()"
                    class="btn-custom red--bg red--hover red--border"
                    :loading="isLoading"
                >
                    Xác nhận
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>

export default {
    name: "ModalConfirm",
    props: {
        dataForm: {
            type: Object,
            default: {}
        },
        isConfig: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        }
    },
    emits: ['onClose', 'onSuccess'],
    setup(props, {emit}) {
        const submitForm = () => {
            emit('onSuccess', props.dataForm.id)
        }

        const onClose = () => {
            emit('onClose')
        }

        return {
            submitForm,
            onClose
        };
    },
}
</script>