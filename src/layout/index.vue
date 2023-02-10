<script setup lang="ts">
import AppHeader from './components/app-header/index.vue'
import AppFooter from './components/app-footer/index.vue'
import { getWebSiteProfile } from '@/api'
import { useSiteProfile } from '@/stores'

const profileStore = useSiteProfile()

const beianNumber = ref<string>('')
const logo = ref<string>('')

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
  <div class="bg-primary transition-200">
    <!-- 顶部导航栏 -->
    <app-header :logo="logo" />
    <div class="mx-5 relative z-10 lg:mx-auto lg:max-w-[1700px] pt-36 lg:px-10">
      <router-view />
    </div>
    <!-- 页脚 -->
    <app-footer :beian-number="beianNumber" />
  </div>
</template>
