import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SigninNav from '@/components/SignIn/SignInNav'
import { toast } from 'sonner'
import api from '@/services/api'
import { Eye, EyeOff } from 'lucide-react'

const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const SignInPage = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await api.post(`/auth/signin`, {
        email: data.email,
        password: data.password,
      })
      if (res.data.success) {
        toast.success('Login Successful')
        setTimeout(() => {
          navigate('/translations')
        }, 750)
      } else {
        setTimeout(() => {
          toast.error(res.data?.msg || 'Login failed')
        }, 750)
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Server error')
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top navigation bar */}
      <SigninNav />

      {/* Centered sign-in form */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-6 space-x-6 border-b border-gray-200">
            <span className="text-purple-600 font-semibold pb-2 border-b-2 border-purple-600">
              Sign in
            </span>
            <Link
              to="/signup"
              className="text-gray-500 hover:text-purple-600 pb-2 border-b-2 border-transparent hover:border-purple-500 transition-all"
            >
              Sign up
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

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}

            {/* Link to Sign Up */}
            <div className="text-sm text-center text-gray-500">
              Create a new Account?{' '}
              <Link to="/signup" className="text-purple-600 hover:underline">
                Sign Up
              </Link>
            </div>

            {/* Submit button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-40 bg-purple-600 hover:bg-purple-700 rounded-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>

            {/* Demo mode */}
            <div className="flex justify-center w-full">
              <Link to="/demo">
                <span className="text-sm text-gray-400 cursor-pointer hover:underline">
                  Or, try the demo mode
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
