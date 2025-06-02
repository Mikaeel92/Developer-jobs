import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserHook } from '../custom-hook/useUserHook'

const Login = () => {

const [userNameInput, setUserNameInput] = useState('')
const [passWord, setPassWord] = useState('')
const [roleField, setRoleField] = useState('')

const navigate = useNavigate()
const { setUser } = useUserHook()

const submitForm = (e) => {
e.preventDefault()
const newUser = {
   username: userNameInput,
   password: passWord,
   role: roleField
}
mutate(newUser)
}

const sendUserDataToDb = async (user) => {
    const response = await fetch(`http://localhost:8000/users?username=${user.username}&password=${user.password}`)
    const data = await response.json()

    if(data.length === 0) {
        throw new Error ('user not exist')
    }
    return data[0]
}

const {isLoading, mutate} = useMutation({
    mutationFn: sendUserDataToDb,
    onSuccess: (user) => {
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
        alert(`Welcome ${user.username}`)
        navigate('/')
    },
    onError: (error) => {
        alert(error.message || 'Error: invalid user')
    }
})

if(isLoading) return <div>Loading...</div>

  return (
<div className=" flex items-center justify-center bg-gray-100 h-96">
  <form
    onSubmit={submitForm}
    className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm space-y-5 h-96"
  >
    <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

    <div className="flex flex-col gap-1">
      <label htmlFor="username" className="font-medium text-gray-700">
        Username
      </label>
      <input
        id="username"
        placeholder="Enter your username..."
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={userNameInput}
        onChange={(e) => setUserNameInput(e.target.value)}
      />
    </div>

    <div className="flex flex-col gap-1">
      <label htmlFor="password" className="font-medium text-gray-700">
        Password
      </label>
      <input
        id="password"
        type="password"
        placeholder="Enter your password..."
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={passWord}
        onChange={(e) => setPassWord(e.target.value)}
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
      Login
    </button>
  </form>
</div>
  )
}

export default Login
