<script setup lang="ts">
import { searchArticle } from '@/api'
import { useApp, useSearch } from '@/stores'
import type { TResult } from '@/types'
import { Search } from '@icon-park/vue-next'
import { useThrottleFn } from '@vueuse/core'
import ResultItem from './components/result-item.vue'

const router = useRouter()
const appStore = useApp()
const searchStore = useSearch()

const searchRef = ref<HTMLElement>()
const results = ref<TResult[]>([])
const keyword = ref<string>('')

const handleCloseSearch = (e: Event) => {
  if ((e.target as HTMLElement) === searchRef.value!) {
    appStore.showSearch = false
  }
}
onMounted(() => {
  document.addEventListener('click', handleCloseSearch)
  results.value = searchStore.results
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleCloseSearch)
})

// 重置搜索结果
const resetSearch = () => {
  results.value = results.value = searchStore.results
  keyword.value = ''
}
// 处理结果高亮
const keywordsHightLight = (
  keyword: string,
  content: string,
  type?: boolean
) => {
  const reg = new RegExp(keyword, 'ig')
  const firstIndex = content.indexOf(keyword)
  // 是否截取
  if (type && firstIndex >= 6) {
    content = '...' + content.slice(firstIndex - 3, 50)
  }
  let res = content.replace(reg, (match: string) => {
    return `<span class="text-[var(--text-accent)] family-shuhei">${match}</span>`
  })
  return res
}
const getResults = async () => {
  if (!keyword.value.trim()) return
  const { data } = (await searchArticle(keyword.value)) || {}
  results.value = data.map((item: TResult) => ({
    id: item.id,
    title: keywordsHightLight(keyword.value, item.title),
    content: keywordsHightLight(keyword.value, item.content, true)
  }))
}
// 输入内容
const handleInput = () => {
  getResults()
  if (!keyword.value.trim()) {
    results.value = results.value = searchStore.results
  }
}
const throttledInput = useThrottleFn(handleInput, 100)
// 点击搜索结果
const handleClickResult = (result: TResult) => {
  router.push({ name: 'article-detail', params: { id: result.id } })
  if (searchStore.results.every((item) => item.id !== result.id)) {
    searchStore.results.unshift({ ...result, history: true })
  }
  appStore.showSearch = false
  resetSearch()
}
// 删除搜索历史
const handleRemoveHistory = (id: number) => {
  searchStore.removeHistory(id)
  results.value = searchStore.results
}
</script>

<template>
  <transition name="appear">
    <div
      v-stopScroll
      v-if="appStore.showSearch"
      ref="searchRef"
      class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)] z-50"
    >
      <div class="card absolute top-20 left-1/2 -translate-x-1/2 w-[30%] p-5">
        <div class="relative">
          <Search
            class="absolute top-1/2 -translate-y-1/2 left-3"
            size="24px"
          />
          <input
            type="text"
            class="search-input bg-primary"
            :placeholder="$t('placeholder.enterKeyword')"
            v-model="keyword"
            @input="throttledInput"
          />
        </div>
        <div v-if="results.length" class="my-5 px-2">
          {{ keyword.trim() ? $t('matchedResults') : $t('searchHistory') }}
        </div>
        <ul
          v-if="results.length"
          class="flex flex-col items-center gap-5 p-2 max-h-[500px] rounded-md overflow-y-auto"
        >
          <li
            class="w-full"
            v-for="res in results"
            :key="res.id"
            @click="handleClickResult(res)"
          >
            <result-item :data="res" @on-close="handleRemoveHistory" />
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<style lang="postcss" scoped>
.appear-enter-active {
  animation: appear 200ms ease-in;
}
.appear-leave-active {
  animation: appear 200ms ease-out reverse;
}
@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.search-input {
  @apply w-full pl-12 pr-3 py-2 text-[18px] border-0 outline-none rounded-md;
}
.search-input:focus {
  @apply outline-2 outline outline-[var(--text-accent)];
}
</style>
