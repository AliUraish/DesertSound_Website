import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project14Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 14"
      coverImage="/Pictures%20Final/Projects/Residential/project_14/img_1.jpg"
      coverImageAlt="Project 14 main image"
      galleryImages={["/Pictures%20Final/Projects/Residential/project_14/img_2.jpg", "/Pictures%20Final/Projects/Residential/project_14/img_3.jpg"]}
      description={[
        "Project 14 is a residential cinema presentation shaped around understated luxury, warm material tones, and a strong visual anchor at the screen wall. The room is intended to feel calm and inviting while still delivering a clear sense of cinematic focus.",
        "The copy is placeholder content for now, but the page structure is ready for final project details. Once approved text is available, this layout can carry the full design story, system highlights, and installation notes without further structural changes.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 14"
    />
  )
}
