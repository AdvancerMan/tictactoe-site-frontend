import Vue from 'vue'
import App from './App.vue'
import router, {initNavLinks} from './router/router'

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
