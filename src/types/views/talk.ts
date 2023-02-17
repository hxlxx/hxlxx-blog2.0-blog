import type { User } from '../store/user'

export type TTalk = {
  id: number
  uid: number
  content: string
  comment_count: number
  created_at: Date
  user: User
}
