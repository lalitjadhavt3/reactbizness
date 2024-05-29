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
    bottom: '0%',
    width: '100vw',
    backgroundColor: 'lightgray',
   }}
  >
   <label>Bizness shelter</label>
  </div>
 )
}

export default Footer
