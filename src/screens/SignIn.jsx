import React from 'react'
import '../styles/SignIn.css'
function SignIn() {
 return (
  <div className='container'>
   <div className='login-box'>
    <h2>Sign In</h2>
    <form>
     <div className='input-group'>
      <label htmlFor='username'>Username:</label>
      <input type='text' id='username' name='username' placeholder='Enter your username' />
     </div>
     <div className='input-group'>
      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' name='password' placeholder='Enter your password' />
     </div>
     <button type='submit' className='btn-login'>
      Login
     </button>
    </form>
    <div className='separator'>or</div>
    <button className='btn-google-login'>Login with Google</button>
   </div>
  </div>
 )
}

export default SignIn
