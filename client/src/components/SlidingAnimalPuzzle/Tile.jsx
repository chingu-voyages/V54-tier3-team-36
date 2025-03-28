import React from "react";
import { getMatrixPosition, getVisualPosition } from "./helpers";
import { GRID_SIZE } from "./constants"
import Wolves from "../../assets/puzzle/Wolves.png";
import Jellyfish from "../../assets/puzzle/Jellyfish.png";
import Lion from "../../assets/puzzle/Lion.png";
import Cheetah from "../../assets/puzzle/Cheetah.png";
import HummingBirds from "../../assets/puzzle/HummingBirds.png";

const Tile = ({ tile, index, tileSize, boardSize, handleClick, currentImageIndex }) => {
  const { row, col } = getMatrixPosition(index, 4);
  const { x, y } = getVisualPosition(row, col, tileSize);

  const images = [Wolves, Jellyfish, Lion, Cheetah, HummingBirds];
  const BackgroundImage = images[currentImageIndex];

  const style = {
    width: `${tileSize}px`,
    height: `${tileSize}px`,
    transform: `translate(${x}px, ${y}px)`,
    opacity: tile === 15 ? 0 : 1,
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: `${boardSize}px`,
    backgroundPosition: `${(100 / (GRID_SIZE - 1)) * (tile % GRID_SIZE)}% ${(100 / (GRID_SIZE - 1)) * (Math.floor(tile / GRID_SIZE))}%`,
  };

  return (
    <li 
      className="flex items-center justify-center text-white shadow-sm shadow-white cursor-pointer text-lg"
      style={style}
      onClick={() => handleClick(index)}
    >
      {tile + 1}
    </li>
  );
};

export default Tile;
