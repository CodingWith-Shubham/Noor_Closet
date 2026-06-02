import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NOOR - The Closet | Luxury Ethnic Fashion',
  description: 'Embrace Your Noor ✨ - Premium ethnic wear crafted for timeless beauty. Anarkalis, Co-ord Sets, Kurtis, and more.',
  keywords: ['ethnic fashion', 'luxury wear', 'anarkali', 'co-ord sets', 'Indian fashion', 'premium kurtis'],
  authors: [{ name: 'NOOR - The Closet' }],
  openGraph: {
    title: 'NOOR - The Closet',
    description: 'Premium luxury ethnic fashion brand',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOOR - The Closet',
    description: 'Embrace Your Noor ✨',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FFF8F2" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
