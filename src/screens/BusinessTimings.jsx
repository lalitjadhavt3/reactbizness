import React, {useState} from 'react'
import logo from '../assets/logo.png'
import {FormControl, InputLabel, OutlinedInput, Checkbox, FormControlLabel} from '@mui/material'
import CustomButton from '../components/CustomButton'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import api from '../utils/api'
import {useNavigate} from 'react-router-dom'

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const BusinessTimings = ({user_id}) => {
 // Accept user_id as a prop
 const MySwal = withReactContent(Swal)
 const navigate = useNavigate()
 const [timings, setTimings] = useState(
  daysOfWeek.reduce((acc, day) => {
   acc[day] = {open: '', close: '', isHoliday: false}
   return acc
  }, {})
 )
 const [errors, setErrors] = useState({})

 const handleChange = (e, day) => {
  const {name, value, type, checked} = e.target
  setTimings({
   ...timings,
   [day]: {
    ...timings[day],
    [name]: type === 'checkbox' ? checked : value,
   },
  })
 }

 const validate = (timings) => {
  const errors = {}

  daysOfWeek.forEach((day) => {
   if (!timings[day].isHoliday) {
    if (!timings[day].open) {
     errors[day] = errors[day] || {}
     errors[day].open = 'Opening time is required'
    }
    if (!timings[day].close) {
     errors[day] = errors[day] || {}
     errors[day].close = 'Closing time is required'
    }
   }
  })

  return errors
 }

 const handleSubmit = async (e) => {
  e.preventDefault()
  const validationErrors = validate(timings)
  setErrors(validationErrors)

  if (Object.keys(validationErrors).length === 0) {
   try {
    const response = await api.post('/save_business_timings.php', {user_id, ...timings})
    if (response?.data?.status?.message === 'timings_saved') {
     MySwal.fire({
      icon: 'success',
      title: 'Business Timings Saved Successfully',
     }).then(() => {
      navigate('/dashboard')
     })
    } else {
     MySwal.fire({
      icon: 'error',
      title: response.data.message || 'Failed to save timings, please try again',
     })
    }
   } catch (error) {
    MySwal.fire({
     icon: 'error',
     title: 'An error occurred. Please try again later.',
    })
   }
  } else {
   MySwal.fire({
    icon: 'error',
    title: 'Validation Error',
    text: 'Please fill in all required fields correctly.',
   })
  }
 }

 return (
  <div className='container'>
   <div className='timings-box'>
    <div className='logo-box'>
     <img src={logo} className='logo' alt='' />
    </div>
    <div className='text-box'>
     <h1>Business Timings</h1>
    </div>
    <form onSubmit={handleSubmit}>
     <div className='form-box'>
      {daysOfWeek.map((day) => (
       <div key={day} className='day-box'>
        <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
        <FormControlLabel
         control={
          <Checkbox
           checked={timings[day].isHoliday}
           onChange={(e) => handleChange(e, day)}
           name='isHoliday'
          />
         }
         label='Holiday'
        />
        {!timings[day].isHoliday && (
         <>
          <FormControl
           variant='outlined'
           className='formCustomControls'
           error={!!errors[day]?.open}
          >
           <InputLabel htmlFor={`open-${day}`}>Open</InputLabel>
           <OutlinedInput
            required
            id={`open-${day}`}
            type='time'
            name='open'
            value={timings[day].open}
            onChange={(e) => handleChange(e, day)}
            label='Open'
           />
           {errors[day]?.open && <div className='error-message'>{errors[day].open}</div>}
          </FormControl>
          <FormControl
           variant='outlined'
           className='formCustomControls'
           error={!!errors[day]?.close}
          >
           <InputLabel htmlFor={`close-${day}`}>Close</InputLabel>
           <OutlinedInput
            required
            id={`close-${day}`}
            type='time'
            name='close'
            value={timings[day].close}
            onChange={(e) => handleChange(e, day)}
            label='Close'
           />
           {errors[day]?.close && <div className='error-message'>{errors[day].close}</div>}
          </FormControl>
         </>
        )}
       </div>
      ))}
      <div className='button-box'>
       <CustomButton btnText='Save Timings' logoIcon={null} iconPosition='start' btnType='submit' />
      </div>
     </div>
    </form>
   </div>
  </div>
 )
}

export default BusinessTimings
