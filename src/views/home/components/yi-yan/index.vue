<script setup lang="ts">
import { getYiYan } from '@/api'
import { useYiYan } from '@/stores'
import { Refresh } from '@icon-park/vue-next'
import { useThrottleFn } from '@vueuse/core'

const yiyanStore = useYiYan()

const hitokoto = ref<string>()
const creator = ref<string>()
const loading = ref<boolean>(false)

onBeforeMount(() => {
  if (!yiyanStore.yiyan.creator) {
    initYiYan()
  } else {
    creator.value = yiyanStore.yiyan.creator
    hitokoto.value = yiyanStore.yiyan.hitokoto
  }
})

const initYiYan = async () => {
  loading.value = true
  const { data } = (await getYiYan()) || {}
  creator.value = data.creator
  hitokoto.value = data.hitokoto
  yiyanStore.setYiyan({ creator: creator.value, hitokoto: hitokoto.value })
  loading.value = false
}

const throttleFn = useThrottleFn(() => {
  initYiYan()
}, 1000)
</script>

<template>
  <div class="relative mb-[60px] bg-transparent text-primary z-10">
    <div class="paragraph family-shuhei transition-200">
      <h1 class="text-cutoff-1">{{ creator }}:</h1>
      <p>{{ hitokoto }}</p>
      <Refresh
        :class="['refresh-btn', loading ? 'loading' : '']"
        :title="$t('clickToChange')"
        @click="throttleFn"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.paragraph {
  @apply flex gap-3 justify-center items-center text-[20px] h-[60px] md:text-[40px] text-white;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5), -1px -1px 1px #fff;
}
.refresh-btn {
  @apply ml-5 cursor-pointer transition-all duration-300 ease-in-out hover:rotate-180;
}
.loading {
  @apply pointer-events-none opacity-50;
}
</style>
