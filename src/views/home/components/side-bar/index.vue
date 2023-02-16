<script setup lang="ts">
import { useSiteProfile } from '@/stores'
import type { TCommentItem, TTagAndCount, TWebsiteProfile } from '@/types'
import { getTagTop10, getRecentlyComment } from '@/api'
import { Message } from '@icon-park/vue-next'
import CommentsItem from './components/comments-item/index.vue'

const router = useRouter()
const profileStore = useSiteProfile()

const profile = reactive<TWebsiteProfile>({} as TWebsiteProfile)
const tagAndCount = ref<TTagAndCount[]>()
const commentList = ref<TCommentItem[]>()

onBeforeMount(() => {
  Object.assign(profile, profileStore.profile)
  initTagTop10()
  initRecentlyComment()
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
    <h-card :title-icon="Message" :title="$t('title.recentComments')">
      <ul class="flex flex-col items-center gap-1">
        <li
          class="w-full p-3 rounded-md bg-primary hover:shadow-primary transition-100"
          v-for="comment in commentList"
          :key="comment.id"
        >
          <comments-item :comment="comment" />
        </li>
      </ul>
    </h-card>
    <!-- 文章标签 -->
    <h-card :title-icon="Message" :title="$t('title.tags')">
      <ul class="flex flex-wrap gap-[6px] mb-[6px]">
        <li
          v-for="tag in tagAndCount"
          :key="tag.id"
          @click="router.push({ path: 'article-list', query: { ...tag } })"
        >
          <h-tag class="text-xs" :text="tag.tag_name" :count="tag.count" />
        </li>
      </ul>
      <span class="show-more" @click="router.push('/tags')">
        Show More...
      </span>
    </h-card>
    <!-- 公告 -->
    <h-card :title-icon="Message" :title="$t('title.notice')">
      <p class="text-sm">{{ profile?.websiteConfig?.notice }}</p>
    </h-card>
    <!-- 网站信息 -->
    <h-card :title-icon="Message" :title="$t('title.websiteInfo')">
      <span>建站时间：{{ profile?.websiteConfig?.webSite_created_at }}</span>
    </h-card>
  </div>
</template>

<style lang="postcss" scoped>
.show-more {
  @apply text-sm text-bright border-b-[2px] border-b-[var(--text-accent)] cursor-pointer transition-100;
  &:hover {
    color: var(--text-accent);
    opacity: 0.6;
  }
}
</style>
