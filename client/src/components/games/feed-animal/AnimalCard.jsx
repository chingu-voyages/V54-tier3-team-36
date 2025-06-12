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
                className="w-24 h-24 rounded-md shadow-md cursor-grab
                          hover:scale-110 hover:shadow-xl transition-transform duration-200
                          !bg-transparent hover:!bg-transparent"
            />
            <div className="mt-2 text-sm font-medium">{animal.name}</div>
        </div>
    );
}

export default AnimalCard;