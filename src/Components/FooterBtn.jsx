import React,{useState} from 'react'

import '../styles/button.css'
import {Button} from '@mui/material'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { HiHeart } from 'react-icons/hi'
import { BiHeart } from 'react-icons/bi'
const FooterBtn = ({ btnStyle, onClickRequestCallBack }) => {
    const [isFilled, setIsFilled] = useState(false);
  
    const handleHeartClick = () => {
      setIsFilled(!isFilled);
    };
 return (
  <div className='btn-box' style={{justifyContent:'space-evenly'}}>
   <Button variant='outlined' className='btnCallback' onClick={onClickRequestCallBack} type='button'  >
    Request a Callback
    </Button>
    <Button variant="outlined" className="btnFav" onClick={handleHeartClick} type="button" color="error">
        {isFilled ? <BsHeartFill size={24} /> : <BsHeart size={24} style={{color:'black'}} />}
      </Button>
  </div>
 )
}

export default FooterBtn
