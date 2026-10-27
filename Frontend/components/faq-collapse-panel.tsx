"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

/**
 * FAQ answer panel that is always in the server HTML.
 * Closed state is visual only (height/opacity) — no mount-on-click, no display:none.
 */
export function FaqCollapsePanel({
  id,
  isOpen,
  children,
}: {
  id?: string
  isOpen: boolean
  children: ReactNode
}) {
  return (
    <motion.div
      id={id}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  )
}
