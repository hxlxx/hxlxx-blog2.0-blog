<script setup lang="ts">
import { useSiteProfile, useApp } from '@/stores'
import type { TWebsiteProfile } from '@/types'
import { navList } from '../../constant'
import { Github } from '@icon-park/vue-next'

const router = useRouter()
const profileStore = useSiteProfile()
const appStore = useApp()

const smallNavRef = ref<HTMLElement>()
const profile = reactive<TWebsiteProfile>({} as TWebsiteProfile)

const handleCloseSmallNav = (e: Event) => {
  if ((e.target as HTMLElement) === smallNavRef.value!) {
    appStore.showSmallNav = false
  }
}
onMounted(() => {
  document.addEventListener('click', handleCloseSmallNav)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleCloseSmallNav)
})
watch(
  () => profileStore.profile,
  (newVal) => {
    Object.assign(profile, newVal)
  },
  { immediate: true }
)

const handleClickNav = (path: string) => {
  router.push(path)
  appStore.showSmallNav = false
}
</script>

<template>
  <transition name="appear">
    <div
      v-if="appStore.showSmallNav"
      ref="smallNavRef"
      class="fixed top-0 left-0 flex lg:hidden items-center justify-center w-full h-full bg-[rgba(0,0,0,0.2)] z-50"
    >
      <div class="card w-[80%] p-5">
        <div class="flex flex-col justify-around px-3">
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
            <span class="family-shuhei">
              {{ profile?.websiteConfig?.author_motto }}
            </span>
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
            <ul class="flex justify-around mt-1">
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
        <ul class="mt-2 flex flex-col items-center gap-1 family-shuhei">
          <li v-for="nav in navList" :key="nav.label">
            <span @click="handleClickNav(nav.path)">
              {{ $t(`nav.${nav.label}`) }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<style lang="postcss" scoped>
.profile-link {
  @apply w-12 h-12 mb-5 flex justify-center items-center cursor-pointer hover:opacity-50;
  clip-path: polygon(50% 3%, 91% 25%, 91% 75%, 50% 97%, 9% 75%, 9% 25%);
  background-color: var(--background-trans);
  transition: var(--transition-200);
}
.site-count-item {
  @apply flex flex-col items-center justify-around;
}
.appear-enter-active {
  animation: appear 400ms ease-out;
}
.appear-leave-active {
  animation: appear 400ms ease-in reverse;
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
