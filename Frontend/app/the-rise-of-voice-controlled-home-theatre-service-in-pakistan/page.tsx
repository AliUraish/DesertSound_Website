import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RankingSeoPageView } from "@/components/ranking-seo-page"
import { getRankingSeoPage } from "@/lib/ranking-seo-content"
import { createMetadata } from "@/lib/seo"

const slug = "/the-rise-of-voice-controlled-home-theatre-service-in-pakistan"

const page = getRankingSeoPage(slug)

export const metadata: Metadata = page
  ? {
      ...createMetadata({
        path: slug,
        title: page.title,
        description: page.description,
        image: page.image || undefined,
      }),
      robots: { index: false, follow: false },
    }
  : { title: "Not Found", robots: { index: false, follow: false } }

export default function RankingSeoRoutePage() {
  if (!page) notFound()
  return <RankingSeoPageView page={page} />
}
