import { useState } from "react";
import Tilt from "react-parallax-tilt";
import ReactCardFlip from "react-card-flip";
import AnimalWorld from "../../assets/AnimalWorld.png";

export default function FlashCard({ image }) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <Tilt>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div
          key="front"
          onClick={() => setIsFlipped(true)}
          className="rounded-md overflow-hidden w-48 sm:w-56 md:w-60 aspect-[2/3] shadow-md flex items-center justify-center"
        >
          <img
            className="align-middle size-52"
            src={AnimalWorld}
            alt="App Logo"
          />
        </div>
        <div
          key="back"
          onClick={() => setIsFlipped(false)}
          className="rounded-md overflow-hidden w-48 sm:w-56 md:w-60 aspect-[2/3]"
        >
          <img
            className="object-cover w-full h-full"
            src={image}
            alt="Animal image"
          />
        </div>
      </ReactCardFlip>
    </Tilt>
  );
}
