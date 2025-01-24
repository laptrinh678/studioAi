<template>
    <a
        class="m-portlet__nav-link btn m-btn  m-btn--icon m-btn--icon-only m-btn--pill tooltip-btn mini-button"
        :title="tooltip"
        :class="[
            'm-btn--hover-' + color,
            loading ? 'm-loader m-loader--light' : ''
        ]"
        :disabled="disabled || loading"
        ><i class="la" :class="icon + ' text-' + color"></i
    ></a>
</template>

<script>
import colors from "~/constants/colors";

export default {
    name: "MiniButton",
    props: {
        color: {
            type: String,
            default: "primary",
            validator: value => colors.indexOf(value) !== -1
        },
        icon: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        tooltip: {
            type: String,
            default: null
        }
    },
    mounted() {
        this.initTooltip();
    },
    methods: {
        initTooltip() {
            if (this.tooltip) {
                $(this.$el).tooltip();
            }
        }
    }
};
</script>
