import { request } from '@/utils'

export const getAbout = () => {
  return request.get('/about')
}
