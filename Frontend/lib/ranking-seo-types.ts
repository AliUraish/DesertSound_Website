export type RankingSeoFaq = { q: string; a: string }
export type RankingSeoLink = { label: string; href: string }
export type RankingSeoPage = {
  slug: string
  title: string
  description: string
  h1: string
  body: string
  faqs: RankingSeoFaq[]
  /**
   * /service/ pages omit FAQPage JSON-LD unless this is true.
   * Set only when the same `faqs` array is rendered visibly via FaqCollapsePanel.
   */
  emitFaqPageJsonLd?: boolean
  links: RankingSeoLink[]
  image?: string
  imageAlt?: string
  date?: string
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  excerpt: string
  image?: string
  date?: string
}
