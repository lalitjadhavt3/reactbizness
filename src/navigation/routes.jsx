import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from '../screens/Home'
import NotFound from '../screens/NotFound'
import SignIn from '../screens/SignIn'
import Button from '../Components/Buttons'
const NavigationRouter = () => {
 return (
  <Router>
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='*' element={<NotFound />} />
    <Route path='/signin' element={<SignIn />} />
   </Routes>
  </Router>
 )
}
export default NavigationRouter
