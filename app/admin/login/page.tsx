'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ArrowRight, Loader } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<'email' | 'verify'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const ADMIN_EMAILS = [
    'pranavkhandekar152@gmail.com',
    'drangananandy@gmail.com'
  ]

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    const isAdmin = ADMIN_EMAILS.some(adminEmail => 
      email.toLowerCase() === adminEmail.toLowerCase()
    )

    if (!isAdmin) {
      setError('Access denied. Only authorized administrators can login.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (result.success) {
        setMessage('Verification code sent to your email. Please check your inbox.')
        setStep('verify')
      } else {
        setError(result.error || 'Failed to send verification code')
      }
    } catch (err) {
      console.error('Error sending code:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    setError('')
    setMessage('')
    setCode('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (result.success) {
        setMessage('Verification code resent to your email. Please check your inbox.')
      } else {
        setError(result.error || 'Failed to resend verification code')
      }
    } catch (err) {
      console.error('Error resending code:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      })

      const result = await response.json()

      if (result.success) {
        setMessage('Login successful! Redirecting...')
        // Use window.location for full page reload to ensure cookie is available
        setTimeout(() => {
          window.location.href = '/admin'
        }, 500)
      } else {
        setError(result.error || 'Invalid verification code')
      }
    } catch (err) {
      console.error('Error verifying code:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ablr-primary via-ablr-primary/95 to-ablr-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-ablr-primary mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600">
              {step === 'email' 
                ? 'Enter your email to receive a verification code'
                : 'Enter the verification code sent to your email'
              }
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {message && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{message}</p>
            </div>
          )}

          {step === 'email' ? (
            <form onSubmit={handleSendCode} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@example.com"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-ablr-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-ablr-dark transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div>
                <label htmlFor="code" className="block text-sm font-semibold text-gray-700 mb-2">
                  Verification Code
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    placeholder="000000"
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ablr-primary focus:outline-none transition-colors text-center text-2xl tracking-widest font-mono"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Enter the 6-digit code sent to {email}
                </p>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={loading}
                  className="mt-2 text-sm text-ablr-primary hover:text-ablr-dark font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Sending...' : "Didn't receive code? Resend"}
                </button>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setStep('email')
                    setCode('')
                    setError('')
                    setMessage('')
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  className="flex-1 bg-ablr-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-ablr-dark transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Login</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

