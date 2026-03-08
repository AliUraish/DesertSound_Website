import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project11Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 11"
      coverImage="/projects_desert/project_11/Cover.jpg"
      coverImageAlt="Project 11 main image"
      galleryImages={["/projects_desert/project_11/img_3.jpg", "/projects_desert/project_11/img_4.jpg"]}
      description={[
        "Project 11 is a residential showcase built to feel intimate, composed, and visually quiet while still delivering a rich entertainment experience. The design direction prioritizes comfort, proportion, and a clean integration of technology into the room.",
        "This placeholder text is only standing in until the final project copy is available. Once approved content arrives, the same page can carry the full design story, system notes, and any installation-specific details.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 11"
    />
  )
}
