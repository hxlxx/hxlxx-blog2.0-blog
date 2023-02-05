import { createI18n } from 'vue-i18n'
import en from '@/assets/lang/en-US.json'
import zh from '@/assets/lang/zh-CN.json'

const i18n = createI18n({
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'zh-CN', // 不存在默认则为英文
  allowComposition: true, // 允许组合式api
  messages: {
    'en-US': en, // 标识:配置对象
    'zh-CN': zh
  }
})

export default i18n
