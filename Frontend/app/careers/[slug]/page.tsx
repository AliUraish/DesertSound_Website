import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  Check,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import { CareersFooter } from "@/components/careers-footer"
import { Header } from "@/components/header"
import { CareerApplicationForm } from "@/components/career-application-form"
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
    description: [position.description, ...position.overview].join(" "),
    datePosted: "2026-09-04",
    employmentType: "FULL_TIME",
    directApply: true,
    industry: "Smart home technology and audiovisual systems",
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

  const jobSections = [
    { title: "What you will do", items: position.responsibilities },
    { title: "What we are looking for", items: position.qualifications },
    { title: "Especially valuable", items: position.preferredQualifications },
    { title: "What you can expect", items: position.whatWeOffer },
  ]

  return (
    <div className="w-full overflow-x-clip bg-black text-[#F5F5DC]">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <main>
        <section className="mx-auto grid w-full max-w-[1480px] gap-12 px-5 pb-16 pt-[130px] sm:px-6 md:pt-40 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-20">
          <div>
            <Link
              href="/careers"
              className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#F5F5DC]/55 transition-colors hover:text-[#F5F5DC]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to careers
            </Link>

            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-[#F5F5DC]/45">
              {position.department} · Join Desert Sound
            </p>
            <h1 className="max-w-4xl text-4xl font-light leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              {position.title}
            </h1>
            <p className="mt-7 max-w-3xl text-base font-light leading-relaxed text-[#F5F5DC]/65 md:text-lg">
              {position.description}
            </p>
          </div>

          <aside className="self-end border border-[#F5F5DC]/15 p-5 sm:p-6">
            <dl className="grid gap-5 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <dt className="mb-2 flex items-center gap-2 text-[#F5F5DC]/40">
                  <BriefcaseBusiness className="h-4 w-4" /> Employment
                </dt>
                <dd>{position.employmentType}</dd>
              </div>
              <div>
                <dt className="mb-2 flex items-center gap-2 text-[#F5F5DC]/40">
                  <MapPin className="h-4 w-4" /> Location
                </dt>
                <dd>{position.location}, Pakistan</dd>
              </div>
              <div>
                <dt className="mb-2 flex items-center gap-2 text-[#F5F5DC]/40">
                  <Building2 className="h-4 w-4" /> Department
                </dt>
                <dd>{position.department}</dd>
              </div>
              <div>
                <dt className="mb-2 text-[#F5F5DC]/40">Experience</dt>
                <dd>{position.experience}</dd>
              </div>
            </dl>

          </aside>
        </section>

        <section className="bg-[#F5F5DC] text-black">
          <div className="mx-auto grid w-full max-w-[1480px] gap-12 px-5 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <article className="min-w-0">
              <div className="border-b border-black/10 pb-10">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-black/40">
                  The opportunity
                </p>
                <h2 className="text-3xl font-light tracking-tight md:text-4xl">
                  Build the software behind exceptional experiences.
                </h2>
                <div className="mt-6 grid gap-4 text-base font-light leading-relaxed text-black/65">
                  {position.overview.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {jobSections.map((section) => (
                <section key={section.title} className="border-b border-black/10 py-10 last:border-b-0">
                  <h2 className="text-2xl font-light tracking-tight md:text-3xl">
                    {section.title}
                  </h2>
                  <ul className="mt-6 grid gap-4">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-black/65 md:text-base">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-black" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              <p className="mt-4 text-sm leading-relaxed text-black/50">
                Desert Sound welcomes applicants based on their ability, experience, and potential.
                If your background does not match every preferred qualification, we still encourage
                you to show us what you have built and how you think.
              </p>
            </article>

            <aside id="apply" className="min-w-0 self-start lg:sticky lg:top-24">
              <CareerApplicationForm description={position.description} jobSlug={position.slug} />
            </aside>
          </div>
        </section>
      </main>

      <CareersFooter />
    </div>
  )
}
