<script setup lang="ts">
import type { TTalk } from '@/types'
import { Comment } from '@icon-park/vue-next'
import { useDateFormat } from '@vueuse/core'
import MdEditor from 'md-editor-v3'

type Props = {
  talk: TTalk
}
const props = defineProps<Props>()
const data = reactive<TTalk>({} as TTalk)

watch(
  () => props.talk,
  (newVal) => {
    Object.assign(data, newVal)
  },
  { immediate: true }
)
</script>

<template>
  <h-card divider-with="10%" divider-height="6px">
    <template #header>
      <div class="flex items-center gap-5 pb-5">
        <div
          class="w-14 h-1w-14 rounded-full overflow-hidden transition-300 hover:rotate-[360deg] hover:shadow-primary"
        >
          <img
            class="w-full h-full object-cover"
            :src="data?.user?.avatar_url"
          />
        </div>
        <div
          class="flex items-center gap-5 cursor-pointer family-shuhei"
          @click="
            $router.push({ name: 'talk-comments', params: { id: data.id } })
          "
        >
          <span class="text-accent text-[20px]">
            {{ data?.user?.username }}
          </span>
          <span>
            {{ useDateFormat(data.created_at, 'MMM, D, YYYY').value }}
          </span>
          <span class="flex items-center gap-2 text-[var(--color-gray)]">
            <Comment :stroke-width="5" />
            {{ data.comment_count }}
          </span>
        </div>
      </div>
    </template>
    <md-editor
      class="p-5 rounded-xl"
      preview-only
      v-model="data.content"
      :style="{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-normal)'
      }"
    />
  </h-card>
</template>

<style lang="postcss" scoped>
:deep(.md-editor) {
  img {
    @apply w-[200px] object-cover;
  }
}
</style>
