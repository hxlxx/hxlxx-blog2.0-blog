<script setup lang="ts">
import { getPinnedArticle } from '@/api'
import type { TArticle } from '@/types'
import { Pushpin } from '@icon-park/vue-next'
import FeatureList from './components/feature-list/index.vue'
import HomeMain from './components/home-main/index.vue'

const pinnedArticle = ref<TArticle>()

onBeforeMount(() => {
  initPinnedArticle()
})

const initPinnedArticle = async () => {
  const { data } = (await getPinnedArticle()) || {}
  pinnedArticle.value = data
}
</script>

<template>
  <div>
    <!-- 每日一句 -->
    <div
      class="relative w-full h-[140px] mb-10 bg-transparent text-primary z-10"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
      accusantium consectetur assumenda officiis dolore nulla fugit nesciunt
      similique accusamus sequi perspiciatis quam vero deleniti ut quia
      molestias minima voluptatibus nisi? Illum amet, eveniet id mollitia ab rem
      ad quisquam eaque at recusandae reiciendis quibusdam beatae debitis
      numquam voluptatum. Sequi tempore repudiandae soluta fuga, ipsam nulla
      voluptatem quae rerum quod facere.
    </div>
    <!-- 置顶文章 -->
    <article-preview-main
      :article="pinnedArticle"
      :tag-icon="Pushpin"
      tag-label="pinned"
    />
    <!-- 推荐文章 -->
    <feature-list />
    <!-- 文章列表 -->
    <home-main />
  </div>
</template>

<style lang="scss" scoped></style>
