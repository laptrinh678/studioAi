<template>
    <div class="m-grid m-grid--hor m-grid--root m-page">
        <div class="m-grid__item m-grid__item--fluid m-grid m-error-6">
            <div class="m-error_container">
                <div class="m-error_subtitle m--font-light">
                    <h1>Xin lỗi...</h1>
                </div>
                <p class="m-error_description m--font-light">
                    Bạn không có quyền truy cập!
                </p>
<!--                <v-button-->
<!--                    color="success"-->
<!--                    style-type="air"-->
<!--                    class="m-btn&#45;&#45;custom m-btn&#45;&#45;icon"-->
<!--                    @click.native="goBack"-->
<!--                >-->
<!--                    <span>-->
<!--                        <i class="la la-undo"></i>-->
<!--                        <span>Trở lại login</span>-->
<!--                    </span>-->
<!--                </v-button>-->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotFound",
    layout: "none",
    metaInfo() {
        return { title: "404" };
    },
    methods: {
        async goBack() {
            await this.$store.dispatch("auth/logout");
            window.location = "/auth/sso-logout";
        }
    }
};
</script>
