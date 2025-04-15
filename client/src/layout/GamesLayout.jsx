import React from "react";
<<<<<<< HEAD
import FlashCardGame from "../components/AnimalFlashcardGame/FlashCardGame";
import NavBar from '../components/NavBar'
import Footer from '../components/footer/Footer'
import Component2 from '../components/Component2'
import SlidingPuzzle from '../components/SlidingAnimalPuzzle/SlidingPuzzle'
import backgroundImage from "../assets/backgroundImage.jpg"
=======
import { ToastContainer } from "react-toastify";
import NavBar from "../components/NavBar";
import Footer from "../components/footer/Footer";
import SlidingPuzzle from "../components/SlidingAnimalPuzzle/SlidingPuzzle";
import Component2 from "../components/Component2";
import GuessAnimalSound from "../components/games/guess-animal-sound/GuessAnimalSound";
import backgroundImage from "../assets/backgroundImage.jpg";
import "react-toastify/dist/ReactToastify.css";
>>>>>>> 0abaf34 (r-added Guess Animal Sound game)


const GamesLayout = () => {
  const pageBg = "bg-white bg-opacity-0";

  return (
    <div
      className="md:min-h-screen flex items-center justify-center bg-fixed bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container mx-auto m-10 p-2 md:m-32 md:p-8 bg-white bg-opacity-75 rounded-[3vw] overflow-hidden">
        <NavBar bgColor={pageBg} />
        <div className="w-full px-6 py-8 space-y-8">
          <div className="flex justify-center w-full">
            <SlidingPuzzle />
          </div>

          <div className="flex justify-center w-full">
            <GuessAnimalSound />
          </div>

          <div className="flex justify-center w-full">
             <FlashCardGame />
           </div>
          <div className="flex justify-center w-full">
            <Component2 />
          </div>
        </div>
        <Footer />
      </div>

<<<<<<< HEAD
=======
      <ToastContainer
        className="center-toast"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeButton={false}
      />
    </div>
  );
};

>>>>>>> 0abaf34 (r-added Guess Animal Sound game)
export default GamesLayout;
