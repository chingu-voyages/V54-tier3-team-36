import React, {useState} from 'react';
import GameSessionUI from "@/components/games/feed-animal/GameSessionUI.jsx";
import GameStartScreen from "@/components/games/feed-animal/GameStartScreen.jsx";


const GAME_NAME = "Hungry Paws!";
const GAME_DESCRIPTION = `Feed the right food to each animal before time runs out!
Each animal wants a specific food.
Get it right to score points, but be careful - wrong answers cost you POINTS and LIVES.
Can you get the highest score before time or lives run out?`;

const GameContainer = () => {
    const [sessionKey, setSessionKey] = useState(0);
    const [started, setStarted] = useState(false);

    const handleRestart = () => {
        setSessionKey(k => k + 1);
        setStarted(false);
    };

    return (
        <div className="w-full max-w-[98%] min-h-[800px] mx-auto mt-8 p-4 rounded-3xl shadow-2xl bg-white">
            {!started ? (
                <GameStartScreen
                    gameName={GAME_NAME}
                    gameDescription={GAME_DESCRIPTION}
                    onStart={() => setStarted(true)}
                />
            ) : (
                <GameSessionUI
                    key={sessionKey}
                    onRestart={handleRestart}
                />
            )}
        </div>
    );
};

export default GameContainer;
