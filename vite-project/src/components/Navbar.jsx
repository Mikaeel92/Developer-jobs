import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/web-logo.webp'
import { useUserHook } from '../custom-hook/useUserHook.jsx'

const activeClass = ({ isActive }) =>
  isActive ? 'text-blue-600 font-bold text-2xl' : 'text-black text-2xl'

const Navbar = () => {
  const { user, logout } = useUserHook()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login-sign-up')
  }

  return (
    <nav className='w-full h-20 bg-blue-100'>
      <div className='flex max-w-6xl mx-auto items-center justify-between p-2'>

        <div>
          <NavLink to='/' className='flex items-center gap-2'>
            <img src={logo} alt="logo" className='w-14 h-14 rounded-full'/>
            <strong className='text-2xl'>Web Developer's Job Offer</strong>
          </NavLink>
        </div>

        <div className='flex items-center gap-4'>
          {user ? (
            <>
              <h2 className='font-bold'>Hi {user.username}</h2>
              <button
                onClick={handleLogout}
                className='bg-red-600 text-white px-3 py-1 rounded-md font-bold hover:bg-red-500'
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to='/login-sign-up'
              className='bg-blue-600 text-white px-3 py-1 rounded-md font-bold hover:bg-blue-500'
            >
              Login / Sign Up
            </Link>
          )}
        </div>

        <div className='flex gap-6'>
          <NavLink to='/' className={activeClass}>Home</NavLink>
          <NavLink to='/jobs' className={activeClass}>Jobs</NavLink>
          <NavLink to='/add-jobs' className={activeClass}>Add Jobs</NavLink>
          {!user && (
            <NavLink to='/login-sign-up' className={activeClass}>
              Login / Sign Up
            </NavLink>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar