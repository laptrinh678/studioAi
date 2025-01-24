import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'
import App from '~/components/App'
import router from '~/router'
import store from '~/store'
import jQuery from 'jquery'
import i18n from "~/lang/i18n"
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '~/plugins'
import components from '~/components'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import authUser from "~/mixins/authUser"
import { ApiService } from "~/services"
import Directives from '~/directives'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {
    DataTable,
    TableBodyCell,
    TableHeadCell,
    TableHead,
    TableBody,
} from "@jobinsjp/vue3-datatable"
import "@jobinsjp/vue3-datatable/dist/style.css"
import vi from 'element-plus/es/locale/lang/vi'
import VueKonva from 'vue-konva'
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import VueDragscroll from "vue-dragscroll";

library.add(fas, fab);
dom.watch();

window.jQuery = window.$ = jQuery;

ApiService.init();
ApiService.setHeader();

const app = createApp(App)

app.mixin(authUser)
app.use(Directives)
app.use(ElementPlus, {
    locale: vi
})
app.use(store)
app.use(router)
app.use(i18n)
app.use(PerfectScrollbar)
app.use(createMetaManager())
app.use(VueKonva)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('data-table', DataTable)
app.component('table-body-cell', TableBodyCell)
app.component('table-head-cell', TableHeadCell)
app.component('table-head', TableHead)
app.component('table-body', TableBody)
app.use(VueDragscroll)
app.use(Vue3ColorPicker)
app.use(Toast, {
    position: 'top-right',
    closeOnClick: false,
    timeout: 3000,
    draggable: false,
    pauseOnHover: true,
    newestOnTop: true,
    maxToasts: 5,
    transition: 'Vue-Toastification__fade',
})

components.forEach(Component => {
    app.component(Component.name, Component);
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
};

app.mount('#app');