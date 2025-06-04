import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoLocation } from "react-icons/io5";
import { useUserHook } from '../custom-hook/useUserHook';


const SingleJobPage = () => {

const { id } = useParams()

const navigate = useNavigate()

const { user } = useUserHook()

const fetchJob = async () => {
    const response = await fetch (`http://localhost:8000/jobs/${id}`)
    if(!response.ok) throw new Error('Failed to fetch!')
    const data = await response.json()
  console.log(data)
    return data
}

const {isLoading, data: job, error} = useQuery({
    queryKey: ['job', id],
    queryFn: fetchJob
})

const isOwner = user?.id === job?.userId
const isAdmin = user?.role === 'admin'

// if(isLoading) {
//   return <div>Data is Loding...</div>
// }

// if(error) {
//   return <div>Error..{error.message}</div>
// }

// const deleteFromDataBase = async (id) => {
//   const response = await fetch(`http://localhost:8000/jobs/${id}`, {
//     method: 'DELETE'
//   })
//   return
// }

// const onDelete = (id) => {
//   const confirm = window.confirm('Are you sure to delete this job?')

//   if(!confirm) return

//   deleteFromDataBase(id)

//   navigate('/jobs')
// }

const deleteJob = async (id) => {
  const response = await fetch (`http://localhost:8000/jobs/${id}`, {
    method: 'DELETE'
  })
  return
}

const {isPending, mutate, error: deleteError} = useMutation( {
  mutationFn: deleteJob,
  onSuccess: () => {
    alert('Job deleted successfully'),
    navigate('/jobs')
  }
})

const onDelete = (id) => {
const confirm = window.confirm('Are you sure to delete this job?')

if(!confirm) return

mutate(id)
}


return (
  <>
    {isLoading && <div>Loading...</div>}
    {error && <div>Error: {error.message}</div>}
    {job && (
      <div className='flex flex-col gap-2 bg-gray-100 w-screen min-h-screen'>
        <div className='flex items-center gap-2 ml-4 my-6 text-blue-600 hover:text-blue-800'>
          <FaArrowLeft />
          <Link to='/jobs'>Back to Jobs</Link>
        </div>
        <div className='bg-blue-100'>
          <div className='w-screen mx-auto flex gap-6 p-6'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col w-[900px] h-[160px] bg-white rounded-md p-4 gap-4 shadow-md'>
                <h3 className='text-gray-500'>{job.type}</h3>
                <h1 className='text-2xl font-bold'>{job.title}</h1>
                <div className='flex gap-1 items-center text-red-700'>
                  <IoLocation />
                  <h3>{job.location}</h3>
                </div>
              </div>
              <div className='flex flex-col w-[900px] h-[250px] bg-white rounded-md p-4 shadow-md gap-4'>
                <h1 className='font-bold text-blue-700'>Job Description</h1>
                <h3>{job.description}</h3>
                <h1 className='font-bold text-blue-700'>Salary</h1>
                <h3 className='text-red-700'>{job.salary}</h3>
              </div>
            </div>
            <aside className='w-[350px] rounded-md flex flex-col gap-4'>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-bold mb-6'>Company Info</h3>
                <h2 className='text-2xl'>{job.company.name}</h2>
                <p className='my-2'>{job.company.description}</p>
                <hr className='my-4' />
                <h3 className='text-xl'>Contact Email:</h3>
                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.company.contactEmail}
                </p>
                <h3 className='text-xl'>Contact Phone:</h3>
                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.company.contactPhone}
                </p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md flex flex-col gap-4'>
                <h1 className='font-bold text-xl'>Manage Job</h1>
                {(isAdmin || isOwner) && (
                  <>
                <Link to={`/edit-job/${job.id}`} className='bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 flex item-center justify-center shadow-md'>Edit Job</Link>
                <button className='bg-red-600 hover:bg-red-700 text-white rounded-full p-2 flex item-center justify-center shadow-md'
                onClick={() => onDelete(job.id)}>Delete Job</button>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    )}
  </>
)
}

export default SingleJobPage