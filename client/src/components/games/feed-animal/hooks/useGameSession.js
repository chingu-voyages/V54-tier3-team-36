import {useCallback, useState} from 'react';
import gameData from '../../data/game-data.json';
import {useGameTimer} from './useGameTimer';
import {useLives} from './useLives';
import {useScore} from './useScore';
import {shuffleCards} from "@/components/games/feed-animal/helpers/shuffleCards.js";

export function useGameSession() {
    const {
        durationMs,
        startingLives,
        animalsPerSpawn,
        foodOptionCount,
        scorePerFeed,
        scorePenalty
    } = gameData.gameConfig;

    const timeLeft = useGameTimer(durationMs);
    const [lives, loseLife] = useLives(startingLives);
    const [score, addScore] = useScore(0);

    const [trayFoods, setTrayFoods] = useState(
        () => shuffleCards(gameData.foods).slice(0, foodOptionCount)
    );
    const [activeAnimals, setActiveAnimals] = useState(
        () => shuffleCards(gameData.animals).slice(0, animalsPerSpawn)
    );

    const handleFeed = useCallback((animalId, foodId) => {
        const animal = gameData.animals.find(a => a.id === animalId);
        const correct = animal?.wantedFoodIds.includes(foodId);

        if (correct) {
            addScore(scorePerFeed);
            console.log(`Correct! +${scorePerFeed} points`);
        } else {
            addScore(-scorePenalty);
            console.log(`Wrong! –${scorePenalty} points`);
        }

        setTrayFoods(prev => {
            const filtered = prev.filter(f => f.id !== foodId);
            const candidates = gameData.foods.filter(
                f => !filtered.some(ff => ff.id === f.id)
            );
            const nextFood = candidates.length ? shuffleCards(candidates)[0] : null;
            return nextFood ? [...filtered, nextFood] : filtered;
        });

        setActiveAnimals(prev => {
            const filtered = prev.filter(a => a.id !== animalId);
            const candidates = gameData.animals.filter(
                a => !filtered.some(ff => ff.id === a.id)
            );
            const nextAnimal = candidates.length ? shuffleCards(candidates)[0] : null;
            return nextAnimal ? [...filtered, nextAnimal] : filtered;
        });
    }, [addScore, loseLife, scorePerFeed]);


    return {
        timeLeft,
        lives,
        score,
        trayFoods,
        activeAnimals,
        handleFeed
    };
}
