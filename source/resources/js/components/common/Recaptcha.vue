<template>
<div
    id="recaptcha"
    class="mb-4"
    :data-sitekey="siteKey"
></div>
</template>

<script>
import { useToast } from 'vue-toastification'

const toast = useToast();

export default {
    name: 'Recaptcha',
    data() {
        return {
            // siteKey: process.env.MIX_GOOGLE_RECAPTCHA_KEY
            siteKey: '6LdOL9oiAAAAAGYlHb13FmyWguWsxwqcR-UzH0Tr'
        }
    },
    props: {
        submit: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        submit(val) {
            if (val) {
                window.grecaptcha.reset()
                this.check(false)
            }
        }
    },
    mounted() {
        this.render()
    },
    methods: {
        onRecaptchaExpired(t) {
            this.check(t)
        },
        render() {
            if (window.grecaptcha) {
                console.log('Captcha loaded');
                setTimeout(function() {
                    if (
                        typeof window.grecaptcha === 'undefined' ||
                        typeof window.grecaptcha.render === 'undefined'
                    ) {
                        console.log('Captcha is loading');
                        this.render()
                    } else {
                        console.log('Captcha has displayed');
                        window.grecaptcha.render('recaptcha', {
                            callback: (response) => {
                                this.check(response)
                            },
                            'expired-callback': this.onRecaptchaExpired()
                        })
                    }
                }.bind(this), 100)
            } else {
                toast.error('Captcha không hiển thị, vui lòng tải lại trang')
                console.log('Captcha failed to load')
            }
        },
        check(response) {
            this.$emit('isHuman', response)
        }
    }
}
</script>
