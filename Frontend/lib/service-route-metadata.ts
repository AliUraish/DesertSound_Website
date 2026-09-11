import type { Metadata } from "next"
import { getRankingSeoPage } from "@/lib/ranking-seo-content"
import { createMetadata } from "@/lib/seo"

export function serviceRouteMetadata(slug: string): Metadata {
  const page = getRankingSeoPage(slug)

  if (!page) {
    return { title: "Not Found", robots: { index: false, follow: false } }
  }

  return {
    ...createMetadata({
      path: slug,
      title: page.title,
      description: page.description,
      image: page.image || undefined,
    }),
    robots: { index: false, follow: false },
  }
}
