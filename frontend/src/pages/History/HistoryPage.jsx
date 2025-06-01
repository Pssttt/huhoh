import React, { useEffect, useState } from 'react'
import api from '@/services/api'
import DashboardNavBar from '@/components/DashboardNavBar'

// Date formatting utility
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`
}

// Table Headings
const HistoryTableHead = () => (
  <thead>
    <tr className="bg-gray-100">
      <th className="px-6 py-4 text-left text-xl font-semibold text-gray-700 uppercase tracking-wider">
        Original
      </th>
      <th className="px-6 py-4 text-left text-xl font-semibold text-gray-700 uppercase tracking-wider">
        Translation
      </th>
      <th className="px-6 py-4 text-left text-xl font-semibold text-gray-700 uppercase tracking-wider">
        Date
      </th>
    </tr>
  </thead>
)

// Table Body
const HistoryTableBody = ({ history }) => (
  <tbody className="divide-y divide-gray-200">
    {history.length === 0 ? (
      <tr>
        <td colSpan={3} className="text-center py-12 text-gray-500 italic">
          No history found.
        </td>
      </tr>
    ) : (
      history.map((item) => (
        <tr
          key={item.id}
          className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
        >
          <td className="px-6 py-4 text-md text-gray-900 whitespace-pre-wrap">
            {item.original}
          </td>
          <td className="px-6 py-4 text-md text-gray-900 whitespace-pre-wrap">
            {item.translated}
          </td>
          <td className="px-6 py-4 text-md text-gray-500">
            {item.createdAt ? formatDate(item.createdAt) : '-'}
          </td>
        </tr>
      ))
    )}
  </tbody>
)

// Main Page
const HistoryPage = () => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/translations/all')
        setHistory(res.data[0] || [])
      } catch (e) {
        console.error(e)
        setHistory([])
      }
    }
    fetchHistory()
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNavBar />
      <main className="flex flex-col items-center py-8 px-4">
        <section className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Translation History
          </h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <HistoryTableHead />
              <HistoryTableBody history={history} />
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HistoryPage
