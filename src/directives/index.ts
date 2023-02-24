import { useIntersectionObserver } from '@vueuse/core'
import type { App } from 'vue'

export default {
  install(app: App) {
    app.directive('lazy', (el: HTMLImageElement, binding) => {
      const defaultUrl = import.meta.env.VITE_DEFAULT_COVER
      const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          el.onerror = () => {
            el.src = defaultUrl
          }
          el.src = binding.value
          stop()
        }
      })
    })
    app.directive('stopScroll', {
      mounted(el, binding) {
        document.body.style.overflow = 'hidden'
      },
      beforeUnmount(el, binding) {
        document.body.style.overflow = 'overlay'
      }
    })
  }
}
