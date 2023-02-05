<script setup lang="ts">
import { ExpandDownOne } from '@icon-park/vue-next'

const categoryBarHeight = ref<string>('60px')
const handleExpandTags = () => {
  categoryBarHeight.value = categoryBarHeight.value ? '' : '60px'
}
</script>

<template>
  <div class="flex-1">
    <div class="mb-10">
      <ul
        class="relative flex gap-5 flex-wrap pl-5 pr-12 py-4 rounded-xl text-sm text-[var(--text-normal)] overflow-hidden bg-secondary shadow-primary"
        :style="{
          height: categoryBarHeight
        }"
      >
        <li class="category-item">
          <span class="inline-block px-4 py-1">{{ $t('all') }}</span>
        </li>
        <li class="category-item">
          <span
            class="inline-block px-2 py-1 theme-gradient text-white"
            :style="{
              textShadow: 'var(--text-shadow)'
            }"
          >
            jsssssss
          </span>
          <b class="inline-block px-2 py-1 text-[var(--text-accent)]"> 10 </b>
        </li>
        <li class="category-item">
          <span class="inline-block px-2 py-1">jsddddd</span>
          <b class="inline-block px-2 py-1 text-[var(--text-accent)]"> 10 </b>
        </li>
        <li class="category-item">
          <span class="inline-block px-2 py-1">jsd</span>
          <b class="inline-block px-2 py-1 text-[var(--text-accent)]"> 10 </b>
        </li>
        <li class="category-item">
          <span class="inline-block px-2 py-1">jss</span>
          <b class="inline-block px-2 py-1 text-[var(--text-accent)]"> 10 </b>
        </li>
        <li class="category-item">
          <span class="inline-block px-2 py-1">js</span>
          <b class="inline-block px-2 py-1 text-[var(--text-accent)]"> 10 </b>
        </li>
        <span
          class="absolute top-[20px] right-[24px] cursor-pointer hover:opacity-50 transition-100"
          :style="{
            transition: 'transform 0.2s linear',
            transform: !categoryBarHeight ? 'rotate(180deg)' : ''
          }"
          @click="handleExpandTags"
        >
          <ExpandDownOne size="20px" />
        </span>
      </ul>
    </div>
    <!-- 文章列表 -->
    <ul class="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <li><article-preview /></li>
      <li><article-preview /></li>
      <li><article-preview /></li>
      <li><article-preview /></li>
    </ul>
  </div>
</template>
