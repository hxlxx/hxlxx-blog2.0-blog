<script setup lang="ts">
import { Fire } from '@icon-park/vue-next'
</script>

<template>
  <div class="w-full flex gap-5 my-[60px]">
    <ul class="w-full flex flex-col lg:flex-row gap-5">
      <li
        class="w-full lg:w-[20%] h-32 lg:h-96 p-1 rounded-xl bg-gradient-to-br from-[var(--theme-bg-color-one)] to-[var(--theme-bg-color-two)]"
      >
        <div
          class="flex flex-col gap-5 items-center justify-center w-full h-full rounded-xl bg-[var(--background-secondary)] opacity-90"
        >
          <h1
            class="text-[32px] text-fill-transparent text-center font-semibold"
          >
            EDITOR'S SELECTION
          </h1>
          <span
            class="flex items-center gap-1 break-all text-[var(--text-bright)] text-[28px] font-semibold"
          >
            <Fire size="2rem" />
            <span class="max-w-[140px]">{{ $t('featureArticles') }}</span>
          </span>
        </div>
      </li>
      <li class="relative w-full lg:w-[50%] group z-10">
        <article-preview />
      </li>
      <li class="relative w-full lg:w-[50%] group z-10">
        <article-preview />
      </li>
    </ul>
  </div>
</template>
