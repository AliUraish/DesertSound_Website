import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { RankingSeoPage } from "@/lib/ranking-seo-types"

function renderInline(text: string): React.ReactNode {
  return text.split(/(\*\*.+?\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{renderInline(part.slice(2, -2))}</strong>
    }
    const link = part.match(/^\[(.+?)\]\(([^)]+)\)$/)
    if (link) {
      const href = link[2]
      if (href.startsWith("/") && !href.startsWith("//") && href !== "/") {
        return (
          <Link key={i} href={href} className="underline underline-offset-4 hover:text-black">
            {renderInline(link[1])}
          </Link>
        )
      }
      return <span key={i}>{renderInline(link[1])}</span>
    }
    return part
  })
}

function headingText(block: string) {
  return block.replace(/^#{1,6}\s+/, "").replace(/\*\*/g, "").trim()
}

function renderBody(body: string) {
  const blocks = body.replace(/\u00a0/g, " ").split(/\n\n+/).filter(Boolean)
  return blocks.map((block, i) => {
    if (/^#{1,6}\s+/.test(block)) {
      return (
        <h2 key={i} className="mt-10 text-2xl font-light tracking-tight text-black md:text-3xl">
          {renderInline(headingText(block))}
        </h2>
      )
    }
    if (block.startsWith("- ")) {
      const items = block.split(/\n/).filter((l) => l.startsWith("- "))
      return (
        <ul key={i} className="mt-4 list-disc space-y-2 pl-5 text-base font-light leading-relaxed text-black/70 md:text-lg">
          {items.map((item, j) => (
            <li key={j}>{renderInline(item.replace(/^-\s+/, ""))}</li>
          ))}
        </ul>
      )
    }
    if (/^\d+\.\s/.test(block)) {
      const items = block.split(/\n/).filter((l) => /^\d+\.\s/.test(l))
      return (
        <ol key={i} className="mt-4 list-decimal space-y-3 pl-5 text-base font-light leading-relaxed text-black/70 md:text-lg">
          {items.map((item, j) => (
            <li key={j}>{renderInline(item.replace(/^\d+\.\s+/, ""))}</li>
          ))}
        </ol>
      )
    }
    return (
      <p
        key={i}
        className="mt-4 text-base font-light leading-relaxed text-black/70 md:text-lg"
      >
        {renderInline(block)}
      </p>
    )
  })
}

export function RankingSeoPageView({ page }: { page: RankingSeoPage }) {
  return (
    <div className="w-full overflow-x-clip bg-[#F5F5DC] text-black">
      <Header />
      <main>
        <article className="mx-auto max-w-[92%] px-4 pb-16 pt-[130px] md:pb-20 md:pt-40 lg:max-w-[880px] lg:px-8">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-black/45">
            <Link href="/blogs" className="hover:text-black">
              Blogs
            </Link>
            <span className="px-2 text-black/25">/</span>
            Desert Sound
          </p>
          <h1 className="text-4xl font-light leading-[1.08] tracking-tight text-black md:text-5xl lg:text-6xl">
            {page.h1}
          </h1>

          {page.image ? (
            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-black/5 shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
              <Image
                src={page.image}
                alt={page.h1}
                fill
                sizes="(max-width: 880px) 92vw, 880px"
                className="object-cover object-center"
                priority
              />
            </div>
          ) : null}

          <div className="mt-10 max-w-3xl">{renderBody(page.body)}</div>

          {page.faqs.length > 0 && (
            <div className="mt-16 rounded-2xl bg-white p-6 shadow-lg md:p-10">
              <h2 className="text-2xl font-light tracking-tight md:text-3xl">Frequently asked questions</h2>
              <div className="mt-6 divide-y divide-black/10">
                {page.faqs.map((faq) => (
                  <div key={faq.q} className="py-5 first:pt-0 last:pb-0">
                    <h3 className="text-lg font-light text-black">{faq.q}</h3>
                    <p className="mt-2 text-base font-light leading-relaxed text-black/70">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {page.links.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-2xl font-light tracking-tight md:text-3xl">Continue exploring</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {page.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl border border-black/5 bg-white px-5 py-4 text-base font-light text-black transition-all hover:border-black/10 hover:shadow-md"
                  >
                    {link.label.replace(/\*\*/g, "")}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 rounded-2xl bg-black px-6 py-10 text-[#F5F5DC] md:px-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5DC]/50">Contact</p>
            <p className="mt-3 text-2xl font-light">Ready to plan the room?</p>
            <p className="mt-3 text-lg font-light">+92 21 111 570 111 · info@desertsound.com.pk</p>
            <p className="mt-2 text-sm font-light text-[#F5F5DC]/60">
              22-C/II, 2nd Zamzama Commercial Lane, Phase V, DHA Karachi
            </p>
            <Link
              href="/contact-us"
              className="mt-6 inline-flex rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
            >
              Get in touch
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
