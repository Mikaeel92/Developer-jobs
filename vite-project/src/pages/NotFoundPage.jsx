import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center w-screen h-screen gap-4 mt-12'>
        <FaExclamationTriangle className='text-amber-400 size-20'/>
        <h1 className='font-bold text-3xl'>404 Not Found</h1>
        <p>This page does not exist</p>
        <Link className='bg-gray-700 text-white rounded-md p-2' to='/'>Go Back</Link>
    </div>
  )
}

export default NotFoundPage