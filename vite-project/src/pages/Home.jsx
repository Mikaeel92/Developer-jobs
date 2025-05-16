import React from 'react'
import Slider from '../components/Slider'
import HeroAccordion from '../components/HeroAccordion'
import HomeJobs from '../components/HomeJobs'

const Home = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-start gap-6 bg-gray-100'>
      <HeroAccordion/>
      <Slider/>
      <HomeJobs/>
    </div>
  )
}

export default Home