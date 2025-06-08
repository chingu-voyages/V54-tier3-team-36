import {useCallback, useState, useMemo, useRef, useEffect} from 'react';
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
    const [lives] = useLives(gameConfig.startingLives);
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
    
    // Add message to log
    const addMessage = useCallback((text) => {
        if (!text) return; // Skip empty messages
        
        const newMessage = {
            id: uuidv4(),
            text,
            timestamp: new Date().toLocaleTimeString()
        };
        
        setMessages(prevMessages => {
            // Filter out any existing welcome message
            const filtered = prevMessages.filter(msg => 
                !(msg.text && msg.text.includes('Welcome!'))
            );
            const updatedMessages = [...filtered, newMessage];
            return updatedMessages.slice(-MAX_MESSAGES);
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
                console.warn('Missing animalId or foodId');
                return;
            }

            // Safely find the animal and food objects
            const animal = gameData?.animals?.find(a => a?.id === animalId);
            const food = gameData?.foods?.find(f => f?.id === foodId);
            
            if (!animal || !food) {
                console.warn('Animal or food not found:', { animalId, foodId });
                return;
            }

            const isCorrect = animal?.wantedFoodIds?.includes?.(foodId) ?? false;
            const points = gameConfig?.scorePerFeed ?? 100;
            const penalty = gameConfig?.scorePenalty ?? 50;

            // Handle scoring and messaging
            if (isCorrect) {
                addScore(points);
                addMessage(`✅ Correct! ${animal?.name || 'Animal'} loves ${food?.name || 'food'}! +${points} points`);
            } else {
                addScore(-penalty);
                addMessage(`❌ Oops! ${animal?.name || 'Animal'} doesn't eat ${food?.name || 'that'}. -${penalty} points`);
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
    }, [addScore, addMessage, gameConfig?.scorePerFeed, gameConfig?.scorePenalty]);


    return {
        timeLeft,
        lives,
        score,
        trayFoods,
        activeAnimals,
        handleFeed,
        messages,
        addMessage
    };
}
