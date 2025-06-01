import { Link, useNavigate } from 'react-router-dom'
import { useDataContext } from '@/hooks/useDataContext'
import { Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { clearAuthData } from '@/services/auth'

const DashboardNavBar = () => {
  const { userData } = useDataContext()

  const menuRef = useRef(null)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  const handleSignOut = async () => {
    await clearAuthData()
    navigate('/signin')
  }

  const isActive = (path) => location.pathname.startsWith(path)
  const navItems = [
    {
      name: 'translations',
      icon: '/icons/translate.svg',
      link: '/translations',
    },
    {
      name: 'slangopedia',
      icon: '/icons/dictionary.svg',
      link: '/slangopedia',
    },
  ]

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader2 className="animate-spin w-12 h-12 text-primary" />
      </div>
    )
  }

  return (
    <header className="sticky top-0 z-49 mb-8 flex flex-row justify-between items-center px-6 lg:px-12 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
      <Link
        to="/translations"
        aria-label="Logo"
        className="flex items-center gap-3 group"
      >
        <div className="relative">
          <img
            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 transition-transform group-hover:scale-105 object-cover"
            alt="HuhOh logo"
            src="/logo.svg"
            width={48}
            height={48}
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </div>
        <span className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
          HuhOh <span className="text-gray-500 font-normal">(H O)</span>
        </span>
      </Link>
      <nav aria-label="Dashboard navigation">
        <ul className="flex flex-row gap-6 items-center">
          {navItems.map((navItem) => {
            const active = isActive(navItem.link)
            return (
              <li key={navItem.name}>
                <Link
                  to={navItem.link}
                  className={`group flex items-center justify-center p-2 rounded-lg transition-colors ${
                    active
                      ? 'bg-purple-100/80 text-purple-600'
                      : 'hover:bg-gray-100/50 text-gray-600'
                  }`}
                >
                  <img
                    src={navItem.icon}
                    alt={navItem.name}
                    className={`w-6 h-6 transition-all ${
                      active
                        ? 'opacity-100'
                        : 'opacity-70 group-hover:opacity-100'
                    }`}
                    width={24}
                    height={24}
                    loading="lazy"
                  />
                </Link>
              </li>
            )
          })}
          <li>
            <img
              src={userData.profilePic}
              alt="Profile"
              loading="lazy"
              onClick={() => setMenuOpen((open) => !open)}
              className={`w-8 h-8 lg:w-12 lg:h-12 rounded-full cursor-pointer object-cover transition-all ${
                isActive('/profile')
                  ? 'border-2 border-primary'
                  : 'border-2 border-transparent hover:border-purple-200'
              }`}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setMenuOpen(false)
                    navigate('/profile')
                  }}
                >
                  View Profile Page
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setMenuOpen(false)
                    navigate('/profile/edit')
                  }}
                >
                  Edit Profile Page
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setMenuOpen(false)
                    navigate('/profile/history')
                  }}
                >
                  View History
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default DashboardNavBar
