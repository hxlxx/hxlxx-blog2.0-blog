<script setup lang="ts">
type Props = {
  title: string
  content: string
  fn: () => void
}
defineProps<Props>()
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-full family-shuhei flex justify-center items-center bg-[rgba(0,0,0,0.2)] z-30"
  >
    <div class="bg-secondary p-5 rounded-xl">
      <div class="text-center mb-5">
        <span>{{ title }}</span>
      </div>
      <div class="text-[var(--color-red)]">
        <span>{{ content }}</span>
      </div>
      <div class="flex justify-center mt-5">
        <h-button @click="fn()">确定</h-button>
      </div>
    </div>
  </div>
</template>
