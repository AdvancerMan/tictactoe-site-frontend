import Vue from 'vue'
import App from './App.vue'
import router, {initNavLinks} from './router/router'
import ColorPicker from "vue-accessible-color-picker";
import Snotify from 'vue-snotify';

Vue.use(ColorPicker);
Vue.use(Snotify)

Vue.config.productionTip = false

const vm = new Vue({
    router,
    render: h => h(App),
    data() {
        return {
            navLinks: initNavLinks
        }
    },
}).$mount('#app')

window.vue = vm;
