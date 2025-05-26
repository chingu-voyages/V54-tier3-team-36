import React, {useState} from 'react';
import GameSessionUI from "@/components/games/feed-animal/GameSessionUI.jsx";


const GameContainer = () => {
    const [sessionKey, setSessionKey] = useState(0);

    const handleRestart = () => {
        setSessionKey(k => k + 1);
    };

    return (
        <div className="w-full max-w-[98%] min-h-[800px] mx-auto mt-8 p-4 rounded-3xl shadow-2xl bg-white">
                      <GameSessionUI
                key={sessionKey}
                onRestart={handleRestart}
            />
        </div>
    );
};

export default GameContainer;
