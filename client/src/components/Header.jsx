import React from "react";
import landingPage from "../assets/landingPage.png"
import { Link } from "react-router";



const Header = () => {
  return (
    <>
    <header>
      <div className="w-full flex flex-col items-center space-y-5 md:space-y-10">
        <h1 className="text-5xl text-black text-center font-extrabold">Welcome to The <br/>Animal World App</h1>
        <Link to="/signup">
          <button className="w-40 bg-teal-800 shadow-md shadow-teal-500/50 hover:opacity-85 rounded-full text-white">
            Get Started
          </button>
        </Link>
        <div className="m-2 md:m-10 rounded-3xl overflow-hidden">
          <img src={landingPage} alt="animals"/>
        </div>
      </div>
    </header>
    <div className="flex md:flex-row flex-col space-y-4 md:space-x-10 p-4 md:p-10">
      <div className="text-black text-wrap">
        <h2 className="text-balance font-bold text-3xl">sub description.</h2>
        <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, perferendis inventore tempora tenetur, veritatis eos facilis quo commodi aliquid autem nemo numquam! Beatae non tenetur odit odio esse in ab?</p>
      </div>
            
      <div className="text-black text-wrap">
        <h2 className="text-balance font-bold text-3xl">sub description1.</h2>
        <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, perferendis inventore tempora tenetur, veritatis eos facilis quo commodi aliquid autem nemo numquam! Beatae non tenetur odit odio esse in ab?</p>
      </div>
            
      <div className="text-black text-wrap">
        <h2 className="text-balance font-bold text-3xl">sub description2.</h2>
        <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, perferendis inventore tempora tenetur, veritatis eos facilis quo commodi aliquid autem nemo numquam! Beatae non tenetur odit odio esse in ab?</p>
      </div>
    </div>
    </>
  );
};

export default Header;
