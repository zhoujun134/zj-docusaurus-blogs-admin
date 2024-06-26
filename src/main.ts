import './assets/main.css'
import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(mavonEditor)

app.mount('#app')
