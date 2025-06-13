import DashboardNavBar from '@/components/DashboardNavBar'
import SlangCard from '@/components/SlangCard'
import { useDataContext } from '@/hooks/useDataContext'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const SlangopediaPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { slangTerms } = useDataContext()

  if (!slangTerms)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader2 className="animate-spin w-12 h-12 text-primary" />
      </div>
    )

  const filteredSlangs = slangTerms
    ? slangTerms.filter((slang) => {
        const matchesSearch =
          searchQuery === '' ||
          slang.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          slang.meaning.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesSearch
      })
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavBar />
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 sm:mb-12 text-gray-900 px-4 pt-8 sm:mt-8">
        Slangopedia
      </h1>
      <div className="sticky top-4 md:top-24 z-49 md:z-51 mx-4 sm:mx-24">
        <Search className="w-4 h-4 absolute left-2 top-4 text-text dark:text-text" />
        <Input
          type="search"
          placeholder="Search"
          className="w-full h-12 pl-8 bg-input-background ring-primary border-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8">
          {filteredSlangs.map((slang) => (
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

export default SlangopediaPage
