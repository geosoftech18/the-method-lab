import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ProgramProvider } from '@/contexts/ProgramContext'

export const metadata: Metadata = {
  title: 'Applied Behavioural Learning and Research | ABLR',
  description: 'The latest applied practice methodology to support professional judgement.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ProgramProvider>
          {children}
        </ProgramProvider>
      </body>
    </html>
  )
}


