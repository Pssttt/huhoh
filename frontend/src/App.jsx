import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { publicRouteLoader, protectedRouteLoader } from './services/auth'
import { Loader2 } from 'lucide-react'
import TranslationPage from './pages/Translation/TranslationPage'
import LandingPage from './pages/Landing/LandingPage'
import SignUpPage from './pages/SignUp/SignUpPage'
import SignInPage from './pages/SignIn/SignInPage'
import ProfilePage from './pages/Profile/ProfilePage'
import SlangopediaPage from './pages/Slangopedia/SlangopediaPage'
import EditProfilePage from './pages/Profile/EditProfilePage'
import HistoryPage from './pages/History/HistoryPage'
import DemoPage from './pages/Demo/DemoPage'
import SharedTranslation from './pages/SharedTranslation/SharedTranslation'
import TermsPage from './pages/Footer/TermsPage'
import PrivacyPage from './pages/Footer/PrivacyPage'
import ContactPage from './pages/Footer/ContactPage'

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <Loader2 className="animate-spin" size={18} />
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    loader: publicRouteLoader,
  },
  {
    path: '/demo',
    element: <DemoPage />,
    loader: publicRouteLoader,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
    loader: publicRouteLoader,
  },
  {
    path: '/signin',
    element: <SignInPage />,
    loader: publicRouteLoader,
  },
  {
    path: '/translate/:id',
    element: <SharedTranslation />,
  },
  {
    path: '/translations',
    element: <TranslationPage />,
    loader: protectedRouteLoader,
  },
  {
    path: '/slangopedia',
    element: <SlangopediaPage />,
    loader: protectedRouteLoader,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    loader: protectedRouteLoader,
  },
  {
    path: '/profile/edit',
    element: <EditProfilePage />,
    loader: protectedRouteLoader,
  },
  {
    path: '/profile/history',
    element: <HistoryPage />,
    loader: protectedRouteLoader,
  },
  {
    path: '/terms',
    element: <TermsPage />,
  },
  {
    path: '/privacy',
    element: <PrivacyPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
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
