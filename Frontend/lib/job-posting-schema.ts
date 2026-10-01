import type { Position } from "@/lib/careers-data"
import { absoluteUrl, sameAsProfiles, siteName } from "@/lib/seo"

const employmentTypeByLabel = {
  "Full-time": "FULL_TIME",
} as const

function experienceMonths(experience: string) {
  const years = experience.match(/(\d+)\+?\s*years?/i)
  return years ? Number(years[1]) * 12 : undefined
}

/** Visible section titles stay lockstep with careers/[slug] copy. */
export function jobPostingDescription(position: Position) {
  return [
    position.description,
    ...position.overview,
    `What you will do: ${position.responsibilities.join(" ")}`,
    `What we are looking for: ${position.qualifications.join(" ")}`,
    `Especially valuable: ${position.preferredQualifications.join(" ")}`,
    `What you can expect: ${position.whatWeOffer.join(" ")}`,
  ].join(" ")
}

export function jobPostingJsonLd(position: Position) {
  const monthsOfExperience = experienceMonths(position.experience)

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: position.title,
    description: jobPostingDescription(position),
    datePosted: position.datePosted,
    // Hidden Google expiry only. The page says the role stays open until it is filled.
    validThrough: position.validThrough,
    employmentType: employmentTypeByLabel[position.employmentType],
    directApply: true,
    industry: "Smart home technology and audiovisual systems",
    identifier: {
      "@type": "PropertyValue",
      name: siteName,
      value: position.slug,
    },
    hiringOrganization: {
      "@type": "Organization",
      name: siteName,
      url: absoluteUrl("/"),
      sameAs: [absoluteUrl("/"), ...sameAsProfiles],
      logo: absoluteUrl("/0-removebg-preview.png"),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "22-C/II, 2nd Zamzama Commercial Lane, Phase V, D.H.A",
        addressLocality: position.location,
        addressRegion: "Sindh",
        postalCode: "75500",
        addressCountry: "PK",
      },
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Pakistan",
    },
    ...(monthsOfExperience
      ? {
          experienceRequirements: {
            "@type": "OccupationalExperienceRequirements",
            monthsOfExperience,
          },
        }
      : {}),
    url: absoluteUrl(`/careers/${position.slug}`),
  }
}
