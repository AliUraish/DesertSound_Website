import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Preloader } from "@/components/preloader"
import { absoluteUrl, defaultSeo, localBusinessJsonLd, siteName, siteUrl } from "@/lib/seo"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | ${defaultSeo.title}`,
    template: `%s | ${siteName}`,
  },
  description: defaultSeo.description,
  applicationName: siteName,
  category: "Home technology and audiovisual integration",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  keywords: [
    "home theater Pakistan",
    "home theatre systems Pakistan",
    "home theater Karachi",
    "smart home automation Pakistan",
    "audio system installation Karachi",
    "home networking Wi-Fi Pakistan",
    "lighting control Pakistan",
    "cinema room design",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `${siteName} | ${defaultSeo.title}`,
    description: defaultSeo.description,
    url: siteUrl,
    siteName,
    images: [
      {
        url: absoluteUrl(defaultSeo.image),
        width: 1200,
        height: 630,
        alt: "Desert Sound home theatre installation",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | ${defaultSeo.title}`,
    description: defaultSeo.description,
    images: [absoluteUrl(defaultSeo.image)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Preloader />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
