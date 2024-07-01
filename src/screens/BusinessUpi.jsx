import React, {useEffect, useState} from 'react'
import {FormControl, InputLabel, OutlinedInput, InputAdornment, TextField} from '@mui/material'
import CustomButton from '../components/CustomButton'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import '../styles/register.css'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import api from '../utils/api'
import {useNavigate} from 'react-router-dom'
const BusinessUpi = () => {
 const MySwal = withReactContent(Swal)
 const navigate = useNavigate()
 const [values, setValues] = useState({
  upiId: '',
 })

 const [errors, setErrors] = useState({})
 const [isOtpSent, setIsOtpSent] = useState(false)
 const [isUpiVerified, setIsUpiVerified] = useState(false)
 useEffect(() => {
  const checkBusinessInfo = async () => {
   try {
    const postData = {
     user_id: localStorage.getItem('user_id'),
    }

    const response = await api.post('/get_user_details_with_page.php', postData)
    if (response?.data?.status?.description) {
     const {business_upi, business_name, name} = response?.data?.data?.user_info
     localStorage.setItem('businessName', business_name)
     localStorage.setItem('name', name)

     setValues({
      ...values,
      upiId: business_upi,
     })
     // Optionally, redirect or update UI to indicate successful login
    }
   } catch (error) {
    MySwal.fire({
     icon: 'error',
     text: 'ERR-1001 Login failed, Please contact administrator',
    }).then(() => {})
   }
  }
  checkBusinessInfo()
 }, [])
 const handleChange = (e) => {
  const {name, value} = e.target
  setValues({
   ...values,
   [name]: value,
  })
 }

 const validate = () => {
  let tempErrors = {}
  if (!values.upiId) tempErrors.upiId = 'UPI ID is required'
  return tempErrors
 }
 const submitValues = async (values) => {
  if (values?.upiId) {
   values.upiId = values.upiId
  }
  try {
   const postData = {
    upiId: values.upiId,
    user_id: localStorage.getItem('user_id'),
    business_name: localStorage.getItem('businessName') ?? '',
    name: localStorage.getItem('name') ?? '',
   }
   const response = await api.post('/user_upi_info.php', postData)
   if (response?.data?.status?.success) {
    if (response?.data?.status?.description == 'info_added') {
     MySwal.fire({
      icon: 'success',
      title: 'User Information Added',
     }).then(() => {
      navigate('/registration/business-upi')
     })
    } else if (response?.data?.status?.description == 'info_updated') {
     if (response?.data?.status?.message == 'user_registration_success') {
      MySwal.fire({
       icon: 'success',
       title: 'Registration Completed',
       text: 'Kindly Login to View Business Profile!',
      }).then(() => {
       navigate('/login')
      })
     }
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
 const handleVerifyOtp1 = () => {
  // Mock function to simulate OTP sending
  // Replace with actual API call
  if (values?.upiId.length === 10 || values?.upiId.length === 13) {
   setTimeout(() => {
    MySwal.fire({
     icon: 'success',
     //title: 'OTP Sent to ' + values.upiId,
     text: 'OTP Sent to ' + values.upiId,
    }).then(() => {})
    setIsOtpSent(true)
   }, 1000)
  } else {
   MySwal.fire({
    icon: 'error',
    text: 'Please Enter valid mobile number',
   }).then(() => {})
  }
 }

 const handleVerifyOtp = async () => {
  // Mock function to simulate OTP verification
  // Replace with actual API call
  if (values?.upiId.length > 5) {
   try {
    const postData = {
     upiId: values.upiId,
    }
    console.log('postdata', postData)
    //const response = await api.post('/verify_upi_id.php', postData)
    if (1) {
     if (1) {
      MySwal.fire({
       icon: 'success',
       text: 'UPI ID Verified',
      }).then(() => {
       setIsUpiVerified(true)
      })
     } else {
      MySwal.fire({
       icon: 'error',
       //text: response?.data?.status?.description,
       title: 'UPI ID is not valid',
      }).then(() => {
       navigate('/registration/business-contact')
      })
     }
    } else {
     console.error('Unable to store User Information :')
    }
   } catch (error) {
    MySwal.fire({
     icon: 'error',
     title: 'ERR-1002 Unable to store User Information, Please Try after sometime',
    })
   }
  } else {
   MySwal.fire({
    icon: 'error',
    text: 'Please Enter valid UPI ID',
   }).then(() => {})
  }
 }

 const handleSubmit = (e) => {
  e.preventDefault()
  if (isUpiVerified) {
   const tempErrors = validate()
   setErrors(tempErrors)

   if (Object.keys(tempErrors).length === 0) {
    submitValues(values)

    // Handle form submission
    // Assuming you want to make an API call here using Axios
    // Replace with actual Axios API call
   } else {
    MySwal.fire({
     icon: 'error',
     title: 'Please fill / complete all fields',
    }).then(() => {})
   }
  } else {
   MySwal.fire({
    icon: 'error',
    title: 'Please verify OTP first',
   }).then(() => {})
  }
 }

 return (
  <div className='container'>
   <div className='register-box'>
    <div>
     <h4>Business Contact Information</h4>
     <label style={{fontSize: 14, marginTop: '3%'}}>Fill In Your Business Contact Details.</label>
    </div>
    <form onSubmit={handleSubmit}>
     <div className='form-box form-card'>
      <FormControl className='formControl' error={!!errors.upiId}>
       <label htmlFor='userupiId' className='formLabel'>
        UPI ID
       </label>
       <TextField
        variant='outlined'
        id='upiId'
        name='upiId'
        value={values.upiId}
        placeholder='Enter UPI ID'
        onChange={handleChange}
       />
      </FormControl>
      {errors.upiId && <div className='error-message'>{errors.upiId}</div>}
      {!isUpiVerified && (
       <div className='button-box'>
        <CustomButton
         btnText={'Verify UPI ID'}
         logoIcon={null}
         iconPosition={'start'}
         btnType={'button'}
         onClick={handleVerifyOtp}
        />
       </div>
      )}
      <div className='button-box'>
       <CustomButton
        btnText={'Next'}
        logoIcon={null}
        iconPosition={'start'}
        btnType={'submit'}
        disabled={!isUpiVerified}
       />
      </div>
     </div>
    </form>
   </div>
  </div>
 )
}

export default BusinessUpi
