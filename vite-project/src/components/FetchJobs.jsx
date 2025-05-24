import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Card from './Card'
import { Link } from 'react-router-dom'
import { IoLocation } from "react-icons/io5";

const FetchJobs = ({ isHome = false, wrapperClass = '' }) => {

  const fetchJobs = async () => {
  const response = await fetch(isHome ? 'http://localhost:8000/jobs?_limit=2' : 'http://localhost:8000/jobs')
  if(!response.ok) throw new Error('Failed to fetch!')
  const data = await response.json()
  console.log(data)
  return data
}

  const {data, isLoading, error} = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  })

  if(isLoading) return <p>Data Is Loading...</p>
  if(error) return <p>Error: {error.message}</p>

  return (
    <div className={wrapperClass}>
      {data && data.map((item) => (
        <Card key={item.id} background='bg-blue-300'>
          <div className='p-2 flex flex-col gap-2'>
          <h1 className='font-bold text-2xl'>{item.title}</h1>
          <h3 className='text-red-800'>{item.type}</h3>
          <h3>{item.salary}</h3>
          <h3 className='flex items-center'><IoLocation/> {item.location}</h3>
          <Link to={`/jobs/${item.id}`} className='absolute bottom-1 right-1 bg-gray-400 p-2 rounded-md mb-2 mr-2'>Read More</Link>
          </div>

        </Card>
      ))}
    </div>
  )
}

export default FetchJobs