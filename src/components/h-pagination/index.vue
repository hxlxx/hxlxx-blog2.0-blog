<script setup lang="ts">
import { LeftOne, RightOne } from '@icon-park/vue-next'

type Props = {
  page: number
  total: number
  range: number
  size: number
}

const emits = defineEmits(['onChangePage'])
const props = withDefaults(defineProps<Props>(), {
  page: 1,
  total: 100,
  range: 5,
  size: 5
})
const current = ref<number>(props.page)
const totalPage = computed(() => Math.ceil(props.total / props.size))

const startAndEnd = computed(() => {
  const range = Math.floor(props.range / 2)
  let start = current.value - range
  let end = current.value + range
  if (start < 2) {
    start = 1
    end = props.range
  }
  if (end > totalPage.value - 1) {
    end = totalPage.value
    start = end - props.range
  }
  return { start, end }
})

const handleChangePage = (index: number) => {
  current.value = index
  emits('onChangePage', index)
}
</script>

<template>
  <div class="p-[15px]">
    <ul class="flex justify-center gap-5 text-normal">
      <li
        v-if="current > 1"
        class="text-bright page-bar transition-100"
        @click="emits('onChangePage', --current)"
      >
        <left-one class="text-accent" :stroke-width="6" size="20px" />
        <b class="text-[20px]">pre</b>
      </li>
      <li
        v-if="startAndEnd.start > 1"
        class="page-bar"
        @click="emits('onChangePage', 1)"
      >
        <b>1</b>
      </li>
      <li v-if="startAndEnd.start > 2">
        <b>...</b>
      </li>
      <template v-for="index in startAndEnd.end" :key="index">
        <li
          v-if="index >= startAndEnd.start"
          :class="[
            current === index ? 'text-accent' : '',
            'cursor-pointer',
            'hover:opacity-50',
            'transition-100'
          ]"
          @click="handleChangePage(index)"
        >
          <b>{{ index }}</b>
        </li>
      </template>
      <li v-if="startAndEnd.end < totalPage - 1">
        <b>...</b>
      </li>
      <li
        v-if="startAndEnd.end < totalPage"
        class="page-bar"
        @click="emits('onChangePage', totalPage)"
      >
        <b>{{ totalPage }}</b>
      </li>
      <li
        v-if="current < totalPage"
        class="text-bright page-bar"
        @click="emits('onChangePage', ++current)"
      >
        <b class="text-[20px]">nxt</b>
        <right-one class="text-accent" :stroke-width="6" size="20px" />
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
ul > li {
  @apply flex items-center;
}
.page-bar {
  @apply cursor-pointer hover:opacity-50;
}
</style>
