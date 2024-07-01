import React, {useState} from 'react'
import api from '../utils/api'
import {TextField} from '@mui/material'

const OtpVerify = ({value, onChange}) => {
 const [phone, setPhone] = useState('')
 const [otp, setOtp] = useState('')
 const [isOtpSent, setIsOtpSent] = useState(false)
 const [isVerified, setIsVerified] = useState(false)

 const sendOtp = async () => {
  const postData = {
   businessMobile: '8668534796',
   action: 'sendOtp',
   user_id: localStorage.getItem('user_id'),
  }
  console.log('postdata', postData)
  const response = await api.post('/otp.php', postData)
  console.log('🚀 ~ send otp ~ response:', response)
  if (response?.data?.success) {
   setIsOtpSent(true)
  } else {
   alert('Failed to send OTP')
  }
 }

 const verifyOtp = async () => {
  const postData = {
   businessMobile: '8668534796',
   action: 'verifyOtp',
   user_id: localStorage.getItem('user_id'),
   otp: '406858',
  }
  const response = await api.post('/otp.php', postData)

  if (response.data.success) {
   setIsVerified(true)
  } else {
   alert('Failed to verify OTP')
  }
 }

 return (
  <div>
   {isOtpSent ? (
    <div>
     <input
      type='text'
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      placeholder='Phone Number'
     />
     <button onClick={sendOtp}>Send OTP</button>
    </div>
   ) : !isVerified ? (
    <div>
     <TextField
      value={value}
      onChange={onChange}
      inputProps={{maxLength: 6, inputMode: 'numeric', pattern: '[0-9]*'}}
      placeholder='Enter 6-digit OTP'
      variant='outlined'
      fullWidth
     />
     <button onClick={verifyOtp}>Verify OTP</button>
    </div>
   ) : (
    <div>OTP Verified Successfully!</div>
   )}
  </div>
 )
}

export default OtpVerify
