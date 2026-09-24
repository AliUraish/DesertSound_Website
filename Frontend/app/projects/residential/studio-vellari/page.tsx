import { ProjectCaseStudyPage, TheatreInstallLink } from "@/components/project-case-study-page"

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
        "Studio Vellari is a flagship Desert Sound cinema in Karachi. Studio Vellari Stanley recliners and a Stanley daybed take the centre of the room — the seating is specified with the install, not added after.",
        "The Stanley collection offers a single-seat recliner or an expansive daybed, with customisable console widths and distinctive 3D carbon fibre panelling. Consoles and armrests can take quilted stitch patterns; upholstery options include Alcantara, Nappa leather, nubuck, and velvet.",
        "Around the seats, the room is a dedicated cinema: a finished envelope, concealed wiring, acoustic surfaces, and a screen wall that keeps attention forward. Lighting and circulation are planned so every seat has a clear, comfortable view.",
        <>
          The room is calibrated as a complete cinema, not a furniture drop. Seating, acoustics, and picture belong to
          the same <TheatreInstallLink /> — designed, installed, and tuned together.
        </>,
      ]}
      breadcrumb="Home / Projects / Residential / Studio Vellari"
    />
  )
}
