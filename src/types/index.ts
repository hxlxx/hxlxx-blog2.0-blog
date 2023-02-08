export * from './components/article-preview'
export * from './components/home-main'
export * from './store/site-profile'

export type TQueryInfo = {
  page?: number
  skip?: number
  limit?: number
  tag_id?: number
  category_id?: number
}
