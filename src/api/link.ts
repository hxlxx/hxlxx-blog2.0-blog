import { request } from '@/utils'
import type { AxiosRequestConfig } from 'axios'

export const getLinkList = () => {
  return request.get('/link')
}
export const createLink = (options: AxiosRequestConfig) => {
  return request.post('/link', options)
}
