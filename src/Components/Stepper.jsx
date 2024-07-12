import React from 'react'
import '../styles/Stepper.css'

const Stepper = ({currentStep, totalSteps}) => {
 const progressPercentage = ((currentStep - 1) / totalSteps) * 100

 return (
  <div className='stepper-container'>
   <div className='progress-bar'>
    <div className='progress' style={{width: `${progressPercentage}%`}} />
   </div>
  </div>
 )
}

export default Stepper
