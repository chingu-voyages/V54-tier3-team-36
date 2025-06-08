import React from 'react';
import Timer from './Timer.jsx';
import Score from './Score.jsx';
import Lives from './Lives.jsx';
import FoodSection from './FoodSection.jsx';
import AnimalSection from './AnimalSection.jsx';
import StatsModal from './StatsModal.jsx';
import {useGameSession} from './hooks/useGameSession.js';


export default function GameSessionUI({onRestart}) {
    const {
        timeLeft,
        lives,
        score,
        trayFoods,
        activeAnimals,
        handleFeed,
        messages
    } = useGameSession();

    const gameOver = lives <= 0 || timeLeft <= 0;

    if (gameOver) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Game Over</h1>
                <p className="mb-2">Your Score: {score}</p>
                <button
                    onClick={onRestart}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Restart
                </button>
            </div>
        );
    }


    return (
        <div className="flex flex-col space-y-4">
            <div className="w-full h-20 border rounded-md p-2 flex justify-between items-center">
                <Timer timeLeft={timeLeft} />
                <Score score={score} />
                <Lives lives={lives} />
            </div>

            <div className="w-full border rounded-md p-4 flex justify-center">
                <FoodSection foods={trayFoods} />
            </div>

            <div className="w-full">
                <div className="border rounded-md p-8 h-[400px] flex items-center justify-center mb-4">
                    <AnimalSection animals={activeAnimals} onFeed={handleFeed} />
                </div>
                <StatsModal messages={messages} />
            </div>
        </div>
    );
}
