<script setup lang="ts">
type Props = {
  modelValue: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

// 关闭登录框
const handleCloseDialog = (e: Event) => {
  const id = (e.target as HTMLElement).id
  if (id === 'dialog-container') {
    emits('update:modelValue', !props.modelValue)
  }
}
</script>

<template>
  <div
    v-if="modelValue"
    id="dialog-container"
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.2)] z-30"
    @click="handleCloseDialog"
  >
    <slot />
  </div>
</template>
