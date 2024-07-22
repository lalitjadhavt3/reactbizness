import React, {useState} from 'react'
import {
 Container,
 Box,
 Typography,
 Link,
 Divider,
 IconButton,
 FormControl,
 InputLabel,
 OutlinedInput,
 InputAdornment,
 MenuItem,
 Select,
} from '@mui/material'
import {IoMdEye, IoMdEyeOff} from 'react-icons/io'
import CustomButton from '../components/CustomButton'
import {useNavigate} from 'react-router-dom'
import GoogleIcon from '../assets/icons/GoogleIcon'
import {colors} from '../utils/CommonStyles'
import {GoogleOAuthProvider, useGoogleLogin} from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'
import {useAuth} from '../context/AuthContext'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import api from '../utils/api'
import SignInTest from '../utils/SignInTest'

const Signup = () => {
 const [showPassword, setShowPassword] = useState(false)
 const [showConfirmPassword, setShowConfirmPassword] = useState(false)
 const {signIn} = useAuth()
 const MySwal = withReactContent(Swal)
 const [values, setValues] = useState({
  email: '',
  password: '',
  confirm_password: '',
  account_type: '',
 })
 const [errors, setErrors] = useState({})
 const navigate = useNavigate()

 const handleChange = (e) => {
  const {name, value} = e.target
  setValues({
   ...values,
   [name]: value,
  })
 }

 const validate = (values) => {
  const errors = {}

  if (!values.email) {
   errors.email = 'Email is required'
  }

  if (!values.password) {
   errors.password = 'Password is required'
  }

  if (!values.confirm_password) {
   errors.confirm_password = 'Confirm Password is required'
  } else if (values.confirm_password !== values.password) {
   errors.confirm_password = 'Passwords do not match'
  }

  if (!values.account_type) {
   errors.account_type = 'Account Type is required'
  }

  return errors
 }

 const handleClickShowPassword = () => {
  setShowPassword(!showPassword)
 }

 const handleClickShowConfirmPassword = () => {
  setShowConfirmPassword(!showConfirmPassword)
 }

 const handleSubmit = async (e) => {
  e.preventDefault()
  const validationErrors = validate(values)
  setErrors(validationErrors)
  if (Object.keys(validationErrors).length === 0) {
   try {
    const response = await api.post('/user_register.php', {
     email: values.email,
     password: values.password,
     account_type: values.account_type,
     confirm_password: values.confirm_password,
    })
    console.log('🚀 ~ handleSubmit ~ response:', response)
    if (response?.data?.status?.message === 'registration_success') {
     MySwal.fire({
      icon: 'success',
      title: 'Registration Successful',
     }).then(() => {
      navigate('/login')
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
  <Container maxWidth='sm'>
   <form onSubmit={handleSubmit}>
    <Box
     display='flex'
     flexDirection='column'
     alignItems='center'
     justifyContent='center'
     minHeight='100vh'
    >
     <Box bgcolor='white' p={4} borderRadius={2} boxShadow={3} width='100%'>
      <Typography variant='h4' component='h1' gutterBottom textAlign='center'>
       Signup
      </Typography>
      <Box component='div'>
       <FormControl
        variant='outlined'
        className='formCustomControls'
        fullWidth
        required
        error={!!errors.email}
       >
        <InputLabel htmlFor='outlined-adornment-email'>Email</InputLabel>
        <OutlinedInput
         required
         id='outlined-adornment-email'
         type='email'
         name='email'
         value={values.email}
         onChange={handleChange}
         label='Email'
        />
        {errors.email && <div className='error-message'>{errors.email}</div>}
       </FormControl>
       <FormControl
        variant='outlined'
        className='formCustomControls'
        fullWidth
        required
        error={!!errors.password}
       >
        <InputLabel htmlFor='outlined-adornment-password'>Create Password</InputLabel>
        <OutlinedInput
         required
         id='outlined-adornment-password'
         type={showPassword ? 'text' : 'password'}
         name='password'
         value={values.password}
         onChange={handleChange}
         endAdornment={
          <InputAdornment position='end'>
           <IconButton
            aria-label='toggle password visibility'
            onClick={handleClickShowPassword}
            edge='end'
           >
            {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
           </IconButton>
          </InputAdornment>
         }
         label='Create Password'
        />
        {errors.password && <div className='error-message'>{errors.password}</div>}
       </FormControl>
       <FormControl
        variant='outlined'
        className='formCustomControls'
        fullWidth
        required
        error={!!errors.confirm_password}
       >
        <InputLabel htmlFor='outlined-adornment-confirm-password'>Confirm Password</InputLabel>
        <OutlinedInput
         required
         id='outlined-adornment-confirm-password'
         type={showConfirmPassword ? 'text' : 'password'}
         name='confirm_password'
         value={values.confirm_password}
         onChange={handleChange}
         endAdornment={
          <InputAdornment position='end'>
           <IconButton
            aria-label='toggle password visibility'
            onClick={handleClickShowConfirmPassword}
            edge='end'
           >
            {showConfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
           </IconButton>
          </InputAdornment>
         }
         label='Confirm Password'
        />
        {errors.confirm_password && <div className='error-message'>{errors.confirm_password}</div>}
       </FormControl>
       <div className='input-group input-wrapper'>
        <FormControl fullWidth required error={!!errors.account_type}>
         <InputLabel id='account_type-label'>Account Type</InputLabel>
         <Select
          labelId='account_type-label'
          id='account_type'
          name='account_type'
          value={values.account_type}
          onChange={handleChange}
          label='Account Type'
         >
          <MenuItem value='' disabled>
           Select Account Type
          </MenuItem>
          <MenuItem value='business'>Business Account</MenuItem>
          <MenuItem value='individual'>Personal Account</MenuItem>
         </Select>
         {errors.account_type && <div className='error-message'>{errors.account_type}</div>}
        </FormControl>
       </div>
       <CustomButton
        btnText='Signup'
        iconPosition='start'
        btnType='submit'
        btnStyle={{backgroundColor: colors.primaryBtnBg}}
       />
      </Box>
      <Box mt={2} textAlign='center'>
       <Typography variant='body2'>
        Already have an account?{' '}
        <Link href='#' onClick={() => navigate('/login')}>
         Login
        </Link>
       </Typography>
      </Box>
      <Divider sx={{my: 2}}>Or</Divider>
      <SignInTest user={null} navigate={navigate} accType={values.account_type || null} />
     </Box>
    </Box>
   </form>
  </Container>
 )
}

export default Signup
