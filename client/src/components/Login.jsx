import React, { useState } from 'react'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router'


const Login = () => {
  const apiUrl = 'https://v54-tier3-team-36.onrender.com'
  const localApiUrl = 'http://localhost:5000'

  const backendUrl = process.env.NODE_ENV === 'production' ? apiUrl:localApiUrl

  const navigate = useNavigate()
  const { login } = useAuth();

  const [formData, setFormData ] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage ] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData)

    try {
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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
    <div className='w-[95%] h-[70vh] bg-emerald-900 text-lg bg-opacity-75 rounded-[3vw] px-12 md:pt-12 mb-10 mx-auto mt-8'>
      <form className="flex flex-col py-5 items-center" onSubmit={handleSubmit}>
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
            value={formData.email}
            onChange={handleChange}
            className='text-black pl-2 md:pl-6'
          />

          <label htmlFor='password' className='mt-2'>
            <strong>Password: </strong>
          </label>
          <input
            type="password"
            id='password'
            name="password"
            placeholder='*******'
            value={formData.password}
            onChange={handleChange}
            className='text-black pl-2 md:pl-6'
          />

        </div>
        <button className="bg-teal-800 shadow-md shadow-teal-500/50 hover:opacity-85 rounded-full text-white" type='submit'>Log In</button>
        {message && <p>{message}</p>}
      </form>
    </div>  
  )
}

export default Login