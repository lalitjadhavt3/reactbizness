import React, {useState} from 'react'
import logo from '../assets/logo.png'
import {MdOutlineVisibilityOff, MdVisibility} from 'react-icons/md'
import '../styles/register.css'
import {
 FormControl,
 IconButton,
 InputAdornment,
 InputLabel,
 OutlinedInput,
 Select,
 MenuItem,
} from '@mui/material'
import CustomButton from '../components/CustomButton'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import api from '../utils/api'
import {useNavigate} from 'react-router-dom'

const Register = () => {
 const MySwal = withReactContent(Swal)
 const navigate = useNavigate()
 const [values, setValues] = useState({
  email: '',
  password: '',
  confirm_password: '',
  account_type: '',
 })

 const [errors, setErrors] = useState({})
 const [showPassword, setShowPassword] = useState(false)
 const [showConfirmPassword, setShowConfirmPassword] = useState(false)

 const handleClickShowPassword = () => setShowPassword((show) => !show)
 const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show)

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
  <div className='container'>
   <div className='register-box'>
    <div className='logo-box'>
     <img src={logo} className='logo' alt='' />
    </div>
    <div className='text-box'>
     <h1>Sign up</h1>
    </div>
    <form onSubmit={handleSubmit}>
     <div className='form-box form-card'>
      <FormControl variant='outlined' className='formCustomControls' error={!!errors.email}>
       <InputLabel htmlFor='outlined-adornment-email'>Email</InputLabel>
       <OutlinedInput
        required
        id='outlined-adornment-email'
        type='text'
        label='Email'
        name='email'
        value={values.email}
        onChange={handleChange}
       />
       {errors.email && <div className='error-message'>{errors.email}</div>}
      </FormControl>

      <FormControl variant='outlined' className='formCustomControls' error={!!errors.password}>
       <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
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
           {showPassword ? <MdVisibility /> : <MdOutlineVisibilityOff />}
          </IconButton>
         </InputAdornment>
        }
        label='Password'
       />
       {errors.password && <div className='error-message'>{errors.password}</div>}
      </FormControl>

      <FormControl
       variant='outlined'
       className='formCustomControls'
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
           {showConfirmPassword ? <MdVisibility /> : <MdOutlineVisibilityOff />}
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
      <div className='button-box'>
       <CustomButton btnText='Register' logoIcon={null} iconPosition='start' btnType='submit' />
      </div>
     </div>
    </form>
    <div className='register'>
     <span className='text-muted'>Already registered? </span>   <a href='/login'>Log in</a>
    </div>
   </div>
  </div>
 )
}

export default Register
