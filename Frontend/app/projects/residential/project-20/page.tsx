import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project20Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 20"
      coverImage="/project_20/img_1.jpg"
      coverImageAlt="Project 20 main image"
      galleryImages={["/project_20/img_2.jpg", "/project_20/img_3.jpg", "/project_20/img_4.jpg"]}
      description={[
        "Project 20 is a media-focused residential project with an emphasis on visual calm, integrated technology, and comfortable long-form viewing. The room is intended to feel seamless and polished, with every element supporting a straightforward cinematic experience.",
        "This placeholder copy is in place so the project can sit cleanly alongside the rest of the library. Final storytelling, specifications, and project notes can be added later without reworking the page.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 20"
    />
  )
}
