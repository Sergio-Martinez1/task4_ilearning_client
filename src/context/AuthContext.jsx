import { createContext, useState, useContext, useEffect } from "react";
import { logInRequest, logOutRequest, verifyStatus, verifyTokenRequest } from '../api/auth.js'
import Cookies from "js-cookie";

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  const logIn = async (user) => {
    try {
      const res = await logInRequest(user)
      if (res.status == 200) {
        const pass = await checkLogin()
        if (pass == false) return
        setUser(res.data)
        setIsAuthenticated(true)
      }
      else {
        setErrors(res.data.message)
      }
    } catch (error) {
      setErrors(error.response.data.message)
    }
  }

  const logOut = async () => {
    try {
      const res = await logOutRequest()
      if (res.status == 200) {
        setUser(null)
        setIsAuthenticated(false)
        await checkLogin()
      }
      else {
        setErrors(res.data.message)
      }
    } catch (error) {
      setErrors(error.response.data.message)
    }
  }

  const checkLogin = async () => {
    const cookies = Cookies.get()
    if (cookies.token) {
      try {
        const res = await verifyTokenRequest(cookies.token)
        if (res.status == 200) {
          const res2 = await verifyStatus(res.data.id)
          if (res2.status == 401) {
            setIsAuthenticated(false)
            setUser(null)
            setLoading(false)
            setErrors("No autorizado")
            return false
          }
          setLoading(false)
          setIsAuthenticated(true)
          setUser(res.data)
          return true
        }
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
        return false
      } catch (error) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
        setErrors(error.response.data.message)
      }
    }
    setIsAuthenticated(false)
    setUser(null)
    setLoading(false)
    return false
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    < AuthContext.Provider value={{
      logIn,
      logOut,
      checkLogin,
      user,
      isAuthenticated,
      errors,
      loading
    }} >
      {children}
    </AuthContext.Provider >
  )
}
