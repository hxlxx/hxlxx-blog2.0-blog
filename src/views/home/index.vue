<script setup lang="ts">
import { getPinnedArticle } from '@/api'
import type { TArticle } from '@/types'
import YiYan from './components/yi-yan/index.vue'
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
    <yi-yan />
    <!-- 置顶文章 -->
    <article-preview-main :article="pinnedArticle" />
    <!-- 推荐文章 -->
    <feature-list />
    <!-- 文章列表 -->
    <home-main />
  </div>
</template>

<style lang="scss" scoped></style>
