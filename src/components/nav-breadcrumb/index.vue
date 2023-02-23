<script setup lang="ts">
import { Right } from '@icon-park/vue-next'
</script>

<template>
  <!-- 面包屑导航 -->
  <div class="mb-10">
    <div class="flex items-center text-white">
      <span>{{ $t('nav.home') }}</span>
      <Right />
      <span>
        {{ $t(`nav.${$route.name as string}`) }}
      </span>
    </div>
    <h1
      class="text-[32px] lg:text-[64px] text-white text-shadow-primary uppercase transition-200 family-shuhei"
    >
      {{ $t(`nav.${$route.name as string}`) }}
    </h1>
  </div>
</template>
