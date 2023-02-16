<script setup lang="ts">
import type { TCommentItem } from '@/types'
import { useDateFormat } from '@vueuse/core'
import { parseComment } from '@/utils'

type Props = {
  comment: TCommentItem
}
defineProps<Props>()
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="w-9 h-9 shrink-0 rounded-full overflow-hidden">
      <img class="w-full h-full object-cover" :src="comment.user.avatar_url" />
    </div>
    <div class="flex flex-col text-xs">
      <span class="text-accent">{{ comment.user.username }}</span>
      <span class="text-gray-500">
        {{ useDateFormat(comment.createTime, 'YYYY-M-D').value }}
      </span>
      <p v-html="parseComment(comment.content)" class="text-cutoff-2"></p>
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
