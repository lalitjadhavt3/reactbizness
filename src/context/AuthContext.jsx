import React, {createContext, useState, useContext} from 'react'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
 const [isAuthenticated, setIsAuthenticated] = useState(false) // Initial state

 const setAuthStatus = (status) => {
  setIsAuthenticated(status)
 }

 return (
  <AuthContext.Provider value={{isAuthenticated, setAuthStatus}}>{children}</AuthContext.Provider>
 )
}

export const useAuth = () => useContext(AuthContext)
