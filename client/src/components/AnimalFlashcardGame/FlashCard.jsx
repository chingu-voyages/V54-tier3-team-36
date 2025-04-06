import Tilt from "react-parallax-tilt";

export default function FlashCard({ image }) {
  return (
    <Tilt>
      <div className="rounded-md overflow-hidden w-48 sm:w-56 md:w-60 aspect-[2/3]">
        <img
          className="object-cover w-full h-full"
          src={image}
          alt="Animal image"
        />
      </div>
    </Tilt>
  );
}
