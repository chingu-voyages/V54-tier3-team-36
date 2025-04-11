import React from "react";
import landingPage from "../assets/landingPage.png"
import { Link } from "react-router";
import { useAuth } from "../context/auth";


const Header = () => {
  const { user } = useAuth();

  return (
    <>
    <header>
      <div className="w-full flex flex-col items-center space-y-5 md:space-y-10">
        <h1 className="text-5xl text-black text-center font-extrabold">Welcome to The <br/>Animal World App</h1>

        { user ? 
          <div><p className="text-xl text-black">Welcome back {user.name}!</p></div> :
          <Link to="/signup">
            <button className="w-40 bg-teal-800 shadow-md shadow-teal-500/50 hover:opacity-85 rounded-full text-white border-none">
              Get Started
            </button>
          </Link> 
        }
        <div className="m-2 md:m-10 rounded-3xl overflow-hidden">
          <img src={landingPage} alt="animals"/>
        </div>
      </div>
    </header>
    <div className="flex md:flex-row flex-col space-y-4 md:space-x-10 p-4 md:p-10">
      <div className="text-black text-pretty flex-1">
        <h2 className="font-bold text-3xl mb-2">🎮 Let the Games Begin!</h2>
        <p className="text-xl font-semibold">Jump into a jungle of fun with games that make learning wild!</p>
        <p className="text-lg">
          Slide puzzle pieces into place, guess animal sounds, flip through flashcards, and show off your smarts in quizzes. 
          Every click brings a new creature to discover and a chance to earn points while you play!
        </p>
      </div>
            
      <div className="text-black text-pretty flex-1">
        <h2 className="font-bold text-3xl mb-2">📊 Points, Prizes & Progress!</h2>
        <p className="text-xl font-semibold">Track your adventure and collect rewards along the way.</p>
        <p className="text-lg">
          Earn shiny stars and badges as you conquer games and complete challenges. Check your dashboard to see 
          how far you’ve come—and how many animal games you’ve mastered!
        </p>
      </div>
            
      <div className="text-black text-pretty flex-1">
        <h2 className="font-bold text-3xl mb-2">🦁 Your Magical Animal World</h2>
        <p className="text-xl font-semibold">Create your own profile and let your imagination roam free!</p>
        <p className="text-lg">
          Choose a wacky avatar, decorate your space, and explore a colorful, kid-safe world made just for you. 
          With friendly voices, fun buttons, and easy-peasy navigation, it’s a wild ride from the very first click!
        </p>
      </div>
    </div>
    </>
  );
};

export default Header;
