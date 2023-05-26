import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import Router from './router'
import './assets/main.css'

import ElementPlus  from "element-plus"
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import weather from 'vue3-mini-weather'
import VDistpicker from 'v-distpicker'
import axios from "axios";



const app = createApp(App)

app.use(createPinia())
app.use(Router)
app.use(ElementPlus)
app.component('v-distpicker', VDistpicker)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(weather)

app.mount('#app')


app.config.globalProperties.$http=axios;

