import React, { useState } from "react";
import quizData from "../data/quizData.json";

const AnimalQuiz = () => {
  const [level, setLevel] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [progress, setProgress] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuiz = quizData[level - 1];
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const handleAnswer = (selected, correct) => {
    setSelectedAnswer(selected);
    if (selected === correct) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setProgress(((nextIndex) / currentQuiz.questions.length) * 100);
    } else {
      setProgress(100);
      setQuizCompleted(true);
    }
  };

  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setProgress(0);
    setQuizCompleted(false);
  };

  const handleNextLevel = () => {
    const nextLevel = level + 1;
    if (nextLevel <= quizData.length) {
      setLevel(nextLevel);
      setCurrentQuestionIndex(0);
      setScore(0);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setProgress(0);
      setQuizCompleted(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl px-2 sm:px-8 pt-10 pb-20 bg-teal-900 rounded-3xl shadow-lg">
      <div className="self-center text-center pb-6">
        <h2 className="text-3xl font-bold text-white">Animal Quiz - Level {level}</h2>
        <hr className="border-b-teal-300/50 border-b-2 border-t-0 w-32 mx-auto my-4" />
        <p className="text-white">
          Learn about animals through quizzes!
        </p>
      </div>

      <div className="container mx-auto md:px-24 xl:px-64 pb-4">
        <h2 className="text-white">Progress: {progress.toFixed(0)}%</h2>
        <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-teal-600/90"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {quizCompleted ? (
        <div className="flex flex-col items-center">
          <p className="text-xl text-center font-bold mb-4 text-white">
            Quiz completed! Your score is {score}/{currentQuiz.questions.length}.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleRetryQuiz}
              className="px-4 py-2 bg-teal-700 shadow-lg shadow-teal-500/50 border-none rounded-md text-white hover:bg-teal-600"
            >
              Retry Quiz
            </button>
            {level < quizData.length && (
              <button
                onClick={handleNextLevel}
                className="px-4 py-2 bg-teal-700 shadow-lg shadow-teal-500/50 border-none rounded-md text-white hover:bg-teal-600"
              >
                Next Quiz
              </button>
            )}
            {level === quizData.length && (
              <p className="text-teal-300 mt-2 font-semibold">You finished all quizzes!</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="font-semibold mb-4 text-xl text-white">{currentQuestion.question}</p>
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option, currentQuestion.answer)}
              className={`block w-2/3 py-2 px-4 rounded mb-2 ${
                showAnswer
                  ? option === currentQuestion.answer
                    ? "bg-green-400 text-white"
                    : option === selectedAnswer
                    ? "bg-red-400 text-white"
                    : "bg-gray-400 text-white"
                  : "bg-gray-400 hover:bg-gray-500 text-white"
              }`}
              disabled={showAnswer}
            >
              {option}
            </button>
          ))}
          {showAnswer && (
            <button
              onClick={handleNextQuestion}
              className="mt-4 px-4 py-2 bg-teal-700 shadow-lg shadow-teal-500/50 border-none rounded-md text-white hover:bg-teal-600"
            >
              {currentQuestionIndex < currentQuiz.questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AnimalQuiz;
