import React from "react";
import landingPage from "../assets/landingPage.png"

const Header = () => {
  return (
    <header className="w-full h-[70vh] bg-gray-800 text-white flex items-center justify-center">
      <div className="w-full">
        <h1 className="text-5xl text-center">Welcome to Animal World App</h1>
        <img src={landingPage} alt="animals"/>
      </div>
    </header>
  );
};

export default Header;
