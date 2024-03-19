import React from 'react'
import '../styles/SignIn.css'
import logo from '../assets/logo.png'
import { FaGoogle } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import Buttons from '../Components/Buttons'
function SignIn() {
    
 return (
  <div className='container'>
   <div className='login-box'>

    <div className='logo-box'>
        <img src={logo}  className='logo' alt="" />
    </div>
    <div className='text-box'>
     <h2>Sign In</h2>
   <p >Continue to Business Shelter</p>
   </div>
    <form>
        <div className='form-box card'>
        <div className='input-group input-wrapper'>
        <input type='text' id='input' required ></input>
      <label 
             for='input' 
             className='placeholder'>
        Email
      </label>
          </div>
          <div className='input-group input-wrapper '> 
          <input type='password' id='input' required ></input>
          
      <label 
             for='input' 
             className='placeholder'>
        Password
      
     
      </label>
    
      
     <a  href=""   className='fa-eye'><FaEye /></a> 
          </div>


          <div className='button-box'>
          <Buttons>Login</Buttons>
           </div>
           


       </div>
    </form>
    
    {/* <div className='google-btn-box'> */}
    {/* <button className='btn-google-login'> <FaGoogle className='btn-logo'/> Login with Google</button> */}
    <Buttons logo={<FaGoogle />}>Login with Google</Buttons>
    {/* </div> */}
    <div className='Forgot_pass'>
    <a href="">Forgot your password?</a>
    </div>
   
   <div className='ragister'>
   <span className='text-muted '>Don't have an account?</span> <a href="">Register</a>
   </div>
   </div>
  
  </div>
 )
}

export default SignIn
