import React from 'react';
import AnimalCard from './AnimalCard.jsx';

function AnimalSection({animals, onFeed}) {
    return (
        <div className="flex items-center justify-center min-h-full p-2">
            {animals.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 p-2">
                    {animals.map(a => (
                        <div key={a.id} className="w-full ">
                            <AnimalCard key={a.id} animal={a} onFeed={onFeed}/>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-8">
                    No food items available
                </div>
            )}
        </div>
    );
}

export default AnimalSection;