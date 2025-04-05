import React, { useState } from 'react'
import { Link } from 'react-router';

const Signup = () => {
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
      const response = await fetch('http://localhost:5000/api/auth/signup', {
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
    <div className='h-screen bg-gray-900 text-lg'>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>

        <label>
          <strong>Name: </strong>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className='text-black'
          />
        </label>

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

        <label>
          <strong>Age: </strong>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className='text-black'
          />
        </label>

        <button type='submit'>Submit</button>
      </form>
      {message && <p>{message}</p>}

      <Link to="/login">
      <button>Login</button>
      </Link>
    </div>
  )
}

export default Signup