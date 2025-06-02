import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/web-logo.webp'
import { useUserHook } from '../custom-hook/useUserHook.jsx'

const activeClass = ({ isActive }) =>  isActive ? 'text-blue-600 font-bold text-2xl' : 'text-black text-2xl'


const Navbar = () => {
  const { user } = useUserHook()
  return (
    <nav className='w-full h-20 bg-blue-100'>
      <div className='flex max-w-6xl mx-auto items-center justify-between p-2'>
        <div>
        <NavLink to='/' className='flex items-center gap-2'><img src={logo} alt="logo" className='w-14 h-14 rounded-full'/><strong className='text-2xl'>Web Developer's Job Offer</strong></NavLink>
        </div>
        {user ? <h2 className='font-bold'>Hi {user.username}</h2> : <Link to='/login-sign-up'>Loged out</Link>}
        <div className='flex gap-6'>
        <NavLink to='/' className={activeClass}>Home</NavLink>
        <NavLink to='/jobs' className={activeClass}>Jobs</NavLink>
        <NavLink to='add-jobs' className={activeClass}>Add Jobs</NavLink>
        <NavLink to='login-sign-up' className={activeClass}>Login / Sign Up</NavLink>
        </div>
      </div>
    </nav>
  )
}
export default Navbar