import React from 'react'
import { NavLink } from "react-router";

const NavLinks = () => {

  const linkStyle = ({ isActive }) =>
    `md:text-xl ${
      isActive ? "text-green-700" : "text-slate-900"
    } whitespace-nowrap hover:text-green-700 font-bold px-5`;

  return (
    <>
      <NavLink to="/" end className={linkStyle}> 
        Home 
      </NavLink>

      <NavLink to="/games" className={linkStyle}> 
        Games
      </NavLink>

      <NavLink to="/quizzes" className={linkStyle}>
        Quizzes
      </NavLink>

      <NavLink to="/dashboard" className={linkStyle}> 
        Dashboard
      </NavLink>
        
      <button>
        Signup
      </button>
    
    </>
  )
}

export default NavLinks
