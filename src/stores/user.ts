import type { User } from '@/types'
import type { UserState } from '@/types/store/user'

export const useUser = defineStore('user-info', {
  state: (): UserState => ({
    user: {} as User,
    token: ''
  }),
  actions: {
    setUser(user: User) {
      this.user = user
    },
    setToken(token: string) {
      this.token = token
    },
    clearUser() {
      this.user = {} as User
      this.token = ''
    }
  },
  persist: {
    storage: sessionStorage
  }
})
