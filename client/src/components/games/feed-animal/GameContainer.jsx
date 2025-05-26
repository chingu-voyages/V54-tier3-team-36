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

    const [trayFoods, setTrayFoods] = useState(gameData.foods);

    const handleFeed = (animalId, foodId) => {
        const animal = gameData.animals.find(a => a.id === animalId);
        if (animal.wantedFoodIds.includes(foodId)) {
            console.log(`Good! +${gameData.gameConfig.scorePerFeed} points.`);
        } else {
            console.log('Oops — wrong food, you lost a life.');
        }
        setTrayFoods(prev => {
            const filtered = prev.filter(f => f.id !== foodId);
            const available = gameData.foods.filter(
                f => !filtered.some(ff => ff.id === f.id)
            );
            const replacement = available.length
                ? available[Math.floor(Math.random() * available.length)]
                : null;
            return replacement ? [...filtered, replacement] : filtered;
        });
    };

    return (
        <div className="w-full max-w-[98%] min-h-[800px] mx-auto mt-8 rounded-3xl shadow-2xl relative bg-white p-4">

            <div className="w-full h-20 border rounded-md p-2 flex justify-between items-center mb-4">
                <Timer timeLeft={timeLeft}/>
                <Score score={score}/>
                <Lives lives={lives}/>
            </div>

            <div className="w-full border rounded-md p-4 flex justify-center mb-4">
                <FoodSection
                    foods={trayFoods}
                    onDragStart={() => {
                    }}/>
            </div>

            <div className="w-full border rounded-md p-8 h-[400px] flex items-center justify-center">
                <AnimalSection
                    animals={gameData.animals}
                    onFeed={handleFeed}
                />
            </div>

        </div>
    );
};

export default GameContainer;
