export type RankingSeoFaq = { q: string; a: string }
export type RankingSeoLink = { label: string; href: string }
export type RankingSeoPage = {
  slug: string
  title: string
  description: string
  h1: string
  body: string
  faqs: RankingSeoFaq[]
  links: RankingSeoLink[]
  image?: string
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  excerpt: string
  image?: string
}
