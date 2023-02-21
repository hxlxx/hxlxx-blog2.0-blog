type TSmallNavState = {
  showSmallNav: boolean
}

export const useSmallNav = defineStore('small-nav', {
  state: (): TSmallNavState => ({
    showSmallNav: false
  })
})
