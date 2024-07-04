import React, {useEffect, useState} from 'react'
import '../styles/accountdetails.css'
import Header from '../components/Header'
import {HiLocationMarker} from 'react-icons/hi'
import Tabs from './Tabs'
import FooterBtn from '../components/FooterBtn'
import api from '../utils/api'
import {RWebShare} from 'react-web-share'

const Profile_Views = () => {
 const [callTabs, setCallTabs] = useState([])
 const [shareTabData, setShareTabData] = useState([])

 useEffect(() => {
  const fetchTabs = async () => {
   try {
    const postData = {
     fromTab: 'Profile',
     user_id: localStorage.getItem('user_id'),
    }
    const response = await api.post('/hometab_links.php', postData)
    // console.log('🚀 ~ fetchTabs ~ response:', response?.data?.data)
    // console.log('🚀 ~buttonName:', buttonNames)

    setCallTabs(response?.data?.data)
    console.log('🚀 ~ fetchTabs ~ response:', response?.data)
    if (response?.data?.data?.length > 0) {
     const shareProfileTab = response?.data?.data.find(
      (tab) => tab.url && tab.url.includes('/shareProfile/')
     )

     if (shareProfileTab) {
      setShareTabData(shareProfileTab)
     } else {
      console.log('No shareProfile tab found.')
     }
    } else {
     console.error('Data Not found')
    }
   } catch (error) {
    console.error('Login failed:', error)
   }
  }
  fetchTabs()
 }, [])

 return (
  <div className='container'>
   <div style={{position: 'fixed', zIndex: '200', right: '4%', top: '2%'}}>
    <Header />
   </div>
   <div className='account-box'>
    <div
     className='userInfo'
     style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
    >
     <div className='userPicAcc' style={{minWidth: 75}}>
      <h1 style={{fontSize: '60px', fontWeight: 'bold'}}>L</h1>
     </div>
     <div className='useNa' style={{width: '60%', textAlign: 'left', margin: '0% 5%'}}>
      <h3>kaikotech</h3>
      <p style={{fontSize: '14px'}}>
       <HiLocationMarker /> Nashik
       <br />
       <span className='open'>Timing :</span> 09:30 AM TO 06:00 PM
       <br />
       Information Technology
      </p>
     </div>
    </div>
    <div className='btnAccountContainer'>
     {callTabs.slice(0, 3).map((i) => (
      <a key={i.id} className='a-btn' href={i.url}>
       <button className='btnAccount' style={{backgroundColor: i.bgColor}}>
        <img src={i.icon} alt='icon' className='btnimg' />
       </button>
       <div className='btnTitle'>{i.title}</div>
      </a>
     ))}
     <RWebShare
      data={{
       text: shareTabData?.bgColor,
       url: shareTabData?.url,
       title: shareTabData?.title,
      }}
      onClick={() => console.log('shared successfully!')}
     >
      <a className='a-btn'>
       <button className='btnAccount' style={{backgroundColor: 'orange'}}>
        <img src='/assets/icons/share.png' alt='icon' className='btnimg' />
       </button>
       <div className='btnTitle'>Share</div>
      </a>
     </RWebShare>
    </div>

    {/* <div className="buttonmainContainer"> */}
    <Tabs />
    <FooterBtn />
   </div>
  </div>
 )
}

export default Profile_Views
