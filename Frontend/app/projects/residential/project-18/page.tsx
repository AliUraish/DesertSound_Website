import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project18Page() {
  return (
    <ProjectCaseStudyPage
      title="Soft-Ambience Cinema Showcase"
      coverImage="/Pictures Final/Projects/Residential/project_18/img_1.jpg"
      coverImageAlt="Soft-Ambience Cinema Showcase main image"
      galleryImages={["/Pictures Final/Projects/Residential/project_18/img_2.jpg", "/Pictures Final/Projects/Residential/project_18/img_3.jpg"]}
      description={[
        "Soft-Ambience Cinema Showcase is a residential showcase centered on soft ambiance, clean detailing, and a strong focal presentation wall. The overall composition is meant to feel polished and livable while preserving the atmosphere expected from a dedicated cinema space.",
        "The audiovisual system is integrated into the architecture to maintain clean sightlines, balanced lighting, and a calm atmosphere throughout the room.",
      ]}
      breadcrumb="Home / Projects / Residential / Soft-Ambience Cinema Showcase"
    />
  )
}
