import React from 'react';

const Score = ({score}) => (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <p className="text-lg font-medium text-black">Score: {score}</p>
    </div>
);

export default Score;
