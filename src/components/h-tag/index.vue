<script setup lang="ts">
type Props = {
  text: string
  count: number | string
}

defineProps<Props>()
</script>

<template>
  <span
    class="inline-flex gap-[6px] px-3 py-1 text-xs rounded-md bg-primary hover:opacity-30 cursor-pointer transition-100"
  >
    <em class="text-gray-500">#</em>
    <span>{{ text }}</span>
    <b class="text-accent">{{ count }}</b>
  </span>
</template>
