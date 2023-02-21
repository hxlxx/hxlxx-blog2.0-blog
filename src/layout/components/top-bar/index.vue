<script setup lang="ts">
import { useSmallNav } from '@/stores'
import {
  RocketOne,
  More,
  FerrisWheel,
  Error,
  Bookmark
} from '@icon-park/vue-next'

const smallNavStore = useSmallNav()

const topBarRef = ref<HTMLElement>()
const ratio = ref<number>(0)
const showMore = ref<boolean>(false)
let timer: number | undefined
let m1 = 0
let m2 = 0

const handleDisappear = () => {
  showMore.value = false
  const topEl = topBarRef.value!
  topEl.classList.add('disappear')
  topEl.style.right = '24px'
  topEl.style.opacity = '0.8'
  topEl.style.transition = 'opacity 200ms linear'
  m1 = document.body.scrollTop
  clearTimeout(timer)
  timer = setTimeout(() => {
    m2 = document.body.scrollTop
    if (m1 === m2) {
      topEl.classList.remove('disappear')
      topEl.classList.add('appear')
      topEl.style.right = '-8px'
      topEl.style.transition = 'opacity 200ms linear 500ms'
      topEl.style.opacity = '1'
    }
  }, 600)
}
const handleGetPercent = () => {
  const offsetTop = window.scrollY
  const docHeight = document.body.scrollHeight
  const clientHeight = document.body.clientHeight
  ratio.value = Math.round((offsetTop / (docHeight - clientHeight)) * 100)
}
onMounted(() => {
  document.addEventListener('scroll', handleDisappear)
  document.addEventListener('scroll', handleGetPercent)
})
onBeforeUnmount(() => {
  document.removeEventListener('scroll', handleDisappear)
  document.removeEventListener('scroll', handleGetPercent)
})

const handleToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleOpenSmallNav = () => {
  smallNavStore.showSmallNav = !smallNavStore.showSmallNav
  showMore.value = false
}
</script>

<template>
  <teleport to="body">
    <div
      ref="topBarRef"
      class="fixed bottom-6 right-6 z-50 opacity-80 text-dark"
    >
      <div class="bar-container bg-primary shadow-primary z-30">
        <div class="bar-content" @click="showMore = !showMore">
          <template v-if="!showMore">
            <span v-if="ratio > 0" class="text-[14px]">
              {{ ratio + '%' }}
            </span>
            <more v-else size="32px" />
          </template>
          <template v-else>
            <Error theme="filled" :stroke-width="5" />
          </template>
        </div>
      </div>
      <transition name="bounce-y">
        <div
          v-if="ratio >= 10"
          class="bar-container absolute -top-16 left-0 bg-secondary shadow-primary z-20"
        >
          <div class="bar-content" @click="handleToTop">
            <rocket-one size="32px" :stroke-width="3" />
          </div>
        </div>
      </transition>
      <transition name="bounce-x">
        <div
          v-show="showMore"
          class="bar-container absolute top-0 -left-16 bg-secondary shadow-primary z-10"
        >
          <div class="bar-content" @click="$router.push('/')">
            <FerrisWheel size="24px" :stroke-width="3" />
          </div>
        </div>
      </transition>
      <transition name="bounce-bias">
        <div
          v-show="showMore"
          class="bar-container block sm:hidden absolute -top-16 -left-16 bg-secondary shadow-primary z-10"
        >
          <div class="bar-content" @click="handleOpenSmallNav">
            <Bookmark size="24px" :stroke-width="3" />
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<style lang="postcss" scoped>
.bar-container {
  @apply w-12 h-12 p-1 rounded-full transition-opacity duration-200 ease-linear cursor-pointer;
  .bar-content {
    @apply flex justify-center items-center w-full h-full rounded-full bg-[var(--text-accent)];
  }
}
.appear {
  animation: appear 300ms ease-out 500ms 1 normal forwards;
}
@keyframes appear {
  50% {
    transform: translateX(-56px);
  }
  100% {
    transform: translateX(-32px);
  }
}
.disappear {
  animation: disappear 400ms ease-in 1 normal forwards;
}
@keyframes disappear {
  50% {
    transform: translateX(56px);
  }
  100% {
    transform: translateX(32px);
  }
}

.bounce-x-enter-active {
  animation: bounce-x 0.5s;
}
.bounce-x-leave-active {
  animation: bounce-x 0.5s reverse;
}
@keyframes bounce-x {
  0% {
    transform: translateX(56px);
    opacity: 0;
  }
  50% {
    transform: translateX(-48px);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
  }
}
.bounce-y-enter-active {
  animation: bounce-y 0.5s;
}
.bounce-y-leave-active {
  animation: bounce-y 0.5s reverse;
}
@keyframes bounce-y {
  0% {
    transform: translateY(56px);
    opacity: 0;
  }
  50% {
    transform: translateY(-48px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
  }
}
.bounce-bias-enter-active {
  animation: bounce-bias 0.5s;
}
.bounce-bias-leave-active {
  animation: bounce-bias 0.5s reverse;
}
@keyframes bounce-bias {
  0% {
    transform: translate(20px, 20px);
    opacity: 0;
  }
  50% {
    transform: translate(-20px, -20px);
    opacity: 1;
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
