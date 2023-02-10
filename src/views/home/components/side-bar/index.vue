<script setup lang="ts">
import { useSiteProfile } from '@/stores'
import type { TTag, TTagAndCount, TWebsiteProfile } from '@/types'
import { getTagAndCount } from '@/api'
import { Message } from '@icon-park/vue-next'
import CommentsItem from './components/comments-item/index.vue'

const router = useRouter()
const profileStore = useSiteProfile()

const profile = reactive<TWebsiteProfile>({} as TWebsiteProfile)
const tagAndCount = ref<TTagAndCount[]>()

onBeforeMount(() => {
  Object.assign(profile, profileStore.profile)
  initTagAndCount()
})

const initTagAndCount = async () => {
  const { data } = (await getTagAndCount()) || {}
  tagAndCount.value = data
}
// 点击标签跳转到文章列表
const handleClickTag = ({ id, tag_name }: TTag) => {
  router.push({
    path: '/article-list',
    query: { id, tag_name }
  })
}
</script>

<template>
  <div class="hidden xl:block">
    <!-- 网站信息 -->
    <div class="mb-10">
      <profile-card :profile="profile" />
    </div>
    <!-- 最新评论 -->
    <h-card :title-icon="Message" title-label="recentComments">
      <ul class="flex flex-col items-center gap-1">
        <li
          class="w-full p-3 rounded-md bg-primary hover:shadow-primary transition-100"
        >
          <comments-item />
        </li>
      </ul>
    </h-card>
    <!-- 文章标签 -->
    <h-card :title-icon="Message" title-label="tags">
      <ul class="flex flex-wrap gap-[6px]">
        <li
          v-for="tag in tagAndCount"
          :key="tag.id"
          @click="handleClickTag(tag)"
        >
          <h-tag :text="tag.tag_name" :count="tag.count" />
        </li>
      </ul>
    </h-card>
    <!-- 公告 -->
    <h-card :title-icon="Message" title-label="notice">
      <p class="text-sm">{{ profile?.websiteConfig?.notice }}</p>
    </h-card>
    <!-- 网站信息 -->
    <h-card :title-icon="Message" title-label="websiteInfo">
      <span>建站时间：{{ profile?.websiteConfig?.webSite_created_at }}</span>
    </h-card>
  </div>
</template>
