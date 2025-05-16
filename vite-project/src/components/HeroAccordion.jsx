import React from 'react'
import { useState } from 'react'

const HeroAccordion = () => {

    const [showText, setShowText] = useState(false)

    let paragraph = `Are you a passionate React developer looking for the right opportunity?
            Whether you’re skilled in building dynamic user interfaces, working with hooks, 
            or managing state with Redux or React Query, there’s a job out there that matches your strengths. 
            From startups to large tech companies, many are searching for developers just like you. Explore job offers, 
            match your skills with the right role, and take the next step in your React career today!`

    if(!showText) {
        paragraph = paragraph.substring(0, 150) + '...'
    }

  return (
    <div className='bg-blue-300 w-[500px] h-[400px] rounded-md shadow-md text-gray-700 flex flex-col relative mt-10 p-2'>
        <div className='flex flex-col gap-2'>
        <h1 className='flex item-center justify-center font-bold text-3xl mt-4'>Become a React Dev</h1>
        <h2 className='font-bold text-2xl flex item-center justify-center'>Find the React job that fits your skill set</h2>
        <p className='max-w-[400px] flex text-justify items-center justify-center leading-normal mx-auto'>{paragraph}</p>
        </div>
        <div className='flex justify-end absolute bottom-4 right-4'>
            <button className='text-white p-2 rounded-md hover:bg-gray-400 shadow-md'
            onClick={() => setShowText((prev) => !prev)}>
                {showText ? 'Less' : 'More'}
            </button>
        </div>
    </div>
  )
}
export default HeroAccordion