import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project18Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 18"
      coverImage="/project_18/img_1.jpg"
      coverImageAlt="Project 18 main image"
      galleryImages={["/project_18/img_2.jpg", "/project_18/img_3.jpg"]}
      description={[
        "Project 18 is a residential showcase centered on soft ambiance, clean detailing, and a strong focal presentation wall. The overall composition is meant to feel polished and livable while preserving the atmosphere expected from a dedicated cinema space.",
        "This is placeholder copy for the moment, added so the project page is complete and ready to publish. Once the final narrative is prepared, the same layout can carry the full story and system information.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 18"
    />
  )
}
