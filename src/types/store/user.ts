export type User = {
  id: number
  email: string
  username: string
  avatar_url: string
}

export type UserState = {
  user: User
  token: string
}
