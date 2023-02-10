<script setup lang="ts">
import type { TArticle } from '@/types'
import type { Icon } from '@icon-park/vue-next/lib/runtime'
import { useDateFormat } from '@vueuse/core'

type Props = {
  tagIcon?: Icon
  tagLabel?: string
  article?: TArticle
}

defineProps<Props>()
const router = useRouter()
</script>

<template>
  <div class="relative group">
    <span v-if="tagLabel" class="article-tag">
      <b class="article-tag-content">
        <component :is="tagIcon" />
        {{ $t(`articleTag.${tagLabel}`) }}
      </b>
    </span>
    <div class="flex flex-col w-full h-96 card group-hover-scale">
      <div class="w-full h-[40%]">
        <div class="cover">
          <img
            v-if="article?.cover_url"
            class="w-full h-full object-cover rounded-xl lg:rounded-none"
            :src="article.cover_url"
          />
          <img
            v-else
            class="w-full h-full object-cover rounded-xl lg:rounded-none"
            src="@/assets/imgs/pexels-kristina-paukshtite-712876.jpg"
          />
        </div>
      </div>
      <div class="flex flex-col w-full h-[60%] px-5 py-3 z-10">
        <span>
          <b class="mr-3 text-[20px] text-accent">
            {{ article?.category?.category_name }}
          </b>
          <ul class="inline-flex gap-2">
            <li v-for="tag in article?.tags" :key="tag.id">
              <em># {{ tag.tag_name }}</em>
            </li>
          </ul>
        </span>
        <h1
          class="mb-2"
          @click="
            router.push({ name: 'article-detail', params: { id: article?.id } })
          "
        >
          <span class="article-title text-bright transition-100">
            {{ article?.title }}
          </span>
        </h1>
        <p class="text-cutoff-4">
          {{ article?.content }}
        </p>
        <div class="flex gap-4 items-center flex-1">
          <div class="w-7 h-7 rounded-full overflow-hidden cursor-pointer">
            <img
              class="w-full h-full object-cover"
              :src="article?.author?.avatar_url"
            />
          </div>
          <span class="text-xs">
            <b class="mr-4 cursor-pointer hover:text-accent">
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
  @apply text-[24px] font-semibold cursor-pointer hover:opacity-50;
}
</style>
