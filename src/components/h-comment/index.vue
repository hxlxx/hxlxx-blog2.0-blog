<script setup lang="ts">
import type { TComment } from '@/types'
import { useDateFormat } from '@vueuse/core'
import { parseComment } from '@/utils'

type Props = {
  comments: TComment[]
}
const props = defineProps<Props>()
const emits = defineEmits(['onSubmit'])

const commentInputRef = ref<HTMLElement>()
const activeId = ref<number>()
const commentList = ref<TComment[]>([])

const handleClick = (e: Event) => {
  if ((e.target as HTMLElement) !== commentInputRef.value) {
    activeId.value = undefined
  }
}
onMounted(() => {
  document.addEventListener('click', handleClick)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick)
})

watch(
  () => props.comments,
  (newVal) => {
    newVal.length && (commentList.value = newVal)
  },
  { immediate: true }
)

const handleSubmitComment = (
  value: string,
  pid?: number,
  reply_to?: string
) => {
  emits('onSubmit', value, pid, reply_to)
  activeId.value = undefined
}
</script>

<template>
  <div>
    <!-- 输入区 -->
    <div>
      <comment-input
        @on-submit="(value: string) => { handleSubmitComment(value) }"
      />
    </div>
    <!-- 评论区 -->
    <div class="flex p-5 pb-0" v-for="comment in commentList" :key="comment.id">
      <!-- 头像 -->
      <div>
        <div class="w-10 h-10 rounded-full overflow-hidden">
          <img
            class="w-full h-full object-cover"
            :src="comment.user.avatar_url"
          />
        </div>
      </div>
      <!-- 评论内容 -->
      <div class="w-full pl-5">
        <div>
          <div class="flex items-center justify-between mb-5">
            <span class="text-bright break-all">
              {{ comment.user.username }}
            </span>
            <span class="text-sm">
              {{ useDateFormat(comment.created_at, 'YYYY-M-D').value }}
            </span>
          </div>
          <p class="break-all" v-html="parseComment(comment.content)"></p>
          <div class="mt-3">
            <div class="mb-3">
              <h-button @click.stop="activeId = comment.id">
                {{ $t('button.reply') }}
              </h-button>
            </div>
            <div v-if="activeId === comment.id" ref="commentInputRef">
              <comment-input
                :show-action-box="true"
                @on-submit="(value: string) => { handleSubmitComment(value, comment.id) }"
              />
            </div>
          </div>
        </div>
        <!-- 子评论 -->
        <template v-if="comment.reply.length">
          <div class="mt-5 rounded-xl p-5 bg-third">
            <div class="flex" v-for="sub in comment.reply" :key="sub.id">
              <!-- 头像 -->
              <div>
                <div class="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    class="w-full h-full object-cover"
                    :src="sub.user.avatar_url"
                  />
                </div>
              </div>
              <!-- 评论内容 -->
              <div class="w-full pl-5">
                <div class="flex items-center justify-between mb-5">
                  <span class="text-bright">{{ sub.user.username }}</span>
                  <span class="text-sm">
                    {{ useDateFormat(sub.created_at, 'YYYY-M-D').value }}
                  </span>
                </div>
                <div>
                  <span
                    v-if="sub.reply_to"
                    class="text-accent family-shuhei mr-1"
                  >
                    @{{ sub.reply_to }}:
                  </span>
                  <p
                    class="inline-block break-all"
                    v-html="parseComment(sub.content)"
                  ></p>
                </div>
                <div class="mt-3">
                  <div class="mb-3">
                    <h-button @click.stop="activeId = sub.id">
                      {{ $t('button.reply') }}
                    </h-button>
                  </div>
                  <div v-if="activeId === sub.id" ref="commentInputRef">
                    <comment-input
                      :show-action-box="true"
                      @on-submit="(value: string) => { handleSubmitComment(value, comment.id, sub.user.username) }"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
