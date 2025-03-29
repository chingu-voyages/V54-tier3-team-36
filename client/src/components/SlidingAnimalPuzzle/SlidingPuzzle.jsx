import React from "react";
import Board from "./Board";

const SlidingPuzzle = () => {

  return (
    <div className="text-center space-y-4 w-full max-w-7xl px-2 sm:px-8 pt-10 pb-20 bg-none">
      <h2 className="text-3xl font-bold">Animal Puzzle</h2>
      <hr className="border-b-amber-400 border-b-2 border-t-0 w-32 mx-auto my-4"></hr>
      <p className="text-gray-800">Slide the tiles to complete the picture</p>
      <Board />
    </div>
  );
};

export default SlidingPuzzle;
