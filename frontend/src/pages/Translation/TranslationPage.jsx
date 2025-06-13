import DashboardNavBar from '@/components/DashboardNavBar'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import { ArrowRightLeft, Copy, Loader2, Share } from 'lucide-react'
import api from '@/services/api'
import SlangCard from '@/components/SlangCard'
import { useDataContext } from '@/hooks/useDataContext'
import { useFetch } from '@/hooks/useFetch'

const TranslationPage = () => {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [id, setId] = useState('')
  const [isGenZToEnglish, setIsGenZToEnglish] = useState(true)
  const [isTranslating, setIsTranslating] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const { trendSlangs, getAllSavedTranslations } = useDataContext()
  const { saveTranslation } = useFetch()

  const handleDirectionToggle = () => {
    setIsGenZToEnglish(!isGenZToEnglish)
    setInputText('')
    setOutputText('')
    setId('')
  }

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

  const inputLabel = isGenZToEnglish ? 'Gen Z Mode' : 'Readable English Mode'
  const outputLabel = isGenZToEnglish ? 'Readable English Mode' : 'Gen Z Mode'
  const inputPlaceholder = isGenZToEnglish
    ? 'Type your slang here...'
    : 'Type your English text here...'
  const outputPlaceholder = isGenZToEnglish
    ? 'Translation will appear here...'
    : 'Slang translation will appear here...'

  const translateText = async () => {
    if (!inputText.trim()) {
      toast.warning('Please enter some text to translate')
      return
    }
    setIsTranslating(true)

    const formData = new FormData()
    formData.append('input', inputText)

    try {
      const endpoint = isGenZToEnglish
        ? '/translations/ZtoEN'
        : '/translations/ENtoZ'

      const translationPromise = api
        .post(endpoint, formData)
        .then((response) => {
          setId(response.data.id)
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

  const handleSave = async (id) => {
    if (!outputText.trim()) {
      toast.warning('Please enter some text to translate')
      return
    }

    try {
      const res = await saveTranslation(id)
      if (!res) {
        toast.error('Translation already saved!')
      } else {
        toast.success('Successfully Saved!')
        await getAllSavedTranslations()
      }
    } catch (e) {
      console.error('Error saving translation:', e)
      toast.error('Failed to save translation')
    }
  }

  const handleShare = async () => {
    if (!outputText.trim() || !id) {
      toast.warning('Please translate some text first')
      return
    }

    try {
      setIsSharing(true)

      const shareUrl = `${window.location.origin}/translate/${id}`

      if (navigator.share) {
        await navigator.share({
          title: 'HuhOh Translation',
          text: `Check out this translation: "${inputText}" → "${outputText}"`,
          url: shareUrl,
        })
        toast.success('Translation shared successfully!')
      } else {
        await navigator.clipboard.writeText(shareUrl)
        toast.success('Share link copied to clipboard!')
      }
    } catch (error) {
      console.error('Share error:', error)

      try {
        const shareUrl = `${window.location.origin}/translate/${id}`
        await navigator.clipboard.writeText(shareUrl)
        toast.success('Share link copied to clipboard!')
      } catch (clipboardError) {
        toast.error('Failed to share translation')
        console.error('Clipboard error:', clipboardError)
      }
    } finally {
      setIsSharing(false)
    }
  }

  if (!trendSlangs)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader2 className="animate-spin w-12 h-12 text-primary" />
      </div>
    )

  return (
    <div className="bg-gray-50">
      <DashboardNavBar />
      <div className="pt-12 lg:mt-0 flex flex-col lg:flex-row lg:items-center lg:justify-around gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full lg:max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <Label
              htmlFor="input"
              className="font-bold text-2xl sm:text-3xl lg:text-4xl"
            >
              {inputLabel}
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(inputText, inputLabel)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            placeholder={inputPlaceholder}
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

        <div className="flex justify-center lg:block">
          <Button
            variant="outline"
            className="hover:bg-white transition-all duration-200 hover:scale-105"
            onClick={handleDirectionToggle}
            title={`Switch to ${isGenZToEnglish ? 'English → Gen Z' : 'Gen Z → English'} mode`}
          >
            <ArrowRightLeft />
          </Button>
        </div>

        <div className="flex flex-col w-full lg:max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <Label
              htmlFor="output"
              className="font-bold text-2xl sm:text-3xl lg:text-4xl"
            >
              {outputLabel}
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(outputText, outputLabel)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            placeholder={outputPlaceholder}
            id="output"
            className="focus:ring-purple-200 min-h-[150px] sm:min-h-[180px] lg:min-h-[200px] mb-4"
            value={outputText}
            onChange={(e) => setOutputText(e.target.value)}
            readOnly
          />
          <div className="flex justify-between">
            <Button
              variant="secondary"
              onClick={() => handleSave(id)}
              className="lg:w-24"
              disabled={!outputText.trim() || !id}
            >
              Save
            </Button>
            <Button
              className="lg:w-24"
              onClick={handleShare}
              disabled={!outputText.trim() || !id || isSharing}
            >
              {isSharing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Share className="w-4 h-4" />
              )}
              {isSharing ? 'Sharing...' : 'Share'}
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center m-4">
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Current mode:{' '}
          {isGenZToEnglish ? 'Gen Z → English' : 'English → Gen Z'}
        </span>
      </div>

      <div className="flex flex-col space-y-8 justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
          Slang Words of the day
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl gap-4 sm:gap-6 lg:gap-8">
          {trendSlangs.map((slang) => (
            <SlangCard
              key={slang.id}
              term={slang.term}
              meaning={slang.meaning}
              example={slang.example}
              onClick={() => {
                navigator.clipboard.writeText(slang.term)
                toast.success('Copied to clipboard')
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TranslationPage
