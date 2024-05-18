import React, {useState} from 'react'
import logo from '../assets/logo.png'
import '../styles/forgot_pass.css'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
const Forgot_password = () => {
 const [number, setNumber] = useState('')

 const handleSubmit = (e) => {
  e.preventDefault()
  console.log(number)
  alert('OTP Send Successfully on this Number' + number)
 }

 return (
  <>
   <form onSubmit={handleSubmit}>
    <div className='container'>
     <div className='login-box'>
      <div className='logo-box'>
       <img src={logo} className='logo' alt='' />
      </div>
      <div className='text-box'>
       <h1>Forgot Password</h1>
      </div>

      <div className='d-flex'>
       <PhoneInput
        placeholder='Enter phone number'
        value={number}
        onChange={(value) => setNumber(value)}
       />
      </div>
      <div className='button-box'></div>
      <div className='ragister'>
       <span className='text-muted'>Back to</span> <a href='/signin'>Log in</a>
      </div>
     </div>
    </div>
   </form>
  </>
 )
}

export default Forgot_password
