<script setup lang="ts">
import { createComment, getArticleDetail, getCommentList } from '@/api'
import { useSiteProfile, useUser } from '@/stores'
import type { TArticle, TWebsiteProfile, TComment, TQueryInfo } from '@/types'
import { useDateFormat } from '@vueuse/core'
import {
  RocketOne,
  LeftC,
  MessageEmoji,
  Back,
  Next,
  Text,
  StopwatchStart
} from '@icon-park/vue-next'
import MdEditor from 'md-editor-v3'
import * as tocbot from 'tocbot'
import hMessage from '@/components/h-message'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const i18n = useI18n()
const userStore = useUser()
const profileStore = useSiteProfile()

const commentRef = ref<HTMLElement>()
const profile = reactive<TWebsiteProfile>({} as TWebsiteProfile)
const article = reactive<TArticle>({ content: '' } as TArticle)
const showCatalog = ref<boolean>(true)
const commentList = ref<TComment[]>([])
const query = reactive<TQueryInfo>({
  page: 1,
  skip: 0,
  limit: 7
})
const total = ref<number>(0)
const hasMore = computed(() => query.page! * query.limit! < total.value)

onBeforeMount(() => {
  Object.assign(profile, profileStore.profile)
  initArticleDetail(parseInt(route.params.id as string))
  initCommentList()
  initTocbot()
})
onBeforeUnmount(() => {
  tocbot.destroy()
})

watch(
  () => route.params.id,
  (newVal) => {
    if (newVal) {
      initArticleDetail(parseInt(newVal as string))
      query.page = 1
      initCommentList()
    }
  }
)

const initArticleDetail = async (id: number) => {
  const { data } = (await getArticleDetail(id)) || {}
  Object.assign(article, data)
}
const initCommentList = async (flag?: boolean) => {
  const skip = (query.page! - 1) * query.limit!
  const { data } =
    (await getCommentList(
      2,
      { skip, limit: query.limit },
      parseInt(route.params.id as string)
    )) || {}
  commentList.value = flag ? [...commentList.value, ...data.res] : data.res
  total.value = data.count
}
// 初始化目录列表
const initTocbot = () => {
  tocbot.init({
    tocSelector: '#tocbot',
    contentSelector: '.article',
    headingSelector: 'h1, h2, h3',
    hasInnerContainers: false,
    // collapseDepth: 0,
    headingsOffset: -200, // toc-list 判断 active 的基准线，以 document 为参照
    scrollSmoothOffset: -150, // 跳转到锚点的偏移，基准点向下为负，向上为正
    onClick: (e) => {
      e.preventDefault()
    }
  })
}
const handleHtmlChanged = () => {
  nextTick(() => {
    // 目录有长度才渲染
    showCatalog.value && tocbot.refresh()
  })
}
// 获取目录长度
const handleGetCatalog = (list: any[]) => {
  showCatalog.value = !!list.length
}
// 回到顶部
const handleToTop = () => {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  })
}
// 去评论区
const handleToComments = () => {
  commentRef.value?.scrollIntoView({
    behavior: 'smooth'
  })
}
// 发布评论
const handleSubmitComment = async (
  content: string,
  pid?: number,
  reply_to?: string
) => {
  const comment = {
    pid,
    uid: userStore.user.id,
    topic_id: article.id,
    reply_to,
    content,
    type: 2
  }
  if (!userStore.token) {
    return hMessage({
      type: 'danger',
      message: i18n.t('message.commentAfterLogin')
    })
  }
  const { code } = (await createComment({ data: comment })) || {}
  if (code === 200) {
    hMessage({
      type: 'success',
      message: i18n.t('message.commentSuccess')
    })
    query.page = 1
    initCommentList()
  }
}
// 加载更多评论
const handleLoadMore = () => {
  query.page!++
  initCommentList(true)
}
</script>

