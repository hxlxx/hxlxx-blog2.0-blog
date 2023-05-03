<script setup lang="ts">
import { useApp, useUser } from '@/stores'
import { emptyObject } from '@/utils'
import { Search, Sphere } from '@icon-park/vue-next'
import { useI18n } from 'vue-i18n'
import { navList } from './constant'
import { useThrottleFn } from '@vueuse/core'
import Login from './components/login/index.vue'
import UserInfo from './components/user-info/index.vue'
import SmallNav from './components/small-nav/index.vue'
import HSearch from './components/h-search/index.vue'

type Props = {
  logo: string
}

defineProps<Props>()

const i18n = useI18n()
const router = useRouter()
const userStore = useUser()
const appStore = useApp()

const navHeaderRef = ref<HTMLElement>()
let positionsMemo: number = 0
const dialogVisible = ref<boolean>(false)
const logged = computed(() => !!userStore.token)

const handleScroll = () => {
  const down = window.scrollY - positionsMemo > 0
  positionsMemo = window.scrollY
  const el = navHeaderRef.value!
  el.style.transition = 'opacity 0.1s linear'
  if (down) {
    const { height } = el.getBoundingClientRect()
    el.style.opacity =
      window.scrollY <= height ? (height - window.scrollY) / height + '' : '0'
    el.style.pointerEvents = 'none'
  } else {
    el.style.opacity = '1'
    el.style.pointerEvents = 'inherit'
  }
}

