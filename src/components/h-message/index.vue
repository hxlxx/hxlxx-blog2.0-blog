<script setup lang="ts">
import type { TThemeType } from '@/types'
type PropsData = {
  message: string
  type?: TThemeType
  destroyFn: () => void
}

const props = withDefaults(defineProps<PropsData>(), {
  type: 'default'
})

const messageBoxRef = ref<HTMLElement>()

let timer1 = setTimeout(() => {
  if (messageBoxRef.value) {
    messageBoxRef.value.style.top = '-100px'
    messageBoxRef.value.style.opacity = '0'
  }
  clearTimeout(timer1)
}, 3000)
let timer2 = setTimeout(() => {
  props.destroyFn()
  clearTimeout(timer2)
}, 3500)
</script>

<template>
  <div
    class="message-box bg-[var(--background-secondary)] shadow-primary"
    ref="messageBoxRef"
  >
    <div :class="['message', props.type]">
      <span class="content family-shuhei">{{ props.message }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.message-box {
  position: fixed;
  top: 40px;
  left: 50%;
  text-align: center;
  border-radius: 5px;
  transform: translateX(-50%);
  overflow: hidden;
  transition: top 0.3s ease-in, opacity 0.2s linear;
  animation: show 0.3s ease-out;
  z-index: 99;
  .message {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
  }
  .default {
    color: var(--text-bright);
  }
  .primary {
    color: var(--color-blue);
  }
  .success {
    color: var(--color-green);
  }
  .info {
    color: var(--color-gray);
  }
  .warning {
    color: var(--color-orange);
  }
  .danger {
    color: var(--color-red);
  }
}

@keyframes show {
  from {
    top: 0;
    opacity: 0;
  }
  to {
    top: 40px;
    opacity: 1;
  }
}
</style>
