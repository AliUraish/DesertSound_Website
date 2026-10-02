import {
  CaseStudyLink,
  cinemaInstallerArticleHref,
  ProjectCaseStudyPage,
  TheatreInstallLink,
} from "@/components/project-case-study-page"

export default function StanleySeatsPage() {
  return (
    <ProjectCaseStudyPage
      title="Stanley Seats"
      coverImage="/Pictures Final/Projects/Residential/Stanley_Seats/Cover_page.jpg"
      coverImageAlt="Stanley recliners in a Karachi private cinema with backlit wall panels and under-seat lighting"
      galleryImages={[
        "/Pictures Final/Projects/Residential/Stanley_Seats/gallery_1.jpg",
        "/Pictures Final/Projects/Residential/Stanley_Seats/gallery_2.jpg",
        "/Pictures Final/Projects/Residential/Stanley_Seats/gallery_3.jpg",
      ]}
      galleryImageAlts={[
        "Two rows of Stanley cinema recliners with backlit onyx panels and blue under-seat lighting",
        "View from Stanley recliners toward a large cinema screen in a darkened room",
        "Head-on view of Stanley recliner rows in a finished private cinema",
      ]}
      description={[
        "Cinema seating install in a Karachi viewing room — part of a full design-and-install, not a furniture catalog.",
        "Stanley Seats is a residential cinema seating install in Karachi, built around Stanley recliners. It shows how dedicated seating shapes the atmosphere and usability of a private entertainment room — tailored comfort, clean detailing, and a premium presentation.",
        "The configuration balances comfort, circulation, and clear sightlines so the room stays composed and every viewer has a strong position. Console tables and recliner rows are part of the architecture, not an afterthought.",
        "Lighting, wall finishes, and concealed speakers keep the hardware quiet while the Stanley recliners do the visual work. The envelope is a cinema: controlled light, a finished screen wall, and wiring that does not show.",
        "Seating is specified with the room, then picture and sound are calibrated to it. That pairing is the point of a private-cinema seating install.",
      ]}
      sections={[
        {
          heading: "What this room needed",
          paragraphs: [
            "The brief was seating inside a cinema: Stanley recliners arranged so comfort, circulation, and sightlines hold for every viewer. Console tables and recliner rows had to belong to the architecture. Backlit wall panels, under-seat lighting, and a finished screen wall were already the room — the seats had to match that envelope, not fight it.",
          ],
        },
        {
          heading: "How the install shows up",
          paragraphs: [
            "Two recliner rows face a large screen in a darkened room. Concealed speakers and wall finishes keep the hardware quiet while the Stanley recliners do the visual work. Seating is specified with the room; picture and sound are calibrated to those seats. This page is the seating story, not a full-room cinema brief.",
          ],
        },
        {
          heading: "Explore more",
          paragraphs: [
            <>
              Seating like this is specified inside a{" "}
              <TheatreInstallLink>full home theatre design-and-install</TheatreInstallLink>, not sold
              as a catalogue row. For the installer sequence, read{" "}
              <CaseStudyLink href={cinemaInstallerArticleHref}>
                what a cinema installer in Pakistan actually does
              </CaseStudyLink>
              . The flagship room that puts Stanley recliners and a daybed inside a full cinema is{" "}
              <CaseStudyLink href="/projects/residential/studio-vellari">
                Studio Vellari
              </CaseStudyLink>
              .
            </>,
          ],
        },
      ]}
      breadcrumb="Home / Projects / Residential / Stanley Seats"
    />
  )
}
