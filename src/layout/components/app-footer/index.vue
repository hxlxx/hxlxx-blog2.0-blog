<script setup lang="ts">
type Props = {
  beianNumber: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="relative w-full h-32 flex flex-col gap-1 justify-center items-center text-normal bg-primary transition-200"
  >
    <span>Copyright © 2022 - 2023 <b class="family-shuhei">hxlxx</b></span>
    <a
      href="https://beian.miit.gov.cn/"
      target="_blank"
      class="family-shuhei border-b-2 border-b-[var(--text-accent)] transition-200 hover:text-[var(--text-accent)]"
    >
      {{ beianNumber }}
    </a>
  </div>
</template>
