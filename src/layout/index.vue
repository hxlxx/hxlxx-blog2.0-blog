<script setup lang="ts">
import NavHeader from './components/nav-header/index.vue'
</script>

<template>
  <div class="bg-primary transition-200">
    <!-- 顶部导航栏 -->
    <nav-header />
    <div class="mx-5 lg:mx-32 pt-36 lg:px-10">
      <router-view />
    </div>
  </div>
</template>
