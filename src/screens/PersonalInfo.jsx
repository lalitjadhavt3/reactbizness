import React, {useEffect, useState} from 'react'
import logo from '../assets/logo.png'
import {FaEye, FaEyeSlash} from 'react-icons/fa6'
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
import {MdOutlineVisibilityOff, MdVisibility} from 'react-icons/md'
import CustomButton from '../components/CustomButton'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import api from '../utils/api'
import Stepper from '../components/Stepper'
import NavigationHeader from '../components/NavigationHeader'

const PersonalInfo = () => {
 const MySwal = withReactContent(Swal)
 const [currentStep, setCurrentStep] = useState(1)
 const totalSteps = 5

 const [values, setValues] = useState({
  name: '',
  day: '',
  month: '',
  year: '',
  gender: '',
 })
 const [errors, setErrors] = useState({})
 const navigate = useNavigate()
 const generateOptions = (start, end) => {
  const options = []
  for (let i = start; i <= end; i++) {
   options.push(
    <MenuItem key={i} value={i}>
     {i}
    </MenuItem>
   )
  }
  return options
 }

 const days = generateOptions(1, 31)
 const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
 ].map((month, index) => (
  <MenuItem key={index + 1} value={index + 1}>
   {month}
  </MenuItem>
 ))
 const years = generateOptions(1940, 2024)

 const handleChange = (e) => {
  setValues({
   ...values,
   [e.target.name]: e.target.value,
  })
 }
 useEffect(() => {
  const checkPersonalInfo = async () => {
   try {
    const postData = {
     user_id: localStorage.getItem('user_id'),
    }

    const response = await api.post('/get_user_details_with_page.php', postData)
    if (response?.data?.status?.description) {
     const {day, month, year, name, gender} = response?.data?.data?.user_info
     setValues({
      ...values,
      day: day,
      month: month,
      year: year,
      gender: gender,
      name: name,
     })

     // Optionally, redirect or update UI to indicate successful login
    }
   } catch (error) {}
  }
  checkPersonalInfo()
 }, [])
 const validate = () => {
  let tempErrors = {}
  if (!values.name) tempErrors.name = 'Name is required'
  if (!values.day) tempErrors.day = 'Day is required'
  if (!values.month) tempErrors.month = 'Month is required'
  if (!values.year) tempErrors.year = 'Year is required'
  if (!values.gender) tempErrors.gender = 'Gender is required'
  return tempErrors
 }

 const handleSubmit = async (e) => {
  e.preventDefault()
  const tempErrors = validate()
  setErrors(tempErrors)
  if (Object.keys(tempErrors).length === 0) {
   // Handle form submission
   try {
    const postData = {
     user_name: values.name,
     user_dob_day: values.day,
     user_dob_month: values.month,
     user_dob_year: values.year,
     user_gender: values.gender,
     user_id: localStorage.getItem('user_id'),
    }
    console.log('postdata', postData)
    const response = await api.post('/user_personal_info.php', postData)
    console.log('🚀 ~ handleSubmit ~ response:', response)

    if (response?.data?.status?.success) {
     if (response?.data?.status?.description == 'info_added') {
      navigate('/registration/business-info')
     } else if (response?.data?.status?.description == 'info_updated') {
      navigate('/registration/business-info')
     }
    } else {
     console.error('Unable to store User Information :', response.data.message)
    }
   } catch (error) {
    MySwal.fire({
     icon: 'error',
     title: 'ERR-1002 Unable to store User Information, Please Try after sometime',
    })
   }
  }
 }

 return (
  <div className='container'>
   <div className='register-box'>
    <NavigationHeader currentStep={currentStep} />
    <div>
     <h4>Personal Information</h4>
     <Stepper currentStep={currentStep} totalSteps={totalSteps} />

     <label style={{fontSize: 14, marginTop: '5%'}}>
      Fill In Your Personal Details to Register Your Business.
     </label>
    </div>
    <form onSubmit={handleSubmit}>
     <div className='form-box form-card'>
      <label htmlFor='name' className='formLabel'>
       Your Name
      </label>
      <FormControl
       variant='outlined'
       className='formCustomControls personal-info-form'
       error={!!errors.name}
      >
       <InputLabel htmlFor='outlined-adornment-name'>Name</InputLabel>
       <OutlinedInput
        id='outlined-adornment-name'
        type='text'
        label='Name'
        name='name'
        value={values.name}
        onChange={handleChange}
        required
       />
       {errors.name && <span className='error-text'>{errors.name}</span>}
      </FormControl>

      <div className='formControl'>
       <label htmlFor='dob' className='formLabel' style={{marginBottom: '5%'}}>
        DOB
       </label>
       <div
        style={{
         justifyContent: 'space-between',
         display: 'flex',
        }}
       >
        <FormControl style={{width: '25%'}} error={!!errors.day}>
         <InputLabel style={{fontSize: '15px'}} id='day'>
          Day
         </InputLabel>
         <Select
          labelId='day'
          value={values.day}
          onChange={handleChange}
          label='Day'
          name='day'
          inputProps={{
           id: 'day-select',
          }}
         >
          <MenuItem aria-label='None' value='' />
          {days}
         </Select>
         {errors.day && <span className='error-text'>{errors.day}</span>}
        </FormControl>
        <FormControl style={{width: '35%'}} error={!!errors.month}>
         <InputLabel style={{fontSize: '15px'}} id='month'>
          Month
         </InputLabel>
         <Select
          labelId='month'
          value={values.month}
          onChange={handleChange}
          label='Month'
          name='month'
          inputProps={{
           id: 'month-select',
          }}
         >
          <MenuItem aria-label='None' value='' />
          {months}
         </Select>
         {errors.month && <span className='error-text'>{errors.month}</span>}
        </FormControl>
        <FormControl style={{width: '30%'}} error={!!errors.year}>
         <InputLabel style={{fontSize: '15px'}} id='year'>
          Year
         </InputLabel>
         <Select
          labelId='year'
          value={values.year}
          onChange={handleChange}
          label='Year'
          name='year'
          inputProps={{
           id: 'year-select',
          }}
         >
          <MenuItem aria-label='None' value='' />
          {years}
         </Select>
         {errors.year && <span className='error-text'>{errors.year}</span>}
        </FormControl>
       </div>
      </div>

      <FormControl className='formControl' error={!!errors.gender}>
       <label htmlFor='gender' className='formLabel'>
        Gender
       </label>
       <Select
        labelId='gender'
        value={values.gender}
        onChange={handleChange}
        name='gender'
        inputProps={{
         id: 'gender-select',
        }}
       >
        <MenuItem value=''>
         <em>None</em>
        </MenuItem>
        <MenuItem key={0} value='male'>
         Male
        </MenuItem>
        <MenuItem key={1} value='female'>
         Female
        </MenuItem>
        <MenuItem key={2} value='other'>
         Other
        </MenuItem>
       </Select>
       {errors.gender && <span className='error-text'>{errors.gender}</span>}
      </FormControl>
     </div>
     <div className='button-box'>
      <CustomButton
       btnText={'Next'}
       logoIcon={null}
       iconPosition={'start'}
       btnType={'submit'}
       btnStyle={{backgroundColor: 'black'}}
      />
     </div>
    </form>
   </div>
  </div>
 )
}

export default PersonalInfo
