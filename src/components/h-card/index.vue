<script setup lang="ts">
type Props = {
  dividerWith?: string
  dividerHeight?: string
}

defineProps<Props>()
</script>

<template>
  <div class="p-5 rounded-xl text-normal bg-secondary shadow-primary">
    <div class="relative mb-4">
      <div>
        <slot name="header" />
      </div>
      <span
        class="absolute left-0 bottom-0 min-w-[100px] w-[5%] h-1 rounded-[2px] theme-gradient"
        :style="{
          width: dividerWith,
          height: dividerHeight
        }"
      ></span>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
