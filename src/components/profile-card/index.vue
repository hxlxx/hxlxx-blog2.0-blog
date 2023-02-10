<script setup lang="ts">
import type { TWebsiteProfile } from '@/types'
import { Github } from '@icon-park/vue-next'

type Props = {
  profile: TWebsiteProfile
}

defineProps<Props>()
</script>

<template>
  <div class="profile-card relative text-normal">
    <div class="w-full h-full rounded-xl bg-primary opacity-90">
      <div
        class="absolute top-0 left-0 flex flex-col justify-around w-full h-full px-3"
      >
        <div class="flex flex-col items-center">
          <!-- 头像 -->
          <div
            class="w-[112px] h-[112px] p-1 mb-5 rounded-full bg-primary shadow-primary"
          >
            <img
              class="w-full h-full object-cover rounded-full"
              :src="profile?.websiteConfig?.author_avatar"
            />
          </div>
          <!-- 昵称 -->
          <h1 class="text-[30px] text-bright font-semibold">
            {{ profile?.websiteConfig?.author }}
          </h1>
          <span
            class="inline-block w-[20%] h-1 mb-5 rounded-[2px] theme-gradient"
          ></span>
          <!-- 简介 -->
          <span>{{ profile?.websiteConfig?.author_motto }}</span>
        </div>
        <div>
          <!-- 链接 -->
          <ul class="flex justify-center gap-3">
            <li class="profile-link">
              <a :href="profile?.websiteConfig?.github">
                <github size="20px" />
              </a>
            </li>
          </ul>
          <!-- 网站统计 -->
          <ul class="flex justify-around mt-5">
            <li class="site-count-item">
              <span class="font-semibold">{{ profile?.articleCount }}</span>
              <span>{{ $t('profile.articles') }}</span>
            </li>
            <li class="site-count-item">
              <span class="font-semibold">{{ profile?.talkCount }}</span>
              <span>{{ $t('profile.talks') }}</span>
            </li>
            <li class="site-count-item">
              <span class="font-semibold">{{ profile?.categoryCount }}</span>
              <span>{{ $t('profile.categories') }}</span>
            </li>
            <li class="site-count-item">
              <span class="font-semibold">{{ profile?.tagCount }}</span>
              <span>{{ $t('profile.tags') }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.profile-card {
  @apply w-full h-98 px-1 pt-12 pb-1 rounded-xl hover:shadow-primary;
  background-image: var(--theme-gradient);
  transition: var(--transition-200);
}
.profile-link {
  @apply w-12 h-12 mb-5 flex justify-center items-center cursor-pointer hover:opacity-50;
  clip-path: polygon(50% 3%, 91% 25%, 91% 75%, 50% 97%, 9% 75%, 9% 25%);
  background-color: var(--background-trans);
  transition: var(--transition-200);
}
.site-count-item {
  @apply flex flex-col items-center justify-around;
}
</style>
