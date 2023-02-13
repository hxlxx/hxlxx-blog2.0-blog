<script setup lang="ts">
import { getTagAndCount } from '@/api'
import type { TTagAndCount } from '@/types'

const router = useRouter()
const tagAndCount = ref<TTagAndCount[]>()

onBeforeMount(() => {
  initTagAndCount()
})

const initTagAndCount = async () => {
  const { data } = (await getTagAndCount()) || {}
  tagAndCount.value = data
}
</script>

<template>
  <div class="card p-10">
    <ul class="flex flex-wrap gap-5">
      <li
        v-for="tag in tagAndCount"
        :key="tag.id"
        @click="router.push({ path: 'article-list', query: { ...tag } })"
      >
        <h-tag class="text-[20px]" :text="tag.tag_name" :count="tag.count" />
      </li>
    </ul>
  </div>
</template>
