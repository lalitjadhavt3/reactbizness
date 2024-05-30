import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/css/lineicons.css'
import '../assets/css/animate.css'
import '../assets/css/style.css'
import WOW from 'wowjs'
import {Link} from 'react-router-dom'

const NotFound = () => {
 const [countdown, setCountdown] = useState({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
 })

 useEffect(() => {
  new WOW.WOW().init()
  const targetDate = new Date('2020-10-14T00:00:00')

  const interval = setInterval(() => {
   const now = new Date().getTime()
   const distance = targetDate - now

   if (distance < 0) {
    clearInterval(interval)
   } else {
    setCountdown({
     days: Math.floor(distance / (1000 * 60 * 60 * 24)),
     hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
     minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
     seconds: Math.floor((distance % (1000 * 60)) / 1000),
    })
   }
  }, 1000)

  return () => clearInterval(interval)
 }, [])

 return (
  <main className='main-14'>
   <div className='main-wrapper demo-14'>
    <img src='/shape-1.svg' alt='' className='shape shape-1' />
    <img src='/shape-2.svg' alt='' className='shape shape-2' />
    <img src='/shape-3.svg' alt='' className='shape shape-3' />
    <img src='/shape-4.svg' alt='' className='shape shape-4' />
    <img src='/shape-5.svg' alt='' className='shape shape-5' />
    <img src='/shape-6.svg' alt='' className='shape shape-6' />
    <div className='container'>
     <div className='row align-items-center'>
      <div className='col-xl-5 col-lg-6 col-md-6 col-sm-12'>
       <div className='img-wrapper wow fadeInLeft' data-wow-delay='.2s'>
        <img src='/img-1.svg' alt='' />
       </div>
      </div>
      <div className='col-xl-7 col-lg-6 col-md-6 col-sm-12 ' style={{marginTop: '5%'}}>
       <div className='content-wrapper'>
        <h1 className='wow fadeInDown' data-wow-delay='.2s'>
         Page is Under Construction
        </h1>
        <p className='wow fadeInUp' data-wow-delay='.4s'>
         This page will soon live and running. Thank you for the Patience
        </p>
        <Link
         className='btn btn-info wow fadeInUp'
         to={'/'}
         data-wow-delay='.5s'
         style={{marginTop: '5%'}}
        >
         Go Back
        </Link>
       </div>
      </div>
     </div>
    </div>
   </div>
  </main>
 )
}

export default NotFound
