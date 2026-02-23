'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/contexts/AdminContext'
import { Save, Plus, Trash2, Upload, X } from 'lucide-react'

interface ProgramData {
  id?: string
  title: string
  duration: string
  startDate?: string
  endDate?: string
  nextCohort?: string
  isSelfPaced?: boolean
  mode: 'live' | 'pre-recorded'
  wing: string
  audience: string
  faculty?: Array<{
    name: string
    role: string
    bio: string
    image?: string
  }>
  whoItsFor?: string[]
  learningObjectives?: string[]
  outcomes?: string[]
  brochureUrl?: string
  description?: string
  faqs?: Array<{
    question: string
    answer: string
  }>
  certificate?: {
    title: string
    description: string
    image?: string
  }
  testimonials?: Array<{
    quote: string
    author: string
    role: string
  }>
  image?: string
}

interface ProgramFormProps {
  program: ProgramData | null
  isEdit: boolean
}

export default function ProgramForm({ program, isEdit }: ProgramFormProps) {
  const router = useRouter()
  const { faculty, fetchFaculty } = useAdmin()
  const [formData, setFormData] = useState<ProgramData>({
    title: '',
    duration: '',
    mode: 'live',
    wing: 'Applied Learning and Training',
    audience: 'professionals',
    whoItsFor: [],
    learningObjectives: [],
    outcomes: [],
    faculty: [],
    faqs: [],
    testimonials: [],
    certificate: {
      title: 'Certificate of Completion',
      description: '',
    },
  })

  const [currentWhoItsFor, setCurrentWhoItsFor] = useState('')
  const [currentObjective, setCurrentObjective] = useState('')
  const [currentOutcome, setCurrentOutcome] = useState('')
  const [currentFaculty, setCurrentFaculty] = useState({ name: '', role: '', bio: '', image: '' })
  const [currentFAQ, setCurrentFAQ] = useState({ question: '', answer: '' })
  const [currentTestimonial, setCurrentTestimonial] = useState({ quote: '', author: '', role: '' })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [certificateImagePreview, setCertificateImagePreview] = useState<string | null>(null)
  const [facultyImagePreviews, setFacultyImagePreviews] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    fetchFaculty(true)
  }, [fetchFaculty])

  useEffect(() => {
    if (program) {
      setFormData({
        ...program,
        startDate: program.startDate || '',
        endDate: program.endDate || '',
        faqs: program.faqs || [],
        testimonials: program.testimonials || [],
        certificate: program.certificate || { title: 'Certificate of Completion', description: '' },
        faculty: program.faculty || [],
        whoItsFor: program.whoItsFor || [],
        learningObjectives: program.learningObjectives || [],
        outcomes: program.outcomes || [],
      })
      
      if (program.image) {
        setImagePreview(program.image)
      }
      if (program.certificate?.image) {
        setCertificateImagePreview(program.certificate.image)
      }
    }
  }, [program])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (field: 'image' | 'certificateImage', file: File | null) => {
    if (!file) return
    
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      if (field === 'image') {
        setFormData((prev) => ({ ...prev, image: base64String }))
        setImagePreview(base64String)
      } else if (field === 'certificateImage') {
        setFormData((prev) => ({
          ...prev,
          certificate: { 
            title: prev.certificate?.title || 'Certificate of Completion',
            description: prev.certificate?.description || '',
            image: base64String 
          }
        }))
        setCertificateImagePreview(base64String)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFacultyImageChange = (index: number, file: File | null) => {
    if (!file) return
    
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setFormData((prev) => {
        const updatedFaculty = [...(prev.faculty || [])]
        updatedFaculty[index] = { ...updatedFaculty[index], image: base64String }
        return { ...prev, faculty: updatedFaculty }
      })
      setFacultyImagePreviews((prev) => ({ ...prev, [index]: base64String }))
    }
    reader.readAsDataURL(file)
  }

  const handleArrayAdd = (field: 'whoItsFor' | 'learningObjectives' | 'outcomes', value: string) => {
    if (!value.trim()) return
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), value.trim()],
    }))
    if (field === 'whoItsFor') setCurrentWhoItsFor('')
    if (field === 'learningObjectives') setCurrentObjective('')
    if (field === 'outcomes') setCurrentOutcome('')
  }

  const handleArrayRemove = (field: 'whoItsFor' | 'learningObjectives' | 'outcomes', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index),
    }))
  }

  const handleFacultyAdd = () => {
    if (!currentFaculty.name.trim() || !currentFaculty.role.trim()) return
    setFormData((prev) => ({
      ...prev,
      faculty: [...(prev.faculty || []), { ...currentFaculty }],
    }))
    setCurrentFaculty({ name: '', role: '', bio: '', image: '' })
  }

  const handleFacultyRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faculty: (prev.faculty || []).filter((_, i) => i !== index),
    }))
  }

  const handleFAQAdd = () => {
    if (!currentFAQ.question.trim() || !currentFAQ.answer.trim()) return
    setFormData((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), { ...currentFAQ }],
    }))
    setCurrentFAQ({ question: '', answer: '' })
  }

  const handleFAQRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: (prev.faqs || []).filter((_, i) => i !== index),
    }))
  }

  const handleTestimonialAdd = () => {
    if (!currentTestimonial.quote.trim() || !currentTestimonial.author.trim()) return
    setFormData((prev) => ({
      ...prev,
      testimonials: [...(prev.testimonials || []), { ...currentTestimonial }],
    }))
    setCurrentTestimonial({ quote: '', author: '', role: '' })
  }

  const handleTestimonialRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      testimonials: (prev.testimonials || []).filter((_, i) => i !== index),
    }))
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = isEdit && formData.id 
        ? `/api/programs/${formData.id}`
        : '/api/programs'
      
      const method = isEdit && formData.id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to save program')
      }

      router.push('/admin/programs')
    } catch (error) {
      console.error('Error saving program:', error)
      alert('Failed to save program. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Program Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Duration *
            </label>
            <input
              type="text"
              required
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              placeholder="e.g., 8 weeks"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Wing *
            </label>
            <select
              required
              value={formData.wing}
              onChange={(e) => handleInputChange('wing', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            >
              <option value="Applied Learning and Training">Applied Learning and Training</option>
              <option value="Applied Research and Practice">Applied Research and Practice</option>
             
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Audience *
            </label>
            <select
              required
              value={formData.audience}
              onChange={(e) => handleInputChange('audience', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            >
              <option value="students">Students</option>
              <option value="professionals">Professionals</option>
              <option value="organisations">Organisations</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mode *
            </label>
            <select
              required
              value={formData.mode}
              onChange={(e) => handleInputChange('mode', e.target.value as 'live' | 'pre-recorded')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            >
              <option value="live">Live</option>
            
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Next Cohort
            </label>
            <input
              type="text"
              value={formData.nextCohort || ''}
              onChange={(e) => handleInputChange('nextCohort', e.target.value)}
              placeholder="e.g., March 2024"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate || ''}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={formData.endDate || ''}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              min={formData.startDate || undefined}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
          </div>

          {/* <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isSelfPaced || false}
              onChange={(e) => handleInputChange('isSelfPaced', e.target.checked)}
              className="w-4 h-4 text-ablr-primary border-gray-300 rounded focus:ring-ablr-primary"
            />
            <label className="ml-2 text-sm font-semibold text-gray-700">
              Self-paced
            </label>
          </div> */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Brochure URL
            </label>
            <input
              type="url"
              value={formData.brochureUrl || ''}
              onChange={(e) => handleInputChange('brochureUrl', e.target.value)}
              placeholder="https://example.com/brochure.pdf"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Program Description
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              placeholder="Enter a brief description of the program"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Program Image
            </label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('image', e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-ablr-primary file:text-white hover:file:bg-ablr-dark file:cursor-pointer"
              />
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Program preview"
                    className="max-w-xs h-48 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null)
                      handleInputChange('image', '')
                    }}
                    className="mt-2 text-sm text-red-600 hover:text-red-700"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Who It's For */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">Who It's For</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={currentWhoItsFor}
            onChange={(e) => setCurrentWhoItsFor(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleArrayAdd('whoItsFor', currentWhoItsFor))}
            placeholder="Add target audience"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => handleArrayAdd('whoItsFor', currentWhoItsFor)}
            className="px-4 py-2 bg-ablr-primary text-white rounded-lg hover:bg-ablr-dark transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-2">
          {formData.whoItsFor?.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-700">{item}</span>
              <button
                type="button"
                onClick={() => handleArrayRemove('whoItsFor', index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">Learning Objectives</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={currentObjective}
            onChange={(e) => setCurrentObjective(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleArrayAdd('learningObjectives', currentObjective))}
            placeholder="Add learning objective"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => handleArrayAdd('learningObjectives', currentObjective)}
            className="px-4 py-2 bg-ablr-primary text-white rounded-lg hover:bg-ablr-dark transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-2">
          {formData.learningObjectives?.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-700">{item}</span>
              <button
                type="button"
                onClick={() => handleArrayRemove('learningObjectives', index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">Learning Outcomes</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={currentOutcome}
            onChange={(e) => setCurrentOutcome(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleArrayAdd('outcomes', currentOutcome))}
            placeholder="Add learning outcome"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => handleArrayAdd('outcomes', currentOutcome)}
            className="px-4 py-2 bg-ablr-primary text-white rounded-lg hover:bg-ablr-dark transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-2">
          {formData.outcomes?.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-700">{item}</span>
              <button
                type="button"
                onClick={() => handleArrayRemove('outcomes', index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">Faculty</h2>
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Faculty from Database
            </label>
            <select
              value=""
              onChange={(e) => {
                const selectedFacultyId = e.target.value
                if (selectedFacultyId) {
                  const selectedFaculty = faculty.find((f) => f.id === selectedFacultyId)
                  if (selectedFaculty) {
                    setCurrentFaculty({
                      name: selectedFaculty.name,
                      role: selectedFaculty.role,
                      bio: selectedFaculty.bio,
                      image: selectedFaculty.image || '',
                    })
                  }
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            >
              <option value="">-- Select a faculty member --</option>
              {faculty.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} - {member.role}
                </option>
              ))}
            </select>
          </div>
          {currentFaculty.name && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start gap-4">
                {currentFaculty.image && (
                  <img
                    src={currentFaculty.image}
                    alt={currentFaculty.name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{currentFaculty.name}</h4>
                  <p className="text-sm text-gray-600">{currentFaculty.role}</p>
                  {currentFaculty.bio && (
                    <p className="text-sm text-gray-700 mt-2">{currentFaculty.bio}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleFacultyAdd}
          disabled={!currentFaculty.name.trim() || !currentFaculty.role.trim()}
          className="px-4 py-2 bg-ablr-primary text-white rounded-lg hover:bg-ablr-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={20} className="inline mr-2" />
          Add Faculty
        </button>
        <div className="mt-4 space-y-3">
          {formData.faculty?.map((member, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <p className="text-sm text-gray-700 mt-2">{member.bio}</p>
                  {member.image && (
                    <div className="mt-3">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleFacultyRemove(index)}
                  className="text-red-600 hover:text-red-700 flex-shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">Certificate of Completion</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Certificate Title
            </label>
            <input
              type="text"
              value={formData.certificate?.title || ''}
              onChange={(e) => handleInputChange('certificate', { ...formData.certificate, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Certificate Image
            </label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('certificateImage', e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-ablr-primary file:text-white hover:file:bg-ablr-dark file:cursor-pointer"
              />
              {certificateImagePreview && (
                <div className="mt-3">
                  <img
                    src={certificateImagePreview}
                    alt="Certificate preview"
                    className="max-w-xs h-48 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setCertificateImagePreview(null)
                      handleInputChange('certificate', { ...formData.certificate, image: '' })
                    }}
                    className="mt-2 text-sm text-red-600 hover:text-red-700"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Certificate Description
            </label>
            <textarea
              value={formData.certificate?.description || ''}
              onChange={(e) => handleInputChange('certificate', { ...formData.certificate, description: e.target.value })}
              rows={4}
              placeholder="Describe the certificate and its value"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">FAQs</h2>
        <div className="space-y-4 mb-4">
          <input
            type="text"
            value={currentFAQ.question}
            onChange={(e) => setCurrentFAQ({ ...currentFAQ, question: e.target.value })}
            placeholder="Question"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
          />
          <textarea
            value={currentFAQ.answer}
            onChange={(e) => setCurrentFAQ({ ...currentFAQ, answer: e.target.value })}
            placeholder="Answer"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleFAQAdd}
            className="px-4 py-2 bg-ablr-primary text-white rounded-lg hover:bg-ablr-dark transition-colors"
          >
            <Plus size={20} className="inline mr-2" />
            Add FAQ
          </button>
        </div>
        <div className="space-y-3">
          {formData.faqs?.map((faq, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-sm text-gray-700">{faq.answer}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleFAQRemove(index)}
                  className="text-red-600 hover:text-red-700 ml-4"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">Testimonials</h2>
        <div className="space-y-4 mb-4">
          <textarea
            value={currentTestimonial.quote}
            onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, quote: e.target.value })}
            placeholder="Testimonial Quote"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={currentTestimonial.author}
              onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, author: e.target.value })}
              placeholder="Author Name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
            <input
              type="text"
              value={currentTestimonial.role}
              onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, role: e.target.value })}
              placeholder="Author Role"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
          </div>
          <button
            type="button"
            onClick={handleTestimonialAdd}
            className="px-4 py-2 bg-ablr-primary text-white rounded-lg hover:bg-ablr-dark transition-colors"
          >
            <Plus size={20} className="inline mr-2" />
            Add Testimonial
          </button>
        </div>
        <div className="space-y-3">
          {formData.testimonials?.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-700 italic mb-2">"{testimonial.quote}"</p>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleTestimonialRemove(index)}
                  className="text-red-600 hover:text-red-700 ml-4"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push('/admin/programs')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
         <button
           type="submit"
           disabled={isSubmitting}
           className="px-6 py-3 bg-ablr-primary text-white rounded-lg font-semibold hover:bg-ablr-dark transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
         >
           <Save size={20} />
           <span>{isSubmitting ? 'Saving...' : isEdit ? 'Update Program' : 'Create Program'}</span>
         </button>
      </div>
    </form>
  )
}


