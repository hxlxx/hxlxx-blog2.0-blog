export * from './components/article-preview'
export * from './views/home'
export * from './views/archives'
export * from './components/login'
export * from './store/site-profile'
export * from './store/user'

export type ResponseData = {
  code: number
  data: any
  message: any
  status: string
}

export type TQueryInfo = {
  page?: number
  skip?: number
  limit?: number
  tag_id?: number
  category_id?: number
}

export type TThemeType =
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'default'
  | undefined
