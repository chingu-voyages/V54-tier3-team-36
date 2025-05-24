import React from 'react';

const images = import.meta.glob(
    '../assets/feed-animal/*.{png,jpg,jpeg,svg}',
    {eager: true, as: 'url'}
);


const FoodItem = ({food, onDragStart}) => {
    const src = images[`../assets/feed-animal/${food.image}`];

    return (
        <img
            src={src}
            alt={food.name}
            draggable
            onDragStart={() => onDragStart(food.id)}
            className="w-16 h-16 rounded-md shadow-md cursor-grab"
        />
    );
};

export default FoodItem;
