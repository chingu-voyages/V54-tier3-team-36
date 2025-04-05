import React from 'react'
import NavBar from './NavBar'
import background from "../assets/background.jpg"

const Login = () => {
  const pageBg = "bg-white bg-opacity-0"
  
  return (
    <div className="md:min-h-screen flex items-center justify-center bg-contain md:bg-cover bg-center"
      style={{ backgroundImage: `url(${background})`}}>
      <div className="m-10 p-2 md:m-32 md:p-8 bg-white bg-opacity-75 rounded-[3vw] overflow-hidden">
        <NavBar bgColor={pageBg}/>
      </div>

    </div>  
  )
}

export default Login