<script setup lang="ts">
import AppHeader from './components/app-header/index.vue'
import AppFooter from './components/app-footer/index.vue'
import { getWebSiteProfile } from '@/api'
import { useSiteProfile } from '@/stores'
import { Right } from '@icon-park/vue-next'

const route = useRoute()
const profileStore = useSiteProfile()

const beianNumber = ref<string>('')
const logo = ref<string>('')
const navList = [
  'talks',
  'about',
  'archives',
  'tags',
  'message',
  'album',
  'links'
]

onBeforeMount(() => {
  initWebsiteProfile()
})

const initWebsiteProfile = async () => {
  const { data } = (await getWebSiteProfile()) || {}
  beianNumber.value = data.websiteConfig.beianNumber
  logo.value = data.websiteConfig.logo
  profileStore.setSiteProfile(data)
}
</script>

<template>
  <div class="bg-primary transition-200 min-h-[937px]">
    <!-- 顶部导航栏 -->
    <app-header :logo="logo" />
    <div class="mx-5 relative z-10 lg:mx-auto lg:max-w-[1700px] pt-36 lg:px-10">
      <div v-if="navList.includes(route.name as string)" class="mb-10">
        <div class="flex items-center text-white">
          <span>{{ $t('nav.home') }}</span>
          <Right />
          <span>
            {{ $t(`nav.${route.name as string}`) }}
          </span>
        </div>
        <h1
          class="text-[32px] lg:text-[64px] text-white text-shadow-primary uppercase transition-200"
        >
          {{ $t(`nav.${route.name as string}`) }}
        </h1>
      </div>
      <router-view />
    </div>
  </div>
  <!-- 页脚 -->
  <app-footer :beian-number="beianNumber" />
</template>
