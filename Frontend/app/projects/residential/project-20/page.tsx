import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project20Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 20"
      coverImage="/Pictures Final/Projects/Residential/project_20/img_1.jpg"
      coverImageAlt="Project 20 main image"
      galleryImages={["/Pictures Final/Projects/Residential/project_20/img_2.jpg", "/Pictures Final/Projects/Residential/project_20/img_3.jpg", "/Pictures Final/Projects/Residential/project_20/img_4.jpg"]}
      description={[
        "Project 20 is a media-focused residential project with an emphasis on visual calm, integrated technology, and comfortable long-form viewing. The room is intended to feel seamless and polished, with every element supporting a straightforward cinematic experience.",
        "A streamlined control experience brings the room's display, audio, and lighting together, making the system intuitive for films, music, and everyday entertainment.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 20"
    />
  )
}
