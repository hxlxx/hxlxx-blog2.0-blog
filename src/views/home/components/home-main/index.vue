<script setup lang="ts">
import { BookOne } from '@icon-park/vue-next'
import ArticleList from '../article-list/index.vue'
import SideBar from '../side-bar/index.vue'
</script>

<template>
  <div>
    <div class="relative mb-10 text-[30px]">
      <span class="flex items-center gap-2 py-1 text-[var(--text-bright)]">
        <BookOne size="2rem" />
        <span class="font-medium">
          {{ $t('title.articles') }}
        </span>
        <span
          class="absolute left-0 bottom-0 w-24 h-1 rounded-[2px] theme-gradient"
        ></span>
      </span>
    </div>
    <div class="w-full flex gap-[30px]">
      <!-- 文章分类 -->
      <article-list />
      <!-- 侧边栏 -->
      <side-bar />
    </div>
  </div>
</template>
