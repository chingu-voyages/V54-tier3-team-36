import React from 'react';
import AnimalCard from './AnimalCard.jsx';
import gameData from '../data/game-data.json';

function AnimalSection() {
    const {animals} = gameData;
    return (
        <div className="flex flex-wrap space-x-8 gap-4 justify-center">
            {animals.map(animal => (
                <AnimalCard
                    key={animal.id}
                    animal={animal}
                />
            ))}
        </div>
    );
}

export default AnimalSection;