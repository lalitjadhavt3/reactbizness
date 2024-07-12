import React from 'react'
import '../styles/button.css'
import {Button} from '@mui/material'

const CustomButton = ({
 btnText,
 logoIcon,
 iconPosition,
 btnStyle,
 onClick,
 btnType,
 disabled,
 props,
 divStyle,
}) => {
 return (
  <div className='btn-box' style={divStyle}>
   <Button
    variant='contained'
    disabled={disabled}
    className='btnStyles'
    onClick={onClick}
    type={btnType || 'button'}
    style={btnStyle}
    {...props}
   >
    {iconPosition === 'start' && logoIcon && <span className='btn-logo'>{logoIcon}</span>}
    <span className='btn-text'>{btnText}</span>
    {iconPosition === 'end' && logoIcon && (
     <span className='btn-logo' style={{left: 'auto', right: '10px'}}>
      {logoIcon}
     </span>
    )}
   </Button>
  </div>
 )
}

export default CustomButton
