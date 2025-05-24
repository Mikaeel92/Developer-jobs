import React from 'react'
import { Link } from 'react-router-dom'

const ViewAllJobs = () => {
  return (
    <div className='flex items-center justify-center mb-6'>
        <Link to='/jobs' className='bg-gray-600 hover:bg-gray-700 text-white rounded-md px-40 py-4 shadow-md'>View All Jobs</Link>
    </div>
  )
}

export default ViewAllJobs