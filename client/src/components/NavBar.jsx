import React from 'react'
import { NavLink } from "react-router";
import AnimalWorld from "../assets/AnimalWorld.png"

const NavBar = () => {
  const linkStyle = ({ isActive }) =>
    `text-xl ${
      isActive ? "text-green-400" : "text-green-900"
    } whitespace-nowrap hover:text-green-300 px-5`;

  return (
    <div className='flex max-h-24 justify-between bg-blue-400'>
      <img src={AnimalWorld} alt="logo" className='h-auto w-40 object-contain'/>
      <nav className='flex items-center px-3'>
        <NavLink to="/" end className={linkStyle}> 
          Home 
        </NavLink>

        <NavLink to="games" className={linkStyle}> 
          Games
        </NavLink>

        <NavLink to="quizzes" className={linkStyle}>
          Quizzes
        </NavLink>

        <NavLink to="dashboard" className={linkStyle}> 
          Dashboard
        </NavLink>
        
        <button>
          Signup
        </button>
        
      </nav>
    </div>
  )
}

export default NavBar