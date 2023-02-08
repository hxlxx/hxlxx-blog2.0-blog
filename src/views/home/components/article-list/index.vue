<script setup lang="ts">
import { getArticleList, getCategoryAndCount } from '@/api'
import type { TArticle, TQueryInfo, TCategoryAndCount } from '@/types'
import { ExpandDownOne } from '@icon-park/vue-next'

const articles = ref<TArticle[]>()
const total = ref<number>()
const categoryAndCount = ref<TCategoryAndCount[]>()
const currentId = ref<number>()
const query = reactive<TQueryInfo>({
  page: 1,
  skip: 0,
  limit: 9,
  category_id: undefined
})

onBeforeMount(() => {
  initCategoryAndCount()
  initArticleList(query)
})

const initCategoryAndCount = async () => {
  const { data } = (await getCategoryAndCount()) || {}
  categoryAndCount.value = data
}
const initArticleList = async (query: TQueryInfo) => {
  query.skip = (query.page! - 1) * query.limit!
  const { data } = (await getArticleList(query)) || {}
  articles.value = data.res
  total.value = data.count
}

const categoryBarHeight = ref<string>('60px')
const handleExpandTags = () => {
  categoryBarHeight.value = categoryBarHeight.value ? '' : '60px'
}
// 切换标签
const handleChangeTag = (id?: number) => {
  currentId.value = id ? id : undefined
  query.category_id = currentId.value
  query.page = 1
  initArticleList(query)
}
// 切换分页
const handleChangePage = (page: number) => {
  query.page = page
  initArticleList(query)
}
</script>

<template>
  <div class="flex-1">
    <div class="mb-10">
      <ul
        class="relative flex gap-5 flex-wrap pl-5 pr-12 py-4 rounded-xl text-sm text-normal overflow-hidden bg-secondary shadow-primary"
        :style="{
          height: categoryBarHeight
        }"
      >
        <li
          :class="['category-item', !currentId ? 'active' : '']"
          @click="handleChangeTag()"
        >
          <span class="inline-block px-4 py-1">{{ $t('all') }}</span>
        </li>
        <li
          class="category-item"
          v-for="category in categoryAndCount"
          :key="category.id"
          @click="handleChangeTag(category.id)"
        >
          <span
            :class="[
              'inline-block',
              'px-2',
              'py-1',
              currentId === category.id ? 'active' : ''
            ]"
          >
            {{ category.category_name }}
          </span>
          <b class="inline-block px-2 py-1 text-accent">
            {{ category.count }}
          </b>
        </li>
        <li
          class="absolute top-[20px] right-[24px] cursor-pointer hover:opacity-50 transition-100"
          :style="{
            transition: 'transform 0.2s linear',
            transform: !categoryBarHeight ? 'rotate(180deg)' : ''
          }"
          @click="handleExpandTags"
        >
          <ExpandDownOne size="20px" />
        </li>
      </ul>
    </div>
    <!-- 文章列表 -->
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
</template>

<style lang="postcss" scoped>
.category-item {
  @apply rounded-md overflow-hidden cursor-pointer hover:opacity-50;
  background-color: var(--background-primary);
  transition: var(--transition-200);
}
.active {
  @apply theme-gradient text-white;
  text-shadow: var(--text-shadow);
}
</style>
