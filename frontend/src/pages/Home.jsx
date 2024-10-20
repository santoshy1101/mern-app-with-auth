import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [loggedUser, setLoggedUser] = useState('')
  const [products, setProducts] = useState([])
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser')
    setLoggedUser(user)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('token')
    // setLoggedUser('');

    setTimeout(() => {
      navigate('/login')
    }, 500)
  }

  const fetchProducts = async () => {
    try {
      const url = `${apiUrl}/products`
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
      const response = await fetch(url, headers)

      const result = await response.json()
      setProducts(result)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold capitalize">
        Welcome {loggedUser}
      </h1>

      {products?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <div
              key={index} // Ensure to add a unique key for each item
              className="p-4 transition-transform transform border border-gray-300 rounded-lg shadow-md hover:scale-105"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <h3 className="text-xl font-bold text-green-600">
                {product.price}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available</p>
      )}

      <button
        onClick={handleLogout}
        className="px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Logout
      </button>
    </div>
  )
}

export default Home
