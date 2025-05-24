import React from 'react'
import FetchJobs from '../components/FetchJobs'

const Jobs = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <FetchJobs wrapperClass='grid grid-cols-2 gap-8 w-full max-w-7xl mx-auto my-8'/>
    </div>
  )
}

export default Jobs