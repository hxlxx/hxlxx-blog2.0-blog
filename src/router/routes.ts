import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue')
  },
  {
    path: '/article-list',
    name: 'article-list',
    component: () => import('@/views/article-list-tag/index.vue')
  },
  {
    path: '/article-detail/:id(\\d+)',
    name: 'article-detail',
    component: () => import('@/views/article-detail/index.vue')
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import('@/views/tags/index.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/views/message/index.vue')
  },
  {
    path: '/archives',
    name: 'archives',
    component: () => import('@/views/archives/index.vue')
  },
  {
    path: '/talks',
    name: 'talks',
    component: () => import('@/views/talks/index.vue')
  },
  {
    path: '/talk/:id(\\d+)',
    name: 'talk-comments',
    component: () => import('@/views/talk-comments/index.vue')
  },
  {
    path: '/links',
    name: 'links',
    component: () => import('@/views/links/index.vue')
  }
]
