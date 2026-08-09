import type { MetadataRoute } from "next"
import { defaultSeo, siteName } from "@/lib/seo"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} | ${defaultSeo.title}`,
    short_name: siteName,
    description: defaultSeo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F5F5DC",
    theme_color: "#111111",
  }
}
