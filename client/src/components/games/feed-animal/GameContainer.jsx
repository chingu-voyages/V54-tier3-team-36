import React, {useState} from 'react';
import Timer from "./Timer.jsx";
import {useGameTimer} from "../hooks/useGameTimer.js";
import {useLives} from "../hooks/useLives.js";
import Lives from "./Lives.jsx";
import {useScore} from "../hooks/useScore.js";
import Score from "./Score.jsx";
import FoodSection from "./FoodSection.jsx";

import gameData from '../data/game-data.json';
import AnimalSection from "./AnimalSection.jsx";


const GameContainer = () => {
    const timeLeft = useGameTimer(60000);
    const [lives] = useLives(3);
    const [score] = useScore(0);

    const {foods} = gameData;
    const {animals} = gameData;
    const [draggedFoodId, setDraggedFoodId] = useState(null);

    const handleDragStart = (foodId) => {
        setDraggedFoodId(foodId);
    };

    return (
        <div className="w-full max-w-[98%] min-h-[800px] mx-auto mt-8 rounded-3xl shadow-2xl relative bg-white p-4">

            <div className="w-full h-20 border rounded-md p-2 flex justify-between items-center mb-4">
                <Timer timeLeft={timeLeft}/>
                <Score score={score}/>
                <Lives lives={lives}/>
            </div>

            <div className="w-full border rounded-md p-4 flex justify-center mb-4">
                <FoodSection foods={foods} onDragStart={handleDragStart}/>
            </div>

            <div className="w-full border rounded-md p-8 h-[400px] flex items-center justify-center">
                <AnimalSection
                    animals={animals}
                    onFeed={(animalId, foodId) => {
                        console.log('Feed animal', animalId, 'with food', foodId);
                    }}
                />
            </div>

        </div>
    );
};

export default GameContainer;
