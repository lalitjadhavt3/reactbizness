import React, {useState} from 'react'
import '../styles/SignIn.css'
import '../App.css'
import logo from '../assets/logo.png'
import {FaGoogle} from 'react-icons/fa'
import {FaEye, FaEyeSlash} from 'react-icons/fa6'
import CustomButton from '../components/CustomButton'
import axios from 'axios'
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from '@mui/material'
import {MdOutlineVisibilityOff, MdVisibility} from 'react-icons/md'
import {Link, useNavigate} from 'react-router-dom'

const SignIn = () => {
 const navigate = useNavigate()
 const [showPassword, setShowPassword] = useState(false)
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [errors, setErrors] = useState({})

 const handleClickShowPassword = () => setShowPassword((show) => !show)

 const handleSubmit = async (e) => {
  e.preventDefault()
  const errors = {}

  // Simple email validation
  if (!email) {
   errors.email = 'Email is required'
  }

  // Password validation (add more conditions as needed)
  if (password.length < 8) {
   errors.password = 'Password must be at least 8 characters long'
  }

  setErrors(errors)

  // If no errors, proceed with sign-in logic
  if (Object.keys(errors).length === 0) {
   try {
    const postData = {
     username: email,
     password: password,
    }

    const response = await axios.post('http://localhost/bizness/login.php', postData)

    // Handle successful response
    console.log('Response:', response.data)

    // Here you can handle the response data, such as displaying a success message or redirecting the user
    if (response.data.success) {
     console.log('Sign in successful!')
     // Redirect to another page or perform other actions on successful login
     navigate('/dashboard') // Example navigation to dashboard
    } else {
     console.error('Login failed:', response.data.message)
    }
   } catch (error) {
    // Handle error
    console.error('Error:', error)
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
    <form onSubmit={handleSubmit} style={{marginBottom: '10%'}}>
     <div className='form-box formCard'>
      <FormControl variant='outlined' style={{width: '100%', marginTop: '20px'}}>
       <InputLabel htmlFor='outlined-adornment-email'>Email</InputLabel>
       <OutlinedInput
        id='outlined-adornment-email'
        type='text'
        label='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
       />
       {errors.email && <span className='error'>{errors.email}</span>}
      </FormControl>

      <FormControl variant='outlined' style={{width: '100%', marginTop: '20px'}}>
       <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
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
        label='Password'
        error={!!errors.password}
       />
       {errors.password && <span className='error'>{errors.password}</span>}
      </FormControl>

      <div className='button-box'>
       <CustomButton
        btnText={'Login'}
        // logoIcon={<FaEye />}
        iconPosition={'start'}
        type='submit'
       />
      </div>
     </div>
    </form>
    <CustomButton
     btnText={'Login with Google'}
     logoIcon={<FaGoogle />}
     iconPosition={'start'}
     onClick={() => {
      // Add your Google login logic here
     }}
    />
    <div className='Forgot_pass'>
     <Link to={'/forgot'}>Forgot your password?</Link>
    </div>

    <div className='ragister'>
     <span className='text-muted'>Don't have an account?</span> <Link to='/register'>Register</Link>
    </div>
   </div>
  </div>
 )
}

export default SignIn
