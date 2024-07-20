import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext.jsx"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { logIn, isAuthenticated, errors: loginError } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/admin')
  }, [isAuthenticated])

  const onSubmit = handleSubmit((data) => {
    logIn(data)
  })

  return (
    <main className='w-full flex justify-center items-center flex-grow'>
      <div className='bg-zinc-800 max-w-md p-10 rounded-md w-96'>
        <form onSubmit={onSubmit} className='flex flex-col items-center'>
          <span className='mb-6 font-bold text-3xl'>Log In</span>
          {loginError && <div className='w-full bg-red-500 px-4 py-1 text-sm font-bold text-white mb-2 rounded-md flex justify-center'>{loginError}</div>}
          <input type="email" {...register("email", { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Email'
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}
          <input type="password" {...register("password", { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Password'
          />
          {errors.password && <p className='text-red-500'>Password is required</p>}
          <button className='border-white border-[1px] rounded-md p-2 mt-6 w-24 bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800' type='submit'>Login</button>
        </form>
      </div>
    </main>
  )
}

export default LoginPage
