import type { TWebsiteProfile, TWebsiteProfileState } from '@/types'

export const useSiteProfile = defineStore('site-profile', {
  state: (): TWebsiteProfileState => ({
    profile: {} as TWebsiteProfile
  }),
  actions: {
    setSiteProfile(profile: TWebsiteProfile) {
      this.profile = profile
    }
  }
})
