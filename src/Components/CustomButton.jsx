import React from 'react'

import '../styles/button.css'
const CustomButton = ({btnText, logoIcon, iconPosition}) => {
 return (
  <div className='btn-box'>
   {iconPosition == 'start' && (
    <button className='btn'>
     {logoIcon && <span className='btn-logo'>{logoIcon}</span>}
     {btnText}
    </button>
   )}
   {iconPosition == 'end' && (
    <button className='btn'>
     {btnText}
     {logoIcon && <span className='btn-logo'>{logoIcon}</span>}
    </button>
   )}
  </div>
 )
}

export default CustomButton
