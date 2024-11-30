import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "'E-LibraryX: Transcending Digital Reading'",
  description: "'Experience the future of digital libraries with E-LibraryX. We\'re not just starting; we\'re revolutionizing very concept reading!'",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
     
      <body className={`${spaceGrotesk.className} overflow-x-hidden`}>
      <Navbar/>
      {children}
      </body>
    </html>
  )
}

