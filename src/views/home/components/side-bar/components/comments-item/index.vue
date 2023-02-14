<script setup lang="ts">
import type { TCommentItem } from '@/types'
import { useDateFormat } from '@vueuse/core'
import { emoji } from '@/utils'

type Props = {
  comment: TCommentItem
}
const props = defineProps<Props>()

const content = ref<string>('')

onBeforeMount(() => {
  const emojiReg = /\[(\S+?)\]/g
  const html = props.comment.content
  content.value = html.replace(emojiReg, (match) => {
    return `<img class="emoji" src="${(emoji.allEmoji as any)[match]}"></img>`
  })
})
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="w-9 h-9 shrink-0 rounded-full overflow-hidden">
      <img class="w-full h-full object-cover" :src="comment.user.avatar_url" />
    </div>
    <div class="flex flex-col text-xs">
      <span class="text-accent">{{ comment.user.username }}</span>
      <span class="text-gray-500">
        {{
          useDateFormat(comment.createTime, 'YYYY-M-D').value.replace('"', '')
        }}
      </span>
      <p v-html="content" class="text-cutoff-2"></p>
    </div>
  </div>
</template>

<style>
.emoji {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 0 1px;
  vertical-align: text-bottom;
}
</style>
