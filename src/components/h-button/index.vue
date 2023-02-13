<script setup lang="ts">
import type { TThemeType } from '@/types'

type Props = {
  type?: TThemeType
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  disabled: false
})
const emits = defineEmits(['click'])

const handleClick = (e: MouseEvent) => {
  emits('click', e)
}
</script>

<template>
  <button
    :class="[
      props.type,
      'family-shuhei',
      'px-[10px]',
      'py-[6px]',
      'bg-primary',
      'rounded-[5px]',
      'transition-100',
      'box-border'
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style lang="postcss" scoped>
button {
  border: none;
  outline: none;
}
.default:not(:disabled) {
  color: var(--text-bright);
}
.default:not(:disabled):hover {
  color: white;
  background-color: var(--text-normal);
}
.primary:not(:disabled) {
  color: var(--color-blue);
}
.primary:not(:disabled):hover {
  color: white;
  background-color: var(--color-blue);
}
.success:not(:disabled) {
  color: var(--color-green);
}
.success:not(:disabled):hover {
  color: white;
  background-color: var(--color-green);
}
.info:not(:disabled) {
  color: var(--color-gray);
}
.info:not(:disabled):hover {
  color: white;
  background-color: var(--color-gray);
}
.warning:not(:disabled) {
  color: var(--color-orange);
}
.warning:not(:disabled):hover {
  color: white;
  background-color: var(--color-orange);
}
.danger:not(:disabled) {
  color: var(--color-red);
}
.danger:not(:disabled):hover {
  color: white;
  background-color: var(--color-red);
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
