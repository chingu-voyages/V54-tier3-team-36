import React, { useState, useEffect, useRef } from "react";
import ReactHowler from "react-howler";
import AnimalCard from "./AnimalCard";
import { animals, victorySongs } from "./GameData";
import GuessAnimalModal from "./GuessAnimalModal";
import Confetti from "react-confetti";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GuessAnimalSound = () => {
  const [shuffledAnimals, setShuffledAnimals] = useState(() =>
    [...animals].sort(() => Math.random() - 0.5)
  );
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [blurredAnimal, setBlurredAnimal] = useState(null);
  const [options, setOptions] = useState([]);
  const [revealedAnimals, setRevealedAnimals] = useState([]);
  const [replayKey, setReplayKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [victorySong, setVictorySong] = useState(null);
  const [victoryKey, setVictoryKey] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [resetEnabled, setResetEnabled] = useState(true);
  const [victoryToastId, setVictoryToastId] = useState(null);

  const gameContainerRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (showConfetti && !gameCompleted) {
      timer = setTimeout(() => setShowConfetti(false), 6000);
    }
    return () => clearTimeout(timer);
  }, [showConfetti, gameCompleted]);

  const shuffle = array => [...array].sort(() => Math.random() - 0.5);

  const getRandomOptions = correctAnimal => {
    const incorrectOptions = animals
      .filter(a => a.name !== correctAnimal.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(a => a.name);
    return shuffle([...incorrectOptions, correctAnimal.name]);
  };

  const handleAnimalClick = animal => {
    if (showModal || revealedAnimals.includes(animal.id)) return;
    setSelectedAnimal(animal);
    setIsPlaying(true);
    setBlurredAnimal(animal.id);
    setReplayKey(prev => prev + 1);
  };

  const handleSoundEnd = () => {
    if (!selectedAnimal) return;
    setIsPlaying(false);
    setOptions(getRandomOptions(selectedAnimal));
    setShowModal(true);
  };

  const handleGuess = guess => {
    if (!selectedAnimal) return;

    const updatedRevealed = [...revealedAnimals, selectedAnimal.id];
    const correctGuesses = updatedRevealed.length;
    const isFinalVictory = correctGuesses === animals.length;

    if (guess === selectedAnimal.name) {
      setRevealedAnimals(updatedRevealed);
      resetRound();

      if (correctGuesses % 5 === 0 && !isFinalVictory) {
        setShowConfetti(true);
        toast.success(`🎯 ${correctGuesses}/${animals.length}! Keep going!`, {
          autoClose: 3000
        });
      }

      if (isFinalVictory) {
        setGameCompleted(true);
        setResetEnabled(false);
        setShowConfetti(true);

        if (victorySongs.length > 0) {
          const randomSong =
            victorySongs[Math.floor(Math.random() * victorySongs.length)];
          setVictorySong(randomSong);
        }

        toast.dismiss();
        const toastId = toast.success("🏆 YOU DID IT! Enjoy your victory!", {
          autoClose: false,
          closeButton: false
        });
        setVictoryToastId(toastId);
      }
    }
  };

  const resetRound = () => {
    setShowModal(false);
    setBlurredAnimal(null);
    setSelectedAnimal(null);
    setOptions([]);
  };

  const handleReplay = () => {
    setIsPlaying(true);
    setReplayKey(prev => prev + 1);
  };

  const handleResetGame = () => {
    toast.dismiss();
    setVictorySong(null);
    setShuffledAnimals([...animals].sort(() => Math.random() - 0.5));
    setSelectedAnimal(null);
    setIsPlaying(false);
    setShowModal(false);
    setBlurredAnimal(null);
    setOptions([]);
    setRevealedAnimals([]);
    setReplayKey(prev => prev + 1);
    setShowConfetti(false);
    setVictoryKey(prev => prev + 1);
    setGameCompleted(false);
    setResetEnabled(true);
    setVictoryToastId(null);
  };

  const handleVictoryEnd = () => {
    if (victoryToastId) toast.dismiss(victoryToastId);
    setVictorySong(null);
    setResetEnabled(true);
    setShowConfetti(false);
    setVictoryToastId(null);
  };

  const correctGuesses = revealedAnimals.length;

  return (
    <div
      ref={gameContainerRef}
      className="w-full max-w-7xl px-2 sm:px-4 py-6 rounded-3xl shadow-lg relative
             bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
             from-[#264653] via-[#1E4D60] to-[#143A48]">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={gameCompleted}
          numberOfPieces={gameCompleted ? 500 : 150}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}
        />
      )}

      <div className="mb-6 px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient-x">
          Guess the Animal Sound
        </h1>

        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-md bg-gameModalBg/90 border-2 border-gamePrimaryButton rounded-xl px-6 py-3 shadow-lg">
            <div className="flex justify-between items-center">
              <span className="text-gameCardText font-medium text-sm sm:text-base">
                PROGRESS:
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-gameCorrectGuesses font-bold text-xl">
                  {correctGuesses}
                </span>
                <span className="text-gameCardText">/</span>
                <span className="text-gameCardText">{animals.length}</span>
              </div>
            </div>

            <div className="w-full bg-gameProgressBar rounded-full h-2.5 mt-3">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${(correctGuesses / animals.length) * 100}%`
                }}></div>
            </div>
          </div>
        </div>
      </div>

      {gameCompleted && (
        <div className="w-full bg-gradient-to-r from-green-500 to-green-600 text-gameCardText text-center py-4 mb-6 animate-bounce">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
              <span>🎉</span>
              <span>CONGRATULATIONS!</span>
              <span>🎉</span>
            </h2>
            <p className="mt-1 text-sm sm:text-base">
              You've successfully identified all {animals.length} animals!
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 min-[480px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 px-1 sm:px-2">
        {shuffledAnimals.map(animal => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            onClick={() => handleAnimalClick(animal)}
            onSoundEnd={handleSoundEnd}
            isPlaying={selectedAnimal?.id === animal.id && isPlaying}
            blurred={blurredAnimal === animal.id}
            revealed={revealedAnimals.includes(animal.id)}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleResetGame}
          disabled={!resetEnabled}
          className={`px-6 sm:px-8 py-3 rounded-xl shadow-lg text-lg font-semibold transition-all ${
            !resetEnabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gameResetButton hover:bg-gameResetButtonHover text-gameCardText transform hover:scale-105"
          }`}>
          {gameCompleted ? "Play Again" : "Reset Game"}
        </button>
      </div>

      {selectedAnimal && (
        <ReactHowler
          key={replayKey}
          src={selectedAnimal.soundUrl}
          playing={isPlaying}
          volume={0.8}
          onEnd={handleSoundEnd}
        />
      )}

      {victorySong && (
        <ReactHowler
          key={victoryKey}
          src={victorySong}
          playing={true}
          volume={0.9}
          onEnd={handleVictoryEnd}
        />
      )}

      {showModal && selectedAnimal && (
        <GuessAnimalModal
          animal={selectedAnimal}
          options={options}
          onGuess={handleGuess}
          onClose={resetRound}
          onReplay={handleReplay}
        />
      )}
    </div>
  );
};

export default GuessAnimalSound;
