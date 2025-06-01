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

  if (!allSavedTranslations) {
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
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-100"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-gray-500 text-lg font-bold">
                {userData.username}
              </h2>
              <span className="text-gray-400 text-xs">Joined in 2022</span>
            </div>
          </div>
          {/* Stats */}
          <div className="flex justify-center mt-8">
            <div className="bg-gray-50 rounded-xl px-85 py-6 flex flex-col items-center shadow w-full max-w-md">
              <span className="text-gray-500 text-base">Total</span>
              <span className="text-4xl font-bold text-purple-600">
                {allSavedTranslations.totalCount}
              </span>
            </div>
          </div>
        </section>

        {/* Saved Translations */}
        <section className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-lg font-semibold mb-4">Saved Translations</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left font-medium text-gray-700">
                    Slang
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">
                    Translation
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">
                    Saved On
                  </th>
                </tr>
              </thead>
              <tbody>
                {allSavedTranslations.translations.map((translation) => (
                  <tr key={translation.id} className="border-t">
                    <td className="px-4 py-2">{translation.original}</td>
                    <td className="px-4 py-2">{translation.translated}</td>
                    <td className="px-4 py-2 text-sm text-gray-500">
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
