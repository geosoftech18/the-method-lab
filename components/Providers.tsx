'use client'

import { ProgramProvider } from '@/contexts/ProgramContext'

export function Providers({ children }: { children: React.ReactNode }) {
  // Always render the provider - it handles SSR safely with default values
  return (
    <ProgramProvider>
      {children}
    </ProgramProvider>
  )
}

