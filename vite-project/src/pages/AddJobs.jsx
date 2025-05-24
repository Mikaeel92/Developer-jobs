import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const AddJobs = () => {

  const [type, setType] = useState('Full-Time')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [salary, setSalary] = useState('Under $50K')
  const [location, setLocation] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyDescription, setCompanyDescription] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')  

  const navigate = useNavigate()

  const sendDataToServer = async (newJob) => {
    const response = await fetch('http://localhost:8000/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob)
    })

    if (!response.ok) {
      throw new Error('Failed to add job')
    }

    return response.json()
  }

  const { isLoading, mutate, error } = useMutation({
    mutationFn: sendDataToServer,
    onSuccess: () => {
      toast.success('Job added successfully!')
      navigate('/jobs')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add job')
    }
  })

  const submitForm = (e) => {
    e.preventDefault()

    const newJobFromAllStates = {
      title,
      type,
      description,
      location,
      salary,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactPhone
      }
    }

    mutate(newJobFromAllStates)
  }

  if (isLoading) return <div>Data is loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='flex flex-col w-full h-full items-center justify-center my-8'>
      <form onSubmit={submitForm}>
        <div className='bg-gray-100 w-[600px] flex flex-col gap-4 rounded-md p-4 shadow-md'>
          <h1 className='flex mx-auto font-bold text-2xl'>Add Job Form</h1>


          <div className='flex flex-col gap-2'>
            <label htmlFor='type' className='font-bold'>Job Type</label>
            <select id='type' required className='bg-white p-2 rounded-md'
              value={type} onChange={(e) => setType(e.target.value)}>
              <option value='Full-Time'>Full-Time</option>
              <option value='Part-Time'>Part-Time</option>
              <option value='Remote'>Remote</option>
              <option value='Internship'>Internship</option>
            </select>
          </div>


          <div className='flex flex-col gap-2'>
            <label htmlFor='job-title' className='font-bold'>Job Listing Name</label>
            <input id='job-title' type='text' required
              className='bg-white rounded-md p-2'
              value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>


          <div className='flex flex-col gap-2'>
            <label htmlFor='description' className='font-bold'>Description</label>
            <textarea id='description' rows='4' placeholder='Add any job duties, expectations, requirements, etc'
              className='bg-white p-2 rounded-md' required
              value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>


          <div className='flex flex-col gap-2'>
            <label htmlFor='salary' className='font-bold'>Salary</label>
            <select id='salary' required className='bg-white p-2 text-red-700 rounded-md'
              value={salary} onChange={(e) => setSalary(e.target.value)}>
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
            <input id='location' type='text' placeholder='Company Location' required
              className='bg-white p-2 rounded-md'
              value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>


          <h1 className='font-bold text-2xl'>Company Info</h1>


          <div className='flex flex-col gap-2'>
            <label htmlFor='company_name' className='font-bold'>Company Name</label>
            <input id='company_name' type='text' placeholder='Company Name' required
              className='bg-white rounded-md p-2'
              value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>


          <div className='flex flex-col gap-2'>
            <label htmlFor='company_description' className='font-bold'>Company Description</label>
            <textarea id='company_description' rows='4' placeholder='What does your company do?' required
              className='bg-white rounded-md p-2'
              value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} />
          </div>


          <div className='flex flex-col gap-2'>
            <label htmlFor='email' className='font-bold'>Contact Email</label>
            <input id='email' type='email' placeholder='Enter Your Email Address' required
              className='bg-white rounded-md p-2'
              value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
          </div>


          <div className='flex flex-col gap-2'>
            <label htmlFor='phone' className='font-bold'>Contact Phone</label>
            <input id='phone' type='tel' placeholder='Enter Your Phone Number'
              className='bg-white p-2 rounded-md'
              value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
          </div>

          <button type='submit' className='bg-blue-700 hover:bg-blue-600 text-white rounded-full px-40 py-2 font-bold'>
            Add Job
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddJobs