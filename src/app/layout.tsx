import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@/lib/amplify'
import ConfigureAmplify from '@/components/ConfigureAmplify'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'WeFix4U - Device Repair Service',
  description: 'Fast, reliable repairs for your favorite devices. From cracked screens to slow laptops, our experienced technicians get you back up and running in no time.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </head>
      <body className="font-display bg-background-light dark:bg-background-dark text-text-light-primary dark:text-text-dark-primary antialiased" suppressHydrationWarning>
        <ConfigureAmplify />
        {children}
      </body>
    </html>
  )
}
