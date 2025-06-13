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

const publicRoutes = [
  { path: '/', element: <LandingPage /> },
  { path: '/demo', element: <DemoPage /> },
  { path: '/signup', element: <SignUpPage /> },
  { path: '/signin', element: <SignInPage /> },
  { path: '/translate/:id', element: <SharedTranslation /> },
  { path: '/terms', element: <TermsPage /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '/contact', element: <ContactPage /> },
].map((route) => ({ ...route, loader: publicRouteLoader }))

const protectedRoutes = [
  { path: '/translations', element: <TranslationPage /> },
  { path: '/slangopedia', element: <SlangopediaPage /> },
  {
    path: '/profile',
    children: [
      { index: true, element: <ProfilePage /> },
      { path: 'edit', element: <EditProfilePage /> },
      { path: 'history', element: <HistoryPage /> },
    ],
  },
].map((route) => ({ ...route, loader: protectedRouteLoader }))

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes])

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
