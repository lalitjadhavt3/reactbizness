import React, {useEffect, useState} from 'react'
import '../styles/accountdetails.css'
import CustomModal from './CustomModal'
import api from '../utils/api'

const HomeTab = () => {
 const [currentSlide, setCurrentSlide] = useState(0)
 const [modalOpen, setModalOpen] = useState(false)
 const [modalProps, setModalProps] = useState([])
 const [homeTabs, setHomeTabs] = useState([])
 const handleModalOpen = (btn) => {
  setModalOpen(true)
  setModalProps(btn)
 }
 const handleModalClose = () => {
  setModalOpen(false)
 }
 useEffect(() => {
  const fetchTabs = async () => {
   try {
    const postData = {
     user_id: localStorage.getItem('user_id'),
    }
    const response = await api.post('/hometab_links.php', postData)
    // console.log('🚀 ~ fetchTabs ~ response:', response?.data?.data)
    // console.log('🚀 ~buttonName:', buttonNames)

    setHomeTabs(response?.data?.data)
   } catch (error) {
    console.error('Login failed:', error)
   }
  }
  fetchTabs()
 }, [])

 const itemsPerSlide = 9
 const totalSlides = Math.ceil(homeTabs.length / itemsPerSlide)

 const nextSlide = () => {
  setCurrentSlide((prev) => (prev + 1) % totalSlides)
 }

 const prevSlide = () => {
  setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
 }

 const goToSlide = (index) => {
  setCurrentSlide(index)
 }

 return (
  <div className='account-box'>
   <div className='slider-container'>
    <button className='prev-button' onClick={prevSlide}>
     ‹
    </button>
    <div className='slider'>
     <div className='slides' style={{transform: `translateX(-${currentSlide * 100}%)`}}>
      {Array.from({length: totalSlides}).map((_, slideIndex) => (
       <div className='slide' key={slideIndex}>
        {homeTabs
         .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
         .map((button) => (
          <a
           key={button.id}
           rel='noopener noreferrer'
           href={!button?.isChangeable ? button.url : null}
           target={!button?.isChangeable ? '_blank' : null}
           onClick={() => {
            button?.isChangeable ? handleModalOpen(button) : console.log('not changeable')
           }}
          >
           <button className='button' style={{backgroundColor: button.backgroundColor}}>
            <img src={button.image} className='buttonImage' alt={button.title} />
           </button>
           <span className='buttonTitle'>{button.title}</span>
          </a>
         ))}
       </div>
      ))}
     </div>
    </div>
    <button className='next-button' onClick={nextSlide}>
     ›
    </button>
   </div>
   <CustomModal
    open={modalOpen}
    handleClose={handleModalClose}
    headerText={modalProps?.title}
    inputFieldLabel={modalProps?.inputFieldLabel}
    textInputVal={modalProps?.textInputVal}
    apiUrl={modalProps?.apiUrl}
    //onSubmit={handleModalSubmit}
   />
   <div className='dots'>
    {Array.from({length: totalSlides}).map((_, index) => (
     <span
      key={index}
      className={`dot ${index === currentSlide ? 'active' : ''}`}
      onClick={() => goToSlide(index)}
     />
    ))}
   </div>
  </div>
 )
}

export default HomeTab
