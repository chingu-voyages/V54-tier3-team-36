import React from 'react';

const Timer = ({timeLeft}) => {
    const seconds = Math.ceil(timeLeft / 1000);
    return (
        <div className="text-lg font-medium">
            <p className="text-black">Time Left: {seconds}s</p>
        </div>
    );
};

export default Timer;
