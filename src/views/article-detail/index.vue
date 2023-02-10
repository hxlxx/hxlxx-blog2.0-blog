<script setup lang="ts">
import { getArticleDetail } from '@/api'
import { useSiteProfile } from '@/stores'
import type { TArticle, TWebsiteProfile } from '@/types'
import { useDateFormat } from '@vueuse/core'
import { RocketOne, LeftC, MessageEmoji } from '@icon-park/vue-next'
import MdEditorV3 from 'md-editor-v3'
import * as tocbot from 'tocbot'

const route = useRoute()
const router = useRouter()
const profileStore = useSiteProfile()

const profile = reactive<TWebsiteProfile>({} as TWebsiteProfile)
const article = ref<TArticle>({ content: '' } as TArticle)

onBeforeMount(() => {
  Object.assign(profile, profileStore.profile)
  initArticleDetail(parseInt(route.params.id as string))
  initTocbot()
})
onBeforeUnmount(() => {
  tocbot.destroy()
})

watch(
  () => route.params.id,
  (newVal) => {
    newVal && initArticleDetail(parseInt(newVal as string))
  }
)

const initArticleDetail = async (id: number) => {
  const { data } = (await getArticleDetail(id)) || {}
  article.value = data
}
const initTocbot = () => {
  tocbot.init({
    tocSelector: '#tocbot',
    contentSelector: '.test',
    headingSelector: 'h1, h2, h3',
    hasInnerContainers: false,
    headingsOffset: -200, // toc-list 判断 active 的基准线，以 document 为参照
    scrollSmoothOffset: -150, // 跳转到锚点的偏移，基准点向下为负，向上为正
    onClick: (e) => {
      e.preventDefault()
    }
  })
}
const handleHtmlChanged = () => {
  nextTick(() => {
    tocbot.refresh()
  })
}
const handleToTop = () => {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  })
}
const handleToComments = () => {}
</script>

<template>
  <div>
    <div class="text-white">
      <div class="flex gap-3 text-sm">
        <b class="text-shadow-primary">{{ article.category?.category_name }}</b>
        <ul class="flex gap-3">
          <li v-for="tag in article.tags" :key="tag.id">
            <span class="text-shadow-primary"># {{ tag.tag_name }}</span>
          </li>
        </ul>
      </div>
      <h1 class="text-[64px] text-shadow-primary">{{ article.title }}</h1>
      <div class="flex gap-3 items-center">
        <div class="w-[30px] h-[30px] rounded-full overflow-hidden">
          <img :src="article.author?.avatar_url" />
        </div>
        <b class="opacity-80">{{ article.author?.username }}</b>
        <span class="flex gap-2 opacity-70">
          <span>
            published on
            <em>{{ useDateFormat(article.created_at, 'MMM, d, YYYY') }}</em>
          </span>
          <span>{{ (article.content.length / 1000).toFixed(1) + 'K' }}</span>
          <span>time-1min</span>
        </span>
      </div>
    </div>
    <div class="flex gap-10 mt-10">
      <div class="flex-1">
        <div class="test card p-10">
          <md-editor-v3
            class="md-editor"
            v-model="article!.content"
            preview-only
            :style="{
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-normal)'
            }"
            @on-html-changed="handleHtmlChanged"
          />
        </div>
        <div class="my-10">
          <div class="flex justify-between mb-5">
            <span>previous</span>
            <span>next</span>
          </div>
          <div class="flex gap-10">
            <div class="w-1/2">
              <article-preview :article="article.preArticle" />
            </div>
            <div class="w-1/2">
              <article-preview :article="article.nextArticle" />
            </div>
          </div>
        </div>
        <div>
          <div class="card p-10 h-[1000px]"></div>
        </div>
      </div>
      <div class="hidden lg:flex flex-col gap-10 w-[324px]">
        <profile-card :profile="profile" />
        <div class="sticky top-[130px] left-0">
          <div class="card p-10 pt-5 mb-10">
            <h1 class="mb-2 text-bright text-[20px]">
              <b>{{ $t('title.catalog') }}</b>
            </h1>
            <div id="tocbot"></div>
          </div>
          <div class="card flex justify-around items-center p-5">
            <div class="action-bar" @click="router.go(-1)">
              <left-c size="32px" />
            </div>
            <div class="action-bar" @click="handleToTop">
              <rocket-one size="32px" />
            </div>
            <div class="action-bar" @click="handleToComments">
              <message-emoji size="32px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.md-editor {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--text-bright);
  }
  h1 {
    @apply relative text-[32px];
  }
  h2 {
    @apply relative text-[30px];
  }
  h3 {
    @apply relative text-[28px];
  }
  h4 {
    @apply relative text-[26px];
  }
  h5 {
    @apply relative text-[24px];
  }
  h6 {
    @apply relative text-[22px];
  }
  h1::after,
  h2::after,
  h3::after,
  h4::after,
  h5::after,
  h6::after {
    @apply absolute block -bottom-2 left-0 w-[98px] h-1 rounded-[2px];
    content: '';
    background: var(--theme-gradient);
  }
}
.toc-list {
  a {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--max-lines-1);
  }
  .toc-list-item {
    @apply relative;
  }
  .toc-list-item::before {
    @apply block absolute top-1/2 -left-5 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-[var(--text-accent)];
    content: '';
  }
  .is-active-li {
    color: var(--text-accent);
  }
  .toc-link::before {
    display: none;
  }
}
.action-bar {
  @apply cursor-pointer transition-100 text-bright hover:text-accent;
}
</style>