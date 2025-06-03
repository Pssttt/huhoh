import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDataContext } from '@/hooks/useDataContext'
import { Loader2, Languages, BookOpen, User } from 'lucide-react'
import { useRef, useState } from 'react'
import { clearAuthData } from '@/services/auth'

const DashboardNavBar = () => {
  const { userData } = useDataContext()
  const location = useLocation()
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await clearAuthData()
    navigate('/signin')
  }

  const isActive = (path) => location.pathname.startsWith(path)

  const navItems = [
    {
      name: 'Translate',
      icon: '/icons/translate.svg',
      mobileIcon: Languages,
      link: '/translations',
    },
    {
      name: 'Slangopedia',
      icon: '/icons/dictionary.svg',
      mobileIcon: BookOpen,
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
    <>
      {/* Desktop/Tablet Header */}
      <header className="hidden md:flex sticky top-0 z-52 mb-8 flex-row justify-between items-center px-6 lg:px-12 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
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
            <li className="relative" ref={menuRef}>
              <img
                src={userData.profilePic}
                alt="Profile"
                loading="lazy"
                onClick={() => setMenuOpen((open) => !open)}
                className={`w-10 h-10 lg:w-16 lg:h-16 p-0.5 rounded-full cursor-pointer object-cover transition-all ${
                  isActive('/profile')
                    ? 'border-4 border-primary'
                    : 'border-4 border-transparent hover:border-purple-200'
                }`}
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      navigate('/profile')
                      setMenuOpen(false)
                    }}
                  >
                    View Profile
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
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setMenuOpen(false)
                      navigate('/profile/edit')
                    }}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    onClick={() => {
                      handleSignOut()
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center py-2">
          {navItems.map((navItem) => {
            const active = isActive(navItem.link)
            const IconComponent = navItem.mobileIcon
            return (
              <Link
                key={navItem.name}
                to={navItem.link}
                className={`flex flex-col items-center justify-center p-3 min-w-0 flex-1 transition-colors ${
                  active ? 'text-purple-600' : 'text-gray-600'
                }`}
              >
                <IconComponent
                  size={24}
                  className={`mb-1 ${active ? 'text-purple-600' : 'text-gray-600'}`}
                />
                <span
                  className={`text-xs font-medium ${active ? 'text-purple-600' : 'text-gray-600'}`}
                >
                  {navItem.name}
                </span>
              </Link>
            )
          })}
          <button
            onClick={() => setMenuOpen(true)}
            className={`flex flex-col items-center justify-center p-3 min-w-0 flex-1 transition-colors ${
              isActive('/profile') ? 'text-purple-600' : 'text-gray-600'
            }`}
          >
            {userData.profilePic ? (
              <img
                src={userData.profilePic}
                alt="Profile"
                className={`w-8 h-8 rounded-full object-cover mb-1 ${
                  isActive('/profile') ? 'border-2 border-purple-600' : ''
                }`}
              />
            ) : (
              <User
                size={24}
                className={`mb-1 ${isActive('/profile') ? 'text-purple-600' : 'text-gray-600'}`}
              />
            )}
            <span
              className={`text-xs font-medium ${isActive('/profile') ? 'text-purple-600' : 'text-gray-600'}`}
            >
              Profile
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Profile Menu Modal */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/80 bg-opacity-50"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute bottom-16 left-0 right-0 bg-white rounded-t-lg p-4 mx-4 mb-4 rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
              <img
                src={userData.profilePic}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">
                  {userData.name || 'User'}
                </h3>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <button
                className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => {
                  setMenuOpen(false)
                  navigate('/profile')
                }}
              >
                View Profile
              </button>
              <button
                className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => {
                  setMenuOpen(false)
                  navigate('/profile/history')
                }}
              >
                View History
              </button>
              <button
                className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => {
                  setMenuOpen(false)
                  navigate('/profile/edit')
                }}
              >
                Edit Profile
              </button>
              <button
                className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => {
                  setMenuOpen(false)
                  handleSignOut()
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DashboardNavBar
