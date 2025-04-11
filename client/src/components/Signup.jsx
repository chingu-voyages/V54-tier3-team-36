import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/auth';
import { useForm } from 'react-hook-form';

const Signup = () => {

  const apiUrl = 'https://v54-tier3-team-36.onrender.com'
  const localApiUrl = 'http://localhost:5000'

  const backendUrl = process.env.NODE_ENV === 'production' ? apiUrl:localApiUrl

  const { login } = useAuth();

  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: {errors}, 
  } = useForm();


  // const [formData, setFormData ] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   age: 0 //maybe will change to select/options
  // });

  const [message, setMessage ] = useState('')

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value
  //   }));
  // };

  const age = watch('age') // watch the age selection
   
  const onSubmit = async (data) => {
    console.log('Form submitted:', data)

    try {
      const response = await fetch(`${backendUrl}/api/auth/signup`, {
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
        console.log(result)
        console.log("SIGNUP SUCCESSFULLY")
        const token = result.token
        sessionStorage.setItem('token', token);
        login(token)
        navigate("/")
      }

    } catch (error) {
      console.error('Error during signup:', error);
      setMessage('Something went wrong during signup.')
    }
  }

  return (
    <div className='w-[95%] h-[70vh] bg-emerald-700 text-lg bg-opacity-75 rounded-[3vw] px-12 md:pt-12 mb-10 mx-auto mt-8'>
      <form className="flex flex-col py-5 items-center" onSubmit={handleSubmit(onSubmit)}>
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
            // value={formData.name}
            // onChange={handleChange}
            {...register("name", { required: "Name is required" })}
            placeholder='What should we call you?'
            className='text-black pl-2 md:pl-3'
          />
          {errors.name && <p className="text-red-700 font-bold text-md">{errors.name.message}</p>}

          <label htmlFor="email" className='mt-2'>
            <strong>Email</strong>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder='How we will contact you'
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
            placeholder='Keep it a secret!'
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

          <label htmlFor='age' className='mt-2'>
            <strong>Age: </strong>
          </label>
          {/* <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className='text-black pl-2 md:pl-6'
          /> */}
          <select
            name='age'
            className='text-black pl-2 md:pl-3'
            {...register("age", { required: "Please select your age" })}
          >
            <option value="">-- Select your age --</option>
            <option value="<5">Less than 5 years old</option>
            <option value="5-8">5-8 years old</option>
            <option value="9-12">9-12 years old</option>
            <option value="13-17">13-17 years old</option>
            <option value="18+">18 years or older</option>
          </select>
          {errors.age && <p className="text-red-700 font-bold text-md">{errors.age.message}</p>}
        </div>

        {age !== "18+" && age !== "" && (
          <>
          <div className='flex items-center space-x-2'>
            <input
              type="checkbox"
              className='h-5 w-5'
              {...register("consent", {
                validate: (value) => {
                  if (age !== "18+" && age !== "") {
                  return value === true || "Parent/Guardian consent is required.";
                }
                return true;
                },
              })}
            />
            <label className="text-lg font-semibold">
            I have permission from a parent or guardian.
            </label>
          </div>
          {errors.consent && <p className="text-red-700 font-bold text-md">{errors.consent.message}</p>}
          </>
        )}

        <button className="mt-2 bg-teal-800 shadow-md shadow-teal-500/50 hover:opacity-85 rounded-full text-white border-none" type='submit'>Sign up</button>
        {message && <p>{message}</p>}

        <p className=''>Already signed up?  
          <Link to="/login"> 
            <button className='bg-teal-800 shadow-md shadow-teal-500/50 hover:opacity-85 rounded-full text-white ml-2 border-none'>Login</button>
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Signup