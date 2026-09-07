import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { rankingSeoPages } from "@/lib/ranking-seo-content"

export function BlogListingPage() {
  const blogPosts = rankingSeoPages.filter(page => {
    if (page.slug === '/blogs') return false
    if (page.slug.startsWith('/service/')) return false
    if (page.slug === '/projects') return false
    if (page.slug === '/about-us') return false
    if (page.slug === '/contact-us') return false
    if (page.slug === '/privacy-policy') return false
    if (page.slug === '/terms-and-condition') return false
    return true
  })

  return (
    <div className="w-full overflow-x-clip bg-[#F5F5DC] text-black">
      <Header />
      <main>
        <section className="mx-auto max-w-[92%] px-4 pb-10 pt-[130px] md:pb-12 md:pt-40 lg:max-w-[980px] lg:px-8">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-black/45">
            Desert Sound
          </p>
          <h1 className="text-4xl font-light leading-[1.08] tracking-tight text-black md:text-5xl lg:text-6xl">
            Insights, Tips, and the Latest Trends
          </h1>
          <p className="mt-6 text-base font-light leading-relaxed text-black/70 md:text-lg">
            Guides on home theatre design, acoustics, smart automation, and voice control in Pakistan.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={post.slug}
                className="group block overflow-hidden rounded-2xl border border-black/10 bg-white transition-all hover:border-black/20 hover:shadow-lg"
              >
                {post.image && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/5">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 320px"
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-lg font-light leading-tight text-black transition-colors group-hover:text-black/70">
                    {post.title.replace(' - Desert Sound', '')}
                  </h2>
                  {post.description && (
                    <p className="mt-2 line-clamp-2 text-sm font-light leading-relaxed text-black/60">
                      {post.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-black/10 bg-black px-6 py-8 text-[#F5F5DC] md:px-8">
            <p className="text-sm uppercase tracking-[0.2em] text-[#F5F5DC]/50">Contact</p>
            <p className="mt-3 text-xl font-light">+92 21 111 570 111 · info@desertsound.com.pk</p>
            <p className="mt-2 text-sm font-light text-[#F5F5DC]/60">
              22-C/II, 2nd Zamzama Commercial Lane, Phase V, DHA Karachi
            </p>
            <Link
              href="/contact-us"
              className="mt-6 inline-flex text-sm uppercase tracking-[0.18em] text-[#F5F5DC] underline underline-offset-4"
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
