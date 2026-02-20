'use client'

import ProgramForm from '@/components/admin/ProgramForm'

export const dynamic = 'force-dynamic'

export default function NewProgramPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-ablr-primary mb-2">
          Create New Program
        </h1>
        <p className="text-gray-600">Fill in all the details to create a new program</p>
      </div>

      <ProgramForm program={null} isEdit={false} />
    </div>
  )
}


