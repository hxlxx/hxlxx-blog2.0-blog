import type { TThemeType } from '@/types'
import { h, render } from 'vue'
import Message from './index.vue'

type MessageOption = {
  message: string
  type?: TThemeType
}

export default function ({ message, type }: MessageOption) {
  const vnode = h(Message, {
    message,
    type,
    destroyFn() {
      render(null, document.body)
    }
  })
  render(vnode, document.body)
}
