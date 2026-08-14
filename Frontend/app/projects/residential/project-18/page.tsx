import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project18Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 18"
      coverImage="/Pictures Final/Projects/Residential/project_18/img_1.jpg"
      coverImageAlt="Project 18 main image"
      galleryImages={["/Pictures Final/Projects/Residential/project_18/img_2.jpg", "/Pictures Final/Projects/Residential/project_18/img_3.jpg"]}
      description={[
        "Project 18 is a residential showcase centered on soft ambiance, clean detailing, and a strong focal presentation wall. The overall composition is meant to feel polished and livable while preserving the atmosphere expected from a dedicated cinema space.",
        "The audiovisual system is integrated into the architecture to maintain clean sightlines, balanced lighting, and a calm atmosphere throughout the room.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 18"
    />
  )
}
