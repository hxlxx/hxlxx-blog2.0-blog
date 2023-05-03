<script setup lang="ts">
import { getAbout } from '@/api'
import MdEditor from 'md-editor-v3'

const content = ref<string>('# Hello World!!!')

onBeforeMount(() => {
  initAbout()
})

const initAbout = async () => {
  const { data } = (await getAbout()) || {}
  content.value = data.content
}
</script>

<template>
  <div>
    <nav-breadcrumb />
    <div class="flex gap-5">
      <div class="flex-1 card px-10 py-5 sm:px-20 sm:py-10">
        <md-editor
          class="md-editor"
          v-model="content"
          preview-only
          :style="{
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-normal)'
          }"
        />
      </div>
      <div class="hidden lg:block w-[324px]">
        <profile-card />
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.md-editor {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--text-bright);
  }
  h1 {
    @apply relative text-[32px];
  }
  h2 {
    @apply relative text-[30px];
  }
  h3 {
    @apply relative text-[28px];
  }
  h4 {
    @apply relative text-[26px];
  }
  h5 {
    @apply relative text-[24px];
  }
  h6 {
    @apply relative text-[22px];
  }
  h1::after,
  h2::after,
  h3::after,
  h4::after,
  h5::after,
  h6::after {
    @apply absolute block -bottom-2 left-0 w-[98px] h-[6px] rounded-[2px];
    content: '';
    background: var(--theme-gradient);
  }
}
</style>
