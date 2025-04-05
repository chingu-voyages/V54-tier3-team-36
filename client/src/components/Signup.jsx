import React, { useState } from 'react'

const Signup = () => {
  const [formData, setFormData ] = useState({
    name: "",
    email: "",
    password: "",
    age: 0 //maybe will change to select/options
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData)
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
        
    </div>
  )
}

export default Signup