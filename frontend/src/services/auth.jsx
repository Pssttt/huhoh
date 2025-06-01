import { redirect } from 'react-router-dom'
import api from './api'

export const checkAuthStatus = async () => {
  try {
    const res = await api.get('/auth/check')

    const isAuthenticated = res.data?.authenticated

    if (isAuthenticated) {
      return true
    } else {
      clearAuthData()
      return false
    }
  } catch (err) {
    console.error(err)
    clearAuthData()
    return false
  }
}
export const publicRouteLoader = async () => {
  const isAuthenticated = await checkAuthStatus()
  if (isAuthenticated) {
    return redirect('/translations')
  }
  return null
}

export const protectedRouteLoader = async () => {
  const isAuthenticated = await checkAuthStatus()
  if (!isAuthenticated) {
    return redirect('/signin')
  }
  return null
}

export const clearAuthData = async () => {
  await api.post('/auth/signout')
}

export const storeAuthToken = (token) => {
  if (!token) return

  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
