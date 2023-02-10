<script setup lang="ts">
type Props = {
  beianNumber: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="relative z-10 w-full h-20 flex flex-col justify-center items-center text-normal"
  >
    <span>Copyright © 2022 - 2023 hxlxx</span>
    <a href="https://beian.miit.gov.cn/" target="_blank"> {{ beianNumber }} </a>
  </div>
</template>
