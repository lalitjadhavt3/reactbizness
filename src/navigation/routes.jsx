import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from '../screens/Home'
import NotFound from '../screens/NotFound'
import SignIn from '../screens/SignIn'
import Register from '../screens/Register'
import Forgot_password from '../screens/Forgot_password'
import EditProfile from '../screens/EditProfile'
import Analytics from '../screens/Analytics'
import {AccordionDetails} from '@mui/material'
import Pricing from '../screens/Pricing'
import Profile_Views from '../screens/Profile_Views'
const NavigationRouter = () => {
 return (
  <Router>
   <Routes>
    <Route path='/' element={<Profile_Views />} />
    <Route path='*' element={<NotFound />} />
    <Route path='/login' element={<SignIn />} />
    <Route path='/register' element={<Register />} />
    <Route path='/forgotPassword' element={<Forgot_password />} />
    <Route path='/editProfile/:id' element={<EditProfile />} />
    <Route path='/account' element={<Profile_Views />} />
    <Route path='/pricing' element={<Pricing />} />
    <Route path='/analytics' element={<Analytics />} />
    <Route path='/profile' element={<Profile_Views />} />
   </Routes>
  </Router>
 )
}
export default NavigationRouter
