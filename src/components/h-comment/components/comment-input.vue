<script setup lang="ts">
import { WinkingFaceWithOpenEyes } from '@icon-park/vue-next'
import { emoji } from '@/utils'

type Props = {
  showActionBox?: boolean
}
defineProps<Props>()
const emits = defineEmits<{
  (event: 'onSubmit', value: string): void
}>()

const commentEditorRef = ref<HTMLElement>()
const emojiRef = ref<HTMLElement>()
const actionBoxVisible = ref<boolean>(false)
const emojiBoxVisible = ref<boolean>(false)
const emojiOrTv = ref<boolean>(true)
const content = ref<string>('')
const faceList = emoji.faceList
const emojiList = emoji.emojiList[0]
const tvList = emoji.emojiList[1]
const activeName = ref<string>('emoji')

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
      <el-popover placement="right" :width="200" trigger="click">
        <template #reference>
          <h-button
            class="flex items-center gap-1"
            @click.stop="emojiBoxVisible = true"
          >
            <winking-face-with-open-eyes size="20px" :stroke-width="5" />
            <b>{{ $t('button.emoji') }}</b>
          </h-button>
        </template>
        <!-- 表情选择框 -->
        <div @click.stop>
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane name="emoji">
              <template #label>
                <div
                  class="cursor-pointer w-[20px] h-[20px]"
                  @click="emojiOrTv = true"
                >
                  <img :src="faceList[0]" />
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane name="tv">
              <template #label>
                <div
                  class="cursor-pointer w-[20px] h-[20px]"
                  @click="emojiOrTv = false"
                >
                  <img :src="faceList[1]" />
                </div>
              </template>
            </el-tab-pane>
            <ul class="emojis">
              <li
                class="cursor-pointer w-[20px] h-[20px]"
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
          </el-tabs>
        </div>
      </el-popover>
      <h-button type="primary" @click.stop="handleSubmitComment">
        {{ $t('button.addComment') }}
      </h-button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
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
.emojis {
  @apply flex flex-wrap gap-1 p-2 max-h-[180px];
  overflow-y: overlay;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: #eee;
  }
  &::-webkit-scrollbar-thumb {
    background-image: linear-gradient(
      180deg,
      var(--theme-bg-color-one),
      var(--theme-bg-color-two)
    );
    box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
    border-radius: 100px;
  }
}
:deep(.el-tabs__nav) {
  height: 30px;
}
</style>
