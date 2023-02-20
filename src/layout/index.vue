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
  <div class="bg-primary transition-200 min-h-[937px]">
    <!-- 顶部导航栏 -->
    <app-header :logo="logo" />
    <div class="mx-5 relative z-10 lg:mx-auto lg:max-w-[1700px] pt-36 lg:px-10">
      <router-view v-slot="{ Component }">
        <transition
          appear
          mode="out-in"
          enterFromClass="opacity-0 top-[80px]"
          enterActiveClass="relative transition-all duration-600 ease-linear"
          enterToClass="opacity-100 top-0"
          leaveFromClass="opacity-100 top-0"
          leaveActiveClass="relative transition-all duration-600 ease-linear"
          leaveToClass="opacity-0 top-[80px]"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
  <!-- 页脚 -->
  <app-footer :beian-number="beianNumber" />
</template>
