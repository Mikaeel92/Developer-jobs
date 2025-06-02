import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'

const LoginSIgnUp = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center gap-8 bg-gray-100'>
        <Login/>
        <SignUp/>
    </div>
  )
}

export default LoginSIgnUp