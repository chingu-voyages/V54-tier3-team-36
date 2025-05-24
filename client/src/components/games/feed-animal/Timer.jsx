import React from 'react';

const Timer = ({timeLeft}) => {
    const seconds = Math.ceil(timeLeft / 1000);
    return (
        <div className="absolute top-4 left-4">
            <p className="text-lg font-medium text-black">Time Left: {seconds}s</p>
        </div>
    );
};

export default Timer;
