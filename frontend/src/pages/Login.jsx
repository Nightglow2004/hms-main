import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const endpoint = state === 'Sign Up' ? '/api/user/register' : '/api/user/login'
      const payload = state === 'Sign Up' ? { name, email, password } : { email, password }

      const { data } = await axios.post(backendUrl + endpoint, payload)

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        toast.success(`Welcome ${state === 'Sign Up' ? 'to QuickDoc' : 'back'}!`)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <form 
        onSubmit={onSubmitHandler} 
        className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-amber-100"
      >
        <div className="bg-amber-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">
            {state === 'Sign Up' ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="text-amber-100 mt-1">
            {state === 'Sign Up' ? 'Join QuickDoc today' : 'Login to your account'}
          </p>
        </div>

        <div className="p-6 space-y-5">
          {state === 'Sign Up' && (
            <div className="space-y-1">
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                type="text"
                required
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              type="email"
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              type="password"
              required
              placeholder="••••••••"
              minLength="6"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${
              isLoading 
                ? 'bg-amber-400 cursor-not-allowed' 
                : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              state === 'Sign Up' ? 'Create Account' : 'Login'
            )}
          </button>

          <div className="text-center text-gray-600">
            {state === 'Sign Up' ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setState('Login')}
                  className="text-amber-600 hover:text-amber-800 font-medium"
                >
                  Login here
                </button>
              </p>
            ) : (
              <p>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setState('Sign Up')}
                  className="text-amber-600 hover:text-amber-800 font-medium"
                >
                  Sign up here
                </button>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login