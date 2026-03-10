import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project19Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 19"
      coverImage="/project_19/img_1.jpg"
      coverImageAlt="Project 19 main image"
      galleryImages={["/project_19/img_2.jpg", "/project_19/img_3.jpg", "/project_19/img_4.jpg"]}
      description={[
        "Project 19 presents a residential entertainment room built around rich finishes, relaxed seating, and a dramatic cinematic mood. The design intent is to keep the space comfortable for everyday use while giving movie nights a stronger sense of occasion.",
        "The wording here is temporary and can be replaced as soon as final copy is approved. The page already supports the photography flow and can easily accommodate deeper technical or design-focused content later.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 19"
    />
  )
}
