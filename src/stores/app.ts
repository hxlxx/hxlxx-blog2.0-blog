type TAppState = {
  showSmallNav: boolean
  showSearch: boolean
}

export const useApp = defineStore('small-nav', {
  state: (): TAppState => ({
    showSmallNav: false,
    showSearch: false
  })
})
