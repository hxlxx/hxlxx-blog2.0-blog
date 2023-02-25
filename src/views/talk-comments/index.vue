<script setup lang="ts">
import { createComment, getCommentList, getTalkById } from '@/api'
import hMessage from '@/components/h-message'
import { useUser } from '@/stores'
import type { TComment, TQueryInfo, TTalk } from '@/types'
import { useI18n } from 'vue-i18n'

const route = useRoute()
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
const talk = ref<TTalk>({} as TTalk)

onBeforeMount(() => {
  initTalk()
  initCommentList()
})

const initTalk = async () => {
  const id = parseInt(route.params.id as string)
  const { data } = (await getTalkById(id)) || {}
  talk.value = data
}
const initCommentList = async (flag?: boolean) => {
  const skip = (query.page! - 1) * query.limit!
  const { data } =
    (await getCommentList(
      3,
      { skip, limit: query.limit },
      parseInt(route.params.id as string)
    )) || {}
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
    topic_id: talk.value.id,
    reply_to,
    content,
    type: 3
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
    initTalk()
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
    <talk-item :talk="talk" />
    <h-card class="px-2 py-1 md:p-10 mt-10">
      <template #header>
        <h1 class="pt-2 text-[32px] text-bright">
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
</template>
