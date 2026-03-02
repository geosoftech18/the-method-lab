'use client'

import { ProgramProvider } from '@/contexts/ProgramContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProgramProvider>
      {children}
    </ProgramProvider>
  )
}

