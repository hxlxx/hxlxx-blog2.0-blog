export const useYiYan = defineStore('yiyan', {
  state: () => ({
    yiyan: {} as any
  }),
  actions: {
    setYiyan(yiyan: any) {
      this.yiyan = yiyan
    }
  }
})
