import type { TResult } from '@/types'

type TSearchState = {
  results: TResult[]
}

export const useSearch = defineStore('search', {
  state: (): TSearchState => ({
    results: []
  }),
  actions: {
    removeHistory(id: number) {
      this.results = this.results.filter((item) => item.id !== id)
    }
  },
  persist: {
    storage: localStorage
  }
})
