import {createI18n} from 'vue-i18n'
import Cookies from "js-cookie";

const loadLocaleMessages = () => {
    const locales = require.context('./../lang', true, /[A-Za-z0-9-_,\s]+\.json$/i);
    const messages = {};

    locales.keys().forEach((key) => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
        }
    });
    return messages;
};

const getLocale = () => {
    return Cookies.get("locale") || 'vi'
}

const i18n = createI18n({
    legacy: false,
    locale: getLocale(),
    fallbackLocale: getLocale(),
    messages: loadLocaleMessages(),
    silentTranslationWarn: true,
    globalInjection: true
});

export default i18n;
