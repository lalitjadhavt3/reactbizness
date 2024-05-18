import React, {useState, useRef, useEffect} from 'react'
import logo from '../assets/logo.png'
import {FaEye, FaEyeSlash} from 'react-icons/fa6'
import '../styles/register.css'

const Register = () => {
 const [values, setValues] = useState({
  email: '',
  password: '',
  confirm_password: '',
  account_type: '',
 })

 const [errors, setErrors] = useState({})
 const [showPassword, setShowPassword] = useState(false)
 const [showConfirmPassword, setShowConfirmPassword] = useState(false)

 const handleChange = (e) => {
  const {name, value} = e.target
  setValues({
   ...values,
   [name]: value,
  })
 }

 const togglePasswordVisibility = (field) => {
  if (field === 'password') {
   setShowPassword(!showPassword)
  } else if (field === 'confirm_password') {
   setShowConfirmPassword(!showConfirmPassword)
  }
 }

 const handleSubmit = (e) => {
  e.preventDefault()
  const validationErrors = validate(values)
  setErrors(validationErrors)
  if (Object.keys(validationErrors).length === 0) {
   // Proceed with form submission
   console.log('Form submitted:', values)
  }
 }

 const validate = (values) => {
  const errors = {}

  if (!values.confirm_password) {
   errors.confirm_password = 'Confirm Password is required'
  } else if (values.confirm_password !== values.password) {
   alert('Passwords do not match')
   errors.confirm_password = 'Passwords do not match'
  }

  return errors
 }

 const confirmPasswordRef = useRef(null)

 useEffect(() => {
  if (errors.confirm_password) {
   confirmPasswordRef.current.value = '' // Clear the value
  }
 }, [errors.confirm_password])

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
     <div className='form-box card'>
      <div className='input-group input-wrapper'>
       <input
        type='email'
        id='email'
        name='email'
        value={values.email}
        onChange={handleChange}
        required
       />
       <label htmlFor='email' className='placeholder'>
        Email
       </label>
      </div>

      <div className='input-group input-wrapper '>
       <input
        type={showPassword ? 'text' : 'password'}
        id='password'
        name='password'
        value={values.password}
        onChange={handleChange}
        required
       />
       <label htmlFor='password' className='placeholder'>
        Password
       </label>
       <a href='#' className='fa-eye' onClick={() => togglePasswordVisibility('password')}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
       </a>
      </div>

      <div className='input-group input-wrapper '>
       <input
        ref={confirmPasswordRef}
        type={showConfirmPassword ? 'text' : 'password'}
        id='confirm_password'
        name='confirm_password'
        value={values.confirm_password}
        onChange={handleChange}
        required
       />
       <label htmlFor='confirm_password' className='placeholder'>
        Confirm Password
       </label>
       <a href='#' className='fa-eye' onClick={() => togglePasswordVisibility('confirm_password')}>
        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
       </a>
      </div>

      <div className='input-group input-wrapper'>
       <select
        id='account_type'
        name='account_type'
        value={values.account_type}
        onChange={handleChange}
        required
       >
        <option value='' disabled>
         Select Account Type{' '}
        </option>
        <option value='business'>Business Account</option>
        <option value='individual'>Personal Account</option>
       </select>
       <label htmlFor='account_type' className='placeholder select-label'>
        Account Type
       </label>
      </div>
      <div className='button-box'></div>
     </div>
    </form>
    <div className='register'>
     <span className='text-muted'>Already registered? </span> <a href='/signin'>Log in</a>
    </div>
   </div>
  </div>
 )
}

export default Register
