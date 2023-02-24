<script setup lang="ts">
import { getTalkList } from '@/api'
import { useSiteProfile } from '@/stores'
import type { TQueryInfo, TTalk, TWebsiteProfile } from '@/types'

const profileStore = useSiteProfile()

const talkList = ref<TTalk[]>([])
const query = reactive<TQueryInfo>({
  page: 1,
  skip: 0,
  limit: 5
})
const total = ref<number>(0)
const hasMore = computed(() => query.page! * query.limit! < total.value)
const profile = reactive<TWebsiteProfile>({} as TWebsiteProfile)

onBeforeMount(() => {
  initTalkList()
  Object.assign(profile, profileStore.profile)
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
  <div>
    <nav-breadcrumb />
    <div class="flex gap-5">
      <div class="flex-1">
        <div v-if="talkList.length" class="flex flex-col gap-5">
          <talk-item v-for="talk in talkList" :key="talk.id" :talk="talk" />
          <div
            v-if="hasMore"
            class="cursor-pointer text-center mt-5"
            @click="handleLoadMore"
          >
            <span
              class="inline-block p-3 rounded-md text-white text-shadow-primary family-shuhei theme-gradient transition-300 hover:opacity-60 shadow-primary"
            >
              {{ $t('button.loadMore') }}
            </span>
          </div>
        </div>
        <div v-else class="card p-10">
          <span class="text-[20px] family-shuhei">
            {{ $t('placeholder.noTalks') }}
          </span>
        </div>
      </div>
      <div class="hidden lg:block w-[324px]">
        <profile-card :profile="profile" />
      </div>
    </div>
  </div>
</template>
