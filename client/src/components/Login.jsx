import React, { useState } from 'react'
import NavBar from './NavBar'
import background from "../assets/background.jpg"

const Login = () => {
  const pageBg = "bg-white bg-opacity-0"
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
      const response = await fetch('http://localhost:5000/api/auth/login', {
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
      console.error('Error during login:', error);
      setMessage('Something went wrong during login.')
    }
  }
  
  return (
    <div className="md:min-h-screen flex items-center justify-center bg-contain md:bg-cover bg-center"
      style={{ backgroundImage: `url(${background})`}}>
      <div className="m-10 p-2 md:m-32 md:p-8 bg-white bg-opacity-75 rounded-[3vw] overflow-hidden">
        <NavBar bgColor={pageBg}/>

        <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>
          <strong>Email: </strong>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className='text-black'
          />
        </label>

        <label>
          <strong>Password: </strong>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className='text-black'
          />
        </label>

        <button type='submit'>Submit</button>
      </form>
      {message && <p>{message}</p>}
      </div>

    </div>  
  )
}

export default Login