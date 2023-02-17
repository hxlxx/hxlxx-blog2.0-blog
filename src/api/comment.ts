import type { TCommentType, TQueryInfo } from '@/types'
import { request } from '@/utils'
import type { AxiosRequestConfig } from 'axios'

export const createComment = (options: AxiosRequestConfig) => {
  return request.post('/comment', options)
}
export const getCommentList = (
  type: TCommentType,
  query: TQueryInfo,
  topic_id?: number
) => {
  return request.get(
    `/comment?type=${type}${topic_id ? `&topic_id=${topic_id}` : ''}&skip=${
      query.skip || 0
    }&limit=${query.limit}`
  )
}
export const getRecentlyComment = () => {
  return request.get('/comment/recently')
}
