import {useCallback, useState, useMemo, useRef, useEffect, useContext} from 'react';
import { v4 as uuidv4 } from 'uuid';
import gameData from '../../data/game-data.json';
import { useGameTimer } from './useGameTimer';
import { useLives } from './useLives';
import { useScore } from './useScore';
import { shuffleCards } from "@/components/games/feed-animal/helpers/shuffleCards";
import { saveGameResult } from '@/services/gameService';
import { AuthContext } from '@/context/auth';

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
    const [stats, setStats] = useState({
        correctFeeds: 0,
        incorrectFeeds: 0,
        gameStartTime: Date.now()
    });
    const messagesRef = useRef(messages);
    messagesRef.current = messages;
    const { user } = useContext(AuthContext);

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
                setStats(prev => ({
                    ...prev,
                    correctFeeds: prev.correctFeeds + 1
                }));
            } else {
                addMessage(`❌ Oops! ${animal?.name || 'Animal'} doesn't eat ${food?.name || 'that'}. ${points} points`);
                setStats(prev => ({
                    ...prev,
                    incorrectFeeds: prev.incorrectFeeds + 1
                }));

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


    // Save game results
    const saveResults = useCallback(async (reason) => {
        if (!user) {
            console.log('[Game Save] User not logged in, skipping save');
            return;
        }
        
        const gameData = {
            score,
            livesLeft: lives,
            timePlayed: gameConfig.durationMs - timeLeft,
            correctFeeds: stats.correctFeeds,
            incorrectFeeds: stats.incorrectFeeds,
            gameOverReason: reason
        };

        console.log('[Game Save] Attempting to save game data:', JSON.stringify(gameData, null, 2));
        
        try {
            console.log('[Game Save] Calling saveGameResult...');
            const result = await saveGameResult(gameData);
            console.log('[Game Save] Game saved successfully:', result);
            return result;
        } catch (error) {
            console.error('[Game Save] Failed to save game result:', error);
            if (error.response) {
                console.error('[Game Save] Error response data:', error.response.data);
                console.error('[Game Save] Error status:', error.response.status);
                console.error('[Game Save] Error headers:', error.response.headers);
            } else if (error.request) {
                console.error('[Game Save] No response received:', error.request);
            } else {
                console.error('[Game Save] Request setup error:', error.message);
            }
            throw error;
        }
    }, [user, score, lives, timeLeft, stats, gameConfig.durationMs]);

    // Check for game over conditions
    useEffect(() => {
        if (lives <= 0 && !gameOver.isOver) {
            const reason = 'no_lives';
            setGameOver({ isOver: true, reason: 'You ran out of lives!' });
            addMessage('Game Over! You ran out of lives!');
            saveResults(reason);
        } else if (timeLeft <= 0 && !gameOver.isOver) {
            const reason = 'time_up';
            setGameOver({ isOver: true, reason: 'Time is up!' });
            addMessage('Game Over! Time is up!');
            saveResults(reason);
        }
    }, [lives, timeLeft, gameOver.isOver, addMessage, saveResults]);

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
