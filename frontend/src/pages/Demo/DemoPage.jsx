import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import { Copy, Loader2 } from 'lucide-react'
import api from '@/services/api'
import LandingNavBar from '@/components/Landing/LandingNavBar'

const DemoPage = () => {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)

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

  const translateText = async () => {
    if (!inputText.trim()) {
      toast.warning('Please enter some text to translate')
      return
    }
    setIsTranslating(true)

    const formData = new FormData()
    formData.append('input', inputText)

    try {
      const translationPromise = api
        .post('/translations/demo', formData)
        .then((response) => {
          return response.data.translated
        })

      toast.promise(translationPromise, {
        loading: 'Translating...',
        success: (translatedText) => {
          setOutputText(translatedText)
          setIsTranslating(false)
          return 'Translation completed!'
        },
        error: (error) => {
          console.error('Translation error:', error)
          setIsTranslating(false)
          return 'Translation failed. Please try again.'
        },
      })
    } catch (error) {
      console.error('Translation error:', error)
      throw error
    }
  }

  const handleTranslate = async () => {
    try {
      await translateText()
    } catch (e) {
      console.error('Translation error:', e)
    }
  }

  return (
    <>
      <LandingNavBar />
      <div className="flex my-12 flex-col lg:flex-row lg:items-center lg:justify-around gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full lg:max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <Label
              htmlFor="input"
              className="font-bold text-2xl sm:text-3xl lg:text-4xl"
            >
              Gen Z Mode
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(inputText, 'Input')}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            placeholder="Type your slang here..."
            id="input"
            className="focus:ring-purple-200 min-h-[150px] sm:min-h-[180px] lg:min-h-[200px] mb-4"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="flex justify-end">
            <Button disabled={isTranslating} onClick={handleTranslate}>
              {isTranslating && <Loader2 className="w-4 h-4 animate-spin" />}
              {isTranslating ? 'Translating...' : 'Translate'}
            </Button>
          </div>
        </div>

        <div className="flex flex-col w-full lg:max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <Label
              htmlFor="output"
              className="font-bold text-2xl sm:text-3xl lg:text-4xl"
            >
              Readable English Mode
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(outputText, 'Output')}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            placeholder="Translation will appear here..."
            id="output"
            className="focus:ring-purple-200 min-h-[150px] sm:min-h-[180px] lg:min-h-[200px] mb-4"
            value={outputText}
            readOnly
          />
        </div>
      </div>
    </>
  )
}

export default DemoPage