<template>
  <div>
    <div class="text-white">
      <div class="flex gap-3 text-sm text-shadow-primary">
        <b>{{ article.category?.category_name }}</b>
        <ul class="flex gap-3">
          <li v-for="tag in article.tags" :key="tag.id">
            <span># {{ tag.tag_name }}</span>
          </li>
        </ul>
      </div>
      <h1 class="text-[32px] lg:text-[64px] transition-200 text-shadow-primary">
        {{ article.title }}
      </h1>
      <div class="flex gap-3 items-center">
        <div class="w-[30px] h-[30px] rounded-full overflow-hidden">
          <img :src="article.author?.avatar_url" />
        </div>
        <b class="opacity-80">{{ article.author?.username }}</b>
        <span class="flex gap-2 opacity-70">
          <span>
            <em>{{ useDateFormat(article.created_at, 'MMM, d, YYYY') }}</em>
          </span>
          <span class="hidden md:inline-flex md:items-center md:gap-1 ml-2">
            <Text />
            <span>
              {{ (article.content.length / 1000).toFixed(1) + 'K' }}
            </span>
          </span>
          <span class="hidden md:inline-flex md:items-center md:gap-1 ml-2">
            <stopwatch-start />
            {{ (article.content.length / 250).toFixed(1) + 'min' }}
          </span>
        </span>
      </div>
    </div>
    <div class="flex gap-10 mt-10">
      <div class="flex-1">
        <div class="article card p-10">
          <md-editor
            class="md-editor"
            v-model="article!.content"
            preview-only
            :style="{
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-normal)'
            }"
            @on-html-changed="handleHtmlChanged"
            @get-catalog="handleGetCatalog"
          />
        </div>
        <div class="my-10">
          <div class="grid gap-5 grid-cols-1 lg:grid-cols-2">
            <div>
              <div class="text-center lg:text-left">
                <span class="relation text-bright">
                  <Back fill="var(--text-accent)" :stroke-width="5" />
                  previous
                  <span
                    class="absolute bottom-0 left-0 w-full lg:w-[60px] h-1 rounded-[1px] theme-gradient"
                  ></span>
                </span>
              </div>
              <article-preview :article="article.preArticle" />
            </div>
            <div>
              <div class="text-center lg:text-right">
                <span class="relation text-bright">
                  next
                  <Next fill="var(--text-accent)" :stroke-width="5" />
                  <span
                    class="absolute bottom-0 right-0 w-full lg:w-[60px] h-1 rounded-[1px] theme-gradient"
                  ></span>
                </span>
              </div>
              <article-preview :article="article.nextArticle" />
            </div>
          </div>
        </div>
        <div ref="commentRef">
          <h-card class="px-10 py-5">
            <template #header>
              <h1 class="pb-2 text-[32px] text-bright">
                {{ $t('title.comments') }}
              </h1>
            </template>
            <h-comment
              :comments="commentList"
              @on-submit="handleSubmitComment"
            />
            <div v-if="hasMore" class="text-center mt-5">
              <span
                class="inline-block p-3 cursor-pointer rounded-md text-white text-shadow-primary family-shuhei theme-gradient transition-200 hover:opacity-60 shadow-primary"
                @click="handleLoadMore"
              >
                {{ $t('button.loadMore') }}
              </span>
            </div>
          </h-card>
        </div>
      </div>
      <div class="hidden xl:flex flex-col gap-10 w-[324px] flex-shrink-0">
        <profile-card :profile="profile" />
        <div class="sticky top-[130px] left-0">
          <div v-if="showCatalog" class="card p-5 mb-10">
            <h1 class="mb-2 text-bright text-[20px]">
              <b>{{ $t('title.catalog') }}</b>
            </h1>
            <div id="tocbot"></div>
          </div>
          <div class="card flex justify-center items-center gap-12 p-5">
            <div
              class="action-bar transition-100 text-bright hover:text-accent"
              @click="router.go(-1)"
            >
              <left-c size="32px" />
            </div>
            <div
              class="action-bar transition-100 text-bright hover:text-accent"
              @click="handleToTop"
            >
              <rocket-one size="32px" />
            </div>
            <div
              class="action-bar transition-100 text-bright hover:text-accent"
              @click="handleToComments"
            >
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
    @apply absolute block -bottom-2 left-0 w-[98px] h-[6px] rounded-[2px];
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
    position: relative;
    padding-left: 30px;
    &::after {
      @apply block absolute top-1/2 left-2 -translate-y-[25%] w-[6px] h-[6px] rounded-full bg-[var(--text-accent)];
      content: '';
    }
  }
  .is-active-link {
    color: var(--text-accent);
  }
  .toc-link::before {
    display: none;
  }
}
.action-bar {
  @apply cursor-pointer;
}
.relation {
  @apply relative inline-flex items-center gap-2 pb-3 mb-10 text-[24px];
}
</style>
