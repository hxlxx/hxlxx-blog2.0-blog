import hMessage from '@/components/h-message'
import hMessageBox from '@/components/h-message-box'
import { useUser } from '@/stores'
import type { ResponseData } from '@/types'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'

class HttpRequest {
  baseURL: string
  timeout: number
  queue: {
    [index: string]: boolean
  }

  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_URL
    this.timeout = 3000
    this.queue = {}
  }

  setInterceptors(instance: AxiosInstance, url: string) {
    instance.interceptors.request.use((config) => {
      if (url.indexOf('login') === -1) {
        const userStore = useUser()
        config.headers!['Authorization'] = userStore.token
      }

      if (!Object.keys(this.queue).length) {
        // 此处开启 loading
      }
      this.queue[url] = true
      // 设置取消请求(将 controller 保存到全局，一旦调用就可以取消请求)
      const controller = new AbortController()
      config.signal = controller.signal
      return config
    })

    instance.interceptors.response.use(
      (res) => {
        // 一旦成功就从队列中删除该请求的标记
        delete this.queue[url]
        if (Object.keys(this.queue).length) {
          // 此处关闭 loading
        }
        return res.data
      },
      (error) => {
        // 一旦成功就从队列中删除该请求的标记
        delete this.queue[url]
        if (Object.keys(this.queue).length) {
          // 此处关闭 loading
        }
        return Promise.reject(error.response)
      }
    )
  }

  request(config: AxiosRequestConfig): Promise<ResponseData> {
    const instance = axios.create()
    config = {
      baseURL: this.baseURL,
      timeout: this.timeout,
      withCredentials: true,
      ...config
    }
    this.setInterceptors(instance, config.url as string)
    return instance(config)
  }

  baseRequest(
    url: string,
    method: string,
    options?: AxiosRequestConfig
  ): Promise<ResponseData> {
    return this.request({
      url,
      method,
      ...options
    })
      .then((res) => {
        return Promise.resolve(res)
      })
      .catch((error) => {
        const userStore = useUser()
        if (error.data.code === 401) {
          hMessageBox({
            title: '提示',
            content: '身份已过期，请重新登陆',
            callback() {
              userStore.clearUser()
            }
          })
        } else if (error.data.code === 418) {
          hMessage({
            type: 'danger',
            message: '该用户已被禁用'
          })
        } else {
          hMessage({
            type: 'danger',
            message: error?.data?.message || error
          })
        }
      }) as unknown as Promise<ResponseData>
  }

  get(url: string, options?: AxiosRequestConfig) {
    return this.baseRequest(url, 'GET', options)
  }

  post(url: string, options: AxiosRequestConfig) {
    return this.baseRequest(url, 'POST', options)
  }

  patch(url: string, options: AxiosRequestConfig) {
    return this.baseRequest(url, 'PATCH', options)
  }
}

export default new HttpRequest()
