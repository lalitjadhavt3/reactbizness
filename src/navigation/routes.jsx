import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../screens/Home'
import NotFound from '../screens/NotFound'
import SignIn from '../screens/SignIn'
import Register from '../screens/Register'
import ForgotPassword from '../screens/Forgot_password'
import EditProfile from '../screens/EditProfile'
import Analytics from '../screens/Analytics'
import Pricing from '../screens/Pricing'
import ProfileViews from '../screens/Profile_Views'
import AuthCheck from '../utils/AuthCheck'
const NavigationRouter = () => {
 return (
  <AuthCheck>
   <Routes>
    <Route path='/' element={<ProfileViews />} />
    <Route path='*' element={<NotFound />} />
    <Route path='/login' element={<SignIn />} />
    <Route path='/register' element={<Register />} />
    <Route path='/forgotPassword' element={<ForgotPassword />} />
    <Route path='/editProfile/:id' element={<EditProfile />} />
    <Route path='/account' element={<ProfileViews />} />
    <Route path='/pricing' element={<Pricing />} />
    <Route path='/analytics' element={<Analytics />} />
    <Route path='/profile' element={<ProfileViews />} />
   </Routes>
  </AuthCheck>
 )
}

export default NavigationRouter
