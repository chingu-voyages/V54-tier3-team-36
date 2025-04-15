import React, { useState } from 'react'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form';


const Login = () => {
  const apiUrl = 'https://v54-tier3-team-36.onrender.com'
  const localApiUrl = 'http://localhost:5000'

  const backendUrl = process.env.NODE_ENV === 'production' ? apiUrl:localApiUrl

  const navigate = useNavigate()
  const { login } = useAuth();

  // const [formData, setFormData ] = useState({
  //   email: "",
  //   password: "",
  // });

  const { 
    register, 
    handleSubmit, 
    formState: {errors}, 
  } = useForm();

  const [message, setMessage ] = useState('')

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value
  //   }));
  // };  

  const onSubmit = async (data) => {
    console.log('Form submitted:', data)

    try {
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json()

      if (!result?.success) {
        setMessage(result?.message)
      } else {
        console.log("LOGIN SUCCESSFULLY")
        const token = result.token
        sessionStorage.setItem('token', token);
        login(token)
        navigate("/")

      }

    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Something went wrong during login.')
    }
  }
  
  return (
    <div className='w-[95%] h-[70vh] bg-emerald-700 text-lg bg-opacity-75 rounded-[3vw] px-12 md:pt-12 mb-10 mx-auto mt-8'>
      <form className="flex flex-col py-5 items-center" onSubmit={handleSubmit(onSubmit)}>
        <h2 className='text-3xl md:text-5xl font-bold'>Animal World</h2>
        <h2 className='italic md:text-xl'>~Let's get back to the fun!~</h2>
        <div className='flex flex-col w-full md:w-[50%] py-6'>
          <label htmlFor="email" className='mt-2'>
            <strong>Email</strong>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder='Email'
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            // value={formData.email}
            // onChange={handleChange}
            className='text-black pl-2 md:pl-3'
          />
          {errors.email && <p className="text-red-700 font-bold text-md">{errors.email.message}</p>}

          <label htmlFor='password' className='mt-2'>
            <strong>Password: </strong>
          </label>
          <input
            type="password"
            id='password'
            name="password"
            placeholder='*******'
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Must be at least 4 characters",
              },
            })}
            // value={formData.password}
            // onChange={handleChange}
            className='text-black pl-2 md:pl-3'
          />
          {errors.password && <p className="text-red-700 font-bold text-md">{errors.password.message}</p>}

        </div>
        <button className="bg-teal-800 shadow-md shadow-teal-500/50 hover:opacity-85 rounded-full text-white" type='submit'>Log In</button>
        {message && <p>{message}</p>}
      </form>
    </div>  
  )
}

export default Login