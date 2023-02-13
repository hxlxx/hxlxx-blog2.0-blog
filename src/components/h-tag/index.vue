<script setup lang="ts">
type Props = {
  text: string
  count: number | string
}

defineProps<Props>()
</script>

<template>
  <span
    class="inline-flex gap-[0.75em] px-3 py-1 rounded-md bg-primary hover:opacity-30 cursor-pointer transition-100"
  >
    <span>
      <em class="mr-2 text-gray-500">#</em>
      <span>{{ text }}</span>
    </span>
    <b class="text-accent">{{ count }}</b>
  </span>
</template>
