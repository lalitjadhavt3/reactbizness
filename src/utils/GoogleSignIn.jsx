import React from 'react'
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google'

const clientId = '738104839523-i45021b20bvc3mso7mvk4ipictjegivs.apps.googleusercontent.com' // Replace with your Client ID

const GoogleSignIn = ({onSuccess, onError}) => {
 return (
  <GoogleOAuthProvider>
   <GoogleLogin
    clientId={clientId}
    buttonText='Sign in with Google'
    onSuccess={onSuccess}
    onError={onError}
   />
  </GoogleOAuthProvider>
 )
}

export default GoogleSignIn
