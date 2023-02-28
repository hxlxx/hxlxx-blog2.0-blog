<script setup lang="ts">
import { resetUsername, resetAvatar } from '@/api'
import hMessage from '@/components/h-message'
import { useUser } from '@/stores'
import type { User } from '@/types'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

type Props = {
  modelValue: boolean
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()
const userStore = useUser()
const i18n = useI18n()

const uploadRef = ref<HTMLInputElement>()
const user = reactive<User>({} as User)
let usernameMemo = ''
const usernameReg =
  /[`~!@#$^&*()=|{}':;',\\[\].<>/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g
const usernameErrorMsg = ref<string>('')
const uploadToken = import.meta.env.VITE_UPLOAD_TOKEN
const imgBaseUrl = import.meta.env.VITE_IMG_BASE_URL

onBeforeMount(() => {
  Object.assign(user, userStore.user)
  usernameMemo = user.username
})
watch(
  () => userStore.user,
  (newVla) => {
    Object.assign(user, newVla)
    usernameMemo = user.username
  }
)

// 关闭登录框
const handleCloseDialog = (e: Event) => {
  const id = (e.target as HTMLElement).id
  if (id === 'dialog-container') {
    user.username = usernameMemo
    usernameErrorMsg.value = ''
    emits('update:modelValue', !props.modelValue)
  }
}
// 用户名验证
const validateUsername = (username: string) => {
  if (!username.trim()) {
    usernameErrorMsg.value = i18n.t('form.error.usernameEmpty')
    return false
  }
  if (usernameReg.test(username)) {
    usernameErrorMsg.value = i18n.t('form.error.usernameFormat')
    return false
  }
  if (username.trim().length < 5) {
    usernameErrorMsg.value = i18n.t('form.error.usernameMinLen')
    return false
  }
  if (username.trim().length > 20) {
    usernameErrorMsg.value = i18n.t('form.error.usernameMaxLen')
    return false
  }
  return true
}
const handleChangeUsername = () => {
  validateUsername(user.username) && (usernameErrorMsg.value = '')
}
// 图片验证
const validateImg = (file: File) => {
  const fileTypes = [
    'image/gif',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
  ]
  if (fileTypes.includes(file.type)) {
    if (file.size < 1024 * 1024 * 5) {
      return true
    }
    hMessage({
      type: 'danger',
      message: i18n.t('message.imgOverSize')
    })
    return false
  }
  hMessage({
    type: 'danger',
    message: i18n.t('message.imgFormat')
  })
  return false
}
// 重置头像
const handleUpload = (e: Event) => {
  const file = (e.target as HTMLInputElement).files![0]
  if (file && validateImg(file)) {
    const form = new FormData()
    form.append('file', file)
    form.append('token', uploadToken)
    axios
      .post('/qiniu', form)
      .then(async ({ data: res }) => {
        if (res.hash) {
          const imgUrl = imgBaseUrl + res.hash
          user.avatar_url = imgUrl
          const { data } = (await resetAvatar({ data: toRaw(user) })) || {}
          userStore.setUser(data)
          hMessage({
            type: 'success',
            message: i18n.t('message.resetAvatarSuccess')
          })
        }
      })
      .catch(({ data }) => {
        hMessage({
          type: 'danger',
          message: (data as any).message
        })
      })
  }
}
// 重置用户名
const handleResetUsername = async () => {
  const { data } = (await resetUsername({ data: toRaw(user) })) || {}
  hMessage({
    type: 'success',
    message: i18n.t('message.resetNicknameSuccess')
  })
  userStore.setUser(data)
}
// 注销
const handleLogout = () => {
  userStore.clearUser()
  hMessage({
    type: 'info',
    message: i18n.t('message.logout')
  })
  emits('update:modelValue', !props.modelValue)
}
</script>

<template>
  <div
    v-if="modelValue"
    id="dialog-container"
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.2)] z-30"
    @click="handleCloseDialog"
  >
    <div class="user-card text-normal hover:shadow-primary">
      <div class="w-full h-full rounded-xl bg-primary opacity-90">
        <div
          class="absolute top-0 left-0 flex flex-col justify-around w-full h-full px-3"
        >
          <div class="flex flex-col items-center">
            <!-- 头像 -->
            <div
              class="w-[112px] h-[112px] p-1 mb-5 rounded-full bg-primary shadow-primary cursor-pointer"
              @click="uploadRef?.click()"
            >
              <img
                class="w-full h-full object-cover rounded-full"
                :src="userStore.user.avatar_url"
              />
              <input
                ref="uploadRef"
                class="hidden"
                type="file"
                name="file"
                @change="handleUpload"
              />
            </div>
            <!-- 昵称 -->
            <span
              class="inline-block w-[50%] h-1 mb-5 rounded-[2px] theme-gradient"
            ></span>
            <form
              class="w-full flex flex-col items-center gap-5 px-5"
              @submit.prevent
            >
              <div class="w-full flex">
                <div class="w-1/2 mr-[2%]">
                  <input
                    class="w-full p-3 rounded-lg"
                    type="text"
                    v-model.trim="user.username"
                    :placeholder="$t('form.nickName')"
                    @input="handleChangeUsername"
                  />
                  <em
                    v-if="usernameErrorMsg"
                    class="pl-3 text-[var(--color-red)]"
                  >
                    {{ usernameErrorMsg }}
                  </em>
                </div>
                <h-button
                  class="w-[48%] h-12 bg-secondary"
                  :disabled="
                    user.username === usernameMemo ||
                    !validateUsername(user.username)
                  "
                  @click="handleResetUsername"
                >
                  {{ $t('form.changeNickName') }}
                </h-button>
              </div>
              <div class="w-full">
                <input
                  class="w-full p-3 rounded-lg cursor-not-allowed bg-gray-200"
                  type="text"
                  disabled
                  :placeholder="$t('form.email')"
                  :value="user.email"
                />
              </div>
              <h-button class="w-[140px] bg-secondary" @click="handleLogout">
                {{ $t('form.logout') }}
              </h-button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.user-card {
  @apply relative w-[90%] sc-900:w-[30%] h-[24rem] px-1 pt-12 pb-1 rounded-xl;
  background-image: var(--theme-gradient);
  transition: var(--transition-200);

  button,
  input {
    border: none;
    outline: none;
  }
}
</style>
