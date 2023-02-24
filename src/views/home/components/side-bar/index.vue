<script setup lang="ts">
import { useSiteProfile } from '@/stores'
import type { TCommentItem, TTagAndCount, TWebsiteProfile } from '@/types'
import { getTagTop10, getRecentlyComment } from '@/api'
import { Message } from '@icon-park/vue-next'
import CommentsItem from './components/comments-item/index.vue'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const profileStore = useSiteProfile()
const { t } = useI18n()

const profile = reactive<TWebsiteProfile>({} as TWebsiteProfile)
const tagAndCount = ref<TTagAndCount[]>([])
const commentList = ref<TCommentItem[]>([])
const timeOffset = ref<number>(0)
const timer = ref<number>(0)
const runningTime = computed(() => {
  const yOffset = 60 * 60 * 24 * 365
  const MOffset = 60 * 60 * 24 * 30
  const dOffset = 60 * 60 * 24
  const hOffset = 60 * 60
  const mOffset = 60
  const time = Math.round(timeOffset.value / 1000)
  const year = Math.floor(time / yOffset)
  const month = Math.floor((time % yOffset) / MOffset)
  const day = Math.floor(((time % yOffset) % MOffset) / dOffset)
  const hour = Math.floor((((time % yOffset) % MOffset) % dOffset) / hOffset)
  const minute = Math.floor(
    ((((time % yOffset) % MOffset) % dOffset) % hOffset) / mOffset
  )
  const second = Math.floor(
    ((((time % yOffset) % MOffset) % dOffset) % hOffset) % mOffset
  )
  return `${year ? year + ' ' + t('date.year') + '  ' : ''}${
    month ? month + ' ' + t('date.month') + '  ' : ''
  }${day ? day + ' ' + t('date.day') + '  ' : ''}${
    hour ? hour + ' ' + t('date.hour') + '  ' : ''
  }${minute ? minute + ' ' + t('date.minute') + '  ' : ''}${
    second ? second + ' ' + t('date.second') + '  ' : ''
  }`
})

onBeforeMount(() => {
  Object.assign(profile, profileStore.profile)
  initTagTop10()
  initRecentlyComment()
})
onMounted(() => {
  const createdAt = new Date(
    profile.websiteConfig?.webSite_created_at || '2023-01-01'
  ).getTime()
  timer.value = setInterval(() => {
    const now = new Date().getTime()
    timeOffset.value = now - createdAt
  }, 1000)
})

const initTagTop10 = async () => {
  const { data } = (await getTagTop10()) || {}
  tagAndCount.value = data
}
const initRecentlyComment = async () => {
  const { data } = (await getRecentlyComment()) || {}
  commentList.value = data
}
</script>

<template>
  <div class="hidden xl:flex flex-col gap-10">
    <!-- 网站信息 -->
    <profile-card :profile="profile" />
    <!-- 最新评论 -->
    <h-card>
      <template #header>
        <span class="card-title text-bright">
          <Message :stroke-width="5" />
          <span>
            {{ $t('title.recentComments') }}
          </span>
        </span>
      </template>
      <ul v-if="commentList.length" class="flex flex-col items-center gap-1">
        <li
          class="w-full p-3 rounded-md bg-primary hover:shadow-primary transition-100"
          v-for="comment in commentList"
          :key="comment.id"
        >
          <comments-item :comment="comment" />
        </li>
      </ul>
      <div v-else>
        <span>
          {{ $t('placeholder.noComments') }}
        </span>
      </div>
    </h-card>
    <!-- 文章标签 -->
    <h-card>
      <template #header>
        <span class="card-title text-bright">
          <Message :stroke-width="5" />
          <span>
            {{ $t('title.tags') }}
          </span>
        </span>
      </template>
      <div v-if="tagAndCount.length">
        <ul class="flex flex-wrap gap-[6px] mb-[6px]">
          <li
            v-for="tag in tagAndCount"
            :key="tag.id"
            @click="router.push({ path: 'article-list', query: { ...tag } })"
          >
            <h-tag class="text-xs" :text="tag.tag_name" :count="tag.count" />
          </li>
        </ul>
        <span class="show-more transition-100" @click="router.push('/tags')">
          Show More...
        </span>
      </div>
      <div v-else>
        <span>
          {{ $t('placeholder.noTags') }}
        </span>
      </div>
    </h-card>
    <!-- 公告 -->
    <h-card>
      <template #header>
        <span class="card-title text-bright">
          <Message :stroke-width="5" />
          <span>
            {{ $t('title.notice') }}
          </span>
        </span>
      </template>
      <p class="text-sm">
        {{ profile?.websiteConfig?.notice || $t('placeholder.noNotice') }}
      </p>
    </h-card>
    <!-- 网站信息 -->
    <h-card>
      <template #header>
        <span class="card-title text-bright">
          <Message :stroke-width="5" />
          <span>
            {{ $t('title.websiteInfo') }}
          </span>
        </span>
      </template>
      <div class="flex flex-col gap-1 mb-1">
        <span>
          {{ $t('runningTime') }}
        </span>
        <span>
          {{ runningTime }}
        </span>
      </div>
      <div>
        <span> {{ $t('viewTimes') }}： </span>
        <span>{{ profile?.viewCount || 1 }}</span>
      </div>
    </h-card>
  </div>
</template>

<style lang="postcss" scoped>
.show-more {
  @apply text-sm text-bright border-b-[2px] border-b-[var(--text-accent)] cursor-pointer;
  &:hover {
    color: var(--text-accent);
    opacity: 0.6;
  }
}
.card-title {
  @apply flex items-center gap-1 py-1 text-[20px] font-semibold;
}
</style>
