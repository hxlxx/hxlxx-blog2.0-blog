<script setup lang="ts">
import { WinkingFaceWithOpenEyes } from '@icon-park/vue-next'
import { emoji } from '@/utils'

type Props = {
  showActionBox?: boolean
}
defineProps<Props>()
const emits = defineEmits(['onSubmit', 'onBlur'])

const commentEditorRef = ref<HTMLElement>()
const emojiRef = ref<HTMLElement>()
const actionBoxVisible = ref<boolean>(false)
const emojiBoxVisible = ref<boolean>(false)
const emojiOrTv = ref<boolean>(true)
const content = ref<string>('')
const faceList = emoji.faceList
const emojiList = emoji.emojiList[0]
const tvList = emoji.emojiList[1]
// const emojiEntries = Object.keys(emoji)

const handleClick = (e: Event) => {
  if (
    (e.target as HTMLElement).id === 'comment-editor' &&
    (e.target as HTMLElement) !== commentEditorRef.value
  ) {
    actionBoxVisible.value = false
  }
  if ((e.target as HTMLElement) !== commentEditorRef.value) {
    !emojiBoxVisible.value && (actionBoxVisible.value = false)
  }
  if ((e.target as HTMLElement) !== emojiRef.value) {
    emojiBoxVisible.value = false
  }
}
onMounted(() => {
  document.addEventListener('click', handleClick)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick)
})

// 选择表情
const handleSelectEmoji = (emoji: string) => {
  content.value += emoji
}
// 发布评论
const handleSubmitComment = () => {
  if (!content.value.trim()) return
  emojiBoxVisible.value = false
  emits('onSubmit', content.value)
  content.value = ''
}
</script>

<template>
  <div>
    <div>
      <textarea
        ref="commentEditorRef"
        id="comment-editor"
        class="w-full p-5 border-none outline-none bg-primary rounded-xl resize-none"
        v-model.trim="content"
        autocomplete="off"
        :placeholder="$t('placeholder.comment')"
        @focus="actionBoxVisible = true"
        @click.stop
      />
    </div>
    <div
      v-if="showActionBox ? showActionBox : actionBoxVisible"
      class="action-box flex items-center justify-end gap-5 mt-5"
    >
      <div class="relative">
        <h-button
          class="flex items-center gap-1"
          @click.stop="emojiBoxVisible = true"
        >
          <winking-face-with-open-eyes size="20px" :stroke-width="5" />
          <b>{{ $t('button.emoji') }}</b>
        </h-button>
        <!-- 表情选择框 -->
        <div
          v-show="emojiBoxVisible"
          ref="emojiRef"
          id="emoji"
          class="emoji shadow-primary"
          @click.stop
        >
          <span class="emoji-arrow bg-secondary shadow-primary"></span>
          <div class="relative pt-3 rounded-xl bg-secondary">
            <div class="flex justify-around mb-1">
              <div class="cursor-pointer" @click="emojiOrTv = true">
                <img :src="faceList[0]" />
              </div>
              <div class="cursor-pointer" @click="emojiOrTv = false">
                <img :src="faceList[1]" />
              </div>
            </div>
            <ul class="flex flex-wrap gap-1 p-2">
              <li
                class="cursor-pointer"
                v-for="[emojiKey, emojiValue] in Object.entries(
                  emojiOrTv ? emojiList : tvList
                )"
                :key="emojiKey"
                @click="handleSelectEmoji(emojiKey)"
              >
                <img
                  :src="(emojiValue as string)"
                  :title="(emojiKey as string)"
                  :alt="(emojiKey as string)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h-button type="primary" @click.stop="handleSubmitComment">
        {{ $t('button.addComment') }}
      </h-button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.emoji {
  @apply absolute top-[50px] -left-1/2 w-[180px] h-[290px] rounded-xl;
  .emoji-arrow {
    @apply inline-block w-3 h-3 absolute -top-1 left-1/2 -translate-x-1/2 rotate-45;
  }
  img {
    @apply w-5 h-5;
  }
}
.action-box {
  animation: appear 500ms linear;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
