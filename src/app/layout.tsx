import type { Metadata } from 'next'
import { Montserrat, Roboto } from 'next/font/google'
import './globals.css'
import '@/lib/amplify'
import HeaderToggle from '@/components/HeaderToggle'
import ConfigureAmplify from '@/components/ConfigureAmplify'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-montserrat',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'WE FIX 4U - Tech Repair',
  description: 'Fast, reliable repairs for your favorite devices. From cracked screens to slow laptops, our experienced technicians get you back up and running in no time.',
  openGraph: {
    title: 'WE FIX 4U - Tech Repair',
    description: 'Fast, reliable repairs for your favorite devices. From cracked screens to slow laptops, our experienced technicians get you back up and running in no time.',
    url: 'https://wefix4u.vercel.app',
    siteName: 'WE FIX 4U',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'WE FIX 4U - Professional Tech Repair Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WE FIX 4U - Tech Repair',
    description: 'Fast, reliable repairs for your favorite devices. From cracked screens to slow laptops, our experienced technicians get you back up and running in no time.',
    images: ['/og-image.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Toggle between old and new header design
  const useJoyHeader = true; // Set to false to use the old header

  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable} antialiased`}>
      <body className="bg-[var(--light-gray)]">
        <HeaderToggle useJoyHeader={useJoyHeader} />
        <ConfigureAmplify />
        {children}
      </body>
    </html>
  )
}