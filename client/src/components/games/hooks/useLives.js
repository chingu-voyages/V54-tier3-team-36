import { useState, useCallback } from 'react';

export function useLives(initialLives) {
    const [lives, setLives] = useState(initialLives);

    const loseLife = useCallback(() => {
        setLives(prev => Math.max(prev - 1, 0));
    }, []);

    const resetLives = useCallback(() => {
        setLives(initialLives);
    }, [initialLives]);

    return [lives, loseLife, resetLives];
}
