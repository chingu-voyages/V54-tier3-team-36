import React from "react";
import landingPage from "../assets/landingPage.png"



const Header = () => {
  return (
    <header>
      <div className="w-full flex flex-col items-center space-y-5 md:space-y-10">
        <h1 className="text-5xl text-black text-center font-extrabold">Welcome to The <br/>Animal World App</h1>
        <button className="w-40 bg-teal-800 shadow-md shadow-teal-500/50 hover:opacity-85 rounded-full text-white">Get Started</button>
        <div className="m-2 md:m-10 rounded-3xl overflow-hidden">
          <img src={landingPage} alt="animals"/>
        </div>
      </div>
    </header>
  );
};

export default Header;
