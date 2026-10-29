/** FAQPage JSON-LD: blogs emit when they have FAQs; /service/ pages need an explicit opt-in. */
export function shouldEmitFaqPageJsonLd(page: {
  slug: string
  faqs: { length: number }
  emitFaqPageJsonLd?: boolean
}) {
  if (page.faqs.length === 0) return false
  if (page.slug.startsWith("/service/")) return page.emitFaqPageJsonLd === true
  return true
}
