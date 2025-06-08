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
        addMessage,
        gameOver
    } = useGameSession();

    // Show game over when time's up or no lives left
    const isGameOver = gameOver || timeLeft <= 0;

    // Add initial welcome message
    useEffect(() => {
        if (messages.length === 0 && !gameOver) {
            addMessage('Welcome! Feed the animals by dragging food to them.');
        }
    }, [messages.length, addMessage, gameOver]);

    if (isGameOver) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-4 text-red-600">Game Over</h1>
                <p className="text-xl mb-6">Your final score: <span className="font-bold">{score}</span></p>
                <button
                    onClick={onRestart}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                    Play Again
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-100px)] bg-gray-100">
            {/* Stats Row */}
            <div className="bg-white shadow-md p-4 mb-6">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Feed the Animal</h1>
                    <div className="flex justify-center gap-8">
                        <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                            <span className="text-blue-600 text-xl mr-2">⏱️</span>
                            <div>
                                <div className="text-xs text-gray-500">Time Left</div>
                                <div className="text-lg font-bold">{Math.ceil(timeLeft / 1000)}s</div>
                            </div>
                        </div>
                        <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg">
                            <span className="text-green-600 text-xl mr-2">🏆</span>
                            <div>
                                <div className="text-xs text-gray-500">Score</div>
                                <div className="text-lg font-bold">{score}</div>
                            </div>
                        </div>
                        <div className="flex items-center bg-red-50 px-4 py-2 rounded-lg">
                            <span className="text-red-500 text-xl mr-2">❤️</span>
                            <div>
                                <div className="text-xs text-gray-500">Lives</div>
                                <div className="text-lg font-bold">{lives}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Three Column Layout */}
            <div className="flex-1 overflow-auto">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Food Tray Column */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                            <div className="bg-blue-50 px-4 py-3 border-b">
                                <h2 className="text-lg font-semibold text-gray-800">Food Tray</h2>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <FoodSection foods={trayFoods} />
                            </div>
                        </div>

                        {/* Hungry Animals Column */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                            <div className="bg-green-50 px-4 py-3 border-b">
                                <h2 className="text-lg font-semibold text-gray-800">Hungry Animals</h2>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <AnimalSection animals={activeAnimals} onFeed={handleFeed} />
                            </div>
                        </div>

                        {/* Game Log Column */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-purple-50 px-4 py-3 border-b">
                                <h2 className="text-lg font-semibold text-gray-800">Game Log</h2>
                            </div>
                            <div className="p-4 h-[300px] overflow-y-auto">
                                <StatsModal messages={messages} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
