<script setup lang="ts">
import { Github, Message } from '@icon-park/vue-next'
</script>

<template>
  <div class="w-[320px] hidden xl:block">
    <!-- 网站信息 -->
    <div class="profile-card mb-10 text-[var(--text-normal)]">
      <div class="relative w-full h-full rounded-xl bg-primary opacity-90">
        <div
          class="absolute -top-12 left-0 flex flex-col justify-around w-full h-full"
        >
          <div class="flex flex-col items-center">
            <!-- 头像 -->
            <div
              class="w-[112px] h-[112px] p-1 mb-5 rounded-full bg-[var(--background-primary)] shadow-primary"
            >
              <div class="w-full h-full rounded-full bg-cyan-600"></div>
            </div>
            <!-- 昵称 -->
            <h1 class="text-[30px] text-[var(--text-bright)] font-semibold">
              昏晓流霞
            </h1>
            <span
              class="inline-block w-[20%] h-1 mb-5 rounded-[2px] theme-gradient"
            ></span>
            <!-- 简介 -->
            <span>明月照人</span>
          </div>
          <div>
            <!-- 链接 -->
            <ul class="flex justify-center gap-3">
              <li class="profile-link">
                <a href="javascript:;">
                  <Github size="20px" />
                </a>
              </li>
            </ul>
            <!-- 网站统计 -->
            <ul class="flex justify-around mt-5">
              <li
                class="flex flex-col items-center justify-around cursor-pointer"
              >
                <span class="font-semibold">12</span>
                <span>{{ $t('profile.articles') }}</span>
              </li>
              <li
                class="flex flex-col items-center justify-around cursor-pointer"
              >
                <span class="font-semibold">12</span>
                <span>{{ $t('profile.talks') }}</span>
              </li>
              <li
                class="flex flex-col items-center justify-around cursor-pointer"
              >
                <span class="font-semibold">12</span>
                <span>{{ $t('profile.categories') }}</span>
              </li>
              <li
                class="flex flex-col items-center justify-around cursor-pointer"
              >
                <span class="font-semibold">12</span>
                <span>{{ $t('profile.tags') }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 最新评论 -->
    <div
      class="p-5 mb-10 rounded-xl bg-[var(--background-secondary)] shadow-primary"
    >
      <div class="mb-4">
        <span
          class="relative flex items-center gap-1 py-1 text-[var(--text-bright)] text-[20px] font-semibold"
        >
          <Message />
          <span>{{ $t('title.recentComments') }}</span>
          <span
            class="absolute left-0 bottom-0 w-16 h-1 rounded-[2px] theme-gradient"
          ></span>
        </span>
      </div>
      <div>
        <ul class="flex flex-col items-center gap-1 text-[var(--text-normal)]">
          <li class="w-full p-3 rounded-md bg-[var(--background-primary)]">
            hello
          </li>
          <li class="w-full p-3 rounded-md bg-[var(--background-primary)]">
            hello
          </li>
          <li class="w-full p-3 rounded-md bg-[var(--background-primary)]">
            hello
          </li>
          <li class="w-full p-3 rounded-md bg-[var(--background-primary)]">
            hello
          </li>
        </ul>
      </div>
    </div>
    <!-- 文章标签 -->
    <div
      class="p-5 mb-10 rounded-xl bg-[var(--background-secondary)] shadow-primary"
    >
      <div class="mb-4">
        <span
          class="relative flex items-center gap-1 py-1 text-[var(--text-bright)] text-[20px] font-semibold"
        >
          <Message />
          <span>{{ $t('title.tags') }}</span>
          <span
            class="absolute left-0 bottom-0 w-16 h-1 rounded-[2px] theme-gradient"
          ></span>
        </span>
      </div>
      <div>
        <ul class="flex flex-col items-center gap-1 text-[var(--text-normal)]">
          <li class="w-full p-3 rounded-md bg-[var(--background-primary)]">
            hello
          </li>
        </ul>
      </div>
    </div>
    <!-- 公告 -->
    <div
      class="p-5 mb-10 rounded-xl bg-[var(--background-secondary)] shadow-primary"
    >
      <div class="mb-4">
        <span
          class="relative flex items-center gap-1 py-1 text-[var(--text-bright)] text-[20px] font-semibold"
        >
          <Message />
          <span>{{ $t('title.notice') }}</span>
          <span
            class="absolute left-0 bottom-0 w-16 h-1 rounded-[2px] theme-gradient"
          ></span>
        </span>
      </div>
      <div>
        <ul class="flex flex-col items-center gap-1 text-[var(--text-normal)]">
          <li class="w-full p-3 rounded-md bg-[var(--background-primary)]">
            hello
          </li>
        </ul>
      </div>
    </div>
    <!-- 网站信息 -->
    <div
      class="p-5 mb-10 rounded-xl bg-[var(--background-secondary)] shadow-primary"
    >
      <div class="mb-4">
        <span
          class="relative flex items-center gap-1 py-1 text-[var(--text-bright)] text-[20px] font-semibold"
        >
          <Message />
          <span>{{ $t('title.websiteInfo') }}</span>
          <span
            class="absolute left-0 bottom-0 w-16 h-1 rounded-[2px] theme-gradient"
          ></span>
        </span>
      </div>
      <div>
        <ul class="flex flex-col items-center gap-1 text-[var(--text-normal)]">
          <li class="w-full p-3 rounded-md bg-[var(--background-primary)]">
            hello
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
