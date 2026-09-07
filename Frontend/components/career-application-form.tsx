"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"

type CareerApplicationFormProps = {
  description: string
  jobSlug: string
}

export function CareerApplicationForm({ description, jobSlug }: CareerApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.set("jobSlug", jobSlug)

    try {
      const response = await fetch("/api/job-applications", {
        method: "POST",
        body: formData,
      })
      const result = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(result.error ?? "Your application could not be submitted.")
      }

      form.reset()
      setStatus({ type: "success", message: "Application submitted successfully. Thank you!" })
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Your application could not be submitted.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-w-0 overflow-hidden border border-[#F5F5DC]/20 bg-[#F5F5DC] p-4 shadow-sm sm:p-5 md:p-8"
    >
      <div className="mb-7 border-b border-black/10 pb-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-black/45">
          Apply for this role
        </p>
        <h2 className="mb-4 text-2xl font-light tracking-tight text-black">Tell us about your work.</h2>
        <p className="text-base font-light leading-relaxed text-black/70">{description}</p>
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5">
        <label className="grid gap-2 text-sm font-medium text-black/70">
          Full name
          <input
            type="text"
            name="name"
            required
            maxLength={150}
            autoComplete="name"
            className="h-12 w-full min-w-0 border border-black/15 bg-[#F5F5DC] px-4 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/45"
            placeholder="Your full name"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-black/70">
          Email address
          <input
            type="email"
            name="email"
            required
            maxLength={254}
            autoComplete="email"
            className="h-12 w-full min-w-0 border border-black/15 bg-[#F5F5DC] px-4 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/45"
            placeholder="you@example.com"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-black/70">
          Resume
          <input
            type="file"
            name="resume"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="min-h-12 w-full min-w-0 max-w-full border border-black/15 bg-[#F5F5DC] px-3 py-3 text-sm text-black file:mb-2 file:mr-0 file:block file:border-0 file:bg-black file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#F5F5DC] focus:border-black/45 sm:px-4 sm:text-base sm:file:mb-0 sm:file:mr-4 sm:file:inline-block sm:file:px-4"
          />
          <span className="text-xs font-normal text-black/45">PDF, DOC, or DOCX. Maximum 5 MB.</span>
        </label>

        <label className="grid gap-2 text-sm font-medium text-black/70">
          LinkedIn profile
          <input
            type="url"
            name="linkedin"
            required
            maxLength={500}
            className="h-12 w-full min-w-0 border border-black/15 bg-[#F5F5DC] px-4 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/45"
            placeholder="https://linkedin.com/in/..."
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-black/70">
          GitHub profile
          <input
            type="url"
            name="github"
            required
            maxLength={500}
            className="h-12 w-full min-w-0 border border-black/15 bg-[#F5F5DC] px-4 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/45"
            placeholder="https://github.com/your-username"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-black/70">
          Previous work
          <input
            type="url"
            name="previousWork"
            required
            maxLength={500}
            className="h-12 w-full min-w-0 border border-black/15 bg-[#F5F5DC] px-4 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/45"
            placeholder="Portfolio, live product, or case study URL"
          />
          <span className="text-xs font-normal text-black/45">
            Share the strongest example of software you have built or helped lead.
          </span>
        </label>

        <label className="grid gap-2 text-sm font-medium text-black/70">
          Professional software engineering experience
          <select
            name="experience"
            required
            defaultValue=""
            className="h-12 w-full min-w-0 border border-black/15 bg-[#F5F5DC] px-4 text-base text-black outline-none transition-colors focus:border-black/45"
          >
            <option value="" disabled>Select your experience</option>
            <option value="3-4 years">3–4 years</option>
            <option value="5-7 years">5–7 years</option>
            <option value="8-10 years">8–10 years</option>
            <option value="10+ years">10+ years</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-black/70">
          What is the most meaningful software project you have owned?
          <textarea
            name="projectImpact"
            required
            minLength={80}
            maxLength={2000}
            rows={6}
            className="w-full min-w-0 resize-y border border-black/15 bg-[#F5F5DC] px-4 py-3 text-base leading-relaxed text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/45"
            placeholder="Describe the problem, your decisions, your contribution, and the outcome."
          />
          <span className="text-xs font-normal text-black/45">80–2,000 characters.</span>
        </label>

        <label className="grid gap-2 text-sm font-medium text-black/70">
          Why does this role at Desert Sound interest you?
          <textarea
            name="motivation"
            required
            minLength={50}
            maxLength={1500}
            rows={5}
            className="w-full min-w-0 resize-y border border-black/15 bg-[#F5F5DC] px-4 py-3 text-base leading-relaxed text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/45"
            placeholder="Tell us what connects your experience and ambitions to this opportunity."
          />
          <span className="text-xs font-normal text-black/45">50–1,500 characters.</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 inline-flex h-12 items-center justify-center gap-2 bg-black px-6 text-sm font-medium text-[#F5F5DC] transition-colors hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-55"
        >
          {isSubmitting ? "Submitting…" : "Submit Application"}
          {!isSubmitting && <ArrowRight className="h-4 w-4" />}
        </button>

        {status && (
          <p
            role="status"
            className={`text-sm font-medium ${status.type === "success" ? "text-green-700" : "text-red-700"}`}
          >
            {status.message}
          </p>
        )}
      </div>
    </form>
  )
}
