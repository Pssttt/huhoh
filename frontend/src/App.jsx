import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import TranslationPage from './pages/Translation/TranslationPage'
import LandingPage from './pages/Landing/LandingPage'
import SignUpPage from './pages/SignUp/SignUpPage'
import SignInPage from './pages/SignIn/SignInPage'
import ProfilePage from './pages/Profile/ProfilePage'
import SlangopediaPage from './pages/Slangopedia/SlangopediaPage'
import EditProfilePage from './pages/Profile/EditProfilePage'
import HistoryPage from './pages/History/HistoryPage'

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <Loader2 className="animate-spin" size={18} />
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/signin',
    element: <SignInPage />,
  },
  {
    path: '/translations',
    element: <TranslationPage />,
  },
  {
    path: '/slangopedia',
    element: <SlangopediaPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/profile/edit',
    element: <EditProfilePage />,
  },
  {
    path: '/profile/history',
    element: <HistoryPage />,
  },
])

const App = () => {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<LoadingFallback />}
      hydrationData={{}}
    />
  )
}

export default App
