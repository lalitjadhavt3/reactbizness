import React from 'react'
import '../styles/Loader.css'
const Loader = () => {
 return (
  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
   <div className='loader'>
    <span className='ball ball1'></span>
    <span className='ball'></span>
    <span className='ball'></span>
    <span className='ball'></span>
    <span className='ball'></span>
   </div>
  </div>
 )
}
export default Loader
