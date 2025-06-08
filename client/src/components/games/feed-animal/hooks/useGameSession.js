import { useCallback, useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import gameData from '../../data/game-data.json';
import { useGameTimer } from './useGameTimer';
import { useLives } from './useLives';
import { useScore } from './useScore';
import { shuffleCards } from "@/components/games/feed-animal/helpers/shuffleCards";

// Maximum number of messages to keep in the log
const MAX_MESSAGES = 3;
export function useGameSession() {
    // Destructure game configuration
    const gameConfig = useMemo(() => ({
        durationMs: gameData.gameConfig.durationMs,
        startingLives: gameData.gameConfig.startingLives,
        animalsPerSpawn: gameData.gameConfig.animalsPerSpawn,
        foodOptionCount: gameData.gameConfig.foodOptionCount,
        scorePerFeed: gameData.gameConfig.scorePerFeed,
        scorePenalty: gameData.gameConfig.scorePenalty
    }), []);

    // Game state hooks
    const timeLeft = useGameTimer(gameConfig.durationMs);
    const [lives, loseLife] = useLives(gameConfig.startingLives);
    const [score, addScore, resetScore] = useScore(0);
    const [messages, setMessages] = useState([]);

    // Initialize tray foods and active animals
    const [trayFoods, setTrayFoods] = useState(() => 
        shuffleCards([...gameData.foods]).slice(0, gameConfig.foodOptionCount)
    );
    
    const [activeAnimals, setActiveAnimals] = useState(() => 
        shuffleCards([...gameData.animals]).slice(0, gameConfig.animalsPerSpawn)
    );
    
    // Add message to log
    const addMessage = useCallback((text) => {
        setMessages(prev => {
            const newMessage = {
                id: uuidv4(),
                text,
                timestamp: new Date().toLocaleTimeString()
            };
            // Keep only the last MAX_MESSAGES messages
            const updatedMessages = [...prev, newMessage];
            return updatedMessages.slice(-MAX_MESSAGES);
        });
    }, []);

    const handleFeed = useCallback((animalId, foodId) => {
        // Find the animal and food objects
        const animal = gameData.animals.find(a => a.id === animalId);
        const food = gameData.foods.find(f => f.id === foodId);
        
        if (!animal || !food) return; // Guard clause for invalid IDs
        
        const isCorrect = animal.wantedFoodIds.includes(foodId);

        // Handle scoring and messaging
        if (isCorrect) {
            addScore(gameConfig.scorePerFeed);
            addMessage(`✅ Correct! ${animal.name} loves ${food.name}! +${gameConfig.scorePerFeed} points`);
        } else {
            addScore(-gameConfig.scorePenalty);
            addMessage(`❌ Oops! ${animal.name} doesn't eat ${food.name}. -${gameConfig.scorePenalty} points`);
        }

        // Update tray foods
        setTrayFoods(prev => {
            const filtered = prev.filter(f => f.id !== foodId);
            const candidates = gameData.foods.filter(
                f => !filtered.some(ff => ff.id === f.id)
            );
            const nextFood = candidates.length > 0 ? shuffleCards([...candidates])[0] : null;
            return nextFood ? [...filtered, nextFood] : filtered;
        });

        // Update active animals
        setActiveAnimals(prev => {
            const filtered = prev.filter(a => a.id !== animalId);
            const candidates = gameData.animals.filter(
                a => !filtered.some(ff => ff.id === a.id)
            );
            const nextAnimal = candidates.length > 0 ? shuffleCards([...candidates])[0] : null;
            return nextAnimal ? [...filtered, nextAnimal] : filtered;
        });
    }, [addScore, addMessage, gameConfig.scorePerFeed, gameConfig.scorePenalty]);


    return {
        timeLeft,
        lives,
        score,
        trayFoods,
        activeAnimals,
        handleFeed,
        messages
    };
}
