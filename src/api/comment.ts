import type { TCommentType, TQueryInfo } from '@/types'
import { request } from '@/utils'
import type { AxiosRequestConfig } from 'axios'

export const createComment = (options: AxiosRequestConfig) => {
  return request.post('/comment', options)
}
export const getCommentList = (
  type: TCommentType,
  query: TQueryInfo,
  aid?: number
) => {
  return request.get(
    `/comment?type=${type}${aid ? `&aid=${aid}` : ''}&skip=${
      query.skip || 0
    }&limit=${query.limit}`
  )
}
export const getRecentlyComment = () => {
  return request.get('/comment/recently')
}
