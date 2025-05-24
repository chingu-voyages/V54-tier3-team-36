import React from 'react';

const animalImages = import.meta.glob(
    '../../../assets/feed-animal/*.{png,jpg,jpeg,svg}',
    {eager: true, query: '?url', import: 'default'}
);

function AnimalCard({animal}) {
    const src = animalImages[`../../../assets/feed-animal/${animal.image}`];
    return (
        <div className="flex flex-col items-center">
            <img
                src={src || ''}
                alt={animal.name}
                className="w-32 h-34 object-contain"
            />
            <div className="mt-2 text-sm font-medium">{animal.name}</div>
        </div>
    );
}

export default AnimalCard;