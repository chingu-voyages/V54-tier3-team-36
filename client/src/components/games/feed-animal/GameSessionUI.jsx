import React, {useEffect} from 'react';
import Timer from './Timer.jsx';
import Score from './Score.jsx';
import Lives from './Lives.jsx';
import FoodSection from './FoodSection.jsx';
import AnimalSection from './AnimalSection.jsx';
import StatsModal from './StatsModal.jsx';
import { useGameSession } from './hooks/useGameSession.js';

export default function GameSessionUI({onRestart}) {
    const {
        timeLeft,
        lives,
        score,
        trayFoods,
        activeAnimals,
        handleFeed,
        messages,
        addMessage
    } = useGameSession();

    const gameOver = lives <= 0 || timeLeft <= 0;

    // Add initial welcome message - moved before any conditional returns
    useEffect(() => {
        if (messages.length === 0 && !gameOver) {
            addMessage('Welcome! Feed the animals by dragging food to them.');
        }
    }, [messages.length, addMessage, gameOver]);

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
        <div className="flex flex-col h-[calc(100vh-100px)]">
            {/* Header with game stats */}
            <div className="w-full h-16 border rounded-md p-2 flex justify-between items-center mb-2">
                <Timer timeLeft={timeLeft} />
                <Score score={score} />
                <Lives lives={lives} />
            </div>

            {/* Main game area */}
            <div className="flex-1 flex flex-col gap-3 overflow-hidden">
                {/* Food section */}
                <div className="border rounded-md p-3 flex-1 flex flex-col">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Food Tray</h3>
                    <div className="flex-1 flex items-center justify-center">
                        <FoodSection foods={trayFoods} />
                    </div>
                </div>

                {/* Animal section */}
                <div className="border rounded-md p-3 flex-1 flex flex-col">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Animals</h3>
                    <div className="flex-1 flex items-center justify-center">
                        <AnimalSection animals={activeAnimals} onFeed={handleFeed} />
                    </div>
                </div>

                {/* Game log */}
                <div className="border rounded-md p-3 flex-shrink-0" style={{ height: '150px' }}>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Game Log</h3>
                    <div className="h-[calc(100%-28px)] overflow-y-auto">
                        <StatsModal messages={messages} />
                    </div>
                </div>
            </div>
        </div>
    );
}
