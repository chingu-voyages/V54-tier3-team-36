import React from 'react';

const images = import.meta.glob(
    '../../../assets/feed-food/*.{png,jpg,jpeg,svg}',
    {eager: true, query: '?url', import: 'default'}
);

const FoodCard = ({food}) => {
    const src = images[`../../../assets/feed-food/${food.image}`];
    return (
        <div className="flex flex-col items-center">
            <img
                src={src}
                alt={food.name}
                draggable
                onDragStart={e => {
                    e.dataTransfer.setData('foodId', food.id);
                    e.dataTransfer.effectAllowed = 'move';
                }}
                className="w-32 h-32 rounded-md shadow-md cursor-grab
                          hover:scale-110 hover:shadow-xl transition-transform duration-200
                          !bg-transparent hover:!bg-transparent"
            />
            <div className="mt-2 text-sm font-medium">{food.name}</div>
        </div>
    );
};

export default FoodCard;
