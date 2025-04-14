import { useState, useEffect } from "react";
import FlashCard from "./FlashCard";
import { Heart, RefreshCw } from "lucide-react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import animals from "./data";

export default function FlashCardGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [lives, setLives] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const { width, height } = useWindowSize();

  // Initialize the game
  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    // Use exactly the 12 cards from the animals array and add game properties
    const preparedCards = animals.map((animal) => ({
      ...animal,
      isFlipped: false,
      isMatched: false,
      image: animal.avatar, // Map avatar to image for consistency
    }));

    // Shuffle the cards
    const shuffledCards = [...preparedCards].sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setLives(5);
    setGameOver(false);
    setGameWon(false);
  };

  const handleCardClick = (cardId) => {
    // Prevent clicking when game is over or two cards are already flipped
    if (gameOver || flippedCards.length >= 2) return;

    // Find the clicked card
    const clickedCard = cards.find((card) => card.id === cardId);

    // Don't allow clicking already flipped cards
    if (clickedCard.isFlipped) return;

    // Update flipped cards array
    const updatedFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(updatedFlippedCards);

    // Update cards state to show flipped card
    setCards(
      cards.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    // Check for a match when two cards are flipped
    if (updatedFlippedCards.length === 2) {
      setTimeout(() => {
        checkForMatch(updatedFlippedCards);
      }, 1000);
    }
  };

  const checkForMatch = (flippedPair) => {
    // Check if the two flipped cards match by their animal name
    const [firstCard, secondCard] = flippedPair;
    const isMatch = firstCard.name === secondCard.name;

    if (isMatch) {
      // Add to matched pairs if not already there
      if (!matchedPairs.includes(firstCard.name)) {
        setMatchedPairs([...matchedPairs, firstCard.name]);
      }

      // Mark cards as matched
      setCards(
        cards.map((card) =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, isMatched: true }
            : card
        )
      );

      // Check if game is won (all 6 unique animal pairs)
      const uniqueAnimalNames = [
        ...new Set(animals.map((animal) => animal.name)),
      ];
      if (matchedPairs.length + 1 >= uniqueAnimalNames.length) {
        setGameWon(true);
        setTimeout(() => {
          startGame();
        }, 4000);
      }
    } else {
      // No match, reduce lives
      const updatedLives = lives - 1;
      setLives(updatedLives);

      // Flip cards back
      setCards(
        cards.map((card) =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, isFlipped: false }
            : card
        )
      );

      // Check if game is over
      if (updatedLives <= 0) {
        setGameOver(true);
        setTimeout(() => {
          startGame();
        }, 3000);
      }
    }

    // Reset flipped cards
    setFlippedCards([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-wrap justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-black mb-4 md:mb-0">
          Animal Memory Game
        </h1>

        {gameWon && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 50,
              pointerEvents: "none",
            }}
          >
            <Confetti
              width={window.innerWidth} // Use the full window width
              height={document.body.scrollHeight || height}
              recycle={false}
              numberOfPieces={800} // Increased number of pieces for better coverage
              gravity={0.3}
              spread={180} // Full 180 degree spread
              confettiSource={{
                x: 0, // Start from left edge
                y: 0, // Start from top
                w: window.innerWidth, // Full width
                h: 0,
              }}
            />
          </div>
        )}

        <div className="flex items-center space-x-6">
          {/* Lives counter */}
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Heart
                key={index}
                className={`w-8 h-8 ${
                  index < lives ? "text-red-500 fill-red-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Restart button */}
          <button
            onClick={startGame}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors duration-200"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Restart
          </button>
        </div>
      </div>

      {/* Game over or win message */}
      {(gameOver || gameWon) && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-white p-10 rounded-lg shadow-xl text-center max-w-md">
            <h2 className="text-3xl font-bold mb-4 text-black">
              {gameWon ? "Congratulations! 🎉" : "Game Over! 💔"}
            </h2>
            <p className="text-xl text-black">
              {gameWon
                ? "You matched all the animals! Starting a new game..."
                : "You ran out of lives! Starting a new game..."}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 justify-items-center">
        {cards.map((card) => (
          <FlashCard
            key={card.id}
            id={card.id}
            image={card.avatar}
            animalName={card.name}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}
