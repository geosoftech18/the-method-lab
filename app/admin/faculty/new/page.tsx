'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload, X, Save, Loader, User, Briefcase, FileText, Image as ImageIcon, Linkedin } from 'lucide-react'

function FacultyFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams?.get('id') || null
  const isEditing = !!editId

  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(isEditing)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && editId) {
      const loadFaculty = async () => {
        try {
          const response = await fetch(`/api/faculty/${editId}`, {
            credentials: 'include',
          })
          const result = await response.json()
          
          if (result.success && result.data) {
            const faculty = result.data
            setName(faculty.name)
            setRole(faculty.role)
            setBio(faculty.bio)
            setImage(faculty.image)
            setLinkedinUrl(faculty.linkedinUrl || '')
          } else {
            alert('Failed to load faculty member')
            router.push('/admin/faculty')
          }
        } catch (error) {
          console.error('Error loading faculty:', error)
          alert('Failed to load faculty member')
          router.push('/admin/faculty')
        } finally {
          setLoading(false)
        }
      }
      loadFaculty()
    } else {
      setLoading(false)
    }
  }, [editId, isEditing, router])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert('Please enter a name for the faculty member')
      return
    }

    if (!role.trim()) {
      alert('Please enter a role for the faculty member')
      return
    }

    if (!bio.trim()) {
      alert('Please enter a bio for the faculty member')
      return
    }

    setIsSubmitting(true)
    
    try {
      const facultyData = {
        name: name.trim(),
        role: role.trim(),
        bio: bio.trim(),
        image: image || null,
        linkedinUrl: linkedinUrl.trim() || null,
      }

      let response
      if (isEditing && editId) {
        response = await fetch(`/api/faculty/${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(facultyData),
        })
      } else {
        response = await fetch('/api/faculty', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(facultyData),
        })
      }

      const result = await response.json()

      if (result.success) {
        alert(`Faculty member ${isEditing ? 'updated' : 'created'} successfully!`)
        router.push('/admin/faculty')
      } else {
        throw new Error(result.error || 'Failed to save faculty member')
      }
    } catch (error: any) {
      console.error('Error saving faculty:', error)
      alert(error.message || 'Error saving faculty member. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-ablr-primary/30 border-t-ablr-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading faculty member...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <Link 
          href="/admin/faculty"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-ablr-primary mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Faculty</span>
        </Link>
        <h1 className="text-3xl font-serif font-bold text-ablr-primary mb-2">
          {isEditing ? 'Edit Faculty Member' : 'Add New Faculty Member'}
        </h1>
        <p className="text-gray-600">
          {isEditing ? 'Update faculty member information' : 'Create a new faculty member profile'}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="space-y-6 max-w-3xl">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <User size={16} />
              Faculty Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter faculty member's name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Briefcase size={16} />
              Role <span className="text-red-500">*</span>
            </label>
            <input
              id="role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter faculty member's role"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <ImageIcon size={16} />
              Profile Image
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-dashed border-2 border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors"
                >
                  <Upload size={24} className="text-gray-400" />
                  <span className="text-gray-600">Click to upload image</span>
                </button>
              </div>
              
              {image && (
                <div className="flex-1">
                  <div className="relative">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* LinkedIn URL */}
          <div>
            <label htmlFor="linkedinUrl" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Linkedin size={16} />
              LinkedIn URL
            </label>
            <input
              id="linkedinUrl"
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors"
            />
            <p className="text-xs text-gray-500 mt-1">Optional: Enter the full LinkedIn profile URL</p>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FileText size={16} />
              Bio <span className="text-red-500">*</span>
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter faculty member's bio"
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <Link
              href="/admin/faculty"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              onClick={handleSubmit}
              disabled={!name.trim() || !role.trim() || !bio.trim() || isSubmitting}
              className="px-6 py-3 bg-ablr-primary text-white rounded-lg font-semibold hover:bg-ablr-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save size={18} />
                  {isEditing ? 'Update Faculty Member' : 'Create Faculty Member'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FacultyFormPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-ablr-primary/30 border-t-ablr-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <FacultyFormContent />
    </Suspense>
  )
}

