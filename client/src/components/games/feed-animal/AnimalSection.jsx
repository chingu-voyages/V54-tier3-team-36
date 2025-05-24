import React from 'react';
import AnimalCard from './AnimalCard.jsx';

function AnimalSection({animals, onFeed}) {
    return (
        <div className="flex flex-wrap space-x-8 gap-4 justify-center">
            {animals.map(a => (
                <AnimalCard key={a.id} animal={a} onFeed={onFeed}/>
            ))}
        </div>
    );
}

export default AnimalSection;