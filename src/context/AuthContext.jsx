import { createContext, useState, useContext, useEffect } from "react";
import { logInRequest, logOutRequest, verifyStatus, verifyTokenRequest } from '../api/auth.js'
import { signUpRequest } from '../api/auth.js'

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

  useEffect(() => {
    if (errors) {
      const timer = setTimeout(() => {
        setErrors(null)
      }, 2000)
      return () => { clearTimeout(timer) }
    }
  }, [errors])

  const logIn = async (user) => {
    try {
      const res = await logInRequest(user)
      if (res.status == 200) {
        await checkLogin()
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
      }
      else {
        setErrors(res.data.message)
      }
    } catch (error) {
      setErrors(error.response.data.message)
    }
  }

  const signUp = async (values) => {
    try {
      const res = await signUpRequest(values)
      if (res.status == 200) {
        return true
      } else {
        setErrors(res.data.message)
      }
    } catch (error) {
      setErrors(error.response.data.message)
    }
    return false
  }

  const checkLogin = async () => {
    let res = null
    try {
      res = await verifyTokenRequest()
    } catch (error) {
      setIsAuthenticated(false)
      setUser(null)
      setLoading(false)
      return false
    }

    try {
      if (res) {
        const res2 = await verifyStatus(res.data.id)
        if (res2.status == 200) {
          setLoading(false)
          setIsAuthenticated(true)
          setUser(res.data)
          return true
        }
      }
    } catch (error) {
      setIsAuthenticated(false)
      setUser(null)
      setLoading(false)
      setErrors(error.response.data.message)
      return false
    }
    return false
  }

  return (
    < AuthContext.Provider value={{
      logIn,
      logOut,
      signUp,
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
