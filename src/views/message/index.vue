<script setup lang="ts">
import { getCommentList, createComment } from '@/api'
import hMessage from '@/components/h-message'
import { useUser } from '@/stores'
import type { TComment, TQueryInfo } from '@/types'
import { useI18n } from 'vue-i18n'

const userStore = useUser()
const i18n = useI18n()

const commentList = ref<TComment[]>([])
const query = reactive<TQueryInfo>({
  page: 1,
  skip: 0,
  limit: 7
})
const total = ref<number>(0)
const hasMore = computed(() => query.page! * query.limit! < total.value)

onBeforeMount(() => {
  initCommentList()
})

const initCommentList = async () => {
  const skip = (query.page! - 1) * query.limit!
  const { data } = (await getCommentList(1, { skip, limit: query.limit })) || {}
  commentList.value = [...commentList.value, ...data.res]
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
  const { code } = (await createComment({ data: { comment } })) || {}
  if (code === 200) {
    hMessage({
      type: 'success',
      message: i18n.t('message.commentSuccess')
    })
    initCommentList()
  }
}
// 加载更多评论
const handleLoadMore = () => {
  query.page!++
  initCommentList()
}
</script>

<template>
  <h-card class="p-20" :title="$t('title.comments')" :title-size="32">
    <h-comment :comments="commentList" @on-submit="handleSubmitComment" />
    <div
      v-if="hasMore"
      class="cursor-pointer text-center mt-5"
      @click="handleLoadMore"
    >
      <span
        class="inline-block p-3 rounded-md text-white text-shadow-primary family-shuhei theme-gradient transition-200 hover:opacity-60 shadow-primary"
      >
        {{ $t('button.loadMore') }}
      </span>
    </div>
  </h-card>
</template>
