<script setup lang="ts">
import { getTalkList } from '@/api'
import type { TQueryInfo, TTalk } from '@/types'

const talkList = ref<TTalk[]>([])
const query = reactive<TQueryInfo>({
  page: 1,
  skip: 0,
  limit: 5
})
const total = ref<number>(0)
const hasMore = computed(() => query.page! * query.limit! < total.value)

onBeforeMount(() => {
  initTalkList()
})

const initTalkList = async () => {
  const skip = (query.page! - 1) * query.limit!
  const { data } = (await getTalkList({ skip, limit: query.limit })) || {}
  talkList.value = [...talkList.value, ...data.res]
  total.value = data.count
}
// 加载更多评论
const handleLoadMore = () => {
  query.page!++
  initTalkList()
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <talk-item v-for="talk in talkList" :key="talk.id" :talk="talk" />
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
  </div>
</template>
