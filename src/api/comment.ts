import { request } from '@/utils'
import type { AxiosRequestConfig } from 'axios'

export const createComment = (options: AxiosRequestConfig) => {
  return request.post('/comment', options)
}
export const getCommentList = () => {
  return request.get('/comment')
}
export const getCommentListByAid = (aid: number) => {
  return request.get(`/comment/article/${aid}`)
}
export const getRecentlyComment = () => {
  return request.get('/comment/recently')
}
