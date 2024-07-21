import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function NavBar() {
  const { user, logOut, errors: loginError } = useAuth()
  const location = useLocation()

  let navContent = (<Link className="font-bold hover:text-gray-300 active:text-white" to="/login">Login</Link>)

  if (location.pathname == '/login') {
    navContent = (<Link className="font-bold hover:text-gray-300 active:text-white" to="/signup">Signup</Link>)
  } else if (location.pathname == '/admin' && user) {
    navContent = (
      <div className="flex gap-x-5 items-center">
        <span>Hello, {user.name}!</span>
        <button className="underline text-blue-400 font-bold hover:text-blue-500 active:text-blue-400" onClick={logOut}>Logout</button>
      </div>
    )
  }

  return (
    <nav className="flex w-full justify-between bg-zinc-900 h-16 px-8 py-4 items-center">
      <a className="font-bold text-2xl" href="/">Admin Panel</a>
      {navContent}
    </nav>
  )
}

export default NavBar
