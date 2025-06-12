import React, {useEffect} from 'react';
import FoodSection from './FoodSection.jsx';
import AnimalSection from './AnimalSection.jsx';
import StatsModal from './StatsModal.jsx';
import {useGameSession} from './hooks/useGameSession.js';

// Game Over Screen Component
const GameOverScreen = ({reason, score, onRestart}) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center animate-fade-in">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-red-600 mb-2">Game Over!</h2>
                <p className="text-lg text-gray-700">{reason}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-4xl font-bold text-green-700">{score}</p>
                <p className="text-sm text-gray-500">Final Score</p>
            </div>

            <button
                onClick={onRestart}
                className="px-8 py-4 bg-green-600 text-white rounded-xl text-xl hover:bg-green-700 transition font-bold shadow-lg border-2 border-white"
            >
                Play Again
            </button>
        </div>
    </div>
);

export default function GameSessionUI({onRestart}) {
    const {
        timeLeft,
        lives,
        score,
        trayFoods,
        activeAnimals,
        handleFeed,
        shuffleTrayFoods,
        messages,
        addMessage,
        gameOver,
        gameOverReason
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
            <GameOverScreen
                reason={gameOverReason || 'Game Over!'}
                score={score}
                onRestart={onRestart}
            />
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-100px)] bg-gray-100">
            {/* Stats Row */}
            <div className="bg-white shadow-md p-4 mb-6">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Hungry Paws</h1>
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
                            {/*<div className="bg-blue-50 px-4 py-3 border-b">*/}
                            {/*    <h2 className="text-lg font-semibold text-gray-800 text-center">Food Tray</h2>*/}
                            {/*</div>*/}
                            <div className="bg-blue-50 px-4 py-3 border-b flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-800">Food Tray</h2>
                                <button
                                    onClick={shuffleTrayFoods}
                                    className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded transition-colors duration-200 flex items-center gap-1"
                                >
                                    Shuffle Foods
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <FoodSection foods={trayFoods}/>
                            </div>
                        </div>

                        {/* Hungry Animals Column */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                            <div className="bg-green-50 px-4 py-3 border-b">
                                <h2 className="text-lg font-semibold text-gray-800 text-center">Hungry Animals</h2>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <AnimalSection animals={activeAnimals} onFeed={handleFeed}/>
                            </div>
                        </div>

                        {/* Game Log Column */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-purple-50 px-4 py-3 border-b">
                                <h2 className="text-lg font-semibold text-gray-800 text-center">Game Chat</h2>
                            </div>
                            <div className="p-4 h-[300px] overflow-y-auto">
                                <StatsModal messages={messages}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
