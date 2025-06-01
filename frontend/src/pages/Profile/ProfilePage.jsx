import React, { useEffect, useState } from 'react'
import DashboardNavBar from '@/components/DashboardNavBar'
import { useDataContext } from '@/hooks/useDataContext'
import { Loader2, BookOpen, Languages, Trash2 } from 'lucide-react'
import { useFetch } from '@/hooks/useFetch'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const navigate = useNavigate()
  const {
    userData,
    allSavedTranslations,
    getAllSavedTranslations,
    reloadUserData,
  } = useDataContext()
  const { unsaveTranslation } = useFetch()

  const [initialLoading, setInitialLoading] = useState(!userData)

  useEffect(() => {
    const loadUserData = async () => {
      try {
        await reloadUserData()
        await getAllSavedTranslations()
      } catch (error) {
        console.error('Failed to load user data:', error)
        toast.error('Failed to load profile data')
        navigate('/profile')
      } finally {
        setInitialLoading(false)
      }
    }

    loadUserData()
  }, [userData, reloadUserData, navigate])

  const handleUnsave = async (id) => {
    try {
      await unsaveTranslation(id)
      await getAllSavedTranslations()
      toast.success('Deleted saved translation')
    } catch (error) {
      toast.error('Failed to unsave translation')
      console.error('Error unsaving translation:', error)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-2 text-gray-500">Loading profile data...</p>
      </div>
    )
  }

  if (
    !allSavedTranslations ||
    !Array.isArray(allSavedTranslations.translations)
  ) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader2 className="animate-spin w-12 h-12 text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNavBar />
      <main className="flex flex-col items-center py-4 px-4">
        {/* Profile Header */}
        <section className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8 mb-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={userData.profilePic}
                alt="User avatar"
                className="w-30 h-30 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-purple-100"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-gray-500 text-4xl font-bold">
                {userData.username}
              </h2>
              <span className="text-gray-400 text-xs">
                Joined in {userData.createdAt}
              </span>
            </div>
          </div>
          {/* Stats */}
          <div className="flex justify-center gap-6 mt-8">
            <div className="min-w-32 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 flex flex-col items-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 w-full max-w-md border border-purple-100/50">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                <Languages className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-gray-600 text-lg font-medium mb-1">
                Total Translations
              </span>
              <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {allSavedTranslations.totalCount}
              </span>
            </div>
            <div className="min-w-32 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 flex flex-col items-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 w-full max-w-md border border-purple-100/50">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-gray-600 text-lg font-medium mb-1">
                Unique Slangs
              </span>
              <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {allSavedTranslations.totalUniqueSlangTerms}
              </span>
            </div>
          </div>
        </section>

        {/* Saved Translations */}
        <section className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8 mb-8">
          <h3 className="text-lg font-semibold mb-4">Saved Translations</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-md font-semibold text-gray-700 tracking-wide">
                    Original
                  </th>
                  <th className="px-6 py-4 text-left text-md font-semibold text-gray-700 tracking-wide">
                    Translation
                  </th>
                  <th className="px-6 py-4 text-left text-md font-semibold text-gray-700 tracking-wide">
                    Saved On
                  </th>
                  <th className="px-6 py-4 text-center text-md font-semibold text-gray-700 tracking-wide w-20">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allSavedTranslations.translations.map((translation, index) => (
                  <tr
                    key={translation.id}
                    className={`hover:bg-gray-50 transition-colors duration-150 ease-in-out ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <td className="px-6 py-4 text-md text-gray-900 whitespace-normal">
                      {translation.original}
                    </td>
                    <td className="px-6 py-4 text-md text-gray-900 whitespace-normal">
                      {translation.translated}
                    </td>
                    <td className="px-6 py-4 text-md text-gray-500 whitespace-nowrap">
                      {new Date(translation.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
                        title="Delete saved translation"
                        onClick={() => handleUnsave(translation.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProfilePage
