import React from "react";
import ReactHowler from "react-howler";

const AnimalCard = ({ animal, onClick, onSoundEnd, isPlaying, revealed }) => {
  const renderImage = () => {
    const imageClasses = "w-full h-full object-cover";
    const imageEffect = revealed
      ? "animate-pulse-slow"
      : "blur-2xl scale-125 brightness-50";

    return (
      <div className="relative w-full h-full">
        <img
          src={animal.imgUrl}
          alt={animal.name}
          className={`${imageClasses} ${imageEffect}`}
        />
        {!revealed && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1D3557]/90 to-[#264653]/90 backdrop-blur-[2px] flex justify-center items-center">
            <span className="text-gameCardText font-bold text-shadow-lg text-xs sm:text-sm md:text-base">
              Hear Sound
            </span>
          </div>
        )}
        {revealed && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        )}
      </div>
    );
  };

  return (
    <div className="relative flex justify-center p-1 sm:p-2">
      <div className="relative w-[110px] min-[480px]:w-[120px] sm:w-[140px] md:w-[160px]">
        <div className="pb-[100%] relative">
          <div
            className={`absolute inset-0 rounded-full overflow-hidden shadow-lg border-2 cursor-pointer transition-all duration-300
              ${
                revealed
                  ? "border-[#22C55E] shadow-correct-glow animate-celebrate"
                  : "border-[#2A9D8F] hover:shadow-animal-glow-hover animate-glow-pulse"
              }`}
            onClick={onClick}>
            {renderImage()}
          </div>
        </div>
      </div>

      {isPlaying && (
        <ReactHowler
          src={animal.soundUrl}
          playing={true}
          onEnd={onSoundEnd}
          volume={0.7}
        />
      )}
    </div>
  );
};

export default AnimalCard;
