<template>
    <modal ref="modal" :title="'File cấu hình'">
        <embed src="/example/cfg1.json" width="800px" height="800px" />
    </modal>
</template>

<script>
export default {
    name: "ShowJsonModal",
    components: {},
    mounted() {},
    methods: {
        show() {
            this.$refs.modal.show();
        }
    }
};
</script>
