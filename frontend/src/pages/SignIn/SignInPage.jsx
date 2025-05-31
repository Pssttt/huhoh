import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SignupNav from '@/components/Signup/SignupNav' // Top navbar component

// Zod schema for Sign In
const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const SignIn = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      // Simulate API call
      console.log('Signing in with:', data)
      setTimeout(() => {
        setLoading(false)
        navigate('/dashboard') // Redirect after login
      }, 1000)
    } catch (err) {
      setLoading(false)
      console.error('Sign in error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <SignupNav />

      {/* Form Container */}
      <div className="flex items-center justify-center px-4 pt-12">
        <div className="w-full max-w-md">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-6 space-x-6 border-b border-gray-200">
            <span className="text-purple-600 font-semibold pb-2 border-b-2 border-purple-600">
              Sign In
            </span>
            <Link
              to="/signup"
              className="text-gray-500 hover:text-purple-600 pb-2 border-b-2 border-transparent hover:border-purple-500 transition-all"
            >
              Sign Up
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input type="email" placeholder="Email" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Link to Sign Up */}
            <div className="text-sm text-center text-gray-500">
              Create a new account?{' '}
              <Link to="/signup" className="text-purple-600 hover:underline">
                Sign Up
              </Link>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>

            {/* Demo mode */}
            <div className="text-center text-sm text-gray-400">
              Or, try the demo mode
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
