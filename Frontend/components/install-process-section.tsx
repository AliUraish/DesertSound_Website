import { homepageInstallProcessSteps } from "@/lib/seo"

export function InstallProcessSection() {
  return (
    <section
      id="install-process"
      aria-labelledby="install-process-heading"
      className="border-t border-foreground/5 bg-background py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 text-center lg:mb-14">
          <span className="mb-6 inline-block rounded-full bg-foreground px-4 py-2 text-xs font-medium tracking-wide text-background uppercase">
            Process
          </span>
          <h2
            id="install-process-heading"
            className="mb-4 text-3xl font-light text-foreground md:text-5xl lg:text-6xl"
          >
            Brief, design, install, handover
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            How Desert Sound installs a home theater in Pakistan — four steps
            from brief and site visit to handover, for rooms in Karachi and
            nationwide.
          </p>
        </div>

        <ol className="grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {homepageInstallProcessSteps.map((step, index) => (
            <li key={step.id} id={step.id} className="min-w-0">
              <span
                aria-hidden="true"
                className="mb-3 block text-sm font-medium tracking-widest text-muted-foreground"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-3 text-xl font-light text-foreground lg:text-2xl">
                {step.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
