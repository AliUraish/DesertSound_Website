import type { MetadataRoute } from "next"
import { positions } from "@/lib/careers-data"
import { projectLibraries } from "@/lib/projects-data"
import { rankingSeoPages } from "@/lib/ranking-seo-content"
import { absoluteUrl } from "@/lib/seo"

const staticRoutes = ["/", "/projects", "/projects/residential", "/projects/commercial", "/careers"]

export default function sitemap(): MetadataRoute.Sitemap {
  const residentialProjectRoutes = projectLibraries.residential.map(
    (project) => `/projects/residential/${project.slug}`,
  )
  const commercialProjectRoutes = projectLibraries.commercial.map(
    (project) => `/projects/commercial/${project.slug}`,
  )
  const careerRoutes = positions.map((position) => `/careers/${position.slug}`)
  const rankingRoutes = rankingSeoPages.map((page) => page.slug)

  const routes = Array.from(
    new Set([
      ...staticRoutes,
      ...residentialProjectRoutes,
      ...commercialProjectRoutes,
      ...careerRoutes,
      ...rankingRoutes,
    ]),
  )

  return routes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/service/") ? 0.9 : 0.7,
  }))
}
