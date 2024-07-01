import React, {useEffect, useRef, useState} from 'react'
import '../styles/SignIn.css'
import '../App.css'
import logo from '../assets/logo.png'
import {FaGoogle} from 'react-icons/fa'
import {FaEye, FaEyeSlash} from 'react-icons/fa6'
import CustomButton from '../components/CustomButton'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
 FormControl,
 IconButton,
 InputAdornment,
 InputLabel,
 OutlinedInput,
 TextField,
} from '@mui/material'
import {MdOutlineVisibilityOff, MdVisibility} from 'react-icons/md'
import {Link, useNavigate} from 'react-router-dom'
import api from '../utils/api'
import {useAuth} from '../context/AuthContext'
const SignIn = () => {
 const {setAuthStatus} = useAuth()
 const MySwal = withReactContent(Swal)
 const navigate = useNavigate()
 const [showPassword, setShowPassword] = useState(false)
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [errors, setErrors] = useState({})

 const handleClickShowPassword = () => setShowPassword((show) => !show)

 const handleSubmit = async (e) => {
  e.preventDefault()
  const errors = {}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // Simple email validation
  if (!email) {
   errors.email = 'Email is required'
  } else if (!emailRegex.test(email)) {
   errors.email = 'Invalid email format'
  }
  // Password validation (add more conditions as needed)
  if (password.length < 8) {
   errors.password = 'Password must be at least 8 characters long'
  }

  setErrors(errors)
  console.log('🚀 ~ handleSubmit ~ errors:', errors)

  // If no errors, proceed with sign-in logic
  if (Object.keys(errors).length === 0) {
   try {
    const postData = {
     username: email,
     password: password,
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
     }).then(() => {
      //form reset
      setEmail('')
      setPassword('')
     })
    }
   } catch (error) {
    MySwal.fire({
     icon: 'error',
     title: 'ERR-1001 Login failed, Please contact administrator',
    }).then(() => {
     //form reset
     setEmail('')
     setPassword('')
    })
   }
  }
 }

 return (
  <div className='container'>
   <div className='login-box'>
    <div className='logo-box'>
     <img src={logo} className='logo' alt='' />
    </div>
    <div className='text-box'>
     <h1>Sign In</h1>
     <h3 className='alllables'>Continue to Business Shelter</h3>
    </div>
    <form onSubmit={handleSubmit} style={{marginBottom: '10%'}} noValidate autoComplete='off'>
     <div className='form-box formCard'>
      <FormControl
       variant='outlined'
       error={!!errors.email}
       style={{width: '100%', marginTop: '20px'}}
      >
       <InputLabel htmlFor='outlined-adornment-email' shrink={true} style={{fontWeight: 'bold'}}>
        Email
       </InputLabel>
       <OutlinedInput
        id='outlined-adornment-email'
        type='email'
        label='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
       />
       {errors.email && <span className='error-text'>{errors.email}</span>}
      </FormControl>

      <FormControl
       variant='outlined'
       error={!!errors.password}
       style={{width: '100%', marginTop: '20px'}}
      >
       <InputLabel htmlFor='outlined-adornment-password' shrink={true} style={{fontWeight: 'bold'}}>
        Password
       </InputLabel>
       <OutlinedInput
        id='outlined-adornment-password'
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        endAdornment={
         <InputAdornment position='end'>
          <IconButton
           aria-label='toggle password visibility'
           onClick={handleClickShowPassword}
           edge='end'
          >
           {showPassword ? <MdVisibility /> : <MdOutlineVisibilityOff />}
          </IconButton>
         </InputAdornment>
        }
        inputProps={{autoComplete: 'off'}}
        label='Password'
       />
       {errors.password && <span className='error-text'>{errors.password}</span>}
      </FormControl>

      <div className='button-box'>
       {' '}
       <CustomButton
        btnText={'Login'}
        // logoIcon={<FaEye />}
        iconPosition={'start'}
        btnType={'submit'}
       />
      </div>
     </div>
    </form>
    <CustomButton btnText={'Login with Google'} logoIcon={<FaEye />} iconPosition={'start'} />
    <div className='Forgot_pass'>
     <Link to={'/forgot'}>Forgot your password?</Link>
    </div>

    <div className='ragister'>
     <span className='text-muted'>Don't have an account?</span> <a href='/register'>Register</a>
    </div>
   </div>
  </div>
 )
}

export default SignIn
