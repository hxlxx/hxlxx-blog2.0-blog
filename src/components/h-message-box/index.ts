import { h, render } from 'vue'
import HMessageBox from './index.vue'

type MessageBoxOption = {
  title: string
  content: string
  callback?: () => void
}

export default function ({ title, content, callback }: MessageBoxOption) {
  const vnode = h(HMessageBox, {
    title,
    content,
    fn() {
      callback && callback()
      render(null, document.body)
    }
  })
  render(vnode, document.body)
}
