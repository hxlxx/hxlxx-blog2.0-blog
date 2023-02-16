import type { User } from '../store/user'

/** 1: 留言 2: 文章评论 3: 说说评论 4: 友链评论 */
export type TCommentType = 1 | 2 | 3 | 4

export type TComment = {
  id: number
  uid: number
  aid?: number
  reply: TComment[]
  reply_to: string
  content: string
  created_at: Date
  type: TCommentType
  user: User
}
