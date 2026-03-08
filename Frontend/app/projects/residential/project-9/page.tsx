import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project9Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 9"
      coverImage="/projects_desert/project_9/Cover.jpg"
      coverImageAlt="Project 9 main image"
      galleryImages={[
        "/projects_desert/project_9/img_2.jpg",
        "/projects_desert/project_9/img_3.jpg",
        "/projects_desert/project_9/img_4.jpg",
      ]}
      description={[
        "Project 9 highlights a residential space designed for a measured, immersive experience with minimal visual clutter. The project focuses on balancing soft ambiance, practical comfort, and strong presentation quality in a single setting.",
        "The current body copy is intentionally generic and can be replaced with the final approved project narrative later. The page layout is already set up to support photography, story text, and any future system details.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 9"
    />
  )
}
