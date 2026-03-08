import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project5Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 5"
      coverImage="/projects_desert/project_5/Cover.webp"
      coverImageAlt="Project 5 main image"
      galleryImages={[
        "/projects_desert/project_5/img_1.webp",
        "/projects_desert/project_5/img_3.webp",
        "/projects_desert/project_5/img_4.webp",
      ]}
      description={[
        "Project 5 presents a residential environment built around visual calm, layered textures, and seamless media integration. The space aims to balance a relaxed domestic feel with the performance expected from a dedicated entertainment setup.",
        "For now the page uses temporary descriptive copy, but the structure is ready for final narrative content. System details, design notes, and project-specific highlights can be added later without changing the page composition.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 5"
    />
  )
}
