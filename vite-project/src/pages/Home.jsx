import React from 'react'
import Slider from '../components/Slider'
import HeroAccordion from '../components/HeroAccordion'
import HomeCard from '../components/HomeCard'
import ViewAllJobs from '../components/ViewAllJobs'
import FetchJobs from '../components/FetchJobs'

const Home = () => {
  return (
    <div>
    <div className='w-full flex justify-center items-start gap-6 bg-gray-100 p-8'>
      <HeroAccordion/>
      <Slider/>
    </div>
      <HomeCard/>
      <FetchJobs isHome={true} wrapperClass='w-screen h-[250px] bg-gray-100 p-2 mb-6 flex items-center justify-center gap-8 relative'/>
      <ViewAllJobs/>
    </div>
  )
}

export default Home