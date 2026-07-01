import Link from "next/link"
import { ArrowRight, BriefcaseBusiness, MapPin } from "lucide-react"
import { CareersFooter } from "@/components/careers-footer"
import { Header } from "@/components/header"
import { positions } from "@/lib/careers-data"

export default function CareersPage() {
  return (
    <div className="w-full overflow-x-clip bg-[#F5F5DC] text-black">
      <Header />

      <main>
        <section className="mx-auto max-w-[92%] px-4 pb-14 pt-[130px] md:pb-16 md:pt-40 lg:max-w-[1480px] lg:px-8 lg:pb-20">
          <div className="max-w-5xl">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-black/45">
              Careers
            </p>
            <h1 className="text-4xl font-light leading-[1.04] tracking-tight text-black md:text-6xl lg:text-7xl">
              Help build the next generation of premium home technology.
            </h1>
            <p className="mt-7 max-w-3xl text-base font-light leading-relaxed text-black/65 md:text-lg">
              We are looking for thoughtful, self-driven people who care about craft,
              reliability, and the details that turn complex systems into effortless spaces.
            </p>
          </div>
        </section>

        <section className="border-y border-black/10 bg-black text-[#F5F5DC]">
          <div className="mx-auto grid max-w-[92%] gap-10 px-4 py-12 lg:max-w-[1480px] lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-[#F5F5DC]/50">
                Open Positions
              </p>
              <h2 className="text-3xl font-light leading-tight md:text-4xl">
                Select a role and apply directly.
              </h2>
            </div>

            <div className="grid gap-3">
              {positions.map((position) => (
                  <Link
                    key={position.id}
                    href={`/careers/${position.slug}`}
                    className="group flex w-full flex-col gap-4 border border-[#F5F5DC]/15 px-5 py-5 text-left text-[#F5F5DC] transition-colors hover:bg-[#F5F5DC]/10 md:flex-row md:items-center md:justify-between"
                  >
                    <span>
                      <span className="block text-lg font-light md:text-xl">
                        {position.title}
                      </span>
                      <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#F5F5DC]/55">
                        <span className="inline-flex items-center gap-1.5">
                          <BriefcaseBusiness className="h-4 w-4" />
                          Full-time
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {position.location}
                        </span>
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-medium">
                      Apply
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <CareersFooter />
    </div>
  )
}
