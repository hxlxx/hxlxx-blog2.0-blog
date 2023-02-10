<script setup lang="ts">
import { getArticleList } from '@/api'
import type { TArticle, TQueryInfo } from '@/types'

const route = useRoute()

const query = reactive<TQueryInfo>({
  page: 1,
  skip: 0,
  limit: 9
})
const articles = ref<TArticle[]>()
const total = ref<number>()

onBeforeMount(() => {
  query.tag_id = parseInt(route.query.id as unknown as string)
  initArticleList(query)
})

const initArticleList = async (query: TQueryInfo) => {
  query.skip = (query.page! - 1) * query.limit!
  const { data } = (await getArticleList(query)) || {}
  articles.value = data.res
  total.value = data.count
}
const handleChangePage = (page: number) => {
  query.page = page
  initArticleList(query)
}
</script>

<template>
  <div class="relative mb-10 z-10">
    <h1
      class="mb-10 text-white text-[64px] family-shuhei text-shadow-primary font-semibold"
    >
      {{ route.query.tag_name }}
    </h1>
    <div class="card p-10">
      <ul class="grid gap-10 grid-cols-1 mb-5 md:grid-cols-2 lg:grid-cols-3">
        <li v-for="article in articles" :key="article.id">
          <article-preview :article="article" />
        </li>
      </ul>
      <h-pagination
        :page="query.page"
        :total="total"
        :range="5"
        :size="query.limit"
        @on-change-page="handleChangePage"
      />
    </div>
  </div>
</template>
