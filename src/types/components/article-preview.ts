import type { User } from '@/types/store/user'

export type TCategory = {
  id: number
  category_name: string
}

export type TTag = {
  id: number
  tag_name: string
}

export type TArticle = {
  id: number
  title: string
  description: string
  cover_url: string
  content: string
  created_at: Date
  category: TCategory
  tags: TTag[]
  author: User
  preArticle: TArticle
  nextArticle: TArticle
  top: boolean
  recommend: boolean
}
