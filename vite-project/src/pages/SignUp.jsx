import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserHook } from '../custom-hook/useUserHook'

const SignUp = () => {

    const [passwordField, setPassWordField] = useState('')
    const [usernameField, setUserNameField] = useState('')
    const [roleField, setRoleField] = useState('')

    const navigate = useNavigate()
    const { setUser } = useUserHook()

    const submitForm = async (e) => {
        e.preventDefault()

        if(usernameField.trim() === '' || passwordField.trim() === '') {
            return alert('Please fill the field')
        }

        if(passwordField.length < 4) {
            return alert('password must be more than 4 characters')
        }

        const newUserData = {
            username: usernameField,
            password: passwordField,
            role: roleField
        }
        mutate(newUserData)
    }

    const postUserDataToServer = async (user) => {
        const response = await fetch('http://localhost:8000/users',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(user)
        })
        if(!response.ok) {
            throw new Error('failed to post data to server')
        }
        const data = await response.json()
        return data
    }

    const {isLoading, mutate} = useMutation({
        mutationFn: postUserDataToServer,
        onSuccess: (user) => {
            localStorage.setItem('user', JSON.stringify(user))
            setUser(user)
            alert(`Successfully sign up! ${user.username}`)
            setPassWordField('')
            setUserNameField('')
            navigate('/')
        },
        onError: (error) => {
            alert(error.message || 'Can not sign up')
        }
    })

    if(isLoading) {
        return <div>Data is Loading...</div>
    }

  return (
<div className="flex items-center justify-center bg-gray-100">
  <form
    onSubmit={submitForm}
    className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm space-y-5 h-96"
  >
    <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

    <div className="flex flex-col gap-1">
      <label htmlFor="userName" className="font-medium text-gray-700">
        Username
      </label>
      <input
        id="userName"
        placeholder="Enter your username"
        type="text"
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={usernameField}
        onChange={(e) => setUserNameField(e.target.value)}
      />
    </div>

    <div className="flex flex-col gap-1">
      <label htmlFor="passWord" className="font-medium text-gray-700">
        Password
      </label>
      <input
        id="passWord"
        placeholder="Enter your password"
        type="password"
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={passwordField}
        onChange={(e) => setPassWordField(e.target.value)}
      />
    </div>
    <div>
      <select name='role' value={roleField} onChange={(e) => setRoleField(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
    >
      Sign Up
    </button>
  </form>
</div>
  )
}

export default SignUp
