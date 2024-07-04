import React, {useState} from 'react'
import {Container, Box, TextField, Typography, Link, Divider, IconButton} from '@mui/material'
import {IoMdEye, IoMdEyeOff} from 'react-icons/io'
import CustomButton from '../components/CustomButton'
import GoogleIcon from '../assets/icons/GoogleIcon'
import {useNavigate} from 'react-router-dom'

const Login = () => {
 const [showPassword, setShowPassword] = useState(false)
 const navigate = useNavigate()

 const handleClickShowPassword = () => {
  setShowPassword(!showPassword)
 }

 return (
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
      Login
     </Typography>
     <Box component='form'>
      <TextField fullWidth label='Email' margin='normal' />
      <TextField
       fullWidth
       label='Password'
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
      <Box textAlign='right' mb={2}>
       <Link href='/forgotPassword' variant='body2'>
        Forgot password?
       </Link>
      </Box>
      <CustomButton
       btnText='Login'
       iconPosition='start'
       btnType='submit'
       btnStyle={{borderRadius: '7px'}}
      />
     </Box>
     <Box mt={2} textAlign='center'>
      <Typography variant='body2'>
       Don’t have an account?{' '}
       <Link href='#' onClick={() => navigate('/register')}>
        Signup
       </Link>
      </Typography>
     </Box>
     <Divider sx={{my: 2}}>Or</Divider>
     <CustomButton
      btnText='Login with Google'
      logoIcon={<GoogleIcon />}
      iconPosition='start'
      btnType='button'
      btnStyle={{
       backgroundColor: 'white',
       color: 'black',
       display: 'flex',
       justifyContent: 'flex-start',
       alignContent: 'center',
       borderRadius: '7px',
       borderWidth: '1',
      }}
     />
    </Box>
   </Box>
  </Container>
 )
}

export default Login
