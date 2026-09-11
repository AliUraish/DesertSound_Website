"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { getBlogPosts } from "@/lib/ranking-seo-content"

type BlogPost = ReturnType<typeof getBlogPosts>[number]

export function BlogsPage({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="w-full overflow-x-clip bg-[#F5F5DC]">
      <Header />
      <main>
        <section className="bg-[#F5F5DC] pt-[130px] pb-12 md:pt-36 lg:pt-40 lg:pb-16">
          <div className="mx-auto max-w-[88%] px-4 lg:max-w-7xl lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-black/45">Blogs</p>
              <h1 className="mb-5 text-4xl font-light leading-[1.08] tracking-tight text-black md:text-6xl">
                Insights, tips, and the latest trends
              </h1>
              <p className="text-lg font-light leading-relaxed text-black/65">
                Guides on home theatre design, acoustics, smart automation, and voice control in Pakistan.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white pb-20 pt-4 lg:pb-28">
          <div className="mx-auto max-w-[88%] px-4 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                >
                  <Link
                    href={post.slug}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-[#F5F5DC] transition-all duration-300 hover:border-black/10 hover:shadow-xl"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image || "/luxury-home-theater-with-leather-recliners-and-amb.jpg"}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 92vw, (max-width: 1280px) 44vw, 30vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 lg:p-8">
                      <h2 className="mb-3 text-xl font-light leading-snug tracking-tight text-black lg:text-2xl">
                        {post.title}
                      </h2>
                      <p className="mb-6 line-clamp-3 flex-1 text-sm font-light leading-relaxed text-black/65 lg:text-base">
                        {post.excerpt || post.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-black">
                        Read article
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1a1a1a] py-16 lg:py-20">
          <div className="mx-auto max-w-[88%] px-4 text-center lg:max-w-3xl lg:px-8">
            <h2 className="mb-5 text-3xl font-light text-white md:text-4xl">Planning a room, not just reading about one?</h2>
            <p className="mb-8 text-base font-light text-white/65">
              Talk to the team that designs and installs these systems in Pakistani homes.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-medium text-black transition-colors hover:bg-white/90"
            >
              Get in touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
