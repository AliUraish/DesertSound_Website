"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

type UnsubscribeViewProps = {
  ok: boolean
  email: string
}

function FillLink({
  href,
  children,
  invert = false,
}: {
  href: string
  children: string
  invert?: boolean
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex h-12 items-center overflow-hidden px-7 text-[11px] font-medium uppercase tracking-[0.2em] transition-[letter-spacing] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:tracking-[0.24em] ${
        invert
          ? "border border-black/20 bg-transparent text-black"
          : "border border-black bg-black text-[#F5F5DC]"
      }`}
    >
      <span
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 ${
          invert ? "bg-black" : "bg-[#F5F5DC]"
        }`}
      />
      <span
        className={`relative z-10 transition-colors duration-500 ${
          invert ? "group-hover:text-[#F5F5DC]" : "group-hover:text-black"
        }`}
      >
        {children}
      </span>
      <span
        className={`relative z-10 ml-3 inline-block transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 ${
          invert ? "group-hover:text-[#F5F5DC]" : "group-hover:text-black"
        }`}
      >
        →
      </span>
    </Link>
  )
}

export function UnsubscribeView({ ok, email }: UnsubscribeViewProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="grid min-h-[calc(100vh-110px)] lg:grid-cols-2 lg:min-h-[calc(100vh-8rem)]">
        <div className="relative flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/0-removebg-preview.png"
              alt="Desert Sound"
              width={180}
              height={67}
              className="mb-12 h-11 w-auto object-contain sm:h-12"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em] text-black/40"
          >
            {ok ? "List · Closed" : "List · Link"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 max-w-lg font-[family-name:var(--font-playfair)] text-5xl font-medium italic leading-[0.95] tracking-tight text-black sm:text-6xl"
          >
            {ok ? "You're off the list." : "This link isn't valid."}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.42, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 h-px w-16 origin-left bg-black/25"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.7 }}
            className="mb-12 max-w-md text-base font-light leading-relaxed text-black/60"
          >
            {ok
              ? `${email} will no longer receive Desert Sound list emails. Walk into Zamzama whenever you want the room, not the inbox.`
              : "Use the unsubscribe button in a recent Desert Sound email, or write to info@desertsound.com.pk."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.7 }}
            className="flex flex-wrap items-center gap-3"
          >
            <FillLink href="/">Back to Desert Sound</FillLink>
            <FillLink href="/contact-us" invert>
              Visit the showroom
            </FillLink>
          </motion.div>
        </div>

        <div className="relative min-h-[280px] overflow-hidden lg:min-h-full">
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="/Pictures Final/Services/Home_Theatre/Cover.jpg"
              alt="Desert Sound home cinema"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-4"
          >
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.28em] text-white/60">Zamzama · DHA</p>
              <p className="font-[family-name:var(--font-playfair)] text-2xl italic text-white">Karachi showroom</p>
            </div>
            <Image
              src="/image-removebg-preview (1).png"
              alt="CEDIA Member"
              width={110}
              height={56}
              className="h-12 w-auto object-contain drop-shadow-md sm:h-14"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
