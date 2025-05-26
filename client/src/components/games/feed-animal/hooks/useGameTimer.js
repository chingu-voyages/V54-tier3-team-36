import {useEffect, useState} from 'react';

export function useGameTimer(durationMs) {
    const [timeLeft, setTimeLeft] = useState(durationMs);

    useEffect(() => {
        const id = setInterval(() => {
            setTimeLeft(prev => (prev <= 1000 ? clearInterval(id) || 0 : prev - 1000));
        }, 1000);
        return () => clearInterval(id);
    }, [durationMs]);

    return timeLeft;
}