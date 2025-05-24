import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'

const HomeCard = () => {
  return (
    <div className='flex w-screen justify-center gap-8 p-6'>
        <Card>
          <h1 className='font-bold text-2xl'>For Developers</h1>
          <p>Browse our React jobs and start your career today</p>
          <button className='flex absolute justify-end bottom-3 right-2 bg-gray-300 rounded-md p-2 hover:bg-gray-400'><Link to='/jobs'>Browse Jobs</Link></button>
        </Card>
        <Card background='bg-blue-100'>
          <h1 className='font-bold text-2xl'>For Employers</h1>
          <p>List your job to find the perfect developer for the role</p>
          <button className='flex absolute justify-end bottom-3 right-2 p-2 bg-blue-300 hover:bg-blue-400 rounded-md'><Link to='/add-jobs'>Add Job</Link></button>
        </Card>
    </div>
  )
}
export default HomeCard