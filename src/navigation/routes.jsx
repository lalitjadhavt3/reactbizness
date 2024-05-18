import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from '../screens/Home'
import NotFound from '../screens/NotFound'
import SignIn from '../screens/SignIn'
import Register from '../screens/Register'
import Forgot_password from '../screens/Forgot_password'
const NavigationRouter = () => {
 return (
  <Router>
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='*' element={<NotFound />} />
    <Route path='/signin' element={<SignIn />} />
    <Route path='/register' element={<Register />} />
    <Route path='/forgot' element={<Forgot_password />} />
   </Routes>
  </Router>
 )
}
export default NavigationRouter
