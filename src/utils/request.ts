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

  request(config: AxiosRequestConfig) {
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

  get(url: string, options?: AxiosRequestConfig) {
    return this.request({
      url,
      method: 'GET',
      ...options
    })
  }

  post(url: string, options: AxiosRequestConfig) {
    return this.request({
      url,
      method: 'POST',
      ...options
    })
  }
}

export default new HttpRequest()
