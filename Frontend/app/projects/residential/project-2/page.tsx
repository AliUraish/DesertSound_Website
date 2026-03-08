import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project2Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 2"
      coverImage="/projects_desert/project_2/Cover.jpg"
      coverImageAlt="Project 2 main image"
      galleryImages={["/projects_desert/project_2/img_1.jpg", "/projects_desert/project_2/img_3.jpg"]}
      description={[
        "Project 2 is a residential showcase centered on comfort, clean visual framing, and a refined entertainment atmosphere. The layout is intended to feel warm and understated while still supporting a strong, immersive viewing experience.",
        "This placeholder copy is only holding the structure for now. Final project details, technical highlights, and the approved story can be dropped into the same layout once the content is ready.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 2"
    />
  )
}
