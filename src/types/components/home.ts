import type { User } from '../store/user'

export type TCategoryAndCount = {
  id: number
  category_name: string
  count: number
}

export type TTagAndCount = {
  id: number
  tag_name: string
  count: number
}

export type TCommentItem = {
  id: number
  content: string
  createTime: Date
  user: User
}
