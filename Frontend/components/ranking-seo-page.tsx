import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { RankingSeoPage } from "@/lib/ranking-seo-content"

function renderInline(text: string): React.ReactNode {
  return text.split(/(\*\*.+?\*\*|\[.+?\]\(\/[^)]+\))/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{renderInline(part.slice(2, -2))}</strong>
    }
    const link = part.match(/^\[(.+?)\]\((\/[^)]+)\)$/)
    if (link && !link[2].startsWith("//")) {
      return (
        <Link key={i} href={link[2]} className="underline underline-offset-4 hover:text-black">
          {renderInline(link[1])}
        </Link>
      )
    }
    return part
  })
}

function renderBody(body: string) {
  const blocks = body.split(/\n\n+/).filter(Boolean)
  return blocks.map((block, i) => {
    if (block.startsWith("### ")) {
      return (
        <h2 key={i} className="mt-10 text-2xl font-light tracking-tight text-black md:text-3xl">
          {block.replace(/^###\s+/, "")}
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
        <section className="mx-auto max-w-[92%] px-4 pb-10 pt-[130px] md:pb-12 md:pt-40 lg:max-w-[980px] lg:px-8">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-black/45">
            Desert Sound
          </p>
          <h1 className="text-4xl font-light leading-[1.08] tracking-tight text-black md:text-5xl lg:text-6xl">
            {page.h1}
          </h1>

          {page.image ? (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-black/10 bg-black/5">
              <Image
                src={page.image}
                alt={page.h1}
                fill
                sizes="(max-width: 980px) 92vw, 980px"
                className="object-cover object-center"
                priority
              />
            </div>
          ) : null}

          <div className="mt-8 max-w-3xl">{renderBody(page.body)}</div>

          {(page.faqs ?? []).length > 0 && (
            <div className="mt-14 border-t border-black/10 pt-10">
              <h2 className="text-2xl font-light tracking-tight md:text-3xl">FAQ</h2>
              <div className="mt-6 space-y-6">
                {(page.faqs ?? []).map((faq) => (
                  <div key={faq.q}>
                    <h3 className="text-lg font-medium text-black">{faq.q}</h3>
                    <p className="mt-2 text-base font-light leading-relaxed text-black/70">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(page.links ?? []).length > 0 && (
            <div className="mt-14 border-t border-black/10 pt-10">
              <h2 className="text-2xl font-light tracking-tight md:text-3xl">Related</h2>
              <ul className="mt-5 space-y-3">
                {(page.links ?? []).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base font-light text-black underline underline-offset-4 transition-colors hover:text-black/70"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
