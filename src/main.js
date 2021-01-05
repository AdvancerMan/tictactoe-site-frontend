import Vue from 'vue'
import App from './App.vue'
import router from './router/router'

Vue.config.productionTip = false

const vm = new Vue({
    router,
    render: h => h(App),
    data() {
        return {
            navLinks: []
        }
    }
}).$mount('#app')

window.vue = vm;
