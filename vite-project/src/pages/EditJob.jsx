import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'

const EditJob = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const fetchJob = async () => {
    const response = await fetch(`http://localhost:8000/jobs/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch!')
    }
    return await response.json()
  }

  const { isLoading, data: job, error } = useQuery({
    queryKey: ['job', id],
    queryFn: fetchJob
  })

  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [salary, setSalary] = useState('Under $50K')
  const [location, setLocation] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyDescription, setCompanyDescription] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactNumber, setContactNumber] = useState('')

  useEffect(() => {
    if (job) {
      setTitle(job.title)
      setType(job.type)
      setDescription(job.description)
      setSalary(job.salary)
      setLocation(job.location)
      if (job.company) {
        setCompanyName(job.company.name || '')
        setCompanyDescription(job.company.description || '')
        setContactEmail(job.company.contactEmail || '')
        setContactNumber(job.company.contactNumber || '')
      }
    }
  }, [job])

  const updateJob = async (update) => {
    const response = await fetch(`http://localhost:8000/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(update)
    })

    if (!response.ok) {
      throw new Error('Failed to update the job!')
    }

    return await response.json()
  }

  const { mutate: updateMutate, isPending } = useMutation({
    mutationFn: updateJob,
    onSuccess: () => {
      alert('Job updated successfully!')
      navigate('/jobs')
    },
    onError: (err) => {
      alert(err.message)
    }
  })

  const submitForm = (e) => {
    e.preventDefault()
    const updatedJobFromAllStates = {
      title,
      type,
      description,
      location,
      salary,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactNumber
      }
    }
    updateMutate(updatedJobFromAllStates)
  }

  if (isLoading) return <div>Loading job data...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='flex flex-col w-full h-full items-center justify-center my-8'>
      <form onSubmit={submitForm}>
        <div className='bg-gray-100 w-[600px] flex flex-col gap-4 rounded-md p-4 shadow-md'>
          <h1 className='flex mx-auto font-bold text-2xl'>Edit Job Form</h1>

          <div className='flex flex-col gap-2'>
            <label htmlFor='type' className='font-bold'>Job Type</label>
            <select
              id='type'
              required
              className='bg-white p-2 rounded-md'
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value='Full-Time'>Full-Time</option>
              <option value='Part-Time'>Part-Time</option>
              <option value='Remote'>Remote</option>
              <option value='Internship'>Internship</option>
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='job-title' className='font-bold'>Job Listing Name</label>
            <input
              id='job-title'
              type='text'
              required
              className='bg-white rounded-md p-2'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='description' className='font-bold'>Description</label>
            <textarea
              id='description'
              rows='4'
              required
              placeholder='Add any job duties, expectations, requirements, etc'
              className='bg-white p-2 rounded-md'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='salary' className='font-bold'>Salary</label>
            <select
              id='salary'
              required
              className='bg-white p-2 text-red-700 rounded-md'
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            >
              <option value='Under $50K'>Under $50K</option>
              <option value='$50K - 60K'>$50K - $60K</option>
              <option value='$60K - 70K'>$60K - $70K</option>
              <option value='$70K - 80K'>$70K - $80K</option>
              <option value='$80K - 90K'>$80K - $90K</option>
              <option value='$90K - 100K'>$90K - $100K</option>
              <option value='$100K - 125K'>$100K - $125K</option>
              <option value='$125K - 150K'>$125K - $150K</option>
              <option value='$150K - 175K'>$150K - $175K</option>
              <option value='$175K - 200K'>$175K - $200K</option>
              <option value='Over $200K'>Over $200K</option>
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='location' className='font-bold'>Location</label>
            <input
              id='location'
              type='text'
              required
              className='bg-white p-2 rounded-md'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <h1 className='font-bold text-2xl'>Company Info</h1>

          <div className='flex flex-col gap-2'>
            <label htmlFor='company_name' className='font-bold'>Company Name</label>
            <input
              id='company_name'
              type='text'
              required
              className='bg-white rounded-md p-2'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='company_description' className='font-bold'>Company Description</label>
            <textarea
              id='company_description'
              rows='4'
              required
              className='bg-white rounded-md p-2'
              placeholder='What does your company do?'
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='email' className='font-bold'>Contact Email</label>
            <input
              id='email'
              type='email'
              required
              className='bg-white rounded-md p-2'
              placeholder='Enter your email'
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='phone' className='font-bold'>Contact Phone</label>
            <input
              id='phone'
              type='tel'
              className='bg-white rounded-md p-2'
              placeholder='Enter your phone number'
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='bg-blue-700 hover:bg-blue-600 text-white rounded-full px-40 py-2 font-bold'
            disabled={isPending}
          >
            {isPending ? 'Updating...' : 'Update Job'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditJob