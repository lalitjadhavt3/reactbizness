import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
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
import {useAuth} from '../context/AuthContext'
import PersonalInfo from '../screens/PersonalInfo'
import BusinessInfo from '../screens/BusinessInfo'
import BusinessContact from '../screens/BusinessContact'
import BusinessLocation from '../screens/BusinessLocation'
import BusinessUpi from '../screens/BusinessUpi'
const NavigationRouter = () => {
 const {isAuthenticated} = useAuth() // Access isAuthenticated from AuthContext

 return (
  <>
   {isAuthenticated ? (
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
   ) : (
    <Routes>
     <Route path='/' element={<SignIn />} />
     <Route path='*' element={<NotFound />} />
     <Route path='/login' element={<SignIn />} />
     <Route path='/register' element={<Register />} />
     <Route path='/forgotPassword' element={<ForgotPassword />} />
     <Route path='/registration/personal-info' element={<PersonalInfo />} />
     <Route path='/registration/business-info' element={<BusinessInfo />} />
     <Route path='/registration/business-location' element={<BusinessLocation />} />
     <Route path='/registration/business-contact' element={<BusinessContact />} />
     <Route path='/registration/business-upi' element={<BusinessUpi />} />
    </Routes>
   )}
  </>
 )
}

export default NavigationRouter
