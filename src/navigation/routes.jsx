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
import BusinessTimings from '../screens/BusinessTimings'
import LocationFetcher from '../screens/LocationFetcher'
import RegisterUser from '../screens/RegisterUser'
import Login from '../screens/Login'
import AccountCreated from '../screens/AccountCreated'
import AccType from '../screens/AccType'
import BusinessCategory from '../screens/BusinessCategory'
import BusinessWebsite from '../screens/BusinessWebsite'
// ... other imports

const NavigationRouter = () => {
 const {isAuthenticated} = useAuth()

 return (
  <Routes>
   {/* Public routes */}
   <Route path='/login' element={isAuthenticated ? <Navigate to='/' /> : <Login />} />
   <Route path='/register' element={isAuthenticated ? <Navigate to='/' /> : <RegisterUser />} />
   <Route path='/forgotPassword' element={<ForgotPassword />} />

   {/* Registration routes */}
   <Route path='/registration/personal-info' element={<PersonalInfo />} />
   <Route path='/registration/business-info' element={<BusinessInfo />} />
   <Route path='/registration/business-category' element={<BusinessCategory />} />
   <Route path='/registration/business-website' element={<BusinessWebsite />} />
   <Route path='/registration/business-location' element={<BusinessLocation />} />
   <Route path='/registration/business-contact' element={<BusinessContact />} />
   <Route path='/registration/business-upi' element={<BusinessUpi />} />
   <Route path='/registration/business-timings' element={<BusinessTimings />} />
   <Route path='/registration/business-locationDetect' element={<LocationFetcher />} />
   <Route path='/registration/acc-type' element={<AccType />} />

   <Route path='/account-created' element={<AccountCreated />} />
   {/* Protected routes */}
   <Route
    path='/'
    element={
     <AuthCheck>
      <ProfileViews />
     </AuthCheck>
    }
   />
   <Route
    path='/editProfile/:id'
    element={
     <AuthCheck>
      <EditProfile />
     </AuthCheck>
    }
   />
   <Route
    path='/account'
    element={
     <AuthCheck>
      <ProfileViews />
     </AuthCheck>
    }
   />
   <Route
    path='/pricing'
    element={
     <AuthCheck>
      <Pricing />
     </AuthCheck>
    }
   />
   <Route
    path='/analytics'
    element={
     <AuthCheck>
      <Analytics />
     </AuthCheck>
    }
   />
   <Route
    path='/profile'
    element={
     <AuthCheck>
      <ProfileViews />
     </AuthCheck>
    }
   />

   {/* Catch-all route */}
   <Route path='*' element={<NotFound />} />
  </Routes>
 )
}

export default NavigationRouter
