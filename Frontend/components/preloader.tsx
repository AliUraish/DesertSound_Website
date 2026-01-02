"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [showEntrance, setShowEntrance] = useState(true)

  useEffect(() => {
    // Simply show the welcome screen for 2.5 seconds then lift the curtain
    const timer = setTimeout(() => {
      setShowEntrance(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {showEntrance && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#1a1a1a] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Main Logo Container */}
          <div className="relative flex flex-col items-center">
            {/* Logo Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative z-10 w-48 md:w-64 mb-8"
            >
              <img 
                src="/0-removebg-preview.png" 
                alt="Desert Sound" 
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Separator Line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
              className="h-[1px] bg-white/20 mb-6"
            />

            {/* Welcome Text */}
            <div className="overflow-hidden h-8 flex items-center">
               <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-white/60 text-xs md:text-sm uppercase tracking-[0.4em] font-light"
              >
                Experience Sound
              </motion.p>
            </div>
          </div>

          {/* Background Gradient */}
          <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-50 pointer-events-none" />
          
           {/* Background Grid - Very Subtle */}
           <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
            style={{ 
                backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', 
                backgroundSize: '80px 80px' 
            }} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
