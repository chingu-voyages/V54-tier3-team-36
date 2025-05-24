import React from 'react';

const animalImages = import.meta.glob(
    '../../../assets/feed-animal/*.{png,jpg,jpeg,svg}',
    {eager: true, query: '?url', import: 'default'}
);

function AnimalCard({animal, onFeed}) {
    const src = animalImages[`../../../assets/feed-animal/${animal.image}`];
    const handleDrop = e => {
        e.preventDefault();
        const foodId = Number(e.dataTransfer.getData('foodId'));
        console.log('Dropped foodId:', foodId);
        if (onFeed) {
            onFeed(animal.id, foodId);
        }
    }
    return (
        <div
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            className="flex flex-col items-center">
            <img
                src={src}
                alt={animal.name}
                className="w-32 h-34 object-contain"
            />
            <div className="mt-2 text-sm font-medium">{animal.name}</div>
        </div>
    );
}

export default AnimalCard;