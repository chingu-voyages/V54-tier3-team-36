import Tilt from "react-parallax-tilt";
import ReactCardFlip from "react-card-flip";
import AnimalWorld from "../../assets/AnimalWorld.png";

export default function FlashCard({
  id,
  image,
  animalName,
  isFlipped,
  onClick,
  isMatched,
}) {
  // Don't render matched cards at all
  if (isMatched) return null;

  return (
    <Tilt>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div
          key="front"
          onClick={() => onClick(id)}
          className="rounded-md overflow-hidden w-40 sm:w-48 md:w-52 aspect-[2/3] shadow-md flex items-center justify-center cursor-pointer bg-white hover:shadow-lg transition-shadow"
        >
          <img
            className="size-32 sm:size-40 md:size-44"
            src={AnimalWorld}
            alt="Card back"
          />
        </div>
        <div
          key="back"
          onClick={() => onClick(id)}
          className="rounded-md overflow-hidden w-40 sm:w-48 md:w-52 aspect-[2/3] cursor-pointer bg-white"
        >
          <img
            className="object-cover w-full h-full"
            src={image}
            alt={`${animalName}`}
          />
        </div>
      </ReactCardFlip>
    </Tilt>
  );
}
