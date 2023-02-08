export type TWebsiteProfileState = {
  profile: TWebsiteProfile
}

export type TWebsiteConfig = {
  author?: string
  author_avatar?: string
  author_email?: string
  author_motto?: string
  beianNumber?: string
  github?: string
  csdn?: string
  gitee?: string
  juejin?: string
  logo?: string
  notice?: string
  webSite_created_at?: Date
}

export type TWebsiteProfile = {
  articleCount: number
  categoryCount: number
  tagCount: number
  talkCount: number
  viewCount: number
  websiteConfig: TWebsiteConfig
}
