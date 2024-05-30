import React from 'react'

import '../styles/button.css'
const Footer = () => {
 return (
  <div
   style={{
    position: 'fixed',
    zIndex: '200',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '0%',
    width: '100vw',
    backgroundColor: 'lightgray',
    height: '45px',
   }}
  >
   <label>
    <b>© Copyright - Bizness shelter</b>
   </label>
  </div>
 )
}

export default Footer
