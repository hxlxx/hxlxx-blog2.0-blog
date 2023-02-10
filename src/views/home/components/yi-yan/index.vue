<script setup lang="ts">
import { getYiYan } from '@/api'

const hitokoto = ref<string>()
const creator = ref<string>()

onBeforeMount(() => {
  initYiYan()
})

const initYiYan = async () => {
  const { data } = (await getYiYan()) || {}
  creator.value = data.creator
  hitokoto.value = data.hitokoto
}
</script>

<template>
  <div class="relative mb-[60px] bg-transparent text-primary z-10">
    <div class="paragraph">
      <h1>{{ creator }}:</h1>
      <p>{{ hitokoto }}</p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.paragraph {
  @apply flex gap-3 justify-center text-[40px] text-white family-shuhei;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5), -1px -1px 1px #fff;
}
</style>
