"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500) // 2.5 seconds total loading time
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <>
          {/* Top Curtain */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="fixed top-0 left-0 w-full h-[50vh] bg-[#1a1a1a] z-50 flex items-end justify-center overflow-hidden"
          >
            {/* Logo Part - Top Half */}
            <div className="relative w-full max-w-[90%] lg:max-w-4xl mx-auto flex justify-center translate-y-1/2 pb-4">
               {/* We use the logo here, inverted for dark background */}
            </div>
          </motion.div>

          {/* Bottom Curtain */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="fixed bottom-0 left-0 w-full h-[50vh] bg-[#1a1a1a] z-50 flex items-start justify-center overflow-hidden"
          >
             {/* Logo Part - Bottom Half could go here if we split the logo, but simpler to just overlay the logo */}
          </motion.div>

          {/* Logo Overlay - Centered and independent */}
          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.3 } }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
          >
             <div className="relative flex flex-col items-center gap-4">
                <img 
                  src="/0-removebg-preview.png" 
                  alt="Desert Sound" 
                  className="h-24 md:h-32 lg:h-40 w-auto object-contain brightness-0 invert"
                />
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-0.5 bg-white/30 rounded-full"
                />
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-white/60 text-sm tracking-[0.3em] uppercase font-light"
                >
                  Presents
                </motion.p>
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

