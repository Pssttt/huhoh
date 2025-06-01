import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Loader2, Copy, ArrowLeft, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import api from '@/services/api'

const SharedTranslation = () => {
  const { id } = useParams()
  const [translation, setTranslation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        setLoading(true)
        const response = await api.get(`/translations/shared/${id}`)
        setTranslation(response.data)
      } catch (err) {
        console.error('Error fetching shared translation:', err)
        setError(err.response?.data?.message || 'Translation not found')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTranslation()
    }
  }, [id])

  const handleCopy = (text, label) => {
    if (!text) {
      toast.warning(`Nothing to copy from ${label}`)
      return
    }
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`${label} copied to clipboard!`)
      })
      .catch((err) => {
        toast.error('Failed to copy text')
        console.error('Failed to copy text: ', err)
      })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-12 h-12 text-purple-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Translation Not Found
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              className="rounded-full w-10 h-10 transition-transform group-hover:scale-105 object-cover"
              alt="HuhOh logo"
              src="/logo.svg"
              width={40}
              height={40}
              loading="lazy"
            />
            <span className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
              HuhOh <span className="text-gray-500 font-normal">(H O)</span>
            </span>
          </Link>
          <Link to="/translations">
            <Button variant="outline">
              Try HuhOh
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Shared Translation
            </h1>
            <p className="text-gray-600">
              Check out this translation created with HuhOh
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Input Section */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <Label className="font-bold text-xl">Original</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(translation.original, 'Original')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={translation.original}
                readOnly
                className="min-h-[150px] bg-gray-50"
              />
            </div>

            {/* Arrow Indicator */}
            <div className="flex items-center justify-center lg:flex-col">
              <div className="bg-purple-100 p-3 rounded-full">
                <div className="w-6 h-6 flex items-center justify-center">
                  <span className="text-purple-600 font-bold">→</span>
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <Label className="font-bold text-xl">Translation</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleCopy(translation.translated, 'Translation')
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={translation.translated}
                readOnly
                className="min-h-[150px] bg-gray-50"
              />
            </div>
          </div>

          {/* Translation Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {translation.createdAt && (
                <div className="text-sm text-gray-500">
                  Created:{' '}
                  {new Date(translation.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-8 text-center p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Want to create your own translations?
            </h3>
            <p className="text-gray-600 mb-4">
              Join HuhOh and start translating between Gen Z slang and English!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/signup">
                <Button>Get Started Free</Button>
              </Link>
              <Link to="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SharedTranslation
