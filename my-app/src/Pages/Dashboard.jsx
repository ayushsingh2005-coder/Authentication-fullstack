import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Main = () => {

   const [token, setToken] = useState(localStorage.getItem('token'))
    const navigate = useNavigate()
    
    // console.log(token)

    useEffect(() => {
        // Check token periodically to detect manual deletion from dev tools
        const checkToken = () => {
            const currentToken = localStorage.getItem('token')
            if (currentToken !== token) {
                setToken(currentToken)
            }
        }

        // Check immediately
        checkToken()

        // Set up interval to check every 1 second
        const interval = setInterval(checkToken, 1000)

        // Clean up interval on component unmount
        return () => clearInterval(interval)
    }, [token])

    useEffect(() => {
        if (!token) {
            navigate('/auth')
        }
    }, [token, navigate])

    // Don't render children if no token
    if (!token) {
        return null
    }

  return (
    <div className=' h-screen bg-gray-900'>
      <Navbar/>
      <Hero/>
      <Footer/>
      
    </div>
  )
}

export default Main
