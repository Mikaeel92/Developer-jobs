import React, { useEffect, useState } from 'react'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

import pic1 from '../../public/web-1.webp'
import pic2 from '../../public/web-2.jpeg'
import pic3 from '../../public/web-3.webp'
import pic4 from '../../public/web-4.jpeg'

const images = [pic1, pic2, pic3, pic4]

const handelSlideShow = (prev) => {
    let next = prev + 1
    if(next >= images.length) {
        next = 0
    }
    return next
}

const Slider = () => {

const [currentPic, setCurrentPic] = useState(0)

useEffect(() => {
    const timer = setInterval(() => {
        setCurrentPic((prev) => handelSlideShow(prev) )
    }, 3000);
      return () => clearInterval(timer)
},[])

const handlePrev = () => {
    setCurrentPic(currentPic === 0 ? images.length -1 : currentPic - 1)
}

const handleNext = () => {
    setCurrentPic(currentPic === images.length -1 ? 0 : currentPic + 1)
}

  return (
    <div className='flex w-[800px] justify-end items-center mt-10 relative'>
        <IoArrowBackCircleOutline className='text-2xl text-gray-700 cursor-pointer' onClick={handlePrev}/>
        <img src={images[currentPic]} alt='poster' className='object-cover object-center rounded-md shadow-lg w-[800px] h-[400px]'/>
        <IoArrowForwardCircleOutline className='mr-6 font-bold text-2xl text-gray-700 cursor-pointer' onClick={handleNext}/>
            <span className='flex justify-end items-center absolute bottom-4 gap-2 mr-96'>
        {images.map((item, index) => (
            <button key={index} 
            className={index === currentPic ? 'bg-blue-400 w-5 h-5 cursor-pointer rounded-full p-2 shadow-md' : 'bg-gray-200 w-5 h-5 cursor-pointer rounded-full p-2 shadow-md'}
            onClick={() => setCurrentPic(index)}>
            </button>
        ))}
    </span>
    </div>
  )
}

export default Slider
