export type TCategory = {
  id: number
  category_name: string
}

export type TTag = {
  id: number
  tag_name: string
}

export type TArticle = {
  id: number
  title: string
  description: string
  content: string
  category: TCategory
  tags: TTag[]
}
