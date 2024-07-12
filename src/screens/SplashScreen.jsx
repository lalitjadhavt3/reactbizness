import React, {useState, useEffect} from 'react'
import '../styles/SplashScreenStyles.css'

const SplashScreen = () => {
 const [showSplash, setShowSplash] = useState(true)

 useEffect(() => {
  // Set a timer to hide the splash screen after 2-3 seconds
  const timer = setTimeout(() => {
   setShowSplash(false)
  }, 1000) // 2.5 seconds

  // Clear the timer if the component unmounts
  return () => clearTimeout(timer)
 }, [])

 if (!showSplash) {
  return null
 }

 return (
  <div className='splash-screen'>
   <img src='/startlogo.png' alt='Splash' className='responsive-image' />
  </div>
 )
}

export default SplashScreen
