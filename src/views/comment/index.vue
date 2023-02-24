<script setup lang="ts">
import { getCommentList, createComment } from '@/api'
import hMessage from '@/components/h-message'
import { useSiteProfile, useUser } from '@/stores'
import type { TComment, TQueryInfo, TWebsiteProfile } from '@/types'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const userStore = useUser()
const profileStore = useSiteProfile()

const commentList = ref<TComment[]>([])
const query = reactive<TQueryInfo>({
  page: 1,
  skip: 0,
  limit: 7
})
const total = ref<number>(0)
const hasMore = computed(() => query.page! * query.limit! < total.value)
const profile = reactive<TWebsiteProfile>({} as TWebsiteProfile)

onBeforeMount(() => {
  initCommentList()
  Object.assign(profile, profileStore.profile)
})

const initCommentList = async (flag?: boolean) => {
  const skip = (query.page! - 1) * query.limit!
  const { data } = (await getCommentList(1, { skip, limit: query.limit })) || {}
  commentList.value = flag ? [...commentList.value, ...data.res] : data.res
  total.value = data.count
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
    reply_to,
    content,
    type: 1
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
    <nav-breadcrumb />
    <div class="flex gap-5">
      <div class="flex-1">
        <div class="card p-10 mb-10 text-[20px] family-shuhei">
          {{ $t('placeholder.saySomething') }}
        </div>
        <h-card class="p-10">
          <template #header>
            <h1 class="py-2 text-[32px] text-bright">
              {{ $t('title.comments') }}
            </h1>
          </template>
          <h-comment :comments="commentList" @on-submit="handleSubmitComment" />
          <div v-if="hasMore" class="text-center mt-5">
            <span
              class="inline-block p-3 rounded-md cursor-pointer text-white text-shadow-primary family-shuhei theme-gradient transition-200 hover:opacity-60 shadow-primary"
              @click="handleLoadMore"
            >
              {{ $t('button.loadMore') }}
            </span>
          </div>
        </h-card>
      </div>
      <div class="hidden lg:block w-[324px]">
        <profile-card :profile="profile" />
      </div>
    </div>
  </div>
</template>
