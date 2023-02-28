<script setup lang="ts">
import type { TArticle } from '@/types'
import { Pushpin } from '@icon-park/vue-next'
import { useDateFormat } from '@vueuse/core'

type Props = {
  article?: TArticle
}

defineProps<Props>()
const router = useRouter()
</script>

<template>
  <div class="relative group">
    <span v-if="article?.top || article?.recommend" class="article-tag">
      <b class="article-tag-content">
        <pushpin />
        {{
          $t(
            `articleTag.${
              article?.top ? 'pinned' : article?.recommend ? 'featured' : ''
            }`
          )
        }}
      </b>
    </span>
    <div class="flex flex-col lg:flex-row w-full h-98 card group-hover-scale">
      <div class="w-full lg:w-1/2 h-[40%] lg:h-full">
        <div class="cover">
          <img
            class="w-full h-full object-cover rounded-xl lg:rounded-none"
            v-lazy="article?.cover_url"
          />
        </div>
      </div>
      <div
        class="flex flex-col w-full lg:w-1/2 h-[60%] lg:h-full px-5 py-3 lg:p-10 z-10"
      >
        <span>
          <b class="mr-5 text-[20px] text-accent">
            {{ article?.category?.category_name }}
          </b>
          <ul class="inline-flex gap-2">
            <li v-for="tag in article?.tags" :key="tag.id">
              <em># {{ tag.tag_name }}</em>
            </li>
          </ul>
        </span>
        <h1
          class="mb-4 lg:my-6"
          @click="
            router.push({ name: 'article-detail', params: { id: article?.id } })
          "
        >
          <span class="article-title break-all text-bright transition-100">
            {{ article?.title }}
          </span>
        </h1>
        <p class="text-cutoff-4">
          {{ article?.content }}
        </p>
        <div class="flex gap-4 items-center flex-1">
          <div class="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
            <img
              class="w-full h-full object-cover"
              :src="article?.author?.avatar_url"
            />
          </div>
          <span class="text-sm">
            <b class="mr-4 cursor-pointer hover:text-accent transition-100">
              {{ article?.author?.username }}
            </b>
            <em>{{ useDateFormat(article?.created_at, 'MMM, D, YYYY') }}</em>
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
  @apply text-[24px] lg:text-[32px] font-semibold cursor-pointer hover:opacity-50;
}
</style>
