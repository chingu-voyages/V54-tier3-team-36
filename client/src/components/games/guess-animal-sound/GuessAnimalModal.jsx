import React, { useState, useEffect, useRef } from "react";
import ReactHowler from "react-howler";
import { feedbackSounds } from "./GameData";

const GuessAnimalModal = ({ animal, options, onGuess, onClose, onReplay }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedbackSound, setFeedbackSound] = useState(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      setFeedbackSound(null);
    };
  }, []);

  const handleGuess = option => {
    if (answeredCorrectly) return;

    const isCorrect = option === animal.name;
    setSelectedAnswer(option);
    setFeedbackSound(isCorrect ? feedbackSounds.correct : feedbackSounds.wrong);

    if (isCorrect) {
      setAnsweredCorrectly(true);
      timeoutRef.current = setTimeout(() => {
        onGuess(option);
        setFeedbackSound(null);
      }, 1500);
    } else {
      onGuess(option);
    }
  };

  const getButtonClass = option => {
    return selectedAnswer === option
      ? option === animal.name
        ? "bg-gameCorrect text-gameCardText"
        : "bg-gameIncorrect text-gameCardText animate-shake"
      : "bg-gameTealAccent hover:bg-footerUserProfiles text-gameCardText";
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gameNight bg-opacity-50 z-50 p-4">
      <div className="bg-gameCardText p-5 sm:p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center text-gameHeading">
          Which animal made this sound?
        </h2>

        <div className="space-y-3 mb-5">
          {options.map((option, index) => (
            <button
              key={index}
              className={`w-full py-2 sm:py-3 px-4 rounded-lg transition-all duration-200 text-sm sm:text-base ${getButtonClass(
                option
              )}`}
              onClick={() => handleGuess(option)}
              disabled={answeredCorrectly}>
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between gap-3 sm:gap-4">
          <button
            className="flex-1 py-2 bg-gameCloseButton hover:bg-gameCloseButtonHover text-gameCardText rounded-lg transition text-sm sm:text-base"
            onClick={onClose}>
            Close
          </button>

          <button
            className="flex-1 py-2 bg-gameReplayButton hover:bg-gameReplayButtonHover text-gameCardText rounded-lg transition text-sm sm:text-base"
            onClick={onReplay}>
            Replay Sound
          </button>
        </div>
      </div>

      {feedbackSound && (
        <ReactHowler
          src={feedbackSound}
          playing={true}
          onEnd={() => setFeedbackSound(null)}
          volume={0.8}
          html5={true}
          onLoadError={(id, err) => console.error("Feedback sound error:", err)}
        />
      )}
    </div>
  );
};

export default GuessAnimalModal;
