import React from 'react'

import '../styles/button.css'
import {Button} from '@mui/material'
const CustomButton = ({btnText, logoIcon, iconPosition, btnStyle, onClick}) => {
 return (
  <div className='btn-box' style={btnStyle}>
   {iconPosition == 'start' && (
    <Button variant='contained' className='btnStyles' onClick={onClick} type='button'>
     {logoIcon && <span className='btn-logo'>{logoIcon}</span>}
     {btnText}
    </Button>
   )}
   {iconPosition == 'end' && (
    <Button variant='contained' className='btn' onClick={onClick} type='button'>
     {btnText}
     {logoIcon && <span className='btn-logo'>{logoIcon}</span>}
    </Button>
   )}
   {iconPosition == '' && (
    <Button variant='contained' className='btn' onClick={onClick} type='button'>
     {btnText}
    </Button>
   )}
  </div>
 )
}

export default CustomButton
