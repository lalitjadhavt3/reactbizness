import React from 'react'
import Buttons from '../Components/Buttons'
import { FaGoogle } from "react-icons/fa";

const Home = () => {
 return (
    <>
    <Buttons logo={<FaGoogle />}>google</Buttons>
  <div>
   <button>Increase count</button>
  </div>
  </>
 )
}

export default Home
