<script setup lang="ts">
import type { TResult } from '@/types'
import { Close } from '@icon-park/vue-next'

type Props = {
  data: TResult
}
defineProps<Props>()
const emits = defineEmits(['onClose'])
</script>

<template>
  <div
    class="card p-2 flex items-center justify-between cursor-pointer shadow-none border-2 border-[var(--text-accent)] transition-100 hover:shadow-middle"
  >
    <div>
      <h1
        class="text-bright text-[18px] mb-1 text-cutoff-1 break-all"
        v-html="data.title"
      ></h1>
      <p class="text-cutoff-2 break-all" v-html="data.content"></p>
    </div>
    <Close
      v-if="data.history"
      class="pl-3 pr-2 transition-100 hover:opacity-40"
      @click.stop="emits('onClose', data.id)"
    />
  </div>
</template>
