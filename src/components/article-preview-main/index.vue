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
    <div class="flex flex-col lg:flex-row w-full h-98 card group-hover-scale">
      <div class="w-full lg:w-1/2 h-[40%] lg:h-full">
        <div class="cover">
          <img
            class="w-full h-full object-cover rounded-xl lg:rounded-none"
            src="@/assets/imgs/pexels-kristina-paukshtite-712876.jpg"
          />
        </div>
      </div>
      <div
        class="flex flex-col w-full lg:w-1/2 h-[60%] lg:h-full px-5 py-3 lg:p-10 z-10"
      >
        <span>
          <b class="mr-5 text-[var(--text-accent)]">CATEGORY</b>
          <em># TAG</em>
        </span>
        <h1 class="mb-4 lg:my-6">
          <span class="article-title transition-100"> TITLE </span>
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Necessitatibus ea voluptatibus minus sit amet aperiam explicabo
          consequuntur, harum, hic labore id porro, laudantium et at vel. Non
          quo architecto dolor? Harum sunt atque non alias voluptates accusamus
        </p>
        <div class="flex gap-4 items-center flex-1">
          <div class="w-10 h-10 rounded-full bg-pink-400"></div>
          <span class="text-sm">
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
  @apply relative w-full lg:w-[120%] h-[120%] lg:h-full;

  &:after {
    @apply absolute -bottom-3 lg:top-0 right-0 lg:-right-3 w-full lg:w-[30%] h-[50%] lg:h-full;
    pointer-events: none;
    display: block;
    content: '';
    background: var(--article-cover-col);

    @media (min-width: 1024px) {
      background: var(--article-cover-row);
    }
  }
}
.article-title {
  @apply text-[24px] lg:text-[32px] text-[var(--text-bright)] font-semibold cursor-pointer hover:opacity-50;
}
</style>
