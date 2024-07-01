import React from 'react'

import '../styles/button.css'
import {Button} from '@mui/material'
const CustomButton = ({btnText, logoIcon, iconPosition, btnStyle, onClick, btnType, disabled}) => {
 return (
  <div className='btn-box' style={btnStyle}>
   {iconPosition == 'start' && (
    <Button
     variant='contained'
     disabled={disabled}
     className='btnStyles'
     onClick={onClick}
     type={btnType || 'button'}
    >
     {logoIcon && <span className='btn-logo'>{logoIcon}</span>}
     {btnText}
    </Button>
   )}
   {iconPosition == 'end' && (
    <Button
     variant='contained'
     disabled={disabled}
     className='btn'
     onClick={onClick}
     type={btnType || 'button'}
    >
     {btnText}
     {logoIcon && <span className='btn-logo'>{logoIcon}</span>}
    </Button>
   )}
   {iconPosition == '' && (
    <Button
     variant='contained'
     disabled={disabled}
     className='btn'
     onClick={onClick}
     type={btnType || 'button'}
    >
     {btnText}
    </Button>
   )}
  </div>
 )
}

export default CustomButton
