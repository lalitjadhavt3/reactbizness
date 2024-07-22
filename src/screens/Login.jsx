import React, {useState} from 'react'
import {Container, Box, TextField, Typography, Link, Divider, IconButton} from '@mui/material'
import {IoMdEye, IoMdEyeOff} from 'react-icons/io'
import CustomButton from '../components/CustomButton'
import GoogleIcon from '../assets/icons/GoogleIcon'
import {useNavigate} from 'react-router-dom'
import {colors} from '../utils/CommonStyles'
import GoogleSignIn from '../utils/GoogleSignIn'
import SignInTest from '../utils/SignInTest'
import withReactContent from 'sweetalert2-react-content'
import api from '../utils/api'
import Swal from 'sweetalert2'
import {useAuth} from '../context/AuthContext'
const Login = () => {
 const [showPassword, setShowPassword] = useState(false)
 const {setAuthStatus} = useAuth()
 const MySwal = withReactContent(Swal)
 const navigate = useNavigate()
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [errors, setErrors] = useState({})

 const handleClickShowPassword = () => {
  setShowPassword(!showPassword)
 }

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
  <Container maxWidth='sm'>
   <Box
    display='flex'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    minHeight='100vh'
   >
    <Box bgcolor='white' p={4} borderRadius={2} boxShadow={3} width='100%'>
     <div style={{textAlign: 'center'}}>
      <img src='/logos.png' width={150} />
      <Typography
       variant='h4'
       component='h1'
       gutterBottom
       textAlign='center'
       marginRight={'4%'}
       marginTop={'5%'}
      >
       Sign In
      </Typography>
      <Typography
       variant='h7'
       component='h5'
       gutterBottom
       textAlign='center'
       marginRight={'4%'}
       marginTop={'5%'}
       fontSize={15}
      >
       Continue to Business Shelter
      </Typography>
     </div>

     <Box component='form' onSubmit={handleSubmit}>
      <TextField
       fullWidth
       label='Email'
       margin='normal'
       error={!!errors.email}
       value={email}
       onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
       fullWidth
       label='Password'
       margin='normal'
       type={showPassword ? 'text' : 'password'}
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       InputProps={{
        endAdornment: (
         <IconButton onClick={handleClickShowPassword} edge='end'>
          {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
         </IconButton>
        ),
       }}
      />
      <Box textAlign='right' mb={2}>
       <Link href='/forgotPassword' variant='body2'>
        Forgot password?
       </Link>
      </Box>
      <CustomButton
       btnText='Login'
       iconPosition='start'
       btnType='submit'
       btnStyle={{backgroundColor: colors.primaryBtnBg}}
      />
     </Box>
     <Box mt={2} textAlign='center'>
      <Typography variant='body2'>
       Don’t have an account?{' '}
       <Link href='#' onClick={() => navigate('/register')}>
        Signup
       </Link>
      </Typography>
     </Box>
     <Divider sx={{my: 2}}>Or</Divider>
     <SignInTest user={null} navigate={navigate} accType={null} action={'login'} />
    </Box>
   </Box>
  </Container>
 )
}

export default Login
