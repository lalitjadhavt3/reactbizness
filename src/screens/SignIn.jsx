import React, {useEffect, useRef, useState} from 'react'
import '../styles/SignIn.css'
import '../App.css'
import logo from '../assets/logo.png'
import {FaGoogle} from 'react-icons/fa'
import {FaEye, FaEyeSlash} from 'react-icons/fa6'
import CustomButton from '../components/CustomButton'
import {
 FormControl,
 IconButton,
 InputAdornment,
 InputLabel,
 OutlinedInput,
 TextField,
} from '@mui/material'
import {MdOutlineVisibilityOff, MdVisibility} from 'react-icons/md'
const SignIn = () => {
 const [showPassword, setShowPassword] = useState(false)
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [errors, setErrors] = useState({})

 const handleClickShowPassword = () => setShowPassword((show) => !show)

 const handleSubmit = (e) => {
  e.preventDefault()
  const errors = {}

  // Simple email validation

  // Password validation (add more conditions as needed)
  if (password.length < 8) {
   alert('Password must be at least 8 characters long')
   errors.password = 'Password must be at least 8 characters long'
  }

  setErrors(errors)

  // If no errors, proceed with sign-in logic
  if (Object.keys(errors).length === 0) {
   // Your sign-in logic here
   console.log('Sign in successful!')
  }
 }

 const emailRef = useRef(null)
 useEffect(() => {
  if (errors.email) {
   emailRef.current.value = ''
  }
 }, [errors.email])
 const passwordRef = useRef(null)
 useEffect(() => {
  if (errors.password) {
   passwordRef.current.value = ''
  }
 }, [errors.password])
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
    <form onSubmit={handleSubmit} style={{marginBottom: '10%'}}>
     <div className='form-box card'>
      <FormControl variant='outlined' style={{width: '100%', marginTop: '20px'}}>
       <InputLabel htmlFor='outlined-adornment-email'>Email</InputLabel>
       <OutlinedInput id='outlined-adornment-email' type='text' label='Email' />
      </FormControl>

      <FormControl variant='outlined' style={{width: '100%', marginTop: '20px'}}>
       <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
       <OutlinedInput
        id='outlined-adornment-password'
        type={showPassword ? 'text' : 'password'}
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
        label='Password'
       />
      </FormControl>

      <div className='button-box'>
       {' '}
       <CustomButton
        btnText={'Login'}
        // logoIcon={<FaEye />}
        iconPosition={'start'}
       />
      </div>
     </div>
    </form>
    <CustomButton btnText={'Login with Google'} logoIcon={<FaEye />} iconPosition={'start'} />
    <div className='Forgot_pass'>
     <a href='/forgot'>Forgot your password?</a>
    </div>

    <div className='ragister'>
     <span className='text-muted'>Don't have an account?</span> <a href='/register'>Register</a>
    </div>
   </div>
  </div>
 )
}

export default SignIn
