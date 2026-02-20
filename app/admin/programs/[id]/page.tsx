'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ProgramForm from '@/components/admin/ProgramForm'

export const dynamic = 'force-dynamic'

export default function EditProgramPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [program, setProgram] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id === 'new') {
      setProgram(null)
      setLoading(false)
      return
    }

    // Load program from API
    const fetchProgram = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/programs/${id}`)
        if (response.ok) {
          const data = await response.json()
          setProgram(data)
        } else {
          console.error('Failed to fetch program')
          router.push('/admin/programs')
        }
      } catch (error) {
        console.error('Error fetching program:', error)
        router.push('/admin/programs')
      } finally {
        setLoading(false)
      }
    }

    fetchProgram()
  }, [id, router])

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-ablr-primary mb-2">
          {id === 'new' ? 'Create New Program' : 'Edit Program'}
        </h1>
        <p className="text-gray-600">
          {id === 'new' ? 'Fill in all the details to create a new program' : 'Update program information'}
        </p>
      </div>

      <ProgramForm program={program} isEdit={id !== 'new'} />
    </div>
  )
}


