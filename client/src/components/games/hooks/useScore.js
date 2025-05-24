import {useCallback, useState} from 'react';


export function useScore(initialScore = 0) {
    const [score, setScore] = useState(initialScore);

    const addScore = useCallback(
        (points) => {
            setScore(prev => prev + points);
        },
        []
    );

    const resetScore = useCallback(
        () => {
            setScore(initialScore);
        },
        [initialScore]
    );

    return [score, addScore, resetScore];
}
