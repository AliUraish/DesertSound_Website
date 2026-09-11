import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RankingSeoPageView } from "@/components/ranking-seo-page"
import { getBlogPosts, getRankingSeoPage, isBlogArticle } from "@/lib/ranking-seo-content"
import { createMetadata } from "@/lib/seo"

type ArticlePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({
    slug: post.slug.replace(/^\//, ""),
  }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getRankingSeoPage(`/${slug}`)

  if (!page || !isBlogArticle(page.slug)) {
    return { title: "Not Found", robots: { index: false, follow: false } }
  }

  return {
    ...createMetadata({
      path: page.slug,
      title: page.title,
      description: page.description,
      image: page.image || undefined,
    }),
    robots: { index: false, follow: false },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const page = getRankingSeoPage(`/${slug}`)
  if (!page || !isBlogArticle(page.slug)) notFound()
  return <RankingSeoPageView page={page} />
}
