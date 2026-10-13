import type { RankingSeoPage } from "./ranking-seo-types"

export const punjabServicePath = "/service/home-cinema-installation-punjab"

export const punjabServiceTitle = "Home Cinema Installation in Punjab"
export const punjabServiceH1 = "Home Cinema Installation in Punjab"
export const punjabServiceDescription =
  "Home cinema installation in Punjab from Desert Sound. Lahore, Faisalabad, Multan, Sialkot and Bahawalpur: survey, design, install and calibrate on site."

export const punjabServicePage: RankingSeoPage = {
  slug: punjabServicePath,
  title: punjabServiceTitle,
  description: punjabServiceDescription,
  h1: punjabServiceH1,
  image: "/Pictures Final/Services/Home_Theatre/Cover.jpg",
  imageAlt: "Home cinema design and installation by Desert Sound",
  body: `Desert Sound is a Karachi home cinema company, and this page covers our work in Punjab. Treat it as a map: pick your city below for the local detail. Wherever the house is, a project runs in one order. We survey the room, design the theatre for it, build it in with the wiring hidden, and calibrate picture and sound from the seats you will use.

Every Punjab project starts with a site visit. Ask for one on our [contact page](/contact-us).

### Punjab cities we cover

#### Lahore

[We have a team in Lahore](/service/home-cinema-installation-lahore). Survey, design, install and calibration run the same way as everywhere else.

#### Faisalabad

A textile city where family compounds are common, so picking the right room comes first. Our team travels from Karachi for surveys in Faisalabad. See [home cinema installation in Faisalabad](/service/home-cinema-installation-faisalabad).

#### Multan

Bright afternoons and pre-monsoon dust decide where the screen and the equipment go. We come up from Karachi for surveys in Multan. See [home cinema installation in Multan](/service/home-cinema-installation-multan).

#### Sialkot

Export workshops and close-set old-city houses make isolation an early question. Surveys from Karachi reach Sialkot. See [home cinema installation in Sialkot](/service/home-cinema-installation-sialkot).

#### Bahawalpur

On the edge of the Cholistan desert, a cinema room has to keep out daylight and grit. We travel from Karachi to Bahawalpur. See [home cinema installation in Bahawalpur](/service/home-cinema-installation-bahawalpur).

### One method for every Punjab home

For home theatre installation in Punjab, the steps never change from city to city: survey, design, installation with concealed cabling and power, then calibration. The full scope is on [home theater / home cinema design and installation in Pakistan](/service/home-theatre-design-and-installation), and the questions worth putting to any installer are in [what a cinema installer in Pakistan actually does](/home-cinema-and-cinema-installer-pakistan).

Our finished rooms, under [finished residential theatres](/projects/residential), are all Karachi homes. We show them as Karachi work, never as Punjab projects.

### Book a Punjab site visit

Tell us your city, your area and the room you have in mind through our [contact page](/contact-us), and we will come back with a visit date.`,
  faqs: [
    {
      q: "Do you install home cinemas in Punjab?",
      a: "Yes. We have a team in Lahore, and for Faisalabad, Multan, Sialkot and Bahawalpur our team travels from Karachi. Every project follows the same order: survey, design, install, calibrate.",
    },
    {
      q: "Does Desert Sound have an office in Punjab?",
      a: "Desert Sound is based in Karachi. We have a team in Lahore. We have no office or showroom in Faisalabad, Multan, Sialkot or Bahawalpur, and we serve those cities on site visits.",
    },
    {
      q: "Which Punjab cities do you cover?",
      a: "Lahore, Faisalabad, Multan, Sialkot and Bahawalpur each have their own page, linked above. For another Punjab city, ask us and we will confirm whether a visit is possible.",
    },
    {
      q: "What happens on a Punjab site visit?",
      a: "We look at light, sound leaks and the structure, set the seats, screen and speakers, and plan hidden wiring and power. Installation and calibration follow once the design is agreed.",
    },
    {
      q: "How do I book a survey in Punjab?",
      a: "Send your city, area and room through our [contact page](/contact-us). We will confirm the visit date.",
    },
  ],
  links: [
    {
      label: "home cinema installation in Lahore",
      href: "/service/home-cinema-installation-lahore",
    },
    {
      label: "home cinema installation in Faisalabad",
      href: "/service/home-cinema-installation-faisalabad",
    },
    {
      label: "home cinema installation in Multan",
      href: "/service/home-cinema-installation-multan",
    },
    {
      label: "home cinema installation in Sialkot",
      href: "/service/home-cinema-installation-sialkot",
    },
    {
      label: "home cinema installation in Bahawalpur",
      href: "/service/home-cinema-installation-bahawalpur",
    },
    {
      label: "home theater / home cinema design and installation in Pakistan",
      href: "/service/home-theatre-design-and-installation",
    },
    {
      label: "what a cinema installer in Pakistan actually does",
      href: "/home-cinema-and-cinema-installer-pakistan",
    },
    {
      label: "finished residential theatres",
      href: "/projects/residential",
    },
    {
      label: "contact page",
      href: "/contact-us",
    },
  ],
}

export function punjabFaqJsonLdItems() {
  return punjabServicePage.faqs.map((faq) => ({
    question: faq.q,
    answer: faq.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, ""),
  }))
}
