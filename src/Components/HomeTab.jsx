import React, { useState } from 'react';
import '../styles/accountdetails.css'

const HomeTab = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const buttonNames = [
    {
     id: 1,
     backgroundColor: '#FF0000',
     image: 'https://login.biznesstag.com/assets/website.png',
     url: 'https://example.com/page1',
     title: 'Website',
    },
    {
     id: 2,
     backgroundColor: '#fd7e14',
     image: 'https://login.biznesstag.com/assets/save%20contact.png',
     url: 'https://example.com/page1',
     title: 'Add Contact',
    },
    {
     id: 3,
     backgroundColor: '#008037',
     image: 'https://login.biznesstag.com/assets/payment.png',
     url: 'https://example.com/page1',
     title: 'Payment',
    },
    {
     id: 4,
     backgroundColor: '#edce53',
     image: '	https://login.biznesstag.com/assets/offers.png',
     url: 'https://example.com/page1',
     title: 'Offers',
    },
    {
     id: 5,
     backgroundColor: '#7ED957',
     image: '	https://login.biznesstag.com/assets/whatsapp.png',
     url: 'https://example.com/page1',
     title: 'Whatsapp',
    },
    {
     id: 6,
     backgroundColor: '#5271FF',
     image: 'https://login.biznesstag.com/assets/location.png',
     url: 'https://example.com/page1',
     title: 'Location',
    },
    {
     id: 7,
     backgroundColor: '#00C2CB',
     image: '	https://login.biznesstag.com/assets/about%20us.png',
     url: 'https://example.com/page1',
     title: 'About us',
    },
    {
     id: 8,
     backgroundColor: '#004AAD',
     image: '	https://login.biznesstag.com/assets/catlogue%20product.png',
     url: 'https://example.com/page1',
     title: 'Catalogue',
    },
    {
     id: 10,
     backgroundColor: '#3b5999',
     image: '	https://login.biznesstag.com/assets/facebook.png ',
     url: 'https://example.com/page1',
     title: 'Facebook',
    },
    {
     id: 11,
     backgroundColor: '#6a3398',
     image: 'https://login.biznesstag.com/assets/instagram.png ',
     url: 'https://example.com/page1',
     title: 'Instagram',
    },
    {
     id: 12,
     backgroundColor: '#0072b1',
     image: 'https://login.biznesstag.com/assets/linkdin.png ',
     url: 'https://example.com/page1',
     title: 'LinkedIn',
    },
    {
     id: 13,
     backgroundColor: '#00c2cb',
     image: 'https://login.biznesstag.com/assets/tweeter.png ',
     url: 'https://example.com/page1',
     title: 'Twitter',
    },
    {
     id: 14,
     backgroundColor: '#fe0000',
     image: 'https://login.biznesstag.com/assets/youtube.png ',
     url: 'https://example.com/page1',
     title: 'Youtube',
    },
    {
     id: 15,
     backgroundColor: '#EDCE53',
     image: '	https://login.biznesstag.com/assets/snapchats.png',
     url: 'https://example.com/page1',
     title: 'Snapchat',
    },
    {
     id: 16,
     backgroundColor: '#c8222c',
     image: 'https://login.biznesstag.com/assets/pinit.png ',
     url: 'https://example.com/page1',
     title: 'Pinterest',
    },
    {
     id: 17,
     backgroundColor: '#FF914D',
     image: '	https://login.biznesstag.com/assets/uploaddoc.png ',
     url: 'https://example.com/page1',
     title: 'Document',
    },
    {
     id: 18,
     backgroundColor: '#008037',
     image: '	https://login.biznesstag.com/assets/link_upload.png ',
     url: 'https://example.com/page1',
     title: 'Link',
    },
   ]

  const itemsPerSlide = 9;
  const totalSlides = Math.ceil(buttonNames.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="account-box">
      <div className="slider-container">
        <button className="prev-button" onClick={prevSlide}>‹</button>
        <div className="slider">
          <div
            className="slides"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div className="slide" key={slideIndex}>
                {buttonNames.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((button) => (
                  <a key={button.id} href={button.url} target="_blank" rel="noopener noreferrer">
                    <button className="button" style={{ backgroundColor: button.backgroundColor }}>
                      <img src={button.image} className="buttonImage" alt={button.title} />
                    </button>
                    <span className="buttonTitle">{button.title}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <button className="next-button" onClick={nextSlide}>›</button>
      </div>
      <div className="dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeTab;
