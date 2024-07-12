import React from 'react'
import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import '../styles/NavigationHeader.css'
import {BiLeftArrowAlt} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'

const NavigationHeader = ({currentStep}) => {
 const navigate = useNavigate()

 const handleBack = () => {
  navigate(-1) // Go back to the previous page
 }

 const handleClose = () => {
  navigate('/login') // Navigate to the login screen
 }

 return (
  <div className='navigation-header'>
   {currentStep === 1 ? (
    <button onClick={handleClose} className='nav-button'>
     <CgClose />
    </button>
   ) : currentStep > 1 ? (
    <button onClick={handleBack} className='nav-button'>
     <BiLeftArrowAlt />
    </button>
   ) : null}
  </div>
 )
}

NavigationHeader.propTypes = {
 currentStep: PropTypes.number.isRequired,
}

export default NavigationHeader
