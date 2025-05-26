import React, {useEffect, useState} from 'react';
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
    const { durationMs, startingLives, animalsPerSpawn, foodOptionCount } = gameData.gameConfig;

    const timeLeft = useGameTimer(durationMs);
    const [lives] = useLives(startingLives);
    const [score] = useScore(0);

    const [trayFoods, setTrayFoods] = useState(
        shuffle(gameData.foods).slice(0, foodOptionCount)
    );

    const [activeAnimals, setActiveAnimals] = useState(
        shuffle(gameData.animals).slice(0, animalsPerSpawn)
    );

    useEffect(() => {
        const id = setInterval(() => {
            setActiveAnimals(shuffle(gameData.animals).slice(0, animalsPerSpawn));
        }, gameData.gameConfig.spawnInterval);
        return () => clearInterval(id);
    }, [animalsPerSpawn]);


    const handleFeed = (animalId, foodId) => {
        const animal = gameData.animals.find(a => a.id === animalId);
        if (animal.wantedFoodIds.includes(foodId)) {
            console.log(`Good! +${gameData.gameConfig.scorePerFeed} points.`);
        } else {
            console.log('Oops — wrong food, you lost a life.');
        }
        setTrayFoods(prev => {
            const filtered = prev.filter(f => f.id !== foodId);
            const available = gameData.foods.filter(f =>
                !filtered.some(ff => ff.id === f.id)
            );
            const replacement = shuffle(available)[0];
            return replacement ? [...filtered, replacement] : filtered;
        });
        setActiveAnimals(prev => {
            const remaining = prev.filter(a => a.id !== animalId);
            const availableAnimals = gameData.animals.filter(
                a => !remaining.some(r => r.id === a.id)
            );
            const newAnimal = shuffle(availableAnimals)[0];
            return newAnimal ? [...remaining, newAnimal] : remaining;
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
                    animals={activeAnimals}
                    onFeed={handleFeed}
                />
            </div>

        </div>
    );
};

export default GameContainer;


function shuffle(array) {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}