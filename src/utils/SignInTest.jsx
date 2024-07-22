import React, {useContext, useState} from 'react'
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'
import {useAuth} from '../context/AuthContext'
import api from './api'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

function SignInTest({user, navigate, action}) {
 const {setAuthStatus, setUserRegistrationDataFromGoogle} = useAuth()
 const MySwal = withReactContent(Swal)

 const handleGoogleSuccess = async (credentialResponse) => {
  const decoded = jwtDecode(credentialResponse.credential)
  setUserRegistrationDataFromGoogle(decoded)
  if (action == 'login') {
   try {
    const postData = {
     username: decoded?.email,
     password: decoded?.sub,
    }

    const response = await api.post('/login.php', postData)
    if (response.data.success) {
     if (response?.data?.user_basic_info) {
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      localStorage.setItem('username', response.data.username)
      localStorage.setItem('user_id', response.data.user_id)
      setAuthStatus(true)
      MySwal.fire({
       icon: 'success',
       title: 'Logged in Successfully !',
      }).then(() => {
       navigate('/')
      })
     } else {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('username')
      localStorage.removeItem('user_id')
      localStorage.setItem('user_id', response.data.user_id)
      MySwal.fire({
       icon: 'info',
       title: 'Please fill basic information to proceed',
      }).then(() => {
       navigate(`/registration/${response?.data?.redirect_page}`)
      })
     }

     // Optionally, redirect or update UI to indicate successful login
    } else {
     console.error('Login failed:', response.data.message)
     MySwal.fire({
      icon: 'error',
      title: response.data.message,
     })
    }
   } catch (error) {
    MySwal.fire({
     icon: 'error',
     title: 'ERR-1001 Login failed, Please contact administrator',
    })
   }
  } else {
   try {
    const response = await api.post('/user_register.php', {
     password: decoded?.sub,
     confirm_password: decoded?.sub,
     email: decoded?.email,
    })
    console.log('🚀 ~ handleGoogleSuccess ~ response:', response)

    if (response?.data?.status?.message === 'registration_success') {
     localStorage.removeItem('access_token')
     localStorage.removeItem('refresh_token')
     localStorage.removeItem('username')
     localStorage.removeItem('user_id')
     localStorage.setItem('user_id', response.data?.status?.user_id)
     MySwal.fire({
      icon: 'info',
      title: 'Please fill basic information to proceed',
     }).then(() => {
      navigate(`/registration/${response?.data?.status?.redirect_page}`)
     })
    } else {
     MySwal.fire({
      icon: 'error',
      title: response.data.message || 'Registration failed, please try again',
     })
    }
   } catch (error) {
    MySwal.fire({
     icon: 'error',
     title: 'An error occurred. Please try again later.',
    })
   }
  }
 }

 return (
  <GoogleOAuthProvider
   clientId={'738104839523-i45021b20bvc3mso7mvk4ipictjegivs.apps.googleusercontent.com'}
  >
   <div className='googleLogin' style={{display: 'flex', justifyContent: 'center'}}>
    {user?.length > 0 ? null : (
     <GoogleLogin
      style={{}}
      onSuccess={handleGoogleSuccess}
      onError={() => console.log('Login Failed')}
     />
    )}
   </div>
  </GoogleOAuthProvider>
 )
}

export default SignInTest
