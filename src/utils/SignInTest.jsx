import React, {useContext} from 'react'
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'
import {useAuth} from '../context/AuthContext'

function SignInTest({user, setUser, navigate}) {
 const {userRegistrationDataFromGoogle, setUserRegistrationDataFromGoogle} = useAuth()

 const handleGoogleSuccess = (credentialResponse) => {
  const decoded = jwtDecode(credentialResponse.credential)
  setUserRegistrationDataFromGoogle(decoded)
  navigate('/registration/personal-info')
 }

 return (
  <GoogleOAuthProvider
   clientId={'738104839523-i45021b20bvc3mso7mvk4ipictjegivs.apps.googleusercontent.com'}
  >
   <div className='googleLogin' style={{display: 'flex', justifyContent: 'center'}}>
    {user?.length > 0 ? null : (
     <GoogleLogin
      style={{}}
      onSuccess={handleGoogleSuccess}
      onError={() => console.log('Login Failed')}
     />
    )}
   </div>
  </GoogleOAuthProvider>
 )
}

export default SignInTest
