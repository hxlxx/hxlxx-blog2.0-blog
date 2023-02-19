<script setup lang="ts">
import { LockOne, ArrowCircleLeft } from '@icon-park/vue-next'
import { login, getCode, register, resetPassword } from '@/api'
import { useUser } from '@/stores'
import type { TLoginForm, TSignupForm } from '@/types'
import hMessage from '@/components/h-message'
import { useI18n } from 'vue-i18n'

type Props = {
  modelValue: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
const userStore = useUser()
const i18n = useI18n()

const loginOrSignup = ref<boolean>(true)
const signUpOrForgot = ref<boolean>(true)
const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const emailErrorMsg = ref<string>('')
const emailErrorMsg2 = ref<string>('')
const passwordErrorMsg = ref<string>('')
const passwordErrorMsg2 = ref<string>('')
const codeErrorMsg = ref<string>('')
const captchaUrl = ref<string>(`/api/captcha?${Math.random()}`)
const formInitial = () => ({
  email: '',
  password: '',
  code: ''
})
const loginForm = reactive<TLoginForm>(formInitial())
const signUpForm = reactive<TSignupForm>(formInitial())
const disableButton = ref<boolean>(false)
const countdown = ref<number>(60)
let countTimer: number

// 重置表单
const resetForm = () => {
  Object.assign(loginForm, formInitial())
  Object.assign(signUpForm, formInitial())
  clearFormError()
}
// 清空表单验证信息
const clearFormError = () => {
  emailErrorMsg.value = ''
  emailErrorMsg2.value = ''
  passwordErrorMsg.value = ''
  passwordErrorMsg2.value = ''
  codeErrorMsg.value = ''
}
// 关闭登录框
const handleCloseDialog = (e: Event) => {
  const id = (e.target as HTMLElement).id
  if (id === 'dialog-container') {
    clearFormError()
    emits('update:modelValue', !props.modelValue)
  }
}
// 切换到登录界面
const handleToLogin = () => {
  clearFormError()
  loginOrSignup.value = !loginOrSignup.value
  signUpOrForgot.value = true
}
// 切换到注册界面
const handleToSignup = () => {
  clearFormError()
  loginOrSignup.value = !loginOrSignup.value
}
// 忘记密码
const handleForgot = () => {
  loginOrSignup.value = !loginOrSignup.value
  signUpOrForgot.value = false
}
// 邮箱验证
const validateEmail = (email: string) => {
  if (!email.trim()) {
    emailErrorMsg.value = i18n.t('form.error.emailEmpty')
    emailErrorMsg2.value = i18n.t('form.error.emailEmpty')
    return false
  }
  if (!emailReg.test(email)) {
    emailErrorMsg.value = i18n.t('form.error.emailFormat')
    emailErrorMsg2.value = i18n.t('form.error.emailFormat')
    return false
  }
  emailErrorMsg.value = ''
  emailErrorMsg2.value = ''
  return true
}
// 密码验证
const validatePassword = (password: string) => {
  if (!password.trim()) {
    passwordErrorMsg.value = i18n.t('form.error.passwordEmpty')
    passwordErrorMsg2.value = i18n.t('form.error.passwordEmpty')
    return false
  }
  if (password.trim().length < 6) {
    passwordErrorMsg.value = i18n.t('form.error.passwordMinLen')
    passwordErrorMsg2.value = i18n.t('form.error.passwordMinLen')
    return false
  }
  if (password.trim().length > 16) {
    passwordErrorMsg.value = i18n.t('form.error.passwordMaxLen')
    passwordErrorMsg2.value = i18n.t('form.error.passwordMaxLen')
    return false
  }
  passwordErrorMsg.value = ''
  passwordErrorMsg2.value = ''
  return true
}
// 验证码验证
const validateCode = (code: string) => {
  if (!code.trim()) {
    codeErrorMsg.value = i18n.t('form.error.codeEmpty')
    return false
  }
  codeErrorMsg.value = ''
  return true
}
// 点击切换验证码
const handleChangeCaptcha = () => {
  captchaUrl.value = `/api/captcha?${Math.random()}`
}
// 登录
const handleLogin = async () => {
  if (
    validateEmail(loginForm.email) &&
    validatePassword(loginForm.password) &&
    validateCode(loginForm.code)
  ) {
    const form = toRaw(loginForm) as any
    form.username = form.email

    const { data } = (await login({ data: form })) || {}
    userStore.setUser(data.user)
    userStore.setToken(data.token)
    hMessage({
      type: 'success',
      message: i18n.t('message.LoginSuccess')
    })
    emits('update:modelValue', !props.modelValue)
    resetForm()
  }
}
// 发送验证码
const handleSendCode = async () => {
  if (validateEmail(signUpForm.email)) {
    disableButton.value = true
    countTimer = setInterval(() => {
      if (countdown.value > 0) countdown.value--
      else {
        clearInterval(countTimer)
        countdown.value = 60
        disableButton.value = false
      }
    }, 1000) as unknown as number
    await getCode({ data: { email: signUpForm.email } })
    hMessage({
      type: 'success',
      message: i18n.t('message.sendCode')
    })
  }
}
// 注册 | 忘记密码
const handleSignUpOrResetPwd = async () => {
  if (
    validateEmail(signUpForm.email) &&
    validatePassword(signUpForm.password) &&
    validateCode(signUpForm.code)
  ) {
    const form = toRaw(signUpForm)
    const { code } =
      (signUpOrForgot.value
        ? await register({ data: form })
        : await resetPassword({ data: form })) || {}
    if (code === 200) {
      hMessage({
        type: 'success',
        message: i18n.t(
          `message.${
            signUpOrForgot.value ? 'signUpSuccess' : 'resetPasswordSuccess'
          }`
        )
      })
      emits('update:modelValue', !props.modelValue)
      resetForm()
    } else {
      signUpForm.code = ''
      signUpForm.password = ''
    }
  }
}
</script>

<template>
  <div
    v-if="modelValue"
    id="dialog-container"
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.2)] z-30"
    @click="handleCloseDialog"
  >
    <form
      class="card w-[90%] sc-900:w-[30%] family-shuhei transition-200"
      @submit.prevent
    >
      <!-- 登录表单 -->
      <div v-if="loginOrSignup" class="form">
        <h1 id="heading" class="text-bright">{{ $t('form.login') }}</h1>
        <div>
          <!-- 邮箱 -->
          <div class="field">
            <b class="text-normal pl-[1px] text-[24px] leading-[0.75]">@</b>
            <input
              class="input-field"
              type="text"
              v-model.trim="loginForm.email"
              :placeholder="$t('form.email')"
              @input="validateEmail(loginForm.email)"
            />
          </div>
          <em v-if="emailErrorMsg" class="error-msg">{{ emailErrorMsg }}</em>
        </div>
        <div>
          <!-- 密码 -->
          <div class="field">
            <lock-one class="text-normal" size="24px" :strokeWidth="5" />
            <input
              class="input-field"
              type="password"
              v-model.trim="loginForm.password"
              :placeholder="$t('form.password')"
              @input="validatePassword(loginForm.password)"
            />
          </div>
          <em v-if="passwordErrorMsg" class="error-msg">
            {{ passwordErrorMsg }}
          </em>
        </div>
        <div>
          <!-- 验证码 -->
          <div class="flex gap-3 items-center">
            <div class="field">
              <input
                class="input-field pl-1"
                type="text"
                v-model.trim="loginForm.code"
                :placeholder="$t('form.code')"
                @input="validateCode(loginForm.code)"
              />
            </div>
            <div
              class="min-w-[80px] h-10 cursor-pointer"
              @click="handleChangeCaptcha"
            >
              <img
                class="w-full h-full object-cover rounded-[5px]"
                :src="captchaUrl"
              />
            </div>
          </div>
          <em v-if="codeErrorMsg" class="error-msg">
            {{ codeErrorMsg }}
          </em>
        </div>
        <div class="flex justify-center gap-[10px] mt-5">
          <h-button class="w-[140px]" type="primary" @click="handleLogin">
            {{ $t('form.login') }}
          </h-button>
          <h-button class="w-[140px]" @click="handleToSignup">
            {{ $t('form.signUp') }}
          </h-button>
        </div>
        <div class="flex justify-center">
          <h-button class="w-[290px]" type="danger" @click="handleForgot">
            {{ $t('form.forgotPassword') }}
          </h-button>
        </div>
      </div>
      <!-- 注册、重置密码表单 -->
      <div v-else class="form">
        <h1 id="heading" class="text-bright">
          {{ $t(`form.${signUpOrForgot ? 'signUp' : 'forgotPassword'}`) }}
        </h1>
        <div>
          <!-- 邮箱 -->
          <div class="field">
            <b class="text-normal pl-[1px] text-[24px] leading-[0.75]">@</b>
            <input
              class="input-field"
              type="text"
              v-model.trim="signUpForm.email"
              :placeholder="$t('form.email')"
              @input="validateEmail(signUpForm.email)"
            />
          </div>
          <em v-if="emailErrorMsg2" class="error-msg">
            {{ emailErrorMsg2 }}
          </em>
        </div>
        <div class="flex gap-3">
          <div>
            <!-- 验证码 -->
            <div class="field">
              <input
                class="input-field pl-1"
                type="text"
                v-model.trim="signUpForm.code"
                :placeholder="$t('form.code')"
              />
            </div>
            <em v-if="codeErrorMsg" class="error-msg">
              {{ codeErrorMsg }}
            </em>
          </div>
          <h-button
            type="info"
            :disabled="disableButton"
            @click="handleSendCode"
          >
            <span v-if="!disableButton">{{ $t('form.sendCode') }}</span>
            <span v-else>{{ countdown }}{{ $t('form.sendCodeAgain') }}</span>
          </h-button>
        </div>
        <div>
          <!-- 密码 -->
          <div class="field">
            <lock-one class="text-normal" size="24px" :strokeWidth="5" />
            <input
              class="input-field"
              type="password"
              v-model.trim="signUpForm.password"
              :placeholder="
                $t(`form.${signUpOrForgot ? 'password' : 'newPassword'}`)
              "
              @input="validatePassword(signUpForm.password)"
            />
          </div>
          <em v-if="passwordErrorMsg" class="error-msg">
            {{ passwordErrorMsg }}
          </em>
        </div>
        <div class="flex justify-center gap-[10px] mt-5">
          <h-button @click="handleToLogin">
            <arrow-circle-left size="24px" />
          </h-button>
          <h-button class="w-[140px]" @click="handleSignUpOrResetPwd">
            {{ $t(`form.${signUpOrForgot ? 'signUp' : 'confirm'}`) }}
          </h-button>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="postcss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 40px 40px;
}

#heading {
  text-align: center;
  margin: 1em;
  font-size: 1.2em;
}

.field {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  border-radius: 25px;
  padding: 0.6em;
  border: none;
  outline: none;
  color: white;
  background-color: var(--background-primary);
  box-shadow: inset var(--shadow-primary);
}

.input-icon {
  height: 1.3em;
  width: 1.3em;
}

.input-field {
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: var(--text-normal);
}

.error-msg {
  @apply pl-3 text-[var(--color-red)];
}
</style>
