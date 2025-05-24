import React from 'react';

const images = import.meta.glob(
    '../../../assets/feed-food/*.{png,jpg,jpeg,svg}',
    { eager: true, query: '?url', import: 'default' }
);


const FoodCard = ({food, onDragStart}) => {
    const src = images[`../../../assets/feed-food/${food.image}`];
    return (
        <img
            src={src}
            alt={food.name}
            draggable
            onDragStart={() => onDragStart(food.id)}
            className="w-24 h-24 rounded-md shadow-md cursor-grab"
        />
    );
};

export default FoodCard;
