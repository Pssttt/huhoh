import React, { useEffect } from 'react'
import DashboardNavBar from '@/components/DashboardNavBar'
import { useDataContext } from '@/hooks/useDataContext'
import { Loader2 } from 'lucide-react'
import { useFetch } from '@/hooks/useFetch'

const ProfilePage = () => {
  const { userData, allSavedTranslations } = useDataContext()
  const { fetchAllSavedTranslations } = useFetch()

  useEffect(() => {
    fetchAllSavedTranslations()
  }, [])

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader2 className="animate-spin w-12 h-12 text-primary" />
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
                className="w-30 h-30 rounded-full object-cover border-4 border-purple-100"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-gray-500 text-4xl font-bold">
                {userData.username}
              </h2>
              <span className="text-gray-400 text-xs">Joined in 2022</span>
            </div>
          </div>
          {/* Stats */}
          <div className="flex justify-center mt-8">
            <div className="bg-gray-50 rounded-xl px-85 py-6 flex flex-col items-center shadow w-full max-w-md">
              <span className="text-gray-500 text-4xl">Total</span>
              <span className="text-4xl font-bold text-purple-600">
                {allSavedTranslations.totalCount}
              </span>
            </div>
          </div>
        </section>

        {/* Saved Translations */}
        <section className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
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
