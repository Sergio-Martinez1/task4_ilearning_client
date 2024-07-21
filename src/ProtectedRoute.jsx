import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import { useEffect } from "react"

function ProtectedRoute() {
  const { isAuthenticated, loading, checkLogin } = useAuth()

  useEffect(()=>{
    checkLogin()
  },[])

  if (loading) return <h1>Loading...</h1>
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />

  return (
    <Outlet />
  )
}

export default ProtectedRoute
