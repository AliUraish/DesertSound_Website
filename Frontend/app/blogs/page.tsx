import type { Metadata } from "next"
import { BlogsPage } from "@/components/site-pages/blogs-page"
import { getBlogPosts } from "@/lib/ranking-seo-content"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

export const metadata: Metadata = serviceRouteMetadata("/blogs")

export default function BlogsRoute() {
  return <BlogsPage posts={getBlogPosts()} />
}
