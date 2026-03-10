import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function StanleySeatsPage() {
  return (
    <ProjectCaseStudyPage
      title="Stanley Seats"
      coverImage="/Stanley_Seats/Cover_page.png"
      coverImageAlt="Stanley Seats cover image"
      galleryImages={[
        "/Stanley_Seats/gallery_1.png",
        "/Stanley_Seats/gallery_2.png",
        "/Stanley_Seats/gallery_3.png",
      ]}
      description={[
        "Stanley Seats is a residential cinema seating showcase centered on tailored comfort, clean detailing, and a premium visual presentation. The project is intended to highlight how dedicated recliner systems can shape the atmosphere and usability of a private entertainment room.",
        "The copy is placeholder text for now, but the page is ready for final product and project details. Once approved content is available, the same structure can carry the full story around configuration, materials, and installation highlights.",
      ]}
      breadcrumb="Home / Projects / Residential / Stanley Seats"
    />
  )
}
