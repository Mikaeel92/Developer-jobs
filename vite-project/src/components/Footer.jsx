import React from 'react'
import logo from '../assets/web-logo.webp'

const Footer = () => {
  return (
    <div className='flex flex-col items-center w-screen h-40 bg-gray-300'>
      <div className='flex items-center justify-center p-4 gap-2'>
        <img alt='logo' src={logo} className='h-20 w-20 rounded-full'/>
        <h1 className='font-bold text-2xl'>Finding Job Company</h1>
      </div>
        <p>We are Finding Job Company, and our mission is to make job hunting easier for all developers.</p>
    </div>
  )
}

export default Footer