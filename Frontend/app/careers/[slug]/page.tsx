import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, ArrowRight, BriefcaseBusiness, MapPin } from "lucide-react"
import Link from "next/link"
import { CareersFooter } from "@/components/careers-footer"
import { Header } from "@/components/header"
import { positions } from "@/lib/careers-data"
import { absoluteUrl, createMetadata, siteName } from "@/lib/seo"

type CareerApplyPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return positions.map((position) => ({
    slug: position.slug,
  }))
}

export async function generateMetadata(props: CareerApplyPageProps): Promise<Metadata> {
  const { slug } = await props.params
  const position = positions.find((item) => item.slug === slug)

  if (!position) {
    return {
      title: "Role Not Found",
      robots: { index: false, follow: false },
    }
  }

  return createMetadata({
    path: `/careers/${position.slug}`,
    title: `${position.title} in ${position.location}`,
    description: `${position.description} Apply for this full-time role with ${siteName} in ${position.location}, Pakistan.`,
    image: "/DSC09710.JPG",
  })
}

export default async function CareerApplyPage(props: CareerApplyPageProps) {
  const params = await props.params
  const position = positions.find((item) => item.slug === params.slug)

  if (!position) {
    notFound()
  }

  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: position.title,
    description: position.description,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: siteName,
      sameAs: absoluteUrl("/"),
      logo: absoluteUrl("/0-removebg-preview.png"),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: position.location,
        addressCountry: "PK",
      },
    },
    url: absoluteUrl(`/careers/${position.slug}`),
  }

  return (
    <div className="w-full overflow-x-clip bg-black text-[#F5F5DC]">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <main className="mx-auto grid w-full max-w-[1480px] gap-10 px-5 pb-14 pt-[130px] sm:px-6 md:pt-40 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-20">
        <section>
          <Link
            href="/careers"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#F5F5DC]/55 transition-colors hover:text-[#F5F5DC]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to careers
          </Link>

          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-[#F5F5DC]/45">
            Apply For This Role
          </p>
          <h1 className="text-4xl font-light leading-tight md:text-6xl">
            {position.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-[#F5F5DC]/60">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F5F5DC]/15 px-4 py-2">
              <BriefcaseBusiness className="h-4 w-4" />
              Full-time
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F5F5DC]/15 px-4 py-2">
              <MapPin className="h-4 w-4" />
              {position.location}
            </span>
          </div>
        </section>

        <form className="w-full min-w-0 overflow-hidden border border-[#F5F5DC]/20 bg-[#F5F5DC] p-4 shadow-sm sm:p-5 md:p-8">
          <div className="mb-7 border-b border-black/10 pb-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-black/45">
              Role Summary
            </p>
            <p className="text-base font-light leading-relaxed text-black/70">
              {position.description}
            </p>
          </div>

          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-medium text-black/70">
              Name:
              <input
                type="text"
                name="name"
                required
                className="h-12 w-full min-w-0 border border-black/15 bg-[#F5F5DC] px-4 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/45"
                placeholder="Your full name"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-black/70">
              Email:
              <input
                type="email"
                name="email"
                required
                className="h-12 w-full min-w-0 border border-black/15 bg-[#F5F5DC] px-4 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/45"
                placeholder="you@example.com"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-black/70">
              Resume:
              <input
                type="file"
                name="resume"
                required
                className="min-h-12 w-full min-w-0 max-w-full border border-black/15 bg-[#F5F5DC] px-3 py-3 text-sm text-black file:mb-2 file:mr-0 file:block file:border-0 file:bg-black file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#F5F5DC] focus:border-black/45 sm:px-4 sm:text-base sm:file:mb-0 sm:file:mr-4 sm:file:inline-block sm:file:px-4"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-black/70">
              LinkedIn URL:
              <input
                type="url"
                name="linkedin"
                required
                className="h-12 w-full min-w-0 border border-black/15 bg-[#F5F5DC] px-4 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/45"
                placeholder="https://linkedin.com/in/..."
              />
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 bg-black px-6 text-sm font-medium text-[#F5F5DC] transition-colors hover:bg-black/85"
            >
              Submit Application
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </main>

      <CareersFooter />
    </div>
  )
}
