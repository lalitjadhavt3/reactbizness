import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import api from './api'
import {useAuth} from '../context/AuthContext' // Import AuthContext

const AuthCheck = ({children}) => {
 const navigate = useNavigate()
 const {setAuthStatus} = useAuth() // Access setAuthStatus from AuthContext

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
      setAuthStatus(false) // Set authentication status in context
     } else {
      setAuthStatus(true) // Set authentication status in context
     }
    } catch (error) {
     console.error('Token validation failed:', error)
     localStorage.removeItem('access_token')
     localStorage.removeItem('refresh_token')
     navigate('/login')
     setAuthStatus(false) // Set authentication status in context
    }
   } else {
    navigate('/login')
    setAuthStatus(false) // Set authentication status in context
   }
  }

  checkToken()
 }, [navigate, setAuthStatus])

 return children
}

export default AuthCheck
