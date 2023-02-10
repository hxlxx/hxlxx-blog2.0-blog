import type { TQueryInfo } from '@/types'
import { request } from '@/utils'
import axios from 'axios'

// 获取文章
export const getArticleList = (query?: TQueryInfo) => {
  return request.get(
    `/article/published?tag_id=${query?.tag_id}&category_id=${
      query?.category_id
    }&skip=${query?.skip || 0}&limit=${query?.limit || 0}`
  )
}
export const getPinnedArticle = () => {
  return request.get('/article/pinned')
}
export const getFeaturedArticle = () => {
  return request.get('/article/featured')
}
export const getArticleDetail = (id: number) => {
  return request.get(`/article/detail/${id}`)
}

// 获取分类
export const getCategoryAndCount = () => {
  return request.get('/category/category-count')
}

// 获取标签
export const getTagAndCount = () => {
  return request.get('/tag/tag-count')
}

// 获取网站信息
export const getWebSiteProfile = () => {
  return request.get('/site/profile')
}

// 一言接口
export const getYiYan = () => {
  return axios.get('/yiyan')
}
