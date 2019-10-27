import Vue from "vue"
import App from "@/App.vue"
import MobileMenu from "@/components/MobileMenu.vue";
import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)

var vm = new Vue({
    components: {App, MobileMenu},
})

vm.$mount("#app")