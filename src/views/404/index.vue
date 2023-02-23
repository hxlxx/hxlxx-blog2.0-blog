<script setup lang="ts">
import lottie from 'lottie-web'
import notFoundLottie from '@/assets/lotties/404-error.json'
import robotLottie from '@/assets/lotties/robot-walk.json'
import { ArrowLeft } from '@icon-park/vue-next'

const robotRef = ref<HTMLElement>()
const notFoundRef = ref<HTMLElement>()

onMounted(() => {
  lottie.loadAnimation({
    container: robotRef.value!,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: robotLottie
  })
  lottie.loadAnimation({
    container: notFoundRef.value!,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: notFoundLottie
  })
})
</script>
<template>
  <div>
    <div
      class="flex gap-20 items-center text-white text-shadow-primary mb-10 family-shuhei"
    >
      <h1 class="text-[64px]">{{ $t('pageNotFound') }}</h1>
      <span
        class="flex gap-2 items-center self-end pb-3 text-[20px] cursor-pointer transition-100 hover:text-accent"
        @click="$router.go(-1)"
      >
        <arrow-left />
        GO Back
      </span>
    </div>
    <div class="card p-10 flex gap-[15%] items-end">
      <div ref="notFoundRef" class="w-[40%]"></div>
      <div ref="robotRef" class="w-[30%]"></div>
    </div>
  </div>
</template>
