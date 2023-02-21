<script setup lang="ts">
import { Fire } from '@icon-park/vue-next'
import { getFeaturedArticle } from '@/api'
import type { TArticle } from '@/types'

const featureArticles = ref<TArticle[]>()

onBeforeMount(() => {
  initFeatureArticles()
})

const initFeatureArticles = async () => {
  const { data } = (await getFeaturedArticle()) || {}
  featureArticles.value = data
}
</script>

<template>
  <div class="w-full flex gap-5 my-[60px]">
    <ul class="w-full flex flex-col lg:flex-row gap-10 lg:gap-5">
      <li
        class="w-full lg:w-[20%] h-44 lg:h-96 p-1 rounded-xl bg-gradient-to-br from-[var(--theme-bg-color-one)] to-[var(--theme-bg-color-two)]"
      >
        <div
          class="flex flex-col gap-5 items-center justify-center w-full h-full rounded-xl bg-secondary opacity-90"
        >
          <h1
            class="text-[32px] text-fill-transparent text-center font-semibold"
          >
            EDITOR'S SELECTION
          </h1>
          <span
            class="flex items-center gap-1 break-all text-bright text-[28px] font-semibold"
          >
            <fire size="2rem" />
            <span class="max-w-[140px]">{{ $t('featureArticles') }}</span>
          </span>
        </div>
      </li>
      <li
        class="relative w-full lg:w-[50%] group z-10"
        v-for="article in featureArticles"
        :key="article.id"
      >
        <article-preview :article="article" />
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.text-fill-transparent {
  background-image: var(--theme-gradient);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
