<script setup lang="ts">
import type { TArticle } from '@/types'
import { Pushpin } from '@icon-park/vue-next'
import type { Icon } from '@icon-park/vue-next/lib/runtime'

type Props = {
  icon: Icon
  article: TArticle
}

defineProps<Props>()
</script>

<template>
  <div class="relative group z-10">
    <span class="article-tag">
      <b class="article-tag-content">
        <Pushpin />
        {{ $t('articleTag.pinned') }}
      </b>
    </span>
    <div class="flex flex-col w-full h-96 card group-hover-scale">
      <div class="w-full h-[40%]">
        <div class="cover">
          <img
            class="w-full h-full object-cover rounded-xl"
            src="@/assets/imgs/pexels-kristina-paukshtite-712876.jpg"
          />
        </div>
      </div>
      <div class="flex flex-col w-full h-[60%] px-5 py-3 z-10">
        <span>
          <b class="mr-3 text-[var(--text-accent)]">CATEGORY</b>
          <em># TAG</em>
        </span>
        <h1 class="mb-2">
          <span class="article-title transition-100"> TITLE </span>
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Necessitatibus ea voluptatibus minus sit amet aperiam explicabo
        </p>
        <div class="flex gap-4 items-center flex-1">
          <div class="w-7 h-7 rounded-full bg-pink-400"></div>
          <span class="text-xs">
            <b class="mr-4">USERNAME</b>
            <em>PUBLISH TIME</em>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.cover {
  @apply relative w-full h-[120%];

  &:after {
    @apply absolute -bottom-3 right-0 w-full  h-[50%];
    pointer-events: none;
    display: block;
    content: '';
    background: var(--article-cover-col);
  }
}
.article-title {
  @apply text-[24px] text-[var(--text-bright)] font-semibold cursor-pointer hover:opacity-50;
}
</style>
