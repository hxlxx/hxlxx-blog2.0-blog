import { request } from '@/utils'
import type { AxiosRequestConfig } from 'axios'

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
