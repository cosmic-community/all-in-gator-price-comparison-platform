import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'All-in-Gator | Best Price Comparison Platform in India',
  description: 'Find the best prices for products across all major Indian e-commerce platforms. Compare prices from Flipkart, Amazon India, Myntra and more.',
  keywords: 'price comparison, India, shopping, deals, discounts, Flipkart, Amazon, Myntra',
  authors: [{ name: 'All-in-Gator Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'All-in-Gator - Price Comparison Platform',
    description: 'Find the best prices for products across all major Indian e-commerce platforms.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'All-in-Gator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All-in-Gator - Price Comparison Platform',
    description: 'Find the best prices for products across all major Indian e-commerce platforms.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}