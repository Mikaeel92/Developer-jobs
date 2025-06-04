import { createContext, useContext, useState, useEffect } from "react";
import React from "react";

const UserContext = createContext(null)

export const UserProvider = ({children}) => {

  const [user, setUser] = useState(null)

    useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <UserContext.Provider value={{user, setUser, logout}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserHook = () => useContext(UserContext)