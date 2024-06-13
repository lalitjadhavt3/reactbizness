import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import api from './api'

const AuthCheck = ({children}) => {
 const navigate = useNavigate()

 useEffect(() => {
  const checkToken = async () => {
   const token = localStorage.getItem('access_token')
   if (token) {
    try {
     const response = await api.get('/validate-token.php')
     if (!response.data.valid) {
      // Token is invalid, clear storage and redirect to login
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      navigate('/login')
     }
    } catch (error) {
     console.error('Token validation failed:', error)
     localStorage.removeItem('access_token')
     localStorage.removeItem('refresh_token')
     navigate('/login')
    }
   } else {
    navigate('/login')
   }
  }

  checkToken()
 }, [navigate])

 return children
}

export default AuthCheck
