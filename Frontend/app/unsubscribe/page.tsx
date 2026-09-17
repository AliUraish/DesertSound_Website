import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UnsubscribeView } from "@/components/unsubscribe-view"
import { unsubscribeNewsletter } from "@/lib/newsletter-list"

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
}

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; token?: string }>
}) {
  const { email = "", token = "" } = await searchParams
  const result = email && token ? await unsubscribeNewsletter(email, token) : { ok: false as const }

  return (
    <div className="w-full overflow-x-clip bg-black">
      <Header />
      <main className="bg-[#F5F5DC] pt-[110px] md:pt-32">
        <UnsubscribeView ok={result.ok} email={email} />
      </main>
      <Footer />
    </div>
  )
}