const throttledScroll = useThrottleFn(handleScroll, 100)
onMounted(() => {
  // 处理导航栏滚动
  window.addEventListener('scroll', throttledScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', throttledScroll)
})

// 切换语言
const handleChangeLanguage = () => {
  i18n.locale.value = i18n.locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
}
// 打开登录框
const handleOpenDialog = () => {
  dialogVisible.value = !dialogVisible.value
}
</script>

<template>
  <div>
    <!-- 背景 -->
    <div class="header-banner">
      <div class="banner theme-gradient"></div>
    </div>
    <!-- 导航栏 -->
    <div ref="navHeaderRef" class="nav-header">
      <div
        class="relative h-full hidden sc-400:flex flex-col justify-center items-center cursor-pointer"
        @click="router.push('/')"
      >
        <span class="logo-text"> 昏晓流霞 </span>
        <span class="logo-text"> HXLX </span>
        <img class="absolute top-0 left-0 opacity-10 -z-10" :src="logo" />
      </div>
      <div class="ml-5 hidden lg:block">
        <ul class="flex gap-5">
          <li
            class="nav-item"
            v-for="nav in navList"
            :key="nav.path"
            @click="router.push(nav.path)"
          >
            <span>{{ $t(`nav.${nav.label}`) }}</span>
          </li>
        </ul>
      </div>
      <div class="ml-auto flex items-center gap-4">
        <!-- 搜索 -->
        <span
          class="nav-control"
          @click="appStore.showSearch = !appStore.showSearch"
        >
          <search size="30px" />
        </span>
        <!-- 语言切换 -->
        <span
          class="inline-flex justify-center items-center gap-1 nav-control"
          @click="handleChangeLanguage"
        >
          <sphere size="30px" />
          <b>{{ $t('nav.language') }}</b>
        </span>
        <!-- 登录 -->
        <span @click="handleOpenDialog">
          <span v-if="emptyObject(userStore.user)" class="nav-control">
            <b>{{ $t('nav.login') }}</b>
          </span>
          <div
            v-else
            class="w-12 h-12 rounded-full overflow-hidden cursor-pointer transition-300 hover:shadow-primary hover:rotate-[360deg]"
          >
            <img
              class="w-full h-full object-cover"
              :src="userStore.user.avatar_url"
            />
          </div>
        </span>
        <span class="nav-control">
          <theme-toggler />
        </span>
      </div>
    </div>
    <teleport to="body">
      <transition
        enterFromClass="opacity-0"
        enterActiveClass="transition-all duration-400 ease-linear"
        enterToClass="opacity-100"
        leaveFromClass="opacity-100"
        leaveActiveClass="transition-all duration-400 ease-linear"
        leaveToClass="opacity-0"
      >
        <login v-if="!logged" v-model="dialogVisible" />
        <user-info v-else v-model="dialogVisible" />
      </transition>
    </teleport>
    <teleport to="body">
      <small-nav />
    </teleport>
    <teleport to="body">
      <h-search />
    </teleport>
  </div>
</template>

<style lang="postcss" scoped>
.nav-header {
  @apply flex items-center w-full h-32 px-3 lg:pl-14 lg:pr-[64px] fixed top-0 left-0 text-white z-20;
  background: var(--theme-gradient);
}
.banner-img {
  background-image: url('/static/moon.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.banner {
  position: absolute;
  display: block;
  height: 800px;
  top: 0;
  left: 0;
  width: 100%;
  -webkit-clip-path: polygon(
    100% 0,
    0 0,
    0 77.5%,
    1% 77.4%,
    2% 77.1%,
    3% 76.6%,
    4% 75.9%,
    5% 75.05%,
    6% 74.05%,
    7% 72.95%,
    8% 71.75%,
    9% 70.55%,
    10% 69.3%,
    11% 68.05%,
    12% 66.9%,
    13% 65.8%,
    14% 64.8%,
    15% 64%,
    16% 63.35%,
    17% 62.85%,
    18% 62.6%,
    19% 62.5%,
    20% 62.65%,
    21% 63%,
    22% 63.5%,
    23% 64.2%,
    24% 65.1%,
    25% 66.1%,
    26% 67.2%,
    27% 68.4%,
    28% 69.65%,
    29% 70.9%,
    30% 72.15%,
    31% 73.3%,
    32% 74.35%,
    33% 75.3%,
    34% 76.1%,
    35% 76.75%,
    36% 77.2%,
    37% 77.45%,
    38% 77.5%,
    39% 77.3%,
    40% 76.95%,
    41% 76.4%,
    42% 75.65%,
    43% 74.75%,
    44% 73.75%,
    45% 72.6%,
    46% 71.4%,
    47% 70.15%,
    48% 68.9%,
    49% 67.7%,
    50% 66.55%,
    51% 65.5%,
    52% 64.55%,
    53% 63.75%,
    54% 63.15%,
    55% 62.75%,
    56% 62.55%,
    57% 62.5%,
    58% 62.7%,
    59% 63.1%,
    60% 63.7%,
    61% 64.45%,
    62% 65.4%,
    63% 66.45%,
    64% 67.6%,
    65% 68.8%,
    66% 70.05%,
    67% 71.3%,
    68% 72.5%,
    69% 73.6%,
    70% 74.65%,
    71% 75.55%,
    72% 76.35%,
    73% 76.9%,
    74% 77.3%,
    75% 77.5%,
    76% 77.45%,
    77% 77.25%,
    78% 76.8%,
    79% 76.2%,
    80% 75.4%,
    81% 74.45%,
    82% 73.4%,
    83% 72.25%,
    84% 71.05%,
    85% 69.8%,
    86% 68.55%,
    87% 67.35%,
    88% 66.2%,
    89% 65.2%,
    90% 64.3%,
    91% 63.55%,
    92% 63%,
    93% 62.65%,
    94% 62.5%,
    95% 62.55%,
    96% 62.8%,
    97% 63.3%,
    98% 63.9%,
    99% 64.75%,
    100% 65.7%
  );
  clip-path: polygon(
    100% 0,
    0 0,
    0 77.5%,
    1% 77.4%,
    2% 77.1%,
    3% 76.6%,
    4% 75.9%,
    5% 75.05%,
    6% 74.05%,
    7% 72.95%,
    8% 71.75%,
    9% 70.55%,
    10% 69.3%,
    11% 68.05%,
    12% 66.9%,
    13% 65.8%,
    14% 64.8%,
    15% 64%,
    16% 63.35%,
    17% 62.85%,
    18% 62.6%,
    19% 62.5%,
    20% 62.65%,
    21% 63%,
    22% 63.5%,
    23% 64.2%,
    24% 65.1%,
    25% 66.1%,
    26% 67.2%,
    27% 68.4%,
    28% 69.65%,
    29% 70.9%,
    30% 72.15%,
    31% 73.3%,
    32% 74.35%,
    33% 75.3%,
    34% 76.1%,
    35% 76.75%,
    36% 77.2%,
    37% 77.45%,
    38% 77.5%,
    39% 77.3%,
    40% 76.95%,
    41% 76.4%,
    42% 75.65%,
    43% 74.75%,
    44% 73.75%,
    45% 72.6%,
    46% 71.4%,
    47% 70.15%,
    48% 68.9%,
    49% 67.7%,
    50% 66.55%,
    51% 65.5%,
    52% 64.55%,
    53% 63.75%,
    54% 63.15%,
    55% 62.75%,
    56% 62.55%,
    57% 62.5%,
    58% 62.7%,
    59% 63.1%,
    60% 63.7%,
    61% 64.45%,
    62% 65.4%,
    63% 66.45%,
    64% 67.6%,
    65% 68.8%,
    66% 70.05%,
    67% 71.3%,
    68% 72.5%,
    69% 73.6%,
    70% 74.65%,
    71% 75.55%,
    72% 76.35%,
    73% 76.9%,
    74% 77.3%,
    75% 77.5%,
    76% 77.45%,
    77% 77.25%,
    78% 76.8%,
    79% 76.2%,
    80% 75.4%,
    81% 74.45%,
    82% 73.4%,
    83% 72.25%,
    84% 71.05%,
    85% 69.8%,
    86% 68.55%,
    87% 67.35%,
    88% 66.2%,
    89% 65.2%,
    90% 64.3%,
    91% 63.55%,
    92% 63%,
    93% 62.65%,
    94% 62.5%,
    95% 62.55%,
    96% 62.8%,
    97% 63.3%,
    98% 63.9%,
    99% 64.75%,
    100% 65.7%
  );
}
.logo-text {
  @apply text-white text-[30px] font-semibold;
  text-shadow: var(--text-shadow);
}
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
