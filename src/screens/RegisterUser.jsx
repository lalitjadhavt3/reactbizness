import React, {useState, useEffect} from 'react'
import {Container, Box, TextField, Typography, Link, Divider, IconButton} from '@mui/material'
import {IoMdEye, IoMdEyeOff} from 'react-icons/io'
import CustomButton from '../components/CustomButton'
import {useNavigate} from 'react-router-dom'
import GoogleIcon from '../assets/icons/GoogleIcon'
import {colors} from '../utils/CommonStyles'
import {GoogleOAuthProvider, useGoogleLogin} from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'
import SignInTest from '../utils/SignInTest'
import {useAuth} from '../context/AuthContext'

const Signup = () => {
 const [showPassword, setShowPassword] = useState(false)
 const {userRegistrationDataFromGoogle} = useAuth()

 const [showConfirmPassword, setShowConfirmPassword] = useState(false)
 const [userData, setUserData] = useState([])
 const navigate = useNavigate()

 const handleClickShowPassword = () => {
  setShowPassword(!showPassword)
 }
 const handleClickShowConfirmPassword = () => {
  setShowConfirmPassword(!showConfirmPassword)
 }

 return (
  <GoogleOAuthProvider clientId='YOUR_GOOGLE_CLIENT_ID'>
   <Container maxWidth='sm'>
    <Box
     display='flex'
     flexDirection='column'
     alignItems='center'
     justifyContent='center'
     minHeight='100vh'
    >
     <Box bgcolor='white' p={4} borderRadius={2} boxShadow={3} width='100%'>
      <Typography variant='h4' component='h1' gutterBottom textAlign='center'>
       Signup
      </Typography>
      <Box component='form'>
       <TextField fullWidth label='Email' margin='normal' />
       <TextField
        fullWidth
        label='Create password'
        margin='normal'
        type={showPassword ? 'text' : 'password'}
        InputProps={{
         endAdornment: (
          <IconButton onClick={handleClickShowPassword} edge='end'>
           {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
          </IconButton>
         ),
        }}
       />
       <TextField
        fullWidth
        label='Confirm password'
        margin='normal'
        type={showConfirmPassword ? 'text' : 'password'}
        InputProps={{
         endAdornment: (
          <IconButton onClick={handleClickShowConfirmPassword} edge='end'>
           {showConfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
          </IconButton>
         ),
        }}
       />
       <CustomButton
        btnText='Signup'
        iconPosition='start'
        btnType='submit'
        btnStyle={{backgroundColor: colors.primaryBtnBg}}
       />
      </Box>
      <Box mt={2} textAlign='center'>
       <Typography variant='body2'>
        Already have an account?{' '}
        <Link href='#' onClick={() => navigate('/')}>
         Login
        </Link>
       </Typography>
      </Box>
      <Divider sx={{my: 2}}>Or</Divider>
      {/* <CustomButton
       btnText='Register with Google'
       logoIcon={<GoogleIcon />}
       iconPosition='start'
       btnType='button'
       btnStyle={{
        backgroundColor: 'white',
        color: 'black',
        display: 'flex',
        justifyContent: 'flex-start',
        alignContent: 'center',
        borderWidth: '1',
       }}
       onClick={() => handleGoogleSignInSuccess()}
      /> */}
      <SignInTest user={userData} navigate={navigate} />
     </Box>
    </Box>
   </Container>
  </GoogleOAuthProvider>
 )
}

export default Signup
