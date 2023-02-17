import type { TQueryInfo } from '@/types'
import { request } from '@/utils'

export const getTalkList = ({ skip, limit }: TQueryInfo) => {
  return request.get(`/talk?skip=${skip || 0}&limit=${limit || 0}`)
}
export const getTalkById = (id: number) => {
  return request.get(`/talk/${id}`)
}
