import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project14Page() {
  return (
    <ProjectCaseStudyPage
      title="Understated Luxury Cinema"
      coverImage="/Pictures Final/Projects/Residential/project_14/img_1.jpg"
      coverImageAlt="Understated Luxury Cinema main image"
      galleryImages={["/Pictures Final/Projects/Residential/project_14/img_2.jpg", "/Pictures Final/Projects/Residential/project_14/img_3.jpg"]}
      description={[
        "This residential cinema is shaped around understated luxury, warm material tones, and a strong visual anchor at the screen wall. The room is intended to feel calm and inviting while still delivering a clear sense of cinematic focus.",
        "Discreet technology integration and layered lighting preserve the design intent while supporting a focused, comfortable viewing experience.",
      ]}
      breadcrumb="Home / Projects / Residential / Understated Luxury Cinema"
    />
  )
}
