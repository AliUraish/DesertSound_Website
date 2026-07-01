import type { MetadataRoute } from "next"
import { positions } from "@/lib/careers-data"
import { projectLibraries } from "@/lib/projects-data"
import { absoluteUrl, servicePages } from "@/lib/seo"

const staticRoutes = ["/", "/projects/residential", "/projects/commercial", "/careers"]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const residentialProjectRoutes = projectLibraries.residential.map(
    (project) => `/projects/residential/${project.slug}`,
  )
  const commercialProjectRoutes = projectLibraries.commercial.map(
    (project) => `/projects/commercial/${project.slug}`,
  )
  const careerRoutes = positions.map((position) => `/careers/${position.slug}`)

  return [
    ...staticRoutes,
    ...servicePages.map((page) => page.path),
    ...residentialProjectRoutes,
    ...commercialProjectRoutes,
    ...careerRoutes,
  ].map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/services") ? 0.9 : 0.7,
  }))
}
