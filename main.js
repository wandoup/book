import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
//==全局组件注册
import tabBar from "@/components/tabBar/index.vue"
Vue.component('tabBar', tabBar)
import title from "@/components/title/index.vue"
Vue.component('title', title)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif