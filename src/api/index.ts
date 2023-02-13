import type { TQueryInfo } from '@/types'
import { request } from '@/utils'
import axios, { type AxiosRequestConfig } from 'axios'

// 登录
export const login = (options: AxiosRequestConfig) => {
  return request.post('/login', options)
}
// 注册
export const register = (options: AxiosRequestConfig) => {
  return request.post('/user/register', options)
}
// 发送验证码
export const getCode = (options: AxiosRequestConfig) => {
  return request.post('/code', options)
}
// 重置用户名
export const resetUsername = (options: AxiosRequestConfig) => {
  return request.patch('/user/username', options)
}
// 重置头像
export const resetAvatar = (options: AxiosRequestConfig) => {
  return request.patch('/user/avatar', options)
}
// 重置密码
export const resetPassword = (options: AxiosRequestConfig) => {
  return request.patch('/user/password', options)
}

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
export const getCategoryTop10 = () => {
  return request.get('/category/top10')
}
export const getCategoryAndCount = () => {
  return request.get('/category/category-count')
}

// 获取标签
export const getTagTop10 = () => {
  return request.get('/tag/top10')
}
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
