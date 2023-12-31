import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [token, setToken_] = useState(localStorage.getItem('token'))
  const setToken = newToken => {
    setToken_(newToken)
    localStorage.setItem('token', newToken)
  }

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = token
      localStorage.setItem('token', token)
    } else {
      delete axios.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
    }
  }, [token])

  const contextValue = useMemo(() => {
    return { token, setToken }
  }, [token])

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
