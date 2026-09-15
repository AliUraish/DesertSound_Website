import { homepageInstallFaqs } from "@/lib/seo"

export function HomepageInstallFaq() {
  return (
    <section className="bg-[#F5F5DC] py-16 lg:py-24" aria-labelledby="homepage-install-faq-heading">
      <div className="mx-auto max-w-[88%] px-4 lg:max-w-4xl lg:px-8">
        <h2
          id="homepage-install-faq-heading"
          className="mb-4 text-center text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl"
        >
          Home theater &amp; home cinema installation
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg font-light leading-relaxed text-black/70">
          Answer-first notes on professional installation across Pakistan, with Karachi as our local market.
        </p>

        <div className="rounded-2xl bg-white p-6 shadow-lg md:p-10">
          <div className="divide-y divide-black/10">
            {homepageInstallFaqs.map((faq) => (
              <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
                <h3 className="text-lg font-light text-black lg:text-xl">{faq.question}</h3>
                <p className="mt-2 text-base font-light leading-relaxed text-black/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
