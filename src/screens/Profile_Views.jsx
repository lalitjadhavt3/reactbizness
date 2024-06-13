import React from 'react'
import '../styles/accountdetails.css'
import Header from '../components/Header'
import { FaLocationArrow, FaLocationPin } from 'react-icons/fa6'
import { HiLocationMarker } from 'react-icons/hi'
import Tabs from './Tabs'
import FooterBtn from '../components/FooterBtn'
const Profile_Views = () => {
 
 const btnicones = [
  {
   id: 1,
   icon: 'https://login.biznesstag.com/assets/call.png',
   url: 'https://example.com/page1',
   title: 'Call',
   bgColor:'#38af25'
  },
  {
   id: 2,
   icon: 'https://login.biznesstag.com/assets/sms.png',
   url: 'https://example.com/page1',
   title: 'SMS',
   bgColor:'#006c80'
  },
  {
   id: 3,
   icon: 'https://login.biznesstag.com/assets/email.png',
   url: 'https://example.com/page1',
   title: 'Mail',
   bgColor:'orangered'
  },
  {
   id: 4,
   icon: 'https://login.biznesstag.com/assets/share.png',
   url: 'https://example.com/page1',
   title: 'Share',
   bgColor:'orange'
  },
 ]

 return (
  <div className='container'>
   <div style={{position: 'fixed', zIndex: '200', right: '4%', top: '2%',}}>
    <Header />
   </div>
   <div className='account-box'>
    <div className='userInfo' style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <div className='userPicAcc' style={{minWidth:75}}>
     <h1 style={{fontSize: '60px', fontWeight: 'bold'}}>L</h1>
    </div>
    <div className='useNa'  style={{width:'60%',textAlign:'left',margin:'0% 5%'}}>
     <h3>kaikotech</h3>
     <p style={{fontSize:'14px'}}>
       <HiLocationMarker/> Nashik
      <br />
      <span className='open'>Timing :</span> 09:30 AM TO 06:00 PM
       <br/>
      Information Technology
     </p>
    </div>
    </div>
    <div className='btnAccountContainer'>
     {btnicones.map((i) => (
      <a key={i.id} href={i.url} target='_blank' rel='noopener noreferrer' className='a-btn'>
       <button className='btnAccount' style={{backgroundColor:i.bgColor}}>
        <img src={i.icon} alt='icon' className='btnimg' />
       </button>
       <div className='btnTitle'>{i.title}</div>
      </a>
     ))}
    </div>
    {/* <div className="buttonmainContainer"> */}
    <Tabs/>
    <FooterBtn/>
    
   </div>
  </div>
 )
}

export default Profile_Views
