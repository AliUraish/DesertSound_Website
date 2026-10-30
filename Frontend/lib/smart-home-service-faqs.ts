export type SmartHomeServiceFaq = {
  question: string
  answer: string
}

/**
 * Visible smart-home-service accordion Q&As. FAQPage JSON-LD must stay in lockstep.
 * Do not change these strings here unless the on-page accordion copy also changes.
 */
export const smartHomeServiceFaqs: SmartHomeServiceFaq[] = [
  {
    question: "What does a smart home automation system mean?",
    answer:
      "A smart home automation system connects functions such as lighting, climate, security, curtains, and entertainment so they can be managed through central controls, schedules, scenes, or remote access.",
  },
  {
    question: "Can entertainment systems be included in the automation?",
    answer:
      "Yes. Home theatres, televisions, music systems, lighting, and motorised curtains can be integrated so an entire entertainment scene starts with one command.",
  },
  {
    question: "Is voice control a good idea in Pakistan?",
    answer:
      "Voice control can be useful when it is supported by reliable internet access and careful system integration. We also provide physical and app-based controls so essential functions do not depend on voice commands alone.",
  },
  {
    question: "Does home automation require strong Wi-Fi and internet access?",
    answer:
      "A strong home network is essential for responsive app control, streaming, and connected devices. We plan the network and backup around outages. During the survey, we check how your home handles load-shedding and internet drops, and plan the system around them.",
  },
  {
    question: "Can the system be expanded later?",
    answer:
      "Yes. We design scalable systems that can accommodate additional rooms, devices, scenes, and control interfaces as your needs change.",
  },
]
