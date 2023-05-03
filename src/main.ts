import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import pinia from './stores'
import cusPlugin from './directives'
import './style/index.css'
import 'md-editor-v3/lib/style.css'
import 'tocbot/src/scss/tocbot.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(cusPlugin)

app.mount('#app')
