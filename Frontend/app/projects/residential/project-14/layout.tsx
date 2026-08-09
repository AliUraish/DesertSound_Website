import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createProjectMetadata } from "@/lib/seo"

export const metadata: Metadata = createProjectMetadata("residential", "project-14")

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return children
}
