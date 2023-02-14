import { request } from '@/utils'
import axios from 'axios'

// 获取网站信息
export const getWebSiteProfile = () => {
  return request.get('/site/profile')
}

// 一言接口
export const getYiYan = () => {
  return axios.get('/yiyan')
}
