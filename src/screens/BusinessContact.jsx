import React, {useEffect, useState, useRef} from 'react'
import {
 FormControl,
 TextField,
 Modal,
 Box,
 Typography,
 Button,
 InputAdornment,
 IconButton,
 Drawer,
} from '@mui/material'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import '../styles/register.css'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import api from '../utils/api'
import {useNavigate} from 'react-router-dom'
import OtpInput from '../components/OtpInput'
import CustomButton from '../components/CustomButton'

const BusinessContact = () => {
 const MySwal = withReactContent(Swal)
 const navigate = useNavigate()
 const [values, setValues] = useState({
  mobileNumber: '',
  whatsappNumber: '',
  isWhatsApp: true,
  email: '',
  otp: '',
  existing: '',
 })
 const otpRefs = useRef([])

 const [errors, setErrors] = useState({})
 const [isOtpSent, setIsOtpSent] = useState(false)
 const [isOtpVerified, setIsOtpVerified] = useState(false)
 const [openModal, setOpenModal] = useState(false)
 const [otpDrawerOpen, setOtpDrawerOpen] = useState(false)
 const handleOtpChange = (index, value) => {
  const newOtp = values.otp.split('')
  newOtp[index] = value
  const newOtpString = newOtp.join('')
  setValues({...values, otp: newOtpString})

  // Move to next input if value is entered and not the last input
  if (value && index < 5) {
   otpRefs.current[index + 1].focus()
  }
 }

 useEffect(() => {
  otpRefs.current = otpRefs.current.slice(0, 6)
 }, [])
 useEffect(() => {
  const checkBusinessInfo = async () => {
   try {
    const postData = {
     user_id: localStorage.getItem('user_id'),
    }

    const response = await api.post('/get_user_details_with_page.php', postData)
    if (response?.data?.status?.description) {
     const {business_mobile, business_whatsapp, business_email, business_name} =
      response?.data?.data?.user_info
     setValues({
      ...values,
      mobileNumber: business_mobile,
      whatsappNumber: business_whatsapp,
      isWhatsApp: false,
      email: business_email,
      existing: true,
     })
     localStorage.setItem('businessName', business_name)
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
  if (name === 'otp') {
   const numericValue = value.replace(/[^0-9]/g, '')
   setValues({
    ...values,
    [name]: numericValue,
   })
  } else {
   setValues({
    ...values,
    [name]: value,
   })
  }
 }

 const validate = () => {
  let tempErrors = {}
  if (!values.mobileNumber) tempErrors.mobileNumber = 'Mobile Number is required'
  if (!values.whatsappNumber && values.isWhatsApp)
   tempErrors.whatsappNumber = 'WhatsApp Number is required'
  if (!values.email) tempErrors.email = 'Email is required'
  if (!values.otp && isOtpSent) tempErrors.otp = 'OTP is required'
  return tempErrors
 }

 const submitValues = async (values) => {
  if (!values?.existing) {
   navigate('/registration/business-upi')
  }
  if (values?.isWhatsApp) {
   values.whatsappNumber = values.mobileNumber
  }
  try {
   const postData = {
    mobile_number: values.mobileNumber,
    whatsapp_number: values.whatsappNumber,
    email: values.email,
    user_id: localStorage.getItem('user_id'),
   }
   console.log('🚀 ~ submitValues ~ postData:', postData)
   const response = await api.post('/user_contact_info.php', postData)
   if (response?.data?.status?.success) {
    if (response?.data?.status?.description === 'info_added') {
     navigate('/registration/business-upi')
    } else if (response?.data?.status?.description === 'info_updated') {
     navigate('/registration/business-upi')
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

 const handleSendOtp = async () => {
  // Mock function to simulate OTP sending
  // Replace with actual API call
  if (values?.mobileNumber.length === 10 || values?.mobileNumber.length === 13) {
   const postData = {
    phone: values.mobileNumber,
    action: 'sendOtp',
    user_id: localStorage.getItem('user_id'),
   }
   console.log('postdata', postData)
   const response = await api.post('/otp.php', postData)
   console.log('🚀 ~ send otp ~ response:', response)
   if (response?.data?.success) {
    MySwal.fire({
     icon: 'success',
     text: 'OTP Sent to ' + values.mobileNumber,
    }).then(() => {
     const userTempData = {
      user_id: localStorage.getItem('user_id'),
      user_mobile: values.mobileNumber,
      user_sendotp: response?.data?.session?.otp,
     }
     localStorage.setItem('user_temp_data', JSON.stringify(userTempData))
     setIsOtpSent(true)
     setOtpDrawerOpen(true)
    })
   }
  } else {
   MySwal.fire({
    icon: 'error',
    title: 'Please Enter valid mobile number',
   }).then(() => {})
  }
 }

 const handleVerifyOtp = async () => {
  // Mock function to simulate OTP verification
  // Replace with actual API call
  const storedOtp = JSON.parse(localStorage.getItem('user_temp_data'))
  console.log('🚀 ~ handleVerifyOtp ~ storedOtp:', storedOtp)

  if (values?.otp.length === 6 && storedOtp?.user_sendotp) {
   setIsOtpVerified(true)
   localStorage.removeItem('user_temp_data')
   MySwal.fire({
    icon: 'success',
    title: 'OTP Verified',
   }).then(() => {
    setOtpDrawerOpen(false)
   })
  } else {
   MySwal.fire({
    icon: 'error',
    title: 'Please Enter valid OTP',
   }).then(() => {})
  }
 }

 const handleSubmit = (e) => {
  e.preventDefault()
  if (isOtpVerified) {
   const tempErrors = validate()
   setErrors(tempErrors)

   if (
    values?.isWhatsApp &&
    (values?.whatsappNumber === '' || values?.whatsappNumber === undefined)
   ) {
    submitValues(values)
   } else if (
    Object.keys(tempErrors).length === 0 &&
    !values?.isWhatsApp &&
    values?.whatsappNumber !== undefined
   ) {
    submitValues(values)
   } else {
    MySwal.fire({
     icon: 'error',
     title: 'Please fill / complete all fields',
    }).then(() => {})
   }
  } else if (values?.existing) {
   navigate('/registration/business-upi')
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
      <FormControl
       variant='outlined'
       className='formCustomControls personal-info-form'
       error={!!errors.mobileNumber}
      >
       <label htmlFor='mobileNumber' className='formLabelBusinessInfo'>
        Mobile Number
       </label>
       <PhoneInput
        id='mobileNumber'
        name='mobileNumber'
        value={values.mobileNumber}
        onChange={(value) => setValues({...values, mobileNumber: value, existing: false})}
        defaultCountry='IN'
        placeholder='Enter mobile number'
        international
       />
       {errors.mobileNumber && <div className='error-message'>{errors.mobileNumber}</div>}
      </FormControl>
      <div className='formControl'>
       <FormControl variant='outlined' className='formCustomControls business-contact-form'>
        <label style={{width: '90%'}} htmlFor='isWhatsApp'>
         Same number for WhatsApp?
        </label>
        <input
         style={{width: '10%'}}
         type='checkbox'
         id='isWhatsApp'
         name='isWhatsApp'
         checked={values.isWhatsApp}
         onChange={(e) => setValues({...values, isWhatsApp: e.target.checked})}
        />
       </FormControl>
      </div>

      {!values.isWhatsApp && (
       <FormControl
        variant='outlined'
        className='formCustomControls personal-info-form'
        error={!!errors.whatsappNumber}
       >
        <label htmlFor='mobileNumber' className='formLabelBusinessInfo'>
         Whatsapp Number
        </label>
        <PhoneInput
         id='whatsappNumber'
         name='whatsappNumber'
         value={values.whatsappNumber}
         onChange={(value) => setValues({...values, whatsappNumber: value, existing: false})}
         defaultCountry='IN'
         placeholder='Enter WhatsApp number'
         international
         className='PhoneInput'
        />
        {errors.whatsappNumber && <div className='error-message'>{errors.whatsappNumber}</div>}
       </FormControl>
      )}
      {isOtpSent && !isOtpVerified && (
       <>
        <label htmlFor='otp' className='formLabelBusinessInfo'>
         OTP
        </label>
        <FormControl
         variant='outlined'
         className='formCustomControls personal-info-form'
         error={!!errors.otp}
        >
         <Button variant='contained' color='primary' onClick={() => setOtpDrawerOpen(true)}>
          Enter OTP
         </Button>
        </FormControl>

        <Drawer anchor='bottom' open={otpDrawerOpen} onClose={() => setOtpDrawerOpen(false)}>
         <Box sx={{p: 2}}>
          <Typography variant='h6' sx={{textAlign: 'center', mb: 2}}>
           Enter OTP
          </Typography>
          <Box sx={{display: 'flex', justifyContent: 'center', gap: 1}}>
           {[0, 1, 2, 3, 4, 5].map((index) => (
            <TextField
             key={index}
             variant='outlined'
             size='small'
             type='text'
             inputProps={{
              maxLength: 1,
              style: {
               textAlign: 'center',
               fontSize: '1.5rem',
              },
             }}
             inputRef={(el) => (otpRefs.current[index] = el)}
             value={values.otp[index] || ''}
             onChange={(e) => handleOtpChange(index, e.target.value)}
             onKeyDown={(e) => {
              if (e.key === 'Backspace' && !e.target.value && index > 0) {
               otpRefs.current[index - 1].focus()
              }
             }}
            />
           ))}
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
           <CustomButton
            btnText={'Verify OTP'}
            logoIcon={null}
            iconPosition={'start'}
            btnType={'submit'}
            btnStyle={{backgroundColor: 'black', width: 'unset'}}
            onClick={handleVerifyOtp}
            divStyle={{justifyContent: 'center', display: 'flex'}}
           />
          </Box>
         </Box>
        </Drawer>
       </>
      )}
      {!isOtpSent && (
       <div className='button-box'>
        <CustomButton
         btnText={'Send OTP'}
         logoIcon={null}
         iconPosition={'start'}
         btnType={'button'}
         btnStyle={{backgroundColor: 'black', width: 'unset'}}
         onClick={handleSendOtp}
         divStyle={{justifyContent: 'end', display: 'flex'}}
        />
       </div>
      )}
      <FormControl className='formControl' error={!!errors.email}>
       <label htmlFor='userEmail' className='formLabel'>
        Email ID
       </label>
       <TextField
        variant='outlined'
        id='email'
        name='email'
        value={values.email}
        placeholder='Enter Email ID'
        onChange={handleChange}
       />
      </FormControl>
      {errors.email && <div className='error-message'>{errors.email}</div>}

      <div className='button-box'>
       <CustomButton
        btnText={'Next'}
        disabled={!isOtpVerified && !values.existing}
        logoIcon={null}
        iconPosition={'start'}
        btnType={'submit'}
        btnStyle={{backgroundColor: 'black', width: 'unset'}}
        divStyle={{justifyContent: 'end', display: 'flex'}}
       />
      </div>
     </div>
    </form>
   </div>
  </div>
 )
}

export default BusinessContact
