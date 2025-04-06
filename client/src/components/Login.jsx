import React, { useState } from 'react'

const Login = () => {
  const apiUrl = 'https://v54-tier3-team-36.onrender.com'
  const localApiUrl = 'http://localhost:5000'

  const backendUrl = process.env.NODE_ENV === 'production' ? apiUrl:localApiUrl

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
        console.log(result.data)
        //redirect to home page and save user

      }

    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Something went wrong during login.')
    }
  }
  
  return (
    <div className="w-full">
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
  )
}

export default Login