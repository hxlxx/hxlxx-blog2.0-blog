import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import '@/style/index.css'
import 'md-editor-v3/lib/style.css'
import 'tocbot/src/scss/tocbot.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
