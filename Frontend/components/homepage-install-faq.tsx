import { homepageInstallFaqs } from "@/lib/seo"

export function HomepageInstallFaq() {
  return (
    <section
      className="bg-black pb-4 pt-14 lg:pb-6 lg:pt-16"
      aria-labelledby="homepage-install-faq-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <span className="mb-6 inline-block rounded-full bg-[#F5F5DC] px-4 py-2 text-xs font-medium uppercase tracking-wide text-black">
          FAQ
        </span>
        <h2
          id="homepage-install-faq-heading"
          className="mb-10 max-w-3xl text-4xl font-light leading-tight text-[#F5F5DC] md:text-5xl"
        >
          Home theater &amp; home cinema installation
        </h2>
        <div className="max-w-3xl divide-y divide-[#F5F5DC]/10">
          {homepageInstallFaqs.map((faq) => (
            <div key={faq.question} className="py-6 first:pt-0 last:pb-0">
              <h3 className="text-lg font-light text-[#F5F5DC] md:text-xl">{faq.question}</h3>
              <p className="mt-2 text-base font-light leading-relaxed text-[#F5F5DC]/60">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
