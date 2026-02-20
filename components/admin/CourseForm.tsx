'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Plus, Trash2, Upload, X } from 'lucide-react'

interface CourseData {
  id?: string
  title: string
  tagline?: string
  formatLine?: string
  microTrustLine?: string
  primaryCtaUrl?: string
  secondaryCtaUrl?: string
  overview?: string
  whoItsFor?: string[]
  learningObjectives?: string[]
  learningOutcomes?: string[]
  whatsIncluded?: string
  howItWorks?: string
  certificationDescription?: string
  faculty?: Array<{
    name: string
    role: string
    bio: string
    image?: string
  }>
  faqs?: Array<{
    question: string
    answer: string
  }>
  image?: string
}

interface CourseFormProps {
  course: CourseData | null
  isEdit: boolean
}

export default function CourseForm({ course, isEdit }: CourseFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<CourseData>({
    title: '',
    whoItsFor: [],
    learningObjectives: [],
    learningOutcomes: [],
    faculty: [],
    faqs: [],
  })

  const [currentWhoItsFor, setCurrentWhoItsFor] = useState('')
  const [currentObjective, setCurrentObjective] = useState('')
  const [currentOutcome, setCurrentOutcome] = useState('')
  const [currentFaculty, setCurrentFaculty] = useState({ name: '', role: '', bio: '', image: '' })
  const [currentFAQ, setCurrentFAQ] = useState({ question: '', answer: '' })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [facultyImagePreviews, setFacultyImagePreviews] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    if (course) {
      setFormData({
        ...course,
        faqs: course.faqs || [],
        faculty: course.faculty || [],
        whoItsFor: course.whoItsFor || [],
        learningObjectives: course.learningObjectives || [],
        learningOutcomes: course.learningOutcomes || [],
      })
      
      if (course.image) {
        setImagePreview(course.image)
      }
      if (course.faculty) {
        const previews: { [key: number]: string } = {}
        course.faculty.forEach((f, i) => {
          if (f.image) previews[i] = f.image
        })
        setFacultyImagePreviews(previews)
      }
    }
  }, [course])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (field: 'image', file: File | null) => {
    if (!file) return
    
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setFormData((prev) => ({ ...prev, image: base64String }))
      setImagePreview(base64String)
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

  const handleArrayAdd = (field: 'whoItsFor' | 'learningObjectives' | 'learningOutcomes', value: string) => {
    if (!value.trim()) return
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), value.trim()],
    }))
    if (field === 'whoItsFor') setCurrentWhoItsFor('')
    if (field === 'learningObjectives') setCurrentObjective('')
    if (field === 'learningOutcomes') setCurrentOutcome('')
  }

  const handleArrayRemove = (field: 'whoItsFor' | 'learningObjectives' | 'learningOutcomes', index: number) => {
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

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = isEdit && formData.id 
        ? `/api/courses/${formData.id}`
        : '/api/courses'
      
      const method = isEdit && formData.id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to save course')
      }

      router.push('/admin/courses')
    } catch (error) {
      console.error('Error saving course:', error)
      alert('Failed to save course. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">Hero Section</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Course Title *
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
              Tagline / Positioning Line
            </label>
            <input
              type="text"
              value={formData.tagline || ''}
              onChange={(e) => handleInputChange('tagline', e.target.value)}
              placeholder="e.g., Master the art of clinical supervision"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Format Line
            </label>
            <input
              type="text"
              value={formData.formatLine || ''}
              onChange={(e) => handleInputChange('formatLine', e.target.value)}
              placeholder="e.g., Self-Paced | 12 Hours of Content | Lifetime Access | Start Immediately"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Micro-Trust Line
            </label>
            <input
              type="text"
              value={formData.microTrustLine || ''}
              onChange={(e) => handleInputChange('microTrustLine', e.target.value)}
              placeholder="e.g., Designed for psychologists, supervisors, and mental health leaders."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Primary CTA URL (Enroll Now)
              </label>
              <input
                type="url"
                value={formData.primaryCtaUrl || ''}
                onChange={(e) => handleInputChange('primaryCtaUrl', e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Secondary CTA URL (Download Syllabus)
              </label>
              <input
                type="url"
                value={formData.secondaryCtaUrl || ''}
                onChange={(e) => handleInputChange('secondaryCtaUrl', e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Course Image
            </label>
            {imagePreview ? (
              <div className="relative inline-block">
                <img src={imagePreview} alt="Preview" className="w-48 h-32 object-cover rounded-lg border-2 border-gray-200" />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null)
                    handleInputChange('image', '')
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-ablr-primary transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload size={32} className="text-ablr-primary mb-2" />
                  <p className="text-sm font-semibold text-gray-700 mb-1">Click to upload image</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('image', e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* About the Course */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">About the Course</h2>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Overview *
          </label>
          <textarea
            required
            value={formData.overview || ''}
            onChange={(e) => handleInputChange('overview', e.target.value)}
            rows={6}
            placeholder="Why this course exists + The professional gap it addresses + Why structured supervision matters + How this differs from informal CPD workshops + What kind of practitioner this transforms"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Who It's For */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">Who It's For</h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentWhoItsFor}
              onChange={(e) => setCurrentWhoItsFor(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleArrayAdd('whoItsFor', currentWhoItsFor)
                }
              }}
              placeholder="Add a point (3-4 points recommended)"
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
          <ul className="space-y-2">
            {(formData.whoItsFor || []).map((item, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="flex-1">• {item}</span>
                <button
                  type="button"
                  onClick={() => handleArrayRemove('whoItsFor', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* What You Will Gain (Learning Objectives) */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">What You Will Gain (Learning Objectives)</h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentObjective}
              onChange={(e) => setCurrentObjective(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleArrayAdd('learningObjectives', currentObjective)
                }
              }}
              placeholder="Add a learning objective (4-5 points recommended)"
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
          <ul className="space-y-2">
            {(formData.learningObjectives || []).map((item, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="flex-1">• {item}</span>
                <button
                  type="button"
                  onClick={() => handleArrayRemove('learningObjectives', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">Learning Outcomes</h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentOutcome}
              onChange={(e) => setCurrentOutcome(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleArrayAdd('learningOutcomes', currentOutcome)
                }
              }}
              placeholder="Add a learning outcome (4-5 points recommended)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => handleArrayAdd('learningOutcomes', currentOutcome)}
              className="px-4 py-2 bg-ablr-primary text-white rounded-lg hover:bg-ablr-dark transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          <ul className="space-y-2">
            {(formData.learningOutcomes || []).map((item, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="flex-1">• {item}</span>
                <button
                  type="button"
                  onClick={() => handleArrayRemove('learningOutcomes', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">What's Included</h2>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            What's Included Description
          </label>
          <textarea
            value={formData.whatsIncluded || ''}
            onChange={(e) => handleInputChange('whatsIncluded', e.target.value)}
            rows={4}
            placeholder="e.g., 12+ hours of structured video lectures + Downloadable supervision templates + Reflective worksheets + Certificate of Completion + Lifetime access"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* How the Course Works */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">How the Course Works</h2>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            How the Course Works Description
          </label>
          <textarea
            value={formData.howItWorks || ''}
            onChange={(e) => handleInputChange('howItWorks', e.target.value)}
            rows={4}
            placeholder="e.g., Delivered via secure online learning platform + Pre-recorded lectures in 20–30 min segments + Progress tracking enabled + Complete at your own pace + Certificate issued upon completion"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* About Faculty */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">About Faculty</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={currentFaculty.name}
              onChange={(e) => setCurrentFaculty({ ...currentFaculty, name: e.target.value })}
              placeholder="Faculty Name *"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
            <input
              type="text"
              value={currentFaculty.role}
              onChange={(e) => setCurrentFaculty({ ...currentFaculty, role: e.target.value })}
              placeholder="Role *"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
            />
          </div>
          <textarea
            value={currentFaculty.bio}
            onChange={(e) => setCurrentFaculty({ ...currentFaculty, bio: e.target.value })}
            placeholder="Bio"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
          />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Faculty Image
            </label>
            {currentFaculty.image ? (
              <div className="relative inline-block">
                <img src={currentFaculty.image} alt="Preview" className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200" />
                <button
                  type="button"
                  onClick={() => setCurrentFaculty({ ...currentFaculty, image: '' })}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-ablr-primary transition-colors">
                <div className="flex flex-col items-center justify-center">
                  <Upload size={20} className="text-ablr-primary mb-1" />
                  <p className="text-xs text-gray-600">Upload Image</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setCurrentFaculty({ ...currentFaculty, image: reader.result as string })
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <button
            type="button"
            onClick={handleFacultyAdd}
            className="px-4 py-2 bg-ablr-primary text-white rounded-lg hover:bg-ablr-dark transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add Faculty Member
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {(formData.faculty || []).map((faculty, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold">{faculty.name}</h4>
                  <p className="text-sm text-gray-600">{faculty.role}</p>
                  <p className="text-sm text-gray-700 mt-2">{faculty.bio}</p>
                  {facultyImagePreviews[index] && (
                    <img src={facultyImagePreviews[index]} alt={faculty.name} className="w-20 h-20 object-cover rounded-lg mt-2" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleFacultyRemove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certification & Completion */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">Certification & Completion</h2>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Certification Description
          </label>
          <textarea
            value={formData.certificationDescription || ''}
            onChange={(e) => handleInputChange('certificationDescription', e.target.value)}
            rows={4}
            placeholder="e.g., Digital certificate issued by The Method Lab + Suitable for CPD documentation + Completion requires watching all modules (or passing assessment if any)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ablr-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif font-bold text-ablr-primary mb-6">FAQs</h2>
        <div className="space-y-4">
          <div className="space-y-2">
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
              className="px-4 py-2 bg-ablr-primary text-white rounded-lg hover:bg-ablr-dark transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Add FAQ
            </button>
          </div>
          <div className="space-y-2">
            {(formData.faqs || []).map((faq, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{faq.question}</h4>
                    <p className="text-sm text-gray-700">{faq.answer}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFAQRemove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-ablr-primary text-white rounded-lg hover:bg-ablr-dark transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={20} />
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Course' : 'Create Course'}
        </button>
      </div>
    </form>
  )
}

