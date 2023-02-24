<script setup lang="ts">
import { getYiYan } from '@/api'
import { useYiYan } from '@/stores'
import { Refresh } from '@icon-park/vue-next'
import { useThrottleFn } from '@vueuse/core'

const yiyanStore = useYiYan()

const hitokoto = ref<string>()
const creator = ref<string>()

onBeforeMount(() => {
  if (!yiyanStore.yiyan.creator) {
    initYiYan()
  } else {
    creator.value = yiyanStore.yiyan.creator
    hitokoto.value = yiyanStore.yiyan.hitokoto
  }
})

const initYiYan = async () => {
  const { data } = (await getYiYan()) || {}
  creator.value = data.creator
  hitokoto.value = data.hitokoto
  yiyanStore.setYiyan({ creator: creator.value, hitokoto: hitokoto.value })
}

const throttledFn = useThrottleFn(() => {
  initYiYan()
}, 1000)
</script>

<template>
  <div class="relative mb-[60px] bg-transparent text-primary z-10">
    <div class="paragraph family-shuhei transition-200">
      <h1 class="break-all">{{ creator }}:</h1>
      <p>{{ hitokoto }}</p>
      <Refresh
        class="ml-5 cursor-pointer transition-all duration-300 ease-in-out hover:rotate-180"
        :title="$t('clickToChange')"
        @click="throttledFn"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.paragraph {
  @apply flex gap-3 justify-center items-center text-[20px] h-[60px] md:text-[40px] text-white;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5), -1px -1px 1px #fff;
}
</style>
