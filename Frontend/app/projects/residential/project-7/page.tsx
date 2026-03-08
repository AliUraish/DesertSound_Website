import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project7Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 7"
      coverImage="/projects_desert/project_7/Cover.jpg"
      coverImageAlt="Project 7 main image"
      galleryImages={[
        "/projects_desert/project_7/img_1.jpg",
        "/projects_desert/project_7/img_2.jpg",
        "/projects_desert/project_7/img_4.jpg",
      ]}
      description={[
        "Project 7 is a residential installation shaped around atmosphere, clarity, and a sense of focused comfort. The interior treatment and technology placement are intended to work together so the room feels polished without becoming visually heavy.",
        "This is placeholder text for the moment, included to keep the page ready for presentation. The final project story can replace it once the approved language and technical notes are available.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 7"
    />
  )
}
