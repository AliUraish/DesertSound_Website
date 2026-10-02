import {
  CaseStudyLink,
  cinemaInstallerArticleHref,
  ProjectCaseStudyPage,
  TheatreInstallLink,
} from "@/components/project-case-study-page"

export default function StudioVellariPage() {
  return (
    <ProjectCaseStudyPage
      title="Studio Vellari"
      coverImage="/vellari1.jpg"
      coverImageAlt="Studio Vellari flagship cinema in Karachi with Stanley seating facing the screen"
      coverWidth={1920}
      coverHeight={634}
      galleryImages={["/vellari2.jpg", "/vellari3.jpg", "/vellari4.jpg", "/vellari5.jpg"]}
      galleryImageAlts={[
        "Entry lounge to the Studio Vellari cinema with a lit marble niche and steps into the theatre",
        "Studio Vellari Stanley recliners with carbon-fibre panelling and under-seat lighting",
        "Stanley daybed and recliner rows in the Studio Vellari flagship cinema",
        "Studio Vellari screen wall with a star ceiling and flanking speakers",
      ]}
      description={[
        "Karachi home theater / home cinema installation — finished residential room.",
        "Studio Vellari is a flagship Desert Sound cinema in Karachi. Studio Vellari Stanley recliners and a Stanley daybed take the centre of the room — the seating is specified with the install, not added after.",
        "The Stanley collection offers a single-seat recliner or an expansive daybed, with customisable console widths and distinctive 3D carbon fibre panelling. Consoles and armrests can take quilted stitch patterns; upholstery options include Alcantara, Nappa leather, nubuck, and velvet.",
        "Around the seats, the room is a dedicated cinema: a finished envelope, concealed wiring, acoustic surfaces, and a screen wall that keeps attention forward. Lighting and circulation are planned so every seat has a clear, comfortable view.",
        "The room is calibrated as a complete cinema, not a furniture drop. Seating, acoustics, and picture belong to the same install — designed, installed, and tuned together.",
      ]}
      sections={[
        {
          heading: "What this room needed",
          paragraphs: [
            "A flagship cinema needs the seats locked before the screen wall is designed. Studio Vellari Stanley recliners and a Stanley daybed were specified with the install — console widths, carbon-fibre panelling, under-seat lighting — so sightlines, circulation, and comfort were decisions, not leftovers. An entry lounge with a lit marble niche and steps into the theatre set how you arrive.",
          ],
        },
        {
          heading: "How the install shows up",
          paragraphs: [
            "Around the seats: concealed wiring, acoustic surfaces, a screen wall, flanking speakers, and a star ceiling. Lighting is planned so every seat has a clear view. Then the room is calibrated as one cinema — seating, envelope, picture, and sound together. The Stanley collection is part of that install, not a furniture drop in front of a panel.",
          ],
        },
        {
          heading: "Explore more",
          paragraphs: [
            <>
              This flagship room is a finished{" "}
              <TheatreInstallLink>home cinema installation in Karachi</TheatreInstallLink>. The
              order of work — seats, then screen, then speakers, then calibration — is{" "}
              <CaseStudyLink href={cinemaInstallerArticleHref}>
                what a cinema installer in Pakistan actually does
              </CaseStudyLink>
              . For the seating detail inside a cinema room, see{" "}
              <CaseStudyLink href="/projects/residential/stanley-seats">Stanley Seats</CaseStudyLink>
              .
            </>,
          ],
        },
      ]}
      breadcrumb="Home / Projects / Residential / Studio Vellari"
    />
  )
}
