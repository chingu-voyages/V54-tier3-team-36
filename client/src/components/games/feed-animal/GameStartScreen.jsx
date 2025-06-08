import React from "react";
import bgImage from "@/assets/feed-animal-bg.png";

export default function GameStartScreen({ gameName, gameDescription, onStart }) {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-full min-h-[600px] p-8"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <h1 className="text-5xl font-extrabold mb-6 text-white drop-shadow-lg text-center">
          {gameName}
        </h1>
        <p className="text-lg mb-8 max-w-xl text-center text-white font-medium drop-shadow-md">
          {gameDescription}
        </p>
        <p className="text-xl mb-8 font-semibold text-white drop-shadow">
          Are you ready to start?
        </p>
        <button
          className="px-8 py-4 bg-green-600 text-white rounded-xl text-xl hover:bg-green-700 transition font-bold shadow-lg border-2 border-white"
          onClick={onStart}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
