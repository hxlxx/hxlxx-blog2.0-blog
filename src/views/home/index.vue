<script setup lang="ts">
import FeatureList from './components/feature-list/index.vue'
import HomeMain from './components/home-main/index.vue'
</script>

<template>
  <div>
    <!-- 每日一句 -->
    <div
      class="relative w-full h-[140px] mb-10 bg-transparent text-primary z-10"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
      accusantium consectetur assumenda officiis dolore nulla fugit nesciunt
      similique accusamus sequi perspiciatis quam vero deleniti ut quia
      molestias minima voluptatibus nisi? Illum amet, eveniet id mollitia ab rem
      ad quisquam eaque at recusandae reiciendis quibusdam beatae debitis
      numquam voluptatum. Sequi tempore repudiandae soluta fuga, ipsam nulla
      voluptatem quae rerum quod facere.
    </div>
    <!-- 置顶文章 -->
    <article-preview-main />
    <!-- 推荐文章 -->
    <feature-list />
    <!-- 文章列表 -->
    <home-main />
    <!-- 页脚 -->
    <div class="w-full h-20 flex flex-col justify-center items-center">
      <span>Copyright © 2022 - 2023 hxlxx</span>
      <a href="javascript:;"> 蜀ICP备2022027456号 </a>
    </div>
    <div class="test"></div>
  </div>
</template>

<style lang="scss" scoped></style>
