import { useForm } from 'react-hook-form'
import { signUpRequest } from '../api/auth.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function SignupPage() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [signUpError, setSignUpError] = useState(null)

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await signUpRequest(values)
      if (res.status == 200) {
        navigate('/login')
      }
      else {
        setSignUpError(res.data.message)
      }
    } catch (error) {
      setSignUpError(error.response.data.message)
    }
  })

  return (
    <main className='w-full h-screen flex justify-center items-center flex-grow'>
      <div className='bg-zinc-800 max-w-md p-10 rounded-md w-96'>
        <form onSubmit={onSubmit} className='flex flex-col items-center'>
          <span className='mb-6 font-bold text-3xl'>Sign Up</span>
          {signUpError && <div className='w-full bg-red-500 px-4 py-1 text-sm font-bold text-white mb-2 rounded-md flex justify-center'>{signUpError}</div>}
          <input type="text" {...register("name", { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Name'
          />
          {errors.name && <p className='text-red-500'>Name is required</p>}
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
          <button className='border-white border-[1px] rounded-md p-2 mt-6 w-24 bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800' type='submit'>SignUp</button>
        </form>
      </div>

    </main>
  )
}

export default SignupPage
