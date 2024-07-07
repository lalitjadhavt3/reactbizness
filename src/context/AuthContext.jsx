import React, {createContext, useState, useContext} from 'react'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
 const [isAuthenticated, setIsAuthenticated] = useState(false) // Initial state
 const [userRegistrationDataFromGoogle, setUserRegistrationDataFromGoogle] = useState([])
 const setAuthStatus = (status) => {
  setIsAuthenticated(status)
 }

 return (
  <AuthContext.Provider
   value={{
    isAuthenticated,
    setAuthStatus,
    userRegistrationDataFromGoogle,
    setUserRegistrationDataFromGoogle,
   }}
  >
   {children}
  </AuthContext.Provider>
 )
}

export const useAuth = () => useContext(AuthContext)
