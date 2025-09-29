import type { Metadata } from 'next'
import { Montserrat, Roboto } from 'next/font/google'
import './globals.css'

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
  description: 'Fast, reliable repairs for your favorite devices. From cracked screens to slow laptops, our certified technicians get you back up and running in no time.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable} antialiased`}>
      <body className="bg-[var(--light-gray)]">
        {children}
      </body>
    </html>
  )
}