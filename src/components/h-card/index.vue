<script setup lang="ts">
import type { Icon } from '@icon-park/vue-next/lib/runtime'

type Props = {
  titleIcon?: Icon
  titleLabel: string
}

defineProps<Props>()
</script>

<template>
  <div class="p-5 mb-10 rounded-xl text-normal bg-secondary shadow-primary">
    <div class="mb-4">
      <span
        class="relative flex items-center gap-1 py-1 text-bright text-[20px] font-semibold"
      >
        <component :is="titleIcon" />
        <span>{{ $t(`title.${titleLabel}`) }}</span>
        <span
          class="absolute left-0 bottom-0 w-16 h-1 rounded-[2px] theme-gradient"
        ></span>
      </span>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
