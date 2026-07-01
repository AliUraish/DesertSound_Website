import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  path: "/projects/residential",
  title: "Residential Home Theatre Projects",
  description:
    "Explore Desert Sound residential cinema, media room, smart home, and premium AV projects completed for private homes in Pakistan.",
  image: "/Pictures%20Final/Projects/Residential/New_Theatre/Cover.JPG",
})

export default function ResidentialProjectsLayout({ children }: { children: ReactNode }) {
  return children
}
