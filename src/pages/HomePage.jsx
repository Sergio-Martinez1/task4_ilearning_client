import { useEffect } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { useNavigate } from "react-router-dom"

function HomePage() {
  const { isAuthenticated, checkLogin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    checkLogin()
  }, [])

  useEffect(() => {
    if (isAuthenticated) navigate('/admin')
  }, [isAuthenticated])

  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <span className="font-bold text-5xl mb-10">Welcome to the Admin Panel</span>
      <span className="mb-10 text-xl">To acces this panel please <a className="text-blue-400" href="/login">login</a> or <a className="text-blue-400" href="/sigup">create an account</a>.</span>
      <div className="flex gap-x-5">
        <a className="border-black border-[1px] px-4 py-3 font-bold text-xl bg-zinc-800 rounded-xl w-24 flex justify-center items-center hover:bg-zinc-900 active:bg-zinc-800" href="/login">Login</a>
        <a className="border-black border-[1px] px-4 py-3 font-bold text-xl bg-zinc-800 rounded-xl w-24 flex justify-center items-center hover:bg-zinc-900 active:bg-zinc-800" href="/signup">Signup</a>
      </div>
    </main>
  )
}

export default HomePage
