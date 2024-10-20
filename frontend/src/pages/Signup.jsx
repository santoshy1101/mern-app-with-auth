import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../../utils'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const apiUrl = import.meta.env.VITE_API_URL

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password } = formData
    if (!name || !email || !password) {
      return handleError('name, email, and password are required')
    }

    try {
      const url = `${apiUrl}/auth/signup`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      const { success, message, error } = result
      if (success) {
        handleSuccess(message)
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      } else if (error) {
        const details = error?.details[0]?.message
        handleError(details)
      } else if (!success) {
        handleError(message)
      }
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link className="text-sm text-gray-600" to="/login">
            Already have an account?{' '}
            <span className="text-blue-600 hover:underline">Log In</span>
          </Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Signup
