import React, { useState } from 'react'
import { Link } from 'react-router';

const Signup = () => {

  const apiUrl = 'https://v54-tier3-team-36.onrender.com'
  const localApiUrl = 'http://localhost:5000'

  const backendUrl = process.env.NODE_ENV === 'production' ? apiUrl:localApiUrl

  const [formData, setFormData ] = useState({
    name: "",
    email: "",
    password: "",
    age: 0 //maybe will change to select/options
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
      const response = await fetch(`${backendUrl}/api/auth/signup`, {
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
        console.log(result.data)
        //redirect to home page and save user

      }

    } catch (error) {
      console.error('Error during signup:', error);
      setMessage('Something went wrong during signup.')
    }
  }

  return (
    <div className='w-[95%] h-[70vh] bg-emerald-900 text-lg bg-opacity-75 rounded-[3vw] px-12 md:pt-12 mb-10 mx-auto mt-8'>
      <form className="flex flex-col py-5 items-center" onSubmit={handleSubmit}>
        <h2 className='text-3xl md:text-5xl font-bold'>Animal World</h2>
        <h2 className='italic md:text-xl'>~Ready for some fun!~</h2>
        
        <div className='flex flex-col w-full md:w-[50%] py-6'>
          <label htmlFor='name'>
            <strong>Name</strong>
          </label>
          <input
            type="text"
            id='name'
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder='What should we call you?'
            className='text-black pl-2 md:pl-6'
          />

          <label htmlFor="email" className='mt-2'>
            <strong>Email</strong>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder='How we will contact you'
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
            placeholder='Keep it a secret!'
            value={formData.password}
            onChange={handleChange}
            className='text-black pl-2 md:pl-6'
          />

          <label htmlFor='age' className='mt-2'>
            <strong>Age: </strong>
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className='text-black pl-2 md:pl-6'
          />
        </div>

        <button className="bg-teal-800 shadow-md shadow-teal-500/50 hover:opacity-85 rounded-full text-white" type='submit'>Sign up</button>
        {message && <p>{message}</p>}

        <p className=''>Already signed up?  
          <Link to="/login"> 
            <button className='bg-teal-800 shadow-md shadow-teal-500/50 hover:opacity-85 rounded-full text-white ml-2'>Login</button>
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Signup