import type { Metadata } from 'next'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Duskdrops — Creative drops for bold brands',
    template: '%s | Duskdrops',
  },
  description:
    'Premium digital design assets for faceless creators. Branding kits, social templates & logo packs. Instant download. Canva ready.',
  keywords: [
    'branding kit', 'faceless creator', 'digital products', 'canva templates',
    'social media templates', 'logo pack', 'digital download', 'plantillas digitales',
  ],
  authors: [{ name: 'Duskdrops' }],
  creator: 'Duskdrops',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
    url: 'https://duskdrops.com',
    siteName: 'Duskdrops',
    title: 'Duskdrops — Creative drops for bold brands',
    description: 'Premium digital design assets for faceless creators.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duskdrops',
    description: 'Premium digital design assets for faceless creators.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-ivory text-night antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
