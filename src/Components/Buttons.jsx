import React, {Children} from 'react'

import '../styles/button.css'
const Button = ({text, logo}) => {
 return (
  <>
   <div className='btn-box'>
    <button className='btn'>
     <span className='btn-logo'>{logo}</span>
     {text}
    </button>
   </div>
  </>
 )
}

export default Button
