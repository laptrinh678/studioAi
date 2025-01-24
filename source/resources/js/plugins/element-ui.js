import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import {
    Pagination,
    DatePicker,
    Loading,
    Collapse,
    CollapseItem,
    TimePicker,
    InputNumber,
    Button
} from "element-ui";

Vue.component(Pagination.name, Pagination);
Vue.component("loading", Loading);
Vue.use(Loading.directive);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Collapse.name, Collapse);
Vue.component(CollapseItem.name, CollapseItem);
Vue.component(TimePicker.name, TimePicker);
Vue.component(InputNumber.name, InputNumber);
Vue.component(Button.name, Button);
// configure language
