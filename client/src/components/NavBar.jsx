import React from 'react'
import { NavLink } from "react-router";

const NavBar = () => {
  const linkStyle = ({ isActive }) =>
    `font-medium ${
      isActive ? "text-blue-500" : "text-gray-900 dark:text-gray-300"
    } whitespace-nowrap hover:text-blue-400 dark:hover:text-blue-400 mx-4 px-5 py-2`;

  return (
    <>

      <nav className='bg-blue-400'>
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
      </nav>
    </>
  )
}

export default NavBar