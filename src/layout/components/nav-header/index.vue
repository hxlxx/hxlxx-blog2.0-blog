<script setup lang="ts">
import { Search, Sphere } from '@icon-park/vue-next'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const navHeaderRef = ref<HTMLElement>()
let memo: number = 0

// 处理导航栏滚动
window.addEventListener('scroll', () => {
  const down = window.scrollY - memo > 0
  memo = window.scrollY
  if (navHeaderRef.value) {
    navHeaderRef.value.style.transition = 'opacity 0.2s linear'
    if (down) {
      const { height } = navHeaderRef.value.getBoundingClientRect()
      navHeaderRef.value.style.opacity =
        window.scrollY <= height ? (height - window.scrollY) / height + '' : '0'
      navHeaderRef.value.style.pointerEvents = 'none'
    } else {
      navHeaderRef.value.style.opacity = '1'
      navHeaderRef.value.style.pointerEvents = 'inherit'
    }
  }
})

// 切换语言
const handleChangeLanguage = () => {
  i18n.locale.value = i18n.locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
}
</script>

<template>
  <div>
    <!-- 背景 -->
    <div>
      <svg
        viewBox="0 0 1440 690"
        class="absolute top-0 left-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="5%" stop-color="var(--theme-bg-color-two)"></stop>
            <stop offset="95%" stop-color="var(--theme-bg-color-one)"></stop>
          </linearGradient>
        </defs>
        <path
          d="M 0,700 C 0,700 0,233 0,233 C 66.06923076923076,193.4589743589744 132.1384615384615,153.91794871794875 199,151 C 265.8615384615385,148.08205128205125 333.5153846153846,181.78717948717946 438,212 C 542.4846153846154,242.21282051282054 683.8,268.93333333333334 759,252 C 834.2,235.06666666666666 843.2846153846154,174.47948717948714 919,189 C 994.7153846153846,203.52051282051286 1137.0615384615382,293.148717948718 1235,313 C 1332.9384615384618,332.851282051282 1386.4692307692308,282.92564102564097 1440,233 C 1440,233 1440,700 1440,700 Z"
          stroke="none"
          stroke-width="0"
          fill="url(#gradient)"
          fill-opacity="0.53"
          class="transition-all duration-300 ease-in-out delay-150 path-0"
          transform="rotate(-180 720 350)"
        ></path>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="5%" stop-color="var(--theme-bg-color-two)"></stop>
            <stop offset="95%" stop-color="var(--theme-bg-color-one)"></stop>
          </linearGradient>
        </defs>
        <path
          d="M 0,700 C 0,700 0,466 0,466 C 88.88205128205126,486.83846153846156 177.76410256410253,507.6769230769231 254,493 C 330.23589743589747,478.3230769230769 393.82564102564106,428.1307692307692 466,404 C 538.1743589743589,379.8692307692308 618.9333333333334,381.8 699,399 C 779.0666666666666,416.2 858.4410256410256,448.66923076923075 942,466 C 1025.5589743589744,483.33076923076925 1113.302564102564,485.5230769230769 1197,483 C 1280.697435897436,480.4769230769231 1360.3487179487179,473.23846153846154 1440,466 C 1440,466 1440,700 1440,700 Z"
          stroke="none"
          stroke-width="0"
          fill="url(#gradient)"
          fill-opacity="1"
          transform="rotate(-180 720 350)"
        ></path>
      </svg>
    </div>
    <!-- 导航栏 -->
    <div
      ref="navHeaderRef"
      class="flex items-center w-full h-32 px-3 lg:pl-16 lg:pr-20 fixed top-0 left-0 text-white z-20 theme-gradient"
    >
      <div
        class="h-full flex flex-col justify-center items-center cursor-pointer"
      >
        <span class="logo-text"> 昏晓流霞 </span>
        <span class="logo-text"> HXLX </span>
      </div>
      <div class="ml-5 hidden lg:block">
        <ul class="flex gap-5">
          <li class="nav-item">
            <span>{{ $t('nav.home') }}</span>
          </li>
          <li class="nav-item">
            <span>{{ $t('nav.talks') }}</span>
          </li>
          <li class="nav-item">
            <span>{{ $t('nav.about') }}</span>
          </li>
          <li class="nav-item">
            <span>{{ $t('nav.archives') }}</span>
          </li>
          <li class="nav-item">
            <span>{{ $t('nav.tags') }}</span>
          </li>
          <li class="nav-item">
            <span>{{ $t('nav.message') }}</span>
          </li>
          <li class="nav-item">
            <span>{{ $t('nav.album') }}</span>
          </li>
          <li class="nav-item">
            <span>{{ $t('nav.friends') }}</span>
          </li>
        </ul>
      </div>
      <div class="ml-auto flex items-center gap-4">
        <span class="nav-control">
          <Search size="30px" />
        </span>
        <span
          class="inline-flex justify-center items-center gap-1 nav-control"
          @click="handleChangeLanguage"
        >
          <Sphere size="30px" />
          <b>{{ $t('nav.language') }}</b>
        </span>
        <span class="nav-control">
          <b>{{ $t('nav.login') }}</b>
        </span>
        <span class="nav-control">
          <theme-toggler />
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.nav-item {
  @apply px-3 py-1 rounded-md hover:bg-stone-200 cursor-pointer;
  transition: var(--transition-200);
  text-shadow: var(--text-shadow);
}
.nav-control {
  @apply cursor-pointer hover:text-gray-300;
  transition: var(--transition-200);
}
</style>
