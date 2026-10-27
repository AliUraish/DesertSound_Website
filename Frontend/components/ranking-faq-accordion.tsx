"use client"

import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { useState, type ReactNode } from "react"
import { FaqCollapsePanel } from "@/components/faq-collapse-panel"

export function RankingFaqAccordion({
  items,
}: {
  items: { question: string; answer: ReactNode }[]
}) {
  return (
    <>
      {items.map((faq, index) => (
        <RankingFaqItem key={faq.question} faq={faq} index={index} />
      ))}
    </>
  )
}

function RankingFaqItem({
  faq,
  index,
}: {
  faq: { question: string; answer: ReactNode }
  index: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = `ranking-faq-panel-${index}`

  return (
    <div className="py-5 first:pt-0 last:pb-0">
      <h3 className="text-lg font-light text-black">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 text-left"
        >
          <span>{faq.question}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <ChevronDown className="h-5 w-5 text-black/60" />
          </motion.span>
        </button>
      </h3>
      <FaqCollapsePanel id={panelId} isOpen={isOpen}>
        <p className="mt-2 text-base font-light leading-relaxed text-black/70">{faq.answer}</p>
      </FaqCollapsePanel>
    </div>
  )
}
