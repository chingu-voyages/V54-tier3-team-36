import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE, SMALL_BOARD_SIZE } from "./constants";
import { canSwap, shuffle, swap, isSolved } from "./helpers";
import { useAuth } from "../../context/auth";

// For responsive design
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};


const Board = ({ imgUrl }) => {
  const { user, backendUrl } = useAuth();
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
  const [isStarted, setIsStarted] = useState(false);
  const [numOfMoves, setNumOfMoves] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isMobile = useIsMobile()

  const shuffleTiles = () => {
    const shuffleTiles = shuffle(tiles)
    setTiles(shuffleTiles);
  }

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
      setTiles(swappedTiles);
      setNumOfMoves((numOfMoves)=> numOfMoves + 1)
    }
  }

  const handleTileClick = (index) => {
    if (isStarted) {
      swapTiles(index);
    }
  }

  const handleShuffleClick = () => {{
    shuffleTiles();
  }}

  const handleStartClick = () => {
    shuffleTiles();
    setIsStarted(true);
  }

  const handleChangeBackground = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 4 ? 0 : prevIndex + 1));
  };

  const handleQuitGame = () => {
    setIsStarted(false);
    setNumOfMoves(0);
    setTiles([...Array(TILE_COUNT).keys()]);
  };


  const handleResult = async () => {
    const data = {
      userId: user._id,
      gameName: "slidingPuzzle",
      score: numOfMoves,
      win: true
    }
    try {
      const res = await fetch(`${backendUrl}/api/games/result`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result)
    } catch (error) {
      console.error("Error saving result", error)
    }
  }

  const boardSize = isMobile ? SMALL_BOARD_SIZE : BOARD_SIZE

  const hasWon = isSolved(tiles);
  const pieceSize = boardSize / GRID_SIZE;

  return (
    <div>
      <ul 
        className="grid gap-[0.8px] mx-auto"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: `${boardSize}px`,
          height: `${boardSize}px`,
        }}
      >
        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            tile={tile}
            pieceSize={pieceSize}
            imgUrl={imgUrl}
            gridSize={GRID_SIZE}
            boardSize={boardSize}
            handleClick={handleTileClick}
            currentImageIndex={currentImageIndex}
          />
        ))}
      </ul>
      {hasWon && isStarted && 
        <p className="mt-4 text-teal-400 font-bold text-2xl">Congrats! Puzzle Solved 🎉 You used {numOfMoves} Moves 
          {user && <button 
              className="px-4 py-2 mx-2 bg-teal-700 text-sm shadow-lg shadow-teal-500/50 border-none rounded-md text-white hover:bg-teal-600"
              onClick={handleResult}
            >
              Save Result
            </button>
          }
        </p>
      }
      <div className="flex flex-col gap-3 justify-center">
        {!isStarted ? (
          <div className="flex gap-4 justify-center mt-12">
            <button
              className="text-white bg-amber-400 shadow-lg shadow-amber-500/50 border-none px-5 py-2 w-max self-center hover:bg-amber-300"
              onClick={() => handleStartClick()}
            >
              Start Game
            </button>
            <button
              className="text-white bg-teal-400 shadow-lg shadow-teal-500/50 border-none px-5 py-2 w-max self-center hover:bg-teal-300"
              onClick={handleChangeBackground}
            >
              Change Background
            </button>
          </div>
        ) : (
          <>
            <p className="mt-6">{numOfMoves} Moves Taken</p>
            <div className="flex gap-4 justify-center">
              <button
                className="text-white bg-amber-400 shadow-lg shadow-amber-500/50 border-none px-5 py-2 w-max self-center hover:bg-amber-300"
                onClick={() => {
                  handleShuffleClick()
                  setNumOfMoves(0)
                }}
              >
                Restart Game
              </button>
              <button
                className="text-white bg-red-400 shadow-lg shadow-red-500/50 border-none px-5 py-2 w-max self-center hover:bg-red-300"
                onClick={handleQuitGame}
              >
                Quit Game
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Board;
