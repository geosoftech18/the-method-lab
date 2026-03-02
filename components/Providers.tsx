'use client'

import { ProgramProvider } from '@/contexts/ProgramContext'
import { useEffect, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR, render children without provider to avoid context issues
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ProgramProvider>
      {children}
    </ProgramProvider>
  )
}

