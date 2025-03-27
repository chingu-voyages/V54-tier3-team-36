import React, {useState} from 'react'
import NavLinks from './NavLinks'
import AnimalWorld from "../assets/AnimalWorld.png"

const NavBar = ({ bgColor }) => {
  const [ isOpen, setIsOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
    
  };

  return (
    <div className={`flex max-h-24 px-4 justify-between items-center ${bgColor ? bgColor : "bg-blue-400"}` }>
      <img src={AnimalWorld} alt="logo" className='h-auto w-32 md:w-40 object-contain'/>
      <nav>
        <div className='hidden md:flex items-center space-x-4 px-2'>
          <NavLinks/>
        </div>
        
        <div className='flex md:hidden relative'>
          <div onClick={handleMenuToggle} className='flex flex-col space-y-2'>
            <span className={`${ isOpen && "translate-y-1.5 rotate-45"} block h-1 w-10 bg-slate-700`}></span>
            <span className={`${ isOpen && "hidden"} block h-1 w-10 bg-slate-700`}></span>
            <span className={`${ isOpen && "-translate-y-1.5 -rotate-45"} block h-1 w-10 bg-slate-700`}></span>
          </div>
          <div
            className={`${ isOpen ? "flex" : "hidden"} 
            md:hidden absolute top-full right-0 mt-3 w-[70vw] bg-gray-100 flex-col items-center gap-8 p-8 rounded-lg`}
          >
            <NavLinks />
          </div>
        </div>


      </nav>
    </div>
  )
}

export default NavBar