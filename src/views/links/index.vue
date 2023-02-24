<script setup lang="ts">
import { createLink, getLinkList } from '@/api'
import hMessage from '@/components/h-message'
import { useSiteProfile, useUser } from '@/stores'
import type { TLink, TWebsiteProfile } from '@/types'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const profileStore = useSiteProfile()
const userStore = useUser()

const profile = reactive<TWebsiteProfile>({} as TWebsiteProfile)
const linkList = ref<TLink[]>([])
const formInitial = () => ({
  link_name: '',
  link_avatar: '',
  link_url: '',
  link_intro: '',
  status: false
})
const linkForm = reactive<TLink>(formInitial())

onBeforeMount(() => {
  initLinkList()
  Object.assign(profile, profileStore.profile)
})

const initLinkList = async () => {
  const { data } = (await getLinkList()) || {}
  linkList.value = data.res
}
const resetForm = () => {
  Object.assign(linkForm, formInitial())
}
const handleSubmit = async () => {
  if (!userStore.token) {
    return hMessage({
      type: 'danger',
      message: i18n.t('message.pleaseLogin')
    })
  }
  if (
    !linkForm.link_name ||
    !linkForm.link_avatar ||
    !linkForm.link_url ||
    !linkForm.link_intro
  ) {
    return hMessage({
      type: 'warning',
      message: i18n.t('message.pleaseImproveInfo')
    })
  }
  const { code } = (await createLink({ data: toRaw(linkForm) })) || {}
  if (code === 200) {
    hMessage({
      type: 'success',
      message: i18n.t('message.applySuccess')
    })
    resetForm()
  }
}
</script>

<template>
  <div>
    <nav-breadcrumb />
    <div class="flex gap-5">
      <div class="flex-1">
        <div
          class="card p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <template v-if="linkList.length">
            <div
              v-for="link in linkList"
              :key="link.id"
              class="flex items-center gap-5 p-5 bg-primary rounded-xl transition-200 hover:shadow-primary"
            >
              <div
                class="shrink-0 w-20 h-20 rounded-full overflow-hidden transition-300 hover:shadow-primary hover:rotate-[360deg]"
              >
                <img
                  class="w-full h-full object-cover"
                  :src="link.link_avatar"
                />
              </div>
              <div>
                <a
                  :href="link.link_url"
                  class="text-bright text-[20px]"
                  target="_blank"
                >
                  {{ link.link_name }}
                </a>
                <p class="mt-1 text-cutoff-1">
                  {{ link.link_intro }}
                </p>
              </div>
            </div>
          </template>
          <div v-else>
            <span class="text-[20px] family-shuhei">
              {{ $t('placeholder.noFriendsYet') }}
            </span>
          </div>
        </div>
        <!-- 交换友链表单 -->
        <h-card class="p-10 mt-10">
          <template #header>
            <h1 class="py-2 text-bright text-[32px]">
              {{ $t('title.shareLink') }}
            </h1>
          </template>
          <form class="flex flex-col gap-3" @submit.prevent>
            <div class="field">
              <label
                class="min-w-[80px] text-left text-bright shrink-0"
                for="name"
              >
                {{ $t('form.linkName') }}
              </label>
              <input
                class="field-input bg-primary"
                id="name"
                type="text"
                autocomplete="off"
                v-model.trim="linkForm.link_name"
              />
            </div>
            <div class="field">
              <label
                class="min-w-[80px] text-left text-bright shrink-0"
                for="avatar"
              >
                {{ $t('form.linkAvatar') }}
              </label>
              <input
                class="field-input bg-primary"
                id="avatar"
                type="text"
                autocomplete="off"
                v-model.trim="linkForm.link_avatar"
              />
            </div>
            <div class="field">
              <label
                class="min-w-[80px] text-left text-bright shrink-0"
                for="link"
              >
                {{ $t('form.linkUrl') }}
              </label>
              <input
                class="field-input bg-primary"
                id="link"
                type="text"
                autocomplete="off"
                v-model.trim="linkForm.link_url"
              />
            </div>
            <div class="field">
              <label
                class="min-w-[80px] text-left text-bright shrink-0"
                for="introduce"
              >
                {{ $t('form.linkIntroduce') }}
              </label>
              <input
                class="field-input bg-primary"
                id="introduce"
                type="text"
                autocomplete="off"
                v-model.trim="linkForm.link_intro"
              />
            </div>
            <div class="field justify-end">
              <h-button type="primary" @click="handleSubmit">
                {{ $t('button.apply') }}
              </h-button>
            </div>
          </form>
        </h-card>
      </div>
      <div class="hidden sc-1260:block w-[324px]">
        <profile-card :profile="profile" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.field {
  @apply flex items-center gap-5;
  .field-input {
    @apply w-full px-2 py-1 rounded-md outline-none;
  }
  .field-input:focus {
    @apply outline-2 outline outline-[var(--text-accent)];
  }
}
</style>
