import {useCallback, useState, useMemo, useRef, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import gameData from '../../data/game-data.json';
import { useGameTimer } from './useGameTimer';
import { useLives } from './useLives';
import { useScore } from './useScore';
import { shuffleCards } from "@/components/games/feed-animal/helpers/shuffleCards";

// Maximum number of messages to keep in the log
const MAX_MESSAGES = 5;
export function useGameSession() {
    // Game over state
    const [gameOver, setGameOver] = useState({ isOver: false, reason: '' });
    
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
    const [score, addScore] = useScore(0);
    const [messages, setMessages] = useState([]);
    const messagesRef = useRef(messages);
    messagesRef.current = messages;

    // Initialize tray foods and active animals with error handling
    const [trayFoods, setTrayFoods] = useState(() => {
        try {
            const foods = Array.isArray(gameData?.foods) ? [...gameData.foods] : [];
            const shuffled = shuffleCards(foods);
            return shuffled.slice(0, Math.min(gameConfig.foodOptionCount, foods.length));
        } catch (error) {
            console.error('Error initializing tray foods:', error);
            return [];
        }
    });
    
    const [activeAnimals, setActiveAnimals] = useState(() => {
        try {
            const animals = Array.isArray(gameData?.animals) ? [...gameData.animals] : [];
            const shuffled = shuffleCards(animals);
            return shuffled.slice(0, Math.min(gameConfig.animalsPerSpawn, animals.length));
        } catch (error) {
            console.error('Error initializing active animals:', error);
            return [];
        }
    });
    
    // Add message to log (newest first)
    const addMessage = useCallback((text) => {
        if (!text) return; // Skip empty messages
        
        const newMessage = {
            id: uuidv4(),
            text,
            timestamp: new Date().toLocaleTimeString()
        };
        
        setMessages(prevMessages => {
            // Keep all messages except the welcome message
            const filtered = prevMessages.filter(msg => msg.id !== 'welcome');
            // Add new message at the beginning of the array
            const updated = [newMessage, ...filtered];
            // Keep only the last MAX_MESSAGES messages
            return updated.slice(0, MAX_MESSAGES);
        });
    }, []);
    
    // Add welcome message on first render only
    useEffect(() => {
        const welcomeMessage = {
            id: 'welcome',
            text: 'Welcome! Feed the animals by dragging food to them.',
            timestamp: new Date().toLocaleTimeString()
        };
        setMessages([welcomeMessage]);
        
        // Cleanup function to clear messages on unmount
        return () => setMessages([]);
    }, []);

    const handleFeed = useCallback((animalId, foodId) => {
        try {
            if (!animalId || !foodId) {
                return;
            }

            // Safely find the animal and food objects
            const animal = gameData?.animals?.find(a => a?.id === animalId);
            const food = gameData?.foods?.find(f => f?.id === foodId);
            
            if (!animal || !food) {
                return;
            }

            const isCorrect = animal?.wantedFoodIds?.includes?.(foodId) ?? false;
            const points = isCorrect ? (gameConfig?.scorePerFeed ?? 100) : -(gameConfig?.scorePenalty ?? 50);
            const newScore = score + points;
            
            // Update the score
            addScore(points);

            if (isCorrect) {
                addMessage(`✅ Correct! ${animal?.name || 'Animal'} loves ${food?.name || 'food'}! +${points} points`);
            } else {
                addMessage(`❌ Oops! ${animal?.name || 'Animal'} doesn't eat ${food?.name || 'that'}. ${points} points`);

                // Only lose a life if the NEW TOTAL score is less than 0
                if (newScore < 0 && lives > 0) {
                    loseLife(1);
                    addMessage('💔 Lost a life! Score went negative!');
                }
            }

            // Update tray foods
            setTrayFoods(prevTrayFoods => {
                try {
                    const filtered = (prevTrayFoods || []).filter(f => f?.id !== foodId);
                    const usedFoodIds = new Set(filtered.map(f => f?.id).filter(Boolean));
                    const candidates = (gameData?.foods || []).filter(f => f?.id && !usedFoodIds.has(f.id));
                    
                    if (!candidates?.length) return filtered || [];
                    
                    const shuffled = shuffleCards([...candidates]);
                    const nextFood = shuffled[0];
                    return nextFood ? [...filtered, nextFood] : filtered;
                } catch (error) {
                    console.error('Error updating tray foods:', error);
                    return prevTrayFoods || [];
                }
            });

            // Update active animals
            setActiveAnimals(prevActiveAnimals => {
                try {
                    const filtered = (prevActiveAnimals || []).filter(a => a?.id !== animalId);
                    const usedAnimalIds = new Set(filtered.map(a => a?.id).filter(Boolean));
                    const candidates = (gameData?.animals || []).filter(a => a?.id && !usedAnimalIds.has(a.id));
                    
                    if (!candidates?.length) return filtered || [];
                    
                    const shuffled = shuffleCards([...candidates]);
                    const nextAnimal = shuffled[0];
                    return nextAnimal ? [...filtered, nextAnimal] : filtered;
                } catch (error) {
                    console.error('Error updating active animals:', error);
                    return prevActiveAnimals || [];
                }
            });
        } catch (error) {
            console.error('Error in handleFeed:', error);
        }
    }, [score, addScore, addMessage, lives, loseLife, gameConfig?.scorePerFeed, gameConfig?.scorePenalty]);


    // Check for game over conditions
    useEffect(() => {
        if (lives <= 0 && !gameOver.isOver) {
            setGameOver({ isOver: true, reason: 'You ran out of lives!' });
            addMessage('Game Over! You ran out of lives!');
        } else if (timeLeft <= 0 && !gameOver.isOver) {
            setGameOver({ isOver: true, reason: 'Time is up!' });
            addMessage('Game Over! Time is up!');
        }
    }, [lives, timeLeft, gameOver.isOver, addMessage]);

    return {
        timeLeft,
        lives,
        score,
        trayFoods,
        activeAnimals,
        handleFeed,
        messages,
        addMessage,
        gameOver: gameOver.isOver,
        gameOverReason: gameOver.reason
    };
}
