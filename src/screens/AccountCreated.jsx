import React from 'react'
import '../styles/AccountCreated.css'
import CustomButton from '../components/CustomButton'
import {useNavigate} from 'react-router-dom'
import Lottie from 'react-lottie'
import animationData from '../assets/acc.json'

const AccountCreated = () => {
 const navigate = useNavigate()
 const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
   preserveAspectRatio: 'xMidYMid slice',
  },
 }
 return (
  <div className='account-created-container'>
   <Lottie options={defaultOptions} height={400} width={400} />
   <div>
    <CustomButton
     btnText={'Go Back to Login'}
     btnType={'button'}
     btnStyle={{backgroundColor: 'black'}}
     onClick={() => {
      navigate('/')
     }}
    />
   </div>
  </div>
 )
}

export default AccountCreated
